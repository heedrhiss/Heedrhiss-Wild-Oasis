import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){
    const navigate = useNavigate()
    const {mutate: logIn, isLoading: isLogingIn} = useMutation({
        mutationFn: login,
        mutationKey: ['user'],
        onSuccess: (data)=> {
            toast.success(`${data.user.email} successfully logged In.`)
            navigate("/")
        },
        onError: ()=> toast.error("Failed to Login, Confirm Email and Password")
    })
    return {logIn, isLogingIn}
}