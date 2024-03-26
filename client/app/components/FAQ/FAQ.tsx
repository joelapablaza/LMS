import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

type Props = {};

const FAQ: FC<Props> = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
          Preguntas Frecuentes
        </h1>
        <div className="mt-12">
          <dl className="space-y-8 ">
            {questions &&
              questions.map((q: any) => (
                <div
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                  key={q._id}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <span className="font-medium text-black dark:text-white">
                        {q.question}
                      </span>
                      <span className="ml-6 flex-shink-0">
                        {activeQuestion === q._id ? (
                          <MdOutlineKeyboardArrowUp className="h-6 w-6 text-black dark:text-white" />
                        ) : (
                          <MdOutlineKeyboardArrowDown className="h-6 w-6 text-black dark:text-white" />
                        )}
                      </span>
                    </button>
                  </dt>

                  {activeQuestion === q._id && (
                    <dd className="mt-2 pr-12">
                      <span className="text-base font-Poppins text-black dark:text-white">
                        {q.answer}
                      </span>
                    </dd>
                  )}
                </div>
              ))}
          </dl>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default FAQ;
