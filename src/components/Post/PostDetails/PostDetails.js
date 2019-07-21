import React from "react";
import NavSearched from "../../Nav/NavSearched";
import "./PostDetails.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Moment from "react-moment";
import ReactLoading from "react-loading";

const PostDetails = props => {
  const { post } = props;
  const { author } = props;

  if (post && author) {
    return (
      <div>
        <header className="header">
          <NavSearched />
        </header>
        <div className="empty-space">EMPTY SPACE</div>
        <div className="container" id="content">
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="jumbotron pd">
                    <p className="pd-title">{post.title}</p>
                    <span class="badge badge-info" id="subjectBadge">
                      {post.subject}
                    </span>
                    <p className="pd-timeStamp">
                      Posted:{" "}
                      <Moment fromNow ago>
                        {post.createdAt}
                      </Moment>{" "}
                      ago
                    </p>
                    <p className="pd-price">Price: $ {post.price}</p>
                    <div className="jumbotron desc">
                      <p>Descripton</p>
                      <p>{post.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="jumbotron ud">
                    <div className="row">
                      <div className="col-5">
                        <div className="row">
                          <img
                            src={author.photoURL}
                            className="ud profilePhoto"
                          />
                        </div>
                        <div className="row">
                          <button type="button" class="btn btn-warning">
                            Message
                          </button>
                        </div>
                      </div>
                      <div className="col-7">
                        <p className="name ud">{author.name}</p>
                        <p className="email ud">Email: {author.email}</p>
                        <p className="contact ud">Contact No:</p>
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
  } else {
    return (
      <div>
        <NavSearched />
        <div className="container center">
          <p>LOADING POST...</p>
          <ReactLoading type="spinningBubbles" color="#457cc9" />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => state => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  const users = state.firestore.data.users;
  const author = users && post ? users[post.uid] : null;
  return {
    post: post,
    author: author
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "posts" }, { collection: "users" }])
)(PostDetails);
