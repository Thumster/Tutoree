import React from "react";
import NavSearched from "../Nav/NavSearched";
import profilePhoto from "../Post/PostCard/user_photo.png";
import "./PostDetails.css";

const teacher = {
    imageSrc: { profilePhoto },
    title: "O level subjects by ex-RI boi",
    subject: "Math",
    profile_name: "raffles-ichiban",
    price: "100/hr",
    location: "Tiong Bharu"
}

export default class PostDetails extends React.Component {
    render() {
        return (
            <div>
                <header className="header">
                    <NavSearched />
                </header>
                <div className="empty-space">ugkgkbjk</div>
                <div className="container" id="content">
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                  <div className="jumbotron pd">
                                    <p className="pd-title">{teacher.title}</p>
                                    <span class="badge badge-info" id="subjectBadge">{teacher.subject}</span>
                                    <p className="pd-timeStamp">Posted: </p>
                                    <p className="pd-price">Price: {teacher.price}</p>
                                    <div className="jumbotron desc">
                                        <p>Descripton</p>
                                        <p>is is the environment in which the verbosity of BEM’s naming
                                             convention could evoke repulsion from many developers,
                                             but this reaction was arguably a sign that BEM was merely being 
                                             applied at a surface level. Without JavaScript, this technique could only take us so far.</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="jumbotron ud">
                                        <div className="row">
                                            <div className="col-5">
                                                <div className="row">
                                                <img src={profilePhoto} className="ud profilePhoto"></img>
                                                </div>
                                                <div className="row">
                                                <button type="button" class="btn btn-warning">Message</button>
                                                </div>
                                            </div>
                                            <div className="col-7">
                                                <p className="name ud">{teacher.profile_name}</p>
                                                <p className="email ud">Email: </p>
                                                <p className="contact ud">Contact No.:</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        );
    }
}