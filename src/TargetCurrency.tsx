import React, { useEffect, useState } from "react";
import { Select } from "antd";

interface TargetCurrencyProps {
  handleTargetCurrencySelect: (currency: string) => void;
}

interface Option {
  value: string;
  label: string;
}

const TargetCurrency: React.FC<TargetCurrencyProps> = ({
  handleTargetCurrencySelect,
}) => {
  const [data, setData] = useState<string[]>([]);

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
  }, []);

  return (
    <Select
      style={{ width: 100}}
      onChange={handleTargetCurrencySelect}
      options={
        data.length > 0 ? 
          data.map((currency) => ({
            value: currency,
            label: currency,
          })) as Option[]
        : []
      }
      disabled={data.length === 0}
    />
  );
};

export default TargetCurrency;
