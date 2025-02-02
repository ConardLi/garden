"use client";

import { Box, useTheme } from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
import { EasingConfig, EasingPoint } from "../types";

interface BezierEditorProps {
  config: EasingConfig;
  onChange: (config: EasingConfig) => void;
}

export default function BezierEditor({ config, onChange }: BezierEditorProps) {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [draggingPoint, setDraggingPoint] = useState<"p1" | "p2" | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const [hoveredPoint, setHoveredPoint] = useState<"p1" | "p2" | null>(null);

  // 转换坐标系（贝塞尔曲线坐标到画布坐标）
  const toCanvasCoords = useCallback((point: EasingPoint) => ({
    x: point.x * canvasSize.width,
    y: (1 - point.y) * canvasSize.height,
  }), [canvasSize.width, canvasSize.height]);

  // 转换坐标系（画布坐标到贝塞尔曲线坐标）
  const toBezierCoords = useCallback((x: number, y: number) => ({
    x: Math.max(0, Math.min(1, x / canvasSize.width)),
    y: Math.max(-2, Math.min(2, 1 - y / canvasSize.height)),
  }), [canvasSize.width, canvasSize.height]);

  // 检查点是否在控制点附近
  const isNearPoint = useCallback((x: number, y: number, point: EasingPoint) => {
    const coords = toCanvasCoords(point);
    const distance = Math.sqrt(
      Math.pow(x - coords.x, 2) + Math.pow(y - coords.y, 2)
    );
    return distance < 15;
  }, [toCanvasCoords]);

  // 绘制贝塞尔曲线和控制点
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // 绘制网格
    ctx.strokeStyle = theme.palette.divider;
    ctx.lineWidth = 1;
    
    // 网格线
    for (let i = 0; i <= 10; i++) {
      // 垂直线
      const x = (canvasSize.width * i) / 10;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize.height);
      if (i === 0 || i === 10) {
        ctx.strokeStyle = theme.palette.text.secondary;
        ctx.lineWidth = 1.5;
      } else {
        ctx.strokeStyle = theme.palette.divider;
        ctx.lineWidth = 1;
      }
      ctx.stroke();

      // 水平线
      const y = (canvasSize.height * i) / 10;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize.width, y);
      if (i === 0 || i === 10) {
        ctx.strokeStyle = theme.palette.text.secondary;
        ctx.lineWidth = 1.5;
      } else {
        ctx.strokeStyle = theme.palette.divider;
        ctx.lineWidth = 1;
      }
      ctx.stroke();
    }

    // 绘制控制线
    const p0 = { x: 0, y: canvasSize.height };
    const p3 = { x: canvasSize.width, y: 0 };
    const p1 = toCanvasCoords(config.p1);
    const p2 = toCanvasCoords(config.p2);

    ctx.strokeStyle = theme.palette.text.secondary;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    
    // 起点控制线
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();

    // 终点控制线
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.stroke();

    ctx.setLineDash([]);

    // 绘制贝塞尔曲线
    ctx.strokeStyle = theme.palette.primary.main;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    ctx.stroke();

    // 绘制控制点
    const drawControlPoint = (point: EasingPoint, isHovered: boolean) => {
      const coords = toCanvasCoords(point);
      const radius = isHovered ? 8 : 6;

      ctx.beginPath();
      ctx.arc(coords.x, coords.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? theme.palette.primary.dark : theme.palette.primary.main;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawControlPoint(config.p1, hoveredPoint === 'p1');
    drawControlPoint(config.p2, hoveredPoint === 'p2');
  }, [config, canvasSize, theme, toCanvasCoords, hoveredPoint]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;
      setCanvasSize({ width: rect.width, height: rect.height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isNearPoint(x, y, config.p1)) {
      setDraggingPoint("p1");
    } else if (isNearPoint(x, y, config.p2)) {
      setDraggingPoint("p2");
    }
  }, [config.p1, config.p2, isNearPoint]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 更新悬停状态
    if (isNearPoint(x, y, config.p1)) {
      setHoveredPoint("p1");
    } else if (isNearPoint(x, y, config.p2)) {
      setHoveredPoint("p2");
    } else {
      setHoveredPoint(null);
    }

    // 处理拖动
    if (draggingPoint) {
      const newPoint = toBezierCoords(x, y);
      onChange({
        ...config,
        [draggingPoint]: newPoint,
      });
    }
  }, [config, draggingPoint, isNearPoint, onChange, toBezierCoords]);

  const handleMouseUp = useCallback(() => {
    setDraggingPoint(null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setDraggingPoint(null);
    setHoveredPoint(null);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 300,
        position: "relative",
        bgcolor: "background.paper",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          cursor: draggingPoint ? "grabbing" : hoveredPoint ? "grab" : "default",
          touchAction: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </Box>
  );
}
