import React, { useEffect } from "react";
import { Container, Typography, Card, CardContent } from "@material-ui/core";
import { getUserCoords } from "./actions/coords";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.coords);

  useEffect(() => {
    dispatch(getUserCoords());
  }, []);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography align="center" variant="h2" gutterBottom>
            Weather App
          </Typography>
          <p>{`Latitude: ${coords.latitude}, longitude: ${coords.longitude}`}</p>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
