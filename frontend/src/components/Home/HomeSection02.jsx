import { PostStore } from "../../ApiStore/PostStore";
import TrendingStories from "./TrendingStories";
import HomeSection01Skeleton from "../skeleton/HomeSection01Skeleton";
import PostCard from "../../components/PostCard";

const HomeSection02 = (posts) => {
  const { isuserLoading, isLoadingPost } = PostStore();

  if (isuserLoading || isLoadingPost) return <HomeSection01Skeleton />;
  return (
    <div className="flex flex-row p-0 sm:p-6 w-full">
      {/* Left Container: Blog Posts */}
      <div className="w-full sm:w-[70%]">
        {posts.posts.map((post) => (
          <PostCard
           key={post._id}
            SinglePost={post}
            isShowDiscription={true} // isShowDiscription or summany one could be true at a time
            summary={false} // isShowDiscription or summany one could be true at a time
            Rank={false}
            isReverse={false}
            BottomBroder={true}
            ImageSize={"w-60 h-28 sm:h-40"}
            title={"text-2xl"}
          />
        ))}
      </div>

      {/* Right Container: Trending Section */}
    </div>
  );
};

export default HomeSection02;
