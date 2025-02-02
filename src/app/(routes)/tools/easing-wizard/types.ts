export interface EasingPoint {
  x: number;
  y: number;
}

export interface EasingConfig {
  p1: EasingPoint;
  p2: EasingPoint;
  duration: number;
  direction: 'horizontal' | 'vertical' | 'diagonal';
}

export interface AnimationConfig {
  duration: number;
  direction: 'horizontal' | 'vertical' | 'diagonal';
  repeat: number;
}

export type EasingPreset = {
  name: string;
  config: EasingConfig;
};
