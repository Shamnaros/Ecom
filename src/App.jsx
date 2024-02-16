import {  useState, useEffect  } from 'react'
import * as React from 'react';
import AppRouter from './router'; // Import the router
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/AddBusiness';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


function App() {
  // const [value, setValue] = React.useState();

  // React.useEffect(() => {
  // }, [value]); 

  return (
    <div>
      {/* Include other app components if needed */}
      <AppRouter />
      {/* <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
          setValue(newValue);
        }}>
          <BottomNavigationAction href='/' label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction href='/favorites' label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction href='/add' label="Add" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper> */}
    </div>
  );
}

export default App;