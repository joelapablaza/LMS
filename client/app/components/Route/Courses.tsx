import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useState, useEffect } from "react";

type Props = {};

const Courses: FC<Props> = (props) => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return <div>Courses</div>;
};

export default Courses;
