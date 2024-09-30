import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useState } from "react";

import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";

import { useCheckin } from "./useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid , setConfirmPaid] = useState(false)
  const moveBack = useMoveBack();

  const {isLoading, booking} = useBooking();
  const {checkin, isCheckingIn} = useCheckin()

  const {id: bookingId,
    guests,
    totalPrice,} = booking ?? {} ;
  
    // numGuests,
    // hasBreakfast,
    // numNights,

  function handleCheckin() {
    if(!confirmPaid) return
    checkin(bookingId)
  }

  if(isLoading) return <Spinner/>

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box> <CheckBox checked={confirmPaid} onChange={()=>setConfirmPaid((confirm)=> !confirm)}>I confirm that {guests.fullName} has Paid the total of {formatCurrency(totalPrice)}</CheckBox></Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
