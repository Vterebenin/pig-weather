
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
  watch: {
    city: function() {
      this.updateChart(this.chartData);
    }
  },
  methods: {
    ...mapActions(["checkWeather", "changeCity"]),
    updateCity(e) {
      this.$store.commit("changeCity", e);
    },
    updateChart(chartData) {
      // const chart
      this.$store.dispatch("checkWeather", this.city).then(() => {
        ApexCharts.exec("mychart", "updateSeries", [
          {
            data: chartData
          }
        ]);
      });
    },
    renderChart(chartData) {
      const options = {
        chart: {
          id: "mychart",
          height: 380,
          width: "100%",
          type: "area",
          animations: {
            initialAnimation: {
              enabled: false
            }
          }
        },
        series: [
          {
            data: chartData
          }
        ],
        xaxis: {
          type: "datetime"
        }
      };
      const element = document.querySelector("#chart-root");
      const chart = new ApexCharts(element, options);
      chart.render();
    }
  },

  created() {
    const { city } = this;
  },

  mounted() {
    // TODO брать данные из store, а не передавать через пропсы

    this.$store.dispatch("checkWeather", this.city).then(() => {
      this.renderChart(this.chartData);
    });

    console.log(new Date(1569682800))

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