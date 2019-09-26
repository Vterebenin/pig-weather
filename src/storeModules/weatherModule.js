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
    checkWeather(state, city) {
      const { apikey } = state;
      state.weatherObj = {}
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const query = `${proxy}https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=json&APPID=${apikey}`;
      async function requestWeatherForCity() {
        let cityWeather = new Promise((resolve, reject) => {
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
        state.weatherObj = await cityWeather.catch(() => {
          return "something went wrong,\nare you sure the city name is correct?";
        });
        const weatherCont = await cityWeather;
        state.chart5Data = []
        const { list } = weatherCont
        list.forEach(weatherOfTheDay => {
          const { dt } = weatherOfTheDay;
          const tempCels = weatherOfTheDay.main.temp - 273.15;
          state.chart5Data.push([dt, tempCels]);
        });
        console.log(state.chart5Data)
        state.list = list;
      }
      requestWeatherForCity();
    },
    changeCity(state, city) {
      state.city = city;
    }
  },
  actions: {
    checkWeather({ commit }, payload) {
      commit("checkWeather", payload.city);
    },
    changeCity({ commit }, payload) {
      commit("changeCity", payload.city);
    }
  }
};
