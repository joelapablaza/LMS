// Interfaz para la información básica del curso
export interface ICourseBase {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  categories: string;
  tags: string;
  level: string;
  demoUrl: string;
  totalVideos: number;
  thumbnail?: { public_id: string; url: string } | string;
}

// Interfaz para los beneficios y requisitos
export interface ISection {
  title: string;
}

// Interfaz para la sección de datos del curso
export interface ICourseData {
  videoUrl: string;
  title: string;
  videoSection: string;
  description: string;
  videoLength: number;
  links: { title: string; url: string }[];
}

// Interfaz principal que combina las secciones anteriores
export interface ICourse extends ICourseBase {
  benefits: ISection[];
  prerequisites: ISection[];
  courseData: ICourseData[];
}
