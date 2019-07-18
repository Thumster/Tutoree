import React from "react";
import "./PostCard.css";
import { IoIosHeartEmpty, IoIosHeart, IoMdChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

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
    const filledHeart = <IoIosHeart style={{ height: "1.5rem" }} color="red" />;
    const unfilledHeart = <IoIosHeartEmpty style={{ height: "1.5rem" }} />;

    return (
      <div id="containerid" className="container">
        <div className="row">
          <div className="col-5">
            <div className="row">
              {/* <MdAccountCircle className="photo" size="15em" /> */}
              <img src={this.props.author.photoURL} style={{ height: "5em" }} />
            </div>
            <div className="row">
              <div className="flexbutton">
                <button type="button" class="btn btn-warning">
                  <IoMdChatbubbles color="white" />
                </button>
                <button type="button" class="btn btn-light" onClick={this.like}>
                  {this.state.liked ? filledHeart : unfilledHeart}
                </button>
              </div>
            </div>
          </div>
          <div className="col-7">
            <Link to={"/post/" + this.props.post.id}>
              <p className="title">Title {this.props.post.title}</p>
              <p className="subject">Subject {this.props.post.subject}</p>
              <p className="name">Name: {this.props.author.name}</p>
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
