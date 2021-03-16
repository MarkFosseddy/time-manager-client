import React from "react";
import styled from "styled-components";

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
          {t.title}
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