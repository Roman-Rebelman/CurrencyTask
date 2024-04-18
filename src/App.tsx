import React, { useState } from "react";
import BaseCurrency from "./BaseCurrency";
import { InputNumber, Button } from "antd";
import AddTargetCur from "./AddTargetCur";

// fixme: Сборка падает с ошибкой `Could not find a declaration file for module './useDebouds'. 'CurrencyTask/src/useDebouds.jsx' implicitly has an 'any' type.`
//        Добавил `useDebouds.d.ts`.
import useDebounce from "./useDebouds";

// fixme: При загрузке страницы зачем-то делается делается запрос к API `/v2/exchange-rates?currency=USD`.
const App: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const [addTargetCur, setAddTargetCur] = useState([{ id: 1 }]);
  const debouncedSearch = useDebounce(inputValue, 300);

  const handleBaseCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const onInputValueChange = (value: string | number | undefined | null) => {
    // fixme: При изменении суммы к API делается N запросов, где N - количество непустых целевых валют.
    // todo: Кол-во знаков после запятой задано как "магическое число". Это было бы не критично, но оно задается в двух разных местах.
    //       В целом, форматирование сумм можно было бы вынести в отдельную функцию.
    setInputValue(Number(Number(value).toFixed(2)));
  };

  const handleAddCurrency = () => {
    // fixme: При добавлении целевой валюты зачем-то делается делается запрос к API `/v2/exchange-rates?currency=USD`.
    setAddTargetCur([...addTargetCur, { id: addTargetCur.length + 1 }]);
  };

  const handleResetCurrencies = () => {
    // todo: При сбросе первая валюта не сбрасывается на пустое значение, как при первоначальной загрузке страницы.
    setAddTargetCur([{ id: 1 }]);
  };

  return (
    <div className="baseDiv">
      <h1>Конвертер валют</h1>
      <div>Выберите базовую валюту</div>
      <div>
        <BaseCurrency handleBaseCurrencySelect={handleBaseCurrencySelect} />
      </div>
      <p>Введите произвольную сумму</p>
      <div>
        <InputNumber
          value={inputValue}
          style={{ width: 200 }}
          min={0}
          step="1"
          onChange={onInputValueChange}
          stringMode
        />
      </div>
      <p>Выберите одну или несколько целевых валют</p>
      <div className="allTargetBlock">
        {addTargetCur.map((item) => (
          <AddTargetCur
            debouncedSearch={debouncedSearch}
            selectedCurrency={selectedCurrency}
            key={item.id}
          />
        ))}
      </div>
      <div className="buttons">
        <Button onClick={handleAddCurrency}>Добавить целевую валюту</Button>
        <Button onClick={handleResetCurrencies}>
          Сбросить выбранные валюты
        </Button>
      </div>
    </div>
  );
};

export default App;
