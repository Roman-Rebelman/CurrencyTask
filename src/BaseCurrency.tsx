import React, { useEffect, useState } from "react";
import { Select } from "antd";
import CurrencyFlag from "react-currency-flags";

interface Currency {
  id: string;
  name: string;
}

interface BaseCurrencyProps {
  handleBaseCurrencySelect: (currency: string) => void;
}

const BaseCurrency: React.FC<BaseCurrencyProps> = ({
  handleBaseCurrencySelect,
}) => {
  const url = "https://api.coinbase.com/v2/currencies";
  const [data, setData] = useState<Currency[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        const currencies: Currency[] = responseData.data.map(
          (item: Currency) => ({
            id: item.id,
            name: item.name,
          })
        );

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
};

export default BaseCurrency;
