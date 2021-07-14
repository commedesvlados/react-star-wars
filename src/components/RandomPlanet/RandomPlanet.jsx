import React, {Component} from 'react';
import './RandomPlanet.css';
import PropTypes from 'prop-types'
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import SwapiService from "../../services/SwapiServices";
import Spinner from "../Spinner/Spinner";

export default class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 10000
  }

  static propTypes = {
    updateInterval: PropTypes.number
  }

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updatePlanet();
    // const { updateInterval } = this.props
    // this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onLoadedPlanet = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updatePlanet = () => {
    const planetId = Math.floor(Math.random() * 25) + 3;
    this.swapiService
      .getPlanet(planetId)
      .then(this.onLoadedPlanet)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasContent = ! (loading || error);
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasContent ? <PlanetView planet={planet} /> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errorIndicator}
      </div>
    );
  }
}

const PlanetView = ({planet}) => {
  const {id, name, population,
         rotationPeriod, diameter} = planet

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}