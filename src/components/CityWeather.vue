<template>
  <div class="city-weather">
    <div class="city-weather__wrapper">this is gonna be a weather</div>
    <input type="text" :value="city" @input="updateCity" />
    <button @click="checkWeather({ city })">checkWeather</button>
    <div class="city-weather__now">
      <pre>{{ weatherObj }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "CityWeather",
  data() {
    return {
      inputCity: "test"
    };
  },
  computed: {
    ...mapState({
      city: state => state.wm.city,
      weatherTitle: state => state.wm.weatherTitle,
      weatherObj: state => state.wm.weatherObj
    })
  },
  // watch: {
  //   weatherobj: store.state.wm.weatherObj
  // },
  props: {
    msg: String
  },
  methods: {
    ...mapActions(["checkWeather", "changeCity"]),
    updateCity(e) {
      this.$store.commit("changeCity", e.target.value);
    }
  },
  mounted() {
    const { city } = this;
    this.checkWeather({
      city
    });
  }
};
</script>
