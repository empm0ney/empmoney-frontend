import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({children}) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: #10131e;
  color: white !important;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 32px;
`;

export default Card;
