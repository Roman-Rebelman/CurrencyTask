import { useState, useEffect } from "react";
import TargetCurrency from "./TargetCurrency";

export default function AddTargetCur({ inputValue, selectedCurrency }) {
  const [result, setResult] = useState<number>(0);

  const handleTargetCurrencySelect = (currency: string) => {
    setSelectedTargetCurrency(currency);
  };
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (selectedCurrency && selectedTargetCurrency) {
      const fetchCurrency = async () => {
        try {
          const response = await fetch(
            `https://api.coinbase.com/v2/exchange-rates?currency=${selectedCurrency}`
          );
          const responseData = await response.json();
          setResult(
            responseData.data.rates[selectedTargetCurrency] * Number(inputValue)
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchCurrency();
      const interval = setInterval(() => {
        fetchCurrency();
      }, 60000 * 5);
      return () => clearInterval(interval);
    }
  }, [inputValue, selectedTargetCurrency, selectedCurrency]);

  return (
    <div className="TargetCurrency">
      <div>
        <TargetCurrency
          handleTargetCurrencySelect={handleTargetCurrencySelect}
        />
      </div>
      <div className="result">Результат: {result.toFixed(2)} {selectedTargetCurrency}</div>
    </div>
  );
}
