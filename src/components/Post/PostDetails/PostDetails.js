import React from "react";
import "./PostDetails.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Moment from "react-moment";
import ReactLoading from "react-loading";
import { MdAccountCircle } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

import styled from "styled-components";

class PostDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts, post, author, isUser } = this.props;

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
                    {isUser ? <DeleteModal pid={this.props.pid}/> : null}
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
    author: author
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "posts" }, { collection: "users" }])
)(PostDetails);
