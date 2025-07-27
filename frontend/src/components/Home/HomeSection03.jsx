import { PostStore } from "../../ApiStore/PostStore";
import HomeSection01Skeleton from "../skeleton/HomeSection01Skeleton";
import PostCard from "../../components/PostCard";

const HomeSection03 = (posts) => {
  const { isuserLoading, isLoadingPost } = PostStore();

  if (isuserLoading || isLoadingPost) return <HomeSection01Skeleton />;
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-1 px-3 w-full">
        {posts.posts.map((post, index) => (
          <PostCard
           key={post._id}
            SinglePost={post}
            isShowDiscription={false} // isShowDiscription or summany one could be true at a time
            summary={true} // isShowDiscription or summany one could be true at a time
            Rank={false}
            isReverse={true}
            BottomBroder={false}
            ImageSize={"w-full sm:w-60 h-40 sm:h-40"}
            title={"text-xl"}
          />
        ))}
      </div>
    </>
  );
};

export default HomeSection03;
