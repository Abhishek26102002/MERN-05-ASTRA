import React, { useState } from "react";
import {
  Presentation,
  ChartLine,
  UserPen,
  GalleryThumbnails,
  ClipboardList,
  SwatchBook,
  Settings,
} from "lucide-react";

const NavbarAside = () => {
  return (
    <>
      <aside className="menu flex flex-col sm:pt-6 w-40 sm:w-60 gap-6 p-4">
        <a href="#">
          <img className="w-auto h-7" src="./logo04.png" alt="" />
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                analytics
              </label>

              <button
                className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <Presentation />

                <span className="mx-2 text-sm font-medium">Stats</span>
              </button>

              <button
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <ChartLine />

                <span className="mx-2 text-sm font-medium">Preformance</span>
              </button>
            </div>

            <div className="space-y-3 ">
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                content
              </label>

              <button
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <UserPen />

                <span className="mx-2 text-sm font-medium">Users</span>
              </button>

              <button
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <GalleryThumbnails />

                <span className="mx-2 text-sm font-medium">Posts</span>
              </button>

              <button
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <ClipboardList />

                <span className="mx-2 text-sm font-medium">About</span>
              </button>
            </div>

            <div className="space-y-3 ">
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                Customization
              </label>

              <button
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <SwatchBook />

                <span className="mx-2 text-sm font-medium">Themes</span>
              </button>

              <button
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                href="#"
              >
                <Settings />

                <span className="mx-2 text-sm font-medium">Setting</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default NavbarAside;

{
  /* <>
<div className="h-full pt-5 ">
  <div className="w-full sm:w-[80%] mx-auto">
    <div className="bg-base-300 pb-10 pt-10 rounded-xl">
      Test
      
    </div>
  </div>
</div>
</> */
}
