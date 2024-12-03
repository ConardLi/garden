"use client";

import React, { useMemo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Container } from "./styles";
import TimestampSection from "./components/TimestampSection";
import DateTimeSection from "./components/DateTimeSection";
import ResultCard from "./components/ResultCard";
import { useTimestamp } from "./hooks/useTimestamp";

const TimestampConverter: React.FC = () => {
  const {
    state,
    setTimestamp,
    setDateTime,
    convertTimestamp,
    convertDateTime,
    getCurrentTimestamp,
  } = useTimestamp();

  const timestampResult = useMemo(() => {
    return convertTimestamp(state.timestamp);
  }, [state.timestamp, convertTimestamp]);

  const dateTimeResult = useMemo(() => {
    return convertDateTime(state.dateTime);
  }, [state.dateTime, convertDateTime]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <TimestampSection
          timestamp={state.timestamp}
          onTimestampChange={setTimestamp}
          onGetCurrent={getCurrentTimestamp}
        />
        <ResultCard title="时间戳转换结果" result={timestampResult} />
        <DateTimeSection
          dateTime={state.dateTime}
          onDateTimeChange={setDateTime}
        />
        <ResultCard title="日期时间转换结果" result={dateTimeResult} />
      </Container>
    </LocalizationProvider>
  );
};

export default TimestampConverter;
