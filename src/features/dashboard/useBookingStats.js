import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings';
import { subDays } from 'date-fns';

export function useBookingStats(){
    const [searchParams] = useSearchParams();
    const stats = searchParams.get('last') ? Number(searchParams.get('last')) : 7
    const numDays = subDays(new Date(), stats).toISOString();
    const {data: bookings, isLoading} = useQuery({
        queryFn: ()=> getStaysAfterDate(numDays),
        queryKey: ['bookings', `last-${stats}`]
    })

    return{bookings, isLoading, stats}
}