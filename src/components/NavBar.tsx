import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:text-xl text-lg font-bold">
          <NavLink to="/" end className="hover:text-gray-300">
            User Management
          </NavLink>
        </div>

        {/* Navigation links */}
        <div className="space-x-4 text-gray-300">
          {/* Link to Home page */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-white" : "hover:text-white"
            }
          >
            Home
          </NavLink>

          {/* Link to Create page */}
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? "text-white" : "hover:text-white"
            }
          >
            Create
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
