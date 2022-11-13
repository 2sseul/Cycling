<template>
      <div id="container">
        <div id="weatherCard">
            <div id="noInfo">No data</div>
            <div id="weatherInfo" class="hidden">
                <div class="weatherImg">
                    <img src="" alt="">
                </div>
                <div class="info">
                    <div class="detail">
                        <span id="temp"></span>
                        <span id="city"></span>
                    </div>
                    <span ref="updateTime" id="updateTime"></span>
                </div>
            </div>
            <i @click="weatherRefresh" class="fa-solid fa-rotate-right"></i>
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
                    const cityCode = json.id;
                    const city = json.name;
                    const temp = Math.round((json.main.temp - 273.15) * 10) / 10;
                    const weatherCode = json.weather[0].id;
                    const des = json.weather[0].description;
                    const icon = json.weather[0].icon;

                    this.setWeatherCard(city, temp, des, icon);
                    this.$store.dispatch('setWeather', {
                        cityCode, city, temp, weatherCode, des, icon
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
        setWeatherCard(city, temp, des, icon) {
            const noInfo = document.getElementById("noInfo");
            const weatherInfo = document.getElementById("weatherInfo");
            const infoTemp = document.getElementById("temp");
            const infoCity = document.getElementById("city");
            const updateTime = document.getElementById("updateTime");
            const weatherImg = document.getElementsByClassName("weatherImg")[0];
            const img = weatherImg.getElementsByTagName("img")[0];

            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            const strTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

            infoTemp.innerText = temp + "℃";
            infoCity.innerText = city;
            updateTime.innerText = "update : " + strTime;
            img.src = `http://openweathermap.org/img/wn/${icon}.png`;

            noInfo.classList.add(this.CLASS_HIDDEN);
            weatherInfo.classList.remove(this.CLASS_HIDDEN);
        }
    },
    mounted() {
        this.getGeoLocation();
        setInterval(this.getWeather, 60000);
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
    width: 160px;
    padding: 20px;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: space-around   ;
    flex-flow: wrap row;
    box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
    border-radius: 10px;
}

#container > h3 {
    margin-bottom: 10px;    
}

#container > #weatherCard {
    width: 160px;
    height: 65px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0 10px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
    color: #eee;
}

#container > #weatherCard > #noInfo {
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    position: relative;
    left: 5px;
}

#container > #weatherCard > #weatherInfo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 5px;
}

#container > #weatherCard > #weatherInfo > .weatherImg {
    margin-right: 5px;
    width: 48px;
    height: 48px;
    border-radius: 30px;
    background-color: #daa63e;
}

#container > #weatherCard > #weatherInfo > .weatherImg > img {
    width: 100%;
}

#container > #weatherCard > #weatherInfo > .info {
    display: flex;
    flex-direction: column;
    align-items: space-between;
}

#container > #weatherCard > #weatherInfo > .info > .detail {
    display: flex;
    align-items: center;
}

#container > #weatherCard > #weatherInfo > .info > .detail > #temp {
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: 10px;
    height: 100%;
}

#container > #weatherCard > #weatherInfo > .info > .detail > #city {
    font-size: 0.6rem;
    font-weight: 600;
    height: 100%;
}

#container > #weatherCard > #weatherInfo > .info > #updateTime {
    font-size: 0.2rem;
    font-weight: 600;
    display: inline-block;
    width: 100%;
    text-align: right;
}

.changed {
    color: #fff6f8;
    opacity: 0.8;
}

#container > #weatherCard > .fa-rotate-right {
    position: relative;
    top: -22px;
    right: 5px;
    font-size: 0.5rem;
    transition: 0.4s linear;
}

#container > #weatherCard > .fa-rotate-right:hover {
    transform: rotate(360deg);  
}
</style>