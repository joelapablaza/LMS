"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInfo from "./CourseInformation";
import CourseData from "./CourseData";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useGetAdminAllCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [updateCourse, { isSuccess, error }] = useUpdateCourseMutation({});
  const [active, setActive] = useState(0);
  const { data } = useGetAdminAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courseData, setCourseData] = useState({});
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  type CourseContentData = {
    title: string;
    description: string;
    videoUrl: string;
    videoSection: string;
    videoLength: string;
    links: { title?: string; url?: string }[];
    suggestion: string;
  };

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    categories: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: {},
  });

  const [courseContentData, setCourseContentData] = useState<
    CourseContentData[]
  >([]);

  const editCourseData =
    data && data.courses.find((course: any) => course._id === id);

  useEffect(() => {
    if (isSuccess) {
      const random = Math.random().toString(36);
      toast.success("Course Updated successfully");
      // redirect("/admin/courses");
      redirect(`/admin/courses?reload=${random}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        categories: editCourseData?.categories,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

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
    const formattedCourseContent = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      videoLength: content?.videoLength,
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
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContent,
    };

    setCourseData(newCourseData);
  };

  const handleCrourseCreate = async (e: any) => {
    const data = courseData;
    console.log(typeof courseData);
    await updateCourse({ id: editCourseData._id, data });
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
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCrourseCreate={handleCrourseCreate}
            courseContentData={courseContentData}
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
