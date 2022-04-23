import React, { ElementType } from "react";

export interface CronSelectProps<
  SelectProps = Record<string, any>,
  OptionProps = Record<string, any>
> {
  className?: string;
  Select?: ElementType;
  Option?: ElementType;
  selectProps?: SelectProps;
  optionProps?: OptionProps;
}

export const CronSelect = <SelectProps, OptionProps>({
  className = "react-cron-select",
  Select = "select",
  Option = "option",
  selectProps,
  optionProps,
}: CronSelectProps<SelectProps, OptionProps>) => {
  const periods = ["year", "month", "week", "day", "hour", "minute"];

  return (
    <div className={className}>
      <Select {...selectProps} defaultValue={periods[0]}>
        {periods.map((period) => (
          <Option {...optionProps} value={period}>
            {period}
          </Option>
        ))}
      </Select>
    </div>
  );
};
