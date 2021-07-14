import React, {Component} from 'react';
import Row from "../Row/Row";
import {PlanetsList} from "../SWComponents/ItemLists";
import PlanetDetails from "../SWComponents/PlanetDetails";

export default class PlanetPage extends Component {

  state = {
    selectedItem: null
  }

  onItemSelected = (selectedItem) => {
    this.setState({selectedItem})
  }

  render() {
    return (
      <Row left={<PlanetsList onItemSelected={this.onItemSelected}/>}
           right={<PlanetDetails itemId={this.state.selectedItem} />} />
    )
  }
}