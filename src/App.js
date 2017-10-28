import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import './App.css';
import Favs from './Favs.js'
import StatusBar from './StatusBar.js'
import ByStation from './ByStation.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estimates: {},
    };
  }

  getStationDestination() {
  	return [
  		['CIVC', 'RICH'],
      ['DBRK', 'MLBR'],
      ['DBRK', 'RICH'],
      ['ASHB', 'RICH'],
  	];
  }

  fetchEstimate(station, destination) {
    const authKey = 'MW9S-E7SL-26DU-VV8V';
    const key = station + destination;

    axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=${authKey}&json=y`)
      .then(res => {
        const estimate = {};
        const root = res.data.root;
        const destinationEstimate = _.find(root.station[0].etd, t => t.abbreviation === destination);
        if (destinationEstimate) {
          estimate['station'] = root.station[0].name;
          estimate['destination'] = destinationEstimate.destination;
          estimate['time'] = destinationEstimate.estimate.map(r => r.minutes).join(", ");
          estimate['fetchTime'] = new Date(root.date + " " + root.time);
          var estimates = Object.assign({}, this.state.estimates);
          estimates[key] = estimate;
          this.setState({estimates: estimates});
        }
      });
  }

  updateEstimates() {
    const that = this;
    this.getStationDestination().map(
      pair => that.fetchEstimate(pair[0], pair[1])
    );
  }

  componentDidMount() {
    this.updateEstimates();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">BART Real Time Tracker</h1>
        <StatusBar estimates={this.state.estimates} updateEstimates={() => this.updateEstimates()}/>
        <Favs estimates={this.state.estimates}/>
        <ByStation />
      </div>
    );
  }

}

export default App;
