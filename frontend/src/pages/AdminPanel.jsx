import React, { useEffect, useState } from "react";
import {
  TableOfContents,
  Presentation,
  ChartLine,
  UserPen,
  GalleryThumbnails,
  ClipboardList,
  SwatchBook,
  Settings,
} from "lucide-react";
import AdminPosts from "../components/Admin/AdminPosts";
import AdminUsers from "../components/Admin/AdminUsers";
import AdminStats from "../components/Admin/AdminStats";
import { Link } from "react-router-dom";
import Setting from "../pages/Setting";
import AdminPerformance from "../components/Admin/AdminPerformance";
import AdminSettings from "../components/Admin/AdminSettings";
import AdminAbout from "../components/Admin/AdminAbout";
import { UserStore } from "../ApiStore/UserStore";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const { fetchUsers } = UserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="h-full">
        <div className="w-full mx-auto p-4 py-4">
          <div className=" bg-base-300 rounded-xl p-6 space-y-8">
            {/* Left Side /Sidebar */}
            <div className="flex flex-row">
              <aside className="w-0 sm:w-96 ">
                <div className="drawer lg:drawer-open relative">
                  <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  {/* Page lable for sm screen here */}
                  <div className="drawer-content absolute -top-6 left-72">
                    <label
                      htmlFor="my-drawer-2"
                      className="drawer-button lg:hidden"
                    >
                      <TableOfContents />
                    </label>
                  </div>
                  <div className="drawer-side mt-20 sm:mt-0 z-10 ">
                    <label
                      htmlFor="my-drawer-2"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content sm:pt-6 w-48 sm:w-80 gap-3 p-4">
                      {/* Sidebar content here */}
                      <li>
                        <div className="flex">
                          <Link to="/" className="flex flex-row justify-center items-center">
                            <img
                              className="w-auto h-7"
                              src="./logo04.png"
                              alt=""
                            />
                          <p className="text-2xl font-semibold ms-4">Astra</p>
                          </Link>
                        </div>
                      </li>
                      <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400 ">
                        analytics
                      </label>
                      <li>
                        <button
                          className="w-full flex items-center px-3 py-2 text-secondary transition-colors duration-300 transform rounded-lg hover:text-primary  hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setActiveTab("stats")}
                        >
                          <Presentation />

                          <span className=" mx-2 text-sm font-medium">
                            Stats
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full flex items-center px-3 py-2 text-secondary transition-colors duration-300 transform rounded-lg hover:text-primary  hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setActiveTab("performance")}
                        >
                          <ChartLine />

                          <span className="mx-2 text-sm font-medium">
                            Preformance
                          </span>
                        </button>
                      </li>
                      <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                        content
                      </label>
                      <li>
                        {" "}
                        <button
                          className="w-full flex items-center px-3 py-2 text-secondary transition-colors duration-300 transform rounded-lg hover:text-primary  hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setActiveTab("users")}
                        >
                          <UserPen />

                          <span className="mx-2 text-sm font-medium">
                            Users
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full flex items-center px-3 py-2 text-secondary transition-colors duration-300 transform rounded-lg hover:text-primary  hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setActiveTab("posts")}
                        >
                          <GalleryThumbnails />

                          <span className="mx-2 text-sm font-medium">
                            Posts
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full flex items-center px-3 py-2 text-secondary transition-colors duration-300 transform rounded-lg hover:text-primary  hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setActiveTab("about")}
                        >
                          <ClipboardList />

                          <span className="mx-2 text-sm font-medium">
                            About
                          </span>
                        </button>
                      </li>
                      <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                        Customization
                      </label>
                      <li>
                        <button
                          className="w-full flex items-center px-3 py-2 text-secondary transition-colors duration-300 transform rounded-lg hover:text-primary  hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setActiveTab("theme")}
                        >
                          <SwatchBook />

                          <span className="mx-2 text-sm font-medium">
                            Themes
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full flex items-center px-3 py-2 text-secondary transition-colors duration-300 transform rounded-lg hover:text-primary  hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setActiveTab("setting")}
                        >
                          <Settings />

                          <span className="mx-2 text-sm font-medium">
                            Setting
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
              {/* Right Side */}
              <div className="flex mt-10 sm:mt-0 sm:ms-5 w-full">
                <>
                  {activeTab === "posts" && <AdminPosts />}
                  {activeTab === "users" && <AdminUsers />}
                  {activeTab === "stats" && <AdminStats />}
                  {activeTab === "theme" && <Setting />}
                  {activeTab === "performance" && <AdminPerformance />}
                  {activeTab === "setting" && <AdminSettings />}
                  {activeTab === "about" && <AdminAbout />}
                </>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
