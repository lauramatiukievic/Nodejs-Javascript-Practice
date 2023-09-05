import DropdownWithSearch from "components/ui/dropdown-with-search";
import { DatePickerWithRange } from "components/ui/date-picker-with-range";
import { useEffect, useState } from "react";
import { Button } from "components/ui/button";
import subDays from "date-fns/subDays";
import { useToast } from "components/ui/use-toast";
import { CryptoPriceChart } from "components/ui/crypto-price-chart";
import ApiUtils from "lib/api-utils";

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

  const getCryptocurrencyData = async () => {
    const data = await ApiUtils.getCryptocurrencyData(selectedCryptocurrencyId, dateRange);
    setCryptocurrencyData(data);
    saveUserActions();
  };

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      const data = await ApiUtils.getCryptocurrencies();
      setCryptocurrencies(data);
    };

    fetchCryptocurrencies();
  }, []);

  const postUserAction = (action) => {
    ApiUtils.postUserAction(action).then(() => {
      toast({ description: `User action ${action.actionType} saved successfully` });
    });
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
    return selectedCryptocurrencyId === "";
  };

  return (
    <div className=" flex flex-col items-center mt-8">
      <div className="sm:flex sm:flex-row gap-4 flex flex-col ">
        <DropdownWithSearch dropdownList={cryptocurrencies} value={selectedCryptocurrencyId} setValue={setSelecetedCryptocurrencyId} searchedValue={searchedCrypto} setSearchedValue={setSearchedCrypto} />
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        <Button onClick={getCryptocurrencyData} variant="outline" disabled={isButtonDisabled()}>
          Get data
        </Button>
      </div>
      <CryptoPriceChart data={cryptocurrencyData} />
    </div>
  );
}

export default App;
