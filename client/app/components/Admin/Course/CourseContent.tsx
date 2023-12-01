import { styles } from "@/app/styles/style";
import React, { FC, useState, useEffect } from "react";
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

type CourseContentData = {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  links: { title?: string; url?: string }[];
  suggestion: string;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [editableData, setEditableData] = useState<CourseContentData[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(
    Array(editableData?.length).fill(false)
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
    const updatedData = [...editableData];
    updatedData[index].links.splice(linkIndex, 1);
    setEditableData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...editableData];
    updatedData[index].links.push({ title: "", url: "" });
    setEditableData(updatedData);
  };

  useEffect(() => {
    const editablecourseContentData = courseContentData.map((item: any) => {
      return {
        title: item.title,
        description: item.description,
        videoUrl: item.videoUrl,
        videoSection: item.videoSection,
        videoLength: item.videoLength,
        links: item.links.map((obj: any) => {
          return {
            url: obj.url,
            title: obj.title,
          };
        }),
        suggestion: item.suggestion,
      };
    });
    setEditableData(editablecourseContentData);
  }, [courseContentData]);

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      let newVideoSection = "";
      if (editableData.length > 0) {
        const lastVideoSection =
          editableData[editableData.length - 1].videoSection;

        //  use the last videoSection if avalible, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: 0,
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
        suggestion: "",
      };

      setEditableData([...editableData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      editableData[editableData.length - 1].title === "" ||
      editableData[editableData.length - 1].description === "" ||
      editableData[editableData.length - 1].videoUrl === "" ||
      editableData[editableData.length - 1].links[0].title === "" ||
      editableData[editableData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        videoLength: 0,
        links: [{ title: "", url: "" }],
        suggestion: "",
      };
      setEditableData([...editableData, newContent]);
    }
  };

  const handleOptions = () => {
    if (
      editableData[editableData.length - 1].title === "" ||
      editableData[editableData.length - 1].description === "" ||
      editableData[editableData.length - 1].videoUrl === "" ||
      editableData[editableData.length - 1].links[0].title === "" ||
      editableData[editableData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const updateData = () => {
    if (
      editableData[editableData.length - 1].title === "" ||
      editableData[editableData.length - 1].description === "" ||
      editableData[editableData.length - 1].videoUrl === "" ||
      editableData[editableData.length - 1].links[0].title === "" ||
      editableData[editableData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      const editablecourseContentData = editableData.map((item: any) => {
        return {
          title: item.title,
          description: item.description,
          videoUrl: item.videoUrl,
          videoSection: item.videoSection,
          videoLength: item.videoLength.toString(),
          links: item.links,
          suggestion: item.suggestion,
        };
      });
      setCourseContentData(editablecourseContentData);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        <label className={styles.title}>Changes are automatically saved</label>
        {editableData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== editableData[index - 1].videoSection;

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
                          const updatedData = [...editableData];
                          updatedData[index].videoSection = e.target.value;
                          setEditableData(updatedData);
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
                          const updateData = [...editableData];
                          updateData.splice(index, 1);
                          setEditableData(updateData);
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
                          const updatedData = [...editableData];
                          updatedData[index].title = e.target.value;
                          setEditableData(updatedData);
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder={`Id code: 'asjhgda879a8jdadhdad'`}
                        className={styles.input}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...editableData];
                          updatedData[index].videoUrl = e.target.value;
                          setEditableData(updatedData);
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
                          const updatedData = [...editableData];
                          updatedData[index].videoLength = parseInt(
                            e.target.value
                          );
                          setEditableData(updatedData);
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
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...editableData];
                          updatedData[index].description = e.target.value;
                          setEditableData(updatedData);
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>

                    {/* links mapping */}

                    {item.links.map((link: any, linkIndex: number) => (
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
                            const updatedData = [...editableData];
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setEditableData(updatedData);
                            setCourseContentData(updatedData);
                          }}
                        />

                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...editableData];
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setEditableData(updatedData);
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
                {index === editableData.length - 1 && (
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
