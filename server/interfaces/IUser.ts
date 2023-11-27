export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  courses: Course[];
  createdAt: string;
  updatedAt: string;
  avatar: Avatar;
}

export interface Course {
  _id: string;
}

export interface Avatar {
  public_id: string;
  url: string;
}
