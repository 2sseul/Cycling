<template>
  <div class="container">
    <div ref="mypage" class="mypage">
        <!--프로필 이미지 -->
      <div class="card-container">
        <h3>UserId</h3>
        <div class="profilebox" > 
          <img class="round" id="preview_img" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
          <input class="input_img" type="file" />
        </div>
        <h4>nickname</h4>
        <p>User interface designer and <br/> front-end developer</p>
        <div class="buttons">
          <button class="primary">
            Message
          </button>
          <button class="primary ghost">
            Following
          </button>
        </div>
        <div class="skills">
          <h6>Skills</h6>
          <ul>
            <li>UI / UX</li>
            <li>Front End Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node</li>
          </ul>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
    name: 'MyPageView',
    methods: {
        classChanger() {
        const mypage = this.$refs.mypage;
        if (this.isNightView) {
          mypage.classList.add("dark");
        } else {
          mypage.classList.remove("dark");
        }
      },readimg(input){
        const reader = new FileReader();
        reader.onload = e => {
          const previewImage = document.getElementsById("preview_img")
          previewImage.src - e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
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
.container {
  background: url('../assets/img/bg/bg_bike.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.mypage {
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
    background-color: rgba( 255, 255, 255, 0.6 );
}

.mypage.dark {
    background-color: rgba( 0, 0, 0, 0.5 );
}

/** profile */
h3 {
	margin: 10px 0;
}

h4 {
	margin: 5px 0;
	text-transform: uppercase;
}

p {
	font-size: 14px;
	line-height: 21px;
}

.input_img{
  display:block;
}

.profilebox{
  border-radius: 72px 72px 72px 72px;
}

.card-container {
	border-radius: 5px;
	color: black;
	padding-top: 30px;
	position: relative;
	width: 350px;
	max-width: 100%;
	text-align: center;
}

.card-container .round {
	border: 1px solid #03BFCB;
	border-radius: 50%;
	padding: 7px;
}

button.primary {
	background-color: #03BFCB;
	border: 1px solid #03BFCB;
	border-radius: 3px;
	color: #231E39;
	font-family: Montserrat, sans-serif;
	font-weight: 500;
	padding: 10px 25px;
}

button.primary.ghost {
	background-color: transparent;
	color: #02899C;
}

.skills {
	text-align: left;
	padding: 15px;
	margin-top: 30px;
}

.skills ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

.skills ul li {
	border: 1px solid #2D2747;
	border-radius: 2px;
	display: inline-block;
	font-size: 12px;
	margin: 0 7px 7px 0;
	padding: 7px;
}


</style>