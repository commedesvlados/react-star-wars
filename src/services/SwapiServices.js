export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }

  async getAllPeople() {
    const people = await this.getResource('/people/');
    return people.results;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}`)
  }

  async getAllPlanet() {
    const people = await this.getResource('/planets/');
    return people.results;
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}`)
  }

  async getAllStarships() {
    const starships = await this.getResource('/starships/');
    return starships.results;
  }

  getStarships(id) {
    return this.getResource(`/starships/${id}`)
  }
}
