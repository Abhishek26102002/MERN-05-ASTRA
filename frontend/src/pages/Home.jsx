import React, { useEffect } from "react";
import HomeSection01 from "../components/HomeSection01";
import { PostStore } from "../ApiStore/PostStore";
import HomeSection02 from "../components/HomeSection02";
import HomeSection03 from "../components/HomeSection03";

const Home = () => {
  const { fetchAllPost, setallpost } = PostStore();

  // console.log("setallpost",setallpost);
  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <HomeSection01 posts={setallpost.slice(0, 7)} />
      <HomeSection02/>
      <HomeSection03/>
    </div>
  );
};

export default Home;
