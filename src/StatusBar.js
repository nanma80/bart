import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {
    updateEstimates(e) {
    	e.preventDefault();
    	this.props.updateEstimates();
    }

	render() {
		var lastUpdatedAt = '';
		const estimates = this.props.estimates;
		const keys = Object.keys(estimates);

		if (keys.length > 0) {
			lastUpdatedAt = new Date(Math.max.apply(null, keys.map(k => estimates[k].fetchTime))).toLocaleTimeString();
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
