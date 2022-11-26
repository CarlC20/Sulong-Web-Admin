import { useEffect, useState, useCallback } from 'react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Card, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../components/skeleton';
// sections
import { AnnouncementContent } from '../../sections/@sulong-dashboard/dashboard/announcement';
// ----------------------------------------------------------------------

export default function AnnouncementDetails() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id } = useParams();

  const [post, setPost] = useState(null);

  const [title, setTitle] = useState('');

  const [error, setError] = useState(null);
  console.log(id);
  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(`/api/announcements/${id}`, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });

      if (isMountedRef.current) {
        setPost(response.data);
        setTitle(response.data.title);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

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
  return (
    <Page title="Announcements: Announcement Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard.home },
            { name: 'Announcements', href: PATH_DASHBOARD.announcements.announcement },
            { name: `${title}` },
          ]}
        />

        {post && (
          <Card>
            <AnnouncementContent post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.content} />
            </Box>
          </Card>
        )}

        {!post && !error && <SkeletonPost />}

        {error && <Typography variant="h6">404 {error}!</Typography>}
      </Container>
    </Page>
  );
}
