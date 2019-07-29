import React from "react";
import "./PostDetails.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import DeleteModal from "./DeleteModal";

import ReactLoading from "react-loading";
import Moment from "react-moment";
import {
  MdAccountCircle,
  MdTimer,
  MdAttachMoney,
  MdLocationOn
} from "react-icons/md";
import { likePost } from "../../store/actions/postActions";
import {
  IoIosHeartEmpty,
  IoIosHeart,
  IoIosMail,
  IoMdHeart,
  IoIosPhonePortrait
} from "react-icons/io";
import { Button } from "reactstrap";
import defaultUserIcon from "../../../images/usericon.jpg";
import styled from "styled-components";
import { FiPrinter } from "react-icons/fi";

const StyledLikeButton = styled(Button)`
  color: lightblue;
  border-radius: 0;
  margin: 5% auto;
  float: right;
`;

const StyledFilledHeart = styled(IoIosHeart)`
  height: "1.5rem";
  ${StyledLikeButton}:hover & {
    transform: scale(1.2);
  }
`;

const StyledUnfilledHeart = styled(IoIosHeartEmpty)`
  height: "1.5rem";
  ${StyledLikeButton}:hover & {
    animation: 0.8s 3 beatHeart;
  }

  @keyframes beatHeart {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    40% {
      transform: scale(1);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const StyledUserIcon = styled.img`
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  width: 70%;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

class PostDetails extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike(e) {
    e.preventDefault();
    this.props.likePost(this.props.post.pid);
  }
  render() {
    const { posts, post, author, isUser, postsLiked } = this.props;

    const liked = postsLiked[this.props.pid] || false;

    // POST VARIABLES
    const title = post ? post.title || "Title not stated" : null;
    const subject = post ? post.subject || "Subject not stated" : null;
    const createdAt = post ? (
      post.createdAt.toString() ? (
        <Moment fromNow ago>
          {post.createdAt.toString()}
        </Moment>
      ) : (
        "Time not captured"
      )
    ) : null;
    const price = post ? post.price || "Price not stated" : null;
    const description = post
      ? post.description || "Description not stated"
      : null;
    const location = post ? post.location || "Location no stated" : null;
    const likes = post ? post.likes || "0" : null;

    // AUTHOR VARIABLES
    const authorPhoto = author ? (
      <StyledUserIcon
        src={author.photoURL || defaultUserIcon}
        // className="ud profilePhoto"
      />
    ) : null;
    const authorName = author ? author.name || "Annonymous" : null;
    const authorEmail = author ? author.email || "Email not provided" : null;
    const authorContact = author
      ? author.contact || "Contact number not provided"
      : null;

    const likeButton = (
      <StyledLikeButton color="primary" type="button" onClick={this.toggleLike}>
        {liked ? <StyledFilledHeart color="red" /> : <StyledUnfilledHeart />}
      </StyledLikeButton>
    );

    const showPostDetails = (
      <div>
        <header className="header" />
        <div className="container" id="content">
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="jumbotron pd">
                    {isUser ? <DeleteModal pid={this.props.pid} /> : null}
                    {likeButton}
                    <p className="pd-title">{title}</p>
                    <span class="badge badge-info" id="subjectBadge">
                      {subject}
                    </span>
                    <p className="pd-timeStamp">
                      <MdTimer /> {createdAt} ago
                    </p>
                    <p className="pd-price">
                      <MdAttachMoney /> {price}
                    </p>
                    <p className="pd-location">
                      <MdLocationOn /> {location}
                    </p>
                    <p className="pd-price">
                      <IoMdHeart /> {likes}
                    </p>
                    <div className="jumbotron desc">
                      <p style={{fontWeight: "bold"}}>Description</p>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="jumbotron ud">
                    <div className="row">
                      <div className="col-5">
                        <div className="row">
                          <div className="col">
                          <Link to={"/user/" + this.props.uid}>
                            {authorPhoto}
                          </Link>
                        </div>
                        </div>
                        <div className="row">
                          <button
                            type="button"
                            class="btn btn-warning"
                            style={{
                              display: "block",
                              margin: "0 auto",
                              width: "50%",
                              marginTop: "5px"
                            }}
                          >
                            Message
                          </button>
                        </div>
                      </div>
                      <div className="col-7">
                        <p className="name ud">{authorName}</p>
                        <p className="email ud" style={{ margin: "20px 0" }}>
                          <IoIosMail /> {authorEmail}
                        </p>
                        <p className="contact ud">
                          <IoIosPhonePortrait /> {authorContact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const showSpinner = () => (
      <div style={{ marginTop: 100 }}>
        <p style={{ textAlign: "center", fontSize: "200%", color: "#326FA6" }}>
          LOADING...
        </p>
        <div style={{ display: "block", margin: "auto", width: 32 }}>
          <ReactLoading color="#326FA6" type="spinningBubbles" />
        </div>
      </div>
    );

    const showInvalid = (
      <div>
        <p>INVALID LINK</p>
      </div>
    );

    return (
      <div>
        {post && author ? showPostDetails : !posts ? showSpinner : showInvalid}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => state => {
  const pid = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[pid] : null;

  const currentUid = state.firebase.auth.uid;
  const uid = post ? post.uid : null;
  const users = state.firestore.data.users;
  const author = users && post ? users[post.uid] : null;
  return {
    pid: pid,
    uid: uid,
    isUser: currentUid === uid,
    posts: posts,
    post: post,
    author: author,
    postsLiked: state.postsLiked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePost: (liked, pid) => dispatch(likePost(liked, pid))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "posts" }, { collection: "users" }])
)(PostDetails);
