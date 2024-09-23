import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCabin } from "../../services/cabinsAPI"
import toast from "react-hot-toast";


export function useCreateCabin(){
const queryClient = useQueryClient();

const {mutate: addCabin, isLoading: isCreatingCabin} = useMutation({
    mutationFn: createCabin,
    onSuccess: ()=> {
      toast.success('New cabin added successfully.')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: (err)=> toast.error(err.message)
  } )
  return {addCabin, isCreatingCabin}
}