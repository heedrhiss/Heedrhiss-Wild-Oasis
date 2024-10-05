import PropTypes from "prop-types";
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectionRoute({children}) {
    const navigate = useNavigate();
    const {isAuth, isLoading} = useUser()
    
    useEffect(function(){
        if(!isLoading && !isAuth) navigate('/login')
    },[isLoading, isAuth, navigate])

    if(isLoading) return <Spinner/>

    if(isAuth) return children
}

ProtectionRoute.propTypes = {
    children: PropTypes.node,
  }
export default ProtectionRoute
