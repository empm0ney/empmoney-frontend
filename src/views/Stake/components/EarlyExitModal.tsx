import React from 'react';
import { Button } from '@material-ui/core';
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import { Alert } from '@mui/material';

interface EarlyExitModalProps extends ModalProps {
  onConfirm: () => void;
}

const EarlyExitModal: React.FC<EarlyExitModalProps> = ({ onConfirm, onDismiss }) => {

  return (
    <Modal>
      <ModalTitle text={`Emergency Withdraw`} />
      <Alert style={{ marginTop: '1rem' }} severity='error' variant='outlined'>This will incur a 50% tax and loss of any interest gained.</Alert>

      <ModalActions>
        <div style={{ textAlign: 'center' }}>
          <Button fullWidth color="primary" variant="outlined" onClick={() => onConfirm()}>
            Confirm
          </Button>
          <div style={{ height: '8px' }}>{' '}</div>
          <Button fullWidth color="primary" variant="contained" onClick={() => onDismiss()}>
            Cancel
          </Button>
        </div>
      </ModalActions>
    </Modal>
  );
};

export default EarlyExitModal;
