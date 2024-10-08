import { useState } from 'react';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';


function UpdateUserDataForm() {
  
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const {updateuser, isUpdating} = useUpdateUser()

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e){
    e.preventDefault()
    updateuser({fullName, avatar})
    setFullName("");
    setAvatar(null);

  }
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }
console.log(avatar)
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          id='fullName'
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          disabled={isUpdating}
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
          // We should also validate that it's actually an image, but never mind
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} disabled={isUpdating} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
