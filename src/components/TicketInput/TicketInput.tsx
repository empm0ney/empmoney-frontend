import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import Button from '../Button'
import { useLotteryMin, useNumDepositTicketsRemaining } from '../../hooks/useDetonator'
import { getBalance } from '../../utils/formatBalance'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  availableSymbol: string
  onSelectMax?: () => void
}

const TicketInput: React.FC<TokenInputProps> = ({ max, symbol, availableSymbol, onChange, onSelectMax, value }) => {
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768
  const ticketPrice = useLotteryMin()
  const remainingTickets = useNumDepositTicketsRemaining()
  const numTickets = value && ticketPrice && remainingTickets ? Math.min(Math.floor(+value / getBalance(ticketPrice)), remainingTickets.toNumber()) : 0

  return (
    <StyledTokenInput>
      {/* <div style={{ border: +value > 40 || +value * 1000000000 > max ? '1.5px solid red' : 'none', borderRadius: '20px'}}> */}
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol isMobile={isMobile}>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <Button className="shinyButtonSecondary" size="small" onClick={onSelectMax}>
                Max
              </Button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
      {/* </div> */}
      <StyledMaxText>
        <div>{`Purchasing ${numTickets < 50 ? numTickets : 50} / ${remainingTickets} Daily Tickets`}</div>
        <span style={{ margin: 'auto auto' }} />
        <div>{`${Number(max).toLocaleString()} ${availableSymbol} Available`}</div>
      </StyledMaxText>
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``

const StyledSpacer = styled.div`
  width: 16px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: #155aca;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`
const StyledTicketsText = styled.div`
  align-items: center;
  color: #155aca;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-start;
`

const StyledTokenSymbol = styled.span< {isMobile?: boolean} >`
  color: #155aca;
  font-weight: 700;
  display: ${(props) => (props.isMobile ? 'none' : 'initial')};
`

export default TicketInput
