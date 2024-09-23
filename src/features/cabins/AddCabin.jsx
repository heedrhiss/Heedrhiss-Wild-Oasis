import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
    <Button onClick={()=>setShowForm(true)}>Add New Cabin</Button>
    {showForm &&
    <Modal onClose={()=>setShowForm(false)}>
    <CreateCabinForm onClose={()=>setShowForm(false)}/>
    </Modal>}
    </>
  );
}

{/* <Modal>
<Modal.Toggle opens='new-cabin'>
  <Button>Add new cabin</Button>
</Modal.Toggle>
<Modal.Window name='new-cabin'>
  <CreateCabinForm />
</Modal.Window>
</Modal> */}

export default AddCabin;
