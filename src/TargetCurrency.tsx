import React, { useEffect, useState } from "react";
import { Select } from "antd";

interface TargetCurrencyProps {
  handleTargetCurrencySelect: (currency: string) => void;
}

const TargetCurrency: React.FC<TargetCurrencyProps> = ({
  handleTargetCurrencySelect,
}) => {
  const [data, setData] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coinbase.com/v2/exchange-rates?currency=USD"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const currencies: string[] = Object.keys(responseData.data.rates);
        setData(currencies);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [data]);

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
};

export default TargetCurrency;
