import DropdownWithSearch from "components/ui/dropdown-with-search";
import "./App.css";
import { DatePickerWithRange } from "components/ui/date-picker-with-range";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "components/ui/button";
import addDays from "date-fns/addDays";
import getTime from "date-fns/getTime";

function App() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedCryptocurrencyId, setSelecetedCryptocurrencyId] = useState("");
  const [cryptocurrencyData, setCryptocurrencyData] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const getCryptoCurrencyData = async () => {
    axios
      .get(`https://api.coincap.io/v2/assets/${selectedCryptocurrencyId}/history?interval=d1&start=${getTime(dateRange.from)}&end=${getTime(dateRange.to)}`)
      .then((response) => response.data.data)
      .then((times) => {
        const result = times.map((time) => {
          return { price: time.priceUsd, time: time.time };
        });
        setCryptocurrencyData(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/assets?limit=20")
      .then((response) => response.data.data)
      .then((coins) => {
        const result = coins.map((coin) => {
          return { id: coin.id, label: coin.name, value: coin.symbol };
        });
        setCryptocurrencies(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  if (!cryptocurrencies) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex items-center ">
      <DropdownWithSearch dropdownList={cryptocurrencies} value={selectedCryptocurrencyId} setValue={setSelecetedCryptocurrencyId} />
      <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      <Button onClick={() => getCryptoCurrencyData()} variant="outline">
        Mygt
      </Button>
    </div>
  );
}

export default App;
