import React, { FC, useState, useEffect } from "react";
import { styles } from "@/app/styles/style";
import { useSession } from "next-auth/react";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const { data } = useSession();

  const handlePasswordChange = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    }
    await updatePassword({
      oldPassword,
      newPassword,
    });
  };

  useEffect(() => {
    if (data) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }

    if (isSuccess) {
      toast.success("Pasword changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-white pb-2">
        Change Password
      </h1>
      {isEditable && (
        <h5 className="block font-Poppins text-center font-[500] text-black dark:text-white pb-2">
          You are logged in from Google or Github, password change is not
          available
        </h5>
      )}
      <div className="w-full">
        <form
          aria-required
          onSubmit={handlePasswordChange}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 text-black dark:text-white">
              Enter your old password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95% mb-4 800px:mb-0] text-black dark:text-white bg-white dark:bg-slate-900 `}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={!isEditable}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 text-black dark:text-white">
              Enter your new password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95% mb-4 800px:mb-0] text-black dark:text-white bg-white dark:bg-slate-900 `}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!isEditable}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 text-black dark:text-white">
              Enter your confirm password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95% mb-4 800px:mb-0] text-black dark:text-white bg-white dark:bg-slate-900 `}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!isEditable}
            />
            <input
              type="submit"
              disabled={!isEditable}
              className={`w-[95%] h-[40px] border border-[#37a39a] text-center rounded-[3px] mt-8 cursor-pointer text-black dark:text-white`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
