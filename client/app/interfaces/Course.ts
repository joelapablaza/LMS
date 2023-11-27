import User from "./User";

export interface Course {
  _id: string;
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice: number;
  thumbnail: Thumbnail;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: Benefits[];
  prerequisites: Prerequisites[];
  courseData: CourseData[];
  ratings: number;
  purchased: number;
  reviews: Reviews[];
  createdAt: string;
  updatedAt: string;
}

export interface Thumbnail {
  public_id: string;
  url: string;
}

export interface Benefits {
  title: string;
  _id: string;
}

export interface Prerequisites {
  title: string;
  _id: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface CourseData {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  links: Link[];
  suggestion: string;
}

export interface Reviews {
  _id: string;
  user: User;
  rating: number;
  comment: string;
  commentReplies: CommentReplies[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentReplies {
  user: User;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

//

export interface CourseInfo {
  name: string;
  description: string;
  categories: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: object;
}

export interface ICreateCourse {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  categories: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail?: { public_id: string; url: string } | string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  totalVideos: number;
  courseData: {
    videoUrl: string;
    title: string;
    videoSection: string;
    description: string;
    videoLength: number;
    links: { title: string; url: string }[];
  }[];
}

export interface ICourseInfo {
  name: string;
  description: string;
  categories: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
}

export interface ICourseContentData {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  videoLength: string;
  links: { title: string; url: string }[];
  suggestion: string;
}

export interface IEditCourse {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  categories: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail?: { public_id: string; url: string } | string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  totalVideos: number;
  courseData: {
    videoUrl: string;
    title: string;
    videoSection: string;
    description: string;
    videoLength: number;
    links: { title: string; url: string }[];
  }[];
}

export interface IEditCourseInfo {
  name: string;
  description: string;
  categories: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail?: string;
}
