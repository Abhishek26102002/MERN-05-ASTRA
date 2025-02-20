import React, { useEffect } from "react";
import HomeSection01 from "../components/HomeSection01";
import { PostStore } from "../ApiStore/PostStore";
import HomeSection02 from "../components/HomeSection02";
import HomeSection03 from "../components/HomeSection03";
import HomeSection04 from "../components/HomeSection04";
import { useSearch } from "../lib/SearchContext";

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
      post.blogText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {filteredPosts.length > 0 ? (
        <div className="h-full flex flex-col justify-center items-center">
          <HomeSection01 posts={filteredPosts?.slice(0, 7)} />
          <HomeSection02 posts={filteredPosts?.slice(7, 10)} />
          <HomeSection03 posts={filteredPosts?.slice(10, 14)} />
          <HomeSection04 posts={filteredPosts?.slice(14)} />
        </div>
      ) : (
        <p className="text-center text-gray-500">No matching posts found.</p>
      )}
    </>
  );
};

export default Home;
