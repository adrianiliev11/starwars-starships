import Starship from '../custom/Starship';

export default class StarWarsUniverse {
    constructor(){
      this.starships = _validateData();
    }
    get theBestStarship(){
            let maxValue = this.starships.reduce((max, data) => max.maxDaysInSpace > data.maxDaysInSpace ? max : data);
            return maxValue;
    }
    async init(){
            _getStarshipCount();
        }
    async _getStarshipCount(){
            const response = await fetch('https://swapi.booost.bg/api/starships/');
            const data = await response.json();
            return data.count;
        }
    }

async function _createStarships(){
        const response = await fetch('https://swapi.booost.bg/api/starships/');
        const data = await response.json();
        for(let i = 2; i <= 4; i++){
            const responseStarships = await fetch(`https://swapi.booost.bg/api/starships/?page=${i}/`);
            const dataStarships = await responseStarships.json();
            data.results = data.results.concat(dataStarships.results);
             }
        return data.results;
}

async function _validateData() {
        const data = await _createStarships();
        let filterPassangers = data.filter(element => {return element.passengers != "0" 
                                                        && element.consumables != "unknown"
                                                        && element.passengers != "unknown"
                                                        && element.passengers != "n/a" })
        let starshipResults = []
        filterPassangers.forEach(element => {
            const starship = new Starship(element.name, element.consumables, element.passengers);
            starshipResults = starshipResults.concat(starship);
        });

        starshipResults[2]._passengers = 843342;
        starshipResults.forEach(element => {
        if(element._consumables.includes("years" || "year"))
        {
            let years = parseInt(element._consumables);
            element._consumables = years*365;
        }
        else if(element._consumables.includes("months" || "month"))
        {
            let months = parseInt(element._consumables);
            element._consumables = months*30;
        }
        else if(element._consumables.includes("week" || "weeks")){
            let weeks = parseInt(element._consumables);
            element._consumables = weeks*7;
        }else{
            let days = parseInt(element._consumables);
            element._consumables = days;
        }
        let passangersParsed = parseInt(element._passengers);
        element._passengers = passangersParsed;
    })
        return starshipResults;
  }