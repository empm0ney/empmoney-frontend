import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import useApprove, { ApprovalState } from '../../../../hooks/useApprove'
import useTokenBalance from '../../../../hooks/useTokenBalance'
import { useWallet } from 'use-wallet'
import { useDepositLottery, useGetUserInfoTotals } from '../../../../hooks/useDetonator'
import BuyTicketModal from './BuyTicketModal'
import useEmpFinance from '../../../../hooks/useEmpFinance'
import useBank from '../../../../hooks/useBank'
import { Flex } from '../../../../components/Flex'
import { Text } from '../../../../components/Text'
import { Button } from '@material-ui/core'
import useModal from '../../../../hooks/useModal'
import BigNumber from 'bignumber.js'
import ZapModal from '../../../Bank/components/ZapModal'
import useZap from '../../../../hooks/useZap'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: 
  margin-top: 5px;

  
    justify-content: space-between;

`

const Copy = styled.div`
  margin: auto auto 10px;
  :hover {
    cursor: pointer;
  }
`

const TicketCard: React.FC = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { Detonator } = useEmpFinance().contracts
  const bank = useBank('EmpEthEShareRewardPool')
  const [approvalState, approve] = useApprove(bank.depositToken, Detonator.address);
  const lpBalance = useTokenBalance(bank.depositToken);
  // const displayEmpBalance = useMemo(() => getDisplayBalance(empBalance), [empBalance]);
  const { account } = useWallet()
  const userInfo = useGetUserInfoTotals()

  // const time = useCurrentTime()
  // const enableTimeFormat = time && getLotteryRewardTime(1628136000 - (time / 1000))

  const { onDeposit } = useDepositLottery()
  const minRef = 0.15;
  const refLink =
    account && userInfo && +userInfo.total_deposits / 1e18 >= 0.15 && `https://emp.money/detonator?ref=${account}`

  // const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const [onPresentBuy] = useModal(
    <BuyTicketModal max={lpBalance} tokenName="EMP-ETH-LP" />
  )
  const { onZapIn } = useZap(bank);
  const [onPresentZap, onDissmissZap] = useModal(
    <ZapModal
      decimals={bank.depositToken.decimal}
      onConfirm={async (zappingToken, tokenName, amount, slippageBp) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        await onZapIn(zappingToken, tokenName, amount, slippageBp, lpBalance, onDeposit);
        onDissmissZap();
      }}
      tokenName={bank.depositTokenName}
      showEstimates={false}
    />,
  );

  const query = window.location.search;

  useEffect(() => {
    if (query) {
      const REF_KEY = 'REF_KEY';
      const regex = new RegExp('[?&]ref=([^&#]*)').exec(query);
      const refExtract = regex && regex.length > 1 ? regex[1] : null;

      if (refExtract) {
        const currentRef = localStorage.getItem(REF_KEY);

        if (!currentRef || refExtract !== currentRef) {
          localStorage.setItem(REF_KEY, refExtract);
        }
      }
    }
  }, [query]);

  const copyRef = () => {
    if (refLink) {
      const el = document.createElement('textarea')
      el.value = refLink
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      alert('Copied to clipboard.')
    } else {
      alert(`Must deposit atleast ${minRef} EMP-ETH LP token to use referral link.`)
    }
  }

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await approve()
      // onPresentApprove()
    } catch (e) {
      console.error(e)
      setRequestedApproval(false)
    }
  }, [approve])

  const renderLotteryTicketButtons = () => {
    if (approvalState !== ApprovalState.APPROVED) {
      return (
        <>
          <Flex flexDirection="column" flexGrow={1} marginTop="14px">
            <Copy onClick={copyRef}>
              <Text color="purple">Referral Link</Text>
            </Copy>
            <Button
              fullWidth
              disabled={requestedApproval}
              onClick={handleApprove}
              className={"shinyButtonSecondary"}>
              Approve EMP-ETH-LP
            </Button>
          </Flex>
        </>
      )
    }

    return (
      <>
        <Flex flexDirection="column" flexGrow={1} marginTop="14px">
          <Copy onClick={copyRef}>
            <Text color="purple">Referral Link</Text>
          </Copy>
          {/* <Text margin="auto auto 10px" color="#1d48b6" >
            Temporarily Disabled For Improvements {enableTimeFormat}
          </Text> */}
          <Flex flexDirection="row" flexGrow={1}>
            <Button
              id="lottery-zap-start"
              fullWidth onClick={onPresentZap}
              className={"shinyButtonSecondary"}
            >
              Zap In
            </Button>
            <div style={{ width: '2rem' }}>{' '}</div>
            <Button
              id="lottery-buy-start"
              fullWidth onClick={onPresentBuy}
              className={"shinyButtonSecondary"}
            >
              Deposit
            </Button>
          </Flex>
        </Flex>
      </>
    )
  }

  return <CardActions>{renderLotteryTicketButtons()}</CardActions>
}

export default TicketCard
