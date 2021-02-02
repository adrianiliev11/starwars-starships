export default class Starship {
    constructor(name,_consumables,_passengers){
      this.name = name;
      this._consumables = _consumables;
      this._passengers = _passengers;
    }
    get maxDaysInSpace(){
        this.maxDaysInSpace = this._consumables/this._passengers;
        return this.maxDaysInSpace;
    }
}