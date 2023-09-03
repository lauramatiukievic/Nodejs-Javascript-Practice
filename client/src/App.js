import DropdownWithSearch from "components/ui/dropdown-with-search";
import "./App.css";
import { DatePickerWithRange } from "components/ui/date-picker-with-range";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedCryptocurrency, setSelecetedCryptocurrency] = useState("");
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
    <div className=" flex flex-col items-center ">
      <DropdownWithSearch dropdownList={cryptocurrencies} value={selectedCryptocurrency} setValue={setSelecetedCryptocurrency} />
      <DatePickerWithRange />
    </div>
  );
}

export default App;
