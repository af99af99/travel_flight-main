import React, { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import TeamMember from "src/assets/img/team-1-800x800.jpg";
import { Link, useNavigate } from "react-router-dom";
import api from 'src/services/api';

const UserDropdown = () => {
  const navigate = useNavigate();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // Use useEffect to add event listener to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        btnDropdownRef.current &&
        !btnDropdownRef.current.contains(event.target) &&
        popoverDropdownRef.current &&
        !popoverDropdownRef.current.contains(event.target)
      ) {
        closeDropdownPopover();
      }
    };

    // Add event listener
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
      try {
          const token = localStorage.getItem('token'); // Get token from localStorage

          if (!token) {
              console.warn('No token found. User might not be logged in.');
              return;
          }

          await api.post(
              '/member/logout', 
              {}, 
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          // Clear token and user data
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          // Redirect to login page
          navigate('/signin');
      } catch (error) {
          console.error('Logout failed:', error.response?.data || error.message);
      }
  };


  return (
    <>
      <div
        className="text-blueGray-500 block cursor-pointer"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="flex items-center">
          <span className="w-12 h-12 text-sm text-white bg-blue-100 inline-flex items-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={TeamMember}
            />
          </span>
        </div>
      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          // to={''}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Action
        </Link>
        <Link
          to={'/admin/settings'}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Settings
        </Link>
        {/* <Link
          to={'/admin/settings'}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Logout
        </Link> */}
        <button 
            onClick={handleLogout} 
            className="px-4 py-2 rounded transition text-sm "
        >
            Logout
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
