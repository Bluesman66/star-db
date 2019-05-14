export default class SwapiService {
    _apiBase = 'https://swapi.co/api';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        const body = await res.json();
        return body;
    }

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results;
    }

    getPerson = async (id) => {
        const res = await this.getResource(`/people/${id}/`);
        return res;
    }

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);
        return res.results;
    }

    getPlanet = async (id) => {
        const res = await this.getResource(`/planets/${id}/`);
        return res;
    }

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`);
        return res.results;
    }

    getStarship = async (id) => {
        const res = await this.getResource(`/starships/${id}/`);
        return res;
    }
}