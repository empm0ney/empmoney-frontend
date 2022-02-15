import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useApprove, { ApprovalState } from '../../../../hooks/useApprove'
import useTokenBalance from '../../../../hooks/useTokenBalance'
import { getLotteryRewardTime } from '../../helpers/CountdownHelpers'
import { useWallet } from 'use-wallet'
import { useGetUserInfoTotals } from '../../../../hooks/useDetonator'
import BuyTicketModal from './BuyTicketModal'
import PurchaseWarningModal from './PurchaseWarningModal'
import useEmpFinance from '../../../../hooks/useEmpFinance'
import useBank from '../../../../hooks/useBank'
import { getDisplayBalance } from '../../../../utils/formatBalance'
import { Flex } from '../../../../components/Flex'
import { Text } from '../../../../components/Text'
import { Button } from '@material-ui/core'
import useModal from '../../../../hooks/useModal'
import BigNumber from 'bignumber.js'

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
  const empBalance = useTokenBalance(bank.depositToken);
  // const displayEmpBalance = useMemo(() => getDisplayBalance(empBalance), [empBalance]);
  const { account } = useWallet()
  const userInfo = useGetUserInfoTotals()

  // const time = useCurrentTime()
  // const enableTimeFormat = time && getLotteryRewardTime(1628136000 - (time / 1000))

  const minRef = 0.15;
  const refLink =
    account && userInfo && +userInfo.total_deposits / 1e18 >= 0.15 && `${window.location.origin}/detonator?ref=${account}`

  // const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const [onPresentBuy] = useModal(<BuyTicketModal max={new BigNumber(empBalance.toString())} tokenName="EMP-ETH-LP" />)

  const REF_KEY = 'REF_KEY'
  const regex = new RegExp('[?&]ref=([^&#]*)').exec(window.location.search)
  const refExtract = regex && regex.length > 1 ? regex[1] : null
  if (refExtract) {
    const currentRef = localStorage.getItem(REF_KEY)
    if (!currentRef || refExtract !== currentRef) {
      localStorage.setItem(REF_KEY, refExtract)
    }
  }

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
          {/* <Text margin="auto auto 10px" color="#155aca" >
            Temporarily Disabled For Improvements {enableTimeFormat}
          </Text> */}
          <Button
            id="lottery-buy-start"
            fullWidth onClick={onPresentBuy}
            className={"shinyButtonSecondary"}
          >
            Deposit
          </Button>
        </Flex>
      </>
    )
  }

  return <CardActions>{renderLotteryTicketButtons()}</CardActions>
}

export default TicketCard
