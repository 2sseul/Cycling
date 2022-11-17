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
    // videos: [],


    
    videos: [
      {
          "id": 1,
          "title": "자전거 추천",
          "data": [
              {
                  "kind": "youtube#searchResult",
                  "etag": "LWUGn7TpVFcy80LQzExoDwxhtJo",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "YZiWwDqoj2U"
                  },
                  "snippet": {
                      "publishedAt": "2022-09-04T15:26:44Z",
                      "channelId": "UC7vp_WW0hDx-9_y5_oGwWJA",
                      "title": "[최신 22년 하반기 반영] 운동용, 다이어트용 입문급 자전거를 찾으신다면 이 영상을 보세요. (하이브리드 자전거, MTB, 접이식 자전거, 바구니 자전거 추천)",
                      "description": "하이브리드자전거 #루나틱 #입문용 ✔️비즈니스 문의 shmedia7942@gmail.com ✔️네이버 카페 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/YZiWwDqoj2U/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/YZiWwDqoj2U/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/YZiWwDqoj2U/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "루나틱Cycling",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-09-04T15:26:44Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "dn9BnYdnzsbk8etdFUgz4XFGz3g",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "GLuBuJSegCY"
                  },
                  "snippet": {
                      "publishedAt": "2021-01-29T10:10:24Z",
                      "channelId": "UC7vp_WW0hDx-9_y5_oGwWJA",
                      "title": "운동용, 자출용 하이브리드 자전거를 추천합니다",
                      "description": "루나틱 #자전거 #하이브리드 #생활형 오늘은 근거리 이동이나 출퇴근에 사용하면 좋을 40만원 이하의 생활형 하이브리드 자전거를 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/GLuBuJSegCY/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/GLuBuJSegCY/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/GLuBuJSegCY/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "루나틱Cycling",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-01-29T10:10:24Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "AUXQBO97hYveR2wzK6f5AXSrPNw",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "RWkOHjyWFGw"
                  },
                  "snippet": {
                      "publishedAt": "2020-07-05T11:00:16Z",
                      "channelId": "UC7vp_WW0hDx-9_y5_oGwWJA",
                      "title": "자전거 추천? I 구매 전에 이 영상부터 꼭 봐 주세요",
                      "description": "자전거 #로드자전거 #자전거입문 자전거에 이제 막 입문하시는 분들을 위한 자전거 구매 팁 가이드 영상입니다 이후 자전거를 산 후 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/RWkOHjyWFGw/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/RWkOHjyWFGw/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/RWkOHjyWFGw/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "루나틱Cycling",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-07-05T11:00:16Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "qitPQuNtxCOFRd83icPwXdBAegY",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "Qu8BLOY12SU"
                  },
                  "snippet": {
                      "publishedAt": "2021-02-04T07:00:09Z",
                      "channelId": "UCdcxqzojWM8-oJrVir72MBQ",
                      "title": "입문급 로드 50~100만원 추천 TOP5 후회없는 로드입문 자전거 입니다.",
                      "description": "로드추천 #입문급로드 오늘은 입문급 로드입니다. 50~100만원 정도선에서 딱 몇가지만 추렸습니다. 메이져 브랜드에서 믿을만한 것 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/Qu8BLOY12SU/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/Qu8BLOY12SU/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/Qu8BLOY12SU/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "따라쟁이너구리",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-02-04T07:00:09Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "j1bXkAubk2M9h4R5voZh5UhI15k",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "88CSLxSNOCU"
                  },
                  "snippet": {
                      "publishedAt": "2021-05-20T03:00:03Z",
                      "channelId": "UCRWYhD_ZOpJyZZaRV67Q89g",
                      "title": "입문용 자전거 구매 ; 어떤 자전거를 살것인가? 걍 이자전거 사세요! ; 사는 방법도 알려드립니다. 고생안하고 재미있게 탈 자전거 구매 방법",
                      "description": "자전거 구매와 관련하여 질문이 들어와서 동영상을 만들었습니다. 자전거 잘 못 사서 고생하지 마시고 이 영상 보시고 결정하세요 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/88CSLxSNOCU/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/88CSLxSNOCU/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/88CSLxSNOCU/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "자전거 여행TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-05-20T03:00:03Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "ojoKbEvXTpp3Uj3v1i34j22ozVw",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "l676yH9aZ5c"
                  },
                  "snippet": {
                      "publishedAt": "2022-03-15T13:49:45Z",
                      "channelId": "UC7vp_WW0hDx-9_y5_oGwWJA",
                      "title": "하이브리드 자전거. 운동용, 자출용을 찾으신다면 보세요!",
                      "description": "하이브리드자전거 #자출 #다이어트 ✔️비즈니스 문의 shmedia7942@gmail.com ✔️네이버 카페 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/l676yH9aZ5c/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/l676yH9aZ5c/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/l676yH9aZ5c/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "루나틱Cycling",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-03-15T13:49:45Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "hQRtZ9ro_V1ntlE7o1Iu3j3j_KY",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "F4Lb0gxjO74"
                  },
                  "snippet": {
                      "publishedAt": "2022-03-04T08:50:32Z",
                      "channelId": "UC2wzZ4AgiBesXRldwv344bA",
                      "title": "로드 입문을 위한 자전거 중에 제일 싼 자전거 | 가성비 입문용 로드",
                      "description": "삼천리자전거의 카스모 제픽 R입니다. 삼천리의 코스트코 판매용 브랜드가 카스모이며 그 중에 로드형 모델이 제픽 R입니다.",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/F4Lb0gxjO74/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/F4Lb0gxjO74/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/F4Lb0gxjO74/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "자전거개론 Bicycle101",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-03-04T08:50:32Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "mvRm9uY3Or35yWjzt88v1eLrBRA",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "eeULo8GwDu4"
                  },
                  "snippet": {
                      "publishedAt": "2021-12-09T09:46:11Z",
                      "channelId": "UC8uI0-46i7DNs1lqysMc8xQ",
                      "title": "[라브픽] 이거 타고 동호회 나가면 인정? 여성 MTB 탑 라이더가 찐으로 추천하는 산악자전거! (Eng)(Jpn)",
                      "description": "MTB #스캇 #메리다 안녕하세요 라이트브로스입니다. 오늘은 여성 MTB TOP 라이더, 벨로몬의 이슬님이 직접 픽하신 라브인증 MTB ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/eeULo8GwDu4/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/eeULo8GwDu4/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/eeULo8GwDu4/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "라이트브로스 WrightBros",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-12-09T09:46:11Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "wnipxdAjua4ZhUACeHU-N6oo6pI",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "6yCt3IaC07c"
                  },
                  "snippet": {
                      "publishedAt": "2021-04-18T15:40:30Z",
                      "channelId": "UCVgllUrKldAXD5sgd6F2P1A",
                      "title": "국토종주에 적합한 100만원 이하 입문용 자전거 추천 Top9 - 자전거 국토종주를 꿈꾸지만 자전거가 없다면..",
                      "description": "안녕하세요. 사마리아인 입니다. 요즘 들어 자전거 이야기를 자주 올리게 되는데요. 자전거 전문 유튜버는 아니지만 국토종주가 처음 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/6yCt3IaC07c/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/6yCt3IaC07c/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/6yCt3IaC07c/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "사마리아인TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-04-18T15:40:30Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "gq80v7JnMDp3_DBec61cnYKXA6A",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "oD5HaiDAlL8"
                  },
                  "snippet": {
                      "publishedAt": "2022-10-11T09:52:04Z",
                      "channelId": "UC9-85XEhpECBqETMG-vC9eA",
                      "title": "23년식 500만원이하 로드 자전거 추천 - 각 메이커별 비교영상",
                      "description": "구독은 초보 유투버에게 큰 힘이 됩니다.. 감사합니다. ✔️제휴문의 : 3dmania@gmail.com ✔️네이버 자린이 카페 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/oD5HaiDAlL8/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/oD5HaiDAlL8/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/oD5HaiDAlL8/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "자린이 조피디",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-10-11T09:52:04Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "2kNC1aFE9ljO_rG-eUHha4Zfhg0",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "nmA3afE56-A"
                  },
                  "snippet": {
                      "publishedAt": "2020-07-22T11:15:01Z",
                      "channelId": "UCZnlKynpzPQITBusZopwmYg",
                      "title": "입문용 자전거 추천 | 나에게 맞는 자전거 고르는 법 | 알루미늄과 카본의 차이",
                      "description": "이 날 만난 분은 #바이크매거진 편집장 박창민 님입니다. 입문자들을 위한 유용한 자전거 정보와 조언을 주셨어요. 더불어 편집장님이 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/nmA3afE56-A/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/nmA3afE56-A/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/nmA3afE56-A/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "꽁타냥ContaNyang",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-07-22T11:15:01Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "7nU4cjXIXg0vUsEGS4vHeTBpdyw",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "yHHk3k8BF-Y"
                  },
                  "snippet": {
                      "publishedAt": "2019-06-19T07:00:31Z",
                      "channelId": "UC7vp_WW0hDx-9_y5_oGwWJA",
                      "title": "하이브리드 자전거 추천 Top3 I 브랜드별 자전거 추천",
                      "description": "자전거추천 #하이브리드자전거추천 #입문급자전거추천 오늘은 저번에 약속드린 40만원 이하의 입문급 하이브리드 자전거 추천 영상 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/yHHk3k8BF-Y/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/yHHk3k8BF-Y/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/yHHk3k8BF-Y/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "루나틱Cycling",
                      "liveBroadcastContent": "none",
                      "publishTime": "2019-06-19T07:00:31Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "6O5cazQ5XbbgNNRbeh1LYngDF2s",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "61WrLUEzXko"
                  },
                  "snippet": {
                      "publishedAt": "2022-05-03T23:44:04Z",
                      "channelId": "UCCadBjYJlCIBf7gbaP2t0pA",
                      "title": "2022년 불티나게 팔린 인기 하이브리드자전거 추천순위 TOP10",
                      "description": "2022년 가장 인기 많은 하이브리드자전거 추천순위 TOP10입니다. 상품 구매 및 상세한 정보는 더보기/고정댓글 참고해 주세요.",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/61WrLUEzXko/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/61WrLUEzXko/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/61WrLUEzXko/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "세상의 모든 쇼핑",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-05-03T23:44:04Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "8FAcOmC1BU8Ik5zPIW6hTvpVq2o",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "hzjpbaSInD4"
                  },
                  "snippet": {
                      "publishedAt": "2021-02-10T07:00:21Z",
                      "channelId": "UCdcxqzojWM8-oJrVir72MBQ",
                      "title": "200만원이하 핵가성비 로드 자전거 추천 Top6 / 후회없는 한방 입문 로드",
                      "description": "로드추천 #자전거추천 #200만원이하 오늘의 추천자전거는 200만원 이하입니다. 사실상 제일 힘든 구간입니다. 각 메이커들이 100 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/hzjpbaSInD4/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/hzjpbaSInD4/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/hzjpbaSInD4/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "따라쟁이너구리",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-02-10T07:00:21Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "K8Ng2O9lKmsWwCBMAsUemyy1Sxw",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "78e7p8TPIxo"
                  },
                  "snippet": {
                      "publishedAt": "2020-12-03T03:00:14Z",
                      "channelId": "UC7vp_WW0hDx-9_y5_oGwWJA",
                      "title": "입문용 로드바이크 100만원 이하 3대장 추천입니다",
                      "description": "자전거 #로드바이크 #입문급 비즈니스 문의 blackmoonriding@gmail.com 루나틱이 운영하는 네이버 카페에 놀러오세요 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/78e7p8TPIxo/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/78e7p8TPIxo/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/78e7p8TPIxo/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "루나틱Cycling",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-12-03T03:00:14Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "bCTaptWaMAjbNnBu8oQ6w7a0-8o",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "CxKOCbxMCew"
                  },
                  "snippet": {
                      "publishedAt": "2021-03-16T07:00:03Z",
                      "channelId": "UCdcxqzojWM8-oJrVir72MBQ",
                      "title": "400만원 이하 로드자전거 추천!! 격동의 가격대 구간 , 사고싶어도 사기힘든 구간",
                      "description": "로드자전거추천 #로드추천 오늘은 400만원 이하입니다. 영상에 나오는 순위는 의미 없습니다. 그냥 제가 조사한 순서대로 입니다.",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/CxKOCbxMCew/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/CxKOCbxMCew/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/CxKOCbxMCew/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "따라쟁이너구리",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-03-16T07:00:03Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "yccUzbCxV2y9FLgcXCZilrsTQSs",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "E8e4ohbytak"
                  },
                  "snippet": {
                      "publishedAt": "2022-04-20T22:00:05Z",
                      "channelId": "UCkM0LRI4Wi8nihg-IttEYHQ",
                      "title": "다 똑같은 로드자전거 아니였어? / 입문자 필수시청 / 올라운드 vs 에어로 바이크",
                      "description": "오늘은 #로드바이크 의 종류와 장르에 대해서 알아봤는데요! #올라운드 #에어로 #엔듀런스 #그래블 중 #입문 자분들은 나한테 맞는 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/E8e4ohbytak/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/E8e4ohbytak/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/E8e4ohbytak/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "자전거 읽어주는 남자",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-04-20T22:00:05Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "6KM8cjy9uotD-qgyFuLxImLO8EU",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "POBLF3oUGCY"
                  },
                  "snippet": {
                      "publishedAt": "2021-10-20T06:00:11Z",
                      "channelId": "UCNzn4cWu4ygeWTxXfP4ufug",
                      "title": "마이린 새 자전거를 사러 갔어요 (MTB, 하이브리드, 사이클, 어떤 걸로 골랐을까요) | 마이린 TV",
                      "description": "마이린이 주말을 맞아 자전거를 사러 갔어요 초등학교 2학년에 샀던 자전거 이후로, 7년만에 새 자전거를 산 것 같은데요. MTB ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/POBLF3oUGCY/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/POBLF3oUGCY/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/POBLF3oUGCY/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "마이린 TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-10-20T06:00:11Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "eEdiW3l0kk9zkCczM0YTun_CUyo",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "L9qJ9mFuYWU"
                  },
                  "snippet": {
                      "publishedAt": "2020-07-20T09:28:20Z",
                      "channelId": "UCRLOETSTM5MycGglfszUHMQ",
                      "title": "입문용 가성비甲 로드 자전거 TOP5! [펀앤리치]",
                      "description": "가성비 #입문용 #로드자전거 출퇴근을 하는 직장인부터 다이어트 계획은 가지고 있는 사람들까지도 관심있어하는 바로 그 물건, 로드 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/L9qJ9mFuYWU/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/L9qJ9mFuYWU/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/L9qJ9mFuYWU/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "돈교육 머닷",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-07-20T09:28:20Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "cldPT0ke21BHw8OTCpf1g8v4MkE",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "4I3wjUoiXpA"
                  },
                  "snippet": {
                      "publishedAt": "2022-10-14T09:02:48Z",
                      "channelId": "UCWLBbIVm45oetcApFsIQSVw",
                      "title": "20명에게 물어봤습니다. 지금 탄 자전거 얼마예요? - 남산편",
                      "description": "'돈을 쓰는곳에 내 마음이 있다!' - 이 영상은 내가 가진 취미 아이템을 공유하는 xtag(스택)에서 제작되었습니다. 시리즈물로 제작될 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/4I3wjUoiXpA/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/4I3wjUoiXpA/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/4I3wjUoiXpA/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "비트코드 [세상의 모든 떨림] - BEATCODE",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-10-14T09:02:48Z"
                  }
              }
          ]
      },
      {
          "id": 3,
          "title": "자전거 추천 경로",
          "data": [
              {
                  "kind": "youtube#searchResult",
                  "etag": "RTg5XAJhA99XfNdRNccEKRjJY1w",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "ijEbiR6OTGo"
                  },
                  "snippet": {
                      "publishedAt": "2020-08-24T22:45:44Z",
                      "channelId": "UCIFSp9HtOfcKYFPln45TMQA",
                      "title": "자전거 길찾기 앱 6종 비교 및 실제 사용화면 보기",
                      "description": "자세한 내용: http://5happy.net/archives/5821 #자전거길찾기앱 #자전거네비 00:25 앱 6종 비교표 00:31 오픈라이더 실제 사용화면 및 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/ijEbiR6OTGo/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/ijEbiR6OTGo/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/ijEbiR6OTGo/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "해피우키의 자전거와 여행TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-08-24T22:45:44Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "Q1RjPvnUenZVTGGK3epzZ9JmUrE",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "sLiSpsNFR0Y"
                  },
                  "snippet": {
                      "publishedAt": "2021-07-04T09:41:21Z",
                      "channelId": "UCIFSp9HtOfcKYFPln45TMQA",
                      "title": "서울,경기,인천(수도권)의 라이딩 코스 총정리",
                      "description": "라이딩코스 #수도권코스 #서울 #경기 #인천 #코스파일 #gpx 자세한 코스설명 및 GPX다운로드: http://5happy.net/archives/4692 위 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/sLiSpsNFR0Y/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/sLiSpsNFR0Y/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/sLiSpsNFR0Y/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "해피우키의 자전거와 여행TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-07-04T09:41:21Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "4IghuStmArC2HX8-xs48q1kFr3U",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "wzoKTjUBTKM"
                  },
                  "snippet": {
                      "publishedAt": "2021-05-08T13:30:01Z",
                      "channelId": "UC4bSgQ_GOZytgbDqz7XtNyA",
                      "title": "[번외편] 카카오맵 &quot;자전거 내비게이션&quot;을 테스트해봤습니다(Feat. 갑과을)",
                      "description": "저 같은 길치에게 굉장히 반가운 소식이죠? 카카오 맵이 자전거 내비게이션이 추가되었습니다 설레는 마음을 안고 테스트를 하러 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/wzoKTjUBTKM/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/wzoKTjUBTKM/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/wzoKTjUBTKM/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "자나두",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-05-08T13:30:01Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "mA8WKd2uDbhhup_I7oyPTkbahLY",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "K3svnGIR8mI"
                  },
                  "snippet": {
                      "publishedAt": "2021-06-13T10:15:00Z",
                      "channelId": "UClKqwk4QLWMfNg7p5dX7kcg",
                      "title": "자전거 네비게이션으로 라이딩? (자전거 국토종주 코스 길찾기도?)",
                      "description": "자동차 네비 같은 자전거 네비가 없을까? 있다!! 카카오맵이 자전거 네비게이션 베타버젼을 출시했다. 어디든 길찾기 어플 필요없이 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/K3svnGIR8mI/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/K3svnGIR8mI/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/K3svnGIR8mI/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "두바퀴[personal mobility]",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-06-13T10:15:00Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "7lUT9UlDUnjzIkYEwB98zIA4tBk",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "1LkTkj1Jx_I"
                  },
                  "snippet": {
                      "publishedAt": "2021-05-09T09:54:15Z",
                      "channelId": "UCIFSp9HtOfcKYFPln45TMQA",
                      "title": "자전거네비로 진화한 카카오맵 사용법 - 실제 사용화면 및 장단점 소개",
                      "description": "자전거네비 #카카오맵 #자전거길찾기 자세한 글과 설명은 다음 글을 참고하세요: http://5happy.net/archives/6737 ※동영상에서 경로 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/1LkTkj1Jx_I/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/1LkTkj1Jx_I/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/1LkTkj1Jx_I/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "해피우키의 자전거와 여행TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-05-09T09:54:15Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "qMaH-J5k7zPAPjIn3cF20L2H7Qo",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "MTwy57dV9dI"
                  },
                  "snippet": {
                      "publishedAt": "2021-09-17T09:00:11Z",
                      "channelId": "UCYRLcftbbSxSemED_--azQQ",
                      "title": "(6부) 자전거 카카오맵 의 배신!!! &quot;경로를 벗어 났습니다&quot; | 대구-부산 210km 자전거 장거리 라이딩 (eng sub)",
                      "description": "자전거 #카카오맵 #자전거내비게이션 카카오맵 자전거 내비게이션의 배신!! ※ 카카오맵의 일시적인 오류이므로 심각한 오류가 아닙 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/MTwy57dV9dI/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/MTwy57dV9dI/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/MTwy57dV9dI/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "자전거저장소",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-09-17T09:00:11Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "x9DORJXpMzpyv1rQCeePYby9-ZA",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "oXYLwIVnziQ"
                  },
                  "snippet": {
                      "publishedAt": "2021-09-29T09:14:55Z",
                      "channelId": "UC6hMVY5qbE_k3Xm7cO2E8dg",
                      "title": "죽기 전에 달려봐야할 한국의 자전거길 50 : 안 달리면 후회할 진짜 좋은 길 엄선!",
                      "description": "한국에는 아름다운 자전거길이 많습니다. 이 가운데 꼭 달려봐야할 자전거길 50선을 선정해 소개합니다. 이 길은 한국관광공사에서 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/oXYLwIVnziQ/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/oXYLwIVnziQ/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/oXYLwIVnziQ/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "동네노는형TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-09-29T09:14:55Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "IuaUoeR7L8eTdmEuLoqvbLVMCQE",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "Nj_QF6cVFeQ"
                  },
                  "snippet": {
                      "publishedAt": "2020-06-24T17:37:26Z",
                      "channelId": "UCtiZFUP9AVqFrFbPF0njV-g",
                      "title": "전주자전거코스 전주라이딩 스트라바 추천경로 사용기 ( 전주한옥마을 - 모래재 )",
                      "description": "전주에 놀러 갔다가 갑자기 자전거를 타러 간 효삐.",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/Nj_QF6cVFeQ/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/Nj_QF6cVFeQ/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/Nj_QF6cVFeQ/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "효삐 Riding_hyoppi",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-06-24T17:37:26Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "kxa4NNmXphzXlL8V73M27Ur4ESA",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "W7q5iYsBoRM"
                  },
                  "snippet": {
                      "publishedAt": "2021-05-04T07:00:11Z",
                      "channelId": "UCdcxqzojWM8-oJrVir72MBQ",
                      "title": "이제야 이게 되네~! 휴대폰으로 GPX파일 만들고 자전거 전용 네비까지!!",
                      "description": "카카오맵 #자전거네비 자전거 뉴스입니다. 이제 카카맵으로 자전거 전용네비 GPX파일 만들기 불러오기가 다 됩니다. gpx파일 되는거 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/W7q5iYsBoRM/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/W7q5iYsBoRM/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/W7q5iYsBoRM/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "따라쟁이너구리",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-05-04T07:00:11Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "u11zDeH9ZYsfF7HrkAB7Avq5nGg",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "Ec4p7I0LEZs"
                  },
                  "snippet": {
                      "publishedAt": "2021-08-20T08:02:22Z",
                      "channelId": "UCgqX7V_ouFgO3SsEQX3VeKg",
                      "title": "[바이크생활정보]스마트폰 내비 어플 어떤게 좋을까?/이거 모르면 요금 폭탄 맞는다구?",
                      "description": "티맵이 유료화로 전환되면서 스마트폰 내비어플 3가지에 대해서 이야기해보는 영상입니다.",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/Ec4p7I0LEZs/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/Ec4p7I0LEZs/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/Ec4p7I0LEZs/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "거친남자TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-08-20T08:02:22Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "i0CNrPoKubZ5X1H-vpwR6GHxs7A",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "1nUwaL0qRyk"
                  },
                  "snippet": {
                      "publishedAt": "2020-07-13T12:37:15Z",
                      "channelId": "UCYZv9v_bwfMGc64gLRe34OA",
                      "title": "묘기를 자유자재로! 눈 뗄 수 없는 픽시 자전거의 세계ㅣ생활의 달인(A Master Of Living)ㅣSBS Story",
                      "description": "픽시 자전거로 신기한 기술을 선보이는 달인을 만나러 가본다. SBS 월요일 교양 '생활의 달인' ☞ 오후 8시 55분 본방송 #생활의달인 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/1nUwaL0qRyk/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/1nUwaL0qRyk/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/1nUwaL0qRyk/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "SBS STORY",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-07-13T12:37:15Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "8SZZyoUuhaSgKz0c-eq_wWrIRJQ",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "bKcmG1526TM"
                  },
                  "snippet": {
                      "publishedAt": "2019-06-11T09:13:39Z",
                      "channelId": "UC92ufFCw_qWv_lvI1EEg4jA",
                      "title": "[지기플레이] 추천경로 이용방법",
                      "description": "안녕하세요~ 지기플레이 입니다. 이번 영상은 지기플레이 어플 내 추천경로 이용방법 상세 설명 영상 입니다. 기본 속도계 기능은 물론, ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/bKcmG1526TM/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/bKcmG1526TM/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/bKcmG1526TM/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "Jeegy Bike Support",
                      "liveBroadcastContent": "none",
                      "publishTime": "2019-06-11T09:13:39Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "i_kisM6F8BXpFcI4MUY1ko87uAM",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "YHOMFQEbVB0"
                  },
                  "snippet": {
                      "publishedAt": "2022-11-05T09:36:10Z",
                      "channelId": "UCI5oqr4VkF81ODZVdF9RsTg",
                      "title": "전국 자전거길 도장깨기 한방에 끝내려면 이렇게? 내 생에 가장 길었던 길거리 생활하며 얻은 결과는?",
                      "description": "자전거길 #국토종주 #4대강종주 #그랜드슬램 전국 자전거길 도장깨기 한방에 끝내보려고, 내 생에 가장 길었던 길거리 생활하며 25일 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/YHOMFQEbVB0/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/YHOMFQEbVB0/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/YHOMFQEbVB0/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "두바퀴 여행TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-11-05T09:36:10Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "lFJ_IYdYb0b8mRQISdwEGNHYBaY",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "Rekd2XfPIjE"
                  },
                  "snippet": {
                      "publishedAt": "2021-04-11T15:09:45Z",
                      "channelId": "UCIFSp9HtOfcKYFPln45TMQA",
                      "title": "스트라바 친구의 라이딩경로를 GPX파일로 무료다운로드하는 방법",
                      "description": "스트라바 #스트라바_무료사용법 #GPX다운로드 #GPX내보내기 자세한 글 (영상보다 추가정보가 많습니다): ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/Rekd2XfPIjE/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/Rekd2XfPIjE/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/Rekd2XfPIjE/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "해피우키의 자전거와 여행TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-04-11T15:09:45Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "eq2B9mBlNwsjfJC6FzjJ79hfKAk",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "KD2FndD8tTA"
                  },
                  "snippet": {
                      "publishedAt": "2021-08-30T10:11:57Z",
                      "channelId": "UCHBDg1HhBm8c_dZUKVeVD_w",
                      "title": "[강원365]요즘 대학생들 지갑 털리는 1순위",
                      "description": "킥보드단속 #전동킥보드 #강원대학교 #헬멧의무화 7월부터 단속 시작된 전동 킥보드 헬멧 의무화 한 달 동안 500건이 넘게 적발된 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/KD2FndD8tTA/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/KD2FndD8tTA/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/KD2FndD8tTA/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "춘천MBC 프로그램",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-08-30T10:11:57Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "ITByHjfrI9B0YElF_IY1u2GI5qY",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "KsouLfuFHR8"
                  },
                  "snippet": {
                      "publishedAt": "2021-08-08T13:00:14Z",
                      "channelId": "UCPtgGEQq0dyxInFGj6FPKSA",
                      "title": "걸어서 국토종주(Q&amp;A)l여자 단‼️둘이서 다녀왔어요. [경비, 경로, 준비물, 꿀팁 등]",
                      "description": "12박 13일 국토종주를 하면서 많은 분들이 여쭈어 봐주셨던 질문들을 정리해 영상을 만들어보았습니다. 국토종주를 계획중이신 모든 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/KsouLfuFHR8/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/KsouLfuFHR8/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/KsouLfuFHR8/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "희야TV",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-08-08T13:00:14Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "OTwMFFnXvw1Q96eeVY_o0IvtGpA",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "w9oWJP7BL-8"
                  },
                  "snippet": {
                      "publishedAt": "2020-09-21T04:28:16Z",
                      "channelId": "UCed1YAU0mAA-s-z8QVYm7cQ",
                      "title": "자전거 코스 GPX 파일 만들기 - 다음카카오맵으로 경로만들기-크롬익스텐션으로 GPX 파일 만들기-복수개의 GPX 파일 병합하기",
                      "description": "크롬익스텐션 설치하기 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/w9oWJP7BL-8/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/w9oWJP7BL-8/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/w9oWJP7BL-8/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "UNI NNI",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-09-21T04:28:16Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "-7OoGixDw9bWhoKcv7vLEUSqeF8",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "JUGLn0Q2tN4"
                  },
                  "snippet": {
                      "publishedAt": "2019-03-22T11:00:02Z",
                      "channelId": "UCMavCPU-VOgCkjlHlcyK0EQ",
                      "title": "[포마] 전동은 타고 싶은데 자전거도 못탄다면 마루 베네로 3륜 전기자전거: 선택 |포켓매거진",
                      "description": "어머님 #삼륜 #전기자전거 #선물 [포마] 전동은 타고 싶은데 자전거도 못탄다면 마루 베네로 3륜 전기자전거: 선택 |포켓매거진 포켓 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/JUGLn0Q2tN4/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/JUGLn0Q2tN4/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/JUGLn0Q2tN4/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "PocketMagazine",
                      "liveBroadcastContent": "none",
                      "publishTime": "2019-03-22T11:00:02Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "K3ZifWti7iby8mi9Yf4eikslj6g",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "mRgx9OX0Atc"
                  },
                  "snippet": {
                      "publishedAt": "2022-01-09T07:00:12Z",
                      "channelId": "UClkjSmTL-onPWI44KrZYWIg",
                      "title": "카카오맵 의 길찾기 및  네비게이션 기능 과 사용법 _ 편리하고 유용한 이용 방법 을 알려드립니다",
                      "description": "IB96 채널 은 컴퓨터 프로그램과 스마트폰 IT 모바일 기기 사용법 응용능력 기능 을 알려드리는 교육 채널입니다 _ IB96 채널 영상은 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/mRgx9OX0Atc/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/mRgx9OX0Atc/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/mRgx9OX0Atc/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "IB 96",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-01-09T07:00:12Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "Dn4FLoLx-XAYcfaSY4rwDvhHRq0",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "9U1nPjCjUk0"
                  },
                  "snippet": {
                      "publishedAt": "2022-11-13T05:20:22Z",
                      "channelId": "UCz_Ny4VP2kVss2DX7UfTukQ",
                      "title": "🚂 국내 유일!  &#39;국토 종단 특급열차&#39; 타고 여행 갑니다 | ☕️ 카페에 자전거 전용칸까지 없는게 없네요 | 기차 여행 | Amazing Tourist Train in KOREA",
                      "description": "여행 #한국여행 #기차여행 #당일치기 #Tour #korea 안녕하세요? 슬기로운 캠핑생활 입니다. 오늘도 시청해 주셔서 감사합니다.",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/9U1nPjCjUk0/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/9U1nPjCjUk0/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/9U1nPjCjUk0/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "슬기로운 캠핑생활",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-11-13T05:20:22Z"
                  }
              }
          ]
      },
      {
          "id": 2,
          "title": "장비 추천",
          "data": [
              {
                  "kind": "youtube#searchResult",
                  "etag": "hh-qxFV9HEP4JRzxA3hYWwx2OeQ",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "eORngCD_bes"
                  },
                  "snippet": {
                      "publishedAt": "2022-11-15T12:00:28Z",
                      "channelId": "UCCDVhat5xtSPB_rP5AXYVjA",
                      "title": "솔로캠핑 N년차의 살아남은 캠핑용품 리뷰 . 캠핑 장비 추천 .",
                      "description": "솔로캠핑 N년차의 살아남은 캠핑용품 . 캠핑 장비 추천 . · ɪɴѕᴛᴀɢʀᴀᴍ : https://www.instagram.com/ayaaa.a · ᴇ-ᴍᴀɪʟ ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/eORngCD_bes/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/eORngCD_bes/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/eORngCD_bes/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "아야캠핑 AYACAMPING",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-11-15T12:00:28Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "C4x7NH8Lfh9O_kwbavPRy6fKFfo",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "4CG6CGI8qWA"
                  },
                  "snippet": {
                      "publishedAt": "2022-10-23T10:17:13Z",
                      "channelId": "UCw5X6yzXwIcaSzJAQsL69Ug",
                      "title": "초보 캠퍼들을 위한 장비 선택 가이드 1탄 | 브랜드 추천X, 장비는 이렇게 고르자!",
                      "description": "추가로 더 궁금한 장비가 있다면 댓글로 남겨주세요! 다음 장비 선택 가이드 2탄으로 준비해 보겠습니다 :)",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/4CG6CGI8qWA/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/4CG6CGI8qWA/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/4CG6CGI8qWA/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "조조캠핑",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-10-23T10:17:13Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "9Zt0pYgWbXfQ-phe828u7VVITFM",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "-uk_Ui-uvQ4"
                  },
                  "snippet": {
                      "publishedAt": "2022-04-08T12:14:09Z",
                      "channelId": "UCJiv3w22pf4Cgpwxo70MbhQ",
                      "title": "눈쟁전자 2022년 장비공개",
                      "description": "게임컴 CPU : Intel Core i9-12900KF HT OFF Max 5.3GHz OC 메모리 : KLEVV DDR5 4800MHz CL40(6400MHz CL30 OC) 16G x 2 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/-uk_Ui-uvQ4/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/-uk_Ui-uvQ4/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/-uk_Ui-uvQ4/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "눈쟁이",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-04-08T12:14:09Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "EqcZHGwq2UU8DuJIkY7vQN5LWIQ",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "uy8-k1YWWaM"
                  },
                  "snippet": {
                      "publishedAt": "2020-08-02T15:41:34Z",
                      "channelId": "UCkNUuK9EfixaK2HbJYZ5YrQ",
                      "title": "※최저가 가성비※10만원 대로 1인 방송장비 세팅하기 추천꿀팁! (+원컴 장비공개겸 소개) | 당신이 컨덴서 마이크를 살 필요가 없는 이유(팩트만 말하겠습니다) - 【 아이러니 】",
                      "description": "유튜브 구독하기 【 https://bit.ly/2F1aGg7 】 - 매주 월, 금 업로드 ◇ 러니의 방송: https://www.twitch.tv/i_rony - 매일 PM. 9h ~ 12h ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/uy8-k1YWWaM/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/uy8-k1YWWaM/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/uy8-k1YWWaM/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "아이러니유튜브",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-08-02T15:41:34Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "ba0J1gUW74EqwiGdEDcyizpQbF8",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "h4LKXT8-YwU"
                  },
                  "snippet": {
                      "publishedAt": "2020-09-23T08:08:43Z",
                      "channelId": "UC5q2lRyuHNrEavonf1oX7wg",
                      "title": "유튜브 장비추천! 돈이 없어 딱 하나만 사야된다면 ?이건 꼭 사야함! 헛돈 쓰지말고 이 영상 꼭 보세요(sony a6500, rode videomicro)",
                      "description": "돈은 없고 장비는 사야하고 하나만 사야하면 뭘 사야하지? 이 고민에 대한 답을 드립니다~ 스마트폰 만으로도 충분하다고 하지만 어떤 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/h4LKXT8-YwU/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/h4LKXT8-YwU/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/h4LKXT8-YwU/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "사장님K KBOSS",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-09-23T08:08:43Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "PZ-ET_uuCVD5sphTRa2dufgx4qM",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "lElvKSZ5oIE"
                  },
                  "snippet": {
                      "publishedAt": "2022-06-22T10:00:38Z",
                      "channelId": "UCrXcXpE72U2IHAxuoiQwLIQ",
                      "title": "10만 유튜버가 추천하는 유튜브 촬영, 녹음 필수 장비 추천 BEST 10 [알리익스프레스]",
                      "description": "오늘 하루도 즐거운 알뜰 구매 쇼핑 되시기를 바랍니다 :D 자세한 구매 정보는 '영상설명란'을 확인 해 주세요 :D ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/lElvKSZ5oIE/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/lElvKSZ5oIE/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/lElvKSZ5oIE/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "알뜰구매창고",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-06-22T10:00:38Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "PS_GHfjzWt2zMH9Wpcvo2UfoTPA",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "6u4xYbVfxqY"
                  },
                  "snippet": {
                      "publishedAt": "2022-07-11T10:00:05Z",
                      "channelId": "UCoRp3j7pG9gcazGWFiC8bew",
                      "title": "여행 유튜버가 추천하는 유튜브 장비, 이거 하나면 끝입니다 고민하지 마세요(feat.유비서)",
                      "description": "순탄하게 세계여행 구독하기 : http://abit.ly/mfcold 유비서 구매하기 링크 : https://bit.ly/soontan 유튜브를 처음 시작하시는 분 이라면 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/6u4xYbVfxqY/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/6u4xYbVfxqY/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/6u4xYbVfxqY/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "순탄 Soontan",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-07-11T10:00:05Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "CafQR6OE_ONfwmMWElFJVbGDI1g",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "0nCt2IugiD0"
                  },
                  "snippet": {
                      "publishedAt": "2020-08-03T06:26:58Z",
                      "channelId": "UC1BCPvdHlUpEHQGLlNuu5Pg",
                      "title": "크로스핏 장비추천! 손목보호대를 무조건 착용해야 하는 이유? 꼭 사야하는 운동용품추천",
                      "description": "[instagram] https://www.instagram.com/fit_miyeon/ [mail] fitmmmi@gmail.com [닭가슴살 구매는 미트리] 링크타고 회원가입시 미 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/0nCt2IugiD0/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/0nCt2IugiD0/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/0nCt2IugiD0/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "핏미연TV - 도전하는 유튜버",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-08-03T06:26:58Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "7PjGKJeCHoQ49voKe_Ad6P6Jg0Y",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "cQ-5px6YP-M"
                  },
                  "snippet": {
                      "publishedAt": "2022-01-22T09:00:18Z",
                      "channelId": "UCMAJ9QkbloocIIr_55aGaHw",
                      "title": "1년간 사용해 본 것만 솔직하게 말씀드릴게요! 배스 낚시 장비. 입문 장비 추천 그리고 최애 루어까지! bass fishing.",
                      "description": "배스 #배스낚시입문 #낚시장비추천 짜잔! 안녕하세요. 아서니에요~ 이번엔 많은 분들이 궁금해 하시고 질문하셨던 저의 낚시 장비를 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/cQ-5px6YP-M/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/cQ-5px6YP-M/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/cQ-5px6YP-M/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "아선티비",
                      "liveBroadcastContent": "none",
                      "publishTime": "2022-01-22T09:00:18Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "IkunR7gyYSr-Rxx5ZYPnvIUVsng",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "qwKx9EJ4DTk"
                  },
                  "snippet": {
                      "publishedAt": "2019-07-02T08:42:35Z",
                      "channelId": "UCIDurmDCsKzsh4BDk5wYS_A",
                      "title": "유튜브 촬영용 장비들! 영상 퀄리티를 높여주는 몇가지 기본적인 카메라 장비 추천 삼각대/짐벌/조명/마이크 등",
                      "description": "유튜브 영상 퀄리티를 높여줄 수 있는 아주 기본적인 카메라 장비를 추천드립니다. 특정 제품을 추천하기 보다는 이러한 제품이 있다 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/qwKx9EJ4DTk/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/qwKx9EJ4DTk/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/qwKx9EJ4DTk/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "번거로운 임지",
                      "liveBroadcastContent": "none",
                      "publishTime": "2019-07-02T08:42:35Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "9AaRkiFOT3yeOQ9N42ONW0XHF8o",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "Yj8zSHmmMqY"
                  },
                  "snippet": {
                      "publishedAt": "2020-09-06T09:45:01Z",
                      "channelId": "UCcFjQzmwTwD36IAR3JEF_HA",
                      "title": "백패킹 필수 장비로 비박 / 초보 백패커 박지 추천 / 백패킹 치트키 / 백패킹장비 이것만 있어도 된다!!",
                      "description": "백패킹 #박지추천 #장비추천 백패킹은 필수 장비와 옵션 장비로 구성이 됩니다. 모든게 다 갖춰져야만 백패킹이 가능한게 아니에요~!",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/Yj8zSHmmMqY/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/Yj8zSHmmMqY/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/Yj8zSHmmMqY/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "플렉스민",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-09-06T09:45:01Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "Hnu8cNNcdPmXP7ebBofjuwGb84U",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "A-OqE8yOz4I"
                  },
                  "snippet": {
                      "publishedAt": "2021-07-17T12:00:08Z",
                      "channelId": "UC-6DLwseTZG-l4JprVV2MIQ",
                      "title": "입문자용 유튜브 영상 촬영장비 추천 이거 하나면 끝 (실 사용 리뷰)",
                      "description": "유비서 구매링크 : https://coupa.ng/b9gzNP 유튜브 영상 촬영장비 어떤걸 구매해야 할지 고민이신가요? 가성비 좋은 입문자용 유튜브 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/A-OqE8yOz4I/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/A-OqE8yOz4I/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/A-OqE8yOz4I/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "유튜브신쌤",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-07-17T12:00:08Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "k4xde6a6kir9WfQXgwSIgneSfn4",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "cl8Md6R70sI"
                  },
                  "snippet": {
                      "publishedAt": "2021-10-06T12:32:42Z",
                      "channelId": "UCaRKP2y5QjKlpE8jjT04y1Q",
                      "title": "몬스터헌터 스토리즈2 라이더 스킬과 장비 추천!",
                      "description": "몬스터헌터 스토리즈2 라이더 스킬과 장비 추천 영상입니다 편한 전투를 위해 딜과 인연 게이지에 중점을 두었으며 추천한 장비들이 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/cl8Md6R70sI/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/cl8Md6R70sI/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/cl8Md6R70sI/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "토드로제 Todd Roze",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-10-06T12:32:42Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "K4WHQWvas_W568tQYMmS9xR0wTo",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "TqM8h34OWjs"
                  },
                  "snippet": {
                      "publishedAt": "2021-04-11T14:30:30Z",
                      "channelId": "UC2mHUa-RHJiXz5HkHgXz33A",
                      "title": "몬스터헌터 라이즈 동반자 스킬과 장비 추천!",
                      "description": "몬스터헌터라이즈 #몬스터헌터 #아이루 #가루크 나보다 쎈 아이루와 가루크들. 영상에선 깜빡했는데 아이루와 가루크의 방어구는 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/TqM8h34OWjs/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/TqM8h34OWjs/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/TqM8h34OWjs/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "영사__",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-04-11T14:30:30Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "GR6P4AzRcZmnHF717nQY4h0NEjY",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "3tnBL0ivykc"
                  },
                  "snippet": {
                      "publishedAt": "2020-08-15T12:55:56Z",
                      "channelId": "UCCG1vOWY_nFaRQMj-IXfPew",
                      "title": "[라이즈 오브 킹덤즈]라오킹 보병장비추천,구하는방법, 조합, 도감얻는법 , 무과금서부터 중과금까지 효율세팅 이렇게 맞추면 됩니다!!",
                      "description": "라이즈오브킹덤즈#보병장비#보병세팅 안녕하세요 뙇입니다 보병장비,조합,아이템 , 도감 구하는 방법 까지!! 무과금서부터 중과금 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/3tnBL0ivykc/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/3tnBL0ivykc/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/3tnBL0ivykc/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "개굴치킨",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-08-15T12:55:56Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "zEI0Ha3rVHHHhOIY0fEYSq2wCKE",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "WYHCbnXGwYI"
                  },
                  "snippet": {
                      "publishedAt": "2020-12-02T11:50:54Z",
                      "channelId": "UCvBsfy0ATPvSag46Urot1dw",
                      "title": "바이크🚲 유튜버  겨울⛄장비 구매방법 | 듀얼바이크 라이딩장비 추천 | SUZUKI V_strom 1000",
                      "description": "SUZUKI #Vstrom #여성라이더 #멀티퍼포즈 #오토바이 안녕하세요~! 달려라으니 입니다. 바이크팝 신규매장 입점을 축하 드리며 래빗 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/WYHCbnXGwYI/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/WYHCbnXGwYI/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/WYHCbnXGwYI/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "달려라으니",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-12-02T11:50:54Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "aMNWBytDAcYAYa1Utzw17WKuso0",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "KFLL1Hd7aDs"
                  },
                  "snippet": {
                      "publishedAt": "2019-10-02T10:35:01Z",
                      "channelId": "UCQcGyzgPx6cpQJ4MYcv930w",
                      "title": "디제잉 입문장비]    장비 추천  / 가격",
                      "description": "후원 계좌 ☆ 카카오뱅크 3333-05-8217822 정영복 ( 진심으로 응원해주셔서 감사합니다.) ☆ DJ 레슨문의 & 행사문의 ☆ 카톡 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/KFLL1Hd7aDs/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/KFLL1Hd7aDs/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/KFLL1Hd7aDs/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "DJ영스베비",
                      "liveBroadcastContent": "none",
                      "publishTime": "2019-10-02T10:35:01Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "O2-RPkvpHuNV1x88Gw408ZRF2_w",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "W7LkpJ4Zf2I"
                  },
                  "snippet": {
                      "publishedAt": "2021-10-09T04:44:14Z",
                      "channelId": "UCTI6lzhXQ1uSQv_ZDoeOZCA",
                      "title": "동계 모토 캠핑 장비 추천/침낭/매트/쉘터/야전침대/",
                      "description": "안녕하세요 이번 영상은 동계 모토캠핑 장비 소개 입니다 지난번 장비소개 영상에서 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/W7LkpJ4Zf2I/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/W7LkpJ4Zf2I/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/W7LkpJ4Zf2I/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "[모토 온라인]MOTO-ON LINE",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-10-09T04:44:14Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "43QZ3C6x8Mi7MV9DLyuegDl-x_o",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "QfGKcrweFgw"
                  },
                  "snippet": {
                      "publishedAt": "2021-08-07T03:00:09Z",
                      "channelId": "UCPDp88g93hMVbvPt4TIGTBQ",
                      "title": "몬헌스토리즈2 99레벨 데단장의 추천 무기 및 장비 세팅",
                      "description": "데단장의 실시간 방송과 소통을 하려면? 트위치 :: https://www.twitch.tv/rbhr 디스코드 :: https://discord.gg/CYAhPms 인스타그램 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/QfGKcrweFgw/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/QfGKcrweFgw/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/QfGKcrweFgw/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "데단장 DeDanJang",
                      "liveBroadcastContent": "none",
                      "publishTime": "2021-08-07T03:00:09Z"
                  }
              },
              {
                  "kind": "youtube#searchResult",
                  "etag": "cQas_fSftoNOLhFV2azi-EkABtI",
                  "id": {
                      "kind": "youtube#video",
                      "videoId": "-vRlfRw2rMc"
                  },
                  "snippet": {
                      "publishedAt": "2020-11-11T05:46:31Z",
                      "channelId": "UCibCYGYSTEovga9-sxW_iYg",
                      "title": "[EP3] 나도 한다 트레일러닝 – 초보자를 위한 필수장비추천!",
                      "description": "2020 트레일러닝 온라인 교실 [나도 한다! 트레일러닝] 국내 1위 트레일러너 김지섭 선수! 아웃도어 크리에이터 오세진! 두 사람이 ...",
                      "thumbnails": {
                          "default": {
                              "url": "https://i.ytimg.com/vi/-vRlfRw2rMc/default.jpg",
                              "width": 120,
                              "height": 90
                          },
                          "medium": {
                              "url": "https://i.ytimg.com/vi/-vRlfRw2rMc/mqdefault.jpg",
                              "width": 320,
                              "height": 180
                          },
                          "high": {
                              "url": "https://i.ytimg.com/vi/-vRlfRw2rMc/hqdefault.jpg",
                              "width": 480,
                              "height": 360
                          }
                      },
                      "channelTitle": "KAFTV[대한산악연맹]",
                      "liveBroadcastContent": "none",
                      "publishTime": "2020-11-11T05:46:31Z"
                  }
              }
          ]
      }
  ],



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
    setVideoList({ commit }) {
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
            tempArr.push({ id: type.id, title: type.name, data: res.data.items });
          })
          .catch((err) => {
            console.log(err);
          });
        }
        commit('SET_VIDEO_LIST', tempArr);
    },
    selectVideo({ commit }, video) {
        commit('SELECT_VIDEO', video);
    },
    registUser({ commit }, registInfo) {
      axios.post(SERVER_URL + '/api/user', registInfo)
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
