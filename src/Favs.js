import React, { Component } from 'react';
import './Favs.css';

class Favs extends Component {
	render() {
		const estimates = this.props.estimates;
		const keys = Object.keys(estimates).sort();
		const entries = keys.map(k => {
			const estimate = estimates[k];
			return	<tr key={k}>
					<td>{estimate.station}</td>
					<td>{estimate.destination.substring(0, 4)}</td>
					<td>{estimate.time}</td>
				</tr>;
		});

		return (
			<table className="table table-striped new-records-table">
	            <tbody>
	            	{entries}
	            </tbody>
        	</table>
		);
	}
}

export default Favs;