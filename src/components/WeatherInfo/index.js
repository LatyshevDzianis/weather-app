import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import weather from "../../reducers/weather";

const convertToCelsius = (value) => {
  value = Math.round(value - 273.15);
  return value < 0 ? `${value}°C` : `+${value}°C`;
};

const WeatherInfo = () => {
  const weather = useSelector((state) => state.weather);

  return (
    <Box mt={4}>
      <Typography variant="h4">{`${weather && weather.city}, ${
        weather && weather.country
      }`}</Typography>
      <Typography variant="h3">
        {weather && convertToCelsius(weather.temperature)}
        {", "}
        {weather && weather.weather}
      </Typography>
    </Box>
  );
};

export default WeatherInfo;
