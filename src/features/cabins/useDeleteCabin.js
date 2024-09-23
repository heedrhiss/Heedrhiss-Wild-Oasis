import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabin } from "../../services/cabinsAPI"
import toast from "react-hot-toast"

export function useDeleteCabin(){
    const queryClient = useQueryClient()

  const {mutate: delCabin, isLoading: isDeleting} = useMutation({
    mutationFn: deleteCabin,
    onSuccess: ()=> {
      toast.success('Cabin deleted successfully')
      queryClient.invalidateQueries({
      queryKey: ['cabins'],
    })},
    onError: (err)=> {
      err = err.message
      toast.error(err)
    }
  })
  return { delCabin, isDeleting}
}