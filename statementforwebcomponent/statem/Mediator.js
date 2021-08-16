export default class Mediator {
    constructor(events = {}){
        this.events = events;
    }

    subscribe(key, callback){
        if(!this.events.hasOwnProperty(key)){
            this.events[key] = new Array();
        }

        this.events[key].push(callback);
    }

    publish(key, params = {}){
        if(!this.events.hasOwnProperty(key)) return [];

        return this.events[key].map(callback => {
            callback(params);
        });
    }
} 