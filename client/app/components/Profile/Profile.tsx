import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const { data: session } = useSession();
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
    redirect("/");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 85);
    });
  } else {
    setScroll(false);
  }

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
      <div className="w-full h-full bg-transparent mt-[80px]">
        {active === 1 && <ProfileInfo avatar={avatar} user={user} />}
      </div>
    </div>
  );
};
export default Profile;
