import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SERVER_URL = 'http://localhost:9999';

export default new Vuex.Store({
  state: {
    dummy: false,
    isNightView: false,
    coords: { 'lat': 0, 'lon': 0 },
    weather: {},
    isShowVideoDetail: false,
    video: {},
    videos: [],


    videoTypes: [
      { id: 'bike_recommend', name: '자전거 추천' },
      { id: 'bike_gear_recommend', name: '자전거 장비 추천' },
      { id: 'bike_course_recommend', name: '자전거 추천 경로' },
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
      state.videos.push(payload);
    },
    SELECT_VIDEO(state, payload) {
        state.video = payload;
        state.isShowVideoDetail = true;
    },
    LOGIN(state, payload) {
        state.userInfo['user_id'] = payload;
    },
    LOGOUT(state) {
        state.userInfo = {};
    },
    SET_USER_INFO(state, payload) {
        state.userInfo = payload;
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
    },
    setVideoList() {
      const API_URL = process.env.VUE_APP_YOUTUBE_API_URL;
      const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;

      const tempArr = [];
      for (const type of this.state.videoTypes) {
        axios({
          url: API_URL,
            method: 'GET',
            params: {
                key: API_KEY,
                part: 'snippet',
                q: type.name,
                type: 'video',
                maxResults: 20,
            }
        })
          .then((res) => {
            const videos = [];
            for (const item of res.data.items) {
                videos.push({
                    "channel_id": item.snippet.channelId,
                    "channel_name": item.snippet.channelTitle,
                    "desc": item.snippet.description,
                    "publishedAt": item.snippet.publishedAt,
                    "thumbnail": item.snippet.thumbnails.medium.url,
                    "title": item.snippet.title,
                    "type_id": type.id,
                    "type_name": type.name,
                    "video_id": item.id.videoId,
                });
            }
            axios.post(SERVER_URL+"/api/video", videos);
            
            tempArr.push({ id: type.id, title: type.name, data: videos });
          })
          .catch((err) => {
            console.log(err);
          });
        }
    },
    getVideoList({ commit }) {
        for (const type of this.state.videoTypes) {
            axios.get(`${SERVER_URL}/api/video/${type.id}`)
                .then((res) => {
                    const videos = res.data;
                    commit('SET_VIDEO_LIST', {
                        'id': type.id,
                        'title': type.name,
                        'data': videos,
                    });
                    console.log(type.id);
                    console.log(videos);
                })
                .catch((err) => {
                    console.log(err);
                })

        }
    },
    selectVideo({ commit }, video) {
        commit('SELECT_VIDEO', video);
    },
    registUser({ commit }, registInfo) {
      axios.post(SERVER_URL + '/api/user', registInfo)
        .then((res) => {
          commit('DUMMY');
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
      axios.post(SERVER_URL + '/api/user/login', loginInfo)
        .then((res) => {
            if (res.data.msg == 'success') {
                const userInfo = res.data.userInfo;
                commit('LOGIN', userInfo);
                
                sessionStorage.setItem("access-token", res.data['access-token']);
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
            } else {
                alert("잘못된 사용자 정보입니다.")
            }
            location.href = "/";
        })
        .catch((err) => {
          alert("잘못된 사용자 정보입니다.");
          console.log(err);
        });
    },
    logout({ commit }) {
        commit('LOGOUT');
        sessionStorage.clear();
        localStorage.clear();
        location.href = "/";
        alert("로그아웃 되었습니다.");
    },
    setUserInfo({ commit }, payload) {
        commit('SET_USER_INFO', payload);
    }
  },
  modules: {}
})
