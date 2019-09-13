<template>
  <div class="home">
    <CityWeather msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import CityWeather from "@/components/CityWeather.vue";

export default {
  name: "home",
  components: {
    CityWeather
  }
};
</script>
