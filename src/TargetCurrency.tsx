import React, { useEffect, useState } from "react";
import { Select } from "antd";

export default function TargetCurrency({ handleTargetCurrencySelect }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=USD");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const currencies = Object.keys(responseData.data.rates);
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
        <Select
          style={{ width: 120 }}
          onChange={handleTargetCurrencySelect}
          options={data.map((currency) => ({
            value: currency,
            label: currency,
          }))}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
