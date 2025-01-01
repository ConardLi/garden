import type { Language } from './types';

export const formatCode = async (code: string, language: Language): Promise<string> => {
  try {
    // 使用 Monaco Editor 的格式化功能
    const worker = await (window as any).monaco.editor.getModel(
      // @ts-ignore
      window.monaco.Uri.parse(`file:///main.${language}`)
    );
    
    if (!worker) {
      throw new Error('格式化服务不可用');
    }

    const formatted = await worker.getValue();
    const edits = await worker.getFormattingEdits();
    
    if (edits && edits.length > 0) {
      worker.pushEditOperations(
        [],
        edits,
        () => null
      );
      return worker.getValue();
    }
    
    return code;
  } catch (error) {
    console.error('格式化失败:', error);
    throw error;
  }
}; 