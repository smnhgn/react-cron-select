import { CronFields } from "cron-parser";

export type CronPeriod = "year" | "month" | "week" | "day" | "hour" | "minute";

export const CRON_PERIODS: Record<CronPeriod, readonly (keyof CronFields)[]> = {
  year: ["month", "dayOfMonth", "dayOfWeek", "hour", "minute", "second"],
  month: ["dayOfMonth", "dayOfWeek", "hour", "minute", "second"],
  week: ["dayOfWeek", "hour", "minute", "second"],
  day: ["hour", "minute", "second"],
  hour: ["minute", "second"],
  minute: ["second"],
} as const;

export const INITIAL_CRON_FIELDS: CronFields = {
  second: [],
  minute: [],
  hour: [],
  dayOfWeek: [],
  dayOfMonth: [],
  month: [],
} as const;

// prettier-ignore
export const CRON_FIELDS: CronFields = {
  second: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  ],
  minute: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  ],
  hour: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ],
  dayOfWeek: [
    0, 1, 2, 3, 4, 5, 6, 7
  ],
  dayOfMonth: [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31
  ],
  month: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ],
} as const;
