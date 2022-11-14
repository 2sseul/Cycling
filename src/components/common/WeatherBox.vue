<template>
      <div id="container" ref="container">
        <i @click="weatherRefresh" class="fa-solid fa-rotate-right"></i>
        <div id="weatherCard">
            <div id="noInfo">No data</div>
            <div id="weatherInfo" class="hidden">
                <div class="weatherImg">
                    <img src="" alt="">
                </div>
                <div class="info">
                    <div class="detail">
                        <span id="temp"></span>
                        <span id="desc"></span>
                        <div>
                            <span id="city"></span>
                            <div id="country"></div>
                        </div>
                    </div>
                    <span ref="updateTime" id="updateTime"></span>
                </div>
            </div>
            <div id="hr" class="hidden"></div>
            <div id="weatherDetail" class="hidden">
                <div>
                    <span class="detailIcon">풍속</span>
                    <span id="wind"></span>
                </div>
                <div>
                    <span class="detailIcon">습도</span>
                    <span id="humidity"></span>
                </div>
                <div>
                    <span class="detailIcon">구름</span>
                    <span id="cloud"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeatherBox',
    data() {
        return {
            'CLASS_CHANGED': 'changed',
            'CLASS_HIDDEN': 'hidden',
            timeOutId: '',
            intervalId: '',
        }
    },
    methods: {
        async getWeather() {
            const coords = this.$store.state.coords;
            if (coords.lat != 0 && coords.lon != 0) {
                clearInterval();
            }
            const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
            const API_URL = `${process.env.VUE_APP_WEATHER_API_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

            await fetch(API_URL)
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    const weatherData = {
                        citycode: json.id,
                        city: json.name,
                        country: json.sys.country,
                        temp: Math.round((json.main.temp - 273.15) * 10) / 10,
                        weatherCode: json.weather[0].id,
                        desc: json.weather[0].description,
                        icon: json.weather[0].icon,
                        wind: json.wind.speed,
                        cloud: json.clouds.all,
                        humidity: json.main.humidity,
                    }

                    this.setWeatherCard(weatherData);
                    this.$store.dispatch('setWeather', {
                        weatherData
                    });
                }) 
                .catch((err) => alert(err));
        },
        geoSuccess(pos) {
            this.$store.dispatch('setCoords', {
                'lat': pos.coords.latitude,
                'lon': pos.coords.longitude
            })
            this.getWeather();
        },
        geoError() {
            alert("위치 정보를 가져올 수 없습니다.");
        },
        getGeoLocation() {
            const coords = this.$store.state.coords;
            
            if (coords.lat == 0 && coords.lon == 0) {
                navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
            }
        },
        weatherRefresh() {
            const updateTime = this.$refs.updateTime;
            const coords = this.$store.state.coords;
            if (coords.lat === 0 && coords.lon === 0) {
                this.getGeoLocation();
            } else {
                this.getWeather();
            }
            updateTime.classList.add(this.CLASS_CHANGED);
            setTimeout(() => {
                updateTime.classList.remove(this.CLASS_CHANGED);
            }, 200);
        },
        setWeatherCard(data) {
            const noInfo = document.getElementById("noInfo");
            const weatherInfo = document.getElementById("weatherInfo");
            const infoTemp = document.getElementById("temp");
            const infoCity = document.getElementById("city");
            const country = document.getElementById("country");
            const desc = document.getElementById("desc");
            const updateTime = document.getElementById("updateTime");
            const weatherImg = document.getElementsByClassName("weatherImg")[0];
            const img = weatherImg.getElementsByTagName("img")[0];
            const hr = document.getElementById("hr");
            const weatherDetail = document.getElementById("weatherDetail");

            const wind = document.getElementById("wind");
            const humidity = document.getElementById("humidity");
            const cloud = document.getElementById("cloud");

            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            const strTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

            infoTemp.innerText = data.temp + "℃";
            infoCity.innerText = data.city;
            updateTime.innerText = "update : " + strTime;
            img.src = `http://openweathermap.org/img/wn/${data.icon}.png`;

            wind.innerText = data.wind + "m/s";
            humidity.innerText = data.humidity + "%";
            cloud.innerText = data.cloud + "%";
            desc.innerText = data.desc;
            country.innerText = data.country;

            noInfo.classList.add(this.CLASS_HIDDEN);
            weatherInfo.classList.remove(this.CLASS_HIDDEN);
            hr.classList.remove(this.CLASS_HIDDEN);
            weatherDetail.classList.remove(this.CLASS_HIDDEN);
        },
        classChanger() {
            const container = this.$refs.container;
            if (this.isNightView) {
                container.classList.add("dark");
            } else {
                container.classList.remove("dark");
            }
        },
    },
    computed: {
        isNightView() {
            return this.$store.state.isNightView;
        }
    },
    watch: {
        isNightView(val) {
            this.classChanger();
            return val;
        }
    },
    mounted() {
        this.getGeoLocation();
        this.timeOutId = setTimeout(this.getWeather, 2000);
        this.intervalId = setInterval(this.getWeather, 60000);
    },
    beforeDestroy() {
        clearTimeout(this.timeOutId);
        clearInterval(this.intervalId);
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    text-decoration: none;
}

.hidden {
    display: none!important;
}

#container {
    width: 280px;
    height: 150px;
    box-sizing: border-box;
    padding: 10px 15px;
    margin: 0 auto;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: space-around;
    flex-flow: wrap row;
    box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
    background-color: rgba( 255, 255, 255, 0.4 );
    border-radius: 10px;
    transition: 0.5s ease;
    color: #000;
    user-select: none;
}

#container.dark {
    background-color: rgba( 0, 0, 0, 0.4);
    color: #fff;
}

#container > h3 {
    margin-bottom: 10px;    
}

#container > #weatherCard {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#container > #weatherCard > #noInfo {
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 600;
    position: relative;
    top: 40px;
}

#container > #weatherCard > #hr {
    width: 100%;
    height: 1px;
    margin: 5px 0;
    background-color: #000; 
}

#container.dark > #weatherCard > #hr {
    width: 100%;
    height: 1px;
    background-color: #fff; 
}

#container > #weatherCard > #weatherInfo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: space-around;
}

#container > #weatherCard > #weatherInfo > .weatherImg {
    width: 80px;
    height: 80px;
    background-color: orange;
    border-radius: 40px;
}

#container > #weatherCard > #weatherInfo > .weatherImg > img {
    width: 100%;
}

#container > #weatherCard > #weatherInfo > .info {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    width: 60%;
}

#container > #weatherCard > #weatherInfo > .info > .detail {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

#container > #weatherCard > #weatherInfo > .info > .detail > #temp {
    font-size: 1.4rem;
    font-weight: 600;
    height: 100%;
}

#container > #weatherCard > #weatherInfo > .info > .detail > #desc {
    font-size: 1rem;
    font-weight: 600;
    height: 100%;
}

#container > #weatherCard > #weatherInfo > .info > .detail > div > #city {
    font-size: 0.8rem;
    font-weight: 600;
    height: 100%;
    margin-right: 5px;
}

#container > #weatherCard > #weatherInfo > .info > .detail > div {
    display: flex;
    align-items: center;
}

#container > #weatherCard > #weatherInfo > .info > .detail > div > #country {
    font-size: 0.6rem;
    font-weight: 600;
    width: 24px;
    background-color: orange;
    color: #fff;
    border-radius: 5px;
}

#container > #weatherCard > #weatherInfo > .info > #updateTime {
    font-size: 0.2rem;
    font-weight: 600;
    display: inline-block;
    width: 100%;
    text-align: right;
}

#container > #weatherCard > #weatherDetail {
    font-size: 0.8rem;
    display: flex;
    font-weight: 600;
}

#container > #weatherCard > #weatherDetail > div {
    margin: 0 10px;
}

#container > #weatherCard > #weatherDetail > div > .detailIcon {
    margin-right: 5px;
}


.changed {
    color: #fff6f8;
    opacity: 0.8;
}

#container > .fa-rotate-right {
    position: relative;
    top: 0px;
    right: -123px;
    font-size: 0.7rem;
    transition: 0.4s linear;
}

#container > .fa-rotate-right:hover {
    transform: rotate(360deg);  
    cursor: pointer;
}
</style>