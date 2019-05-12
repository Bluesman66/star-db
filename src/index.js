class SwapiService {
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
        return this.getResource(`/people/${id}/`)
    }

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);
        return res.results;
    }

    getPlanet = async (id) => {
        return this.getResource(`/planets/${id}/`)
    }

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`);
        return res.results;
    }

    getStarship = async (id) => {
        return this.getResource(`/starships/${id}/`)
    }
}

const swapi = new SwapiService();

swapi.getAllPeople()
    .then((people) => {
        console.log('=== PEOPLE ===');
        people.forEach((person) => {
            console.log(person.name);
        });
    });

swapi.getPerson(3)
    .then((person) => {        
        console.log('Person:', person.name);
    });

swapi.getAllPlanets()
    .then((planets) => {
        console.log('=== PLANETS ===');
        planets.forEach((planet) => {
            console.log(planet.name);
        });
    });    

swapi.getAllStarships()
    .then((starships) => {
        console.log('=== STARSHIPS ===');
        starships.forEach((starship) => {
            console.log(starship.name);
        });
    });

// getResource('https://swapi.co/api/people/1232323/')
//     .then((body) => {
//         console.log(body);
//     })
//     .catch((err) => {
//         console.error(err);
//     });