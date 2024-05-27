import { useLocalStorage } from './useLocalStorage';

export const useInput = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const resetUser = () => {
    setValue(initialValue);
  };

  const userAttribute = {
    value,
    onchange: e => setValue(e.target.value),
  };

  return [value, resetUser, userAttribute];
};
