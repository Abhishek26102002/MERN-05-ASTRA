import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { PostStore } from "../../ApiStore/PostStore";
import { Link } from "react-router-dom";
import { UserStore } from "../../ApiStore/UserStore";
import { formatDistanceToNowStrict } from "date-fns";
import HomeSection01Skeleton from "../skeleton/HomeSection01Skeleton";
import PostCard from "../../components/PostCard";

const HomeSection01 = (posts) => {
  const { isuserLoading, isLoadingPost } = PostStore();

  if (isuserLoading || isLoadingPost) return <HomeSection01Skeleton />;

  return (
    <div className="flex flex-col sm:flex-row px-8 py-2 gap-4">
      {/* left  */}
      <div className="pe-3 w-full sm:w-[70%]">
        {/* primary */}
        <PostCard
          key={posts.posts[0]._id}
          SinglePost={posts.posts[0]}
          isShowDiscription={false} // isShowDiscription or summany one could be true at a time
          summary={false} // isShowDiscription or summany one could be true at a time
          Rank={1}
          isReverse={false}
          BottomBroder={false}
          ImageSize={"max-w-full sm:max-w-6xl h-52 sm:h-80"}
          title={"text-3xl"}
        />

        {/* Secondary Posts */}
        <div className="flex flex-col sm:flex-row mt-3">
          {posts.posts.slice(1, 3).map((post, index) => (
            <PostCard
              key={post._id}
              SinglePost={post}
              isShowDiscription={false} // isShowDiscription or summany one could be true at a time
              summary={false} // isShowDiscription or summany one could be true at a time
              Rank={index + 2}
              isReverse={false}
              BottomBroder={false}
              ImageSize={"w-96 h-28 sm:h-40"}
              title={"text-2xl"}
            />
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col w-full sm:w-[40%]">
        {posts.posts.slice(3, 7).map((post, index) => (
          <PostCard
            key={post._id}
            SinglePost={post}
            isShowDiscription={false} // isShowDiscription or summany one could be true at a time
            summary={false} // isShowDiscription or summany one could be true at a time
            Rank={index + 4}
            isReverse={false}
            BottomBroder={false}
            ImageSize={"w-52 h-24"}
            title={"text-xl"}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSection01;
