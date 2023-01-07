import { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// _mock_
// import { reservations } from '../../../../_sulong_mock';
//
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import { RequestPopup, RequestDescription } from '../request';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

export default function ReservationDetails({ reservations, setReservations, load }) {
  // const [reservations, setReservations] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const [openPopup, setOpenPopup] = useState(false);
  const descriptionRef = useRef();
  const isLight = theme.palette.mode === 'light';
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const rejectHandler = async (data) => {
    console.log(data);
    const { id, description } = data;
    await axios.delete(`/api/reservations/delete/${id}`, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    enqueueSnackbar('A reservation has been rejected!', { variant: 'error' });

    const res = await axios.post(
      '/api/notifications/create',
      {
        name: `${data.user.first_name} ${data.user.last_name}`,
        type: 'reservation',
        description,
        condition: 'Rejected',
        receiver: 'user',
        email: data.user.email,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      }
    );
    console.log(res);
    load();
  };
  const completeHandler = async (data) => {
    const { id, description } = data;

    await axios.put(
      `/api/reservations/update/${id}`,
      {
        status: 'Completed',
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      }
    );

    enqueueSnackbar('A reservation has been completed!');

    const res = await axios.post(
      '/api/notifications/create',
      {
        name: `${data.user.first_name} ${data.user.last_name}`,
        type: 'reservation',
        description,
        condition: 'Completed',
        receiver: 'user',
        email: data.user.email,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      }
    );
    load();
  };

  return (
    <>
      <Card>
        <CardHeader title="Reservations" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 220 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 140 }}>Date</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>E-mail</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Event</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Description</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Facility</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.length > 0 &&
                  reservations?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row?.id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          //<Avatar alt={row?.name} src={row?.user.profile_url || null} />
                    
                          <Typography variant="subtitle2">
                            {row?.user?.first_name} {row?.user?.last_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{row?.createdAt && format(new Date(row?.createdAt), 'dd MMM yyyy')}</TableCell>
                      <TableCell>{row?.user?.email}</TableCell>
                      <TableCell>{row?.event_type}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              descriptionRef.current = row.description;
                              setOpenPopup(true);
                            }}
                          >
                            View Description
                          </Button>
                        </Stack>
                      </TableCell>
                      <TableCell>{row?.facility}</TableCell>

                      <TableCell>
                        <Label
                          variant={isLight ? 'ghost' : 'filled'}
                          color={(row.status === 'Completed' && 'success') || (row.status === 'Pending' && 'warning')}
                        >
                          {sentenceCase(row.status)}
                        </Label>
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
                          {row.status !== 'Completed' && (
                            <>
                              <Button
                                fullWidth
                                onClick={() => completeHandler(row)}
                                variant="contained"
                                color="info"
                                endIcon={<Iconify icon={'eva:checkmark-circle-2-outline'} />}
                              >
                                Complete
                              </Button>
                              <Button
                                fullWidth
                                onClick={() => rejectHandler(row)}
                                variant="contained"
                                color="error"
                                endIcon={<Iconify icon={'eva:close-circle-fill'} />}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </Stack>
                      </TableCell>

                      {/* <TableCell align="right">
                        <MoreMenuButton reservations={reservations} id={row.id} setReservations={setReservations} />
                      </TableCell> */}
                    </TableRow>
                  ))}
                <RequestPopup title="Request Description" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                  <RequestDescription description={descriptionRef.current} />
                </RequestPopup>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reservations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Divider />

        {/* <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            View All
          </Button>
        </Box> */}
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton({ id, setReservations, reservations }) {
  const [open, setOpen] = useState(null);
  const deleteHandler = async () => {
    const response = await axios.delete(`/api/reservations/delete/${id}`, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });
    // console.log(response);
    const updateReservations = reservations.filter((r) => r.id !== id);

    setReservations(updateReservations);
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {/* <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }} onClick={deleteHandler}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
