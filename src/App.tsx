import React, { useEffect, useState } from "react";
import BaseCurrency from "./BaseCurrency";
import TargetCurrency from "./TargetCurrency";
import { InputNumber } from "antd";

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [result, setResult] = useState(0);
  console.log(result);

  const handleBaseCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
  }

  const handleTargetCurrencySelect = (currency) => {
    setSelectedTargetCurrency(currency);
  };

  function onInputValueChange(value) {
    setInputValue(Number(value).toFixed(2));
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
            responseData.data.rates[selectedTargetCurrency] * inputValue
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
                  <InputNumber<string>
                    value={inputValue}
                    style={{ width: 200 }}
                    min="0"
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
}

export default App;
