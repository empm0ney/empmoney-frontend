import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
// import Button from '../../../../components/Button'
import { Modal } from '../../widgets/Modal'
import { formatBalance, getBalance, getFullDisplayBalance } from '../../../../utils/formatBalance'
import TicketInput from '../../../../components/TicketInput'
import ModalActions from '../../../../components/ModalActions'
import { useDepositLottery, useLargestDeposit } from '../../../../hooks/useDetonator'
import { useDayDeposits, useLotteryMin, usePoolBalance } from '../../../../hooks/useDetonator'
import { Button } from '@material-ui/core'
import BigNumber from 'bignumber.js'

interface BuyTicketModalProps {
  max: BigNumber
  onConfirm?: (amount: string, numbers: Array<number>) => void
  onDismiss?: () => void
  tokenName?: string
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({ max, onDismiss }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [, setRequestedBuy] = useState(false)
  const poolBalance = usePoolBalance()
  const ticketPrice = getFullDisplayBalance(useLotteryMin())

  const largestDeposit = useLargestDeposit()
  const min = poolBalance && poolBalance.times('0.0025')
  const minLargest = min && largestDeposit ? (min.gte(largestDeposit) 
    ? getFullDisplayBalance(min)
    : getFullDisplayBalance(largestDeposit)) : '0'

  // const dayDeposits = useDayDeposits()
  // const remainingToLargest = min && dayDeposits && min.minus(+dayDeposits)
  // const minLargest = remainingToLargest && formatBalance(remainingToLargest.gt(0) ? getBalance(remainingToLargest) : 0, true)

  const fullBalance = useMemo(() => {
    return getBalance(new BigNumber(max.toString()))
  }, [max])

  const maxTickets = useMemo(() => {
    return getBalance(new BigNumber(max.toString())).toFixed(4)
  }, [max])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value)

  const { onDeposit } = useDepositLottery()
  // const maxNumber = useMaxNumber()
  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      const txHash = await onDeposit(val)
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onDeposit, setRequestedBuy, val])

  const handleSelectMax = useCallback(() => {
    setVal(maxTickets.toString())
  }, [maxTickets])

  return (
    <Modal title="Enter amount to deposit" onDismiss={onDismiss}>
      {/* <Announce>
        Deposits are final. Your GLASS cannot be returned to you after depositing.
      </Announce> */}
      <TicketInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol="EMP-ETH LP"
        availableSymbol="EMP-ETH LP"
      />
      <div style={{ marginTop: "4px" }}>
        <Tips style={{ marginBottom: "4px" }}>Daily Lottery - {ticketPrice} per ticket.</Tips>
        <Tips>Daily Largest - Deposit more than {minLargest}</Tips>
        {/* <Tips>{TranslateString(999, '1 Ticket = 100 Million GLASS')}</Tips> */}
      </div>
      <div style={{ marginBottom: '-16px' }}>
        <ModalActions>
          <Button fullWidth className="shinyButton" onClick={onDismiss}>
            Cancel
          </Button>
          <Button
            className={"shinyButton"}
            fullWidth
            disabled={
              pendingTx ||
              parseInt(val) > Number(maxTickets) ||
              // parseInt(val) <= 0 ||
              parseInt(val) > fullBalance
            }
            onClick={async () => {
              setPendingTx(true)
              await handleBuy()
              setPendingTx(false)
              onDismiss()
            }}
          >
            {pendingTx ? 'Pending' : 'Confirm'}
          </Button>
        </ModalActions>
      </div>
    </Modal>
  )
}

export default BuyTicketModal

const Tips = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #155aca;
`

const Final = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #155aca;
`
const Announce = styled.div`
  margin-top: -8px;
  margin-bottom: 16px;
  color: #ed4b9e;
  font-size: 14px;
  font-weight: 100;
  `

