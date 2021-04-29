import React, {Component} from 'react';
import './PersonDetails.css';
import SwapiService from "../../services/SwapiServices";
import Spinner from "../Spinner/Spinner";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import ErrorButton from "../ErrorButton/ErrorButton";

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  onLoadedPerson = (person) => {
    this.setState({
      person,
      loading: false
    });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updatePerson = () => {
    const { personId } = this.props;
    if (!personId) return;

    this.swapiService
      .getPerson(personId)
      .then(this.onLoadedPerson)
      .catch(this.onError);
  }

  render() {

    const { loading, error, person } = this.state;

    if (!person) {
      return <span>Select any items from a list!</span>;
    }

    const spinner = loading ? <Spinner /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const content = !(loading || error) ? <PersonView person={person} /> : null ;

    return (
      <div className="person-details card">
        {spinner}
        {errorIndicator}
        {content}
      </div>
    );
  }
}

const PersonView = ({person}) => {
  const { id, name, gender,
    eyeColor, birthYear} = person;

  return (
    <React.Fragment>
      <img className="person-image"
           src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
}