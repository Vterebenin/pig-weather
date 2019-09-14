<template>
  <div class="city-weather">
    <div class="city-weather__wrapper">this is gonna be a weather</div>
    <input type="text" v-model="cityName">
    <button>Узнать погоду</button>
    <div class="city-weather__now">
      {{ weatherTitle }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CityWeather",
  data() {
    return {
      cityName: "Smolensk",
      weatherTitle: "all fine"
    }
  },
  props: {
    msg: String
  },
  mounted() {
    const apikey = process.env.API_KEY;
    console.log(apikey);
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const query = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&APPID=${apikey}`;
    async function f(reducedThis) {
      let cityWeather = new Promise((resolve, reject) => {
        axios
          .get(query, {
            headers: {
              "x-requested-With": "XMLHttpRequest",
              "X-CSRFToken": "example-of-custom-header"
            }
          })
          .then(result => {
            resolve(result.data);
          });
      });

      let result = await cityWeather;
      console.log(result);
      console.log(reducedThis);
      reducedThis.weatherTitle = result.weather[0].main
      return result
    }
    console.log(this.weatherTitle);

    let test = f(this);
    console.log(test, "test");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
