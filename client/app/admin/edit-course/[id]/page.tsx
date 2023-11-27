"use client";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import React from "react";

interface PageParams {
  id: string;
}

const page = ({ params }: { params: PageParams }) => {
  const id = params?.id;

  return (
    <div>
      <Heading
        title="LearnIt"
        description="Leanbay es una plataforma diseñada especialmente para los recién llegados y también para candidatos con experiencia, con el objetivo de mejorar sus conjuntos de habilidades técnicas."
        keywords="Programacion, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
