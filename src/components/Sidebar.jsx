import React from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const outlet = useOutlet();
  const items = [
    {
      name: "Dashboard",
      link: "/user",
    },
    {
      name: "Expense History",
      link: "/user/expense-history",
    },
    {
      name: "Reports",
      link: "/user/reports-page",
    },
    {
      name: "Add Expense",
      link: "/user/add-expense",
    },
  ];
  return (
    <div className="layout">
      <div className="sidebar">
        {items &&
          items.map((i) => (
            <div
              className={`${
                window.location.pathname === i.link
                  ? "barItemActive"
                  : "barItem"
              }`}
              onClick={() => navigate(i.link)}
            >
              {i.name}
            </div>
          ))}
      </div>
      <div
        style={{
          margin: "50px",
        }}
      >
        {outlet}
      </div>
    </div>
  );
};

export default Sidebar;
