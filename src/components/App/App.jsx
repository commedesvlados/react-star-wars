import React, {Component} from 'react';
import Header from "../Header/Header";
import ItemList from "../ItemList/ItemList";
import PersonDetails from "../PersonDetails/PersonDetails";
// import PlanetDetails from "../PlanetDetails/PlanetDetails";
// import StarshipDetails from "../StarshipDetails/StarshipDetails";
import RandomPlanet from "../RandomPlanet/RandomPlanet";
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <RandomPlanet />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList />
          </div>
          <div className="col-md-6">
            <PersonDetails />
          </div>
        </div>
      </div>
    );
  }
}