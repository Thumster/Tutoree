import React from 'react';
import './Catchphrase.css';

class Catchphrase extends React.Component{
	render() {
		return (
			<div className="catchphrase">
        		<p style={{fontWeight: 700}}> SINGAPORE'S GO-TO TUITION MARKETPLACE </p>
        		<p> Connect with tutors and tutees around the country </p>
        		<p> <ul>
              		<li>Hassle-free</li>
              		<li>Free Sign-up</li>
              		<li>Diverse Range of Subjects</li>
            	</ul>
        	</p>
        	<p style={{color: 'black', fontFamily: 'Century Gothic', fontStyle: 'normal', textAlign: 'center', fontWeight: 'bold'}}>
         	What are you waiting for? <br /> Sign-up now! 
         	</p>
         	</div>
		);
	}
}

export default Catchphrase;