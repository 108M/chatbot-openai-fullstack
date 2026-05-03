import React, { useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Props {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_EXTENSIONS = ['.txt', '.pdf', '.png', '.jpg', '.jpeg'];

export function FileUploadButton({ onFileSelected, disabled = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return 'El archivo es demasiado grande. Máximo 50MB.';
    }

    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return `Tipo de archivo inválido. Permitidos: ${ALLOWED_EXTENSIONS.join(', ')}`;
    }

    return null;
  };

  const handleFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    onFileSelected(file);
  }, [onFileSelected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.pdf,.png,.jpg,.jpeg"
        onChange={handleInputChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleClick}
        disabled={disabled}
        title="Subir archivo"
      >
        <Upload className="h-4 w-4" />
      </Button>
    </>
  );
}
