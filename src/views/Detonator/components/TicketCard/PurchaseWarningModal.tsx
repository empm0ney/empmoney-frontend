import React from 'react'
import styled from 'styled-components'
import { Modal } from '../../widgets/Modal'
import ModalActions from '../../../../components/ModalActions'
import { Button } from '@material-ui/core'

const WarningModal: React.FC<{ onDismiss?: () => void }> = ({ onDismiss }) => {
  return (
    <Modal title={'Warning'} onDismiss={onDismiss}>
      <TicketsList>
        GLASS deposits are final.
        <br />
        Your GLASS will not be returned to you after you deposit it to the prize pool.
        <br />
        Deposits are only valid for the daily rewards for that current day.
        <br />
        Depositing does not guarantee you will win the daily random reward or the daily largest reward. Please only participate once you understand the risks.
      </TicketsList>
      <ModalActions>
        <Button fullWidth onClick={onDismiss}>
          I understand
        </Button>
      </ModalActions>
    </Modal>
  )
}

const TicketsList = styled.div`
  text-align: left;
  overflow-y: auto;
  max-height: 400px;
  color: ${(props) => props.theme.colors.primary};
`

export default WarningModal
