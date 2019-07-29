import React from "react";
import styled from "styled-components";
import { Button, Input } from "reactstrap";
import { connect } from "react-redux";
import {
  likePost,
  fetchProfilePage,
  fetchPostsIfNeeded,
  changeProfilePageView,
  getProfilePosts,
  editProfileData,
  submitEditProfile
} from "../store/actions/postActions";
import PostCard from "../Post/PostCard/PostCard";
import { MdAccountCircle, MdDone } from "react-icons/md";
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
      // disabled
      name: true,
      email: true,
      contact: true
    };
  }

  componentDidMount = () => {
    this.props.fetchPostsIfNeeded(this.props.uid);
  };

  handleEdit = event => {
    const boo = this.state[event.currentTarget.id];
    if (!boo) {
      this.props.submitEditProfile(event);
    }
    this.setState({
      [event.currentTarget.id]: !this.state[event.currentTarget.id]
    });
  };

  render() {
    const { userData, isFetching, isUser } = this.props;
    const name = userData ? userData.name : null;
    const email = userData ? userData.email : null;

    const contact = userData ? userData.contact : null;

    const photoIcon = userData ? (
      userData.photoURL ? (
        <ProfilePhoto src={userData.photoURL} />
      ) : (
        <MdAccountCircle className="photo" size="100em" />
      )
    ) : null;

    const { postsView } = this.props;

    const showEditButton = id => {
      const val = this.state[id];
      return val ? (
        <StyledEditButton style={{position:"absolute", right:18 ,marginTop:11}} size="1em" onClick={this.handleEdit} id={id} />
      ) : (
        <MdDone style={{position:"absolute", right:18 ,marginTop:11}} onClick={this.handleEdit} id={id} />
      );
    };

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
            {isUser ? showEditButton("name") : null}
              <Input
                type="text"
                id="name"
                disabled={this.state.name}
                value={this.props.newData.name}
                onChange={this.props.editProfileData}
              />
              
            </span>
            <span>
            {isUser ? showEditButton("email") : null}
              <Input
                type="email"
                id="email"
                disabled={this.state.email}
                value={this.props.newData.email}
                onChange={this.props.editProfileData}
              />
              
            </span>
            <span>
            {isUser ? showEditButton("contact") : null}
              <Input
                id="contact"
                disabled={this.state.contact}
                value={this.props.newData.contact}
                placeholder={"Contact number not provided"}
                onChange={this.props.editProfileData}
              />
              
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
              outline color="primary"
              style={{ margin: 0 }}
              id="listings"
              active={this.props.showListings}
              onClick={this.props.changeProfilePageView}
            >
              Listings
            </Button>
            <Button
              type="button"
              outline color="primary"
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
        
        <div className="jumbotron" style={{minHeight:"700px"}}>
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
  <div style={{marginTop:100}}>
    <p style={{textAlign:"center", fontSize:"200%",color:"#326FA6"}}>LOADING...</p>
    <div style={{display:"block", margin: "auto", width:32}} >
    <ReactLoading color="#326FA6" type="spinningBubbles"  />
    </div>
  </div>
);

const showNoPostsToLoad = () => (
  <div>
    <p>NO POSTS TO LOAD</p>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const currentUid = state.firebase.auth.uid; // Current users uid
  const uid = ownProps.match.params.id; // uid of profile page viewed
  return {
    currentUid: currentUid,
    uid: uid,
    isUser: currentUid === uid,

    userData: state.profilePage.data,
    newData: state.profilePage.newData,

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
    fetchPostsIfNeeded: uid => dispatch(fetchPostsIfNeeded(uid)),
    editProfileData: event => dispatch(editProfileData(event)),
    submitEditProfile: event => dispatch(submitEditProfile(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
