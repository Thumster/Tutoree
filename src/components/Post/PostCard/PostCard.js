import React from 'react';
import profilePhoto from './user_photo.png';
import './PostCard.css';

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
                <div className="col-3">
                    <div className="row">
                        <img className="photo" src={post.photoUrl} />
                    </div>
                    <div className="row">
                        <button type="button" class="btn btn-warning">Message</button>
                    </div>
                </div>
                <div className="col-9">
                    <h1>{post.title}</h1>
                    <h4>{post.profile_name}</h4>
                    <h4>{post.price}</h4>
                    <h4>{post.location}</h4>
                    <p>
                        {post.description}
                        </p>
                </div>

            </div>
        </div>
    );
}

export default PostCard