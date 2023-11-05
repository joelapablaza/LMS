"use client";
import DashboardHero from "../../components/Admin/DashboardHero";
import AdminProtected from "../../hooks/adminProtected";
import Heading from "../../utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import React from "react";
import EditHero from "../../components/Admin/Customization/EditHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="Elearning - Admin Panel"
          keywords="Programming, MERN, Redux, Machine learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[15%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
