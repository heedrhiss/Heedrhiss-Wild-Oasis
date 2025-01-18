import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useCheckOutQuery } from "./useCheckOutQuery";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkOut } = useCheckOutQuery();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}
CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};
export default CheckoutButton;
