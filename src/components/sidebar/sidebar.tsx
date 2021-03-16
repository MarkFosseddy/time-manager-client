import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../../routing/routes";

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
      <div>
        <SidebarItemHeader>
          <Flex>
            <div className="mr-8">{">"}</div>
            <div>Tasks</div>
          </Flex>
          <div>+</div>
        </SidebarItemHeader>
        <ul>
          {LIST.map(l => (
            <li key={l.id}>
              <NavLink
                to={`${routes.dashboard.taskList}/${l.id}`}
                activeStyle={{ color: "red" }}
              >
                {l.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.aside`
  width: 280px;
  background-color: ${({ theme }) => theme.colors.lightAccent};
  padding: 40px 8px;
`;

const SidebarItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

