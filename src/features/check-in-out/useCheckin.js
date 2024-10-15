import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin(){
    const queryClient = useQueryClient()
    
    const {mutate: checkIn, isLoading: isCheckingIn} = useMutation({
        mutationKey: ['booking'],
        mutationFn: ({bookingId, breakfast})=> updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true,
            ...breakfast
        }),
        onSuccess:(data)=> {
            toast.success(`Booking #${data.id} Successfully checked In.`)
            queryClient.invalidateQueries({active: true})
    },
        onError:()=> toast.error('Error checking In Guest'),
        
    })
    return{checkIn, isCheckingIn}
}