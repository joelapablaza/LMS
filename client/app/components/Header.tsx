"use client";

import Link from "next/link";
import React, { FC, useEffect, useState, MouseEvent } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import CustomModal from "../utils/CustomModal";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import defaultAvatar from "../../public/assets/avatar.png";
import { useSelector } from "react-redux";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const userData = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = (e: MouseEvent | MouseEvent) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      <div
        className={`header-container ${active ? "sticky top-0 z-[999]" : ""}`}
      >
        <div className="w-[100%] m-auto h-full">
          <div
            className={`w-full h-[80px] flex items-center justify-around p-3 ${
              active
                ? "dark:bg-opacity-50 dark:bg-gradient-to-b border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 bg-[#f0f0f0]"
                : "border-b dark:border-[#ffffff1c] dark:shadow"
            }`}
          >
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white `}
              >
                LearnIt®️
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              {/* Only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  className="cursor-pointer dark:text-white text-black"
                  fill="white"
                  size={25}
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              <div className="ml-5">
                {userData ? (
                  <Link href={"/profile"}>
                    <Image
                      src={
                        userData?.user?.avatar
                          ? userData?.user?.avatar?.url
                          : defaultAvatar
                      }
                      alt=""
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      style={{
                        border: activeItem === 6 ? " 2px solid #37a39a" : "",
                      }}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointer dark:text-white text-black hidden 800px:block"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* sidebar for mobile */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] daek:bg-[unset] bg-[#0000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 flex flex-col">
              <NavItems activeItem={activeItem} isMobile={true} />
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={
                      userData?.user?.avatar
                        ? userData?.user?.avatar?.url
                        : defaultAvatar
                    }
                    alt=""
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] ml-[20px] mt-[10px] rounded-full  cursor-pointer"
                    style={{
                      border: activeItem === 6 ? " 2px solid #37a39a" : "",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer dark:text-white text-black hidden 800px:block"
                  onClick={() => setOpen(true)}
                />
              )}
              <br />
              <br />
              <hr />
              <p className="text-[16px] px-2 pl-5  dark:text-white text-black">
                Copyright ©️ 2023 LearnIt
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Signup" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </>
  );
};

export default Header;
