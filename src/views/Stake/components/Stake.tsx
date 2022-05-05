import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent } from '@material-ui/core';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import useEmpFinance from '../../../hooks/useEmpFinance';
import TokenSymbol from '../../../components/TokenSymbol';
import useUserEthStake from '../../../hooks/useUserEthStake';
import useEthStats from '../../../hooks/useEthStats';
import useStakeEth from '../../../hooks/useStakeEth';
import useExitEth from '../../../hooks/useExitEth';
import EarlyExitModal from './EarlyExitModal';
import useWhitelistCheck from '../../../hooks/useWhitelistCheck';
import useEpochEth from '../../../hooks/useEpochEth';

const Stake: React.FC = () => {
  const empFinance = useEmpFinance();
  const [approveStatus, approve] = useApprove(empFinance.ETH, empFinance.contracts.EthStaking.address);
  const tokenBalance = useTokenBalance(empFinance.ETH);
  const user = useUserEthStake();
  const ethPrice = useEthStats();
  const isWhitelisted = useWhitelistCheck();
  const epoch = useEpochEth();
  const { onStake } = useStakeEth();
  const { onExit } = useExitEth();

  const [onPresentExit, onDismissExit] = useModal(
    <EarlyExitModal
      onConfirm={() => {
        onExit(true);
        onDismissExit();
      }}
    />,
  );

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'ETH'}
    />,
  );

  return (
    <Box>
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <CardIcon>
                <TokenSymbol symbol="ETH" />
              </CardIcon>

              {/* <Button
                className={'shinyButton'}
                onClick={() => {
                  empFinance.watchAssetInMetamask('ETH');
                }}
                style={{
                  position: 'static',
                  top: '10px',
                  right: '10px',
                  border: '1px grey solid',
                  paddingBottom: '5px',
                  marginBottom: '20px',
                }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button> */}
              <Value value={getDisplayBalance(user.current_balance)} />
              <Label text={`≈ $${(Number(getDisplayBalance(user.current_balance)) * Number(ethPrice)).toFixed(2)}`} variant="yellow" />
              <Label text={'ETH Balance'} variant="yellow" />
            </StyledCardHeader>
            <StyledCardActions>
              {epoch.unlocked ? <>
                {approveStatus !== ApprovalState.APPROVED ? (
                  <Button
                    disabled={approveStatus !== ApprovalState.NOT_APPROVED || !isWhitelisted}
                    className={approveStatus === ApprovalState.NOT_APPROVED && isWhitelisted ? 'shinyButton' : 'shinyButtonDisabled'}
                    style={{ marginTop: '20px' }}
                    onClick={approve}
                  >
                    {isWhitelisted ? 'Approve ETH' : 'Not Whitelisted'}
                  </Button>
                ) : (
                  <>
                    <IconButton onClick={onPresentExit}>
                      <RemoveIcon color={'white'} />
                    </IconButton>
                    <StyledActionSpacer />
                    <IconButton onClick={onPresentDeposit}>
                      <AddIcon color={'white'} />
                    </IconButton>
                  </>
                )}
              </>
                : <>
                  <Button
                    disabled={true}
                    className={'shinyButtonDisabled'}
                    style={{ marginTop: '20px' }}
                    onClick={() => null}
                  >
                    Locked
                  </Button>
                </>
              }
            </StyledCardActions>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      {/* <Box mt={2} style={{color: '#FFF'}}>
        {canWithdrawFromBoardroom ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{textAlign: 'center'}}>Withdraw possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Withdraw available in" />
            </CardContent>
          </Card>
        )}
      </Box> */}
    </Box>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
