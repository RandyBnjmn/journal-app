import state from './state'
import * as action from './actions'
import * as getters from './getters'
import * as mutations from './mutations'


const journal = {
    namespaced:true,
    action,
    mutations,
    getters,
    state
}

export default journal