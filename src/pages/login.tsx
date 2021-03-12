import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { AlertTypes, useAlert } from "../components/alerts";
import { PrimaryButton } from "../components/buttons/button";
import { Input } from "../components/inputs/input";
import { Header } from "../components/typography/header";
import { useLogin } from "../features/user";
import { routes } from "../routing/routes";

export function Login() {
  const { isLoading, fields, handleFieldChange, handleSubmit } = useLoginForm();

  return (
    <Page>
      <LoginForm onSubmit={handleSubmit}>
        <Header className="mb-32">Log in</Header>

        <Input
          className="mb-16"
          label="Username"
          name="username"
          onChange={handleFieldChange}
          value={fields.username}
        />

        <Input
          className="mb-16"
          label="Password"
          type="password"
          name="password"
          onChange={handleFieldChange}
          value={fields.password}
        />

        <PrimaryButton loading={isLoading}>
          Log in
        </PrimaryButton>
      </LoginForm>
    </Page>
  );
};

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

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
type FormSubmitEvent = React.FormEvent<HTMLFormElement>

function useLoginForm() {
  const [fields, setFields] = React.useState({ username: "", password: "" });

  const { login, error: loginError, isLoading, isLoggedIn } = useLogin();
  const alert = useAlert();
  const history = useHistory();

  React.useEffect(() => {
    if (loginError) {
      alert.show({ type: AlertTypes.Error, text: loginError });
    }
  }, [loginError]);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.replace(routes.home);
    }
  }, [isLoggedIn]);

  function handleFieldChange(event: InputChangeEvent) {
    setFields(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    if (isLoading) return;

    const { username, password } = fields;
    const errors = validate(username, password);

    if (errors.length) {
      alert.show({ type: AlertTypes.Error, text: errors.join(" ") });
      return;
    }

    await login(username, password);
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

  return { isLoading, fields, handleFieldChange, handleSubmit };
}
