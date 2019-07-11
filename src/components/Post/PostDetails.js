import React, { Component } from 'react';

const PostDetails = (props) => {
    const id = props.match.params.id;
    return (
        <div className = "container section post-details">
            <div className = "card z-depth-0">
                <div className = "card-content">
                    <span className = "card-title">Post Title - {id}</span>
                    <p> bla bla bla</p>
                </div>
                <div className = "card-action grey lighten-4 grey-text">
                    <div>Posted by ME</div>
                    <div>DATE POSTED</div>
                </div>
            </div>
        </div>
    );

}

export default PostDetails;