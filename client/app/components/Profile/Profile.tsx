import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import EnrolledCourses from "./EnrolledCourses";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState();

  const { data, isLoading } = useGetAllCoursesQuery(undefined, {});

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    toast.success("Sesión Cerrada");
    setLogout(true);
    redirect("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const filterCourses = user.courses
        .map((purchasedCourse: any) =>
          data.courses.find((course: any) => course._id === purchasedCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filterCourses);
    }
  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 bg-[#fcfcfc] border dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <EnrolledCourses courses={courses} />
        </div>
      )}

      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
    </div>
  );
};
export default Profile;
