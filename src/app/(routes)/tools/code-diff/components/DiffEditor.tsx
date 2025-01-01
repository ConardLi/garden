import { FC } from 'react';
import { Paper } from '@mui/material';
import { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";
import type { Language } from '../types';

interface DiffEditorProps {
  original: string;
  modified: string;
  language: Language;
  onOriginalChange: (value: string) => void;
  onModifiedChange: (value: string) => void;
}

const DiffEditor: FC<DiffEditorProps> = ({
  original,
  modified,
  language,
  onOriginalChange,
  onModifiedChange,
}) => {
  const getMonacoLanguage = (lang: Language): string => {
    switch (lang) {
      case 'javascript':
        return 'javascript';
      case 'typescript':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'markdown':
        return 'markdown';
      case 'yaml':
        return 'yaml';
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      case 'csharp':
        return 'csharp';
      case 'go':
        return 'go';
      case 'rust':
        return 'rust';
      case 'php':
        return 'php';
      case 'ruby':
        return 'ruby';
      case 'sql':
        return 'sql';
      case 'xml':
        return 'xml';
      case 'shell':
        return 'shell';
      case 'powershell':
        return 'powershell';
      case 'dockerfile':
        return 'dockerfile';
      case 'graphql':
        return 'graphql';
      case 'less':
        return 'less';
      case 'scss':
        return 'scss';
      default:
        return 'plaintext';
    }
  };

  return (
    <Paper elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
      <MonacoDiffEditor
        height="600px"
        original={original}
        modified={modified}
        language={getMonacoLanguage(language)}
        theme="vs-dark"
        onMount={(editor) => {
          // 监听原始代码和修改后代码的变化
          editor.getOriginalEditor().onDidChangeModelContent(() => {
            onOriginalChange(editor.getOriginalEditor().getValue());
          });
          editor.getModifiedEditor().onDidChangeModelContent(() => {
            onModifiedChange(editor.getModifiedEditor().getValue());
          });
        }}
        options={{
          renderSideBySide: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          bracketPairColorization:{
            enabled: true
          },
          diffWordWrap: 'on',
          readOnly: false,
          originalEditable: true,
        }}
      />
    </Paper>
  );
};

export default DiffEditor; 