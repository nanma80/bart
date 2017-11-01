import React, { Component } from 'react';
import './Favs.css';
import EstimateTable from './EstimateTable.js'

class Favs extends Component {
	render() {
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

export default Favs;