
<template>
  <div>
    <div id="chart-root"></div>
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
      weatherObj: state => state.wm.weatherObj,
      chartData: state => state.wm.chart5Data
    })
  },
  methods: {
    ...mapActions(["checkWeather", "changeCity"]),
    updateCity(e) {
      this.$store.commit("changeCity", e);
    }
  },
  created() {
    const { city } = this;

    this.checkWeather({
      city
    })
  },
  mounted() {
    // TODO брать данные из store, а не передавать через пропсы
    

    console.log(this.weatherObj);
    const options = {
      chart: {
        type: "line"
      },
      series: [{
          data: this.chartData
      }],
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