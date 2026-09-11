# Implementación de Búsqueda Semántica con Embeddings

## ✅ Lo que se ha implementado:

### Backend (main.py)
1. **Función de generación de embeddings** - Genera embeddings usando OpenAI's `text-embedding-3-small`
2. **Endpoint POST `/add-document`** - Agrega documentos con sus embeddings a la base de datos
3. **Endpoint POST `/search-documents`** - Busca documentos por similitud semántica
4. **Endpoint GET `/documents`** - Obtiene los documentos del usuario actual
5. **Endpoint DELETE `/documents/{document_id}`** - Elimina documentos

### Frontend (apiClient.ts)
6. **Función `addDocument(content)`** - Agrega un nuevo documento
7. **Función `searchDocuments(query, limit)`** - Busca documentos
8. **Función `getDocuments(limit, offset)`** - Lista documentos
9. **Función `deleteDocument(documentId)`** - Elimina documentos

### Componente React (SemanticSearch.tsx)
10. **Componente `SemanticSearch`** - Interfaz completa para:
   - Buscar documentos por consulta semántica
   - Ver resultados con puntuación de similitud
   - Agregar nuevos documentos
   - Listar y eliminar documentos existentes

### Base de datos (setup_embeddings.sql)
11. **Script SQL** - Crea la tabla `documents` con:
   - Soporte para vectores (embeddings)
   - Row Level Security (RLS)
   - Índices para búsquedas rápidas

## 🔧 Pasos siguientes:

### 1. Actualizar dependencias del backend
```bash
cd backend
pip install -r requirements.txt
```

### 2. Crear la tabla en Supabase
- Ve a tu [dashboard de Supabase](https://supabase.com)
- Abre el SQL Editor
- Copia y pega el contenido de `backend/setup_embeddings.sql`
- Ejecuta el script

### 3. Integrar el componente en el frontend
Agrega el componente `SemanticSearch` en tu aplicación. Por ejemplo, en `ChatPage.tsx`:

```tsx
import { SemanticSearch } from '../components/SemanticSearch';

export function ChatPage() {
  return (
    <div>
      {/* Otros componentes */}
      <SemanticSearch />
    </div>
  );
}
```

### 4. Verificar configuración
Asegúrate de que tienes las siguientes variables de entorno configuradas:
- `OPENAI_API_KEY` - Para generar embeddings
- `SUPABASE_URL` - URL de tu proyecto Supabase
- `SUPABASE_SERVICE_KEY` - Clave de servicio de Supabase

## 📊 Cómo funciona:

### Agregar un documento:
1. El usuario pasta contenido en el área de texto
2. El backend genera un embedding de 1536 dimensiones
3. El documento y su embedding se guardan en Supabase

### Buscar documentos:
1. El usuario introduce una consulta
2. El backend genera un embedding para la consulta
3. Se calcula la similitud coseno entre la consulta y cada documento del usuario
4. Los resultados se ordenan por similitud (de mayor a menor)
5. Se muestran los top N resultados con su puntuación de similitud

## 🔒 Seguridad:

- Solo los usuarios autenticados pueden acceder a los endpoints
- Las Row Level Security (RLS) de Supabase garantiza que cada usuario vea solo sus documentos
- Los embeddings se almacenan de forma segura en la base de datos

## 💡 Optimizaciones:

- Se usa el modelo `text-embedding-3-small` que es rápido y eficiente
- Los embeddings se almacenan como vectores en Supabase para búsquedas rápidas
- Se crean índices en la base de datos para mejorar el rendimiento
- La similitud coseno se calcula en el backend (permite más flexibilidad)

## 🚀 Próximos pasos (opcionales):

1. Agregar búsqueda en archivos (PDF, TXT) automáticamente
2. Implementar filtros por fecha o tags
3. Agregar batch processing para múltiples documentos
4. Mostrar contexto alrededor de los resultados
5. Guardar búsquedas frecuentes para sugerencias
