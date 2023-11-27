"use client";
import { FC, useEffect, useState } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import socketIO from "socket.io-client";
import NotificationCard from "./Notification/NotificationCard";

// Types
import Notification from "@/app/interfaces/Notification";

// Assets
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/notifications/notificationApi";

// Websocket
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean | undefined;
  setOpen?: (open: boolean) => void | undefined;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const {
    data,
    refetch,
    error: getNotificationsError,
  } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playNotificationSound = () => {
    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    if (!audio) {
      const audioMp3 = new Audio(
        "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
      );
      setAudio(audioMp3);
    }
  }, [audio]);

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter(
          (item: Notification) => item.status === "unread"
        )
      );
    }
    if (getNotificationsError && "data" in getNotificationsError) {
      console.error("Error al cargar notificaciones:", getNotificationsError);
    }

    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess, getNotificationsError, audio]);

  useEffect(() => {
    if (audio) {
      socketId.on("newNotification", (data) => {
        refetch();
        playNotificationSound();
      });
      // Manejar errores de conexión con el servidor de sockets
      socketId.on("connect_error", (error) => {
        console.error("Error de conexión con el servidor de sockets:", error);
        // Podrías intentar reconectar aquí
      });
    }
  }, [audio]);

  // Audio mount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const markNotificationAsRead = async (id: string) => {
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
        onClick={() => setOpen && setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-black dark:text-white text-2xl cursor-pointer mr-2" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>

      {open && (
        <div className="w-[350px] h-[50vh] bg-[#e9eaeb] dark:bg-[#111c43]  shadow-xl absolute top-16 rounded ">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notificaciones
          </h5>
          {notifications &&
            notifications.map((notification: Notification, index: number) => (
              <NotificationCard
                key={notification._id}
                index={index}
                notification={notification}
                markNotificationAsRead={markNotificationAsRead}
              />
            ))}
        </div>
      )}
    </div>
  );
};
export default DashboardHeader;
