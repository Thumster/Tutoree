import React from "react";
import "./PostCard.css";
import { IoIosHeartEmpty, IoIosHeart, IoMdChatbubbles } from "react-icons/io";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { likePost } from "../../store/actions/postActions";
import { MdAccountCircle } from "react-icons/md";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this);
  }

  componentDidMount = () => {};

  toggleLike(e) {
    e.preventDefault();
    this.props.likePost(this.props.post.pid);
  }

  render() {
    // {console.log("RPOPS", this.props)}

    const author = this.props.users[this.props.post.uid];
    const liked = this.props.postsLiked[this.props.post.pid] || false;
    const likeCount = this.props.postsLikeCounter[this.props.post.pid];

    const filledHeart = <IoIosHeart style={{ height: "1.5rem" }} color="red" />;
    const unfilledHeart = <IoIosHeartEmpty style={{ height: "1.5rem" }} />;

    const photo = author.photoURL ? (
      <img src={author.photoURL} style={{ height: "5em" }} />
    ) : (
      <MdAccountCircle className="photo" size="15em" />
    );

    const chatButton = (
      <button type="button" class="btn btn-warning">
        <IoMdChatbubbles color="white" />
      </button>
    );
    const likeButton = (
      <button type="button" class="btn btn-light" onClick={this.toggleLike}>
        {liked ? filledHeart : unfilledHeart}
      </button>
    );

    return (
      <div id="containerid" className="container">
        <div className="row">
          <div className="col-5">
            <div className="row">{photo}</div>
            <div className="row">
              <div className="flexbutton">
                {chatButton}
                <span>
                  {likeButton}
                  {likeCount}
                </span>
              </div>
            </div>
          </div>
          <div className="col-7">
            <Link to={"/post/" + this.props.post.pid}>
              <p className="title">Title {this.props.post.title}</p>
              <p className="subject">Subject {this.props.post.subject}</p>
              <p className="name">Name: {author.name}</p>
              <p className="price">Price: {this.props.post.price}</p>
              <p className="location">Location: {this.props.post.location}</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firestore.data.users,
    postsLiked: state.postsLiked,
    postsLikeCounter: state.postsLikeCounter
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
  firestoreConnect([{ collection: "users" }])
)(PostCard);
