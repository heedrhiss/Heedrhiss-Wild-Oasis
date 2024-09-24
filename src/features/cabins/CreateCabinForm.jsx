import styled from "styled-components";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import {Textarea} from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

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

function CreateCabinForm({cabinToEdit={}, onClose}) {
  const {id: editId, ...editValues} = cabinToEdit
  const isEditing = Boolean(editId);
  const {register, handleSubmit, reset, getValues, formState} = useForm({defaultValues: isEditing ? editValues : {}});
  const {errors} = formState
  const {addCabin, isCreatingCabin} = useCreateCabin()
  const {editCabin, isEditingCabin} = useEditCabin()
  

  const isLoading = isCreatingCabin || isEditingCabin

  function onSubmit(data){
    const image = typeof data.image === "string" ? data.image : data.image[0]
    if(isEditing){
      editCabin({newCabinData: {...data, image:image}, id: editId}, {
        onSuccess: ()=> {reset()
        onClose?.()}
      })}
      else addCabin({...data, image: image}, {
        onSuccess: ()=> {
          reset()
          onClose?.()}
      })
    }

  function onError(){}

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onClose ? 'modal': 'regular'} >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" disabled={isLoading} {...register('name',
        {required: 'Name Field is required.'})} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" disabled={isLoading} {...register('maxCapacity',
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
        <Input type="number" id="regPrice" disabled={isLoading} {...register('regPrice', {required: "Price field is required."})} />
        {errors?.regPrice?.message && <Error>{errors.regPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" disabled={isLoading} defaultValue={0} {...register('discount',{
          validate: (value)=> value < getValues().regPrice || 'Discount can not be greater than regular price'
        })} />
         {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" disabled={isLoading} defaultValue="" {...register('description',{required: 'Desription field is required.'})} />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register('image',
        {required: isEditing ? false : 'Image file is required.'} )} />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={()=> onClose?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>{isEditing ? "Edit Cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onClose: PropTypes.func, 
};
