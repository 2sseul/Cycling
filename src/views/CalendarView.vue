<template>
  <div class="calendar_container">
    <div ref="calendar" class="calendar">
      <div class="demo-app">
        <div class="demo-app-sidebar">
          <div class="demo-app-sidebar-section box1">
            <h2><i class="fa-regular fa-lightbulb"></i>&nbsp;&nbsp;Instructions&nbsp;&nbsp;<i class="fa-regular fa-lightbulb"></i></h2>
            <ul>
              <li>
                <p>새로운 일정을 추가하고 싶으면 날짜를 클릭하세요 !</p>
              </li>
              <li>Drag & Drop으로 일정을 변경하세요.</li>
              <li>이벤트를 클릭하면 삭제됩니다.</li>
            </ul>
          </div>
          <div class="demo-app-sidebar-section">
            <h2><i class="fa-regular fa-calendar"></i>&nbsp;&nbsp;All Events ({{ currentEvents.length }})&nbsp;&nbsp;<i class="fa-regular fa-calendar"></i></h2>
            <ul>
              <li v-for="event in currentEvents" :key="event.id">
                <b>{{ event.startStr }}</b>
                <b>{{ event.endStr }}</b>
                <i>{{ event.title }}</i>
              </li>
            </ul>
          </div>
        </div>
        <div class="demo-app-main">
          <FullCalendar class="demo-app-calendar" :options="calendarOptions">
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


export default {
  name: 'CalendarView',
  components: {
    FullCalendar
  },
  data: function () {
    return {
      calendarOptions: {
        titleFormat: { year: "numeric", month: "long", day: "numeric" },
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
    }
  },
  mounted() {
    this.classChanger();
  },
  
};
</script>

<style scoped>
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
  justify-content: space-between;
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
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  width: 100%;
}

.slidebar_x{
  text-align: right;
}

.demo-app-sidebar {
  display: flex;
  flex-direction: column;
}

.demo-app-sidebar-section {
  padding-left: 3em;
  padding-bottom: 3em;
}

.box1{
  padding-top: 3em;
}

.box1 > ul {
  list-style: none;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>