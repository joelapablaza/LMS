import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React, { FC } from 'react';
import ReviewCard from '../Review/ReviewCard';

type Props = {};

export const reviews = [
  {
    name: 'Luis Ramirez',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    profession: 'IT Professional',
    ratings: 5,
    comment:
      'He tomado muchos cursos en línea, pero LearnIt se destaca. La calidad de la instrucción y la flexibilidad del aprendizaje son inigualables. He mejorado significativamente mis habilidades.',
  },
  {
    name: 'Emily Turner',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    profession: 'Graphic Designer',
    ratings: 4.5,
    comment:
      'Para alguien creativo como yo, LearnIt es una mina de oro. Los cursos de diseño gráfico son de primera categoría y las tareas interactivas mantienen mi interés. ¡Me encanta!',
  },
  {
    name: 'David Martinez',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    profession: 'Entrepreneur',
    ratings: 5,
    comment:
      'Dirijo mi propio negocio, y LearnIt ha sido un cambio de juego. Las habilidades que he adquirido a través de sus cursos me han ayudado a tener éxito en el mercado competitivo.',
  },
  {
    name: 'Sophia Clark',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    profession: 'Teacher',
    ratings: 4.5,
    comment:
      'Como educador, valoro una buena plataforma de aprendizaje. LearnIt ofrece recursos que enriquecen mi enseñanza y me ayudan a mantenerme actualizado con las últimas tendencias pedagógicas.',
  },
  {
    name: 'Connor Mitchell',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    profession: 'Software Developer',
    ratings: 5,
    comment:
      'LearnIt es el sueño de un desarrollador. Los cursos de programación son completos y los proyectos prácticos son invaluables. Me ha ayudado a mejorar mis habilidades de codificación.',
  },
  {
    name: 'Isabella White',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    profession: 'Marketing Specialist',
    ratings: 5,
    comment:
      'Para cualquiera en el campo del marketing, LearnIt es un tesoro. Los cursos sobre marketing digital y analítica están actualizados y han impulsado mi carrera.',
  },
] as const;

const Reviews: FC<Props> = (props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full flex justify-center my-10">
          <Image
            src={require('../../../public/assets/Recurso-7.png')}
            alt="business"
            width={600}
            height={600}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[32px]`}>
            Nuestros Estudiantes Son{' '}
            <span className="text-gradient from-indigo-400 to-cyan-400">
              Nuestra fortaleza
            </span>{' '}
            <br /> Descubre lo que Dicen Sobre Nosotros
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
            minima iste incidunt voluptate placeat sequi, illo dolores
            voluptates? Iusto adipisci accusantium, nihil non accusamus quae
            facilis nulla dolores eos sequi!
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0">
        {reviews &&
          reviews.map((item: (typeof reviews)[number], index: number) => (
            <ReviewCard item={item} key={index} />
          ))}
      </div>
      <br />
    </div>
  );
};

export default Reviews;
