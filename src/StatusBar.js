import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {
    updateEstimates(e) {
    	e.preventDefault();
    	this.props.updateEstimates();
    }

	render() {
		var lastUpdatedAt = '';

		if (this.props.estimates.length > 0) {
			lastUpdatedAt = new Date(Math.max.apply(null, this.props.estimates.map(a => a.fetchTime))).toLocaleTimeString();
		}

		return (
			<div className="status-bar">
				<span>
					Last updated at: {lastUpdatedAt}
				</span>
				<span>
					<button className="btn btn-primary btn-sm" onClick={(e) => this.updateEstimates(e)}>
						Update
					</button>
				</span>
        	</div>
		);
	}
}

export default StatusBar;