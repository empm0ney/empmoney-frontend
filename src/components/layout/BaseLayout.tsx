import styled from "styled-components";

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 16px;
  @media (pointer:none), (pointer:coarse) {
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 24px;
  }
  
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 32px;
`;

export default GridLayout;
