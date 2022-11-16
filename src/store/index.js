import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SERVER_URL = 'http://localhost:9999';
const DEFAULT_IMG_SRC = 'default.jpg';

export default new Vuex.Store({
  state: {
    dummy: false,
    isNightView: false,
    coords: { 'lat': 0, 'lon': 0 },
    weather: {},
    videos: [],
    videoTypes: [
      { id: 1, type: 'bicycle_recommend', name: '자전거 추천' },
      { id: 2, type: 'gear_recommend', name: '장비 추천' },
      { id: 3, type: 'course_recommend', name: '자전거 추천 경로' },
    ],
    userInfo: {},
  },
  getters: {
    getIsNightView(state) {
      return state.isNightView;
    }
  },
  mutations: {
    DUMMY(state) {
      state.dummy = false;
    },
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
      state.videos = payload;
      console.log(state.videos);
    },
    REGIST_USER(state, payload) {
      state.userInfo = payload;
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

      const tempArr = [];
      for (const type of this.state.videoTypes) {
        console.log(type.name);
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
            tempArr.push({ id: type.id, data: res.data.items });
          })
          .catch((err) => {
            console.log(err);
          });
        }
        commit('SET_VIDEO_LIST', tempArr);
    },
    registUser({ commit }, userInfo) {
      userInfo['profile_img'] = DEFAULT_IMG_SRC;

      axios.post(SERVER_URL + '/api/user', userInfo)
        .then((res) => {
          commit('DUMMMY');
          const result = res.status;
          if (result == 200) {
            alert("가입되었습니다. 로그인해주세요!");
            location.href = "/";
          } else {
            alert("회원가입에 실패했습니다");
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    login({ commit }, loginInfo) {
      console.log(commit);
      console.log(loginInfo);
      axios.get(SERVER_URL + '/api/user/login', loginInfo)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert(err);
        });
    }
  },
  modules: {}
})
