import React, { useState, useRef } from 'react';
import { Volume2, Download, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { apiClient } from '../lib/apiClient';

const VOICES = [
  { voice_id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Mujer)' },
  { voice_id: '9BWtsMINqrJLrRacOk9x', name: 'Aria (Hombre)' },
  { voice_id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger (Hombre)' },
  { voice_id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura (Mujer)' },
  { voice_id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie (Hombre)' },
  { voice_id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Hombre)' },
];

interface Props {
  initialText?: string;
}

export function AudioPlayer({ initialText = '' }: Props) {
  const [text, setText] = useState(initialText);
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0]?.voice_id ?? 'EXAVITQu4vr4xnSDxMaL');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to convert to speech');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setAudioUrl(null);

    try {
      const result = await apiClient.generateAudio(text.trim(), selectedVoice);
      if (result.audio_url) {
        setAudioUrl(apiClient.getAudioUrl(result.audio_url));
      } else if (result.filename) {
        setAudioUrl(apiClient.getAudioUrl(result.filename));
      } else {
        throw new Error('No audio URL returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate audio');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'generated-audio.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 rounded-lg bg-surface-container-lowest space-y-4 text-on-surface border border-outline-variant">
      <div className="space-y-2">
        <Label htmlFor="tts-text">Texto a Voz</Label>
        <Textarea
          id="tts-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Introduce texto..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="voice-select">Voz</Label>
        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
          <SelectTrigger id="voice-select">
            <SelectValue placeholder="Selecciona una voz" />
          </SelectTrigger>
          <SelectContent>
            {VOICES.map((voice) => (
              <SelectItem key={voice.voice_id} value={voice.voice_id}>
                {voice.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !text.trim()}
        className="w-full bg-primary text-on-primary hover:bg-primary-fixed-variant border-none"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4 mr-2" />
            Generar Audio
          </>
        )}
      </Button>

      {error && (
        <div className="p-2 bg-error-container/20 border border-error/30 text-error rounded text-sm">
          {error}
        </div>
      )}

      {audioUrl && (
        <div className="space-y-2">
          <audio
            ref={audioRef}
            src={audioUrl}
            controls
            className="w-full"
          />
          <Button
            variant="outline"
            onClick={handleDownload}
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Download MP3
          </Button>
        </div>
      )}
    </div>
  );
}
