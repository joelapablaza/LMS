interface Notification {
  _id: string;
  title: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Notification;
