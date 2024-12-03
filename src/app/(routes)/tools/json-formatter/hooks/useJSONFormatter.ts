import { useState, useCallback } from 'react';

interface JSONFormatterState {
  input: string;
  output: string;
  error: string | null;
  indentSize: number;
}

export const useJSONFormatter = () => {
  const [state, setState] = useState<JSONFormatterState>({
    input: '',
    output: '',
    error: null,
    indentSize: 2
  });

  const formatJSON = useCallback(() => {
    try {
      if (!state.input.trim()) {
        setState(prev => ({ ...prev, output: '', error: null }));
        return;
      }

      const parsed = JSON.parse(state.input);
      const formatted = JSON.stringify(parsed, null, state.indentSize);
      setState(prev => ({ ...prev, output: formatted, error: null }));
    } catch (err) {
      setState(prev => ({ ...prev, error: (err as Error).message }));
    }
  }, [state.input, state.indentSize]);

  const setInput = useCallback((value: string) => {
    setState(prev => ({ ...prev, input: value }));
  }, []);

  const setIndentSize = useCallback((size: number) => {
    setState(prev => ({ ...prev, indentSize: size }));
  }, []);

  const handleCopy = useCallback(() => {
    if (state.output) {
      navigator.clipboard.writeText(state.output);
    }
  }, [state.output]);

  return {
    ...state,
    setInput,
    setIndentSize,
    formatJSON,
    handleCopy
  };
}; 