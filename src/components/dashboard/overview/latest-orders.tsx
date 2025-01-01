// latest-orders.tsx

'use client'; // Marking this as a client-side component

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

// Interface for referral data
export interface Referral {
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
  rewards: number;
}

// Props for the LatestOrders component, including orders prop
interface LatestOrdersProps {
  sx?: SxProps;
  orders: Referral[]; // Accept orders as prop
}

export const LatestOrders: React.FC<LatestOrdersProps> = ({ sx, orders }) => {

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Referrals" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((referral, index) => (
              <TableRow hover key={index}>
                <TableCell>{referral.firstName} {referral.lastName}</TableCell>
                <TableCell>{dayjs(referral.date).format('MMM D, YYYY')}</TableCell>
                <TableCell>{referral.rewards.toFixed(2)} $RWA</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};
