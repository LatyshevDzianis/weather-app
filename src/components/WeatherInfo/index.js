import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import AdditionalInfo from "./AdditionalInfo";

const fahrengeitToCelsius = (value) => {
  const convertedValue = Math.round((value - 32) / 1.8);
  return convertedValue < 0 ? `${convertedValue}°C` : `+${convertedValue}°C`;
};

const imgStyles = {
  marginLeft: "0.5em",
};

const WeatherInfo = () => {
  const weather = useSelector((state) => state.weather);
  const icon = useSelector((state) => state.weather.icon);
  let imageUrl = null;

  if (icon && icon.length < 5) {
    imageUrl = `https://openweathermap.org/img/w/${icon}.png`;
  } else {
    imageUrl = icon;
  }

  return (
    <Box mt={4}>
      <Typography variant="h4">{`${weather && weather.city}, ${
        weather && weather.country
      }`}</Typography>
      <Typography display="inline" variant="h3">
        {weather && fahrengeitToCelsius(weather.temperature)}
        {", "}
        {weather && weather.weather}
        {weather.icon && <img style={imgStyles} src={imageUrl} alt="..." />}
      </Typography>
      <AdditionalInfo />
    </Box>
  );
};

export default WeatherInfo;
