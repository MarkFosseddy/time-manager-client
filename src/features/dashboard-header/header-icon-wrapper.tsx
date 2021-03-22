import styled from "styled-components";

export const HeaderIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: { colors } }) => colors.lightShade + colors.alpha[20]};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;

  :hover {
    background-color: ${({ theme: { colors } }) => colors.lightShade + colors.alpha[40]};
  }
`;

