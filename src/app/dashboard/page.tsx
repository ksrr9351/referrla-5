'use client'; // Ensure this component is treated as a client-side component

import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Budget } from '@/components/dashboard/overview/budget';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { Currentrwa } from '@/components/dashboard/overview/current-rwa';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Sales } from '@/components/dashboard/overview/sales';
import { LatestOrders, Referral } from '@/components/dashboard/overview/latest-orders'; // Import LatestOrders
import dayjs from 'dayjs';

export default function Page(): React.JSX.Element {
  const [userRewards, setUserRewards] = useState<number | null>(null);
  const [totalReferralRewards, setTotalReferralRewards] = useState<number | null>(null);
  const [spentAmount, setSpentAmount] = useState<number>(0);
  const [remainingRwa, setRemainingRwa] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [referrals, setReferrals] = useState<Referral[]>([]); // State for storing referrals data
  const [chartData, setChartData] = useState<{ thisYear: number[]; lastYear: number[] }>({
    thisYear: Array(12).fill(0), // Initialize with 12 months of 0
    lastYear: Array(12).fill(0),
  });

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const userId = sessionStorage.getItem('auth-session');
        if (!userId) {
          console.error('User not authenticated');
          return;
        }

        const response = await axios.get(`/api/referrals?userId=${userId}`);
        const { userRewards, referrals } = response.data;

        setUserRewards(userRewards);
        setReferrals(referrals); // Set referrals data from the response

        // Generate chart data
        const thisYear = dayjs().year();
        const lastYear = thisYear - 1;

        const chartThisYear = Array(12).fill(0);
        const chartLastYear = Array(12).fill(0);

        referrals.forEach((referral: any) => {
          const referralDate = dayjs(referral.date);
          const monthIndex = referralDate.month(); // 0 for January, 11 for December

          if (referralDate.year() === thisYear) {
            chartThisYear[monthIndex] += referral.rewards;
          } else if (referralDate.year() === lastYear) {
            chartLastYear[monthIndex] += referral.rewards;
          }
        });

        setChartData({ thisYear: chartThisYear, lastYear: chartLastYear });

        // Calculate today's referral rewards
        const today = dayjs().startOf('day');
        const todayReferrals = referrals.filter((referral: any) =>
          dayjs(referral.date).isSame(today, 'day')
        );
        const totalTodayReferralRewards = todayReferrals.reduce(
          (sum: number, referral: any) => sum + referral.rewards,
          0
        );

        setTotalReferralRewards(totalTodayReferralRewards); // Set the total referral rewards
      } catch (error) {
        console.error('Error fetching referral data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  useEffect(() => {
    if (userRewards !== null) {
      setRemainingRwa(userRewards - spentAmount); // Calculate remaining $RWA
    }
  }, [userRewards, spentAmount]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget sx={{ height: '100%' }} userRewards={userRewards} totalReferralRewards={totalReferralRewards} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={4} trend="down" sx={{ height: '100%' }} value="4" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Currentrwa sx={{ height: '100%' }} userRewards={userRewards} remainingRwa={remainingRwa} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} userRewards={userRewards} />
      </Grid>
      <Grid lg={12} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: chartData.thisYear },
            { name: 'Last year', data: chartData.lastYear },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <LatestOrders sx={{ height: '100%' }} orders={referrals} /> {/* Pass referrals as orders prop */}
      </Grid>
    </Grid>
  );
}
