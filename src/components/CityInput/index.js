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
import { fetchWeatherApiByCity } from "../../actions/weatherApi";
import { useDispatch } from "react-redux";

const CityInput = () => {
  const [cityInfo, setCityInfo] = useState({ text: "", error: false });
  const [apiInfo, setApiInfo] = useState({ text: "", error: false });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (e.target.value.trim()) {
      setCityInfo({ text: e.target.value, error: false });
    } else {
      setCityInfo({ text: e.target.value.trim(), error: true });
    }
  };

  const handleSelectChange = (e) => {
    if (e.target.value) {
      setApiInfo({ text: e.target.value, error: false });
    } else {
      setApiInfo({ text: e.target.value, error: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cityInfo.text && apiInfo.text) {
      if (apiInfo.text === "openWeather") {
        dispatch(
          fetchOpenWeatherByCity({ q: cityInfo.text, units: "imperial" })
        );
      } else {
        dispatch(fetchWeatherApiByCity({ q: cityInfo.text }));
      }
    } else {
      !cityInfo.text && setCityInfo({ ...cityInfo, error: true });
      !apiInfo.text && setApiInfo({ ...apiInfo, error: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12} sm={4}>
          <TextField
            error={cityInfo.error}
            onChange={handleInputChange}
            value={cityInfo.text}
            label="Enter the city"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="api-select">Select an API</InputLabel>
          <Select
            error={apiInfo.error}
            onChange={handleSelectChange}
            fullWidth={true}
            labelId="api-select"
            value={apiInfo.text}
          >
            <MenuItem value="openWeather">OpenWeather</MenuItem>
            <MenuItem value="weatherApi">Weather API</MenuItem>
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
