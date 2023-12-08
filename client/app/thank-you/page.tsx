'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Link from 'next/link';
import { styles } from '../styles/style';
import Protected from '../hooks/useProtected';

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Thank you');

  return (
    <Protected>
      <div className="relative lg:min-h-full">
        <Heading
          title="LearnIt - Nuestra Politica!"
          description="LearnIt es una plataforma especialmente diseñada para recién graduados y también para candidatos con experiencia para mejorar sus conjuntos de habilidades técnicas"
          keywords="Programacion, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={3}
          setRoute={setRoute}
          route={route}
        />
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-4">
            <div className="hidden sm:block">
              <Image
                src={'/assets/thankyou.jpeg'}
                alt="Thank you"
                width={1024}
                height={1024}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="flex w-full justify-center text-center items-center pb-8 lg:pb-0">
              <div className="w-[80%]">
                <div className="lg:col-start-2">
                  <p className="text-sm font-medium text-blue-600">
                    Pedido realizado
                  </p>
                  <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-[#eeeded] sm:text-5xl">
                    Gracias por hacer su pedido
                  </h1>
                  <p className="mt-2 text-base text-muted-foreground">
                    Este curso sera suyo de por vida, recuerde unirse a Discord
                    para formar parte de la comunidad que se ayuda entre si a
                    alcanzar sus objetivos. Nos vemos en el curso.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Link
                href={'/profile'}
                className={`${styles.button} my-5 !w-[50%]`}
              >
                Ir a mis cursos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default Page;
