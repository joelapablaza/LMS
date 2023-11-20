"use client";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import socketIO from "socket.io-client";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/notifications/notificationApi";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
    )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div
      className="w-full flex items-center justify-end p-6 fixed top-5 right-0 "
      style={{ zIndex: 1 }}
    >
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-black dark:text-white text-2xl cursor-pointer mr-2" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>

      {open && (
        <div className="w-[350px] h-[50vh] bg-[#e9eaeb] dark:bg-[#111c43]  shadow-xl absolute top-16 rounded ">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications &&
            notifications.map((notification: any, index: number) => (
              <>
                <div
                  className="bg-[#00000013] dark:bg-[#2d3a4e] font-Poppins border-b dark:border-b-[#ffffff45] border-b-[#00000044]"
                  key={index}
                >
                  <div className="w-full flex items-center justify-between p-2">
                    <p className="text-black dark:text-white">
                      {notification.title}
                    </p>
                    <p
                      className="text-black dark:text-white cursor-pointer"
                      onClick={() =>
                        handleNotificationStatusChange(notification._id)
                      }
                    >
                      Mark as read
                    </p>
                  </div>
                  <p className="px-2 text-black dark:text-white">
                    {notification.message}
                  </p>
                  <p className="py-2 px-2 text-black dark:text-white text-[14px]">
                    {format(notification.createdAt)}
                  </p>
                </div>
              </>
            ))}
        </div>
      )}
    </div>
  );
};
export default DashboardHeader;
