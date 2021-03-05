import React from "react";
import styled from "styled-components";

import { useAlert, AlertTypes } from "../components/alerts";

import { Header } from "../components/typography/header";
import { Input  } from "../components/inputs/input";
import { PrimaryButton } from "../components/buttons/button";

export function Login() {
  const {
    loading,
    username,
    password,
    handlePasswordChange,
    handleUsernameChange,
    handleSubmit
  } = useLoginForm();

  return (
    <Page>
      <LoginForm onSubmit={handleSubmit}>
        <Header className="mb-32">Log in</Header>

        <Input
          className="mb-16"
          label="Username"
          onChange={handleUsernameChange}
          value={username}
        />

        <Input
          className="mb-16"
          label="Password"
          type="password"
          onChange={handlePasswordChange}
          value={password}
        />

        <PrimaryButton loading={loading}>
          Log in
        </PrimaryButton>
      </LoginForm>
    </Page>
  );
};

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
type FormSubmitEvent = React.FormEvent<HTMLFormElement>

function useLoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const alert = useAlert();

  function handleUsernameChange(event: InputChangeEvent) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: InputChangeEvent) {
    setPassword(event.target.value);
  }

  function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    if (loading) return;

    const errors = validate(username, password);

    if (errors.length) {
      alert.show({
        type: AlertTypes.Error,
        text: errors.join(" ")
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  function validate(username: string, password: string): string[] {
    let errors: string[] = [];

    if (!username.trim().length) {
      errors.push("Empty username.");
    }

    if (!password.trim().length) {
      errors.push("Empty password.");
    }

    return errors;
  }

  return {
    loading,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit
  };
}

const Page = styled.div`
  background-color: ${({ theme }) => theme.colors.lightAccent};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 29rem;
  padding: 2rem;
  margin-top: 6.25rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.baseAccent};
  background-color: ${({ theme }) => theme.colors.lightShade};

  @media (max-width: 728px) {
    width: 90%;
  }
`;
