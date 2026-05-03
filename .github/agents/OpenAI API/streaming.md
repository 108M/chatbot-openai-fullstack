
# Respuestas en Tiempo Real

Por defecto cuando haces una solicitud a la API, te quedas esperando hasta que OpenAI haya generado toda la respuesta; esto puede ser molesto cuando la salida es larga.

Habilitando la opción de **streaming** te permite ir imprimiendo o procesando la respuesta mientras se va generando.

## Ejemplo de cómo activar el streaming:

```python
from openai import OpenAI

client = OpenAI()

stream = client.responses.create(
    model="gpt-5.2",
    messages=[
        {"role": "user", "content": "Say double bubble bath ten times fast."}
    ],
    stream=True
)

for event in stream:
    print(event)

```

En vez de que se genere un único string, la respuesta está añadiendo fragmentos en un objeto JSON.

Cuando el modelo llama a una o más funciones, se emite un evento de tipo `response.output_item.added` con los siguientes campos:

| Campo | Descripción |
| --- | --- |
| `response_id` | El id de la respuesta a la que pertenece la llamada a la función. |
| `output_index` | El índice del elemento de salida en la respuesta. Esto representa las llamadas a funciones individuales en la respuesta. |
| `item` | El elemento de la llamada a la función en curso que incluye un campo name, arguments e id. |

Después, recibirás una serie de eventos de tipo `response.function_call_arguments.delta` que contendrán el delta del campo arguments. Estos eventos contienen los siguientes campos:

| Campo | Descripción |
| --- | --- |
| `response_id` | El id de la respuesta a la que pertenece la llamada a la función. |
| `item_id` | El id del elemento de la llamada a la función al que pertenece el delta. |
| `output_index` | El índice del elemento de salida en la respuesta. Esto representa las llamadas a funciones individuales en la respuesta. |
| `delta` | El delta del campo arguments. |

### Ejemplo: Accumulating tool call deltas

```python
final_tool_calls = {}

for event in stream:
    if event.type == "response.output_item.added":
        final_tool_calls[event.output_index] = event.item
    elif event.type == "response.function_call_arguments.delta":
        index = event.output_index
        if final_tool_calls[index]:
            final_tool_calls[index].arguments += event.delta

```

**Accumulated final_tool_calls[0]:**

```json
{
    "type": "function_call",
    "id": "fc_1234xyz",
    "call_id": "call_2345abc",
    "name": "get_weather",
    "arguments": "{\"location\":\"Paris, France\"}"
}

```

---

Cuando el modelo haya terminado de llamar a las funciones, se emitirá un evento de tipo `response.function_call_arguments.done`. Este evento contiene la llamada a la función completa, incluyendo los siguientes campos:

| Campo | Descripción |
| --- | --- |
| `response_id` | El id de la respuesta a la que pertenece la llamada a la función. |
| `output_index` | El índice del elemento de salida en la respuesta. Esto representa las llamadas a funciones individuales en la respuesta. |
| `item` | El elemento de la llamada a la función que incluye un campo name, arguments e id. |

## Manejo del OUTPUT:

```python
from openai import OpenAI
from pydantic import BaseModel
from typing import List

class Attributes(BaseModel):
    colors: List[str]

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-5.2",
    messages=[
        {"role": "user", "content": "Give me a list of colors."}
    ],
    response_format=Attributes,
    stream=True
)

for event in stream:
    if event.type == "content.delta":
        print(event.delta)
    elif event.type == "error":
        print(event.error)
    elif event.type == "done":
        print("Done")

final_response = stream.get_final_completion()
entities = final_response.message.parsed
print(entities)

