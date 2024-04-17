import React, { useState } from "react";
import BaseCurrency from "./BaseCurrency";
import { InputNumber, Button } from "antd";
import AddTargetCur from "./AddTargetCur";

const App: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const [addTargetCur, setAddTargetCur] = useState([{ id: 1 }]);

  const handleBaseCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const onInputValueChange = (value: string | number | undefined | null) => {
    setInputValue(Number(Number(value).toFixed(2)));
  };

  const handleAddCurrency = () => {
    setAddTargetCur([...addTargetCur, { id: addTargetCur.length + 1 }]);
  };

  const handleResetCurrencies = () => {
    setAddTargetCur([{ id: 1 }]);
  };

  return (
    <div className="baseDiv">
        <h1>Конвертер валют</h1>
        <div>Выберите базовую валюту</div>
        <p>
          <BaseCurrency handleBaseCurrencySelect={handleBaseCurrencySelect} />
        </p>
        <p>Введите произвольную сумму</p>
        <p>
          <InputNumber
            value={inputValue}
            style={{ width: 200 }}
            min={0}
            step="1"
            onChange={onInputValueChange}
            stringMode
          />
        </p>
        <p>Выберите одну или несколько целевых валют</p>
        <div className="allTargetBlock">
            {addTargetCur.map((item) => (
              <AddTargetCur
                inputValue={inputValue}
                selectedCurrency={selectedCurrency}
                key={item.id}
              />
            ))}
        </div>
        <div className="buttons">
        <Button onClick={handleAddCurrency}>Добавить целевую валюту</Button>
        <Button onClick={handleResetCurrencies}>Сбросить выбранные валюты</Button>
        </div>
    </div>
  );
};

export default App;
