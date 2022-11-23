<template>
  <div ref="calendar" id="calendar">
    <v-calendar trim-weeks :attributes="attributes" @dayclick="onDayClick" class="calendars"/>
    <!-- <weather-box class="weathers"></weather-box> -->
    <div>
      <div class="notice-box noticeType-error noFade" id="notice_xav0oxgxd5">
      <div class="notice-inner">
        <div class="notice-background"></div>
        <span>지금까지 <i><b>{{sumAll}}km</b></i> 탔습니다.<br><code>이번달에 <i><b>{{sumMonthly}}km</b></i> 탔습니다.</code>
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
// import WeatherBox from '@/components/common/WeatherBox.vue';

export default {
  name: "CalendarKm",
  components:{
    // WeatherBox,
  },
  data() {
    const todos = [ 
      {
        description: '',
        isComplete: false,
        dates: [ new Date('','','') ], 
        // dates: { weekdays: 6 }, // weekdays : 6 사용하면 매주로 설정가능
        color: 'red',
      },
    ];
    return {
      sumMonthly:0,
      sumAll: 0,
      incId: todos.length,
      todos,
      mode:'date',
      days:[],
      userInfo: {},
    };
  },
  methods:{
    classChanger() {
      const calendar = this.$refs.calendar;
      if (this.isNightView) {
        calendar.classList.add("is-dark");
      } else {
        calendar.classList.remove("is-dark");
      }
    },

    onDayClick(day) {
      const idx = this.days.findIndex(d => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });
      }
    },
    setCalendars(){

    }
  },
  computed: {
    ...mapGetters([
        'getCalendars',
        'getUserInfo',
      ]),
      ...mapState([
        'calendars'
      ]),
    isNightView() {
      return this.$store.getters.getIsNightView;
    },
    dates() {
      return this.days.map(day => day.date);
    },
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map(todo => ({
          dates: todo.dates,
          highlight: todo.color,
          popover: {
            label: todo.description,
          },
          customData: todo,
        })),
      ];
    },
  },
  watch: {
    isNightView(val) {
      this.classChanger();
      return val;
    },
    getUserInfo(val) {
      this.userInfo = val;
    },
    getCalendars(calendars){
      // {
      //   description: msg,
      //   isComplete: false,
      //   dates: [ new Date(year,month,day) ], 
      //   // dates: { weekdays: 6 }, // weekdays : 6 사용하면 매주로 설정가능
      //   color: 'red',
      // },
      this.todos = [];
      for(const todo of calendars) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        if (todo.year == year && todo.month == month) {
          this.sumMonthly += todo.description;
        }

        this.sumAll += todo.description;
        this.todos.push({
          'description': todo.description + "km",
          'isComplete': false,
          'dates': [ new Date(todo.year, todo.month, todo.day )],
          'color': 'red',
        })
      }
    },

  },
  mounted() {
    this.classChanger();
    this.$store.dispatch("getCalendarList");
    this.setCalendars();
  },
};
</script>

<style>
.calendar {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.calendars{
  margin-top: 0.5em;
  margin-left:4em;
  margin-bottom:2em;
}

#bike{
  width:100px;
}

#distance1{
  padding-top:1em;
  padding-bottom:1em;
}

#distance2{
  padding-bottom:1em;
}

/** notice */
:root {
    --primary: #0088FF;
    --primary-text: #FFFFFF;
    --secondary: #DDDDDD;
    --secondary-text: #333333;
    --secondary_dark: #444;
    --secondary_dark-text: #FAFAFA;
    --success: #40BD00;
    --success-text: #FFFFFF;
    --warning: #FAC536;
    --warning-text: #FFFFFF;
    --danger: #EF4239; /* OLD: #D62F1F */
    --danger-text: #FFFFFF;
    --grey_dark: #1E1E1E;
    --grey: #424242;
    --grey_light: #DDDDDD;
    --grey_lighter: #EEEEEE;
}
*,
*::before,
*::after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body {
	font-family: Verdana, "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	line-height: 1.5;
}




#notice-layer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
}
#notice-list {
    position: absolute;
    bottom: 18px;
    left: 0;
}
.notice-box {
    position: relative;
    animation-name: notice-fadeIn;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
@keyframes notice-fadeIn {
    0%   { opacity: 0; transform: translateX(-100%); }
    100% { opacity: 1; transform: translateX(0%); }
}
.notice-box::after {
    content: "";
    display: block;
    height: 12px;
}

.notice-inner {
    position: relative;
    width: 100%;
    margin: 0 0 0 30px;
    padding: 10px 18px;
    border-radius: 8px;
    overflow: hidden;
    pointer-events: all;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.12),
                0px 4px 20px 0px rgba(0, 0, 0, 0.14),
                0px 0px 10px 7px rgba(0, 0, 0, 0.0);
    transform-origin: 50% 0%;
}
.notice-inner > span {
    position: relative;
}
.notice-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #aaa;
}
.d-dark .notice-background {
    filter: brightness(0.3) grayscale(0.1);
}
.notice-background::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #EEEEEE88;
}
.d-dark .notice-background::after {
    background: transparent;
}
.noticeType-error .notice-background { background: var(--grey_lighter); }
.noticeType-warning .notice-background { background: var(--grey_lighter); }
.noticeType-success .notice-background {  background: var(--grey_lighter); }
/*
.noticeType-error .notice-inner { background: #54201e; }
.noticeType-warning .notice-inner { background: #635123; }
.noticeType-success .notice-inner { background: #194432; }
*/
.notice-inner::before {
    position: relative;
    z-index: 4;
    display: block;
    font-size: 120%;
    border-bottom: 2px solid #00000011;
    margin-bottom: 5px;
    padding-bottom: 7px;
    color: #00000066;
}
.noticeType-error .notice-inner::before {
    color: var(--danger);
    filter: brightness(0.7);
}
.noticeType-warning .notice-inner::before {
    color: var(--warning);
    filter: brightness(0.7);
}
.d-dark .notice-inner::before {
    border-bottom: 2px solid #FFFFFF11;
    color: #FFFFFF66;
    filter: none;
}
.noticeType-error .notice-inner::before { content: "Notice"; }
.notice-fadeOut .notice-inner {
    animation-name: notice-fadeOut;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
    pointer-events: none !important;
}
@keyframes notice-fadeOut {
    50%  { opacity: 0; }
    90%  { opacity: 0; transform: scaleX(0.5) scaleY(0); }
    100% { opacity: 0; }
}
.notice-box code {
	opacity: 0.6;
}
.notice-inner .dotdotdot {
    display: inline-block;
    width: 18px;
}
.notice-inner .dotdotdot::before {
    content: "";
    animation-name: notice-dotdotdot;
    animation-duration: 5s;
    animation-fill-mode: forwards;
}
@keyframes notice-dotdotdot {
    0%   { content: "" }
    20%  { content: "." }
    40%  { content: ".." }
    60%  { content: "..." }
    80%  { content: "...." }
    100% { content: "....." }
}
.notice-fadeOut .notice-inner * {
    pointer-events: none !important;
}

</style>