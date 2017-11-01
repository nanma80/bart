import React, { Component } from 'react';
import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline';
import './EstimateTable.css';

class EstimateTable extends Component {
	render() {
		const favs = new Set(this.props.favs);
		const estimates = this.props.estimates;
		const keys = Object.keys(estimates).sort();
		const entries = keys.map(k => {
			const estimate = estimates[k];
			const isFav = favs.has(k);
			return	(
				<tr key={k}>
					<td>{isFav 
						? <TiHeartFullOutline className="icon" onClick={() => this.props.removeFav(k)}/> 
						: <TiHeartOutline className="icon" onClick={() => this.props.addFav(k)}/>} 
					</td>
					<td>{estimate.station}</td>
					<td>{estimate.destinationAbbreviation}</td>
					<td>{estimate.time}</td>
				</tr>
				);
		});

		return (
			<div>
				<table className="table table-striped new-records-table">
		            <tbody>
		            	{entries}
		            </tbody>
	        	</table>
        	</div>
		);
	}
}

export default EstimateTable;