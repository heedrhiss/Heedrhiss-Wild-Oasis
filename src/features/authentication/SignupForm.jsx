import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

function SignupForm() {
  const {signUp, isLoading} = useSignUp()
  const {register, getValues, formState, handleSubmit, reset} = useForm()
  const {errors}=  formState;
  
  function onSubmit({fullName, email, phone, password}){
    signUp({fullName, email, phone, password, avatar: ""}, {onSettled: ()=> reset()})
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName', {required: 'Field is Required'})} disabled={isLoading}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register('email', {required: 'Field is Required', pattern: {value: /\S+@\S+\.\S+/, message: "Email not Valid"}})} disabled={isLoading}/>
      </FormRow>

      <FormRow label="Phone Number" error={errors?.phone?.message}>
        <Input type="text" id="phone" {...register('phone', {required: 'Field is Required', pattern: {value: /\d/, message: "Phone number not Valid"}})} disabled={isLoading}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register('password', {required: 'Field is Required', minLength: {value: 7, message: 'Minimum length of 7'}})} disabled={isLoading}/>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register('passwordConfirm', {require: 'Field is Required', validate: (value)=> value === getValues().password || 'Password not match'})} disabled={isLoading}/>
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>{!isLoading ? "Create new user" : <SpinnerMini/>}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
