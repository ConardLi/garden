'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Pagination,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import styled from '@emotion/styled';

const StyledContainer = styled(Box)`
  padding: 24px;
`;

const GlassCard = styled(Box)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

interface User {
  _id: string;
  openId: string;
  nickname: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}

interface FilterParams {
  search: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    search: '',
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      queryParams.append('page', pagination.page.toString());
      queryParams.append('pageSize', pagination.pageSize.toString());

      const response = await fetch(`/api/admin/users?${queryParams}`);
      const data = await response.json();

      setUsers(data.items);
      setPagination(prev => ({
        ...prev,
        total: data.total,
        pages: Math.ceil(data.total / prev.pageSize),
      }));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (_: any, newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (key: keyof FilterParams) => (event: any) => {
    setFilters(prev => ({ ...prev, [key]: event.target.value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <GlassCard mb={3}>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Search by nickname"
            variant="outlined"
            value={filters.search}
            onChange={handleFilterChange('search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box overflow="auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px' }}>Avatar</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Nickname</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Open ID</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Created At</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={{ padding: '12px' }}>
                    <Avatar src={user.avatarUrl} alt={user.nickname} />
                  </td>
                  <td style={{ padding: '12px' }}>{user.nickname}</td>
                  <td style={{ padding: '12px' }}>{user.openId}</td>
                  <td style={{ padding: '12px' }}>
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {new Date(user.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={pagination.pages}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </GlassCard>
    </StyledContainer>
  );
}
