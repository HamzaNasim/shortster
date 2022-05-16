import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "./Loading";

export default function BasicTable({ rowData, loading }) {
  
  const truncateString = (value, length) =>
    value && value.length > length
      ? value.substring(0, length) + " ..."
      : value;

  return loading ? (
    <Loading />
  ) : (
    <TableContainer
      style={{
        display: "flex",
        width: "85%",
        margin: "auto",
        marginTop: "60px",
        backgroundColor: "aliceblue",
        marginBottom: "30px",
      }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: "cornflowerblue" }}>
            <TableCell style={{ color: "white" }}>Orignal Url</TableCell>
            <TableCell style={{ color: "white" }} align="center">
              Short Url
            </TableCell>
            <TableCell style={{ color: "white" }} align="center">
               Code
            </TableCell>
            <TableCell style={{ color: "white" }} align="center">
              Hits
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              CreatedAt
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              Last Access
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData && rowData?.length > 0 ? (
            rowData?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {truncateString(row.longUrl, 40)}
                </TableCell>
                <TableCell align="center">{row.shortUrl}</TableCell>
                <TableCell align="center">{row.shortCode}</TableCell>
                <TableCell align="center">{row.click}</TableCell>
                <TableCell align="center">{
                  new Date(row.createdAt).toLocaleString("en-US")}</TableCell>
                <TableCell align="left">
                {  new Date(row.updatedAt).toLocaleString("en-US")}  
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {truncateString(rowData?.longUrl, 40)}
              </TableCell>
              <TableCell align="center">{rowData?.shortUrl}</TableCell>
              <TableCell align="center">{rowData?.shortCode}</TableCell>
              <TableCell align="center">{rowData?.click}</TableCell>
              <TableCell align="left">{rowData?.updatedAt}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
