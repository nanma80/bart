import React, { Component } from 'react';
import './Favs.css';

class Favs extends React.Component {
	render() {
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
	            </tbody>
        	</table>
		);
	}
}

export default Favs;