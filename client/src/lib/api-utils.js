import axios from "axios";
import { format } from "date-fns";
import getTime from "date-fns/getTime";

const COINCAP_URL = process.env.REACT_APP_COINCAP_URL;
const MY_SERVER_URL = process.env.REACT_APP_MY_SERVER_URL;

const getCryptocurrencyData = async (cryptocurrencyId, dateRange) => {
  return axios
    .get(`${COINCAP_URL}/assets/${cryptocurrencyId}/history?interval=d1&start=${getTime(dateRange.from)}&end=${getTime(dateRange.to)}`)
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
    .get(`${COINCAP_URL}/assets?limit=20`)
    .then((response) => response.data.data)
    .then((coins) => {
      return coins.map((coin) => {
        return { id: coin.id, label: coin.name, value: coin.symbol };
      });
    })
    .catch((error) => console.log("Failed to get cryptocurrencies", error));
};

const postUserAction = async (action) => {
  return axios.post(`${MY_SERVER_URL}/userAction`, action).catch((error) => console.log("Failed to save user action", error));
};

const ApiUtils = {
  getCryptocurrencyData,
  getCryptocurrencies,
  postUserAction,
};

export default ApiUtils;
