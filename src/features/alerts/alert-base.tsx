import React from "react";
import styled from "styled-components";
import { Paragraph } from "../../components/typography/paragraph";
import { Title } from "../../components/typography/title";
import { useStoreDispatch } from "../../store";
import { alertsActions } from "./alerts-slice";

type AlertBaseProps = {
  id: string;
  icon: JSX.Element;
  title: string;
  text: string;
  color: string;
};

export function AlertBase({ icon, title, text, color, id }: AlertBaseProps) {
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
