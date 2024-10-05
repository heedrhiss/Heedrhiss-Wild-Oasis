import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {mutate: logOut, isLoading} = useMutation({
        mutationKey: ['user'],
        mutationFn: logout,
        onSuccess: ()=> {
            navigate('/login', {replace: true})
            toast.success('User account successfully Logout.')
            queryClient.removeQueries()
        },
        onError: ()=> toast.error('Error Login Out User account.')
    })
    return {logOut, isLoading}
}