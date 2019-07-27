import React from "react";
import profilePhoto from "../../images/orangeBoxLmao.png";
import styled from "styled-components";
import PostList from "../Dashboard/PostList";

const ProfilePhoto = styled.img`
    width: 100%;
    border-radius: 50%;
`

const ProfileDetails = styled.p`
    font-size: 140%;
    text-align: center;
    background: blue;
    padding: 5%;
    border-radius: 10px

`
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.clickPostings = this.clickPostings.bind(this);
        this.clickLiked = this.clickLiked.bind(this);
        this.state = {
            postCardShown : "nil"
        };
    }
    
    clickPostings() {
        this.setState({
            postCardShown : "Postings"
        });
    }

    clickLiked() {
        this.setState({
            postCardShown : "Liked"
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    {/* photo and details */}
                    <div className="row"> 
                        <div className="col-4">
                            <ProfilePhoto src={profilePhoto}/>
                        </div>
                        <div className="col-8" style={{display:"flex", flexDirection:"column", justifyContent: "space-between"}}>
                            <ProfileDetails>Ryuto Sunaga</ProfileDetails>
                            <ProfileDetails>sunagaryuto@gmail.com</ProfileDetails>
                            <ProfileDetails>87772190</ProfileDetails>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="row">
                        {(() => {
                            switch(this.state.postCardShown) {
                                case "Postings" :
                                    return (
                                    <div class="btn-group" role="group" aria-label="Basic example" style={{marginTop:"10%"}}>
                                    <button type="button" class="btn btn-primary" style={{margin:0}} onClick={this.clickPostings} >Postings</button>
                                    <button type="button" class="btn btn-secondary" style={{margin:0}} onClick={this.clickLiked}>Liked</button>
                                    {/* Posting cards */}
                                    </div>);
                                case "Liked" :
                                    return (
                                    <div class="btn-group" role="group" aria-label="Basic example" style={{marginTop:"10%"}}>
                                    <button type="button" class="btn btn-secondary" style={{margin:0}} onClick={this.clickPostings} >Postings</button>
                                    <button type="button" class="btn btn-primary" style={{margin:0}} onClick={this.clickLiked}>Liked</button>
                                    </div>);
                                default :
                                    return (
                                    <div class="btn-group" role="group" aria-label="Basic example" style={{marginTop:"10%"}}>
                                    <button type="button" class="btn btn-secondary" style={{margin:0}} onClick={this.clickPostings} >Postings</button>
                                    <button type="button" class="btn btn-secondary" style={{margin:0}} onClick={this.clickLiked}>Liked</button>
                                    </div>);
                            }
                        })()}

                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;