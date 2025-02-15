import React, { useState } from "react";
import { TableOfContents } from "lucide-react";
import WelcomeAdmin from "../components/WelcomeAdmin";
import AdminPosts from "../components/AdminPosts";
import AdminUsers from "../components/AdminUsers";
import AdminStats from "../components/AdminStats";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <>
      <div className="h-full">
        <div className="w-full mx-auto p-4 py-4">
          <div className=" bg-base-300 rounded-xl p-6 space-y-8">
            <div className="hidden sm:flex justify-center ">
              <WelcomeAdmin />
            </div>
            <div className="flex flex-row">
              {/* Left Side /Sidebar */}
              <aside className="w-0 sm:w-96">
                <div className="drawer lg:drawer-open">
                  <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content flex flex-col items-start justify-start">
                    {/* Page content here */}
                    <label
                      htmlFor="my-drawer-2"
                      className="drawer-button lg:hidden"
                    >
                     <TableOfContents />
                    </label>
                  </div>
                  <div className="drawer-side mt-20 sm:mt-0 z-10">
                    <label
                      htmlFor="my-drawer-2"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content  sm:pt-6 w-48 sm:w-80 gap-6 p-4">
                      {/* Sidebar content here */}
                      <li>
                        <button
                          className={`pb-2  pt-4 ${
                            activeTab === "users"
                              ? "border-1 border-black"
                              : "opacity-50"
                          }`}
                          onClick={() => setActiveTab("users")}
                        >
                          Users
                        </button>
                      </li>
                      <li>
                        <button
                          className={`pb-2 pt-4 ${
                            activeTab === "posts"
                              ? "border-1 border-black"
                              : "opacity-50"
                          }`}
                          onClick={() => setActiveTab("posts")}
                        >
                          Posts
                        </button>
                      </li>

                      <li>
                        <button
                          className={`pb-2 pt-4 ${
                            activeTab === "stats"
                              ? "border-1 border-black"
                              : "opacity-50"
                          }`}
                          onClick={() => setActiveTab("stats")}
                        >
                          Stats
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
