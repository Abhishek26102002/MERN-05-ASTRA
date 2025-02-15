import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  House,
  Search,
  Settings2,
  CircleUser,
  NotebookTabs,
  Headset,
  Images,
  Crown,
  ChartNoAxesGantt,
} from "lucide-react";
import { UserStore } from "../ApiStore/UserStore";

const Navbar = () => {
  const { setuser, logout, checkAuth } = UserStore();
  useEffect(() => {
    checkAuth();
    setuser;
  }, [setuser]);

  return (
    <>
      <div className="drawer drawer-end z-10">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Left Side */}
          <div className="navbar bg-base-300 w-full flex flex-row justify-between">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <ChartNoAxesGantt />
              </label>
            </div>
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center hover:opacity-80 transition-all"
              >
                <img src="/logo04.png" className="w-10 h-10 flex" alt="Astra" />
                <h1 className="text-lg font-bold text-white">Astra</h1>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/"
                className="flex gap-2 items-center  btn btn-outline btn-sm hover:text-gray-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="flex gap-2 items-center  btn btn-outline btn-sm hover:text-gray-300"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="flex gap-2 items-center  btn btn-outline btn-sm hover:text-gray-300"
              >
                Contact
              </Link>
              <Link
                to="/test"
                className="flex gap-2 items-center  btn btn-outline btn-sm hover:text-gray-300"
              >
                Test
              </Link>
            </div>

            <div className="hidden flex-none lg:block">
              {/* Right-side Navigation */}
              <div className="flex items-center gap-4">
                {setuser ? (
                  // Logged-in state
                  <>
                    {/* Profile Picture Dropdown */}
                    <div className="flex gap-2 items-center dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar "
                      >
                        <img
                          alt="Profile"
                          src={setuser?.profilepic || "/default-avatar.png"}
                          className="w-10 h-10 rounded-full border"
                        />
                      </div>

                      <ul className="top-10  menu dropdown-content bg-base-100 rounded-box z-[1] m-5  w-32 p-2 gap-4 shadow">
                        {setuser?.is_Admin ? (
                          <li>
                            <Link to={"/admin"} className={`btn btn-sm gap-2`}>
                              <Crown className="size-5" />
                              <span className="hidden sm:inline">Admin</span>
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}

                        <li>
                          <Link
                            to={"/dashboard"}
                            className={`btn btn-sm gap-2`}
                          >
                            <CircleUser className="size-5" />
                            <span className="hidden sm:inline">Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/setting"}
                            className={"btn btn-sm gap-2 transition-colors "}
                          >
                            <Settings2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Settings</span>
                          </Link>
                        </li>
                        <li>
                          <button
                            className="flex gap-2 items-center btn btn-sm bg-red-500 hover:bg-red-700 text-white"
                            onClick={logout}
                          >
                            <LogOut className="size-5" />
                            <span className="hidden sm:inline">Logout</span>
                          </button>
                        </li>
                      </ul>
                      <span className="text-md text-gray-600 font-medium">
                        {setuser?.name}
                      </span>
                    </div>
                  </>
                ) : (
                  // Logged-out state
                  <>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered h-9 px-3"
                      />
                      <Search className="absolute right-2 top-2 w-5 h-5 text-gray-500" />
                    </div>
                    <Link to={"/setting"} className={"btn btn-sm btn-outline"}>
                      <Settings2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Settings</span>
                    </Link>
                    <Link to="/login" className="btn btn-sm btn-outline">
                      Login/Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* For Smaller Screen */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-48 p-2 gap-4 shadow">
            {/* Sidebar content here */}
            <li>
              <div className="flex justify-end">
                {setuser ? (
                  // Logged-in state
                  <>
                    <div className="dropdown dropdown-end h-12">
                      {/* Profile Picture  */}
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <img
                          alt="Profile"
                          src={setuser?.profilepic || "/profile.png"}
                          className="w-10 h-10 rounded-full border"
                        />
                      </div>

                      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] m-5  w-32 p-2 gap-4 shadow">
                        {setuser.is_Admin ? (
                          <li>
                            <Link to={"/admin"} className={`btn btn-sm gap-2`}>
                              <Crown className="size-5" />
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                        <li>
                          <Link
                            to={"/dashboard"}
                            className={`btn btn-sm gap-2`}
                          >
                            <CircleUser className="size-5" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/setting"}
                            className={"btn btn-sm gap-2 transition-colors"}
                          >
                            <Settings2 className="w-4 h-4" />
                          </Link>
                        </li>
                        <li>
                          <button
                            className="flex gap-2 items-center btn btn-sm bg-red-500 hover:bg-red-700 text-white"
                            onClick={logout}
                          >
                            <LogOut className="size-5" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  // Logged-out state
                  <div className="flex gap-9">
                    <Link to="/login" className="btn btn-sm btn-outline">
                      Login
                    </Link>
                    <Link to={"/setting"} className={"btn btn-sm btn-outline"}>
                      <Settings2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Settings</span>
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered h-9 px-3 w-full"
                />
                <Search className="absolute right-6 top-4 w-5 h-5 text-gray-500" />
              </div>
            </li>
            <li>
              {" "}
              <Link
                to="/"
                className="flex gap-2 items-center  btn btn-outline btn-sm hover:text-gray-300"
              >
                <House className="size-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="flex gap-2 items-center  btn btn-outline btn-sm hover:text-gray-300"
              >
                <Images className="size-5" />
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex gap-2 items-center  btn btn-outline btn-sm hover:text-gray-300"
              >
                <NotebookTabs className="size-5" />
                About
              </Link>
            </li>

            <li>
              {" "}
              <Link
                to="/contact"
                className="flex gap-2 items-center  btn btn-outline btn-sm hover:text-gray-300"
              >
                <Headset className="size-5" />
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
