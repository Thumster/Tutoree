import React from 'react';
import {Container, Row, Col } from 'reactstrap';
import profilePhoto from './user_photo.png';
import './TeacherCard.css';

const teacher = {
    imageSrc:{profilePhoto},
    title:"O level subjects by ex-RI boi",
    profile_name:"raffles-ichiban",
    price:"100/hr",
    location:"Tiong Bharu"
}

export default class TeacherCard extends React.Component {
    render() {
        return(
            <div id="containerid" className="container">
                <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <img className="photo" src={profilePhoto}/>
                        </div>
                        <div className="row">
                            <button type="button" class="btn btn-warning">Message</button>
                        </div>
                    </div>
                    <div className="col-9">
                        <h1>{teacher.title}</h1>
                        <h4>{teacher.profile_name}</h4>
                        <h4>{teacher.price}</h4>
                        <h4>{teacher.location}</h4>
                        <p>
                            Desciption blah blah blah nlaalcnaca;ojms;l
                        </p>
                    </div>

                </div>
            </div>
        );
    }
}