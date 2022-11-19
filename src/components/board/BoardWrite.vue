<template>
  <div class="board_write_container">
    <label for="upload_img" ref="img_box" class="img_box">
      <img id="img" v-if="data.imgData" src="" />
      <div class="img_input" v-else>
        <span>
          <i class="fa-solid fa-image"></i>
          이미지를 선택해주세요
        </span>
        <input @change="imgChange" id="upload_img" type="file" accept=".jpg, .jpeg, .png" />
      </div>
    </label>
    <div class="board_input">
      <ul class="tagList">
        <li @click="delTag"
            v-for="(tag, idx) in data.tagList"
            :id="tag"
            :key="idx">
          {{ tag }}
        </li>
      </ul>
      <div class="input_list">
        <input @keyup.enter="addTag" class="input_addTag" type="text" placeholder="#태그 추가" />
        <input v-model="data.dist" class="input_dist" type="number" placeholder="km" min="0" />
        <button @click="postBoard" class="submit">게시글 등록</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BoardWrite',
  data() {
    return {
      data: {
        imgData: '',
        tagList: [],
        dist: 0,
      }
    }
  },
  methods: {
    imgChange() {
      const input_img = document.querySelector("#upload_img");
      this.data.imgData = input_img.files[0];

      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('img').src = e.target.result;
      };
    },
    classChanger() {
        const img_box = this.$refs.img_box;
        if (this.isNightView) {
          img_box.classList.add("dark");
        } else {
          img_box.classList.remove("dark");
        }
    },
    addTag(e) {
      for (const tag of this.data.tagList) {
        if (tag.slice(1) == e.target.value) {
          alert("이미 등록된 태그입니다");
          e.target.value = '';
          return;
        }
      }

      this.data.tagList.push(`#${e.target.value}`);
      e.target.value = '';
    },
    delTag(e) {
      this.data.tagList = this.data.tagList.filter(item => 
        item != e.target.innerText
      );
    },
    postBoard() {
      if (!this.data.imgData) {
        alert("이미지를 등록해주세요");
        return;
      }
      else if (this.data.tagList.length == 0) {
        alert("최소 1개 이상의 태그를 등록해주세요");
        return;
      }
      else if (this.data.dist == 0) {
        alert("주행거리를 입력해주세요");
        return;
      }
      
      if (confirm("글을 등록하시겠습니까?")) {
        console.log(this.data);
        this.$store.dispatch('uploadBoard', this.data);
      }

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
  transition: .2s ease;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board_write_container > .board_input > .tagList {
  list-style: none;
  font-weight: 600;
  display: flex;
  font-size: 0.8rem;
}

.board_write_container > .board_input > .tagList > li{
  margin: 5px;
}

.board_write_container > .board_input > .tagList > li:hover {
  cursor: pointer;
  color: #f55;
}

.tagList {
  height: 30px;
}

.input_list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.input_addTag {
  width: 200px;
  height: 2rem;
  padding-left: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  border: 1px solid #012D36;
}

.input_addTag:focus {
  outline: none;
  border: 2px solid #012D36;
}

.input_dist {
  margin-left: 10px;
  width: 80px;
  height: 2rem;
  padding-left: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  border: 1px solid #00333e;
}

.input_dist:focus {
  outline: none;
  border: 2px solid #00333e;
}

.input_list > .submit {
  height: 2.2rem;
  width: 100px;
  margin-left: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #004250;
  color: #fff;
}

.input_list > .submit:hover {
  font-weight: 600;
  background-color: #012D36;
  cursor: pointer;
}
</style>