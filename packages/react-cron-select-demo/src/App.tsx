import React, { ComponentProps } from "react";
import { CronSelect } from "react-cron-select";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

function App() {
  return (
    <div>
      <CronSelect />
      <Divider sx={{ my: 2 }} />
      <CronSelect<SelectProps, MenuItemProps>
        Select={Select}
        Option={MenuItem}
        selectProps={{ size: "small" }}
      />
    </div>
  );
}

export default App;
