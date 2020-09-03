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
import Loader from "./components/Loader";
import Error from "./components/Error";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    if (!localStorage.getItem("persist:weather")) {
      dispatch(fetchOpenWeatherByCoords());
    }
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Box m={3}>
        <Card>
          <CardContent>
            <Typography align="center" variant="h2" paragraph={true}>
              Weather App
            </Typography>
            <CityInput />
            {!error ? (
              loading ? (
                <Loader />
              ) : (
                <WeatherInfo />
              )
            ) : (
              <Error error={error} />
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
