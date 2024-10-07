import { useState } from "react";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini"

function LoginForm() {
  const [email, setEmail] = useState("heedrhiss@oasis.com");
  const [password, setPassword] = useState("123456");
  const {logIn, isLogingIn} = useLogin()

  function handleSubmit(e) {
    e.preventDefault()
    if(!email || !password) return
    logIn({email, password}, {
      onError: ()=> {setEmail("") 
      setPassword("")}
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          disabled={isLogingIn}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLogingIn}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large" disabled={isLogingIn}>
          {isLogingIn ? <SpinnerMini/> : "Login"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
