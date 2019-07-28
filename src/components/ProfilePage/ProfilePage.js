import React from "react";
import profilePhoto from "../../images/orangeBoxLmao.png";
import styled from "styled-components";
import { Button, Input } from "reactstrap";
import { connect } from "react-redux";
import {
  likePost,
  fetchProfilePage,
  fetchPostsIfNeeded,
  changeProfilePageView,
  getProfilePosts
} from "../store/actions/postActions";
import PostCard from "../Post/PostCard/PostCard";
import { MdAccountCircle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ReactLoading from "react-loading";

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

const StyledEditButton = styled(FaEdit)`
  :hover {
    transform: scale(1.2);
  }
`;

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      name: false,
      email: false,
      contact: false
    };
  }

  componentDidMount = () => {
    this.props.fetchPostsIfNeeded(this.props.uid);
  };

  handleEdit = event => {
    console.log(event.target);
    this.setState({ [event.target.id]: !event.target.value });
  };

  render() {
    const { userData, isFetching, isUser } = this.props;
    const name = userData ? userData.name : null;
    const email = userData ? userData.email : null;

    const contactNo = userData
      ? userData.contactNo || "Contact not stated"
      : null;

    const photoIcon = userData ? (
      userData.photoURL ? (
        <ProfilePhoto src={userData.photoURL} />
      ) : (
        <MdAccountCircle className="photo" size="100em" />
      )
    ) : null;

    const { postsView } = this.props;

    const showProfilePage = (
      <div>
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
            <span>
              <Input disabled={true} value={name} />
              {isUser ? (
                <span
                  onClick={this.handleEdit}
                  id="name"
                  value={this.state.name}
                >
                  <StyledEditButton size="1em" />
                </span>
              ) : null}
            </span>
            <span>
              <Input disabled={true} value={email} />
              {isUser ? (
                <StyledEditButton
                  id="email"
                  value={this.state.email}
                  size="1em"
                  onClick={this.handleEdit}
                />
              ) : null}
            </span>
            <span>
              <Input disabled={true} value={contactNo} />
              {isUser ? (
                <StyledEditButton
                  id="contact"
                  value={this.state.contact}
                  size="1em"
                  onClick={this.handleEdit}
                />
              ) : null}
            </span>
          </div>
        </div>
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
              active={this.props.showListings}
              onClick={this.props.changeProfilePageView}
            >
              Listings
            </Button>
            <Button
              type="button"
              class="btn btn-secondary"
              style={{ margin: 0 }}
              id="liked"
              active={!this.props.showListings}
              onClick={this.props.changeProfilePageView}
            >
              Liked
            </Button>
          </div>
        </div>
        <div className="row">
            {isFetching
              ? showSpinner()
              : postsView.length > 0
              ? showCards(postsView)
              : showNoPostsToLoad()}
        
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="jumbotron">
          {userData ? showProfilePage : showSpinner()}
        </div>
      </div>
    );
  }
}

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

const showSpinner = () => (
  <div className="container center">
    <p>LOADING...</p>
    <ReactLoading type="spinningBubbles" color="#457cc9" />
  </div>
);

const showNoPostsToLoad = () => (
  <div>
    <p>NO POSTS TO LOAD</p>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  console.log("STATE", state);
  const currentUid = state.firebase.auth.uid; // Current users uid
  const uid = ownProps.match.params.id; // uid of profile page viewed
  return {
    currentUid: currentUid,
    uid: uid,
    isUser: currentUid === uid,

    userData: state.profilePage.data,

    isFetching: state.posts.isFetching,

    postsLiked: state.postsLiked,
    postsLikeCounter: state.postsLikeCounter,
    postsView: getProfilePosts(state),

    showListings: state.profilePage.showListings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePost: (liked, pid) => dispatch(likePost(liked, pid)),
    changeProfilePageView: event => dispatch(changeProfilePageView(event)),
    fetchPostsIfNeeded: uid => dispatch(fetchPostsIfNeeded(uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
