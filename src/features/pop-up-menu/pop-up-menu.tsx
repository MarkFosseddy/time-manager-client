import React from "react";
import styled from "styled-components";

export type PopUpMenuProps = React.PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}> 

export function PopUpMenu({ isOpen, setIsOpen, children }: PopUpMenuProps) {
  const wrapperRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    function closeMenu(e: MouseEvent) {
      if (!wrapperRef.current || !e.target) return;

      const clickedInsideMenu =
        e.target === wrapperRef.current ||
        wrapperRef.current.contains(e.target as Node);

      if (!clickedInsideMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <Wrapper ref={wrapperRef}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.ul`
  min-width: 212px;
  max-width: 212px;
  padding: .5rem 0;
  border: 1px solid ${({ theme }) => theme.colors.baseAccent};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.lightShade};
  position: absolute;
  right: 0;
  top: calc(32px + 4px);
`;
