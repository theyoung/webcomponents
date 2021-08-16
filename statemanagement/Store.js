import PubSub from "./pubsub.js";

export default class Store {
    constructor(params){
        this.actions = {};
        this.mutations = {};
        this.state = {};
        this.status = 'resting';
        this.events = new PubSub();

        if(params.hasOwnProperty('actions')){
            this.actions = params.actions;
        }
        if(params.hasOwnProperty('mutations')){
            this.mutations = params.mutations;
        }

        const that = this;

        this.state = new Proxy(
            (params.state || {}), {
                set : function(state, key, value){
                    state[key] = value;
                    console.log(`stateChange: ${key}: ${value}`);
                    that.events.publish('stateChange',that.state);
                    that.status = 'resting';
                    return true;
                }
            }
        );
    }

    dispatch(actionKey, payload){
        if(typeof this.actions[actionKey] !== 'function'){
            console.error(`Action ${actionKey} does not exist`);
            return false;
        }

        this.status = 'action';
        this.actions[actionKey](this,payload);
        return true;
    }

    commit(mutationKey, payload){
        if(typeof this.mutations[mutationKey] !== 'function'){
            console.error(`Mutation ${mutationKey} does not exist`);
            return false;
        }

        this.status ='mutation';
        let newStat = this.mutations[mutationKey](this.state, payload);

        Object.assign(this.state, newStat);
        return true;
    }
};
