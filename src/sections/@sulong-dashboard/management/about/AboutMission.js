// @mui
import { Card, Typography } from '@mui/material';

export default function AboutMission() {
  return (
    <Card
      sx={{
        textAlign: 'center',
        p: 5,
        pl: 10,
        pr: 10,
      }}
    >
      <Typography variant="h3"> Mission </Typography>
      <br />
      <Typography variant="body1">
        {' '}
        To be the Philippine's most customer-centric Application, where customers can request and Suggest anything they
        might want to get in their respective barangay, and endeavors to offer its customers the Best eloquent services
        there is{' '}
      </Typography>
    </Card>
  );
}
