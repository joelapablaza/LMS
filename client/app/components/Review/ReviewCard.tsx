import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import React, { FC } from 'react';
import type { reviews } from '../../components/Route/Reviews';

type Props = {
  item: (typeof reviews)[number];
};

const ReviewCard: FC<Props> = ({ item }) => {
  return (
    <div
      className={`w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner md:mt-3`}
    >
      <div className="flex w-full">
        <Image
          src={item.avatar}
          alt="avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
          width={50}
          height={50}
        />
        <div className="800px:flex justify-between w-full hidden">
          <div className="pls-4 ml-3">
            <h5 className="text-[20px] text-black dark:text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-black dark:text-white">
              {item.profession}
            </h6>
          </div>
          <Ratings rating={item.ratings} />
        </div>
        {/* mobile */}
        <div className="800px:hidden justify-between w-full flex flex-col ml-2">
          <div className="pla-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-black dark:text-white">
              {item.profession}
            </h6>
          </div>
          <Ratings rating={item.ratings} />
        </div>
      </div>
      <p className="pt-3 px-2 font-Poppins text-black dark:text-white">
        {item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
