import { EChartsOption } from "echarts";

export type ChartType = string;

export interface ChartData {
  dimensions: string[];
  source: Record<string, any>[];
}

export interface AxisConfig {
  show?: boolean;
  name?: string;
  nameLocation?: "start" | "middle" | "end";
  type?: "value" | "category";
  position?: "top" | "bottom" | "left" | "right";
  axisLabel?: {
    show?: boolean;
    rotate?: number;
    margin?: number;
  };
  axisLine?: {
    show?: boolean;
  };
  axisTick?: {
    show?: boolean;
  };
  data?: string[];
  boundaryGap?: boolean;
}

export interface LegendConfig {
  show?: boolean;
  type?: string;
  orient?: "horizontal" | "vertical";
  align?: "auto" | "left" | "right";
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  padding?: number | number[];
  itemGap?: number;
  itemWidth?: number;
  itemHeight?: number;
  selectedMode?: boolean | "single" | "multiple";
  textStyle?: {
    color?: string;
    fontStyle?: "normal" | "italic" | "oblique";
    fontWeight?: "normal" | "bold" | "bolder" | "lighter" | number;
    fontFamily?: string;
    fontSize?: number;
    lineHeight?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number | number[];
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
  };
}

export interface DatasetOption {
  dimensions: string[];
  source: Record<string, any>[];
}

export interface RadarIndicator {
  name: string;
  max?: number;
  min?: number;
  color?: string;
}

export interface RadarOption {
  indicator: RadarIndicator[];
  shape?: "polygon" | "circle";
  radius?: number | string;
  startAngle?: number;
  splitNumber?: number;
  scale?: boolean;
  silent?: boolean;
  axisLine?: {
    show?: boolean;
    lineStyle?: {
      color?: string;
      width?: number;
      type?: "solid" | "dashed" | "dotted";
    };
  };
  splitLine?: {
    show?: boolean;
    lineStyle?: {
      color?: string;
      width?: number;
      type?: "solid" | "dashed" | "dotted";
    };
  };
}

export interface ChartConfig extends Omit<EChartsOption, "dataset"> {
  title?: {
    show?: boolean;
    text?: string;
    subtext?: string;
    textStyle?: {
      fontSize?: number;
      color?: string;
      fontWeight?: "normal" | "bold" | "bolder" | "lighter" | number;
    };
    subtextStyle?: {
      fontSize?: number;
      color?: string;
      fontWeight?: "normal" | "bold" | "bolder" | "lighter" | number;
    };
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  legend?: LegendConfig;
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  animation?: boolean;
  animationDuration?: number;
  animationEasing?:
    | "linear"
    | "quadraticIn"
    | "quadraticOut"
    | "quadraticInOut"
    | "cubicIn"
    | "cubicOut"
    | "cubicInOut"
    | "quarticIn"
    | "quarticOut"
    | "quarticInOut"
    | "quinticIn"
    | "quinticOut"
    | "quinticInOut"
    | "sinusoidalIn"
    | "sinusoidalOut"
    | "sinusoidalInOut"
    | "exponentialIn"
    | "exponentialOut"
    | "exponentialInOut"
    | "circularIn"
    | "circularOut"
    | "circularInOut"
    | "elasticIn"
    | "elasticOut"
    | "elasticInOut"
    | "backIn"
    | "backOut"
    | "backInOut"
    | "bounceIn"
    | "bounceOut"
    | "bounceInOut";
  grid?: {
    show?: boolean;
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
    containLabel?: boolean;
  };
  backgroundColor?: string;
  color?: string[];
  visualMap?: {
    show?: boolean;
    type?: "continuous" | "piecewise";
    min?: number;
    max?: number;
    inRange?: {
      color?: string[];
      symbolSize?: number[];
      colorLightness?: number[];
      colorAlpha?: number[];
      opacity?: number[];
    };
  };
  tooltip?: {
    show?: boolean;
    trigger?: "item" | "axis";
    formatter?: string;
    axisPointer?: {
      type?: "line" | "shadow" | "cross";
      animation?: boolean;
    };
  };
  watermark?: {
    show?: boolean;
    text?: string;
    color?: string;
    fontSize?: number;
    opacity?: number;
    density?: number;
    rotate?: number;
  };
  dataset?: DatasetOption;
}

export interface ConfigPanelProps {
  config: ChartConfig;
  onChange: (newConfig: ChartConfig) => void;
  chartType?: ChartType;
}
