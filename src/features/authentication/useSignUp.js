import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp(){
    const {mutate: signUp, isLoading} = useMutation({
        mutationFn: signup,
        onSuccess: ()=> { 
            toast.success(`User account succesfully created, Check email for confirmation`)},
        onError: ()=> toast.error('Error creating user account')
    })
    return {signUp, isLoading}
}