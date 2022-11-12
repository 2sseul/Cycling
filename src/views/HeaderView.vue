<template>
  <div class="header">
    <div class="side_nav"></div>
    <div class="nav">
        <div class="container_topNav"></div>
        <div>
            <input class='toggle' type="checkbox">
            <label for="toggle" class="cont"></label>
        </div>
        <i class="fa-regular fa-moon"></i>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HeaderView',
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 80px;
    background-color: #1c4769;
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.nav {
    display: flex;
    align-items: center;
}

.fa-moon {
    font-size: 1.4rem;
    color: #fff;
    margin: 20px;
}

.cont {
  height: 20px;
  width: 40px;
  background: #202430;
  border-radius: 80px;
  overflow: hidden;
  cursor: pointer;

  transition: 0.3s;
  display: flex;
  align-items: center;
}

input {
  display: none;
}

.toggle:checked ~ .cont {
  background: whitesmoke;
  box-shadow: 0 0 0 1200px #202430;
}

.cont:before {
  content: "";
  margin: 0 10px;
  height: 20px;
  width: 20px;
  background: whitesmoke;
  border-radius: 80px;
  transition: 0.5s;
}

.toggle:checked ~ .cont:before {
  transform: translateX(112%);
  background: #202430;
}
</style>