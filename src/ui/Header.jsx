import { HiArrowRightOnRectangle, HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import styled from "styled-components";
import ButtonIcon from './ButtonIcon'
import { useLogout } from "../features/authentication/useLogout";
import UserAvatar from "../features/authentication/UserAvatar";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/DarkModeContext";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.3rem;
  justify-content: flex-end;
  align-items: center;
`;

function Header() {
 const {isDarkMode, toggleDarkMode} = useDarkMode()
  const navigate = useNavigate()
  const {isLoading, logOut} = useLogout()
  return <StyledHeader>
    <UserAvatar/>
    <ButtonIcon onClick={()=>navigate('/account')}><HiOutlineUser/></ButtonIcon>
    <ButtonIcon> <button onClick={toggleDarkMode}>
    {isDarkMode ? <HiOutlineMoon/> : <HiOutlineSun/>} 
      </button></ButtonIcon>
    <ButtonIcon disabled={isLoading} onClick={logOut}><HiArrowRightOnRectangle/></ButtonIcon>
  </StyledHeader>;
}

export default Header;
