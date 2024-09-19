import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import {Textarea} from "../../ui/Textarea";
import { createCabin } from "../../services/cabinsAPI";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient()
  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const {errors} = formState
  console.log(errors)
  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess: ()=> {
      toast.success('New cabin added successfully.')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      reset()
    },
    onError: (err)=> toast.error(err.message)
  } )

    
  function onSubmit(data){
    mutate(data)
  }
  function onError(errors){
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register('name',
        {required: 'Name Field is required.'})} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register('maxCapacity',
        {required: "A number is required.",
        min: {
          value: 1,
          message: "Minimum of 1 guest required."
        },
        max: {
          value: 10,
          message: "Guests can not be more than 10."
        }
      })} />
       {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regPrice" {...register('regPrice', {required: "Price field is required."})} />
        {errors?.regPrice?.message && <Error>{errors.regPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register('discount',{
          validate: (value)=> value < getValues().regPrice || 'Discount can not be greater than regular price'
        })} />
         {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" {...register('description',{required: 'Desription field is required.'})} />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Clear
        </Button>
        <Button type="submit" disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
