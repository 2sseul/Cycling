<template>
  <div class="calendar_container">
    <div ref="calendar" class="calendar">

    </div>
  </div>
</template>

<script>
export default {
    name: 'CalendarView',
    methods: {
      classChanger() {
        const calendar = this.$refs.calendar;
        if (this.isNightView) {
          calendar.classList.add("dark");
        } else {
          calendar.classList.remove("dark");
        }
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
    }
}
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
</style>