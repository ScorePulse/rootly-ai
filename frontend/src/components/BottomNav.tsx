import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoPeopleOutline,
  IoCalendarOutline,
  IoBookOutline,
} from "react-icons/io5";

const navItems = [
  { path: "/home", icon: <IoHomeOutline size={24} />, label: "Home" },
  { path: "/setting", icon: <IoSettingsOutline size={24} />, label: "Setup" },
  { path: "/students", icon: <IoPeopleOutline size={24} />, label: "Students" },
  {
    path: "/planning",
    icon: <IoCalendarOutline size={24} />,
    label: "Planning",
  },
  { path: "/schedule", icon: <IoBookOutline size={24} />, label: "Daily" },
];

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-sm mx-auto flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs ${
                isActive ? "text-purple-700" : "text-gray-500"
              }`
            }
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
