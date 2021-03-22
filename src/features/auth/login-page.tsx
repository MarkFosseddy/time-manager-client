import React from "react";
import styled from "styled-components";
import { useAlert } from "../../features/alerts/use-alert";
import { AlertTypes } from "../../features/alerts/alerts-types";
import { PrimaryButton } from "../../components/buttons/button";
import { Input } from "../../components/inputs/input";
import { Page } from "../../components/layout/page";
import { Heading } from "../../components/typography/heading";
import { useLogin } from "./use-login";

export function LoginPage() {
  const { isLoading, fields, handleFieldChange, handleSubmit } = useLoginForm();

  return (
    <LoginPageWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <Heading className="mb-32">Log in</Heading>

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
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled(Page)`
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

  const { login, isLoading, error: loginError } = useLogin();
  const alert = useAlert();

  React.useEffect(() => {
    if (loginError) {
      alert.show({ type: AlertTypes.Error, text: loginError });
    }
  }, [loginError]);

  function handleFieldChange(e: InputChangeEvent) {
    setFields(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e: FormSubmitEvent) {
    e.preventDefault();
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
