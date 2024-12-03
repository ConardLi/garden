import React from 'react';
import { Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { StyledCard } from '../styles';

interface DateTimeSectionProps {
  dateTime: Date | null;
  onDateTimeChange: (date: Date | null) => void;
}

const DateTimeSection: React.FC<DateTimeSectionProps> = ({
  dateTime,
  onDateTimeChange,
}) => {
  return (
    <StyledCard>
      <Typography variant="h6" component="h2" gutterBottom>
        日期时间
      </Typography>

      <DateTimePicker
        label="选择日期时间"
        value={dateTime ? dayjs(dateTime) : null}
        onChange={(newValue) => onDateTimeChange(newValue ? newValue.toDate() : null)}
        slotProps={{
          textField: {
            fullWidth: true,
            placeholder: 'YYYY-MM-DD HH:mm:ss',
            sx: { cursor: 'pointer' }
          },
          field: {
            readOnly: false
          },
          openPickerButton: {
            sx: { mr: 1 }
          }
        }}
        format="YYYY-MM-DD HH:mm:ss"
      />
    </StyledCard>
  );
};

export default DateTimeSection;
