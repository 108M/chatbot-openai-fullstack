# Tools
**Fecha:** miércoles, 11 de febrero de 2026

Es posible usar tools con los modelo de API de OpenAI, ya sea para búsquedas web, deep research o MCP.

La API tiene ya definidas una lista de Tools que puedes usar:

* **Llamada a funciones (Function calling):** Llama a código personalizado para dar al modelo acceso a datos y capacidades adicionales.
* **Búsqueda web (Web search):** Incluye datos de Internet en la generación de respuestas del modelo.
* **Servidores MCP remotos:** Da al modelo acceso a nuevas capacidades a través de servidores de Protocolo de Contexto de Modelo (MCP).
* **Búsqueda de archivos (File search):** Busca en el contenido de los archivos cargados para obtener contexto al generar una respuesta.
* **Generación de imágenes:** Genera o edita imágenes utilizando GPT Image.
* **Intérprete de código (Code interpreter):** Permite al modelo ejecutar código en un contenedor seguro.
* **Uso de computadora (Computer use):** Crea flujos de trabajo agénticos que permiten a un modelo controlar una interfaz de computadora.
* **Aplicar parche (Apply patch):** Permite que los modelos propongan "diffs" estructurados que tu integración aplica.
* **Habilidades (Skills):** Carga y reutiliza paquetes de habilidades con versiones en entornos de shell alojados.
* **Shell:** Ejecuta comandos de shell en contenedores alojados o en tu propio entorno de ejecución local.

**Documentación**

https://developers.openai.com/api/docs/guides/tools?tool-type=function-calling