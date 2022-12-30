import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
// utils
import { useNavigate } from 'react-router-dom';
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const navigate = useNavigate();
  // const [notifications, setNotifications] = useState();

  // const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    console.log(event.currentTarget);
  };
  const unRead = data.filter((d) => d.status == null);
  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    load();
  }, []);
  const readNotification = async (id, type) => {
    handleClose();
    navigate(linkHandler(type));
    const res = await axios.put(
      `/api/notifications/update/${id}`,
      { status: 'read' },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      }
    );
    load();
  };
  const load = async () => {
    const response = await axios.get('/api/notifications/all', {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });
    const sortedAsc = response.data.sort(
      (objA, objB) => Number(new Date(objB.createdAt)) - Number(new Date(objA.createdAt))
    );
    setData(sortedAsc.filter((r) => r.receiver === 'admin'));
  };
  return (
    <>
      <IconButtonAnimate color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={unRead.length} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {unRead.length} new notifications
            </Typography>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButtonAnimate color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ maxHeight: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            // subheader={
            //   <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
            //     New
            //   </ListSubheader>
            // }
          >
            {data?.map((notification) => (
              <NotificationItem readNotification={readNotification} key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};
const choices = ['Reservations', 'Incident Reports', 'Request & Inquiry'];

const typeHandler = (type) => {
  switch (type) {
    case 'reservation':
      return choices[0];
    case 'incident_report':
      return choices[1];
    case 'request_inquiries':
      return choices[2];
    default:
      return false;
  }
};
const linkHandler = (type) => {
  switch (type) {
    case 'reservation':
      return '/dashboard/reservations/reservation';
    case 'incident_report':
      return '/dashboard/incident-reports/incident-report';
    case 'request_inquiries':
      return '/dashboard/requests-&-inquiries/request-&-inquiry';
    default:
      return false;
  }
};

function NotificationItem({ notification, readNotification }) {
  const { name, createdAt, status, description, type, id } = notification;

  return (
    <Button
      onClick={() => readNotification(id, type)}
      sx={{
        width: '100%',
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(status == null && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemText
        primary={
          <Typography variant="subtitle2">
            {name}
            <br />
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
              &nbsp; {noCase(description)}
            </Typography>
            <br />
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              &nbsp; - &nbsp;{noCase(typeHandler(type))}
            </Typography>
          </Typography>
        }
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(createdAt)}
          </Typography>
        }
      />
    </Button>
  );
}
