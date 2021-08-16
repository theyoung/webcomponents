import Store from "./Store.js"
import mutations from "../props/mutations.js"
import actions from "../props/actions.js"
import state from "../props/state.js";

export default new Store(state, actions, mutations);