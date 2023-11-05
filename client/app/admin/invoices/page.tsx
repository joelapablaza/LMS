"use client";
import React from "react";
import Heading from "../../utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../../hooks/adminProtected";
import AllInvoices from "../../components/Admin/Orders/AllInvoices";

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
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <AllInvoices isDashboard={false} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
