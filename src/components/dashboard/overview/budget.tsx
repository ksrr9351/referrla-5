'use client';  // Ensure this component is a client-side component

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/system';


export interface BudgetProps {
  sx?: SxProps;
  userRewards: number | null;
  totalReferralRewards: number | null;
}

export function Budget({ sx, userRewards, totalReferralRewards }: BudgetProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Today's Earnings
              </Typography>
              <Typography variant="h4">
                {userRewards !== null ? `$${userRewards.toFixed(2)}` : 'N/A'}
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'var(--mui-palette-primary-main)',
                height: '56px',
                width: '56px',
                overflow: 'hidden',
              }}
            >
              <img
                src="/assets/test.png" // Adjust this to your actual image path
                alt="Dollar Icon"
                style={{ width: '80%', height: '80%' }}
              />
            </Avatar>
          </Stack>

          {totalReferralRewards !== null && (
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Total Referral Earnings Today
              </Typography>
              <Typography variant="h6" color="text.primary">
                ${totalReferralRewards.toFixed(2)}
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
