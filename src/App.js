import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import './App.css';
import Favs from './Favs.js'
import StatusBar from './StatusBar.js'
import ByStation from './ByStation.js'
import config from './config.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favsEstimates: {},
      stations: [],
      currentStation: null,
      byStationEstimates: {},
      favs: new Set()
    };
  }

  setFavs() {
    localStorage.setItem('favs', Array.from(this.state.favs).join(','));
  }

  fetchFavs() {
    const favsString = localStorage.getItem('favs');
    const favsList = favsString === '' ? [] : favsString.split(',');
    this.setState({favs: new Set(favsList)}, this.updateEstimates);
  }

  addFav(fav) {
    var favs = new Set(this.state.favs);
    favs.add(fav);
    this.setState({favs: favs}, this.updateEstimates);
  }

  removeFav(fav) {
    var favs = new Set(this.state.favs);
    favs.delete(fav);
    this.setState({favs: favs}, this.updateEstimates);
  }

  setCurrentStation(station) {
    this.setState({currentStation: station}, this.updateEstimates);
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
      })
      .catch(error => console.log(error));
  }

  fetchEstimate(stationDestinationPair) {
    const key = stationDestinationPair;
    const station = key.substr(0,4);
    const destination = key.substr(4,4);

    axios.get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=${config.authKey}&json=y`)
      .then(res => {
        const estimate = {};
        const root = res.data.root;
        const destinationEstimate = _.find(root.station[0].etd, t => t.abbreviation === destination);
        if (destinationEstimate) {
          estimate['station'] = root.station[0].name;
          estimate['destination'] = destinationEstimate.destination;
          estimate['destinationAbbreviation'] = destination;
          estimate['time'] = destinationEstimate.estimate.map(r => r.minutes).join(", ");
          estimate['fetchTime'] = new Date(root.date + " " + root.time);
          var estimates = Object.assign({}, this.state.favsEstimates);
          estimates[key] = estimate;
          this.setState({favsEstimates: estimates});
        }
      })
      .catch(error => console.log(error));
  }

  fetchEstimatesByStation(station) {
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
          estimate['destinationAbbreviation'] = d.abbreviation;
          estimate['time'] = d.estimate.map(r => r.minutes).join(", ");
          estimate['fetchTime'] = new Date(root.date + " " + root.time);
          const key = station + d.abbreviation;
          estimates[key] = estimate;
          return;
        })
        this.setState({byStationEstimates: estimates})
      })
      .catch(error => console.log(error));
  }

  updateEstimates() {
    _.each(Array.from(this.state.favs), (f) => this.fetchEstimate(f));
    this.fetchEstimatesByStation(this.state.currentStation);
    this.setFavs();
  }

  componentDidMount() {
    this.fetchFavs();
    this.fetchStations();
    this.updateEstimates();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">BART Real Time Tracker</h1>
        <StatusBar estimates={this.state.favsEstimates} updateEstimates={() => this.updateEstimates()}/>
        <Favs 
          favs={this.state.favs} 
          addFav={(fav) => this.addFav(fav)}
          removeFav={(fav) => this.removeFav(fav)}
          estimates={this.state.favsEstimates}
          />
        <ByStation favs={this.state.favs}
          addFav={(fav) => this.addFav(fav)}
          removeFav={(fav) => this.removeFav(fav)}
          stations={this.state.stations} 
          byStationEstimates={this.state.byStationEstimates} 
          fetchStations={() => this.fetchStations()} 
          setCurrentStation={(station) => this.setCurrentStation(station)}/>
      </div>
    );
  }
}

export default App;
