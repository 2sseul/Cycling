<template>
      <div id="container" ref="container">
        <i @click="weatherRefresh" class="fa-solid fa-rotate-right"></i>
        <div id="weatherCard">
            <div v-if="WEATHER_LOADING" id="noInfo">No data</div>
            <div v-else id="weatherInfo">
                <div class="weatherBrief">
                    <div class="weatherImg">
                        <img :src="weatherInfo.imgSrc" alt="weather_icon">
                    </div>
                    <div class="info">
                        <div class="detail">
                            <span id="temp">{{ weatherInfo.temp }}</span>
                            <span id="desc">{{ weatherInfo.desc }}</span>
                            <div>
                                <span id="city">{{ weatherInfo.city }}</span>
                                <div id="country">{{ weatherInfo.country }}</div>
                            </div>
                        </div>
                        <span ref="updateTime" id="updateTime">{{ weatherInfo.updateTime }}</span>
                    </div>
                </div>
                <div id="hr"></div>
                <div id="weatherDetail" >
                    <div>
                        <i class="fa-solid fa-wind detailIcon"></i>
                        <div id="wind">{{ weatherInfo.wind }}</div>
                    </div>
                    <div>
                        <i class="fa-solid fa-droplet detailIcon"></i>
                        <div id="humidity">{{ weatherInfo.humidity }}</div>
                    </div>
                    <div>
                        <i class="fa-solid fa-cloud detailIcon"></i>
                        <div id="cloud">{{ weatherInfo.cloud }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'WeatherBox',
    data() {
        return {
            'CLASS_CHANGED': 'changed',
            'WEATHER_LOADING': true,
            weatherInfo: {
                temp: '',
                city: '',
                updateTime: '',
                imgSrc: '',
                wind: '',
                humidity: '',
                cloud: '',
                desc: '',
                country: ''
            },
        }
    },
    methods: {
        async getWeather() {
            const coords = this.coords;
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
            const coords = this.$store.state.coords;
            if (coords.lat === 0 && coords.lon === 0) {
                this.getGeoLocation();
            } else {
                this.getWeather();
            }
        },
        setWeatherCard(data) {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            const strTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            
            this.weatherInfo.temp = data.temp + "℃";
            this.weatherInfo.city = data.city;
            this.weatherInfo.updateTime = `update : ${strTime}`;
            this.weatherInfo.imgSrc = require(`@/assets/img/weather/${data.icon}.png`);

            this.weatherInfo.wind = data.wind + "m/s";
            this.weatherInfo.humidity = data.humidity + "%";
            this.weatherInfo.cloud = data.cloud + "%";
            this.weatherInfo.desc = data.desc;
            this.weatherInfo.country = data.country;
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
        },
        ...mapState([
            'coords',
        ]),
    },
    watch: {
        isNightView(val) {
            this.classChanger();
            return val;
        },
        coords() {
            this.WEATHER_LOADING = false;
        },
        weatherInfo() {
            
        }
    },
    mounted() {
        this.classChanger();
        this.getGeoLocation();
        this.getWeather();
        if (this.coords.lat != 0 && this.coords.lon != 0) {
            this.WEATHER_LOADING = false;
        }
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    text-decoration: none;
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
    justify-content: flex-start;
    align-items: center;
    position: relative;
    top: -5px;
}

#container > #weatherCard > #noInfo {
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 600;
    position: relative;
    top: 40px;
}

#container > #weatherCard > #weatherInfo > #hr {
    width: 100%;
    height: 1px;
    margin-bottom: 5px;
    background-color: #000; 
}

#container.dark > #weatherCard > #weatherInfo > #hr {
    width: 100%;
    height: 1px;
    background-color: #fff; 
}

#container > #weatherCard > #weatherInfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-around;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  {
    display: flex;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .weatherImg {
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .weatherImg > img {
    width: 120%;
    filter: drop-shadow(0px 3px 3px #000);
    position: relative;
    top: -10px;
    left: 5px;
}

#container.dark > #weatherCard > #weatherInfo > .weatherBrief  > .weatherImg > img {
    filter: drop-shadow(0px 1px 1px #fff);
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .info {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    width: 60%;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .info > .detail {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .info > .detail > #temp {
    font-size: 1.4rem;
    font-weight: 600;
    height: 100%;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .info > .detail > #desc {
    font-size: 1rem;
    font-weight: 600;
    height: 100%;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .info > .detail > div > #city {
    font-size: 0.8rem;
    font-weight: 600;
    height: 100%;
    margin-right: 5px;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .info > .detail > div {
    display: flex;
    align-items: center;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .info > .detail > div > #country {
    font-size: 0.6rem;
    font-weight: 600;
    width: 24px;
    background-color: orange;
    color: #fff;
    border-radius: 5px;
}

#container > #weatherCard > #weatherInfo > .weatherBrief  > .info > #updateTime {
    font-size: 0.2rem;
    font-weight: 600;
    display: inline-block;
    width: 100%;
    text-align: right;
    margin-top: 5px;
}

#container > #weatherCard > #weatherInfo > #weatherDetail {
    font-size: 0.8rem;
    display: flex;
    font-weight: 600;
    align-items: center;
    position: relative;
    top: -2px;
}

#container > #weatherCard > #weatherInfo > #weatherDetail > div {
    margin: 0 15px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
}

#container > #weatherCard > #weatherInfo > #weatherDetail > div > .detailIcon {
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