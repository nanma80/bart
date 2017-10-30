import React, { Component } from 'react';
import './EstimateTable.css';

class EstimateTable extends Component {
	render() {
		const estimates = this.props.estimates;
		const keys = Object.keys(estimates).sort();
		const entries = keys.map(k => {
			const estimate = estimates[k];
			return	(
				<tr key={k}>
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