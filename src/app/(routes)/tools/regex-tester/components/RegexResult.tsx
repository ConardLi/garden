import { FC, useMemo } from 'react';
import {
  Stack,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface RegexFlags {
  global: boolean;
  ignoreCase: boolean;
  multiline: boolean;
  dotAll: boolean;
  unicode: boolean;
  sticky: boolean;
}

interface RegexResultProps {
  pattern: string;
  text: string;
  flags: RegexFlags;
}

const RegexResult: FC<RegexResultProps> = ({ pattern, text, flags }) => {
  const matches = useMemo(() => {
    if (!pattern || !text) return [];

    try {
      const flagString = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key]) => {
          switch (key) {
            case 'global': return 'g';
            case 'ignoreCase': return 'i';
            case 'multiline': return 'm';
            case 'dotAll': return 's';
            case 'unicode': return 'u';
            case 'sticky': return 'y';
            default: return '';
          }
        })
        .join('');

      const regex = new RegExp(pattern, flagString);
      const results = [];
      let match;

      if (flags.global) {
        while ((match = regex.exec(text)) !== null) {
          results.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
          });
        }
      } else {
        match = regex.exec(text);
        if (match) {
          results.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
          });
        }
      }

      return results;
    } catch (error) {
      return [];
    }
  }, [pattern, text, flags]);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight="medium">
        匹配结果
      </Typography>
      
      {matches.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>序号</TableCell>
                <TableCell>完整匹配</TableCell>
                <TableCell>分组</TableCell>
                <TableCell>位置</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches.map((match, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{match.fullMatch}</TableCell>
                  <TableCell>
                    {match.groups.length > 0
                      ? match.groups.map((group, i) => (
                          <div key={i}>{`$${i + 1}: ${group}`}</div>
                        ))
                      : '无分组'}
                  </TableCell>
                  <TableCell>{match.index}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="text.secondary">
          {pattern ? '无匹配结果' : '请输入正则表达式'}
        </Typography>
      )}
    </Stack>
  );
};

export default RegexResult; 