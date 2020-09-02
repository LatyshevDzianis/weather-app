import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { fetchOpenWeatherByCity } from "../../actions/openWeather";
import { fetchWeatherStackByCity } from "../../actions/weatherStack";
import { useDispatch } from "react-redux";

const CityInput = () => {
  const [cityInput, setCityInput] = useState("");
  const [apiSelect, setApiSelect] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setApiSelect(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (apiSelect === "openWeather") {
      dispatch(fetchOpenWeatherByCity({ q: cityInput }));
    } else {
      dispatch(fetchWeatherStackByCity({ query: cityInput, units: "s" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={handleInputChange}
            value={cityInput}
            label="Enter the city"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="api-select">Select an API</InputLabel>
          <Select
            onChange={handleSelectChange}
            fullWidth={true}
            labelId="api-select"
            id="api-select"
            value={apiSelect}
          >
            <MenuItem value="openWeather">OpenWeather</MenuItem>
            <MenuItem value="weatherStack">WeatherStack</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={true}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CityInput;
