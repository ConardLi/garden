declare module 'browser-image-compression' {
  interface Options {
    maxSizeMB?: number
    maxWidthOrHeight?: number
    useWebWorker?: boolean
    maxIteration?: number
    exifOrientation?: number
    onProgress?: (progress: number) => void
  }

  export default function imageCompression(
    file: File,
    options: Options
  ): Promise<File>
}

declare module 'react-dropzone' {
  import { ComponentProps } from 'react'

  interface DropzoneProps {
    accept?: { [key: string]: string[] }
    multiple?: boolean
    onDrop?: (acceptedFiles: File[]) => void
  }

  export function useDropzone(props?: DropzoneProps): {
    getRootProps: () => ComponentProps<any>
    getInputProps: () => ComponentProps<any>
    isDragActive: boolean
  }
} 