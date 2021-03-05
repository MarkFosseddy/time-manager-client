import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeContext } from "styled-components";

import { Alert, AlertTypes } from "./alerts-types";

import { useStoreDispatch, useStoreSelector } from "../../store";
import { alertsActions, alertsSelectors } from "./alerts-slice";

import { ErrorAlertIcon } from "../../components/icons/error-alert";
import { Paragraph } from "../../components/typography/paragraph";
import { Title } from "../../components/typography/title";

type AlertsContainerProps = React.HTMLAttributes<HTMLUListElement>

export function AlertsContainer(props: AlertsContainerProps) {
  const alerts = useStoreSelector(alertsSelectors.selectAll);

  if (!alerts.length) return null;

  return (
    ReactDOM.createPortal(
      <AlertsContainerWrapper {...props}>
        {alerts.map(a => <AlertFactory key={a.id} item={a} />)}
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
  list-style: none;

  & > li {
    margin-bottom: .5rem;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

type AlertProps = { item: Alert; }
type AlertFactoryProps = AlertProps

function AlertFactory({ item }: AlertFactoryProps) {
  if (item.type === AlertTypes.Error) {
    return <AlertError item={item} />;
  }

  return null;
}

type AlertErrorProps = AlertProps

function AlertError({ item }: AlertErrorProps) {
  const theme = React.useContext(ThemeContext);

  return (
    <AlertBase
      title="Error"
      id={item.id}
      text={item.text}
      color={theme.colors.alerts.error}
      icon={<ErrorAlertIcon />}
    />
  );
}

type AlertBaseProps = {
  id: string;
  icon: JSX.Element;
  title: string;
  text: string;
  color: string;
};

function AlertBase({ icon, title, text, color, id }: AlertBaseProps) {
  const dispatch = useStoreDispatch();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(alertsActions.delete(id));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <AlertWrapper>
      <AlertColorMark color={color} />

      <AlertBodyWrapper>
        <AlertIconWrapper>
          {icon}
        </AlertIconWrapper>

        <AlertContentWrapper>
          <Title>{title}</Title>
          <Paragraph>{text}</Paragraph>
        </AlertContentWrapper>
      </AlertBodyWrapper>

      <AlertButton onClick={() => dispatch(alertsActions.delete(id))}>
        Close
      </AlertButton>
    </AlertWrapper>
  );
}

const AlertWrapper = styled.li`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 0.125rem 0.188rem ${({ theme }) => theme.colors.shadow};
`;

const AlertColorMark = styled.div<{ color: string }>`
  width: 10px;
  background-color: ${({ color }) => color};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
`;

const AlertBodyWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: .8rem 4rem .8rem 1rem;
  background-color: ${({ theme }) => theme.colors.lightShade};
  border: 1px solid ${({ theme }) => theme.colors.baseAccent};
`;

const AlertIconWrapper = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertContentWrapper = styled.div`
  width: 320px;
`;

const AlertButton = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.lightShade};
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.baseAccent};;
  border-left: none;
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;
  font-size: 1rem;
`;
