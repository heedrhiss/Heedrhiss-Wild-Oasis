import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Button from "../ui/Button"
import Row from "../ui/Row";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";


function Cabins() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <div>Filter / Sort</div>
    </Row>
    <Row>
      <CabinTable/>
      <Button onClick={()=>setShowForm(!showForm)}>{showForm ? "Close Form" : "Add New Cabin"}</Button>
      {showForm && <CreateCabinForm />}
    </Row>
    </>
  );
}

export default Cabins;
