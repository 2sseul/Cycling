import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNightView: false,
    coords: { 'lat': 0, 'lon': 0 },
    weather: {},
  },
  getters: {
    getIsNightView(state) {
      return state.isNightView;
    }
  },
  mutations: {
    TOGGLE_VIEW(state) {
      state.isNightView = !state.isNightView;
    },
    SET_COORDS(state, payload) {
      state.coords = payload;
    },
    SET_WEATHER(state, payload) {
      state.weather = payload;
    }
  },
  actions: {
    toggleView({ commit }) {
      commit('TOGGLE_VIEW');
    },
    setCoords({ commit }, payload) {
      commit('SET_COORDS', payload);
    },
    setWeather({ commit }, payload) {
      commit('SET_WEATHER', payload);
    }
  },
  modules: {}
})
