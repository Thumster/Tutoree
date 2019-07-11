import React from 'react';
import profilePhoto from './user_photo.png';
import './PostCard.css';
import mailIcon from './Mail-icon.png';

const teacher = {
    photoUrl: { profilePhoto },
    title: "O level subjects by ex-RI boi",
    profile_name: "raffles-ichiban",
    price: "100/hr",
    location: "Tiong Bharu"
}

const PostCard = ({post}) => {
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
                            <button type="button" class="btn btn-warning"><img src={mailIcon} style={{height:"1.5rem"}}/></button>
                            <button type="button" class="btn btn-secondary"><img src={mailIcon} style={{height:"1.5rem"}}/></button>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <p className="title">Title {post.title}</p>
                    <p className="name">Name: {post.profile_name}</p>
                    <p className="price">Price: {post.price}</p>
                    <p className="location">Location: {post.location}</p>
                </div>

            </div>
        </div>
    );
}

export default PostCard