import Notification from "@/app/interfaces/Notification";
import { format } from "timeago.js";

type Props = {
  notification: Notification;
  index: number;
  markNotificationAsRead: (id: string) => void;
};

const NotificationCard = ({
  notification,
  index,
  markNotificationAsRead,
}: Props) => {
  return (
    <div
      className="bg-[#00000013] dark:bg-[#2d3a4e] font-Poppins border-b dark:border-b-[#ffffff45] border-b-[#00000044]"
      key={index}
    >
      <div className="w-full flex items-center justify-between p-2">
        <p className="text-black dark:text-white">{notification.title}</p>
        <p
          className="text-black dark:text-white cursor-pointer"
          onClick={() => markNotificationAsRead(notification._id)}
        >
          Marcar como leído
        </p>
      </div>
      <p className="px-2 text-black dark:text-white">{notification.message}</p>
      <p className="py-2 px-2 text-black dark:text-white text-[14px]">
        {format(notification.createdAt)}
      </p>
    </div>
  );
};

export default NotificationCard;
