import axios from "axios";
export default {
  state: {
    city: "Smolensk",
    apikey: process.env.API_KEY,
    weatherTitle: "all fine",
    weatherObj: {},
    list: {},
    chart5Data: []
  },
  mutations: {
    setWeatherObj(state, { weatherObj }) {
      state.weatherObj = weatherObj
    },
    setWeatherTitle(state, { weatherTitle }) {
      state.weatherTitle = weatherTitle
    },
    setList(state, { list }) {
      state.list = list
    },
    setChart5Data(state, { chart5Data }) {
      state.chart5Data = chart5Data
    },
    changeCity(state, city) {
      state.city = city;
    }
  },
  actions: {
    changeCity({ commit }, payload) {
      commit("changeCity", payload.city);
    },
    checkWeather({ commit, state }, city) {
      async function requestWeatherForCity() {
        let cityWeather = new Promise((resolve, reject) => {
          const { apikey } = state;
          commit('setWeatherObj', { weatherObj: {} })
          const proxy = "https://cors-anywhere.herokuapp.com/";
          const query = `${proxy}https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=json&APPID=${apikey}`;
          axios
            .get(query, {
              headers: {
                "x-requested-With": "XMLHttpRequest",
                "X-CSRFToken": "example-of-custom-header"
              }
            })
            .catch(err => {
              reject(new Error(err));
            })
            .then(result => {
              resolve(result.data);
            });
        });
        let weatherObj = await cityWeather.catch(() => {
          return "something went wrong,\nare you sure the city name is correct?";
        });
        commit('setWeatherObj', { weatherObj })

        let chart5Data = []
        commit('setChart5Data', { chart5Data })
        const { list } = weatherObj
        list.forEach(weatherOfTheHour => {
          const { dt } = weatherOfTheHour;
          const tempCels = weatherOfTheHour.main.temp - 273;
          const tempCelsInt = Math.floor(tempCels)
          chart5Data.push([dt, tempCelsInt]);
        });
        console.log(chart5Data)
        commit('setChart5Data', { chart5Data })
      }
      return requestWeatherForCity();
    },
  }
};
