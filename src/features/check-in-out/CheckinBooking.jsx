import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useEffect, useState } from "react";

import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";
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
  const [addBreakfast , setAddBreakfast] = useState(false)
  const moveBack = useMoveBack();
  const navigate = useNavigate()

  const {isLoading: isLooadingBooking, booking} = useBooking();
  const {checkIn, isCheckingIn} = useCheckin()
  const {settings, isLoading} = useSettings()

  const {id: bookingId,
    guests,
    numNights,
    numGuests,
    hasBreakfast,
    totalPrice,} = booking ?? {} ;
  
  useEffect(()=> setConfirmPaid(booking?.isPaid ?? false) , [booking])
  const addBreakfastPrice = settings?.breakfastPrice * numGuests * numNights

  function handleCheckin() {
    if(!confirmPaid) return
    if(addBreakfast){
      checkIn({bookingId, breakfast: {
        hasBreakfast: true,
        extrasPrice: addBreakfastPrice,
        totalPrice: totalPrice + addBreakfastPrice,
      }})
    }
    else{
      checkIn({bookingId, breakfast: {}})
      navigate('/')
    }
  }

  if(isLoading || isLooadingBooking) return <Spinner/>

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (<Box> <Checkbox checked={addBreakfast}
      onChange={()=>{setAddBreakfast(!addBreakfast)
        setConfirmPaid(!confirmPaid)}}>Do you want to add Breakfast for {formatCurrency(addBreakfastPrice)}</Checkbox></Box>)}

      <Box> <Checkbox checked={confirmPaid} disabled={confirmPaid}
      onChange={()=>setConfirmPaid(true)}>I confirm that {guests.fullName} has Paid the total of {!addBreakfast ? formatCurrency(totalPrice) : 
      `${formatCurrency(addBreakfastPrice + totalPrice)} + ${formatCurrency(addBreakfastPrice)} for breakfast`}</Checkbox></Box>

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
