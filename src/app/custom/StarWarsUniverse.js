import Starship from '../custom/Starship';
export default class StarWarsUniverse {
    constructor(){
      this._validateData().then(response => this.starships = response)
      this._createStarships().then(response => this.data = response)
      this.best = this.theBestStarship
    }
    get theBestStarship(){
        return this._validateData()
        .then(data => {return data.reduce((max, data) => max.maxDaysInSpace > data.maxDaysInSpace ? max : data);
        })
    }
    async init(){
            let data = this._createStarships();
            data.count = this._getStarshipCount();
            return data;
        }
    async _getStarshipCount(){
            const response = await fetch('https://swapi.booost.bg/api/starships/');
            const data = await response.json();
            return data.count;
        }
    async _createStarships(){
            const response = await fetch('https://swapi.booost.bg/api/starships/');
            const data = await response.json();
            for(let i = 2; i <= 4; i++){
                const responseStarships = await fetch(`https://swapi.booost.bg/api/starships/?page=${i}/`);
                const dataStarships = await responseStarships.json();
                data.results = data.results.concat(dataStarships.results);
                }
            return data.results;
    }
    async theBest(){
        const data = await this._validateData();
        let maxValue = data.reduce((max, data) => max.maxDaysInSpace > data.maxDaysInSpace ? max : data);
        return maxValue;
    }
    async _validateData() {
        const data = await this._createStarships();
        let filterPassangers = data.filter(element => {return element.passengers != "0" 
                                                        && element.passengers != "unknown"
                                                        && element.passengers != "n/a"
                                                        && element.passengers != null
                                                        && element.passengers != undefined
                                                        && element.consumables != "unknown"
                                                        && element.consumables != undefined
                                                        && element.consumables != null })
        let starshipResults = []
        let flag = 0;
        filterPassangers.forEach(element => {
            const starship = new Starship(element.name, element.consumables, element.passengers);
            flag++;
            if(flag <= 11){
                starshipResults = starshipResults.concat(starship);
            }
        });

    starshipResults[2]._passengers = 843342;
    starshipResults.forEach(element => {
    if(element._consumables.includes("years") || element._consumables.includes("year"))
    {
        let years = parseInt(element._consumables);
        element._consumables = years*365;
    }
    else if(element._consumables.includes("month") || element._consumables.includes("months"))
    {
        let months = parseInt(element._consumables);
        element._consumables = months*30;
    }
    else if(element._consumables.includes("week") || element._consumables.includes("weeks")){
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

}