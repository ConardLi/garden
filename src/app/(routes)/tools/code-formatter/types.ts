export type Language = 
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'yaml';

export interface LanguageOption {
  value: Language;
  label: string;
  parser: string;
} 