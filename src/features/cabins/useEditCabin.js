import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createCabin } from "../../services/cabinsAPI"

export function useEditCabin(){
    const queryClient = useQueryClient()
    const {mutate: editCabin, isLoading: isEditingCabin} = useMutation({
        mutationFn: ({newCabinData, id}) => createCabin(newCabinData, id),
        onSuccess: ()=> {
          toast.success('Cabin edited successfully.')
          queryClient.invalidateQueries({
            queryKey: ['cabins']
          })
        },
        onError: (err)=> toast.error(err.message)
      })
    return{editCabin, isEditingCabin}
}