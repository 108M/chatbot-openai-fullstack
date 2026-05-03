import React, { useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Square, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { apiClient } from '../lib/apiClient';
import { toast } from 'sonner';

export type RecordingState = 'idle' | 'recording' | 'processing' | 'error';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function VoiceRecorder({ onTranscript, disabled = false }: VoiceRecorderProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_RECORDING_TIME = 300; // 5 minutes in seconds

  const requestMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });
      setHasPermission(true);
      return stream;
    } catch (error) {
      console.error('Error solicitando permiso para el micrófono:', error);
      setHasPermission(false);
      toast.error('No se pudo acceder al micrófono. Verifica los permisos.');
      return null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (disabled) return;

    const stream = await requestMicrophonePermission();
    if (!stream) return;

    streamRef.current = stream;
    chunksRef.current = [];

    // Create MediaRecorder with appropriate MIME type
    const mimeType = MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : MediaRecorder.isTypeSupported('audio/mp4')
      ? 'audio/mp4'
      : 'audio/wav';

    try {
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        await processRecording(audioBlob);
      };

      mediaRecorder.start(1000); // Collect data every second
      setRecordingState('recording');
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= MAX_RECORDING_TIME) {
            stopRecording();
            return prev;
          }
          return newTime;
        });
      }, 1000);

    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
      setRecordingState('error');
      toast.error('Error al iniciar la grabación');
    }
  }, [disabled, requestMicrophonePermission]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.stop();
      setRecordingState('processing');

      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [recordingState]);

  const processRecording = useCallback(async (audioBlob: Blob) => {
    try {
      setRecordingState('processing');

      const result = await apiClient.transcribeAudio(audioBlob);

      if (result.text && result.text.trim()) {
        onTranscript(result.text);
        toast.success('Audio transcrito correctamente');
        setRecordingState('idle');
      } else {
        toast.error('No se pudo transcribir el audio');
        setRecordingState('error');
      }
    } catch (error) {
      console.error('Error al transcribir el audio:', error);
      toast.error('Error al transcribir el audio');
      setRecordingState('error');
    } finally {
      setRecordingTime(0);
    }
  }, [onTranscript]);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setRecordingState('idle');
    setRecordingTime(0);
    chunksRef.current = [];
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getButtonContent = () => {
    switch (recordingState) {
      case 'idle':
        return (
          <>
            <Mic className="h-4 w-4" />
          </>
        );
      case 'recording':
        return (
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 min-w-0">
            <MicOff className="h-4 w-4 text-red-500 animate-pulse flex-shrink-0" />
          </div>
        );
      case 'processing':
        return (
          <Loader2 className="h-4 w-4 animate-spin" />
        );
      case 'error':
        return (
          <MicOff className="h-4 w-4 text-red-500" />
        );
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (recordingState === 'idle') {
      startRecording();
    } else if (recordingState === 'recording') {
      stopRecording();
    } else if (recordingState === 'error') {
      setRecordingState('idle');
    }
  };

  return (
    <div className="flex items-center gap-2 h-11 md:h-12 min-w-[48px] md:max-w-[90px] flex-nowrap overflow-hidden justify-center">
      <Button
        type="button"
        variant={recordingState === 'recording' ? 'destructive' : 'outline'}
        size="icon"
        onClick={handleClick}
        disabled={disabled || recordingState === 'processing'}
        className={`transition-all duration-200 ${
          recordingState === 'recording'
            ? 'animate-pulse bg-red-500 hover:bg-red-600'
            : ''
        }`}
        title={
          recordingState === 'idle'
            ? ''
            : recordingState === 'recording'
            ? 'Detener grabación'
            : recordingState === 'processing'
            ? 'Procesando...'
            : 'Error - Reintentar'
        }
      >
        {getButtonContent()}
      </Button>

      {/* Botón de cancelar grabación eliminado */}
    </div>
  );
}