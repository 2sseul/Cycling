import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNightView: false,
    coords: { 'lat': 0, 'lon': 0 },
    weather: {},
    videos: {},
    videoTypes: [
      { id: 1, type: 'bicycle_recommend', name: '자전거 추천' },
      { id: 2, type: 'gear_recommend', name: '장비 추천' },
      { id: 3, type: 'course_recommend', name: '자전거 추천 경로' },
    ],
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
    },
    SET_VIDEO_LIST(state, payload) {
      state.videos[payload.id] = payload.data;
    },
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
    },
    setVideoList({ commit }) {
      const API_URL = process.env.VUE_APP_YOUTUBE_API_URL;
      const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;

      for (const type of this.state.videoTypes) {
        axios({
          url: API_URL,
            method: 'GET',
            params: {
                key: API_KEY,
                part: 'snippet',
                q: type.name,
                type: 'video',
                maxResult: 20,
            }
        })
          .then((res) => {
            commit('SET_VIDEO_LIST', { id: type.id, data: res.data.items });
          })
          .catch((err) => {
            console.log(err);
        });
      }
    }
  },
  modules: {}
})
