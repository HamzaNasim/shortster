import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { InputLabel } from "@mui/material";
import { api } from "../helper/api";
import { baseUrl } from "../constants/apiConstant";

const theme = createTheme();

export default function CustomUrl({ CurrentScreen }) {
  const [shortAvailable2, setShortAvailable2] = React.useState(true);
  const [LongUrl2, setLongUrl2] = React.useState("");
  const [ShortCode2, setShortCode2] = React.useState("");

  async function Submit() {
    if (LongUrl2 && ShortCode2) {
      const response = await api(`${baseUrl}/desireUrl`, "POST", {
        longUrl: `${LongUrl2}`,
        shortCode: `${ShortCode2}`,
      });
      if (response.Status == 200) {
        const data = response.data;
        alert("Success: " + response.Status + "{Sucessfully Sumitted}");
      } else {
        const status = response.Status;
        alert("Error: " + status + "{Short Code Accupied}");
      }
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Typography
        component="h1"
        variant="h6"
        style={{
          textAlign: "center",
          display: "Flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "80px",
        }}
      >
        Custom Url Converter
      </Typography>
      <InputLabel style={{ fontWeight: "bold", color: "black" }}>
        Long Url
      </InputLabel>
      <TextField
        margin="normal"
        required
        fullWidth
        id="longurl"
        name="url"
        autoFocus
        onChange={(e) => {
          setLongUrl2(e.target.value);
        }}
      />
      <InputLabel style={{ fontWeight: "bold", color: "black" }}>
        Short Code
      </InputLabel>
      <TextField
        margin="normal"
        required
        fullWidth
        id="shortCode"
        name="shortCode"
        autoFocus
        onChange={(e) => {
          setShortCode2(e.target.value);
        }}
      />
      <Button
        onClick={Submit}
        type="submit"
        style={{
          marginTop: "0px",
        }}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
      <Grid container></Grid>
    </Container>
  );
}
