
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
      var options = {
        chart: {
          type: 'area',
          height: 350,
        },
        dataLabels: {
          enabled: false
        },
        series: [{
          name: "temp",
          data: chartData,
        }],
        markers: {
          size: 4,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'HH:mm dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },

      }
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

    console.log(new Date(1569682800));

    // ! MOUNTED END
  }
};
</script>


<style>
#chart-root {
  max-width: 600px;
}
</style>