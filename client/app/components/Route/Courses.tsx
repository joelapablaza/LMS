import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useState, useEffect } from 'react';
import CourseCard from '../Course/CourseCard';
import { Course } from '../../interfaces/Course';

type Props = {};

const Courses: FC<Props> = (props) => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-black font-[700] tracking-tight">
          <span className="text-gradient from-indigo-400 to-cyan-400">
            Expande
          </span>{' '}
          los horizontes de tu{' '}
          <span className="text-gradient from-indigo-400 to-cyan-400">
            {' '}
            carrera
          </span>
          <br />
          Con nuestros cursos
        </h1>
        <br />
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
      <br />
    </div>
  );
};

export default Courses;
