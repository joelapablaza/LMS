import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubtitle(data?.layout?.banner.subtitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero actualizado exitosamente");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        if (reader.readyState == 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({ type: "Banner", image, title, subtitle });
  };

  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18-rem] 1500px:left-[21rem] "></div>
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-[10]">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />

            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />

            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="text-black dark:text-white text-[18px] cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <textarea
            className="dark:text-white resize-none text-[#0000007c] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[60px] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] bg-transparent"
            rows={4}
            value={title}
            placeholder="Entra tu tiulo aqui"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px]  1500px:!w-[55%] 1100px:!w-[74%] bg-transparent mt-10"
            placeholder="Entra tu subtitulo aqui"
            value={subtitle}
            rows={4}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <br />
          <br />
          <br />

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
           ${
             data?.layout?.banner?.title !== title ||
             data?.layout?.banner?.subtitle !== subtitle ||
             data?.layout?.banner?.image?.url !== image
               ? "!cursor-pointer !bg-[#42d383]"
               : "!cursor-not-allowed"
           }
            !rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subtitle !== subtitle ||
              data?.layout?.banner?.image !== image
                ? handleEdit
                : () => null
            }
          >
            Guardar
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
