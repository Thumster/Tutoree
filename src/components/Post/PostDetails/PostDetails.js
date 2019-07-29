import React from "react";
import "./PostDetails.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import DeleteModal from "./DeleteModal";

import ReactLoading from "react-loading";
import Moment from "react-moment";
import { MdAccountCircle } from "react-icons/md";
import { likePost } from "../../store/actions/postActions";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Button } from "reactstrap";

import styled from "styled-components";
import { FiPrinter } from "react-icons/fi";

const StyledLikeButton = styled(Button)`
  color: lightblue;
  border-radius: 0;
  margin: 5% auto;
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

    // AUTHOR VARIABLES
    const authorPhoto = author ? (
      author.photoURL ? (
        <img src={author.photoURL} className="ud profilePhoto" />
      ) : (
        <MdAccountCircle className="ud profilePhoto" />
      )
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
        <div className="empty-space">EMPTY SPACE</div>
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
                    <p className="pd-timeStamp">Posted: ago {createdAt}</p>
                    <p className="pd-price">Price: S$ {price}</p>
                    <div className="jumbotron desc">
                      <p>Descripton</p>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="jumbotron ud">
                    <div className="row">
                      <div className="col-5">
                        <div className="row">
                          <Link to={"/user/" + this.props.uid}>
                            {authorPhoto}
                          </Link>
                        </div>
                        <div className="row">
                          <button type="button" class="btn btn-warning">
                            Message
                          </button>
                        </div>
                      </div>
                      <div className="col-7">
                        <p className="name ud">{authorName}</p>
                        <p className="email ud">Email: {authorEmail}</p>
                        <p className="contact ud">
                          Contact No: {authorContact}
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
