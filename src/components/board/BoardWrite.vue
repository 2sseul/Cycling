<template>
  <div class="board_write_container">
    <label for="upload_img" ref="img_box" class="img_box">
      <img id="img" v-if="imgData" src="" />
      <div class="img_input" v-else>
        <span>
          <i class="fa-solid fa-image"></i>
          이미지를 선택해주세요
        </span>
        <input @change="imgChange" id="upload_img" type="file" accept=".jpg, .jpeg, .png" />
      </div>
    </label>
    <div class="board_input">
      <textarea></textarea>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BoardWrite',
  data() {
    return {
      imgData: '',
    }
  },
  methods: {
    imgChange() {
      const input_img = document.querySelector("#upload_img");
      this.imgData = input_img.files[0];
      console.log(this.imgData);

      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('img').src = e.target.result;
      };
      reader.readAsDataURL(this.imgData);
    },
    classChanger() {
            const img_box = this.$refs.img_box;
            if (this.isNightView) {
              img_box.classList.add("dark");
            } else {
              img_box.classList.remove("dark");
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
.board_write_container {
  width: 100%;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board_write_container > .img_box {
  width: 70%;
  height: 60vh;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img_box:hover {
  cursor: pointer;
}

.img_box.dark {
  background-color: #000;
}

.img_box > #img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img_box > .img_input {
  border: 5px dotted #000;
  border-radius: 10px;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
}

.img_box > .img_input {
  cursor: pointer;
}

.img_box.dark > .img_input {
  border: 5px dotted #fff;
}

.imt_box > .img_input > span {
  font-size: 0.8rem;
  font-weight: 600;
}

.img_box > .img_input > span > i {
  font-size: 1.2rem;
}

#upload_img {
  display: none;
}

.board_write_container > .board_input {
  width: 50%;
  text-align: left;
  padding-left: 20px;
  box-sizing: border-box;
}

.board_write_container > .board_input > textarea {
  width: 100%;
  resize: none;
  margin-top: 20px;
  border-radius: 5px;
}

</style>