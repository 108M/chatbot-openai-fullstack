
---

# Análisis de Imágenes y Archivos

Aprende a subir archivos e imágenes para que el modelo los analice.

#### 1. Métodos de Entrada (Código)

**A. Subir un archivo y usarlo como input**
Se utiliza para PDFs u otros documentos.

```python
from openai import OpenAI
client = OpenAI()

# 1. Subir el archivo
file = client.files.create(
    file=open("analisisventas.pdf", "rb"),
    purpose="user_data"
)

# 2. Usar el archivo en la petición
response = client.responses.create(
    model="gpt-4o",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_file",
                    "file_id": file.id
                },
                {
                    "type": "input_text",
                    "text": "¿Cuál es la primera imagen en el libro?"
                }
            ]
        }
    ]
)

print(response.output_text)

```

**B. Clasificar imagen mediante URL**
Para imágenes alojadas en internet.

```python
response = client.responses.create(
    model="gpt-4o",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Analiza la carta y resume..."
                },
                {
                    "type": "input_image",
                    "image_url": "https://i.imgur.com/imagen.jpg"
                }
            ]
        }
    ]
)

```

**C. Imágenes codificadas en Base64**
Para imágenes locales convertidas a bytes.

```python
# Asumiendo que tienes la imagen en bytes
base64_image = base64.b64encode(image_bytes).decode('utf-8')

response = client.responses.create(
    model=settings.openai_model,
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "Prompt del usuario"
                },
                {
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{base64_image}"
                }
            ]
        }
    ]
)

```

#### 2. Consideraciones de Uso

* **Límites de tamaño:**
* Puedes cargar varios archivos.
* Máximo **50 MB** por archivo.
* Límite total de **50 MB** entre todos los archivos en una sola solicitud.


* **Modelos compatibles:** `gpt-4o`, `gpt-4o-mini`, `o1`.
* **Propósito (Purpose):** Aunque puedes usar cualquier propósito en la API de Archivos, se recomienda usar `user_data` para archivos que serán entradas del modelo.

#### 3. Nivel de Detalle (Detail Parameter)

El parámetro `detail` controla cómo procesa el modelo la imagen:

* `auto`: (Por defecto) El modelo decide.
* `low`: Menos tokens, menos precisión.
* `high`: Más tokens, mayor comprensión visual.
```python
{
    "type": "input_image",
    "image_url": "https://api.nga.gov/ifff/a2..",
    "detail": "high"
}
```
**Regla de oro:** MÁS DETALLE == MÁS TOKENS.

#### 4. Limitaciones del Modelo

* **Imágenes Médicas:** No apto para diagnóstico (ej. tomografías).
* **No-Inglés:** Puede fallar con alfabetos no latinos (japonés, coreano).
* **Texto Pequeño:** Evita recortar detalles importantes al hacer zoom.
* **Rotación:** Puede malinterpretar textos/imágenes rotados.
* **Elementos Visuales:** Dificultad con gráficos complejos, líneas punteadas o colores similares.
* **Razonamiento Espacial:** Malo en localización precisa (ej. posiciones de ajedrez).
* **Precisión:** Puede alucinar descripciones.
* **Forma de la imagen:** Dificultad con panorámicas y ojo de pez.
* **Metadatos:** No lee nombres de archivo ni metadatos; las imágenes se redimensionan.
* **Conteo:** Solo ofrece recuentos aproximados de objetos.
* **CAPTCHAS:** Bloqueado por seguridad.

#### 5. Cálculo de Costes (Tokenización)

El cálculo varía según la familia del modelo.

**A. Modelos "Mini", "Nano" y "o4-mini"**
*(Incluye GPT-4.1-mini, GPT-5-mini, etc.)*

* **Método:** Se basa en parches de **32x32 píxeles**.
* **Fórmula:** `ceil(ancho/32) x ceil(alto/32)`.
* **Límite:** Máximo 1536 parches. Si la imagen es más grande, se escala hacia abajo.
* **Costo Final:** Número de parches x Multiplicador del modelo (ej. x1.62 para mini).

**B. Modelos Estándar, Omni y Series "o"**
*(Incluye GPT-4o, GPT-5, o1, o3)*
Depende del parámetro `detail`:

1. **Detalle Bajo (Low):** Costo fijo (ej. 85 tokens en GPT-4o), sin importar el tamaño.
2. **Detalle Alto (High):**
* **Escalado:** Se ajusta a 2048x2048 y luego el lado corto a 768px.
* **Teselas (Tiles):** Se cuenta cuántos cuadrados de **512x512px** cubren la imagen.
* **Fórmula:** `(Nº Teselas x Costo/tesela) + Costo Base`.
* *Ejemplo GPT-4o:* 170 tokens/tesela + 85 base.



**C. Modelo GPT Image 1**

* **Escalado:** Lado más corto a 512px.
* **Fidelidad Baja:** 65 base + 129 por tesela.
* **Fidelidad Alta:** Igual que baja + **Recargo masivo** (+4,160 tokens si es cuadrada, +6,240 si es retrato/paisaje).

---

---

# Parte 2: Apuntes de Estudio (Resumen Técnico)

Aquí tienes los conceptos clave para memorizar o consultar rápidamente.

### 1. Implementación Técnica (API)

* **API de Archivos:** Usar `client.files.create` con `purpose="user_data"`.
* **Tipos de Input (`content`):**
* `input_file`: Para PDFs/Docs subidos previamente (requiere `file_id`).
* `input_image`: Admite `image_url` (http) o Base64 (`data:image/...`).
* `input_text`: El prompt o instrucción que acompaña al archivo.


* **Límites Físicos:**
* Max **50 MB** por archivo.
* Max **50 MB** total por request.



### 2. Parámetro `detail` (Gestión de Calidad/Coste)

Controla la resolución del análisis en modelos estándar.

* **`auto`:** El modelo elige (Default).
* **`low`:** Desactiva el modo de "alta resolución". Consume **menos tokens** (coste fijo).
* **`high`:** Habilita el análisis por teselas (tiles). Consume **más tokens**.

### 3. Las Limitaciones (Lo que NO debes hacer)

No uses Vision para:

* Diagnóstico médico (CT/Rayos X).
* Leer CAPTCHAS (bloqueado).
* Contar objetos con precisión exacta.
* Analizar posiciones espaciales exactas (Ajedrez).
* Leer alfabetos no latinos complejos (Japonés/Coreano).

### 4. Matemáticas de Costes (Cómo se cobran las imágenes)

| Familia de Modelo | Unidad de Medida | Fórmula Básica | Notas |
| --- | --- | --- | --- |
| **Mini / Nano** | Parches de **32x32px** | `(Ancho/32) * (Alto/32)` | Se aplica un multiplicador al final. Max 1536 parches. |
| **Estándar (Low)** | Coste Fijo | Fijo (ej. 85 tokens) | No importa el tamaño de la imagen. |
| **Estándar (High)** | Teselas de **512x512px** | `(Teselas * Coste) + Base` | La imagen se redimensiona (lado corto 768px). |
| **GPT Image 1** | Teselas + **Recargo** | Coste base + Recargo masivo | Penalización alta por fidelidad alta (+4k tokens). |

**Valores de referencia (High Detail):**

* **GPT-4o:** 170 tokens por tesela + 85 base.
* **GPT-5:** 140 tokens por tesela + 70 base.

### 5. Nota sobre Rate Limits

Todas las imágenes, independientemente de su tamaño, cuentan para el límite de **TPM (Tokens Por Minuto)**. Un lote grande de imágenes en alta resolución puede bloquear tu API Key temporalmente si superas el límite.