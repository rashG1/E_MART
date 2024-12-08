import React from "react";
import { useNavigate } from "react-router-dom";
import NavTitle from "./NavTitle";
import { Button, Typography, Box } from "@mui/material";

const Category = () => {
  const navigate = useNavigate();

  const items = [
    { _id: 1001, title: "Fashion", path: "/fashion" },
    { _id: 1002, title: "Home Appliances", path: "/home-appliances" },
    { _id: 1003, title: "Beauty Products", path: "/beauty-products" },
   
    { _id: 1005, title: "Electronics", path: "/electronics" },
    { _id: 1004, title: "Others", path: "/others" },
  ];

  return (
    <Box className="container bg-white p-8 rounded-lg shadow-lg">
     
      <ul className="space-y-4">
        {items.map(({ _id, title, path }) => (
          <li key={_id} className="flex justify-center">
            <Button
              onClick={() => navigate(path)}
              variant="contained"
              fullWidth
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md"
            >
              {title}
            </Button>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Category;
