import React, { FC, useState } from "react";
import { Modal, Box } from "@mui/material";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  component: any;
  activeItem: any;
  setRoute?: (route: string) => void;
  refetch?: any;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  activeItem,
  component: Component,
  setRoute,
}) => {
  const [loadUser, setLoadUser] = useState(false);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {
    skip: !loadUser,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
          <Component
            setOpen={setOpen}
            setRoute={setRoute}
            setLoadUser={setLoadUser}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
