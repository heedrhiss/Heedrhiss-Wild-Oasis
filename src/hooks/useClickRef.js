import { useEffect, useRef } from "react"

export function useClickRef(eventHandler){
    const ref = useRef()
    useEffect(function(){
      function handleClick(e){
        if(ref.current && !ref.current.contains(e.target)){
        eventHandler()
      }}
     
      document.addEventListener('click', handleClick, true);
      
      return ()=> document.removeEventListener('click', handleClick, true)
    },[eventHandler])

    return ref
}