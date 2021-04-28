import { useState } from "react";

export const useListBox = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: val => {
        setValue(val);
      }
    }
  };
};