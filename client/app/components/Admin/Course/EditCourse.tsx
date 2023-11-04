"use client";

import React, { FC, useEffect, useState } from "react";
import CourseInfo from "./CourseInformation";
import CourseData from "./CourseData";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [updateCourse, { isSuccess, error }] = useUpdateCourseMutation({});
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const course = data && data.courses.find((course: any) => course._id === id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated successfully");
      redirect("/dashboard/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (course) {
      setCourseInfo({
        name: course.name,
        description: course.description,
        price: course.price,
        estimatedPrice: course?.estimatedPrice,
        tags: course.tags,
        level: course.level,
        demoUrl: course.demoUrl,
        thumbnail: course?.thumbnail,
      });
      setBenefits(course.benefits);
      setPrerequisites(course.prerequisites);
      setCourseContent(course.courseData);
    }
  }, [course]);

  const [courseData, setCourseData] = useState({});
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [courseContent, setCourseContent] = useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "Add a title to this section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const handleSubmit = () => {
    // Formatting benefits
    const formattedBenefits = benefits.map((benifit) => ({
      title: benifit.title,
    }));

    // Formatting prerequisites
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Formatting course contents
    const formattedCourseContent = courseContent.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));

    // Formatting course info
    const newCourseData = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContent.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContent,
    };

    setCourseData(newCourseData);
  };

  const handleCrourseCreate = async (e: any) => {
    const data = courseData;
    await updateCourse({ id: course._id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInfo
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContent={courseContent}
            setCourseContent={setCourseContent}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCrourseCreate={handleCrourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
