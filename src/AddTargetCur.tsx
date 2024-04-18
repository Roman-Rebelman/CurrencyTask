import { useState, useEffect } from "react";
import TargetCurrency from "./TargetCurrency";

interface AddTargetCurProps {
  debouncedSearch: number; 
  selectedCurrency: string | null;
}

export default function AddTargetCur({
  debouncedSearch,
  selectedCurrency
}: AddTargetCurProps) {
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
            // todo: Вычисление суммы в целевой валюте - это бизнес-логика приложения. Ее хорошо бы обособить в отдельной функции.
            responseData.data.rates[selectedTargetCurrency] * Number(debouncedSearch)
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
        // todo: Время обновления задано как "магическое число". Такое следует выносить в константы и описывать комментарием.
        //       С большой вероятностью может задаваться из конфига или переменной окружения.
      }, 60000 * 5);
      return () => clearInterval(interval);
    }
  }, [debouncedSearch, selectedTargetCurrency, selectedCurrency]);

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
