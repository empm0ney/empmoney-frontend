import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({children}) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: rgb(8, 9, 13, 0.9);
  background
  color: white !important;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 32px;
`;

export default Card;
