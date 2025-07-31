import UserProfilePostCard from "./UserProfilePostCard";

const UserPost = (setPost) => {
  return (
    <>
      {setPost?.setpost?.map((post) => (
        <UserProfilePostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default UserPost;
