import { styles } from "@/app/styles/style";
import Image from "next/image";
import React, { FC } from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Luis Ramirez",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    profession: "IT Professional",
    ratings: 5,
    comment:
      "I've taken many online courses, but LearnIt stands out. The quality of instruction and flexibility of learning are unmatched. I've enhanced my skills significantly.",
  },
  {
    name: "Emily Turner",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Graphic Designer",
    ratings: 4.5,
    comment:
      "For a creative like me, LearnIt is a goldmine. The graphic design courses are top-notch, and the interactive assignments keep me engaged. Love it!",
  },
  {
    name: "David Martinez",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    profession: "Entrepreneur",
    ratings: 5,
    comment:
      "I run my own business, and LearnIt has been a game-changer. The skills I've gained through their courses have helped me succeed in the competitive market.",
  },
  {
    name: "Sophia Clark",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    profession: "Teacher",
    ratings: 4.5,
    comment:
      "As an educator, I appreciate a good learning platform. LearnIt offers resources that enrich my teaching and help me stay updated with the latest pedagogical trends.",
  },
  {
    name: "Connor Mitchell",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    profession: "Software Developer",
    ratings: 5,
    comment:
      "LearnIt is a developer's dream. The coding courses are comprehensive, and the practical projects are invaluable. It's helped me level up my coding skills.",
  },
  {
    name: "Isabella White",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    profession: "Marketing Specialist",
    ratings: 5,
    comment:
      "For anyone in the marketing field, LearnIt is a treasure trove. The courses on digital marketing and analytics are up-to-date and have boosted my career.",
  },
];

const Reviews: FC<Props> = (props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full flex justify-center my-10">
          <Image
            src={require("../../../public/assets/Recurso-7.png")}
            alt="business"
            width={600}
            height={600}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[32px]`}>
            Nuestros Estudiantes Son{" "}
            <span className="text-gradient from-indigo-400 to-cyan-400">
              Nuestra fortaleza
            </span>{" "}
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
          reviews.map((item: any, index: number) => (
            <ReviewCard item={item} key={index} />
          ))}
      </div>
      <br />
    </div>
  );
};

export default Reviews;
