import React from 'react';
import {StarshipsList} from "../SWComponents/ItemLists";
import { withRouter } from 'react-router-dom'

const StarshipPage = ({history}) => {
  return (
    <StarshipsList onItemSelected={ (itemId) => {history.push(itemId)}}/>
  );
}

export default withRouter(StarshipPage);