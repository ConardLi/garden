import { FC, useRef } from 'react';
import {
  Stack,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import Editor, { type Monaco } from "@monaco-editor/react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { Language } from '../types';

interface CodeEditorProps {
  input: string;
  output: string;
  error: string | null;
  language: Language;
  onInputChange: (value: string) => void;
  onFormat: () => void;
}

const CodeEditor: FC<CodeEditorProps> = ({input,
  output,
  error,
  language,
  onInputChange,
  onFormat,
}) => {
  const editorRef = useRef<any>(null);

  const handleFormat = async () => {
    if (editorRef.current) {
      try {
        // 使用 Monaco 的格式化命令
        await editorRef.current.getAction('editor.action.formatDocument').run();
        const formattedValue = editorRef.current.getValue();
        onInputChange(formattedValue);
        onFormat();
      } catch (err) {
        console.error('格式化失败:', err);
      }
    }
  };

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
    <Stack spacing={2}>
      <Paper elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <Editor
          height="500px"
          defaultLanguage={getMonacoLanguage(language)}
          language={getMonacoLanguage(language)}
          value={input}
          onChange={(value) => onInputChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            tabSize: 2,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            bracketPairColorization: true,
            autoIndent: 'advanced',
            detectIndentation: true,
            insertSpaces: true,
            trimAutoWhitespace: true,
            renderWhitespace: 'selection',
            wordWrap: 'on',
            wrappingIndent: 'indent',
          }}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </Paper>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={handleFormat}
          disabled={!input.trim()}
          fullWidth
        >
          格式化代码
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Stack>
  );
};

export default CodeEditor; 