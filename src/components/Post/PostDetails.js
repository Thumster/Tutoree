import React from "react";
import NavSearched from "../Nav/NavSearched";
import profilePhoto from "../Post/PostCard/user_photo.png";
import "./PostDetails.css";

const teacher = {
    imageSrc: { profilePhoto },
    title: "O level subjects by ex-RI boi",
    profile_name: "raffles-ichiban",
    price: "100/hr",
    location: "Tiong Bharu"
}

export default class PostDetails extends React.Component {
    render(){
        return(
            <div>
                <header className="header">
                <NavSearched/>
                </header>
                <div className="empty-space">ugkgkbjk</div>
                <div className="container" id="content">
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-3">
                                    <img src={profilePhoto} className="profilePhoto" />
                                </div>
                                <div className="col-9">
                                    <h1>{teacher.title}</h1>
                                    <h4>{teacher.profile_name}</h4>
                                    <h4>{teacher.price}</h4>
                                    <h4>{teacher.location}</h4>
                                </div>
                            </div>

                            <div className="row jumbotron" id="description">
                                <div className="row">
                                    <div className="col">
                                        <h1 style={{ textDecoration: "underline" }}>Description</h1>
                                        <h4>ascascascasad sDCSKYg usgilhskd.
                                            acaicuacuichbiasxdfsbsdb s k hasd.acsafvsafvasdbcliauevwalduish jknvlarkjb. hawirnasbs ona;ovh ioarl
                                            rsbywy5w4yb5wybwyb5wyb4w5yb5byw
                                            tnyrtdfyjjjjjjjjjjjjjjjjjjjjjjjjjjjjjyjjjjjjjjjjjjjjjjjjjjjjjjjj
                                        </h4>
                                    </div>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}