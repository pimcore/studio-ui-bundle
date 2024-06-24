import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const DateTimeConfig = (props: {children: React.ReactNode}): React.JSX.Element => {
  dayjs.extend(customParseFormat)
  dayjs.extend(advancedFormat)
  dayjs.extend(weekday)
  dayjs.extend(localeData)
  dayjs.extend(weekOfYear)
  dayjs.extend(weekYear)
  dayjs.extend(utc)
  dayjs.extend(timezone)

  return (
    <>
      {props.children}
    </>
  )
}
