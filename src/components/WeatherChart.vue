
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
          stacked: false,
          animations: {
            initialAnimation: {
              enabled: true
            }
          },
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        series: [
          {
            name: "current temperature",
            data: chartData
          }
        ],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true
        },
        title: {
          text: "Forecast for 14 days"
        },
        xaxis: {
          labels: {
            formatter: function(value) {
              let newVal = value
                .split("-")
                .join(" ")
                .split(" ");
              const year = newVal[0];
              const monthNumber = new Date(newVal[1]);
              const month = monthNumber.toLocaleString("en", {
                month: "short"
              });
              const day = newVal[2];
              let time = newVal[3].split(":");
              time.pop();
              time = time.join(":");
              newVal = ``;
              return newVal;
            },
            showDuplicates: false,
            rotate: 0,
            trim: false
            // hideOverlappingLabels: true,
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          min: 0,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true
          }
        },
        markers: {
          size: 4
        },
        tooltip: {
          x: {
            show: false,
            formatter: function(value) {
              let newVal = value
                .split("-")
                .join(" ")
                .split(" ");
              const year = newVal[0];
              const monthNumber = new Date(newVal[1]);
              const month = monthNumber.toLocaleString("en", {
                month: "short"
              });
              const day = newVal[2];
              let time = newVal[3].split(":");
              time.pop();
              time = time.join(":");
              newVal = `${time} of ${day} ${month}, ${year}`;
              return newVal;
            }
          }
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