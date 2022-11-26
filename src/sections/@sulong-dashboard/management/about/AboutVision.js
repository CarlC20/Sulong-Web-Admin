// @mui
import { Card, Typography } from '@mui/material';

export default function AboutVision() {
  return (
    <Card
      sx={{
        textAlign: 'center',
        pt: 5,
        pb: 5,
        pl: 10,
        pr: 10,
      }}
    >
      <Typography variant="h3"> Vision </Typography>
      <br />
      <Typography variant="body1">
        {' '}
        Our vision is to give customers the most compelling Barangay Services application experience possible and create
        a better everyday life for many people working in the barangay and as well its clients and to use all the
        barangays capabilities and resources to create a safe and well-rounded community{' '}
      </Typography>
    </Card>
  );
}
