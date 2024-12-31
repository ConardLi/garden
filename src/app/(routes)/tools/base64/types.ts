export type CodecMode = "encode" | "decode";

export interface CodecResult {
  success: boolean;
  result?: string;
  error?: string;
} 