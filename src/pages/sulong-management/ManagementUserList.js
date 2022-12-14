import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Card,
  Table,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_sulong_mock';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@sulong-dashboard/management/user';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'email', label: 'Email', alignRight: false },
//   { id: 'address', label: 'Address', alignRight: false },
//   { id: 'country', label: 'Country', alignRight: false },
//   { id: 'city', label: 'City', alignRight: false },
//   { id: '' },
// ];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone Number', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'region', label: 'Region', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'city', label: 'City', alignRight: false },
  { id: 'zip', label: 'Zip Code', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ManagementUserList() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    const load = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('/api/users', {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });
      console.log(response.data);
      setUserList(response.data.filter((r) => r.role.role_name !== 'admin'));
    };
    load();
  }, []);
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteUser = async (userId) => {
    const res = await axios.delete(`/api/users/delete/${userId}`, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    enqueueSnackbar('A user has been deleted successfully!');

    const deleteUser = userList.filter((user) => user.id !== userId);
    setSelected([]);
    setUserList(deleteUser);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = userList.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setUserList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_AUTH.registerUnprotected}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Add new admin
            </Button>
          }
        />

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, username, region, email, address, country, city } = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(id)} />
                        </TableCell> */}
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt={row?.first_name} src={row.profile_url || null} sx={{ mr: 2 }} />
                          <Typography variant="subtitle2" noWrap>
                            {row.first_name} {row.last_name}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{username}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{row.phone_number}</TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="left">{region}</TableCell>
                        <TableCell align="left">{country}</TableCell>
                        <TableCell align="left">{city}</TableCell>
                        <TableCell align="left">{row.zip_code}</TableCell>

                        <TableCell align="right">
                          <UserMoreMenu onDelete={() => handleDeleteUser(id)} id={id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter(
      (_user) =>
        _user.first_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.last_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
