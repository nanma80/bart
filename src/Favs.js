import React, { Component } from 'react';
import './Favs.css';

class Favs extends Component {
	render() {
		const estimates = this.props.estimates.sort((a, b) => {
			return a.station > b.station; // alphabetically by station name
		});

		const entries = estimates.map(estimate => 
				<tr key={estimate.station + estimate.destination}>
					<td>{estimate.station}</td>
					<td>{estimate.destination}</td>
					<td>{estimate.time}</td>
				</tr>

		);

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