import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/zh-cn';
import { TimestampState, ConversionResult } from '../types';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.locale('zh-cn');

export const useTimestamp = () => {
  const [state, setState] = useState<TimestampState>({
    timestamp: '',
    dateTime: null,
  });

  const convertTimestamp = useCallback((timestamp: string): ConversionResult | null => {
    if (!timestamp) return null;

    try {
      // 处理10位和13位时间戳
      const isMillis = timestamp.length === 13;
      const timestampNum = parseInt(timestamp, 10);
      const date = dayjs(isMillis ? timestampNum : timestampNum * 1000);

      if (!date.isValid()) return null;

      return {
        'Unix时间戳（秒）': Math.floor(date.valueOf() / 1000).toString(),
        '毫秒时间戳': date.valueOf().toString(),
        'ISO 8601格式': date.toISOString(),
        '本地时间': date.format('YYYY-MM-DD HH:mm:ss'),
        'UTC时间': date.utc().format('YYYY-MM-DD HH:mm:ss [UTC]'),
        '相对时间': date.fromNow(),
      };
    } catch (error) {
      return null;
    }
  }, []);

  const convertDateTime = useCallback((date: Date | null): ConversionResult | null => {
    if (!date) return null;

    try {
      const dayjsDate = dayjs(date);

      if (!dayjsDate.isValid()) return null;

      return {
        'Unix时间戳（秒）': Math.floor(dayjsDate.valueOf() / 1000).toString(),
        '毫秒时间戳': dayjsDate.valueOf().toString(),
        'ISO 8601格式': dayjsDate.toISOString(),
        '本地时间': dayjsDate.format('YYYY-MM-DD HH:mm:ss'),
        'UTC时间': dayjsDate.utc().format('YYYY-MM-DD HH:mm:ss [UTC]'),
        '相对时间': dayjsDate.fromNow(),
      };
    } catch (error) {
      return null;
    }
  }, []);

  const setTimestamp = useCallback((value: string) => {
    setState(prev => ({ ...prev, timestamp: value }));
  }, []);

  const setDateTime = useCallback((value: Date | null) => {
    setState(prev => ({ ...prev, dateTime: value }));
  }, []);

  const getCurrentTimestamp = useCallback(() => {
    const now = Math.floor(Date.now() / 1000).toString();
    setTimestamp(now);
  }, [setTimestamp]);

  return {
    state,
    setTimestamp,
    setDateTime,
    convertTimestamp,
    convertDateTime,
    getCurrentTimestamp,
  };
};
