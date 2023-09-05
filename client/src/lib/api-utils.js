import axios from "axios";
import { format } from "date-fns";
import getTime from "date-fns/getTime";

const getCryptocurrencyData = async (cryptocurrencyId, dateRange) => {
  return axios
    .get(`https://api.coincap.io/v2/assets/${cryptocurrencyId}/history?interval=d1&start=${getTime(dateRange.from)}&end=${getTime(dateRange.to)}`)
    .then((response) => response.data.data)
    .then((data) => {
      return data.map((time) => {
        return { total: time.priceUsd, name: format(new Date(time.time), "yyyy-MM-dd") };
      });
    })
    .catch((error) => console.log("Failed to get cryptocurrency data", error));
};

const getCryptocurrencies = async () => {
  return axios
    .get("https://api.coincap.io/v2/assets?limit=20")
    .then((response) => response.data.data)
    .then((coins) => {
      return coins.map((coin) => {
        return { id: coin.id, label: coin.name, value: coin.symbol };
      });
    })
    .catch((error) => console.log("Failed to get cryptocurrencies", error));
};

const postUserAction = async (action) => {
  return axios.post(`http://localhost:3005/userAction`, action).catch((error) => console.log("Failed to save user action", error));
};

const ApiUtils = {
  getCryptocurrencyData,
  getCryptocurrencies,
  postUserAction,
};

export default ApiUtils;
