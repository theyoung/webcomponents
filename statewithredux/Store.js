let initStatus = {
    todos : ['test123','test456'],
    counter :2
}

function todosdd(state = [], action){
    switch(action.type){
        case 'ADD_ITEM':
            state.push(action.data);
            action.counter = state.length;
            break;
        case 'DELETE_ITEM':
            state.splice(action.idx,1);
            action.counter = state.length;
            break;
    }
    
    return state;
}

function counterdd(state = 0, action){
    state = action.counter?? state;
    return state;
}


const reducers = Redux.combineReducers({
    todos : todosdd,
    counter : counterdd
});

export default Redux.createStore(reducers,initStatus);