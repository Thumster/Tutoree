import React from "react";
import PostCard from "../Post/PostCard/PostCard";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { fetchPostsIfNeeded } from "../store/actions/postActions";
import ReactLoading from "react-loading";
import Filter from "./Filter";
import { filterPosts } from "../store/actions/filterActions";

const cards = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start"
};

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("mounted");
    this.props.fetchPostsIfNeeded().then(() => this.props.filterPosts());
  };

  render() {
    const data = this.props.displayedPosts;
    const { isFetching } = this.props;
    console.log("DISPLAYED POSTS", data);
    return (
      <div>
        {isFetching ? (
          showSpinner()
        ) : data.length > 0 ? (
          <div>
            <Filter /> {showCards(data)}
          </div>
        ) : (
          showNoPostsToLoad()
        )}
      </div>
    );
  }
}

const showCards = posts => (
  <div style={cards}>
    {posts &&
      posts.map(post => {
        return <PostCard post={post} key={post.pid} />;
      })}
  </div>
);

const showSpinner = () => (
  <div>
    <p>FETCHING POSTS...</p>
    <ReactLoading type="spinningBubbles" color="#457cc9" />
  </div>
);

const showNoPostsToLoad = () => (
  <div>
    <p>NO POSTS TO LOAD</p>
  </div>
);

const mapStateToProps = state => {
  console.log("STATE", state);
  return {
    users: state.firestore.data.users,
    posts: state.posts,
    displayedPosts: state.displayedPosts.data,
    isFetching: state.posts.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPostsIfNeeded: () => dispatch(fetchPostsIfNeeded()),
    filterPosts: () => dispatch(filterPosts())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }, { collection: "posts" }])
)(PostList);
