import { useState } from "react";

function useToggler(defaultOnValue = false) {
  const [isToggledOn, setIsToggledOn] = useState(defaultOnValue);

  function toggle() {
    setIsToggledOn((prev) => !prev);
  }

  function toggleFalse() {
    setIsToggledOn(false);
  }

  return [isToggledOn, toggle, toggleFalse];
}

export default useToggler;
