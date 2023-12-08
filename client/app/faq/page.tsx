'use client';

import React, { useState } from 'react';
import FAQ from '../components/FAQ/FAQ';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Footer from '../components/Footer';

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login');

  return (
    <>
      <Heading
        title="LearnIt"
        description="LearnIt es una plataforma diseñada especialmente para los recién llegados y también para candidatos con experiencia, con el objetivo de mejorar sus conjuntos de habilidades técnicas."
        keywords="Programacion, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={1}
        setRoute={setRoute}
        route={route}
      />
      <div>
        <FAQ />
      </div>
      <Footer />
    </>
  );
};

export default Page;
