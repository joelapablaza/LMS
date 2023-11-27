export default interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  courses: Course[];
  createdAt: string;
  updatedAt: string;
  avatar: Avatar;
}

interface Course {
  _id: string;
}

interface CoursesContainer {
  courses: Course[];
}

interface Avatar {
  public_id: string;
  url: string;
}
