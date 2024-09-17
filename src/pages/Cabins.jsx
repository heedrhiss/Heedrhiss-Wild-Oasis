import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { useEffect } from "react";


function Cabins() {
  // useEffect(function(){
  //   getCabins().then(data=> console.log(data))},[])


  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <div>Filter / Sort</div>
    </Row>
    <Row><CabinTable/></Row>
    </>
  );
}

export default Cabins;
