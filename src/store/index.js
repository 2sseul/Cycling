import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router';

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
    isShowUserInfo: false,
    coords: { 'lat': 0, 'lon': 0 },
    weather: {},
    video: {},
    videos: [],
    bookmarks: [],
    isBookmarked: false,
    boardList: [],
    calendars:[],
    boardLikeList: [],
    myBoardList: [],
    temp: "",


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
    },
    getBoardList(state) {
      return state.boardList;
    },
    getCalendars(state) {
      return state.calendars;
    },
    getMyBoardList(state) {
      return state.myBoardList;
    },
    getBoardLikeList(state) {
      return state.boardLikeList;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getTemp(state) {
      return state.temp;
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
    LOGOUT(state) {
        state.userInfo = {};
    },
    SET_USER_INFO(state, payload) {
        state.userInfo = payload;
    },
    SET_COMMENT_LIST(state, payload) {
      state.comments = [];
      for (const comment of payload) {
        state.comments.push({
          'comment_id': comment.data.comment_id,
          'content': comment.data.content,
          'nickname': comment.data.nickname,
          'reg_date': comment.data.reg_date,
          'parent_id': comment.data.parent_id,
          'user_id': comment.data.user_id,
          'video_id': comment.data.video_id,
          'profileResource': comment.profileResource ? `data:image/png;base64,${comment.profileResource}` : null,
        })
      }
    },
    SET_BOOKMARK_LIST(state, payload) {
      state.bookmarks = payload;
    },
    IS_BOOKMARKED(state, payload) {
      state.isBookmarked = payload;
    },
    SET_BOARD_LIST(state, payload) {
      state.boardList = [];

      for (const data of payload) {
        state.boardList.push({
            board_id: data.data.board_id,
            user_id: data.data.user_id,
            nickname: data.data.nickname,
            content: data.data.content.split(","),
            reg_date: data.data.reg_date,
            img: data.data.img,
            org_img: data.data.org_img,
            imgResource: `data:image/png;base64,${data.imgResource}`,
            like_cnt: data.data.like_cnt,
            ride_km: data.data.ride_km,
            profileResource: data.profileResource ? `data:image/png;base64,${data.imgResource}` : null,
        });
      }
    },

    SET_CALENDAR_LIST(state, payload){
      state.calendars = [];
      for (const data of payload) {
        const date = data.data.reg_date.split(" ")[0].split("-");
        state.calendars.push(
          {
            'year': date[0] * 1,
            'month' : date[1] - 1,
            'day' : date[2] * 1,
            'description' : data.data.ride_km,
         }
        )
      }
    },
    SET_MY_BOARD_LIST(state, payload) {
      state.myBoardList = [];

      for (const data of payload) {
        state.myBoardList.push({
            board_id: data.data.board_id,
            user_id: data.data.user_id,
            nickname: data.data.nickname,
            content: data.data.content.split(","),
            reg_date: data.data.reg_date,
            img: data.data.img,
            org_img: data.data.org_img,
            imgResource: `data:image/png;base64,${data.imgResource}`,
            like_cnt: data.data.like_cnt,
            ride_km: data.data.ride_km,
        });
      }
    },
    SET_BOARDLIKE_LIST(state, payload) {
      state.boardLikeList = payload;
    },
    SET_TEMP(state, payload) {
      state.temp = payload;
    },
    CLEAR_TEMP(state) {
      state.temp = "";
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
    selectVideo({ commit, dispatch }, payload) {
      commit('SELECT_VIDEO', payload);
      dispatch('checkBookmark', payload.video_id);
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
    getBookmarks({ commit }) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo == null) return;
      axios.get(`${SERVER_URL}/api/video/bookmark/${userInfo.user_id}`)
        .then((res) => {
          commit('SET_BOOKMARK_LIST', res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    addBookmark({ dispatch }, payload) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("로그인 이후에 이용가능한 서비스입니다.");
        return;
      }
      const data = {
        'user_id': userInfo.user_id,
        'video_id': payload,
      }
      try {
        axios.post(`${SERVER_URL}/api/video/bookmark`, data)
          .then(() => {
            dispatch('toggleBookmark', true);
            alert("북마크에 추가되었습니다");
          });
      } catch (e) {
        console.log(e);
        alert("오류가 발생했습니다");
      }
    },
    removeBookmark({ dispatch }, payload) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("로그인 이후에 이용가능한 서비스입니다.");
        return;
      }
      const data = {
        'user_id': userInfo.user_id,
        'video_id': payload,
      }
      try {
        axios.delete(`${SERVER_URL}/api/video/bookmark`, {
          data: data
        });
        dispatch('toggleBookmark', false);
        alert("북마크에서 삭제되었습니다");
      } catch (e) {
        console.log(e);
        alert("오류가 발생했습니다");
      }
    },
    checkBookmark({ commit, state }, payload) {
      let flag = false;
      for (const b of state.bookmarks) {
        if (b.video_id == payload) {
          flag = true;
          break;
        }
      }
      commit('IS_BOOKMARKED', flag);
    },
    toggleBookmark({ commit }, payload) {
      commit('IS_BOOKMARKED', payload);
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
    login({ dispatch }, loginInfo) {
      axios.post(SERVER_URL + '/api/user/login', loginInfo)
        .then((res) => {
            if (res.data.msg == 'success') {
                const userInfo = res.data.userInfo;
                sessionStorage.setItem("access-token", res.data['access-token']);
              console.log(res.data);
                const payload = {
                  'user_id': res.data.userInfo.user_id,
                  'reg_date': res.data.userInfo.reg_date,
                  'profile_img': res.data.userInfo.profile_img,
                  'pno': res.data.userInfo.pno,
                  'nickname': res.data.userInfo.nickname,
                  'email': res.data.userInfo.email,
                  'auth': res.data.userInfo.auth,
                  'imgResource': `data:image/png;base64,${res.data.imgResource}`,
                }
                dispatch('setUserInfo', payload);
                localStorage.setItem('userInfo', JSON.stringify(payload));

                alert(`${userInfo.nickname}님 환영합니다!`);
                location.href = '/';
              } else {
                alert("잘못된 사용자 정보입니다.")
              }
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
    },

    getUserInfo({ dispatch }) {
      const sessionInfo = sessionStorage.getItem("access-token");
      if (!sessionInfo) {
        alert("로그인 정보가 없습니다.");
        localStorage.clear();
        router.push('/');
        return; 
      }

      const localInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!localInfo) {
        const base64Payload = sessionInfo.split('.')[1];
        const payload = base64Payload.replace(/-/g, '+').replace(/_/g, '/'); 
        const result = JSON.parse(decodeURIComponent(atob(payload).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')));
        const user_id = result.user_id;
        axios.get(`${SERVER_URL}/api/user/${user_id}`)
          .then((res) => {
            const payload = {
              'user_id': res.data.data.user_id,
              'reg_date': res.data.data.reg_date,
              'profile_img': res.data.data.profile_img,
              'pno': res.data.data.pno,
              'nickname': res.data.data.nickname,
              'email': res.data.data.email,
              'auth': res.data.data.auth,
              'imgResource': `data:image/png;base64,${res.data.imgResource}`,
            }
            dispatch('setUserInfo', payload);
            localStorage.setItem(JSON.stringify(payload));
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        dispatch('setUserInfo', localInfo);
      }
    },
    updateUserProfileImg({ dispatch }, payload) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("로그인 이후에 이용가능한 서비스입니다.");
        return;
      }

      const formData = new FormData();
      formData.append("profile_img", payload);
      formData.append('user_id', userInfo.user_id);

      axios.put(`${SERVER_URL}/api/user`, formData, {
        headers: {
          'access-token': sessionStorage.getItem('access-token'),
          'Content-Type': 'multipart/form-data'
        },
      })
        .then(() => {
          dispatch("updateLocalUserInfo", userInfo.user_id);
          alert("프로필 이미지가 변경되었습니다.");
        })
        .catch((err) => {
          console.log(err);
          alert("사용자 정보 수정 중 오류가 발생했습니다.");
        })
    },
    updateUserNickname({ dispatch }, payload) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("로그인 이후에 이용가능한 서비스입니다.");
        return;
      }

      if (!confirm(`닉네임을 ${payload}로 변경하시겠습니까?`)) {
        return;
      }

      axios.put(`${SERVER_URL}/api/username`, {
        'user_id': userInfo.user_id,
        'nickname': payload,
      })
      .then(() => {
        dispatch('updateLocalUserInfo', userInfo.user_id);
      })
      .catch((err) => {
        console.log(err);
        alert("사용자 정보를 수정하는 중 오류가 발생했습니다.");
      })
    },
    updateLocalUserInfo({ dispatch }, user_id) {
      axios.get(`${SERVER_URL}/api/user/${user_id}`)
        .then((res) => {
          const payload = {
            'user_id': res.data.data.user_id,
            'reg_date': res.data.data.reg_date,
            'profile_img': res.data.data.profile_img,
            'pno': res.data.data.pno,
            'nickname': res.data.data.nickname,
            'email': res.data.data.email,
            'auth': res.data.data.auth,
            'imgResource': `data:image/png;base64,${res.data.imgResource}`,
          }
          dispatch('setUserInfo', payload);
          localStorage.setItem('userInfo', JSON.stringify(payload));
        })
        .catch((err) => {
          console.log(err);
          alert("사용자 정보를 새로 읽어오던 중 오류가 발생했습니다.");
        });
    },
    findUserId({ commit }, email) {
      commit('DUMMY');
      axios.get(`${SERVER_URL}/api/user/find/${email}`)
        .then((res) => {
          if (res.data == null || res.data.length == 0) {
            alert("존재하지 않는 사용자 이메일입니다.");
            return;
          }
          commit("SET_TEMP", res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
        });
    },
    clearTemp({ commit }) {
      commit("CLEAR_TEMP");
    },
    findUserPw({ commit }, payload) {
      const data = {
        'user_id': payload.user_id,
        'email': payload.email,
      };
      axios.post(`${SERVER_URL}/api/findPwd`, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.result != 0) {
            if (res.data.result == 1) {
              alert("존재하지 않는 사용자입니다.");
            } else {
              alert("이메일을 확인해주세요.");
            }
            return;
          }
          alert("이메일로 전송된 인증코드를 입력해주세요.");
          commit("SET_TEMP", res.data.securityNumber);
        })
        .catch((err) => {
          console.log(err);
          alert("이메일 인증 중 오류가 발생했습니다.");
        });
    },






    uploadBoard({ commit }, payload) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("로그인 이후에 이용가능한 서비스입니다.");
        return;
      }
      const data = {
        'user_id': userInfo.user_id,
        'content': payload.tagList.join(","),
        'ride_km': payload.dist,
      }
      
      const formData = new FormData();
      formData.append("profile_img", payload.file);
      formData.append('board', new Blob([JSON.stringify(data)], { type : "application/json" }));

      axios.post(`${SERVER_URL}/api/board`, formData, {
        headers: {
          'access-token': sessionStorage.getItem('access-token'),
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(() => {
        alert("게시글이 등록되었습니다.");
        router.push("/board");
        commit("DUMMY");
      })
      .catch((e) => {
        console.log(e);
        alert("게시글 등록 중 오류가 발생했습니다.");
      });
    },

    getBoardList({ commit }) {
      axios.get(`${SERVER_URL}/api/board`)
        .then((res) => {
          commit('SET_BOARD_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
          alert("게시글을 가져오는 중 오류가 발생했습니다");
        });
    },
    getMyBoardList({ commit }) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("로그인 이후에 이용가능한 서비스입니다.");
        router.push("/");
        return;
      }

      axios.get(`${SERVER_URL}/api/board/${userInfo.user_id}`)
        .then((res) => {
          commit('SET_MY_BOARD_LIST', res.data);
        })
        .catch((e) => {
          console.log(e);
          alert("게시글을 가져오는 중 오류가 발생했습니다");
        });
    },
    toggleBoardLike({ dispatch }, payload) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        alert("로그인 이후에 이용가능한 서비스입니다.");
        return;
      }
      const data = {
        'user_id': userInfo.user_id,
        'board_id': payload.board_id,
      }

      if (payload.isLike) { // 좋아요 삭제
        axios.delete(`${SERVER_URL}/api/board/like`, {
          data: data
        })
        .then(() => {
          dispatch('getBoardLikeList');
          dispatch('getBoardList');
        });
      } else { // 좋아요 추가
        axios.post(`${SERVER_URL}/api/board/like`, data)
        .then(() => {
          dispatch('getBoardLikeList');
          dispatch('getBoardList');
        });
      }
    },
    getBoardLikeList({ commit }) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;

      axios.get(`${SERVER_URL}/api/board/like/${userInfo.user_id}`)
        .then((res) => {
          commit('SET_BOARDLIKE_LIST', res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("게시글 정보를 가져오는 중 오류가 발생했습니다.");
        })
    },
    deleteBoard({ dispatch }, payload) {
      if (!confirm("삭제하시겠습니까?")) {
        return;
      }
      axios.delete(`${SERVER_URL}/api/board/${payload}`)
        .then(() => {
          dispatch("getMyBoardList");
          alert("게시글이 삭제되었습니다.");
        })
        .catch((err) => {
          console.log(err);
          alert("게시글 삭제 중 오류가 발생했습니다.");
        });
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

    /**캘린더 관련 기능 */
    getCalendarList({ commit }) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;
      
      axios.get(`${SERVER_URL}/api/calendar/${userInfo.user_id}`)
           .then((res) => {
              const calendars = res.data;
              commit('SET_CALENDAR_LIST', calendars);
           })
         .catch((err) => {
          console.log(err);
       })
    },


  },
  modules: {},
})
