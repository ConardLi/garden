export interface ShadowConfig {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export type ShadowPreset = {
  name: string;
  config: ShadowConfig;
};
