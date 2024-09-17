import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from '../services/cabinsAPI'
import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";


function Cabins() {
  // useEffect(function(){
  //   getCabins().then(data=> console.log(data))},[])

    const {isLoading, data: cabins, error} =  useQuery({
      queryKey: ['cabin'],
      queryFn: getCabins
      })

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
