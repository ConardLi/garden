export type UUIDVersion = "v1" | "v4" | "v5";

export interface UUIDOptions {
  version: UUIDVersion;
  uppercase: boolean;
  removeDashes: boolean;
  count: number;
  namespace?: string;
  name?: string;
}

export type UUIDNamespace = keyof typeof UUID_NAMESPACES; 