import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin(){
    const queryClient = useQueryClient()
    
    const {mutate: checkin, isLoading: isCheckingIn} = useMutation({
        mutationKey: ['booking'],
        mutationFn: (bookingId)=> updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true
        }),
        onSuccess:()=> {
            toast.success('Guest Successfully checked In.')
            queryClient.invalidateQueries({active: true})
    },
        onError: toast.error('Error checking In Guest'),
        
    })
    return{checkin, isCheckingIn}
}