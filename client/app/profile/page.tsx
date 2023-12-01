"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useLoadUserQuery, usePrefetch } from "@/redux/features/api/apiSlice";
import Loader from "../components/Loader/Loader";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { data, isLoading } = useLoadUserQuery(true);

  usePrefetch("loadUser");

  const userMemo = useMemo(() => data ?? null, [data]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Protected>
          <Heading
            title={`${userMemo?.user?.name} perfil - LearnIt`}
            description="LearnIt es una plataforma para que los estudiantes aprendan y reciban ayuda de los profesores"
            keywords="Programacion, MERN, Redux, NextJS"
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            route={route}
            setRoute={setRoute}
          />
          <Profile user={userMemo?.user} />
        </Protected>
      )}
    </div>
  );
};

export default Page;
