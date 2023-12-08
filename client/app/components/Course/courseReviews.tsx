import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import React from 'react';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { format } from 'timeago.js';

type Props = {
  item: any;
  index: number;
};

const CourseReviews = ({ item, index }: Props) => {
  return (
    <div className="w-full pb-4" key={index}>
      <div className="flex">
        <div className="w-[50px] h-[50px]">
          <div className="w-[50px] h-[50px]">
            <Image
              src={
                item.user.avatar.url
                  ? item.user.avatar.url
                  : '/assets/avatar.png'
              }
              width={50}
              height={50}
              alt="avatar"
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        </div>
        <div className="hidden 800px:block pl-2">
          <div className="flex items-center">
            <h5 className="text-[18px] pr-2 text-black dark:text-white">
              {item.user.name}
            </h5>
            <Ratings rating={item.rating} />
          </div>
          <p className="text-black dark:text-white">{item.comment}</p>
          <small className="text-[#000000d1] dark:text-[#ffffff83]">
            {format(item.createdAt)}
          </small>
        </div>
        <div className="pl-2 flex 800px:hidden items-center">
          <h5 className="text-[18px] pr-2 text-black dark:text-white">
            {item.user.name}
          </h5>
          <Ratings rating={item.rating} />
        </div>
      </div>

      {item.commentReplies.map((comment: any, index: number) => (
        <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
          <div className="w-[50px] h-[50px]">
            <Image
              src={
                comment.user?.avatar?.url
                  ? comment.user?.avatar?.url
                  : '/assets/avatar.png'
              }
              width={50}
              height={50}
              alt="avatar"
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
          <div className="pl-2">
            <div className="flex items-center">
              <h5 className="text-[20px]">{comment.user.name}</h5>{' '}
              {comment.user.role === 'admin' && (
                <VscVerifiedFilled className="text-[#42A5F5] ml-2 text-[20px] " />
              )}
            </div>
            <p>{comment.comment}</p>
            <small className="text-black dark:text-[#ffffff83]">
              {format(comment.createdAt)} •
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseReviews;
