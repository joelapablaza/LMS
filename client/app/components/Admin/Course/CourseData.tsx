import { styles } from "@/app/styles/style";
import React, { FC, useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  interface Benefit {
    title: string;
  }
  interface Prerequisites {
    title: string;
  }

  const [benefitsData, setBenefitsData] = useState<Benefit[]>([]);
  const [prerequisitesData, setPrerequisitesData] = useState<Prerequisites[]>(
    []
  );

  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefitsData];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefitsData, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisitesData];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisitesData, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    const beneficiosCompletos = benefitsData.every(
      (b) => b.title.trim() !== ""
    );
    const requisitosCompletos = prerequisitesData.every(
      (r) => r.title.trim() !== ""
    );

    if (beneficiosCompletos && requisitosCompletos) {
      setBenefits(benefitsData);
      setPrerequisites(prerequisitesData);
      setActive(active + 1);
    } else {
      toast.error("Please fill out all the fields to proceed");
    }
  };

  // Map benefits and prerequisites to local state
  useEffect(() => {
    const benefitsMapped = benefits.map((ben) => ({
      title: ben.title,
    }));
    const prerequisitesMapped = prerequisites.map((pre) => ({
      title: pre.title,
    }));
    setBenefitsData(benefitsMapped);
    setPrerequisitesData(prerequisitesMapped);
  }, [benefits, prerequisites]);

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        {/* Benefit Section */}

        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits of this course?
        </label>
        <br />
        {benefitsData.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e: any) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="text-black dark:text-white"
          onClick={handleAddBenefit}
        />
      </div>

      {/* Prerequisites Section */}

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites for taking course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisite"
            placeholder="You need basic MERN stack knowledge"
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e: any) =>
              handlePrerequisitesChange(index, e.target.value)
            }
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="text-black dark:text-white"
          onClick={handleAddPrerequisite}
        />
      </div>

      {/* Buttons Section  */}

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-black dark:text-white rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-black dark:text-white rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
