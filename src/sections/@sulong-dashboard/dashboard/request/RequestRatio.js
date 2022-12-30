import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
// components
import { BaseOptionChart } from '../../../../components/chart';
import { filterCompleted, filterPending } from '../../../../utils/marvsutils';

// ----------------------------------------------------------------------

export default function RequestRatio({ requests }) {
  // const [seriesData, setSeriesData] = useState('This Week');

  // const handleChangeSeriesData = (event) => {
  //   setSeriesData(event.target.value);
  // };
  const CHART_DATA = [
    {
      id: '1',
      data: [
        {
          name: 'Completed',
          data: [filterCompleted(requests)],
        },
        {
          name: 'Pending',
          data: [filterPending(requests)],
        },
      ],
    },
  ];
  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      // categories: ['This week', 'This month'],
      categories: [''],
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
  });

  return (
    <Card>
      <CardHeader
        title="Pending & Completed"
        // action={
        //   <TextField
        //     select
        //     fullWidth
        //     value={seriesData}
        //     SelectProps={{ native: true }}
        //     onChange={handleChangeSeriesData}
        //     sx={{
        //       '& fieldset': { border: '0 !important' },
        //       '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
        //       '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
        //       '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
        //     }}
        //   >
        //     {CHART_DATA.map((option) => (
        //       <option key={option.year} value={option.year}>
        //         {option.year}
        //       </option>
        //     ))}
        //   </TextField>
        // }
      />

      {CHART_DATA.map((item, index) => (
        <Box key={index} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {/* {item.id === seriesData && ( */}
          <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          {/* )} */}
        </Box>
      ))}
    </Card>
  );
}
