"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "./About";
import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="LearnIt - Sobre nosotros!"
        description="LearnIt es una plataforma diseñada especialmente para los recién llegados y también para candidatos con experiencia, con el objetivo de mejorar sus conjuntos de habilidades técnicas."
        keywords="Programming, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        setRoute={setRoute}
        route={route}
      />
      <About />
      <Footer />
    </div>
  );
};

export default Page;
