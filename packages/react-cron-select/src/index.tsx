import { CronFields, parseExpression, fieldsToExpression } from "cron-parser";
import React, { ChangeEvent, ElementType, useState } from "react";
import { CRON_PERIODS, CRON_FIELDS, CronPeriod, INITIAL_CRON_FIELDS } from "./constants";

export interface CronSelectProps<SelectProps = any, OptionProps = Record<string, any>> {
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
  const isNativeSelect = Select === "select";
  const interval = parseExpression("* * * * * *");
  const [period, setPeriod] = useState<CronPeriod>();
  const [fields, setFields] = useState<CronFields>(interval.fields);
  const [expression, setExpression] = useState<string>();
  const [error, setError] = useState<Error | null>();

  const handlePeriodChange = (e: ChangeEvent<any>) => {
    setPeriod(e.target.value);
  };

  const handleFieldChange = (e: ChangeEvent<any>) => {
    setError(null);

    const fieldValue = (
      isNativeSelect
        ? Array.from((e.target as HTMLSelectElement).selectedOptions).map((option) => option.value)
        : e.target.value
    ).map((v: string) => parseInt(v));

    const newFields = { ...fields, [e.target.name]: fieldValue };

    setFields(newFields);

    try {
      setExpression(fieldsToExpression(newFields).stringify());
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <div className={className}>
      <Select
        {...selectProps}
        key="period"
        name="period"
        onChange={handlePeriodChange}
        defaultValue=""
      >
        <Option {...optionProps} key="empty" value="" disabled></Option>
        {Object.keys(CRON_PERIODS).map((periodOptionKey) => (
          <Option {...optionProps} key={periodOptionKey} value={periodOptionKey}>
            {periodOptionKey}
          </Option>
        ))}
      </Select>

      {period &&
        CRON_PERIODS[period].map((fieldOptionKey) => (
          <Select
            {...selectProps}
            key={`${period}_${fieldOptionKey}`}
            name={fieldOptionKey}
            onChange={handleFieldChange}
            defaultValue={[]}
            multiple
          >
            <Option {...optionProps} key="empty" value="" disabled></Option>
            {Object.keys(CRON_FIELDS[fieldOptionKey]).map((fieldOptionValue) => (
              <Option {...optionProps} key={fieldOptionValue} value={fieldOptionValue}>
                {fieldOptionValue}
              </Option>
            ))}
          </Select>
        ))}

      <div>{error ? error?.message : expression}</div>
    </div>
  );
};
