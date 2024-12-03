export interface TimestampState {
  timestamp: string;
  dateTime: Date | null;
}

export interface ConversionResult {
  'Unix时间戳（秒）': string;
  '毫秒时间戳': string;
  'ISO 8601格式': string;
  '本地时间': string;
  'UTC时间': string;
  '相对时间': string;
}
