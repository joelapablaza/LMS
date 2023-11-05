import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData?.length).fill(false)
  );

  type ContentType = {
    videoUrl: string;
    title: string;
    description: string;
    videoSection: string;
    videoLength: number;
    links: { title: string; url: string }[];
    suggestion: string;
  };

  const dataForUpdate: ContentType[] = courseContentData.map(
    (item: ContentType) => ({ ...item })
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapsed(updateCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...dataForUpdate];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...dataForUpdate];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (isItemIncomplete(item)) {
      toast.error("Please fill all the fields first");
    } else {
      let newVideoSection = "";
      if (dataForUpdate.length > 0) {
        const lastVideoSection =
          dataForUpdate[dataForUpdate.length - 1].videoSection;

        //  use the last videoSection if avalible, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...dataForUpdate, newContent]);
    }
  };

  const isItemIncomplete = (item: any) => {
    const { title, description, videoUrl, links } = item;
    return (
      title === "" ||
      description === "" ||
      videoUrl === "" ||
      links[0].url === "" ||
      links[0].title === ""
    );
  };

  const isEmpty = (value: string) => {
    return value === "";
  };

  const checkCommonFields = (lastContent: any) => {
    return (
      isEmpty(lastContent.title) ||
      isEmpty(lastContent.description) ||
      isEmpty(lastContent.videoUrl) ||
      isEmpty(lastContent.links[0].url) ||
      isEmpty(lastContent.links[0].title)
    );
  };

  const addNewSection = () => {
    const lastContent = dataForUpdate[dataForUpdate.length - 1];

    if (checkCommonFields(lastContent)) {
      toast.error("Please fill all the fields first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...dataForUpdate, newContent]);
    }
  };

  const handleOptions = () => {
    const lastContent = dataForUpdate[dataForUpdate.length - 1];

    if (checkCommonFields(lastContent)) {
      toast.error("Section can't be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {dataForUpdate?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== dataForUpdate[index - 1].videoSection;

          return (
            <>
              <div
                key={index}
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...dataForUpdate];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BiPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {/* {item.title + 1}. {item.title} */}
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* {arrow button for collaps video content} */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...dataForUpdate];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowUp
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label
                        className={`${styles.label}`}
                        style={{ fontWeight: "800" }}
                      >
                        Video Title
                      </label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={styles.input}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...dataForUpdate];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="hzsed"
                        className={styles.input}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...dataForUpdate];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="20"
                        className={styles.input}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...dataForUpdate];
                          updatedData[index].videoLength = parseInt(
                            e.target.value
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={6}
                        cols={30}
                        placeholder="Describe the video..."
                        className={`${styles.input} !h-min -y2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...dataForUpdate];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() => {
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex);
                            }}
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          className={styles.input}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...dataForUpdate];
                            updatedData[index].links[0].title = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />

                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...dataForUpdate];
                            updatedData[index].links[0].url = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* {add link button} */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* {Add new content} */}
                {index === dataForUpdate.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center rounded  dark:text-white text-black mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center rounded  dark:text-white text-black mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
