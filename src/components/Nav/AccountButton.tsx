import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import {useWallet} from 'use-wallet';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';
import AccountModal from './AccountModal';
import {useENS} from '../../hooks/useENS';
import Davatar from '@davatar/react';

function shorten(str: string) {
  if (str.length < 10) return str;
  return `${str.slice(0, 5)}...${str.slice(str.length - 3)}`;
}
interface AccountButtonProps {
  text?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({text}) => {
  const {account} = useWallet();
  const [onPresentAccountModal] = useModal(<AccountModal />);
  const {ensName} = useENS(account);
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

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const buttonText = text ? text : 'Connect Wallet';

  return (
    <div>
      {!account ? (
        <Button onClick={handleWalletProviderOpen} className="shinyButtonSecondary">
          {buttonText}
        </Button>
      ) : (
        <Button onClick={onPresentAccountModal} className="shinyButtonSecondary">
          <div className="account">
            <Davatar size={20} address={account} />
            <span>{isMobile ? 'Wallet' : (ensName || shorten(account))}</span>
          </div>
        </Button>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
