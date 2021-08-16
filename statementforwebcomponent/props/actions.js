export default {
    "ADD_ITEM" : function(context, params){
        context.commit("addItem", params);
    },
    "DELETE_ITEM" : function(context, params){
        context.commit("deleteItem", params);
    }
}