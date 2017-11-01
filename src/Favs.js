import React, { Component } from 'react';
import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import './Favs.css';
import EstimateTable from './EstimateTable.js'

class Favs extends Component {
	render() {
		const length = Object.keys(this.props.estimates).length;
		if(length === 0) {
			return (
				<div>
					Please select a station and click on <TiHeartOutline className='icon'/> to save your favorite routes.
				</div>
				);
		} else {
			return (
				<div>
					<h4>Favorite routes</h4>
					<EstimateTable 
						favs={this.props.favs} 
			            addFav={(fav) => this.props.addFav(fav)}
			            removeFav={(fav) => this.props.removeFav(fav)}
						estimates={this.props.estimates} />
	        	</div>
			);

		}
	}
}

export default Favs;