import styled from '@emotion/styled';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getRequest } from 'apps/webapp/axios';
import React, { useEffect, useState } from 'react';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { getPublishmentRequests, publishBasket } from '@basketo/web-utils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.default,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.background.default,
    fontSize: '0.9rem',
  },
}));

const PublishRequests = () => {
  const [publishRequests, setPublishRequests] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    severity: '',
    message: '',
  });

  useEffect(() => {
    const getPublishmentRequestsApiCall = async () => {
      const publishRequests = await getPublishmentRequests();
      setPublishRequests(publishRequests);
    };
    getPublishmentRequestsApiCall();
  }, []);

  const handlePublishRequest = async (id) => {
    try {
      const newPublishBasket = await publishBasket(id);
      if (newPublishBasket) {
        setAlert({
          open: true,
          severity: 'success',
          message: newPublishBasket?.data?.message,
        });
      }
    } catch (err) {
      console.log(err);
      setAlert({
        open: true,
        severity: 'error',
        message: err?.response?.data?.message,
      });
    }
  };

  return (
    <>
      <Snackbar
        onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
        open={alert.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={alert?.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
      <TableContainer>
        <Table sx={{ minWidth: { sm: 650 }, margin: '1rem' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Basket Name</StyledTableCell>
              <StyledTableCell>Creator Name</StyledTableCell>
              <StyledTableCell>Creator Address</StyledTableCell>
              <StyledTableCell>Mail Id</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishRequests?.map((publishRequest) => (
              <TableRow key={publishRequest}>
                <StyledTableCell>{publishRequest.name}</StyledTableCell>
                <StyledTableCell>
                  {publishRequest.creator[0].firstName}{' '}
                  {publishRequest.creator[0].lastName}
                </StyledTableCell>
                <StyledTableCell>
                  {publishRequest.creator[0].userAddress}
                </StyledTableCell>
                <StyledTableCell>
                  {publishRequest.creator[0].email}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="text"
                    sx={{ mt: 2 }}
                    startIcon={<PublishedWithChangesIcon />}
                    onClick={() => handlePublishRequest(publishRequest._id)}
                  >
                    Publish
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PublishRequests;
