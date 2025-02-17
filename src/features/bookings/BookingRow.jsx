import PropTypes from "prop-types";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { format, isToday } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "./useDeleteBooking";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useCheckOutQuery } from "../check-in-out/useCheckOutQuery";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Button = styled.div`
  display: flex;
  justify-content: space-around;
  items-align: center;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { checkOut, isCheckingOut } = useCheckOutQuery();
  const { delBooking, isDeleting } = useDeleteBooking();
  const [isDeletingState, setIsDeletingState] = useState(false);

  const isLoading = isCheckingOut || isDeleting;

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Button>
        <button onClick={() => navigate(`/bookings/${bookingId}`)}>
          <IconContext.Provider
            value={{ color: "blue", className: "global-class-name" }}
          >
            <HiEye />
          </IconContext.Provider>
        </button>

        {status === "unconfirmed" && (
          <button
            onClick={() => navigate(`/checkin/${bookingId}`)}
            disabled={isLoading}
          >
            <IconContext.Provider
              value={{ color: "green", className: "global-class-name" }}
            >
              <HiArrowDownOnSquare />
            </IconContext.Provider>
          </button>
        )}

        {status === "checked-in" && (
          <button
            onClick={() => {
              checkOut(bookingId);
            }}
            disabled={isLoading}
          >
            <IconContext.Provider
              value={{ color: "red", className: "global-class-name" }}
            >
              <HiArrowUpOnSquare />
            </IconContext.Provider>
          </button>
        )}

        <button onClick={() => setIsDeletingState(true)} disabled={isLoading}>
          <IconContext.Provider
            value={{ color: "red", className: "global-class-name" }}
          >
            <HiTrash />
          </IconContext.Provider>
        </button>
        {isDeletingState && (
          <Modal onClose={() => setIsDeletingState(false)}>
            <ConfirmDelete
              resource="Booking"
              disabled={isLoading}
              closeModal={() => setIsDeletingState(false)}
              onConfirm={() => {
                delBooking(bookingId);
              }}
            />
          </Modal>
        )}
      </Button>
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    numNights: PropTypes.number,
    totalPrice: PropTypes.number,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"]),
    guests: PropTypes.shape({
      fullName: PropTypes.string,
      email: PropTypes.string,
    }),
    cabins: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};
export default BookingRow;
