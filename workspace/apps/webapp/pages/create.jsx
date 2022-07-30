import { Paper } from '@mui/material';
import React, { useState } from 'react';
import Create from '../Components/Create';
import Navbar from '../Components/Navbar';

const create = () => {
  return (
    <Paper variant="window">
      <Navbar />
      <div style={{ paddingTop: '70px' }}>
        <Create />
      </div>
    </Paper>
  );
};

export default create;
