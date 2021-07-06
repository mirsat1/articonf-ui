import { useState } from "react";

function useToggler(defaultOnValue = false) {
  const [isToggledOn, setIsToggledOn] = useState(defaultOnValue);

  function toggle() {
    setIsToggledOn((prev) => !prev);
  }

  function toggleFalse() {
    setIsToggledOn(false);
  }

  function toggleTrue() {
    setIsToggledOn(true);
  }

  return [isToggledOn, toggle, toggleFalse, toggleTrue];
}

export default useToggler;
