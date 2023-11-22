import { createStore } from 'vuex'
import getProductWidgets from '../services/WidgetService'

const store = createStore({
  state() {
    return {
      links: []
    }
  },
  actions: {
    async GET_LINK({ commit }) {
      try {
        const data = await getProductWidgets()
        const linkedValues = data.map((item) => item.linked)
        commit('SET_LINKS', linkedValues)
      } catch (error) {
        console.error(error)
      }
    },
    TOGGLE_LINK({ commit, state }, index) {
      const updatedLinks = [...state.links]
      updatedLinks[index] = !updatedLinks[index]
      commit('SET_LINKS', updatedLinks)
    }
  },
  mutations: {
    SET_LINKS(state, payload) {
      state.links = payload
    }
  },
  getters: {
    links(state) {
      return state.links
    }
  }
})

export default store
