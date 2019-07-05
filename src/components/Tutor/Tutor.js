import React from 'react';

let tutor = {
  imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
  name: 'Jack Hewman',
  area: 'Pasir Ris',
  rating: 4.5,
  reviewCount: 5;
}

class Tutor extends React.Component {
	render() {
		return(
		<div className="Business">
  			<div className="image-container">
    			<img src={this.imageSrc} alt=''/>
  			</div>
  			<h2>{this.name}</h2>
  			<div className="tutor-information">
    			<div className="area">
      				<p>{this.area}</p>
    			</div>
    			<div className="tutor-reviews">
      				<h3>{this.rating}</h3>
      				<h3 className="rating">{this.rating}</h3>
      				<p>{this.reviewCount} reviews</p>
    			</div>
  			</div>
		</div>
	);}
}

export default Tutor;