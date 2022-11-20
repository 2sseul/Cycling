import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SERVER_URL = 'http://localhost:9999';

function checkValidation() {
  const token = sessionStorage.getItem("access-token");
  const userInfo = localStorage.getItem("userInfo");
  if (token == null || userInfo == null) {
    return false;
  }
  return true;
}


export default new Vuex.Store({
  state: {
    dummy: false,
    isNightView: false,
    coords: { 'lat': 0, 'lon': 0 },
    weather: {},
    video: {},
    videos: [],


    videoTypes: [
      { id: 'bike_recommend', name: '자전거 추천' },
      { id: 'bike_gear_recommend', name: '자전거 장비 추천' },
      { id: 'bike_course_recommend', name: '자전거 추천 경로' },
    ],
    comments: [],
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
    CLEAR_VLIST(state) {
      state.videos = [];
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
    },
    SET_COMMENT_LIST(state, payload) {
      state.comments = payload;
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
    selectVideo({ commit }, payload) {
      commit('SELECT_VIDEO', payload);
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
      commit('CLEAR_VLIST');
      for (const type of this.state.videoTypes) {
      
          axios.get(`${SERVER_URL}/api/video/${type.id}`)
              .then((res) => {
                  const videos = res.data;
                  console.log(res.data);
                  commit('SET_VIDEO_LIST', {
                      'id': type.id,
                      'title': type.name,
                      'data': videos,
                  });
              })
              .catch((err) => {
                  console.log(err);
              })

      }
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
          })
          .catch((err) => {
            alert("잘못된 사용자 정보입니다.");
            console.log(err);
          });
        location.href = "/";
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
    },
    uploadBoard({ commit }, payload) {
      console.log(commit);
      console.log(payload);

      const token = sessionStorage.getItem('access-token');
      console.log(token);

    },

    /* 댓글 관련 기능 */
    registComment({ dispatch }, payload) {
      const flag = checkValidation();
      if (!flag) {
        alert("로그인한 사용자만 이용 가능합니다.");
        return;
      }

      let params = null;
      if (payload) params = payload;
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      payload['user_id'] = userInfo.user_id;
      axios({
        url: `${SERVER_URL}/api/comment`,
        method: 'POST',
        params,
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
        }
      })
      .then(() => {
        alert("댓글이 등록되었습니다.");
        dispatch('getCommentList', payload.video_id);
      })
      .catch((e) => {
        console.log(e);
        alert("댓글 등록 중 오류가 발생했습니다.");
      });
    },
    getCommentList({ commit }, payload) {
      axios.get(`${SERVER_URL}/api/comment/${payload}`)
      .then((res) => {
          commit('SET_COMMENT_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteComment({ dispatch }, payload) {
      axios.delete(`${SERVER_URL}/api/comment/${payload.comment_id}`)
        .then(() => {
          dispatch('getCommentList', payload.video_id);
        })
        .catch((e) => {
          console.log(e);
          alert("삭제 중 오류가 발생했습니다");
        })
    },
    editComment({ dispatch }, payload) {
      const flag = checkValidation();
      if (!flag) {
        alert("로그인한 사용자만 이용 가능합니다.");
        return;
      }

      let params = null;
      if (payload) params = payload;
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      payload['user_id'] = userInfo.user_id;
      axios({
        url: `${SERVER_URL}/api/comment`,
        method: 'PUT',
        params,
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
        }
      })
      .then(() => {
        alert("댓글이 수정되었습니다.");
        dispatch('getCommentList', payload.video_id);
      })
      .catch((e) => {
        console.log(e);
        alert("수정 중 오류가 발생했습니다");
      })
    },



  },
  modules: {},
})
