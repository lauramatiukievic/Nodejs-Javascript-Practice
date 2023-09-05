import DropdownWithSearch from "components/ui/dropdown-with-search";
import "./App.css";
import { DatePickerWithRange } from "components/ui/date-picker-with-range";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "components/ui/button";
import subDays from "date-fns/subDays";
import getTime from "date-fns/getTime";
import { useToast } from "components/ui/use-toast";
import { CryptoPriceChart } from "components/ui/crypto-price-chart";
import { format } from "date-fns";

function App() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedCryptocurrencyId, setSelecetedCryptocurrencyId] = useState("");
  const [cryptocurrencyData, setCryptocurrencyData] = useState([]);
  const [searchedCrypto, setSearchedCrypto] = useState("");
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { toast } = useToast();

  const getCryptoCurrencyData = async () => {
    axios
      .get(`https://api.coincap.io/v2/assets/${selectedCryptocurrencyId}/history?interval=d1&start=${getTime(dateRange.from)}&end=${getTime(dateRange.to)}`)
      .then((response) => response.data.data)
      .then((data) => {
        const result = data.map((time) => {
          return { total: time.priceUsd, name: format(new Date(time.time), "yyyy-MM-dd") };
        });
        setCryptocurrencyData(result);
      })
      .catch((error) => console.log("error", error));
    saveUserActions();
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
      .catch((error) => console.log("Failed to get cryptocurrencies", error));
  }, []);

  const postUserAction = (action) => {
    axios
      .post(`http://localhost:3005/userAction`, action)
      .then((response) => {
        toast({ description: `User action ${action.actionType} saved successfully` });
      })
      .catch((error) => console.log("Failed to save user action", error));
  };

  const saveUserActions = () => {
    const selectAction = {
      actionType: "Selected",
      actionValue: selectedCryptocurrencyId,
    };

    postUserAction(selectAction);

    if (searchedCrypto !== "") {
      const searchedAction = {
        actionType: "Searched",
        actionValue: searchedCrypto,
      };
      postUserAction(searchedAction);
    }
  };

  if (!cryptocurrencies) {
    return <div>Loading...</div>;
  }

  const isButtonDisabled = () => {
    if (selectedCryptocurrencyId === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className=" flex flex-col items-center mt-8">
      <div className="sm:flex sm:flex-row gap-4 flex flex-col ">
        <DropdownWithSearch dropdownList={cryptocurrencies} value={selectedCryptocurrencyId} setValue={setSelecetedCryptocurrencyId} searchedValue={searchedCrypto} setSearchedValue={setSearchedCrypto} />
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        <Button onClick={getCryptoCurrencyData} variant="outline" disabled={isButtonDisabled()}>
          Get data
        </Button>
      </div>
      <CryptoPriceChart data={cryptocurrencyData} />
    </div>
  );
}

export default App;
