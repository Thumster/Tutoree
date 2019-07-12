import React from "react";
import PostCard from "../Post/PostCard/PostCard";
import { Link } from "react-router-dom";

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
          return (
            <Link to={"/post/" + post.id}>
              <PostCard post={post} key={post.id} />
            </Link>
          );
        })}
    </div>
  );
};

export default PostList;
