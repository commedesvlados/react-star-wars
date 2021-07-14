import React, {Component} from 'react';
import './App.css';

import Header from "../Header/Header";
import RandomPlanet from "../RandomPlanet/RandomPlanet";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";

import SwapiService from "../../services/SwapiServices";
import DummySwapiService from "../../services/DummySwapiService";
import { SwapiServiceProvider } from "../SwapiServiceContext/SwapiServiceContext"

import PeoplePage from "../Pages/PeoplePage";
import PlanetPage from "../Pages/PlanetPage";
import StarshipPage from "../Pages/StarshipPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StarshipDetails from "../SWComponents/StarshipDetails";
import LoginPage from "../Pages/LoginPage";
import SecretPage from "../Pages/SecretPage";


export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }


  onServiceChange = () => {
    this.setState(({swapiService}) => {

      const switchedService = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;

      console.log('sw')

      return {
        swapiService: new switchedService()
      }
    })
  }

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className='app'>
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet />

              <Switch>
                <Route path='/'
                       render={() => <h2>Welcome to StarDB</h2>}
                       exact />
                <Route path='/people/:id?' component={PeoplePage} />
                <Route path='/planets/' component={PlanetPage} />
                <Route path='/starships/' exact component={StarshipPage} />
                <Route path='/starships/:id'
                       render={({match}) => {
                         const {id} = match.params;
                         return <StarshipDetails itemId={id} />;
                       }}/>
                <Route path='/login/'
                       render={() => (
                         <LoginPage
                           onLogin={this.onLogin}
                           isLoggedIn={this.state.isLoggedIn}/>
                       )}/>
                <Route path='/secret/'
                       render={() => (
                         <SecretPage
                           isLoggedIn={this.state.isLoggedIn}/>
                       )}/>
                <Route render={() => <h2>Page not found...</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}

