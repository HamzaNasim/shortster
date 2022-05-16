import React, { useEffect } from "react";
import CustomColumnMenu from "../components/BasicTable";
import Loading from "../components/Loading";
import { baseUrl } from "../constants/apiConstant";
import { api } from "../helper/api";
import Navbar from "./Navbar";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { SearchOffRounded } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "6ch",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

function Record() {
  const [SearchedData, setSearchedData] = React.useState("");
  const [noRecords, setNoRecords] = React.useState(false);
  const [rowData, setRowData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    return () => {
      setSearchedData("");
    };
  }, []);

  useEffect(() => {
    setNoRecords(false);
    setLoading(true);
    GetAllRecords();
    console.log(rowData);
    setLoading(false);
  }, [SearchedData]);

  async function GetAllRecords() {
    const response = await api(
      `${baseUrl}/${SearchedData}/states/`,
      "GET",
      null
    );
    if (response.Status == 200) {
      const data = await response.data;
      setRowData(data);
    } else if (response.Status == 404) {
      setNoRecords(true);
      const status = response.Status;
    } else {
      setNoRecords(true);
      const status = response.Status;
      alert("Error: " + status + "{ Bad Request }");
    }
  }

  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
  const searchFunc = debounce((value) => {
    setSearchedData(value);
  });
  return (
    <div>
      <div
        style={{
          margin: "auto",
          backgroundColor: "aliceblue",
          border: "1px solid lightblue",
          borderRadius: "7px",
          width: "30%",
          marginTop: "40px",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            style={{ width: "100%" }}
            onChange={(e) => {
              searchFunc(e.target.value);
            }}
            placeholder="Search by Short Code"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
      {noRecords ? (
        <h1 style={{ color: "GrayText", textAlign: "center" }}>
          Not Available !
        </h1>
      ) : (
        <CustomColumnMenu rowData={rowData && rowData} loading={loading} />
      )}
    </div>
  );
}

export default Record;
