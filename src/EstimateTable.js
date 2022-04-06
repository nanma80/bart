import React, { Component } from 'react';
import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline';
import './EstimateTable.css';

class EstimateTable extends Component {
	truncate(str){
		let n = 13;
		return (str.length > n) ? str.substr(0, n-1) + '…' : str;
	};

	render() {
		const favs = new Set(this.props.favs);
		const estimates = this.props.estimates;
		const keys = Object.keys(estimates).sort(
			(a, b) => estimates[a].station + estimates[a].direction + estimates[a].destination > 
			estimates[b].station + estimates[b].direction + estimates[b].destination
				? 1 : -1
			);
		const entries = keys.map(k => {
			const estimate = estimates[k];
			const isFav = favs.has(k);
			return	(
				<tr key={k}>
					<td>{isFav 
						? <TiHeartFullOutline className="icon" onClick={() => this.props.removeFav(k)}/> 
						: <TiHeartOutline className="icon" onClick={() => this.props.addFav(k)}/>} 
					</td>
					<td>{this.truncate(estimate.station)}</td>
					<td>{estimate.direction}</td>
					<td>{this.truncate(estimate.destination)}</td>
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