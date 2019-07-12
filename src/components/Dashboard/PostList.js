import React from "react";
import PostCard from "../Post/PostCard/PostCard";

const cards = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start"
};

const PostList = ({ posts }) => {
  return (
    <div style={cards}>
      {posts &&
        posts.map(post => {
          return <PostCard post={post} key={post.id} />;
        })}
    </div>
  );
};

export default PostList;
