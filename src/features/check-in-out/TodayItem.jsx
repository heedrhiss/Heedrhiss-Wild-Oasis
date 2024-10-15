import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Flag } from '../../ui/Flag';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import CheckoutButton from './CheckoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'checked-in' ? <Tag type="blue">Checked In</Tag> : <Tag type="green">Arriving</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      
      {status === 'checked-in' ? <CheckoutButton bookingId={id}/> : <Button size="small" variation="primary" as={Link} to={`/checkin/${id}`}>Check In</Button>}
    </StyledTodayItem>
  );
}
TodayItem.propTypes = {
  activity: PropTypes.arr,
};
export default TodayItem;
