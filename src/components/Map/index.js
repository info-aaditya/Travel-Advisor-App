import React from 'react'
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import { LocationOnOutlined } from "@material-ui/icons"
import Rating from '@material-ui/lab/Rating'
import useStyles from './styles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'Google Keys' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={50}
        options={''}
        onChange={e=>{
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index)  => (
          <div
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={index}
          >
            {
              !isDesktop ? (
                <LocationOnOutlined  color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        ))}

        {weatherData?.list?.length && weatherData.list.map((data, index) => (
          <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
            <img 
              src = {
                `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
              } alt="" height="70px"
            />
          </div>
        ))}

      </GoogleMapReact>
    </div>
  )
}

export default Map;
