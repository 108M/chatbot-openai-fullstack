
# Quickstart

## Crea y exporta una clave de API:
Puedes hacerlo de dos maneras:

### Exportar la variable de entorno por consola:

**Windows (PowerShell):**
Export an environment variable in PowerShell
```powershell
setx OPENAI_API_KEY "your_api_key_here"

```

**macOS/Linux:**
Export an environment variable on macOS or Linux systems

```bash
export OPENAI_API_KEY="your_api_key_here"

```

---

## Ejemplo base:

Test a basic API request

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.2",
    input="Write a one-sentence bedtime story about a unicorn."
)

print(response.output.text)

```
