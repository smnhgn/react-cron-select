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

const PERIODS: CronField[] = ["month", "dayOfMonth", "dayOfWeek", "hour", "minute", "second"];

const DEFAULT_PERIOD: CronField = "month";

type CronField = keyof CronFields;

export interface CronSelectProps {}

export const CronSelect = ({}: CronSelectProps) => {
  const [period, setPeriod] = useState<CronField>(DEFAULT_PERIOD);
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
    setPeriod(DEFAULT_PERIOD);
    setAnchorEl(null);
  };

  const handleChangePeriod = (e: SyntheticEvent<any>, newValue: CronField) => {
    setPeriod(newValue);
  };

  const handleChangeField = (cronField: CronField) => {
    const defaultValue = DEFAULT_INTERVAL.fields[cronField];

    return (e: SyntheticEvent<any>, newValue: CronFields[typeof cronField]) => {
      setFields({ ...fields, [cronField]: newValue.length === 0 ? defaultValue : newValue });
    };
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
            {PERIODS.map((p) => (
              <Tab key={p} value={p} label={p} />
            ))}
          </Tabs>

          <ToggleButtonGroup
            value={
              fields[period].length === DEFAULT_INTERVAL.fields[period].length ? [] : fields[period]
            }
            onChange={handleChangeField(period)}
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(6, 1fr)`,
            }}
          >
            {DEFAULT_INTERVAL.fields[period].map((value) => (
              <ToggleButton key={value} value={value}>
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Popover>
    </Box>
  );
};
