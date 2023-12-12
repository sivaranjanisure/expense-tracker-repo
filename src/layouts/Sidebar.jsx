import React, { useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import menuIcon from "../assets/menu-icon.png";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const outlet = useOutlet();
  const [showMenu, setShowMenu] = useState(true);
  const items = [
    {
      name: "Dashboard",
      link: "/user",
    },
    {
      name: "Add Expense",
      link: "/user/add-expense",
    },
    {
      name: "Expense History",
      link: "/user/expense-history",
    },
    {
      name: "Reports",
      link: "/user/reports-page",
    },
  ];
  return (
    <div className="layout">
      <div
        className="sidebar"
        style={{
          width: `${showMenu ? "230px" : "30px"}`,
          height: `${showMenu ? "100%" : "30px"}`,
        }}
      >
        <img
          src={menuIcon}
          alt="menu"
          onClickCapture={() => setShowMenu(!showMenu)}
        />
        {showMenu &&
          items &&
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
          marginLeft: "15%",
        }}
      >
        {outlet}
      </div>
    </div>
  );
};

export default Sidebar;
