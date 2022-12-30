import { useEffect, useRef, useState } from 'react';
// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections

import {
  HomeWelcome,
  HomeTotalCommitments,
  HomeFunctionRatio,
  HomeRedirection,
} from '../../sections/@sulong-dashboard/dashboard/home';
import axios from '../../utils/axios';
import { RequestType } from '../../sections/@sulong-dashboard/dashboard/request';
import { ReservationType } from '../../sections/@sulong-dashboard/dashboard/reservation';
import { ReportType } from '../../sections/@sulong-dashboard/dashboard/report';
// ----------------------------------------------------------------------
import { currentDate, monthDatas, yearDatas, weekDatas, typeCollector } from '../../utils/marvsutils';

export default function DashboardHome() {
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const [data, setData] = useState(null);
  const [todayRequest, setTodayRequest] = useState([0, 0, 0]);
  const [totalCommitments, setTotalCommitments] = useState([0, 0, 0]);
  const [typeRequest, setTypeRequest] = useState([0, 0, 0, 0, 0]);
  const [typeEvent, setTypeEvent] = useState([0, 0, 0, 0, 0]);
  const [typeIncident, setTypeIncident] = useState([0, 0, 0, 0, 0]);

  const [chartData, setChartData] = useState([
    {
      year: 'Week',
      data: [
        { name: 'Completed', data: [0, 0, 0] },
        { name: 'Pending', data: [0, 0, 0] },
      ],
    },
    {
      year: 'Month',
      data: [
        { name: 'Completed', data: [0, 0, 0] },
        { name: 'Pending', data: [0, 0, 0] },
      ],
    },
    {
      year: 'Year',
      data: [
        { name: 'Completed', data: [0, 0, 0] },
        { name: 'Pending', data: [0, 0, 0] },
      ],
    },
  ]);

  const REQUESTLABEL = [
    'Barangay Clearance',
    'Barangay Id',
    'Business Permit',
    'Travel Pass',
    'Health Certificate',
    'Others',
  ];
  const RESERVATIONLABEL = ['Brgy Gym', 'Brgy Hall', 'Stage', 'Court', 'Clinic', 'Others'];
  const REPORTLABEL = ['Fire', 'Theft', 'Missing Person', 'Riot', 'Missing Pet', 'Others'];

  useEffect(async () => {
    if (user) {
      console.log(user);
      setData(user);
    } else {
      const response = await axios.get('/api/users/myProfile', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });

      if (response) {
        setData(response.data);
      }
    }
    const load = async () => {
      const reservationRes = await axios.get('/api/reservations', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });
      const requestRes = await axios.get('/api/requests', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });
      const reportRes = await axios.get('/api/reports', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });
      setTotalCommitments([requestRes.data.length, reservationRes.data.length, reportRes.data.length]);
      setChartData([
        {
          year: 'Week',
          data: [
            {
              name: 'Completed',
              data: [
                weekDatas(requestRes.data, 'Completed'),
                weekDatas(reservationRes.data, 'Completed'),
                weekDatas(reportRes.data, 'Completed'),
              ],
            },
            {
              name: 'Pending',
              data: [
                weekDatas(requestRes.data, 'Pending'),
                weekDatas(reservationRes.data, 'Pending'),
                weekDatas(reportRes.data, 'Pending'),
              ],
            },
          ],
        },
        {
          year: 'Month',
          data: [
            {
              name: 'Completed',
              data: [
                monthDatas(requestRes.data, 'Completed'),
                monthDatas(reservationRes.data, 'Completed'),
                monthDatas(reportRes.data, 'Completed'),
              ],
            },
            {
              name: 'Pending',
              data: [
                monthDatas(requestRes.data, 'Pending'),
                monthDatas(reservationRes.data, 'Pending'),
                monthDatas(reportRes.data, 'Pending'),
              ],
            },
          ],
        },
        {
          year: 'Year',
          data: [
            {
              name: 'Completed',
              data: [
                yearDatas(requestRes.data, 'Completed'),
                yearDatas(reservationRes.data, 'Completed'),
                yearDatas(reportRes.data, 'Completed'),
              ],
            },
            {
              name: 'Pending',
              data: [
                yearDatas(requestRes.data, 'Pending'),
                yearDatas(reservationRes.data, 'Pending'),
                yearDatas(reportRes.data, 'Pending'),
              ],
            },
          ],
        },
      ]);
      console.log(reservationRes.data);
      setTypeRequest(typeCollector(REQUESTLABEL, requestRes.data));
      setTypeEvent(typeCollector(RESERVATIONLABEL, reservationRes.data));
      setTypeIncident(typeCollector(REPORTLABEL, reportRes.data));
      setTodayRequest([todayDatas(requestRes), todayDatas(reservationRes), todayDatas(reportRes)]);
    };
    load();
  }, [user]);
  // TODAY REQUESTS
  const todayDatas = (refData) => {
    const today = refData.data.filter(
      (r) => todayFormat(r.createdAt) === todayFormat(currentDate) && r.status === 'Pending'
    );
    return today.length;
  };
  // FORMATTER FOR BAR GRAPH
  const todayFormat = (newDate) => {
    const d = new Date(newDate);
    return d.getFullYear().toString() + d.getMonth().toString() + d.getDay().toString();
  };

  // TYPE HANDLERS

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <HomeWelcome displayName={`${data?.first_name || ''} ${data?.last_name || ''}`} />
          </Grid>

          {/* Announcement Module TODO */}
          <Grid item xs={12} md={7}>
            <HomeRedirection chartData={todayRequest} />
          </Grid>

          <Grid item xs={12} md={4}>
            <RequestType chartData={typeRequest} labels={REQUESTLABEL} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ReservationType chartData={typeEvent} labels={RESERVATIONLABEL} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ReportType chartData={typeIncident} labels={REPORTLABEL} />
          </Grid>

          <Grid item xs={12} md={6}>
            <HomeTotalCommitments chartData={totalCommitments} />
          </Grid>

          <Grid item xs={12} md={6}>
            <HomeFunctionRatio chartData={chartData} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
