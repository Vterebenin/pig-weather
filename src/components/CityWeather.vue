<template lang="pug">
.city-weather
  h1.city-weather__wrapper this is a weather for {{ city }}
  v-text-field(
    filled='' 
    outlined='' 
    label='City' 
    dark='' 
    color='#b35a82' 
    type='text' 
    v-model='inputCity'
    :value='city')
  .city-weather__now
    v-btn.city-weather__btn(@click='updateWeatherForCity(inputCity)')
      span checkWeather
  WeatherChart
</template>

<script>
import { mapState, mapActions } from "vuex";
import WeatherChart from "@/components/WeatherChart.vue";

export default {
  name: "CityWeather",
  components: {
    WeatherChart
  },
  data() {
    return {
      inputCity: "",
    };
  },
  computed: {
    ...mapState({
      city: state => state.wm.city,
      weatherTitle: state => state.wm.weatherTitle,
      weatherObj: state => state.wm.weatherObj
    }),
  },
  props: {
    msg: String
  },
  mounted() {
    const { city } = this
    this.$store.dispatch("checkWeather", this.city)
  },
  methods: {
    ...mapActions(["checkWeather", "changeCity"]),
    updateWeatherForCity(city) {
      this.$store.commit("changeCity", city);
      this.$store.dispatch("checkWeather", this.city)
    }
  },
};
</script>

<style scoped>
.city-weather {
  text-align: center;
  width: 100%;
}
.city-weather__now,
.city-weather__btn {
  text-align: left;
}
.city-weather__btn {
  margin-bottom: 20px;
}
</style>
