import React from 'react';
import Row from "../Row/Row";
import {PeopleList} from "../SWComponents/ItemLists";
import PersonDetails from "../SWComponents/PersonDetails";
import { withRouter } from 'react-router-dom';

 const PeoplePage = ({match, history}) => {
  const { id } = match.params;

  return (
    <Row left={<PeopleList onItemSelected={(id) => history.push(id)} />}
         right={<PersonDetails itemId={id} />} />
  );
}

export default withRouter(PeoplePage);