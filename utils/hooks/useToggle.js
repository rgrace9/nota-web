// import { useState } from "react";

// const useToggle = (initialState = false) => {
//   const [isToggled, setToggle] = useState(initialState);
//   const toggle = () => setToggle((prevState) => !prevState);
//   // return [isToggled, toggle];
//   return { isToggled, setToggle, toggle };
// };

// export default useToggle;

import React from 'react';
export default function useToggle(initialValue = false, cb = () => {}) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle];
}