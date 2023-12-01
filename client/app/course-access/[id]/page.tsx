"use client";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import CourseContent from "../../components/Course/CourseContent";

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  const id = params.id;

  const { isLoading, error, data } = useLoadUserQuery(true);

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased || error) {
        redirect("/");
      }
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default page;
