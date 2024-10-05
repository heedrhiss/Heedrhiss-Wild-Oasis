import { HiArrowRightOnRectangle } from "react-icons/hi2";
import styled from "styled-components";
import ButtonIcon from './ButtonIcon'
import { useLogout } from "../features/authentication/useLogout";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  const {isLoading, logOut} = useLogout()
  return <StyledHeader>
    <ButtonIcon disabled={isLoading} onClick={logOut}><HiArrowRightOnRectangle/></ButtonIcon>
  </StyledHeader>;
}

export default Header;
