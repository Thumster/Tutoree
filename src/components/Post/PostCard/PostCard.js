import React from "react";
import "./PostCard.css";
import { IoIosHeartEmpty, IoIosHeart, IoMdChatbubbles } from "react-icons/io";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { likePost } from "../../store/actions/postActions";
import { MdAccountCircle } from "react-icons/md";
import Moment from "react-moment";
import { Button } from "reactstrap";
import { IoIosBook } from "react-icons/io";
import {
  MdPermIdentity,
  MdAttachMoney,
  MdLocationOn,
  MdTimer
} from "react-icons/md";

import styled from "styled-components";

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

const StyledProfilePhoto = styled.img`
  border-radius: 50%;
  max-width: 70%;
  max-height: 70%;
  margin: 5% auto;
`;
class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike(e) {
    e.preventDefault();
    this.props.likePost(this.props.post.pid);
  }

  render() {
    const { users, postsLiked, postsLikeCounter } = this.props;
    const author = users ? users[this.props.post.uid] : "LOADING";
    const liked = postsLiked[this.props.post.pid] || false;
    const likeCount = postsLikeCounter[this.props.post.pid];

    const name = author? author.name : "LOADING";

    const photo = author && author.photoURL ? (
      <StyledProfilePhoto src={author.photoURL} />
    ) : (
      <MdAccountCircle className="photo" size="15em" />
    );

    const chatButton = (
      <button type="button" class="btn btn-warning">
        <IoMdChatbubbles color="white" />
      </button>
    );
    const likeButton = (
      <StyledLikeButton color="primary" type="button" onClick={this.toggleLike}>
        {liked ? <StyledFilledHeart color="red" /> : <StyledUnfilledHeart />}
      </StyledLikeButton>
    );

    return (
      <div id="containerid" className="container">
        <div className="row">
          <div className="col-5">
            <div className="row">
              <Link to={"/user/" + this.props.post.uid}>{photo}</Link>
            </div>
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
              <p className="title">
                Title {this.props.post.title}
                <span
                  class="badge badge-dark"
                  style={{ float: "right", marginTop: "3%" }}
                >
                  {this.props.post.category}
                </span>
              </p>
              <p className="subject">
                <IoIosBook style={{ color: "#d6d2c7" }} />{" "}
                {this.props.post.subject}
              </p>
              <p className="name">
                <MdPermIdentity style={{ color: "#d6d2c7" }} /> {name}
              </p>
              <p className="price">
                <MdAttachMoney style={{ color: "#d6d2c7" }} />{" "}
                {this.props.post.price}
              </p>
              <p className="location">
                <MdLocationOn style={{ color: "#d6d2c7" }} />{" "}
                {this.props.post.location}
              </p>
              <p className="createdAt">
                <MdTimer style={{ color: "#d6d2c7" }} />
                <Moment format="HH:mm:ss">{this.props.post.createdAt}</Moment>
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE", state);
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
