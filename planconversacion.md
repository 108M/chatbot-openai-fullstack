## **Plan: Implementar Conversación por Voz con la IA**

### **FASE 1: Configuración inicial**

1. **Actualizar dependencias:**
   - Asegúrate de que tienes las siguientes dependencias instaladas:
     - **Frontend:**
       - `react-speech-recognition` (para convertir voz a texto en el cliente).
       - `react-speech-kit` (opcional, para TTS en frontend si no quieres usar el backend para la respuesta de voz).
     - **Backend:**
       - `elevenlabs` (ya está configurado en tu backend para TTS).
       - `speech_recognition` o cualquier otra librería de STT (Speech-to-Text) si decides procesar la voz en el backend.

2. **Configurar permisos de micrófono:**
   - Asegúrate de que el frontend solicita permisos para acceder al micrófono del usuario.
   - Ya tienes una implementación básica en el componente [`VoiceRecorder`](frontend/src/components/VoiceRecorder.tsx).

---

### **FASE 2: Captura de voz en el frontend**

3. **Extender el componente `VoiceRecorder`:**
   - Modifica el componente [`VoiceRecorder`](frontend/src/components/VoiceRecorder.tsx) para capturar la voz del usuario y convertirla a texto usando `react-speech-recognition` o la API de reconocimiento de voz del navegador.
   - Envía el texto transcrito al backend a través del WebSocket o el endpoint `/ws/chat`.

   **Ejemplo de integración con `react-speech-recognition`:**

   ```tsx
   // filepath: frontend/src/components/VoiceRecorder.tsx
   import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

   export function VoiceRecorder({ onTranscript, disabled = false }: VoiceRecorderProps) {
     const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

     const startListening = () => {
       if (!browserSupportsSpeechRecognition) {
         toast.error('Tu navegador no soporta reconocimiento de voz.');
         return;
       }
       SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
     };

     const stopListening = () => {
       SpeechRecognition.stopListening();
       onTranscript(transcript);
       resetTranscript();
     };

     return (
       <div>
         <Button onClick={listening ? stopListening : startListening} disabled={disabled}>
           {listening ? 'Detener' : 'Hablar'}
         </Button>
         <p>{transcript}</p>
       </div>
     );
   }
   ```

4. **Enviar el texto transcrito al backend:**
   - Usa el WebSocket ya configurado en [`useChat`](frontend/src/hooks/useChat.ts) para enviar el texto transcrito como un mensaje al backend.

---

### **FASE 3: Procesar la entrada de voz en el backend**

5. **Actualizar el WebSocket `/ws/chat`:**
   - En el endpoint `/ws/chat` en [`main.py`](backend/main.py), procesa el texto recibido desde el cliente como un mensaje normal.
   - Genera la respuesta de la IA usando el modelo `gpt-4o-mini` (ya configurado en tu backend).

6. **Generar respuesta de voz:**
   - Usa el endpoint `/generate-audio` ya implementado en [`main.py`](backend/main.py) para convertir la respuesta de texto de la IA en un archivo de audio.
   - Devuelve la URL del archivo de audio al cliente a través del WebSocket.

   **Ejemplo de modificación en `/ws/chat`:**

   ```py
   // filepath: backend/main.py
   @app.websocket("/ws/chat")
   async def websocket_chat(websocket: WebSocket):
       await websocket.accept()
       user_id = None
       session_id = None

       try:
           while True:
               data = await websocket.receive_json()
               message = data.get("message")
               session_id = data.get("session_id")
               token = data.get("token")

               # Procesar mensaje con OpenAI
               history = get_session_messages(session_id, user_id)
               response = openai_client.chat.completions.create(
                   model="gpt-4o-mini",
                   messages=history,
                   stream=False,
               )
               full_reply = response.choices[0].message.content

               # Generar respuesta de voz
               audio_response = await generate_audio(AudioRequest(text=full_reply))

               # Enviar respuesta de texto y voz al cliente
               await websocket.send_json({
                   "type": "response",
                   "text": full_reply,
                   "audio_url": audio_response["audio_url"]
               })
       except Exception as e:
           logger.error(f"WebSocket error: {e}")
   ```

---

### **FASE 4: Reproducir la respuesta de voz en el frontend**

7. **Actualizar el componente `ChatWindow`:**
   - Modifica el componente [`ChatWindow`](frontend/src/components/ChatWindow.tsx) para reproducir la respuesta de voz de la IA.
   - Usa el componente [`AudioPlayer`](frontend/src/components/AudioPlayer.tsx) para reproducir el archivo de audio recibido.

   **Ejemplo de integración:**

   ```tsx
   // filepath: frontend/src/components/ChatWindow.tsx
   export function ChatWindow({ messages, onSendMessage, onAddMessage, isLoading, isConnected, sessionId, userId }: Props) {
     const audioRef = useRef<HTMLAudioElement | null>(null);

     const handlePlayAudio = (audioUrl: string) => {
       if (audioRef.current) {
         audioRef.current.src = audioUrl;
         audioRef.current.play();
       }
     };

     return (
       <div>
         {/* Mensajes */}
         {messages.map((message) => (
           <div key={message.id}>
             <p>{message.content}</p>
             {message.audio_url && (
               <Button onClick={() => handlePlayAudio(message.audio_url)}>Reproducir</Button>
             )}
           </div>
         ))}
         <audio ref={audioRef} />
       </div>
     );
   }
   ```

---

### **FASE 5: Mejoras y validaciones**

8. **Validaciones en el frontend:**
   - Asegúrate de que el usuario tiene permisos para usar el micrófono.
   - Maneja errores de transcripción (por ejemplo, si no se detecta voz o el texto transcrito está vacío).
   - Añade un indicador visual mientras se graba o procesa la voz.

9. **Validaciones en el backend:**
   - Asegúrate de que el archivo de audio recibido no exceda el tamaño máximo permitido.
   - Valida que el usuario esté autenticado antes de procesar la transcripción o generar audio.

10. **Optimización:**
    - Implementa un sistema de reconexión automática para el WebSocket en caso de desconexión.
    - Usa un sistema de caché para almacenar respuestas de voz generadas previamente y evitar generar el mismo audio varias veces.

---

---

Con este plan, podrás implementar la funcionalidad de conversación por voz en tu aplicación, aprovechando las capacidades ya existentes en tu código y añadiendo las nuevas funcionalidades necesarias.
