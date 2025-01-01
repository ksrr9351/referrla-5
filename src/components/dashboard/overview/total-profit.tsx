// total-profit.tsx

'use client'; // Add this at the top to mark this as a client component

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Wallet as NewIcon } from '@phosphor-icons/react/dist/ssr/Wallet';

export interface TotalProfitProps {
  sx?: SxProps;
  userRewards: number | null; // Add userRewards prop to the interface
}

export function TotalProfit({ sx, userRewards }: TotalProfitProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Earns
            </Typography>
            <Typography variant="h4">{userRewards !== null ? `$${userRewards.toFixed(2)}` : 'N/A'}</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
            <NewIcon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
