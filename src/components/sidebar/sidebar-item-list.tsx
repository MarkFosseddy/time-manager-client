import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../../routing/routes";

type Props = {
  open: boolean;
  list: any[];
}

export function SidebarItemList({ open, list }: Props) {
  if (!open) return null;

  return (
    <ul>
      {list.map(t => (
        <ListItem key={t.id}>
          <NavLink
            to={`${routes.dashboard.taskList}/${t.id}`}
            activeStyle={{ color: "red" }}
          >
            {t.title}
          </NavLink>
        </ListItem>
      ))}
    </ul>
  );
}

const ListItem = styled.li`
  padding: .5rem;
  padding-left: 2rem;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.baseAccent};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;