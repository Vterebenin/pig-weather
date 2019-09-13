<template>
  <div class="city-weather">
    <div class="city-weather__wrapper">this is gonna be a weather</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CityWeather",
  props: {
    msg: String
  },
  mounted() {
    const apikey = process.env.API_KEY;
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const query = `${proxy}https://api.darksky.net/forecast/${apikey}/37.8267,-122.4233`;
    axios
      .get(query)
      .then(result => {
        return result.data;
      })
      .then(data => {
        console.log(data)
      })
       
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
