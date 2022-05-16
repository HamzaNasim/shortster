import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel } from "@mui/material";
import { api } from "../helper/api";
import { baseUrl } from "../constants/apiConstant";


export default function DefaultUrl({ CurrentScreen }) {
  const [shortAvailable, setShortAvailable] = React.useState(true);
  const [shortcopied, setShortcoppied] = React.useState(false);
  const [LongUrl, setLongUrl] = React.useState("");
  const [ShortUrl, setShortUrl] = React.useState("");
  const [dataArray, setDataArray] = React.useState("");

  async function GenerateShortUrl() {
    if (LongUrl) {
      const response = await api(`${baseUrl}/url`, "POST", {
        longUrl: `${LongUrl}`,
      });
      setDataArray(response?.data);
      const status = response.Status;
      const data = response.data;
      console.log(status);
      setShortAvailable(!shortAvailable);
      setShortUrl(data?.shortUrl);
    }
  }
  console.log(dataArray);
  function CopyData() {
    navigator.clipboard.writeText(ShortUrl);
    setShortcoppied(true);
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
      Shortster Url Converter
      </Typography>
      <InputLabel style={{ fontWeight: "bold", color: "black" }}>
        Long Url
      </InputLabel>
      <span style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="longurl"
          name="url"
          autoFocus
          onChange={(e) => {
            setLongUrl(e.target.value);
          }}
        />
        <Button
          onClick={GenerateShortUrl}
          disabled={!shortAvailable && LongUrl}
          variant="contained"
          style={{
            fontWeight: "400",
            padding: "0px",
            marginTop: "18px",
            marginLeft: "8px",
            height: "50px",
          }}
        >
          Generate Short Url
        </Button>
      </span>
      <InputLabel style={{ fontWeight: "bold", color: "black" }}>
        Short Url
      </InputLabel>
      <TextField
        margin="normal"
        required
        disabled={shortAvailable}
        value={shortAvailable ? null : ShortUrl}
        fullWidth
        id="shorturl"
        name="url"
        autoFocus
      />
      <Button
        onClick={CopyData}
        type="submit"
        // onClick={getData}
        disabled={shortAvailable}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Copy Short URL
      </Button>
      <h6
        style={{
          marginTop: "0px",
          fontSize: "10px",
          display: shortcopied && LongUrl ? "block" : "none",
        }}
      >
        Coppied:<a href={LongUrl} target="_blank">{ShortUrl}</a>
      </h6>
    </Container>
  );
}
