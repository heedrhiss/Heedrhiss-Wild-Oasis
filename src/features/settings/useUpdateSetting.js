import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateSetting } from "../../services/apiSettings"

export function useUpdateSetting(){
    const queryClient = useQueryClient()
    const {mutate: updSetting, isLoading: isUpdating} = useMutation({
        mutationFn: updateSetting,
        onSuccess: ()=> {
          toast.success('Settings updated successfully.')
          queryClient.invalidateQueries({
            queryKey: ['settings']
          })
        },
        onError: (err)=> toast.error(err.message)
      })
    return{updSetting, isUpdating}
}