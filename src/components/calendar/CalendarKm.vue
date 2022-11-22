<template>
<<<<<<< HEAD
  <div ref="calendar" id="calendar">
    <v-calendar trim-weeks :attributes="attributes" @dayclick="onDayClick" class="calendars"/>
    <div id="distance1">지금까지 <i><b>{{sumAll}}km</b></i> 탔습니다.</div>
    <div id="distance2">이번달에 <i><b>{{sumMonthly}}km</b></i> 탔습니다.</div>
    <weather-box class="weathers"></weather-box>
=======
  <div ref="calendar" id="CalendarKm">
    <v-calendar ref="myCalendar" trim-weeks :attributes="attributes" @dayclick="onDayClick" is-expanded />
>>>>>>> b65cf3855623cb947adfafe50a98d4dc7e45368b
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import WeatherBox from '@/components/common/WeatherBox.vue';

export default {
  name: "CalendarKm",
  components:{
    WeatherBox,
  },
  data() {
    const todos = [
      {
        description: '',
        isComplete: false,
<<<<<<< HEAD
        dates: [ new Date('','','') ], 
=======
        dates: { start: new Date(), end: new Date(2022, 10, 23) }, 
>>>>>>> b65cf3855623cb947adfafe50a98d4dc7e45368b
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
      ]),
      ...mapState([
        'userInfo',
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
<<<<<<< HEAD
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.$store.dispatch("setUserInfo", userInfo);
        }
    this.$store.dispatch("getCalendarList");
    this.setCalendars();
=======
    const mytodo = [
      {
        description: 'hello',
        isComplete: false,
        dates: { start: new Date(), end: new Date(2022, 10, 23) }, 
        // dates: { weekdays: 6 }, // weekdays : 6 사용하면 매주로 설정가능
        color: 'red',
      },
      {
        description: 'hello',
        isComplete: false,
        dates: { start: new Date(), end: new Date(2022, 10, 23) }, 
        // dates: { weekdays: 6 }, // weekdays : 6 사용하면 매주로 설정가능
        color: 'red',
      },
    ];
    for (const t of mytodo) {
      this.todos.push(t);
    }
>>>>>>> b65cf3855623cb947adfafe50a98d4dc7e45368b
  },
};
</script>

<<<<<<< HEAD
<style>
.calendar {
=======
<style scoped>
#CalendarKm {
>>>>>>> b65cf3855623cb947adfafe50a98d4dc7e45368b
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.calendars{
  margin-top: 0.5em;
}

#bike{
  width:100px;
}

.weathers {
  position: absolute;
  top: 500px;
  left: 1.8%;
}

#distance1{
  padding-top:1em;
  padding-bottom:1em;
}

#distance2{
  padding-bottom:1em;
}

</style>