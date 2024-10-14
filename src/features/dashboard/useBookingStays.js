import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings';
import { subDays } from 'date-fns';

export function useBookingStys(){
    const [searchParams] = useSearchParams();
    const stats = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))
    const numDays = subDays(new Date(), stats).toISOString();
    const {data: stays, isLoading} = useQuery({
        queryFn: ()=> getStaysAfterDate(numDays),
        queryKey: ['stays', `last-${stats}`]
    })
    const confirmedStays = stays?.filter(stay => stay.status === 'checked-in' || stay.status === 'checked-out')

    return{stays, isLoading, confirmedStays}
}