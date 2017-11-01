import React, { Component } from 'react';
import './ByStation.css';
import EstimateTable from './EstimateTable.js'

class ByStation extends Component {
  selectOnChange() {
  	var dropDown = document.getElementById("station-selector");
	  var currentStation = dropDown.options[dropDown.selectedIndex].value;
    this.props.setCurrentStation(currentStation);
  }

  render() {
  	const stationsEntries = this.props.stations.map(s => 
  		<option value={s.station} key={s.station}>{s.stationName}</option>);

		return (
			<div>
				<select id="station-selector" onChange={() => this.selectOnChange()}>
					{stationsEntries}
				</select>
        <p/>
        <EstimateTable 
          favs={this.props.favs} 
          addFav={(fav) => this.props.addFav(fav)}
          removeFav={(fav) => this.props.removeFav(fav)}
          estimates={this.props.byStationEstimates} />
      </div>
		);
  }
}

export default ByStation;