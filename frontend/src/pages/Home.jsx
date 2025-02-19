import React, { useEffect } from "react";
import HomeSection01 from "../components/HomeSection01";
import { PostStore } from "../ApiStore/PostStore";
import HomeSection02 from "../components/HomeSection02";
import HomeSection03 from "../components/HomeSection03";
import HomeSection04 from "../components/HomeSection04";

const Home = () => {
  const { fetchAllPost, setallpost } = PostStore();

  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <HomeSection01 posts={setallpost?.slice(0, 7)} />
      <HomeSection02 posts={setallpost?.slice(7, 10)} />
      <HomeSection03 posts={setallpost?.slice(10, 14)} />
      <HomeSection04 posts={setallpost?.slice(14)} />
    </div>
  );
};

export default Home;
