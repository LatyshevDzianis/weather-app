import React from "react";
import { Box, Typography } from "@material-ui/core";

const Error = ({ error }) => {
  return (
    <Box mt={3}>
      <Typography align="center" variant="h4">
        {error}
      </Typography>
    </Box>
  );
};

export default Error;
