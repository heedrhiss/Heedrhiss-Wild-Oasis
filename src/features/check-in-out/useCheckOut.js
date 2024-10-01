import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut(){
    const queryClient = useQueryClient()
    
    const {mutate: checkOut, isLoading: isCheckingOut} = useMutation({
        mutationKey: ['booking'],
        mutationFn: (bookingId)=> updateBooking(bookingId, {
            status: 'checked-out'
        }),
        onSuccess:(data)=> {
            toast.success(`Booking #${data.id} Successfully checked Out.`)
            queryClient.invalidateQueries({active: true})
    },
        onError:()=> toast.error('Error checking Out Guest'),
        
    })
    return{checkOut, isCheckingOut}
}