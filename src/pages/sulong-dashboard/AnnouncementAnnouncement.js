import orderBy from 'lodash/orderBy';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
// @mui
import { Grid, Button, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { SkeletonPostItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { AnnouncementCard, AnnouncementSort } from '../../sections/@sulong-dashboard/dashboard/announcement';
import { ligaPic } from '../../assets';

import { setSession } from '../../utils/jwt';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }

  return posts;
};

export default function AnnouncementAnnouncement() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const getAllPosts = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      setSession(accessToken);
      // const response = await axios.get('/api/blog/posts/all');
      const response = await axios.get('/api/announcements/announcement', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });

      if (isMountedRef.current) {
        console.log(response.data);
        setPosts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const mockAnnouncements = [
    {
      id: 1,
      title: 'Barangay Liga',
      description: 'Annual basketball liga',
      content:
        'There will be basketball liga on the 2nd week of November on the Barangay court. To join, approach SK Chairman Penelope at the entrance of the court. See you future ballers!',
      coverUrl: 'http://ligaocity.albay.gov.ph/wp-content/uploads/2017/03/interbrgy.jpg',
      createdAt: 'October 12',
    },
    {
      id: 2,
      title: 'Test',
      description: 'Test Announcement',
      content: 'This is a test announcement',
      coverUrl:
        'https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ',
      createdAt: 'November 1',
    },
  ];

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Announcement">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Announcements"
          links={[
            { name: 'Home', href: PATH_DASHBOARD.dashboard.home },
            { name: 'Announcements', href: PATH_DASHBOARD.announcements.announcement },
            { name: 'Announcement' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.announcements.addAnnouncement}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Add Announcement
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <AnnouncementSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <Grid container spacing={3}>
          {(!posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <AnnouncementCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
          {/* Mock data below */}
          {/* {mockAnnouncements.map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <AnnouncementCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )} */}
        </Grid>
      </Container>
    </Page>
  );
}
