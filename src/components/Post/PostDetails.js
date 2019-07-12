import React from "react";
import NavSearched from "../Nav/NavSearched";
import profilePhoto from "../Post/PostCard/user_photo.png";
import "./PostDetails.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const PostDetails = props => {
  const { post } = props;

  if (post) {
    return (
        <div>
          <header className="header">
            <NavSearched />
          </header>
          <div className="empty-space">ugkgkbjk</div>
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
                      <p className="pd-timeStamp">Posted: </p>
                      <p className="pd-price">Price: {post.price}</p>
                      <div className="jumbotron desc">
                        <p>Descripton</p>
                        <p>
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="jumbotron ud">
                      <div className="row">
                        <div className="col-5">
                          <div className="row">
                            <img src={post.photoUrl} className="ud profilePhoto" />
                          </div>
                          <div className="row">
                            <button type="button" class="btn btn-warning">
                              Message
                            </button>
                          </div>
                        </div>
                        <div className="col-7">
                          <p className="name ud">{post.authorName}</p>
                          <p className="email ud">Email: </p>
                          <p className="contact ud">Contact No.:</p>
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
      <div className="container center">
        <p>LOADING POST...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => state => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  return {
    post: post
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "posts" }])
)(PostDetails);
