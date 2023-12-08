import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

type Props = {};

const Hero: FC<Props> = (props) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (search === '') {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <div className="w-full flex items-center min-h-screen justify-center relativa">
      <div className="bg-[#fbe2e3] absolute top-[-1rem] -z-10 right-[0rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
      <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
      <div className="1000px:w-[80%] flex flex-col gap-4 items-start 1000px:text-left 1000px:mt-[50px] 1300px:mt-[25px] 1300px:mb-[50px] mt-[50]">
        <h2 className=" text-black dark:text-white font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl m-auto text-center px-2">
          <span className="text-gradient from-indigo-400 to-cyan-400">
            Mejora
          </span>{' '}
          Tu Experiencia de Aprendizaje en Línea{' '}
          <span className="text-gradient from-indigo-400 to-cyan-400">
            al Instante
          </span>
        </h2>

        <p className="dark:text-[#edfff4] text-[#000000ac] text-center font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] px-7 1000px:px-0 m-auto">
          Contamos con más de 20,000 cursos en línea y más de 500,000
          estudiantes registrados en línea. Encuentra los cursos que deseas
          entre ellos.
        </p>

        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative m-auto">
          <input
            type="search"
            placeholder="Buscar cursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
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

        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center m-auto">
          <Image
            src={require('../../../public/assets/client-1.jpg')}
            alt=""
            className="rounded-full"
          />
          <Image
            src={require('../../../public/assets/client-2.jpg')}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <Image
            src={require('../../../public/assets/client-3.jpg')}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600] ml-2">
            Más de 500,000 personas ya confían en nosotros{' '}
            <Link
              href={'/courses'}
              className="dark:text-[#46e256] text-[#4aba55]"
            >
              Ver Cursos
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
