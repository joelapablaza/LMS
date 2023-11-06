import React, { useState, useEffect, FC } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const { data: usersData } = useGetAllUsersQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail className="text-green-600" size={25} />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [
    {
      id: "187631873681673",
      userName: "Alfredo Hentler",
      userEmail: "alfredoHentlirin@gmail.com",
      title: "React JS Course",
      price: "$30",
      created_at: "10 days ago",
    },
    {
      id: "29837472839472",
      userName: "Elena Rodriguez",
      userEmail: "elena.rodriguez@example.com",
      title: "Web Design Workshop",
      price: "$25",
      created_at: "2 weeks ago",
    },
    {
      id: "394729847593749",
      userName: "John Smith",
      userEmail: "john.smith@example.com",
      title: "Python Programming",
      price: "$40",
      created_at: "3 days ago",
    },
    {
      id: "495849574893485",
      userName: "Maria Lopez",
      userEmail: "maria.lopez@example.com",
      title: "Machine Learning Masterclass",
      price: "$50",
      created_at: "1 week ago",
    },
    {
      id: "587432489834732",
      userName: "David Johnson",
      userEmail: "david.johnson@example.com",
      title: "JavaScript Fundamentals",
      price: "$20",
      created_at: "4 days ago",
    },
    {
      id: "685973489749734",
      userName: "Anna Williams",
      userEmail: "anna.williams@example.com",
      title: "Graphic Design Basics",
      price: "$15",
      created_at: "6 days ago",
    },
    {
      id: "789237489237498",
      userName: "Robert Brown",
      userEmail: "robert.brown@example.com",
      title: "Data Analysis with Python",
      price: "$35",
      created_at: "5 days ago",
    },
    {
      id: "897429384749348",
      userName: "Laura Martinez",
      userEmail: "laura.martinez@example.com",
      title: "iOS App Development",
      price: "$45",
      created_at: "2 days ago",
    },
    {
      id: "984732974897493",
      userName: "Michael Davis",
      userEmail: "michael.davis@example.com",
      title: "Java Programming Basics",
      price: "$25",
      created_at: "8 days ago",
    },
    {
      id: "109384754893749",
      userName: "Sara Taylor",
      userEmail: "sara.taylor@example.com",
      title: "Web Development Bootcamp",
      price: "$55",
      created_at: "7 days ago",
    },
  ];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none !important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebd3 !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid
              checkboxSelection={!!isDashboard}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
