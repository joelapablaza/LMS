import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  const styles = {
    left: "20%",
    transform: "translate(-50%, -50%)",
    // Agrega otros estilos según sea necesario
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex items-center min-h-screen justify-center">
          {/* <div className="relative w-full">
            <div className="absolute top-[80vh] left-0 w-full h-full animated-wrapper filter blur-3xl z-20">
              <div
                className="w-24 h-24 rounded-full border-4 border-white fixed glow"
                style={styles}
              ></div>
            </div>
          </div> */}
          <div className="1000px:w-[80%] flex flex-col items-center  1000px:text-left 1000px:mt-[50px] 1300px:mt-[25px] 1300px:mb-[50px] mt-[50]">
            <h2 className="dark:text-white text-[#000000c7] text-center px-3 w-full 1000px:text-[50px] 800px:text-[50px] text-[35px] font-[600] font-Poppins py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
              {/* {data?.layout?.banner?.title} */}
              <span className="text-gradient font-Poppins from-indigo-400 to-cyan-400">
                Mejora
              </span>{" "}
              Tu Experiencia de Aprendizaje en Línea{" "}
              <span className="text-gradient font-Poppins from-indigo-400 to-cyan-400">
                al Instante
              </span>
            </h2>
            <br />
            <p className="dark:text-[#edfff4] text-[#000000ac] text-center font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] px-7 1000px:px-0">
              {data?.layout?.banner?.subtitle}
            </p>
            <br />
            <br />
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
              <input
                type="search"
                placeholder="Buscar cursos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="bg-transparent border border-slate-400 dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
              />
              <div
                className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                onClick={handleSearch}
              >
                <BiSearch className="text-white" size={30} />
              </div>
            </div>
            <br />
            <br />
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
              <Image
                src={require("../../../public/assets/client-1.jpg")}
                alt=""
                className="rounded-full"
              />
              <Image
                src={require("../../../public/assets/client-2.jpg")}
                alt=""
                className="rounded-full ml-[-20px]"
              />
              <Image
                src={require("../../../public/assets/client-3.jpg")}
                alt=""
                className="rounded-full ml-[-20px]"
              />
              <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
                Más de 500,000 personas ya confían en nosotros{" "}
                <Link
                  href={"/courses"}
                  className="dark:text-[#46e256] text-[#4aba55]"
                >
                  Ver Cursos
                </Link>{" "}
              </p>
            </div>
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
