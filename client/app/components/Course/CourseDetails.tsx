import Ratings from '@/app/utils/Ratings';
import React, { Fragment, useEffect, useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { format } from 'timeago.js';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Link from 'next/link';
import CourseContentList from '../Course/CourseContentList';
import { styles } from '@/app/styles/style';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../Payment/CheckOutForm';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Image from 'next/image';
import { VscVerifiedFilled } from 'react-icons/vsc';
import CourseReviews from './courseReviews';

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { data: userData, isSuccess } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = useState(false);

  const discountPercentege =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentegePrice = discountPercentege.toFixed(0);

  const isPurchased =
    userData?.user?.isVerified &&
    userData?.user?.courses?.find((course: any) => course._id === data._id);

  const handleOrder = (e: any) => {
    e.preventDefault();
    if (isSuccess) {
      console.log(userData);
      setOpen(true);
    } else {
      setRoute('Login');
      openAuthModal(true);
    }
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Estudiantes
              </h5>
            </div>

            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Lo que aprenderás de este curso:
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Requisitos previos para tomar este curso:
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />

            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Visión general del curso
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Detalles del curso
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white leading-7">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{' '}
                  Calificación del curso • {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />

              {/* Reviews */}
              {data?.reviews &&
                [...data.reviews]
                  .reverse()
                  .map((item: any, index: number) => (
                    <CourseReviews item={item} index={index} />
                  ))}
            </div>
          </div>

          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data.price === 0 ? 'Free' : '$' + data.price}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  ${data.estimatedPrice}
                </h5>

                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  {discountPercentegePrice}% Off
                </h4>
              </div>

              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className={`${styles.button} !w-[200px] my-3 font-Poppins cursor-pointer !bg-[#42A5F5]`}
                  >
                    Ver el curso
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[240px] my-3 font-Poppins cursor-pointer !bg-[#42A5F5]`}
                    onClick={handleOrder}
                  >
                    Tomar el Curso ${data.price}
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">
                • Código fuente incluido
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Acceso completo de por vida
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Certificado de finalización
              </p>
              <p className="pb-3 800px:pb-1 text-black dark:text-white">
                • Soporte Premium
              </p>
            </div>
          </div>
        </div>
      </div>

      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[450px] bg-white rounded-xl shadow p-5">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="cursor-pointer text-black"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    {isSuccess && (
                      <CheckOutForm
                        setOpen={setOpen}
                        data={data}
                        user={userData.user}
                      />
                    )}
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
export default CourseDetails;
