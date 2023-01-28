import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getRequest } from 'apps/webapp/axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { addAdminToken } from 'apps/webapp/features/userAddress';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getRequest(
        `/admin/login?email=${email}&password=${password}`
      );
      if (res) {
        dispatch(
          addAdminToken({
            adminToken: res.data.token,
          })
        );
        Router.push('/admin/dashboard/publish-requests');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ddd',
        padding: '2rem',
        borderRadius: '10px',
        minWidth: '350px',
      }}
    >
      <h3 style={{ textAlign: 'center' }}>Admin Login</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.5rem',
          flexDirection: 'column',
        }}
      >
        <TextField
          label="Email address"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          sx={{ marginTop: '0.5rem' }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
