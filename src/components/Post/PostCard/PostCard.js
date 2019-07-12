import React from "react";
import profilePhoto from "./user_photo.png";
import "./PostCard.css";
import mailIcon from "./Mail-icon.png";
import unfilledHeart from "./heart_unfilled.png";
import filledHeart from "./heart_filled.png";
import { Link } from "react-router-dom";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.like = this.like.bind(this);
    this.state = {
      liked: false
    };
  }

  like() {
    this.setState({
      liked: !this.state.liked
    });
  }

  render() {
    return (
      <div id="containerid" className="container">
        <div className="row">
          <div className="col-5">
            <div className="row">
              {/* <div className="col"> */}
              <img className="photo" src={profilePhoto} />
              {/* </div> */}
            </div>
            <div className="row">
              <div className="flexbutton">
                <button type="button" class="btn btn-warning">
                  <img src={mailIcon} style={{ height: "1.5rem" }} />
                </button>
                <button type="button" class="btn btn-light">
                  <img
                    onClick={this.like}
                    src={this.state.liked ? filledHeart : unfilledHeart}
                    style={{ height: "1.5rem" }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="col-7">
            <Link to={"/post/" + this.props.post.id}>
              <p className="title">Title {this.props.post.title}</p>
              <p className="subject">Subject {this.props.post.subject}</p>
              <p className="name">Name: {this.props.authorName}</p>
              <p className="price">Price: {this.props.post.price}</p>
              <p className="location">Location: {this.props.post.location}</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;
