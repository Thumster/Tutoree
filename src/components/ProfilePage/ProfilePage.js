import React from "react";
import profilePhoto from "../../images/orangeBoxLmao.png";
import styled from "styled-components";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import {
  likePost,
  fetchProfilePage,
  changeProfilePageView,
  getProfilePosts
} from "../store/actions/postActions";
import PostCard from "../Post/PostCard/PostCard";

const cards = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start"
};

const ProfilePhoto = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const ProfileDetails = styled.p`
  font-size: 140%;
  text-align: center;
  background: blue;
  padding: 5%;
  border-radius: 10px;
`;
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.fetchProfilePage(this.props.currentUid);
  };

  render() {
    const { posts, users, userData } = this.props;
    // SPINNER LOGIC TBD
    // const userData = this.props.users ? users[this.props.uid] : null
    const name = userData ? userData.name : null;
    const email = userData ? userData.email : null;
    
    const contactNo = userData
      ? userData.contactNo || "ContactNo not stated"
      : null;

    const photoIcon = userData ? (
      userData.photoURL ? (
        <ProfilePhoto src={userData.photoURL} />
      ) : (
        //   RYUTO: CREATE A TEMP PHOTO HERE
        <ProfilePhoto src={profilePhoto} />
      )
    ) : null;
    const { postsView } = this.props;

    const showCards = posts => (
      <div>
        <div style={cards}>
          {posts &&
            posts.map(post => {
              return <PostCard post={post} key={post.pid} />;
            })}
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="jumbotron">
          {/* PHOTO & USER DETAILS */}
          <div className="row">
            <div className="col-4">{photoIcon}</div>
            <div
              className="col-8"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <ProfileDetails>{name}</ProfileDetails>
              <ProfileDetails>{email}</ProfileDetails>
              <ProfileDetails>{contactNo}</ProfileDetails>
            </div>
          </div>
          {/* BUTTONS */}
          <div className="row">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic example"
              style={{ marginTop: "10%" }}
            >
              <Button
                type="button"
                class="btn btn-primary"
                style={{ margin: 0 }}
                id="listings"
                active={this.props.profilePage.showListings}
                onClick={this.props.changeProfilePageView}
              >
                Listings
              </Button>
              <Button
                type="button"
                class="btn btn-secondary"
                style={{ margin: 0 }}
                id="liked"
                active={!this.props.profilePage.showListings}
                onClick={this.props.changeProfilePageView}
              >
                Liked
              </Button>
              {/* Posting cards */}
              {postsView.length > 0
                ? showCards(postsView)
                : showNoPostsToLoad()}
              {/* LOAD SPINNER ON NULL */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const showNoPostsToLoad = () => (
  <div>
    <p>NO POSTS TO LOAD</p>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  console.log("STATE", state);
  const currentUid = state.firebase.auth.uid;
  const uid = ownProps.match.params.id;
  return {
    currentUid: currentUid,
    uid: uid,
    isUser: currentUid === uid,

    userData: state.users[uid],
    users: state.users,
    posts: state.posts.data,
    postsLiked: state.postsLiked,
    postsLikeCounter: state.postsLikeCounter,
    postsView: getProfilePosts(state),

    profilePage: state.profilePage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePost: (liked, pid) => dispatch(likePost(liked, pid)),
    fetchProfilePage: uid => dispatch(fetchProfilePage(uid)),
    changeProfilePageView: event => dispatch(changeProfilePageView(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
