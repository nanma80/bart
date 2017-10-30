import React, { Component } from 'react';
import './Favs.css';
import EstimateTable from './EstimateTable.js'

class Favs extends Component {
	render() {
		return (
			<div>
				<h4>Favorite routes</h4>
				<EstimateTable estimates={this.props.estimates} />
        	</div>
		);
	}
}

export default Favs;