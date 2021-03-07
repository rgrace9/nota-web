import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  let item;

  if (typeof window !== "undefined") {
  
    item = window.localStorage.getItem(key);
  }

  const [value, setValue] = useState(item || initialValue);

   useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
    // window.localStorage.setItem(key, value);
  }, [value, key, item]);

  return [value, setValue];
};