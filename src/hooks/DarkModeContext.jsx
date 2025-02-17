import { createContext, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useLocalStorageState} from "./useLocalStorageState"

const DarkModeContext = createContext()

function DarkModeProvider({children}){
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-schema: dark)').matches
    , 'darkMode');
    const toggleDarkMode = () => {
      setIsDarkMode((isDarkMode) => !isDarkMode);
    };
    useEffect(function(){
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    }, [isDarkMode])
  return (
  <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
    {children}
  </DarkModeContext.Provider>
)}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}
DarkModeProvider.propTypes = {
    children: PropTypes.node,
};
export {DarkModeProvider, useDarkMode}
