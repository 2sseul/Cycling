<template>
  <div ref="calendar" id="CalendarKm">
    <v-calendar ref="myCalendar" trim-weeks :attributes="attributes" @dayclick="onDayClick" is-expanded />
  </div>
</template>

<script>
export default {
  name: "CalendarKm",
  data() {
    const todos = [
      {
        description: 'hello',
        isComplete: false,
        dates: { start: new Date(), end: new Date(2022, 10, 23) }, 
        // dates: { weekdays: 6 }, // weekdays : 6 사용하면 매주로 설정가능
        color: 'red',
      },
    ];
    return {
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
        console.log(day.date);
        console.log(this.days)
      }
    },
    
    // setScenarioDatesList(){
    //   var list =[]
    //   for(var i =0;i<this.scenario_dates.objectList.length;i++){
    //     var today_year = this.scenario_dates.objectList[i].substring(0,4);
    //     var today_month = this.scenario_dates.objectList[i].substring(4,6);
    //     if(today_month.substring(0,1)==="0"){
    //       today_month=today_month.substring(1,2)
    //      }
    //     var today_date = this.scenario_dates.objectList[i].substring(6);
    //     this.state.highlighted.dates.push(new Date(today_year,today_month-1,today_date))
    //     list.push(new Date(today_year,today_month-1,today_date))
    //   }
    // },
  },
  computed: {
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
          dot: {
            color: todo.color,
            class: todo.isComplete ? 'opacity-75' : '',
          },
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
  },
  mounted() {
    this.classChanger();
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
  },
};
</script>

<style scoped>
#CalendarKm {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>