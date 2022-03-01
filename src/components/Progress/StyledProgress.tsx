import styled from "styled-components";

interface BarProps {
  primary?: boolean;
}

export const Bar = styled.div<BarProps>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => (props.primary ? '#1d48b6' : `${'#1d48b6'}80`)};
  border-top-left-radius: 32px;
  border-bottom-left-radius: 32px;
  height: 16px;
  transition: width 200ms ease;
`;

Bar.defaultProps = {
  primary: false,
};

const StyledProgress = styled.div`
  position: relative;
  background-color: #08090d;
  border-radius: 32px;
  box-shadow: #08090d;
  height: 16px;
  overflow: hidden;
`;

export default StyledProgress;
