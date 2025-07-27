import React, { useEffect, useState } from "react";
import HomeSection01 from "../components/Home/HomeSection01";
import { PostStore } from "../ApiStore/PostStore";
import HomeSection02 from "../components/Home/HomeSection02";
import HomeSection03 from "../components/Home/HomeSection03";
import { useSearch } from "../lib/SearchContext";
import Footer from "../components/Footer";
import HomeMobile from "../components/Home/HomeMobile";

const Home = () => {
  const { searchQuery } = useSearch();
  const { fetchAllPost, setallpost } = PostStore();

  useEffect(() => {
    fetchAllPost();
  }, []);
  // Filter posts based on search
  const filteredPosts = setallpost?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    checkScreenSize(); // check initially
    window.addEventListener("resize", checkScreenSize); // check on resize

    return () => window.removeEventListener("resize", checkScreenSize); // cleanup
  }, []);
  return (
    <>
      {isMobile ? (
        <>
          {filteredPosts.map((post) => (
            <HomeMobile key={post._id} SinglePost={post} />
          ))}
        </>
      ) : filteredPosts.length > 0 ? (
        <div className="h-full flex flex-col justify-center items-center mb-3">
          <HomeSection01 posts={filteredPosts?.slice(0, 7)} />
          <HomeSection02 posts={filteredPosts?.slice(7, 10)} />
          <HomeSection03 posts={filteredPosts?.slice(10, 14)} />
          <HomeSection02 posts={filteredPosts?.slice(14)} />
        </div>
      ) : (
        <p className="text-center text-gray-500">No matching posts found.</p>
      )}

      <Footer />
    </>
  );
};

export default Home;
