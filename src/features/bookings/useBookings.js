import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/globalconstants";

export function useBookings(){
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const filterValue = searchParams.get('status')
    const sortByValue = searchParams.get('sortBy') || "startDate-desc"
    const [field, direction] =sortByValue.split('-')
    const page = Number(searchParams.get('page')) || 1

    const sortBy =  {field, direction}
    const filter = !filterValue || filterValue === 'all' ? null :
                    {field: 'status', value: filterValue, method: 'eq'}
    const {data: {data: bookings, count} = {} , isLoading, error} = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn:()=>  getBookings({filter, sortBy, page}),
    })
    const pageCount = (count/PAGE_SIZE)
    if(page < pageCount){
    queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page+1],
        queryFn:()=>  getBookings({filter, sortBy, page: page+1}),
    })}
    return{bookings, isLoading, error, count}
}