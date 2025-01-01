export type Language = 
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'yaml'
  | 'python'
  | 'java'
  | 'c'
  | 'cpp'
  | 'csharp'
  | 'go'
  | 'rust'
  | 'php'
  | 'ruby'
  | 'sql'
  | 'xml'
  | 'shell'
  | 'powershell'
  | 'dockerfile'
  | 'graphql'
  | 'less'
  | 'scss';

export interface LanguageOption {
  value: Language;
  label: string;
  parser?: string;
} 