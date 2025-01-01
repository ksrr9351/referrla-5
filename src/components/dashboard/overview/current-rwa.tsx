'use client'; // Ensure this component is treated as a client-side component

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Coin as NewIcon } from '@phosphor-icons/react/dist/ssr/Coin';

export interface CurrentrwaProps {
  sx?: SxProps;
  userRewards: number | null;
  remainingRwa: number;
}

export function Currentrwa({ sx, userRewards, remainingRwa }: CurrentrwaProps): React.JSX.Element {
  if (userRewards === null) {
    return <Typography>Loading...</Typography>;  // Show loading text while data is being fetched
  }

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Current $RWA
            </Typography>
            <Typography variant="h4">{remainingRwa !== null ? `$${remainingRwa.toFixed(2)}` : 'N/A'}</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
            <NewIcon fontSize="var(--icon-fontSize-lg)" />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
