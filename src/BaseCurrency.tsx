import React, { useEffect, useState } from "react";
import { Select } from "antd";
import CurrencyFlag from "react-currency-flags";

export default function BaseCurrency({ handleBaseCurrencySelect }) {
  const url = "https://api.coinbase.com/v2/currencies";
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const currencies = responseData.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));

        setData(currencies);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <Select style={{ width: 600 }} onChange={handleBaseCurrencySelect}>
          {data.map((currency) => (
            <Select.Option key={currency.id} value={currency.id}>
              <CurrencyFlag currency={currency.id} size="sm" />
              {` ${currency.id} - ${currency.name}`}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
