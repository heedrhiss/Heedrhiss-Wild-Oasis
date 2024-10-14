import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import { useCheckOut } from './useCheckout';

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkOut } = useCheckOut();

  return (
    <Button
      variation='primary'
      size='small'
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
