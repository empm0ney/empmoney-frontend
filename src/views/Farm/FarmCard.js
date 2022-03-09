import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Typography, Grid} from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';

const FarmCard = ({bank}) => {
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined">
        <CardContent>
          <Box style={{position: 'relative'}}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: '#363746',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol size={32} symbol={bank.sectionInUI !== 3 ? bank.depositTokenName : 'EMPNODE'} />
            </Box>
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
              {/* {bank.depositTokenName}{bank.sectionInUI === 3 && ` - ${getLockupText(bank.poolId)}`} */}
            </Typography>
            <Typography color="textSecondary">
              {/* {bank.name} */}
              {bank.sectionInUI === 3 ? 'Nodes' : 'Deposit'} {bank.sectionInUI !== 3 && bank.depositTokenName.toUpperCase()} {bank.sectionInUI !== 3 ? 'Earn' : 'Generate'} {` ${bank.earnTokenName}`}
            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{justifyContent: 'flex-end'}}>
          <Button className="shinyButtonSecondary" component={Link} to={`/farm/${bank.contract}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FarmCard;
