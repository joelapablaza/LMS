'use client';
import React, { FC, useState } from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Route/Hero';
import Courses from './components/Route/Courses';
import Reviews from './components/Route/Reviews';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title="LearnIt"
        description="LearnIt is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, NextJS"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={0}
        route={route}
        setRoute={setRoute}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
