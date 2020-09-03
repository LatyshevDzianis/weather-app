import React from "react";

import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

const AdditionalInfo = () => {
  const weather = useSelector((state) => state.weather);

  return (
    <>
      <Typography>Pressure: {weather.pressure} hPa</Typography>
      <Typography>Humidity: {weather.humidity} %</Typography>
      <Typography>Wind speed: {weather.windSpeed} mile/hour</Typography>
    </>
  );
};

export default AdditionalInfo;
