import { CronFields, parseExpression, fieldsToExpression } from "cron-parser";
import React, { useState, MouseEvent, SyntheticEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const DEFAULT_INTERVAL = parseExpression("* * * * * *");

type CronField = keyof CronFields;

export interface CronSelectProps {}

export const CronSelect = ({}: CronSelectProps) => {
  const [period, setPeriod] = useState<CronField>("month");
  const [fields, setFields] = useState<CronFields>(DEFAULT_INTERVAL.fields);
  const [expression, setExpression] = useState<string>(DEFAULT_INTERVAL.stringify(true));
  const [error, setError] = useState<Error | null>();
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "react-cron-select-popover" : undefined;

  const handleOpen = (e: MouseEvent<HTMLInputElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePeriod = (e: SyntheticEvent<any>, newValue: CronField) => {
    setPeriod(newValue);
  };

  const handleChangeMonth = (e: SyntheticEvent<any>, newValue: CronFields["month"]) => {
    setFields({ ...fields, month: newValue });
  };

  const handleChangeDayOfMonth = (e: SyntheticEvent<any>, newValue: CronFields["dayOfMonth"]) => {
    setFields({ ...fields, dayOfMonth: newValue });
  };

  useEffect(() => {
    try {
      setExpression(fieldsToExpression(fields).stringify(true));
    } catch (err) {
      setError(err as Error);
    }
  }, [fields]);

  return (
    <Box>
      <TextField aria-describedby={id} value={expression} onClick={handleOpen} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box>
          <Tabs value={period} onChange={handleChangePeriod}>
            <Tab value="month" label="month" />
            <Tab value="dayOfMonth" label="month" />
            <Tab value="dayOfWeek" label="dayOfWeek" />
            <Tab value="hour" label="hour" />
            <Tab value="minute" label="minute" />
            <Tab value="second" label="second" />
          </Tabs>

          {period === "month" && (
            <ToggleButtonGroup value={fields.month} onChange={handleChangeMonth}>
              {DEFAULT_INTERVAL.fields.month.map((monthValue) => (
                <ToggleButton key={monthValue} value={monthValue}>
                  {monthValue}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}

          {period === "dayOfMonth" && (
            <ToggleButtonGroup value={fields.dayOfMonth} onChange={handleChangeDayOfMonth}>
              {DEFAULT_INTERVAL.fields.dayOfMonth.map((dayOfMonthValue) => (
                <ToggleButton key={dayOfMonthValue} value={dayOfMonthValue}>
                  {dayOfMonthValue}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        </Box>
      </Popover>
    </Box>
  );
};
