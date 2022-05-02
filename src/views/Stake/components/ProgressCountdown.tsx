import React from 'react';
import styled from 'styled-components';
import Countdown, {CountdownRenderProps} from 'react-countdown';

interface ProgressCountdownProps {
  base: Date;
  deadline: Date;
  hideBar?: boolean;
}

const ProgressCountdown: React.FC<ProgressCountdownProps> = ({base, deadline, hideBar}) => {
  const percentage =
    Date.now() >= deadline.getTime()
      ? 100
      : ((Date.now() - base.getTime()) / (deadline.getTime() - base.getTime())) * 100;

  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const {days, hours, minutes, seconds} = countdownProps;
    const d = String(days);
    const h = String(hours);
    const m = String(minutes);
    const s = String(seconds);
    return (
      <StyledCountdown>
        {d.padStart(2, '0')}d:{h.padStart(2, '0')}h:{m.padStart(2, '0')}m
      </StyledCountdown>
    );
  };
  return (
    <StyledCardContentInner>
      <Countdown key={new Date().getTime()} date={deadline} renderer={countdownRenderer} />
      {hideBar ? (
        ''
      ) : (
        <StyledProgressOuter>
          <StyledProgress progress={percentage} />
        </StyledProgressOuter>
      )}
    </StyledCardContentInner>
  );
};

const StyledCountdown = styled.div`
  // font-size: 14px;
  // font-weight: 700;
  // margin: 0 0 6px 0;
`;

const StyledProgressOuter = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 3px;
  background: ${(props) => props.theme.color.grey[700]};
`;

const StyledProgress = styled.div<{progress: number}>`
  width: ${(props) => props.progress}%;
  height: 100%;
  border-radius: 3px;
  background: ${(props) => props.theme.color.grey[100]};
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default ProgressCountdown;
