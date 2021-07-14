import React from "react";

import ItemList from "../ItemList/ItemList";
import withListData from "../HOCHelpers/withListData";
import withSwapiService from "../HOCHelpers/withSwapiService";
import withChildFunction from "../HOCHelpers/withChildFunction";
import compose from "../HOCHelpers/compose";


const renderPeople = ({name, birthYear}) => <span>{name} ({birthYear})</span>;
const renderPlanet = ({name}) => <span>{name}</span>;
const renderStarship = ({name, model}) => <span>{name} ({model})</span>;

const mapPeopleMethodToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  }
}

const mapPlanetsMethodToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  }
}

const mapStarshipsMethodToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  }
}

const PeopleList = compose(
                     withSwapiService(mapPeopleMethodToProps),
                     withListData,
                     withChildFunction(renderPeople)
                   )(ItemList);

const PlanetsList = compose(
                      withSwapiService(mapPlanetsMethodToProps),
                      withListData,
                      withChildFunction(renderPlanet)
                    )(ItemList);

const StarshipsList = compose(
                        withSwapiService(mapStarshipsMethodToProps),
                        withListData,
                        withChildFunction(renderStarship)
                      )(ItemList);

export {
  PeopleList,
  PlanetsList,
  StarshipsList
}