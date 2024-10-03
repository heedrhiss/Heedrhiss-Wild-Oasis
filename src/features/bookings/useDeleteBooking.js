import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteBooking } from "../../services/apiBookings"

export function useDeleteBooking(){
    const queryClient = useQueryClient()

  const {mutate: delBooking, isLoading: isDeleting} = useMutation({
    mutationFn: deleteBooking,
    onSuccess: ()=> {
      toast.success('Booking deleted successfully')
      queryClient.invalidateQueries({
      queryKey: ['bookings'],
    })},
    onError: (err)=> {
      err = err.message
      toast.error(err)
    }
  })
  return { delBooking, isDeleting}
}