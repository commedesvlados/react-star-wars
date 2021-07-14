import React, {Component} from 'react';
import './Header.css';
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="header d-flex">
        <h3>
          <Link to='/'>Star DB</Link>
        </h3>
        <ul className="d-flex">
          <li>
            <Link to='/people/'>People</Link>
          </li>
          <li>
            <Link to='/planets/'>Planets</Link>
          </li>
          <li>
            <Link to='/starships/'>Starships</Link>
          </li>
          <li>
            <Link to='/login/'>Login</Link>
          </li>
          <li>
            <Link to='/secret/'>Secret</Link>
          </li>
        </ul>

        <button className='btn btn-primary btn-sm'
                onClick={this.props.onServiceChange}>
          Change Service
        </button>
      </div>
    );
  }
}