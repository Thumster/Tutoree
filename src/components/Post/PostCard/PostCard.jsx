import React from 'react';
import profilePhoto from './user_photo.png';
import './PostCard.css';

const teacher = {
    imageSrc: { profilePhoto },
    title: "O level subjects by ex-RI boi",
    profile_name: "raffles-ichiban",
    price: "100/hr",
    location: "Tiong Bharu"
}

const PostCard = () => {
    return (
        <div id="containerid" className="container">
            <div className="row">
                <div className="col-3">
                    <div className="row">
                        <img className="photo" src={profilePhoto} />
                    </div>
                    <div className="row">
                        <button type="button" class="btn btn-warning">Message</button>
                    </div>
                </div>
                <div className="col-9">
                    <p>{teacher.title}</p>
                    <p>{teacher.profile_name}</p>
                    <p>{teacher.price}</p>
                    <p>{teacher.location}</p>
                    <p>
                        Desciption blah blah blah nlaalcnaca;ojms;l
                        </p>
                </div>

            </div>
        </div>
    );
}

export default PostCard