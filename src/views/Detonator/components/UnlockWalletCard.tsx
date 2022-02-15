import React from 'react'
import styled from 'styled-components'
import UnlockWallet from '../../../components/UnlockWallet'
import { Heading } from '../../../components/Heading'
import { Card, CardContent } from '@material-ui/core'

const StyledCardBody = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const IconWrapper = styled.div`
  svg {
    width: 80px;
    height: 80px;
  }
`

const UnlockWalletCard = () => {

  return (
    <Card>
      <StyledCardBody>
        {/* <Image src="/images/glass/hourglass-circle.png" width={80} height={80} alt="hourglass-circle"/> */}
        <Heading size="xl">⏳</Heading>
        <StyledHeading size="md">Unlock Wallet To Access</StyledHeading>
        <UnlockWallet />
      </StyledCardBody>
    </Card>
  )
}

export default UnlockWalletCard
