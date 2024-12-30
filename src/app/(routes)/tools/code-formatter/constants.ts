import type { LanguageOption } from './types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'javascript', label: 'JavaScript', parser: 'babel' },
  { value: 'typescript', label: 'TypeScript', parser: 'typescript' },
  { value: 'html', label: 'HTML', parser: 'html' },
  { value: 'css', label: 'CSS', parser: 'css' },
  { value: 'json', label: 'JSON', parser: 'json' },
  { value: 'markdown', label: 'Markdown', parser: 'markdown' },
  { value: 'yaml', label: 'YAML', parser: 'yaml' },
]; 