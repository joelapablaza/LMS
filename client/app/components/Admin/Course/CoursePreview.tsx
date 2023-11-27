import React, { FC, useEffect } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../../app/styles/style";
import Ratings from "../../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCrourseCreate: any;
  isEdit: boolean;
  courseContentData: any;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCrourseCreate,
  isEdit,
  courseContentData,
}) => {
  const discountPercentenge =
    ((courseData?.estimatedPrice - courseData.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentengePrice = discountPercentenge.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCrourseCreate();
  };

  useEffect(() => {
    console.log("Desde Preview", courseContentData);
  });

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] text-black dark:text-white">
            {courseData?.price === 0 ? "Free" : "$" + courseData?.price}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
            ${courseData?.estimatedPrice}
          </h5>

          <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
            {discountPercentengePrice}% Off
          </h4>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Toma el Curso ${courseData?.price}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Aplicar
          </div>
        </div>
        <p className="pb-1 text-black dark:text-white">
          • Codigo fuente incluido
        </p>
        <p className="pb-1 text-black dark:text-white">• Acceso de por vida</p>
        <p className="pb-1 text-black dark:text-white">
          • Certificado de finalización
        </p>
        <p className="pb-3 800px:pb-1 text-black dark:text-white">
          • Soporte Premium
        </p>
      </div>

      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            {courseData?.name}
          </h1>
          <div className="flex-items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings
                rating={courseData?.ratings ? courseData?.ratings : 4.5}
              />
              <h5 className="text-black dark:text-white">
                {courseData?.ratings}
              </h5>
            </div>
            <h5 className="text-black dark:text-white">
              {courseData?.purchased}
            </h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            ¿Qué aprenderás de este curso?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py2" key={index}>
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

        <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
          ¿Cuáles son los requisitos previos para comenzar este curso?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py2" key={index}>
            <div className="w-[15px] mr-2">
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

        {/* course description */}
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            Detalles del Curso
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>

      <div className="w-full flex items-center justify-around">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a391] text-center dark:text-white text-black rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a391] text-center dark:text-white text-black rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
          {isEdit ? "Update" : "Create"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
