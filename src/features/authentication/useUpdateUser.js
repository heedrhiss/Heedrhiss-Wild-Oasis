import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateUser } from "../../services/apiAuth"

export function useUpdateUser(){
    const queryClient = useQueryClient()
    const {mutate: updateuser, isLoading: isUpdating} = useMutation({
        mutationFn: updateUser,
        onSuccess: ()=> {
          toast.success('User account updated successfully.')
          queryClient.invalidateQueries({
            queryKey: ['user']
          })
        },
        onError: (err)=> toast.error(err.message)
      })
    return{updateuser, isUpdating}
}