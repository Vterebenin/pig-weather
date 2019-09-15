import axios from "axios";
export default {
  state: {
    city: "Smolensk",
    apikey: process.env.API_KEY,
    weatherTitle: "all fine",
    weatherObj: {}
  },
  mutations: {
    checkWeather(state, city) {
      const { apikey } = state;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const query = `${proxy}https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=json&APPID=${apikey}`;
      async function requestWeatherForCity() {
        let cityWeather = new Promise(resolve => {
          axios
            .get(query, {
              headers: {
                "x-requested-With": "XMLHttpRequest",
                "X-CSRFToken": "example-of-custom-header"
              }
            })
            .then(result => {
              resolve(result.data);
            });
        });
        
        state.weatherObj = await cityWeather;
      }
      requestWeatherForCity(this);
    }
  },
  actions: {
    checkWeather({ commit }, payload) {
      commit("checkWeather", payload.city)
    }
  }
}