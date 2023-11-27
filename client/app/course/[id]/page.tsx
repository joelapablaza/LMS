"use client";
import React, { FC } from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

type Props = {
  params: any;
};

const page: FC<Props> = ({ params }) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default page;
