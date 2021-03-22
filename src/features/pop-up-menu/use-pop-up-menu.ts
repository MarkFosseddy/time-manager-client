import React from "react";

export function usePopUpMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return { isOpen, setIsOpen, toggle };
}
