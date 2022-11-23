<template>
  <div class="calendar_container">
    <div ref="calendar" class="calendar">
      <div class="calendar_zone">
        <div class="sidebar">
          <div class="sidebar-section box1">
            <h2><i class="fa-regular fa-lightbulb"></i>&nbsp;&nbsp;Instructions&nbsp;&nbsp;<i class="fa-regular fa-lightbulb"></i></h2>
            <ul>
              <li>
                <p>새로운 일정을 추가하고 싶으면 날짜를 클릭하세요 !</p>
              </li>
              <li>Drag & Drop으로 일정을 변경하세요.</li>
              <li>이벤트를 클릭하면 삭제됩니다.</li>
            </ul>
          </div>
          <div class="sidebar-section">
            <calendar-km></calendar-km>
          </div>
        </div>
        <div class="calendar_main">
          <FullCalendar class="calendar_zone" :options="myFunc()">
            <template v-slot:eventContent="arg">
              <b>{{ arg.timeText }}</b>
              <i>{{ arg.event.title }}</i>
            </template>
          </FullCalendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import CalendarKm from "@/components/calendar/CalendarKm.vue"

export default {
  name: 'CalendarView',
  components: {
    FullCalendar,
    CalendarKm,
  },
  data: function () {
    return {
      calendarOptions: {
        titleFormat: { year: "numeric", month: "long" },
        plugins: [
          dayGridPlugin,
          //클릭할 때 필요
          interactionPlugin,
        ],
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "today",
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  methods: {
    classChanger() {
      const calendar = this.$refs.calendar;
      if (this.isNightView) {
        calendar.classList.add("dark");
      } else {
        calendar.classList.remove("dark");
      }
    },
    myFunc() {
      const option = this.calendarOptions;
      option.initialEvents = this.calendarOptions.initialEvents;
      return option;
    },
    
    handleDateSelect(selectInfo) {
      let title = prompt("일정을 추가해주세요.");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },

    handleEventClick(clickInfo) {
      if (
        confirm(
          `이 일정을 삭제하겠습니까? '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },
  },
  computed: {
    isNightView() {
      return this.$store.getters.getIsNightView;
    }
  },
  watch: {
    isNightView(val) {
      this.classChanger();
      return val;
    },
  },
  beforeMount() {
    this.$store.dispatch("getUserInfo");
  },
  mounted() {
    this.classChanger();

    // const obj = [
    //   { id: '', title: '1', start: '2022-11-21' },
    //   { id: '', title: '2', start: '2022-11-24' },
    // ];

    // for (const o of obj) {
    //   this.calendarOptions.initialEvents.push(o);
    // }

    // this.calendarOptions.initialEvents =  Array.from(obj);
    // // Array.from(obj)
    // console.log(this.calendarOptions.initialEvents);
    // console.log(Array.from(this.calendarOptions.initialEvents));
  },
  
};
</script>

<style>
.calendar_container {
  background: url('../assets/img/bg/bg_bike.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.calendar {
  width: 80%;
  height: 80%;
  left: 10%;
  top: 120px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  z-index: 1;
  transition: .5s ease;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
  background-color: rgba(255, 255, 255, 0.6);
}

.calendar.dark {
  background-color: rgba(0, 0, 0, 0.5);
}

/** calendar */
.calendar_container h2 {
  margin: 0;
  font-size: 16px;
}

.calendar_container ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

.calendar_container li {
  margin: 1.5em 0;
  padding: 0;
}

.calendar_container b {
  /* used for event dates/times */
  margin-right: 3px;
}

/* .calendar_container .demo-app { */
b {
  margin-right: 3px;
}

.calendar_zone {
  display: flex;
  height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  width: 100%;
  font-size: 14px;
}

.calendar_container .slidebar_x{
  text-align: right;
}

/* .calendar_container .demo-app-sidebar { */
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .calendar_container .demo-app-sidebar-section { */

.calendar_container .box1{
  padding-top: 4em;
  padding-left:3em;
}

.calendar_container .box1 > ul {
  list-style: none;
}

.box1 > ul, .sidebar-section > ul {
  list-style: none;
}

.calendar_main {
  flex-grow: 1;
  padding-top: 3em;
  padding-right: 2em;
  padding-bottom: 3em;
  padding-left: 4em;
  width: 100%;
}

.calendar_container .fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
  max-height: 100%;
}

.calendar_container .fc-theme-standard .fc-scrollgrid {
    border: 1px solid #000;
}

.calendar_container table {
  border-color: black;
}

.calendar_container th {
  border-color: black;
}

.calendar_container tr {
  border-color: black;
}

.calendar_container td {
  border-color: black;
}

.calendar.dark .fc-theme-standard .fc-scrollgrid {
    border: 1px solid white;
}

.calendar.dark table {
  border-color: white;
}

.calendar.dark th {
  border-color: white;
}

.calendar.dark tr {
  border-color: white;
}

.calendar.dark td {
  border-color: white;
}

#distance1{
  padding-top:1em;
  padding-bottom:1em;
}

#distance2{
  padding-bottom:1em;
}
</style>