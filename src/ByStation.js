import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import './ByStation.css';
import config from './config.json'

class ByStation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: [],
      estimates: {}
    };
  }

  fetchStations() {

    axios.get(`http://api.bart.gov/api/stn.aspx?cmd=stns&key=${config.authKey}&json=y`)
      .then(res => {
        var stations = res.data.root.stations.station.map(s => {
        	return {
        		stationName: s.name, 
        		station: s.abbr
        	};
        });
        stations.unshift({stationName: "Select a station", station: ''});
        this.setState({stations: stations});
      });
  }

  fetchEstimate(station) {
  	if (station === null) return;

    axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=${config.authKey}&json=y`)
      .then(res => {
        const estimates = {};
        const root = res.data.root;
        const allDestinations = root.station[0].etd;
        _.each(allDestinations, d => {
        	var estimate = {};
	        estimate['station'] = root.station[0].name;
      		estimate['destination'] = d.destination;
	        estimate['time'] = d.estimate.map(r => r.minutes).join(", ");
	        estimate['fetchTime'] = new Date(root.date + " " + root.time);
	        const key = station + d.abbreviation;
	        estimates[key] = estimate;
	        return;
        });
        this.setState({estimates: estimates})
      });
  }

  componentDidMount() {
    this.fetchStations();
  }

  selectOnChange() {
  	var dropDown = document.getElementById("station-selector");
	var currentStation = dropDown.options[dropDown.selectedIndex].value;
	this.fetchEstimate(currentStation);
  }

  render() {
  	const stationsEntries = this.state.stations.map(s => 
  		<option value={s.station} key={s.station}>{s.stationName}</option>);
	
	const estimates = this.state.estimates;
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
			<div>
				<select id="station-selector" onChange={() => this.selectOnChange()}>
					{stationsEntries}
				</select>
				<table className="table table-striped new-records-table">
		            <tbody>
			            {entries}
		            </tbody>
	        	</table>
        	</div>
		);
  }
}

export default ByStation;