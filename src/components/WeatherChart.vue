
<template>
  <div>
    <div id="chart-root"></div>
    <div v-if="list">
      {{ list }}
    </div>
    <div v-else>
      test
    </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import { mapState, mapActions } from "vuex";

export default {
  name: "WeatherChart",
  computed: {
    ...mapState({
      city: state => state.wm.city,
      list: state => state.wm.list,
      weatherTitle: state => state.wm.weatherTitle,
      weatherObj: state => state.wm.weatherObj
    })
  },
  methods: {
    ...mapActions(["checkWeather", "changeCity"]),
    updateCity(e) {
      this.$store.commit("changeCity", e);
    }
  },
  mounted() {
    // TODO брать данные из store, а не передавать через пропсы
    const { city } = this;
    console.log(city);
    
    this.checkWeather({
      city
    })

    console.log(this.weatherObj);
    const options = {
      chart: {
        type: "line"
      },
      series: [
        {
          name: "sales",
          data: [30, 30, 10, 80, 40, 40]
        }
      ],
      xaxis: {
        categories: [1991, 1991, 1992, 1993, 1992, 1993]
      }
    };
    const element = document.querySelector("#chart-root");
    const chart = new ApexCharts(element, options);

    chart.render();
    // ! MOUNTED END
  }
};
</script>


<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>