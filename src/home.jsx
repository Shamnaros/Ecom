import {  useState, useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import busLogo from './assets/bus.jpeg'
import viteLogo from '/vite.svg'
import Axios from "axios";
import './App.css'
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
import {Box} from '@mui/material';
// function refreshMessages() {
//   const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

//   return Array.from(new Array(50)).map(
//     () => messageExamples[getRandomInt(messageExamples.length)],
//   );
// }

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function Home() {
  const [value, setValue] = React.useState(0);
//   const ref = React.useRef(null);
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
  

  // useEffect(() => {
  //   fetchData(); 
  // }, []);
 
  // const fetchData = () => {
  //   Axios.get('http://localhost:3001/api/products').then((response) => {
  //    console.log(response)
  //     // if (!response.ok) {
  //     //   throw new Error(`HTTP error! status: ${response.status}`);
  //     // }
  //     const data = response.json();
  //     setProducts(data);
  //   });
  // };

  const [isDeleting, setIsDeleting] = useState(false);
  function handleRemove(productid) {
    // console.log(`count${count}`);
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
      <Box sx={{ width: '100%', marginLeft: '-200px', marginRight: '-200px', marginBottom: '100px', marginTop: '25px' }} >
      <CssBaseline />
      <Grid container spacing={{ xs: "auto", md: 60 }} rowSpacing={{md: 7}} columns={{ xs: "auto", sm: 8, md: 12 }}>
      {products.map((product) => (
          <Grid item xs={"auto"} sm={1} md={4} key={product}>
            <Paper
      sx={{
        p: 2,
        margin: 'auto',
        width: 500,
        height: 200,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img sx={{
                margin: 'auto',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
            }} alt="complex" src={busLogo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              {product.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
              Category: {product.category} | Stock: {product.stock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {product._id}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              <Link
  component="button"
  variant="body2"
  underline="hover"
  color="inherit"
  onClick={() => {
    // setCount(product._id);
    handleRemove(product._id);
    console.info("I'm a button.");
  }}
>
                Remove
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            ${product.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
          </Grid>
        ))}
      </Grid>
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

export default Home
