import {  useState, useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import busLogo from './assets/bus.jpeg'
import viteLogo from '/vite.svg'
import Axios from "axios";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/AddBusiness';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import {Box} from '@mui/material';
// function refreshMessages() {
//   const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

//   return Array.from(new Array(50)).map(
//     () => messageExamples[getRandomInt(messageExamples.length)],
//   );
// }

function Forms() {
  const [count, setCount] = React.useState("0");
  const [value, setValue] = React.useState(2);
  const ref = React.useRef(null);
  // const [messages, setMessages] = React.useState(() => refreshMessages());
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');

      // Check for successful response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON data
      const data = await response.json();

      // Validate data is an array
      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format: data is not an array');
      }

      // Set products state
      setProducts(data);
    } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching data:', error);
      // Consider displaying an error message to the user
    }
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [isDeleting, setIsDeleting] = useState(false);
  function handleRemove(productid) {
    console.log(`count${count}`);
    console.log(`productid${productid}`);
    const { _id } = productid; 

    const axiosInstance = Axios.create({
      baseURL: 'http://localhost:3001/api', // Base API URL
      headers: { 'Content-Type': 'application/json' }, // Default content type
    });
  
    return axiosInstance
      .delete(`/delete/${productid}`) // Construct DELETE request URL
      .then((response) => {
        if (response.status === 200) {
          console.log('Product deleted successfully');
          fetchData();
          // Handle successful deletion (e.g., update state, refresh data, navigate)
          // Return a value or signal success for parent component handling
          return true; // Or your preferred success indicator
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        // Handle errors gracefully (e.g., display error message)
        return false; // Or your preferred error signal
      });
  }

  React.useEffect(() => {
  }, [value]);

  return (
    <>
      <Box sx={{ width: '100%'}}>
      <CssBaseline />
      <Box sx={{ width: '100%' }}>
      <Stack spacing={2} alignItems="stretch">
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction href='/' label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction href='/favorites' label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction href='/add' label="Add" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
    </>
  )
}

// const messageExamples = [
//   {
//     primary: 'Brunch this week?',
//     secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
//     person: '/static/images/avatar/5.jpg',
//   },
//   {
//     primary: 'Birthday Gift',
//     secondary: `Do you have a suggestion for a good present for John on his work
//       anniversary. I am really confused & would love your thoughts on it.`,
//     person: '/static/images/avatar/1.jpg',
//   },
//   {
//     primary: 'Recipe to try',
//     secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
//     person: '/static/images/avatar/2.jpg',
//   },
//   {
//     primary: 'Yes!',
//     secondary: 'I have the tickets to the ReactConf for this year.',
//     person: '/static/images/avatar/3.jpg',
//   },
//   {
//     primary: "Doctor's Appointment",
//     secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
//     person: '/static/images/avatar/4.jpg',
//   },
//   {
//     primary: 'Discussion',
//     secondary: `Menus that are generated by the bottom app bar (such as a bottom
//       navigation drawer or overflow menu) open as bottom sheets at a higher elevation
//       than the bar.`,
//     person: '/static/images/avatar/5.jpg',
//   },
//   {
//     primary: 'Summer BBQ',
//     secondary: `Who wants to have a cookout this weekend? I just got some furniture
//       for my backyard and would love to fire up the grill.`,
//     person: '/static/images/avatar/1.jpg',
//   },
// ];

export default Forms
