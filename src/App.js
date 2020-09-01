import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpenWeatherByCoords } from "./actions/openWeather";
import WeatherInfo from "./components/WeatherInfo/index";
import CityInput from "./components/CityInput";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    dispatch(fetchOpenWeatherByCoords());
  }, []);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography align="center" variant="h2" paragraph={true}>
            Weather App
          </Typography>
          <CityInput />
          {!error ? (
            loading ? (
              <Box mt={4}>
                <Typography align="center" variant="h4">
                  Loading...
                </Typography>
              </Box>
            ) : (
              <WeatherInfo />
            )
          ) : (
            <Box mt={3}>
              <Typography align="center" variant="h4">
                {error}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
