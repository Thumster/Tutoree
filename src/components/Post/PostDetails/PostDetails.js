import React from "react";
import "./PostDetails.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Moment from "react-moment";
import ReactLoading from "react-loading";
import { MdAccountCircle } from "react-icons/md";

class PostDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { posts } = this.props;
    const { post } = this.props;
    const { author } = this.props;

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
                        <div className="row">{authorPhoto}</div>
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

    const showSpinner = (
      <div className="container center">
        <p>LOADING POST...</p>
        <ReactLoading type="spinningBubbles" color="#457cc9" />
      </div>
    )

    const showInvalid = (
      <div>
        <p>INVALID LINK</p>
      </div>
    );

    return (
      <div>
        {post && author
          ? showPostDetails
          : !posts
          ? showSpinner
          : showInvalid}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => state => {
  const pid = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[pid] : null;
  const users = state.firestore.data.users;
  const author = users && post ? users[post.uid] : null;
  return {
    posts: posts,
    post: post,
    author: author
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "posts" }, { collection: "users" }])
)(PostDetails);
