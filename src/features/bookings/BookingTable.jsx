import BookingRow from './BookingRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useBookings } from './useBookings';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource='bookings' />;

  return (
  <Table columns='0.6fr 2fr 2.4fr 1.1fr 1fr 4.5rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count}/>
        </Table.Footer>
        </Table>
  );
}

export default BookingTable;
