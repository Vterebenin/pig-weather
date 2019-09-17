<template>
  <div class="city-weather">
    <h1 class="city-weather__wrapper">this is gonna be a weather</h1>
    <v-text-field
      filled
      outlined
      label="City"
      dark
      color="#b35a82"
      type="text"
      :value="city"
      @input="updateCity"
    />
    <div class="city-weather__now">
      <v-btn class="city-weather__btn" @click="checkWeather({ city })">
        <span>checkWeather</span>
      </v-btn>
      <pre v-if="weatherObj">
        {{ weatherObj }}
      </pre>
      <div v-else>
        loading...
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import _ from "lodash";
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
      this.$store.commit("changeCity", e);
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
