import styled from "styled-components";
import { DarkModeContext } from "../hooks/DarkModeContext";
import { useContext } from "react";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const {isDarkMode} = useContext(DarkModeContext)
  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png"
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
