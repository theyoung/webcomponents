import Mediator from "./Mediator.js";

export default class Store {
    constructor(state = {}, actions, mutations){
        let that = this;
        this.actions = actions;
        this.mutations = mutations;
        this.events = new Mediator();
        this.status = 'resting'; // 'resting' 'action' 'mutation'
        this.state = new Proxy(state,{
                get: function(target,prop,recever){
                    return target[prop]?? null;
                },
                set: function(state, key, value){
                    state[key] = value;
                    //TODO : 해당 state 에 연결된 화면 render필요
                    that.events.publish('stateChange',state);
                    return true;
                }
            }
        );
    }

    dispatch(actionKey, prams){ //Component -> Action Dispatch
        if(!this.actions.hasOwnProperty(actionKey)){
            console.error(`ActionKey ${actionKey} does not exist`);
            return false;
        }
        this.status = 'action';
        return this.actions[actionKey](this, prams);
    }

    commit(mutationKey, prams){ //Action -> mutation commit -> proxy trigger
        if(!this.mutations.hasOwnProperty(mutationKey)){
            console.error(`MutationKey ${mutationKey} does not exist`);
            return false;
        }
        this.status = 'mutation';
        let newState = this.mutations[mutationKey](this.state, prams); //action은 state를 return 해야한다.

        Object.assign(this.state, newState);
        return true;
    }

}