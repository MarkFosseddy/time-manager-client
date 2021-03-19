import React from "react";
import styled from "styled-components";
import { useStoreSelector } from "../../store";
import { SidebarItem } from "./sidebar-item";
import { sidebarSelectors } from "./sidebar-slice";

export function Sidebar() {
  const isOpen = useStoreSelector(sidebarSelectors.selectIsOpen);

  if (!isOpen) return null;

  return (
    <SidebarWrapper>
      <SidebarItem
        title="Tasks"
        list={[]}
        onAddClick={() => console.log("Add new task clicked")}
      />

    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.aside`
  width: 280px;
  background-color: ${({ theme }) => theme.colors.lightAccent};
  padding: 2rem .5rem;
`;
