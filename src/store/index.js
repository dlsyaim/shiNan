import Vue from 'vue'
import Vuex from 'vuex'
import { loadAll } from '@/utils/context'

Vue.use(Vuex)

const modules = loadAll(require.context('./modules', false, /^(?!.*index).*\/(?!.*test).*\.js$/))

const store = new Vuex.Store({
  modules: {
    ...modules
  }
})

export default store
