import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useStoreSelector } from "../../store";
import { AlertFactory } from "./alert-factory";
import { alertsSelectors } from "./alerts-slice";

type AlertsContainerProps = React.HTMLAttributes<HTMLUListElement>

export function AlertsContainer(props: AlertsContainerProps) {
  const alerts = useStoreSelector(alertsSelectors.selectAll);

  if (!alerts.length) return null;

  return (
    ReactDOM.createPortal(
      <AlertsContainerWrapper {...props}>
        {alerts.map(a => <AlertFactory key={a.id} data={a} />)}
      </AlertsContainerWrapper>,
      document.body
    )
  );
}

const AlertsContainerWrapper = styled.ul`
  position: fixed;
  top: 0;
  padding-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > li {
    margin-bottom: .5rem;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;
