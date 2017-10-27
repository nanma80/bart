import React, { Component } from 'react';
import './Favs.css';

class Favs extends React.Component {
	constructor(props) {
        super(props);
    }

	render() {
		const estimates = this.props.estimates.sort((a, b) => {
			return a.station > b.station; // alphabetically by station name
		});
		const entries = estimates.map(estimate => 
				<tr>
					<td>{estimate.station}</td>
					<td>{estimate.destination}</td>
					<td>{estimate.time}</td>
				</tr>

		);

		return (
			<table class="table table-striped new-records-table">
				<thead>
		            <tr>
		              <th>Station</th>
		              <th>Destination</th>
		              <th>Time</th>
		            </tr>
	            </thead>
	            <tbody>
	            	{entries}
	            </tbody>
        	</table>
		);
	}
}

export default Favs;