import styled from 'styled-components';

import { useBookingStats } from './useBookingStats';
import { useBookingStys } from './useBookingStays';
import { useCabins } from '../cabins/useCabins';

import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import Today from '../check-in-out/TodayActivity';


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {
  const { isLoading: isLoading1, bookings, stats } = useBookingStats();
  const { isLoading: isLoading2, confirmedStays } = useBookingStys();
  const { isLoading: isLoading3, cabins } = useCabins()
  const isLoading = isLoading1 || isLoading2 || isLoading3

  if (isLoading ) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} numDays={stats} confirmedStays={confirmedStays} cabinCount={cabins.length}/>
      <Today/>
      <DurationChart confirmData={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={stats}/>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
