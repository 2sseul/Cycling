import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VideoView from '../views/VideoView.vue'
import BoardView from '../views/BoardView.vue'
import BoardList from '../components/board/BoardList.vue'
import BoardWrite from '../components/board/BoardWrite.vue'
import CalendarView from '../views/CalendarView.vue'
import MyPageView from '../views/MyPageView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/video',
    name: 'video',
    component: VideoView,
  },
  {
    path: '/board',
    name: 'board',
    component: BoardView,
    children: [
      {
        path: '',
        name: 'list',
        component: BoardList
      },
      {
        path: 'write',
        name: 'write',
        component: BoardWrite
      },
    ]
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
