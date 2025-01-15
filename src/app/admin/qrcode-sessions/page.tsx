"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import { get } from "@/utils/fe/request";

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

interface QRCodeSession {
  _id: string;
  qrcodeId: string;
  createdAt: Date;
  expireTime: Date;
  status: "pending" | "success" | "expired";
  userId?: string;
  userInfo?: {
    nickname: string;
    avatarUrl: string;
  };
}

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  pages: number;
}

interface FilterParams {
  search: string;
  status: string;
}

export default function QRCodeSessionsPage() {
  const [sessions, setSessions] = useState<QRCodeSession[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    search: "",
    status: "",
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await get("/api/admin/qrcode-sessions", {
        search: filters.search,
        status: filters.status,
        page: pagination.page,
        pageSize: pagination.pageSize,
      });

      setSessions(data.items);
      setPagination((prev) => ({
        ...prev,
        total: data.total,
        pages: Math.ceil(data.total / prev.pageSize),
      }));
    } catch (error) {
      console.error("Failed to fetch QR code sessions:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handlePageChange = (_: any, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (key: keyof FilterParams) => (event: any) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        QR Code Sessions
      </Typography>

      <GlassCard mb={3}>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Search"
            variant="outlined"
            value={filters.search}
            onChange={handleFilterChange("search")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={handleFilterChange("status")}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box overflow="auto">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px" }}>
                  QR Code ID
                </th>
                <th style={{ textAlign: "left", padding: "12px" }}>Status</th>
                <th style={{ textAlign: "left", padding: "12px" }}>
                  Created At
                </th>
                <th style={{ textAlign: "left", padding: "12px" }}>
                  Expire Time
                </th>
                <th style={{ textAlign: "left", padding: "12px" }}>User</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id}>
                  <td style={{ padding: "12px" }}>{session.qrcodeId}</td>
                  <td style={{ padding: "12px" }}>{session.status}</td>
                  <td style={{ padding: "12px" }}>
                    {new Date(session.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {new Date(session.expireTime).toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {session.userInfo ? session.userInfo.nickname : "-"}
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
