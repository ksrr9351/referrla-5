'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Button, Box, TextField, Divider } from '@mui/material';
import { MonetizationOn as MoneyIcon, AttachMoney as ConvertIcon, Savings as SavingsIcon } from '@mui/icons-material';
import axios from 'axios';

export default function RwaConversionPage(): React.JSX.Element {
  const [rwaPoints, setRwaPoints] = useState<number>(0); // Initialize RWA points state
  const [conversionRate, setConversionRate] = useState<number>(0.5); // Conversion rate
  const [pointsToConvert, setPointsToConvert] = useState<number>(0); // Points to convert
  const [spentAmount, setSpentAmount] = useState<number>(0); // Amount already spent
  const [remainingRwa, setRemainingRwa] = useState<number>(0); // Remaining RWA
  const [convertedAmount, setConvertedAmount] = useState<number>(0); // Converted amount
  const [userRewards, setUserRewards] = useState<number>(0); // State to store user rewards
  const [loading, setLoading] = useState<boolean>(true); // Loading state for data fetching

  // Fetch user rewards and calculate remaining RWA
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const userId = sessionStorage.getItem('auth-session');
        if (!userId) {
          console.error('User not authenticated');
          return;
        }

        const response = await axios.get(`/api/referrals?userId=${userId}`);
        const { userRewards } = response.data; // Assuming userRewards is a number (total RWA points)

        setUserRewards(userRewards); // Set the fetched user rewards
        setRwaPoints(userRewards); // Initialize rwaPoints with the user rewards

        // Calculate the remaining RWA after spending
        setRemainingRwa(userRewards - spentAmount);
      } catch (error) {
        console.error('Error fetching referral data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [spentAmount]); // Dependency on spentAmount for recalculating remaining RWA

  // Handle the RWA points conversion
  const handleConversion = () => {
    if (pointsToConvert > 0 && pointsToConvert <= rwaPoints) {
      setConvertedAmount(pointsToConvert * conversionRate);
      setRwaPoints((prev) => prev - pointsToConvert); // Subtract converted points from available points
    } else {
      alert('Please enter a valid amount of points to convert.');
    }
  };

  // Loading state
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ padding: 3 }}>
      {/* Title */}
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          RWA Points Conversion
        </Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary">
          Easily convert your RWA Points to $RWA.
        </Typography>
      </Grid>

      {/* Current RWA Points Card */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SavingsIcon fontSize="large" color="primary" />
            <Box>
              <Typography variant="h6">Your RWA Points</Typography>
              <Typography variant="h4" color="primary">{rwaPoints}</Typography>
              <Typography variant="body2" color="textSecondary">
                Earn more points by completing tasks or referring friends!
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Conversion Rate Card */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MoneyIcon fontSize="large" color="success" />
            <Box>
              <Typography variant="h6">Conversion Rate</Typography>
              <Typography variant="h4" color="success">
                1 RWA Point = ${conversionRate} RWA
              </Typography>
              <Typography variant="body2" color="textSecondary">
                The rate may vary over time. Convert now!
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Conversion Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Convert Your RWA Points
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="number"
                label="Points to Convert"
                variant="outlined"
                fullWidth
                value={pointsToConvert}
                onChange={(e) => setPointsToConvert(Number(e.target.value))}
                InputProps={{ inputProps: { min: 0, max: rwaPoints } }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<ConvertIcon />}
                onClick={handleConversion}
                disabled={pointsToConvert <= 0 || pointsToConvert > rwaPoints}
              >
                Convert to $RWA
              </Button>
            </Box>
            {convertedAmount > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" color="success">
                  Conversion Successful!
                </Typography>
                <Typography variant="body1">
                  You received <strong>${convertedAmount.toFixed(2)} RWA</strong>.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
