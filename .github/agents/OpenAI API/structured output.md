
# Salidas de modelo estructuradas (Structured model outputs)

Asegura que las respuestas de texto del modelo se adhieran a un esquema JSON que tú definas.

JSON es uno de los formatos más utilizados en el mundo para que las aplicaciones intercambien datos.

Las **Salidas Estructuradas** son una característica que asegura que el modelo siempre generará respuestas que se adhieran a tu esquema JSON suministrado, por lo que no necesitas preocuparte de que el modelo omita una clave requerida o alucine un valor de enumeración (enum) inválido.

Algunos beneficios de las Salidas Estructuradas incluyen:

* **Seguridad de tipos fiable:** No hay necesidad de validar o reintentar respuestas con formato incorrecto.
* **Rechazos explícitos:** Los rechazos del modelo basados en seguridad son ahora detectables programáticamente.
* **Prompting más simple:** No hay necesidad de prompts con palabras fuertes para lograr un formato consistente.

Además de soportar JSON Schema en la API REST, los SDKs de OpenAI para **Python** y **JavaScript** también facilitan la definición de esquemas de objetos usando **Pydantic** y **Zod** respectivamente. A continuación, puedes ver cómo extraer información de texto no estructurado que se ajusta a un esquema definido en código.

### Obtener una respuesta estructurada

```python
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI()

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

response = client.responses.parse(
    model="gpt-4o-2024-08-06",
    input=[
        {"role": "system", "content": "Extract the event information."},
        {
            "role": "user",
            "content": "Alice and Bob are going to a science fair on Friday.",
        },
    ],
    text_format=CalendarEvent,
)

event = response.output_parsed

```

## Modelos soportados

Las Salidas Estructuradas están disponibles en nuestros **últimos modelos de lenguaje grandes**, comenzando con GPT-4o. Los modelos más antiguos como `gpt-4-turbo` y anteriores pueden usar el **modo JSON** en su lugar.

## Cuándo usar Salidas Estructuradas vía `function calling` vs vía `text.format`

Las Salidas Estructuradas están disponibles en dos formas en la API de OpenAI:

1. Cuando se usa **function calling** (llamada a funciones).
2. Cuando se usa un formato de respuesta `json_schema`.

**Function calling** es útil cuando estás construyendo una aplicación que conecta los modelos y la funcionalidad de tu aplicación.

* *Por ejemplo:* puedes dar al modelo acceso a funciones que consultan una base de datos para construir un asistente de IA que pueda ayudar a los usuarios con sus pedidos, o funciones que puedan interactuar con la interfaz de usuario (UI).

Por el contrario, las **Salidas Estructuradas vía `response_format`** son más adecuadas cuando quieres indicar un esquema estructurado para usar cuando el modelo responde al usuario, en lugar de cuando el modelo llama a una herramienta.

* *Por ejemplo:* si estás construyendo una aplicación de tutoría de matemáticas, podrías querer que el asistente responda a tu usuario usando un esquema JSON específico para que puedas generar una UI que muestre diferentes partes de la salida del modelo de distintas maneras.

**En pocas palabras:**

* Si estás conectando el modelo a herramientas, funciones, datos, etc. en tu sistema, entonces deberías usar **function calling**.
* Si quieres estructurar la salida del modelo cuando responde al usuario, entonces deberías usar un **`text.format` estructurado**.

*El resto de esta guía se centrará en los casos de uso que no son de llamada a funciones en la API de Respuestas.*

## Salidas Estructuradas vs modo JSON

Las Salidas Estructuradas son la evolución del **modo JSON**. Mientras que ambos aseguran que se produzca JSON válido, **solo las Salidas Estructuradas aseguran la adherencia al esquema**. Tanto las Salidas Estructuradas como el modo JSON son soportados en la API de Respuestas, API de Chat Completions, API de Asistentes, API de Fine-tuning y API de Batch.

Recomendamos usar siempre Salidas Estructuradas en lugar del modo JSON cuando sea posible.

Sin embargo, las Salidas Estructuradas con `response_format: {type: "json_schema", ...}` solo son soportadas con los snapshots de los modelos `gpt-4o-mini`, `gpt-4o-mini-2024-07-18`, y `gpt-4o-2024-08-06` y posteriores.

| Característica | Salidas Estructuradas | Modo JSON |
| --- | --- | --- |
| Emite JSON válido | Sí | Sí |
| Se adhiere al esquema | Sí (ver esquemas soportados) | No |
| Modelos compatibles | gpt-4o-mini, gpt-4o-2024-08-06, y posteriores | gpt-3.5-turbo, modelos gpt-4-* y gpt-4o-* |
| Habilitación | `text: { format: { type: "json_schema", "strict": true, "schema": ... } }` | `text: { format: { type: "json_object" } }` |

## Ejemplos

* Cadena de pensamiento (Chain of thought)
* Extracción de datos estructurados
* Generación de UI
* Moderación

### Cadena de pensamiento (Chain of thought)

Puedes pedirle al modelo que emita una respuesta de manera estructurada, paso a paso, para guiar al usuario a través de la solución.

**Salidas Estructuradas para tutoría de matemáticas con cadena de pensamiento:**

```python
from openai import OpenAI
from pydantic import BaseModel

client = OpenAI()

class Step(BaseModel):
    explanation: str
    output: str

class MathReasoning(BaseModel):
    steps: list[Step]
    final_answer: str

response = client.responses.parse(
    model="gpt-4o-2024-08-06",
    input=[
        {
            "role": "system",
            "content": "You are a helpful math tutor. Guide the user through the solution step by step.",
        },
        {"role": "user", "content": "how can I solve 8x + 7 = -23"},
    ],
    text_format=MathReasoning,
)

math_reasoning = response.output_parsed

```

**Ejemplo de respuesta:**

```json
{
  "steps": [
    {
      "explanation": "Start with the equation 8x + 7 = -23.",
      "output": "8x + 7 = -23"
    },
    {
      "explanation": "Subtract 7 from both sides to isolate the term with the variable.",
      "output": "8x = -23 - 7"
    },
    ...
  ],
  "final_answer": "x = -15 / 4"
}

```

## Cómo usar Salidas Estructuradas con `text.format`

### Paso 1: Define tu esquema

Primero debes diseñar el Esquema JSON que el modelo deberá seguir obligatoriamente.
Aunque las Salidas Estructuradas soportan gran parte del JSON Schema, algunas características no están disponibles por razones de rendimiento o técnicas.

**Consejos para tu Esquema JSON:**
Para maximizar la calidad de las generaciones del modelo, recomendamos lo siguiente:

* Nombra las claves de forma clara e intuitiva.
* Crea títulos y descripciones claros para claves importantes en tu estructura.
* Crea y usa evaluaciones (evals) para determinar la estructura que mejor funciona para tu caso de uso.

### Paso 2: Suministra tu esquema en la llamada a la API

Para usar Salidas Estructuradas, simplemente especifica:
`text: { format: { type: "json_schema", "strict": true, "schema": … } }`

*Nota: la primera solicitud que hagas con cualquier esquema tendrá latencia adicional mientras nuestra API procesa el esquema, pero las solicitudes subsiguientes con el mismo esquema no tendrán latencia adicional.*

### Paso 3: Manejar casos extremos

En algunos casos, el modelo podría no generar una respuesta válida que coincida con el esquema JSON proporcionado.
Esto puede suceder en caso de un rechazo (refusal), si el modelo se niega a responder por razones de seguridad, o si por ejemplo alcanzas un límite máximo de tokens y la respuesta está incompleta.

```python
try:
    response = client.responses.create(
        model="gpt-4o-2024-08-06",
        # ... inputs ...
        text={
            "format": {
                "type": "json_schema",
                "name": "math_response",
                "strict": True,
                "schema": { ... }
            }
        }
    )
except Exception as e:
    # manejar errores como finish_reason, refusal, content_filter, etc.
    pass

```

### Rechazos con Salidas Estructuradas

Cuando se usan Salidas Estructuradas con entradas generadas por usuarios, los modelos de OpenAI pueden ocasionalmente negarse a cumplir la solicitud por razones de seguridad. Dado que un rechazo no sigue necesariamente el esquema que has suministrado en `response_format`, la respuesta de la API incluirá un nuevo campo llamado `refusal` para indicar que el modelo se negó a cumplir la solicitud.

```python
# Si el modelo se niega a responder, obtendrás un mensaje de rechazo
if math_reasoning.refusal:
    print(math_reasoning.refusal)
else:
    print(math_reasoning.parsed)

```

## Consejos y mejores prácticas

### Manejo de entrada generada por el usuario

Si tu aplicación está usando entrada generada por el usuario, asegúrate de que tu prompt incluya instrucciones sobre cómo manejar situaciones donde la entrada no puede resultar en una respuesta válida.
El modelo siempre intentará adherirse al esquema proporcionado, lo cual puede resultar en **alucinaciones** si la entrada no está relacionada en absoluto con el esquema.
Podrías incluir lenguaje en tu prompt para especificar que quieres devolver parámetros vacíos, o una oración específica, si el modelo detecta que la entrada es incompatible con la tarea.

### Manejo de errores

Las Salidas Estructuradas aún pueden contener errores. Si ves errores, intenta ajustar tus instrucciones, proporcionando ejemplos en las instrucciones del sistema, o dividiendo las tareas en subtareas más simples.

### Evitar la divergencia del esquema JSON

Para prevenir que tu Esquema JSON y los tipos correspondientes en tu lenguaje de programación diverjan, recomendamos encarecidamente usar el soporte nativo de los SDK de Pydantic/Zod.

### Streaming

Puedes usar streaming para procesar las respuestas del modelo o los argumentos de llamada a funciones a medida que se generan, y analizarlos como datos estructurados. De esa manera, no tienes que esperar a que la respuesta completa termine antes de manejarla.

## Esquemas soportados

Las Salidas Estructuradas soportan un subconjunto del lenguaje **JSON Schema**.

### Tipos soportados

* String
* Number
* Boolean
* Integer
* Object
* Array
* Enum
* anyOf

### Propiedades soportadas

Además de especificar el tipo de una propiedad, puedes especificar una selección de restricciones adicionales:

**Propiedades de `string` soportadas:**

* `pattern`: Una expresión regular que la cadena debe coincidir.
* `format`: Formatos predefinidos (date-time, email, uuid, etc.).

**Propiedades de `number` soportadas:**

* `multipleOf`, `maximum`, `exclusiveMaximum`, `minimum`, `exclusiveMinimum`.

**Propiedades de `array` soportadas:**

* `minItems`, `maxItems`.

### Restricciones importantes

1. **Los objetos raíz no deben ser `anyOf` y deben ser un objeto:** El objeto de nivel raíz de un esquema debe ser un objeto.
2. **Todos los campos deben ser `required`:** Para usar Salidas Estructuradas, todos los campos o parámetros de función deben especificarse como requeridos.
* *Nota:* Aunque todos los campos deben ser requeridos, es posible emular un parámetro opcional usando un tipo de unión con `null` (ej: `type: ["string", "null"]`).


3. **Los objetos tienen limitaciones en profundidad y tamaño de anidamiento:** Hasta 100 object properties en total, con hasta 5 niveles de anidamiento.
4. **Limitaciones en tamaño total de cadenas:** En un esquema, la longitud total de cadenas no puede exceder los 15,000 caracteres.
5. **Limitaciones en tamaño de enum:** Hasta 500 valores de enum.
6. **`additionalProperties: false` siempre debe establecerse en objetos:** Esto controla si es permisible que un objeto contenga claves/valores adicionales no definidos. Requerimos que los desarrolladores establezcan esto en `false`.
7. **Orden de las claves:** Las salidas se producirán en el mismo orden que el ordenamiento de las claves en el esquema.

### Palabras clave específicas de tipo no soportadas aún

* Composición: `allOf`, `not`, `dependentRequired`, `dependentSchemas`, `if`, `then`, `else`.
* *Para modelos fine-tuned:* No soportamos `minLength`, `maxLength`, `pattern`, `format` (strings); `minimum`, `maximum` (números); `patternProperties` (objetos); `minItems`, `maxItems` (arrays).

### Definiciones y Recursividad

* **Definiciones (`$defs`):** Soportadas para definir sub-esquemas referenciados.
* **Esquemas recursivos:** Soportados (ej: estructuras de UI anidadas o listas enlazadas).

## Modo JSON

El modo JSON es una versión más básica de la característica de Salidas Estructuradas.

* Cuando el modo JSON está activado, se asegura que la salida del modelo sea JSON válido, excepto en algunos casos extremos.
* Para activar el modo JSON con la API de Respuestas puedes establecer `text.format` a `{ "type": "json_object" }`.

**Notas importantes:**

1. Debes instruir siempre al modelo para producir JSON vía algún mensaje en la conversación (ej: mensaje del sistema). Si no incluyes una instrucción explícita, la API lanzará un error.
2. El modo JSON **no garantizará** que la salida coincida con ningún esquema específico, solo que es válida y se analiza sin errores.
