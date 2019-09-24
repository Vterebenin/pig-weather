
<template>
  <div id="chart-root">
    123wqe
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  name: "WeatherChart",
  props: {
    data: Object
  },
  mounted() {
    async function dataTest(reducedThis) {

      const { list } = await reducedThis.data
      console.log(list);
      const firstDayDt = new Date(list[0].dt)
      return await reducedThis.data
    }
    
    dataTest(this).then(data => {
      return data
    })

    const options = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [30, 30, 10, 80, 40, 40,]
      }],
      xaxis: {
        categories: [1991,1991, 1992, 1993, 1992, 1993,] 
      }
    }
    const element = document.querySelector("#chart-root")
    const chart = new ApexCharts(element, options)
    
    chart.render();
    // ! MOUNTED END
  },
}
</script>


<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>