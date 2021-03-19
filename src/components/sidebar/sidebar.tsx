import React from "react";
import styled from "styled-components";
import { tasksSelectors } from "../../features/tasks/tasks-slice";
import { useStoreSelector } from "../../store";
import { SidebarItem } from "./sidebar-item";
import { sidebarSelectors } from "./sidebar-slice";

export function Sidebar() {
  const isOpen = useStoreSelector(sidebarSelectors.selectIsOpen);
  const tasks = useStoreSelector(tasksSelectors.selectAll);

  if (!isOpen) return null;

  return (
    <SidebarWrapper>
      <SidebarItem
        title="Tasks"
        list={tasks}
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
