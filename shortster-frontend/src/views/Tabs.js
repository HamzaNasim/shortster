import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LinkIcon from "@mui/icons-material/Link";
import HttpIcon from "@mui/icons-material/Http";
import DnsIcon from "@mui/icons-material/Dns";

export default function Tabs({ ScreenConfig }) {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "-webkit-fill-available",
        top: "0",
        margin: "0 auto",
      }}
    >
      <BottomNavigation
        showLabels
        value={ScreenConfig[0]}
        onChange={(event, newValue) => {
          setValue(newValue);
          ScreenConfig[1](newValue);
        }}
      >
        <BottomNavigationAction label="Default Short Url" icon={<LinkIcon />} />
        <BottomNavigationAction label="Custom Short Url" icon={<HttpIcon />} />
        <BottomNavigationAction label="All Records" icon={<DnsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
