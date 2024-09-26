import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings(){
    const [searchParams] = useSearchParams()
    const filterValue = searchParams.get('status')
    const sortByValue = searchParams.get('sortBy') || "startDate-desc"
    const [field, direction] =sortByValue.split('-')

    const sortBy =  {field, direction}
    const filter = !filterValue || filterValue === 'all' ? null :
                    {field: 'status', value: filterValue, method: 'eq'}
    const {data: bookings, isLoading, error} = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn:()=>  getBooking({filter, sortBy}),
    })
    return{bookings, isLoading, error}
}