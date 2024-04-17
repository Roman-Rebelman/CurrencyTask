import React, { useEffect, useState } from "react";
import BaseCurrency from "./BaseCurrency";
import TargetCurrency from "./TargetCurrency";
import { InputNumber } from "antd";

const App: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState<
    string | null
  >(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  console.log(result);
  

  const handleBaseCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const handleTargetCurrencySelect = (currency: string) => {
    setSelectedTargetCurrency(currency);
  };

  function onInputValueChange(value: string | number | undefined | null) {
    setInputValue(Number(Number(value).toFixed(2)));
  }

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
  }, [selectedCurrency, selectedTargetCurrency, inputValue]);

  return (
    <>
      <div>
        <h1>Конвертер валют</h1>
        <div>
          <table>
            <thead>
              <tr>
                <td>Выбрать базовую валюту</td>
                <td>Выбрать одну или несколько целевых валют</td>
                <td>Ввести произвольную сумму</td>
                <td>Результат</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <BaseCurrency
                    handleBaseCurrencySelect={handleBaseCurrencySelect}
                  />
                </td>
                <td>
                  <TargetCurrency
                    handleTargetCurrencySelect={handleTargetCurrencySelect}
                  />
                </td>
                <td>
                  <InputNumber
                    value={inputValue}
                    style={{ width: 200 }}
                    min={0}
                    step="1"
                    onChange={onInputValueChange}
                    stringMode
                  />
                </td>
                <td>{result.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
