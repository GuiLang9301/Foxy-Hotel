import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const Brand = styled.div`
  font-size: 2.4rem;
  font-family: "Ubuntu";
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src='/fox.png' alt='Logo' />
      <Brand>Foxy Hotel</Brand>
    </StyledLogo>
  );
}

export default Logo;
