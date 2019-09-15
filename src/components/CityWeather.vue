<template>
  <div class="city-weather">
    <div class="city-weather__wrapper">this is gonna be a weather</div>
    <input type="text" v-model="city" />
    <button @click="checkWeather(city)">checkWeather</button>
    <div class="city-weather__now">
      <pre>{{ weatherObj }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "CityWeather",
  computed: mapState({
    city: state => state.wm.city,
    weatherTitle: state => state.wm.weatherTitle,
    weatherObj: state => state.wm.weatherObj
  }),
  // watch: {
  //   weatherobj: store.state.wm.weatherObj
  // },
  props: {
    msg: String
  },
  methods: mapActions(["checkWeather"]),
  mounted() {
    const { city } = this;
    this.checkWeather({
      city
    });
    // checkWeather(city)
    // store.dispatch({
    //   type: 'checkWeather',
    //   city: city
    // });
  }
};
</script>
