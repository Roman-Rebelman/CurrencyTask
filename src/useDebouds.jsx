import { useEffect, useState } from "react";

// todo: В этом файле куда-то уехали отступы.

// todo: Чтобы понять, какого типа должен быть value, мне пришлось "протрейсить" код аж до `AddTargetCurProps.debouncedSearch`.
//       Типизированный код гораздо проще читать и он избавляет от ошибок вида "все упало в проде в субботу вечером".
function useDebounce(value, delay) {

    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(
      () => {
        const t = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        return () => {
          clearTimeout(t);
        };
      },
      [value, delay] 
    );
    return debouncedValue;
  }
  
  export default useDebounce;
