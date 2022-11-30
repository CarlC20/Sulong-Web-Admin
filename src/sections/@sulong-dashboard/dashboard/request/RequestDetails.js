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
import { useEffect, useRef, useState } from 'react';
import { _bookings } from '../../../../_mock';
// import { requests } from '../../../../_sulong_mock';
//
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import axios from '../../../../utils/axios';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { RequestPopup, RequestDescription } from './index';

// ----------------------------------------------------------------------

export default function RequestDetails() {
  const theme = useTheme();
  const [openPopup, setOpenPopup] = useState(false);
  const isLight = theme.palette.mode === 'light';
  const [requests, setRequests] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const descriptionRef = useRef();
  // const isMountedRef = useIsMountedRef();

  const [req, setReq] = useState([]);
  useEffect(() => {
    const load = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('/api/requests', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });
      setRequests(response.data);
    };
    load();
  }, []);

  // ===================
  return (
    <>
      <Card>
        <CardHeader title="Requests & Inquiries" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Date</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>E-mail</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Description</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.length > 0 &&
                  requests?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row?.id}>
                      {/* User */}
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={row?.name} src={row?.avatar} />
                          <Typography variant="subtitle2">
                            {row?.user?.first_name} {row?.user?.last_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      {/* Date */}
                      <TableCell>{row?.createdAt && format(new Date(row.createdAt), 'dd MMM yyyy')}</TableCell>
                      {/* E-mail */}
                      <TableCell>{row?.user?.email}</TableCell>
                      {/* Description button for showing description overlay */}
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            descriptionRef.current = row.description;
                            setOpenPopup(true);
                          }}
                        >
                          View Description
                        </Button>
                        <RequestPopup title="Request Description" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                          <RequestDescription description={descriptionRef.current} />
                        </RequestPopup>
                      </TableCell>

                      {/* Status */}
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
                          <Button
                            fullWidth
                            color="info"
                            variant="contained"
                            endIcon={<Iconify icon={'eva:checkmark-circle-2-outline'} />}
                            onClick={async () => {
                              const response = await axios.put(
                                `/api/requests/update/${row.id}`,
                                { status: 'Completed' },
                                {
                                  headers: {
                                    'x-api-key': process.env.REACT_APP_API_KEY,
                                  },
                                }
                              );
                            }}
                          >
                            Complete
                          </Button>
                          <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            endIcon={<Iconify icon={'eva:close-circle-fill'} />}
                            onClick={() => {
                              const response = axios.delete(`/api/requests/delete/${row.id}`, {
                                headers: {
                                  'x-api-key': process.env.REACT_APP_API_KEY,
                                },
                              });
                              const updateRequests = requests.filter((r) => r.id !== row.id);
                              setRequests(updateRequests);
                            }}
                          >
                            Reject
                          </Button>
                        </Stack>
                      </TableCell>
                      {/* <TableCell align="right">
                        <MoreMenuButton requests={requests} id={row.id} setRequests={setRequests} />
                      </TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requests.length}
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

function MoreMenuButton({ id, setRequests, requests }) {
  const [open, setOpen] = useState(null);
  const deleteHandler = async () => {
    const response = await axios.delete(`/api/requests/delete/${id}`, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });
    // console.log(response);
    const updateRequests = requests.filter((r) => r.id !== id);
    setRequests(updateRequests);
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
        <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }} onClick={deleteHandler}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
