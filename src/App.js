import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid, createTheme, ThemeProvider } from '@mui/material';
import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

  const theme = createTheme({
    breakpoints: {
      values: {
        sm: 600,
        md: 960,
      },
    },
  });
  
  const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const  [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      })
    }, [])

    useEffect(() => {
      const filteredPlaces = places.filter((place)=> Number(place.rating) > rating)
      setFilteredPlaces(filteredPlaces)
    }, [places, rating]);

    useEffect(() => {
      if(bounds.sw && bounds.ne) {
        setIsLoading(true);

        getWeatherData(coordinates.lat, coordinates.lng)
          .then((data)=>{
            setWeatherData(data)
          })

        getPlacesData(type, bounds.sw, bounds.ne)
          .then((data)=>{            
            setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
        }) 
      }       
  }, [type, bounds, coordinates.lat, coordinates.lng ]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3}
        style={{ width: '100%' }}
      >
        <Grid item xs={12} md={4}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
