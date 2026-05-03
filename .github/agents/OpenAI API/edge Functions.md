
# Edge Functions

## Integración de OpenAI en Supabase Edge Functions

### 1. Introducción y Arquitectura

**¿Qué son las Edge Functions?**
Las Edge Functions son funciones serverless (sin servidor) escritas en TypeScript/JavaScript que se ejecutan en el "borde" (Edge) de la red, es decir, en servidores distribuidos globalmente lo más cerca posible del usuario final.

Las Edge Functions siguen la idea de CDNs (Redes de Distribución de Contenido), que son redes de servidores repartidos por todo el planeta.
![](edge-computing.png)
**¿Por qué usar Edge Functions para OpenAI?**
No debemos llamar a OpenAI directamente desde el Frontend (Navegador/App Móvil) por dos razones críticas:

1.  **Seguridad:** Expondríamos nuestra `OPENAI_API_KEY` al público, permitiendo que cualquiera la robe y consuma nuestro crédito.
2.  **Control:** El Backend (la Edge Function) nos permite validar datos, gestionar límites de uso (Rate Limiting) y transformar la respuesta antes de enviarla al usuario.

### 2. Requisitos Previos

Antes de desplegar la función, asegúrate de tener configurado lo siguiente:

1.  **Proyecto en Supabase:** Debes tener un proyecto activo.
2.  **Supabase CLI:** Instalado y logueado en tu máquina local.
3.  **OpenAI API Key:** Una clave generada en platform.openai.com.

### Configuración de Secretos
Para no "quemar" la clave en el código, la inyectaremos como variable de entorno segura en Supabase.

Ejecuta en tu terminal:
```bash
supabase secrets set OPENAI_API_KEY=sk-tu-clave-secreta-aqui

```

### 3. Implementación de la Función

A continuación se detalla el código para una función de recomendación. Esta función utiliza el modelo `gpt-4o-mini` (optimizado para latencia y coste).

**Ruta del archivo:** `supabase/functions/recommendations/index.ts`

```typescript
import { serve } from "[https://deno.land/std@0.168.0/http/server.ts](https://deno.land/std@0.168.0/http/server.ts)"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejo de CORS (Preflight request)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const openAiKey = Deno.env.get("OPENAI_API_KEY")
    if (!openAiKey) {
      throw new Error("La OPENAI_API_KEY no está configurada.")
    }

    const { movies } = await req.json()

    if (!movies || !Array.isArray(movies) || movies.length === 0) {
      return new Response(JSON.stringify({ error: "Se requiere una lista de películas" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Llamada a la API de OpenAI
    const openAiResponse = await fetch('[https://api.openai.com/v1/chat/completions](https://api.openai.com/v1/chat/completions)', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto cinéfilo. Te daré una lista de películas favoritas de un usuario, recomiéndame una nueva.'
          },
          {
            role: 'user',
            content: `Me gustan estas películas: ${movies.join(', ')}. ¿Qué más ver?`
          }
        ],
        temperature: 0.7,
      }),
    })

    const data = await openAiResponse.json()
    
    if (data.error) {
      throw new Error(data.error.message)
    }

    const reply = data.choices[0].message.content

    return new Response(JSON.stringify({ data: reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

```

### 4. Despliegue y Pruebas

**Despliegue a Producción**
Para subir la función a la infraestructura de Supabase:

```bash
supabase functions deploy recommendations

```

**Prueba con cURL**
Puedes probar la función directamente desde la terminal para verificar que el backend responde correctamente antes de integrarlo en el frontend.

*Nota: Reemplaza `<PROJECT_REF>` y `<ANON_KEY>` con tus credenciales de Supabase.*

```bash
curl -i --location --request POST 'https://<PROJECT_REF>.supabase.co/functions/v1/recommendations' \
  --header 'Authorization: Bearer <ANON_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{"movies": ["Interstellar", "Inception", "The Matrix"]}'

```

**Integración en Frontend (Ejemplo JS)**

```javascript
const { data, error } = await supabase.functions.invoke('recommendations', {
  body: {
    movies: ["Titanic", "The Notebook"]
  }
})

if (error) {
  console.error('Error:', error)
} else {
  console.log("Recomendación:", data)
}

```

