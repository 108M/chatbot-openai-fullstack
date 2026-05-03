
# Prompts OpenAI

Como hemos visto en los demás apartados, una petición a OpenAI API sigue esta forma:

**Ejemplo Básico en Python:**

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5.2",
    input="Write a one-sentence bedtime story about a unicorn." 
    # (Escribe un cuento para dormir de una frase sobre un unicornio)
)

print(response.output_text)

```

#### ¿Y la respuesta? (Estructura JSON)

Un array (matriz) de contenido generado por el modelo se encuentra en la propiedad `output` de la respuesta. En este ejemplo sencillo, tenemos solo una salida que se ve así:

```json
[
  {
    "id": "msg_67b73f697ba4819183a15cc17d011509",
    "type": "message",
    "role": "assistant",
    "content": [
      {
        "type": "output_text",
        "text": "Under the soft glow of the moon, Luna the unicorn danced...",
        "annotations": []
      }
    ]
  }
]

```

* El array de salida a menudo tiene **más de un elemento**. Puede contener llamadas a herramientas (tool calls), datos sobre tokens de razonamiento y otros elementos.
* **No es seguro** asumir que la salida de texto del modelo esté siempre presente en `output[0].content[0].text`.

---

### Ingeniería de Prompts (Prompt Engineering)

#### Recomendaciones:

1. **Fijar (Pinning):** Configura tus aplicaciones de producción a snapshots de modelos específicos (como `gpt-5-2025-08-07`) para asegurar un comportamiento consistente.
2. **Construir evaluaciones (Evals):** Miden el comportamiento de tus prompts para monitorear el rendimiento mientras iteras o actualizas versiones del modelo.

#### Roles de mensajes y seguimiento de instrucciones

Puedes proporcionar instrucciones al modelo con diferentes niveles de autoridad utilizando el parámetro `instructions` junto con los roles de mensaje.

* El parámetro `instructions` da al modelo instrucciones de **alto nivel** sobre cómo comportarse (tono, objetivos, ejemplos).
* Cualquier instrucción proporcionada de esta manera **tendrá prioridad** sobre un prompt en el parámetro `input`.

**Regla de oro:**

* Usa **Instructions** para: Reglas de negocio, personalidad, formatos obligatorios.
* Usa **Input** para: La consulta actual del usuario y contenido variable.

**Ejemplo 1: Generar texto con parámetro `instructions**`

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    reasoning={"effort": "low"}, # razonamiento esfuerzo: bajo
    instructions="Talk like a pirate.", # Habla como un pirata
    input="Are semicolons optional in JavaScript?" # ¿Son opcionales los puntos y coma?
)

print(response.output_text)

```

**Nota Importante:** El parámetro `instructions` solo se aplica a la solicitud actual. Si estás gestionando el estado de la conversación con `previous_response_id`, las instrucciones de turnos anteriores **no estarán presentes** en el contexto.

---

**Ejemplo 2: Generar texto con mensajes usando diferentes roles**

Este método es equivalente al anterior pero estructurado dentro del `input` array:

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    reasoning={"effort": "low"},
    input=[
        {
            "role": "developer",
            "content": "Talk like a pirate."
        },
        {
            "role": "user",
            "content": "Are semicolons optional in JavaScript?"
        }
    ]
)

print(response.output_text)

```

#### Jerarquía de Roles (Tabla de Prioridad)

La especificación describe cómo los modelos dan diferentes niveles de prioridad:

| Rol | Descripción | Prioridad |
| --- | --- | --- |
| **Developer** (Desarrollador) | Instrucciones del desarrollador de la app. | **Alta** (Por delante del usuario) |
| **User** (Usuario) | Instrucciones del usuario final. | **Baja** (Por detrás del desarrollador) |
| **Assistant** (Asistente) | Mensajes generados por el modelo. | N/A (Salida) |

---

---



### Estructura de la Respuesta (`Output`)

* La respuesta no es un string simple, es un **Array**.
* **Contenido:** Puede tener texto, *tool calls* (llamadas a funciones) o *reasoning tokens*.
* **Advertencia:** Nunca hagas hardcode asumiendo que el texto está en el índice `[0]`. Usa `response.output_text` si el SDK lo permite para simplificar.

###  Best Practices (Ingeniería de Prompts)

* **Pinning (Anclaje):** Usa versiones con fecha (ej. `gpt-5-2025-08-07`) en producción. Evita que una actualización silenciosa de OpenAI rompa tu app.
* **Evals:** Crea tests automáticos para asegurar que tus prompts siguen funcionando bien tras cambios.

###  Parámetro `instructions` vs `input`

* **Instructions:**
* Define el **CÓMO** (Identidad, reglas).
* Tiene **Máxima Prioridad**.
* **NO tiene memoria:** Solo afecta al turno actual. No se guarda en el historial de conversación (`previous_response_id`).


* **Input:**
* Define el **QUÉ** (Pregunta del usuario).
* Menor prioridad jerárquica.



###  Roles del Sistema

* **Developer:** Es la autoridad suprema en el prompt. Lo que dice el developer sobrescribe lo que intente hacer el usuario (útil para evitar *jailbreaks* o mal uso).
* **User:** El cliente final.
* **Assistant:** La IA respondiendo.