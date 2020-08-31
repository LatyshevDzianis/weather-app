import React, { useEffect } from "react";
import { Container, Typography, Card, CardContent } from "@material-ui/core";
import { getUserLocationBegin, getUserLocationSuccess } from "./actions";
import { Provider, useDispatch } from "react-redux";

import store from "./store";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Typography align="center" variant="h2" gutterBottom>
              Weather App
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Provider>
  );
}

export default App;
