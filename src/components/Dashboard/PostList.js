import React from "react";
import PostCard from "../Post/PostCard/PostCard";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const cards = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start"
};

const PostList = props => {
  const { posts } = props;
  const { users } = props;

  return (
    <div style={cards}>
      {posts &&
        posts.map(post => {
          const author = (users && post) ? users[post.uid] : null
          console.log('authorrrrr', author)
          return <PostCard post={post} key={post.id} author={author}/>;
        })}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    users: state.firestore.data.users,
    posts: state.firestore.ordered.posts
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }, { collection: "posts" }])
)(PostList);
