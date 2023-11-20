import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Loader from "../../Loader/Loader";
import toast from "react-hot-toast";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: isLayoutSuccess, error }] =
    useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  // TODO  Se activa y desactiva el campo de answer cuando apreto espacio

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (isLayoutSuccess) {
      refetch();
      toast.success("FAQ updated successfully");
    }

    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [data, isLayoutSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const NewFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  // Function to check if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestion: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestion) === JSON.stringify(newQuestions);
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] mx-auto mt-[120px]">
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
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(q._id, e.target.value)
                          }
                          placeholder="Add your question..."
                          className={`${styles.input} border-none`}
                        />

                        <span className="ml-6 flex-shink-0">
                          {q.active ? (
                            <MdOutlineKeyboardArrowUp className="h-6 w-6" />
                          ) : (
                            <MdOutlineKeyboardArrowDown className="h-6 w-6" />
                          )}
                        </span>
                      </button>
                    </dt>

                    {q.active && (
                      <dd className="mt-2 pr-12">
                        <input
                          type="text"
                          className={`${styles.input} border-none`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          placeholder="Add your answer..."
                        />
                        <span className="ml-6 flex-shink-0 ">
                          <AiOutlineDelete
                            onClick={() =>
                              setQuestions((prevQuestion) =>
                                prevQuestion.filter(
                                  (item) => item._id !== q._id
                                )
                              )
                            }
                            className="cursor-pointer ml-2 text-[18px] !text-red-500"
                          />
                        </span>
                      </dd>
                    )}
                  </div>
                ))}
            </dl>

            <br />
            <br />
            <IoMdAddCircleOutline
              onClick={NewFaqHandler}
              className="dark:text-white text-black cursor-pointer text-[25px]"
            />
          </div>

          <div
            className={`${
              styles.button
            }  !w-[100px] !min-h-[40px] !h-[40px] mt-10 dark:text-white text-black bg-[#cccccc34]
        ${
          areQuestionsUnchanged(data.layout.faq, questions) ||
          isAnyQuestionEmpty(questions)
            ? "!cursor-not-allowed"
            : "!cursor-pointer !bg-[#42d383]"
        }
        !rounded absolute bottom-12 right-12 items-center`}
            onClick={
              areQuestionsUnchanged(data.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
