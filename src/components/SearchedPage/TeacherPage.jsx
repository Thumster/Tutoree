import React from 'react';
import TeacherCard from './TeacherCard';
import "./TeacherPage.css";


export default class TeacherPage extends React.Component {
    render() {
        return(
            <div className="cards">
                <TeacherCard/>
                <TeacherCard/>
                <TeacherCard/>
                <TeacherCard/>
                <TeacherCard/>
            </div>
        );
    }
}