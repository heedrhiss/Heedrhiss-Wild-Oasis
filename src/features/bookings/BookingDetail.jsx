import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteBooking } from "./useDeleteBooking";
import { useCheckOutQuery } from "../check-in-out/useCheckOutQuery";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading: isLooadingBooking } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOutQuery();
  const { delBooking, isDeleting } = useDeleteBooking();
  const [isDeletingState, setIsDeletingState] = useState(false);
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const isLoading = isCheckingOut || isDeleting;

  if (isLooadingBooking) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkOut(bookingId);
            }}
            disabled={isLoading}
          >
            Check Out
          </Button>
        )}
        <Button
          variation="danger"
          onClick={() => setIsDeletingState(true)}
          disabled={isLoading}
        >
          Delete Booking
        </Button>
        <Button variation="secondary" onClick={moveBack} disabled={isLoading}>
          Back
        </Button>
        {isDeletingState && (
          <Modal onClose={() => setIsDeletingState(false)}>
            <ConfirmDelete
              resource="Booking"
              disabled={isLoading}
              closeModal={() => setIsDeletingState(false)}
              onConfirm={() => {
                delBooking(bookingId, {
                  onSettled: () => navigate("/bookings"),
                });
              }}
            />
          </Modal>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
