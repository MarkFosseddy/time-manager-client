import React from "react";
import styled from "styled-components";
import { SidebarItem } from "./sidebar-item";

type Props = {
  open?: boolean;
};

const LIST = [
  {
    id: 1,
    title: "Today",
    tasks: [
      {
        id: 1,
        text: "Wash dishes",
        completed: false
      }
    ]
  }
];

export function Sidebar({ open = true }: Props) {
  if (!open) return null;

  return (
    <SidebarWrapper>
      <SidebarItem
        className="mb-16"
        title="Tasks"
        onAddClick={() => console.log("Tasks add clicked")}
        expandableList={LIST}
      />

      <SidebarItem
        title="Boards"
        onAddClick={() => console.log("Boards add clicked")}
        expandableList={LIST}
      />
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.aside`
  width: 305px;
  background-color: ${({ theme }) => theme.colors.lightAccent};
  padding: 40px 8px 0 47px;
`;
