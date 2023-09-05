import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import ApiUtils from "lib/api-utils";

jest.mock("lib/api-utils");

describe("App", () => {
  const mockCryptos = [
    { id: "1", label: "Bitcoin" },
    { id: "2", label: "Ethereum" },
  ];

  beforeEach(() => {
    ApiUtils.getCryptocurrencies.mockResolvedValue(mockCryptos);
    ApiUtils.getCryptocurrencyData.mockResolvedValue([]);
    ApiUtils.postUserAction.mockResolvedValue();
  });

  test("loads and displays the dropdown with search", () => {
    render(<App />);
    expect(screen.getByText("Select crypto...")).toBeInTheDocument();
  });

  test("fetches cryptocurrencies on component mount and displays them", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Select crypto..."));
    const bitcoinElement = await screen.findByText("Bitcoin");
    expect(bitcoinElement).toBeInTheDocument();

    const ethereumElement = await screen.findByText("Ethereum");
    expect(ethereumElement).toBeInTheDocument();
  });

  test("fetches cryptocurrency data when button clicked", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Select crypto..."));
    const bitcoinElement = await screen.findByText("Bitcoin");
    fireEvent.click(bitcoinElement);
    const button = screen.getByText("Get data");
    fireEvent.click(button);
    expect(ApiUtils.getCryptocurrencyData).toHaveBeenCalled();
  });
});
