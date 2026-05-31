	

**Resumen:**

La Inteligencia Artificial (IA) se ha consolidado como un componente disruptivo en la Ingeniería de *Software*, transformando fases críticas que van desde la ingeniería de requisitos y el prototipado hasta la implementación, validación y documentación. No obstante, la rápida evolución y constante cambio de estas tecnologías genera una brecha de conocimiento sobre qué herramientas seleccionar, en qué contextos aplicarlas y cómo integrarlas bajo estándares de eficiencia, seguridad y mantenibilidad. Este Trabajo de Fin de Grado aborda dicha problemática mediante una investigación aplicada dirigida a sistematizar el uso de la IA en el ciclo de vida del desarrollo.

El proyecto define el *stack* tecnológico fundamental para el desarrollador con el objetivo de conocer la existencia de estas tecnologías, su arquitectura, funcionamiento y el contexto en las cuales deben ser aplicadas. Por ello, se definen y analizan en detalle conceptos clave como los *Large Language Models* (LLM), la definición y escritura de instrucciones (*prompting*), los canales de comunicación —como la *Command Line Interface* (CLI) o entornos integrados (IDE)—, los agentes autónomos (*agents*), las herramientas de especialización (*skills*) y el protocolo *Model Context Protocol* (MCP), definiendo su funcionamiento y el proceso de implementación. Asimismo, se evalúan y comparan metodologías emergentes como el *vibecoding*, frente a enfoques tradicionales adaptados como el  *Prompt-Driven Development* (PDD) o el *Specification Driven Development (SDD*).

Para validar empíricamente este marco teórico, la investigación incorpora una fase práctica estructurada de un caso de estudio funcional integral que incorpora interfaz de chat, integración de una base de conocimiento y capacidades de voz (*TTS*), permitiendo evaluar rigurosamente el impacto de la IA en la expansión del alcance productivo durante todo el ciclo de vida del desarrollo del *software*.

Todo este aprendizaje se agrupa en la creación de un flujo de trabajo (*workflow*) estandarizado. Además, se incluye una guía con recomendaciones prácticas para cada fase del desarrollo y unos "hábitos seguros básicos" enfocados en el uso eficiente de estas tecnologías, el desarrollo sostenible, la revisión de código y la documentación. En definitiva, se ofrece una base realista y aplicable para que cualquier desarrollador pueda integrar la IA en su día a día, mejorando su eficiencia de forma segura y sustancial.

**Palabras clave:** Inteligencia Artificial, Ingeniería de *Software*, Ciclo de Vida del Desarrollo (SDLC), *Large Language Model* (LLM), Agentes Autónomos, *Workflow*, *Prompt Engineering*, Metodologías, Seguridad en el *Software*, Desarrollo Sostenible.

### 

### 

***Abstract:***

*Artificial Intelligence (AI) has established itself as a disruptive component in Software Engineering, transforming critical phases ranging from requirements engineering and prototyping to implementation, validation, and documentation. However, the rapid evolution and constant change of these technologies generate a knowledge gap regarding which tools to select, in which contexts to apply them, and how to integrate them under standards of efficiency, security, and maintainability. This Bachelor's Thesis addresses this problem through applied research aimed at systematizing the use of AI in the development life cycle.*

*The project defines the fundamental technology stack for the developer with the aim of raising awareness of these technologies, their architecture, operation, and the contexts in which they should be applied. Therefore, key concepts are defined and analyzed in detail, such as Large Language Models (LLMs), instruction definition and writing (prompting), communication channels—such as the Command Line Interface (CLI) or Integrated Development Environments (IDEs)—, autonomous agents, specialization tools (skills), and the Model Context Protocol (MCP), defining their operation and implementation process. Likewise, emerging methodologies such as vibecoding are evaluated and compared against adapted traditional approaches like Prompt-Driven Development (PDD) or Specification Driven Development (SDD).*

*To empirically validate this theoretical framework, the research incorporates a structured practical phase consisting of a comprehensive functional case study that features a chat interface, knowledge base integration, and voice capabilities (TTS). This allows for a rigorous evaluation of AI's impact on expanding the productive scope throughout the entire software development life cycle.*

*All this learning is consolidated into the creation of a standardized workflow. Furthermore, a guide with practical recommendations for each development phase and "basic safe habits" is included, focusing on the efficient use of these technologies, sustainable development, code review, and documentation. Ultimately, it provides a realistic and applicable foundation for any developer to integrate AI into their day-to-day work, substantially and safely improving their efficiency.*

***Keywords:** Artificial Intelligence, Software Engineering, Software Development Life Cycle (SDLC), Large Language Model (LLM), Autonomous Agents, Workflow, Prompt Engineering, Methodologies, Software Security, Sustainable Development.*

# Índice de Contenidos

[**1\. Introducción	15**](#1.-introducción)

[1.1 Motivación personal	15](#1.1-motivación-personal)

[1.2 Contexto de las prácticas	16](#1.2-contexto-de-las-prácticas)

[1.3 Problemática	18](#1.3-problemática)

[1.3.1 Paradoja del Empleo en la Ingeniería de Software	18](#1.3.1-paradoja-del-empleo-en-la-ingeniería-de-software)

[1.3.2 La Calidad del Software en la Era de la Inteligencia Artificial	20](#1.3.2-la-calidad-del-software-en-la-era-de-la-inteligencia-artificial)

[1.3.3 Homogeneización de la Web y la Teoría del Internet Muerto	22](#1.3.3-homogeneización-de-la-web-y-la-teoría-del-internet-muerto)

[1.3.4 Los Gigantes de la IA: Anthropic , OpenAI y Google	23](#1.3.4-los-gigantes-de-la-ia:-anthropic-,-openai-y-google)

[1.3.5 Determinantes de la Convergencia Tecnológica	24](#1.3.5-determinantes-de-la-convergencia-tecnológica)

[**2\. Objetivos	26**](#heading=)

[2.1 Objetivo general	26](#2.1-objetivo-general)

[2.2 Objetivos específicos	26](#2.2-objetivos-específicos)

[2.2.1 Selección, categorización y evaluación del ecosistema tecnológico	26](#2.2.1-selección,-categorización-y-evaluación-del-ecosistema-tecnológico)

[2.2.2 Desarrollo de un caso de estudio funcional integral	27](#2.2.2-desarrollo-de-un-caso-de-estudio-funcional-integral)

[2.2.3 Diseño de un entorno de trabajo (workspace) personalizado y arquitecturas de vanguardia	27](#2.2.3-diseño-de-un-entorno-de-trabajo-\(workspace\)-personalizado-y-arquitecturas-de-vanguardia)

[2.2.4 Definición de un workflow estandarizado y guía de adopción práctica	27](#2.2.4-definición-de-un-workflow-estandarizado-y-guía-de-adopción-práctica)

[**3\. Alineación a los objetivos de desarrollo sostenible	28**](#heading=)

[**4\. Ecosistema Tecnológico y Metodológico	29**](#4.-ecosistema-tecnológico-y-metodológico)

[4.1  Large Language Models (LLM) y Gestión de Contexto	29](#4.1-large-language-models-\(llm\)-y-gestión-de-contexto)

[4.1.1 Concepto y Definición	29](#4.1.1-concepto-y-definición)

[4.1.2 Arquitectura y Mecánica Interna	29](#4.1.2-arquitectura-y-mecánica-interna)

[4.1.3 Integración en el Ecosistema	30](#4.1.3-integración-en-el-ecosistema)

[4.1.4. Propósito y Aplicación en el SDLC	30](#4.1.4.-propósito-y-aplicación-en-el-sdlc)

[4.2  Ingeniería de Instrucciones (Prompting)	30](#4.2-ingeniería-de-instrucciones-\(prompting\))

[4.2.1  Concepto y Definición	30](#4.2.1-concepto-y-definición)

[4.2.2 Arquitectura y Mecánica Interna	31](#4.2.2-arquitectura-y-mecánica-interna)

[4.2.3 Propósito y Aplicación en el SDLC	31](#4.2.3-propósito-y-aplicación-en-el-sdlc)

[4.2.4. Integración en el Ecosistema	31](#4.2.4.-integración-en-el-ecosistema)

[4.3 Model Context Protocol (MCP)	31](#4.3-model-context-protocol-\(mcp\))

[4.3.1.  Concepto y Definición	31](#4.3.1.-concepto-y-definición)

[4.3.2 Arquitectura y Mecánica Interna	31](#4.3.2-arquitectura-y-mecánica-interna)

[4.3.3 Propósito y Aplicación en el SDLC	32](#4.3.3-propósito-y-aplicación-en-el-sdlc)

[4.3.4 Integración en el Ecosistema	32](#4.3.4-integración-en-el-ecosistema)

[4.4  Agentes Autónomos (Agents)	33](#4.4-agentes-autónomos-\(agents\))

[4.4.1 Concepto y Definición	33](#4.4.1-concepto-y-definición)

[4.4.2. Arquitectura y Mecánica Interna	33](#4.4.2.-arquitectura-y-mecánica-interna)

[4.4.3. Propósito y Aplicación en el SDLC	34](#4.4.3.-propósito-y-aplicación-en-el-sdlc)

[4.4.4. Integración en el Ecosistema	34](#4.4.4.-integración-en-el-ecosistema)

[4.5 Skills (Capacidades Especializadas)	34](#4.5-skills-\(capacidades-especializadas\))

[4.5.1 Concepto y Definición	34](#4.5.1-concepto-y-definición)

[4.5.2 Arquitectura y Mecánica Interna	35](#4.5.2-arquitectura-y-mecánica-interna)

[4.5.3 Propósito y Aplicación en el SDLC	35](#4.5.3-propósito-y-aplicación-en-el-sdlc)

[4.5.4 Integración en el Ecosistema	35](#4.5.4-integración-en-el-ecosistema)

[4.6 Interfaces de Desarrollo: CLI, IDE y Low-Code	36](#4.6-interfaces-de-desarrollo:-cli,-ide-y-low-code)

[4.6.1 Concepto y Definición	36](#4.6.1-concepto-y-definición)

[4.6.2 Mecánica de Interacción	36](#4.6.2-mecánica-de-interacción)

[4.6.3 Propósito y Aplicación en el SDLC	37](#4.6.3-propósito-y-aplicación-en-el-sdlc)

[4.6.4 Integración en el Ecosistema	38](#4.6.4-integración-en-el-ecosistema)

[4.7 Metodologías de Desarrollo Asistido por IA	38](#4.7-metodologías-de-desarrollo-asistido-por-ia)

[4.7.1 Concepto y Definición	38](#4.7.1-concepto-y-definición)

[4.7.2 Mecánica y Diversidad Metodológica	38](#4.7.2-mecánica-y-diversidad-metodológica)

[4.7.3 Propósito y Aplicación en el SDLC	39](#4.7.3-propósito-y-aplicación-en-el-sdlc)

[4.7.4 Integración en el Ecosistema	39](#4.7.4-integración-en-el-ecosistema)

[**5\. Estado del Arte	39**](#5.-estado-del-arte)

[5.1 Evolución y Taxonomía de los Modelos de Lenguaje (LLM):	39](#5.1-evolución-y-taxonomía-de-los-modelos-de-lenguaje-\(llm\):)

[5.1.1 Mezcla Escasa de Expertos (MoE)	40](#5.1.1-mezcla-escasa-de-expertos-\(moe\))

[5.1.2 Fundamentos Matemáticos y Mecanismos de Gating	40](#5.1.2-fundamentos-matemáticos-y-mecanismos-de-gating)

[5.1.3 Predicción vs. Pensamiento Extendido (Extended Thinking)	41](#5.1.3-predicción-vs.-pensamiento-extendido-\(extended-thinking\))

[5.1.4 Gestión de Contexto y Dinámica de Tokens	42](#5.1.4-gestión-de-contexto-y-dinámica-de-tokens)

[5.1.5 Context Rot y Eficiencia	42](#heading=)

[5.1.6 Modelos Especializados y Multimodales	43](#5.1.6-modelos-especializados-y-multimodales)

[5.1.7 Despliegue: API Cloud vs. Soberanía Local	43](#5.1.7-despliegue:-api-cloud-vs.-soberanía-local)

[5.2 Análisis del Model Context Protocol (MCP)	44](#5.2-análisis-del-model-context-protocol-\(mcp\))

[5.2.1 El Problema de la Integración N x M y el Surgimiento del Estándar Abierto	45](#5.2.1-el-problema-de-la-integración-n-x-m-y-el-surgimiento-del-estándar-abierto)

[5.2.2 Arquitectura Host-Client-Server	45](#5.2.2-arquitectura-host-client-server)

[5.2.3 Resources, Tools y Prompts	46](#5.2.3-resources,-tools-y-prompts)

[5.2.3.1 Resources (Recursos):	46](#5.2.3.1-resources-\(recursos\):)

[5.2.3.2 Tools (Herramientas):	46](#5.2.3.2-tools-\(herramientas\):)

[5.2.3.3 Prompts:	47](#5.2.3.3-prompts:)

[5.2.4 MCP vs. REST APIs Tradicionales	47](#5.2.4-mcp-vs.-rest-apis-tradicionales)

[5.3 Arquitecturas de Agentes Autónomos y Sistemas Multi-Agente	48](#5.3-arquitecturas-de-agentes-autónomos-y-sistemas-multi-agente)

[5.3.1 Anatomia de un Agente	49](#heading=)

[5.3.2 Arquitectura en Cuatro Niveles	50](#5.3.2-arquitectura-en-cuatro-niveles)

[Nivel 1: Motor de Razonamiento (LLM)	50](#nivel-1:-motor-de-razonamiento-\(llm\))

[Nivel 2: Interoperabilidad mediante Herramientas	50](#nivel-2:-interoperabilidad-mediante-herramientas)

[Nivel 3: Persistencia de Contexto (Memoria)	50](#nivel-3:-persistencia-de-contexto-\(memoria\))

[Nivel 4: Determinismo y Automatización (Skills)	50](#nivel-4:-determinismo-y-automatización-\(skills\))

[5.3.3  Modos Operativos y Supervisión: Plan, Ask y Edit	51](#5.3.3-modos-operativos-y-supervisión:-plan,-ask-y-edit)

[Modo Plan (Estrategia)	51](#modo-plan-\(estrategia\))

[Modo Ask (Consulta)	51](#modo-ask-\(consulta\))

[Modo Edit / Agent (Ejecución)	52](#modo-edit-/-agent-\(ejecución\))

[Construccion de  Agentes Personalizados	52](#construccion-de-agentes-personalizados)

[5.3.4  El Directorio de Configuración .agent	53](#5.3.4-el-directorio-de-configuración-.agent)

[5.3.5 Flujo de Ejecución de un Agente	57](#5.3.5-flujo-de-ejecución-de-un-agente)

[1\. Interpretación del Objetivo	57](#1.-interpretación-del-objetivo)

[2\. Planificación de Acciones	57](#2.-planificación-de-acciones)

[3\. Ejecución mediante Herramientas	58](#3.-ejecución-mediante-herramientas)

[4\. Evaluación de Resultados	58](#4.-evaluación-de-resultados)

[5\. Ajuste y Repetición	58](#5.-ajuste-y-repetición)

[5.3.6 Modelos de Organización en Sistemas Multi-Agente	58](#5.3.6-modelos-de-organización-en-sistemas-multi-agente)

[5.3.7 Orquestación Visual de Agentes: El Paradigma Basado en Nodos (n8n)	60](#5.3.7-orquestación-visual-de-agentes:-el-paradigma-basado-en-nodos-\(n8n\))

[5.4 Skills (Capacidades Especializadas)	62](#5.4-skills-\(capacidades-especializadas\))

[5.4.1 Introducción y Naturaleza de las Skills	62](#5.4.1-introducción-y-naturaleza-de-las-skills)

[5.4.2 Proceso de Integración y Gestión del Contexto	62](#5.4.2-proceso-de-integración-y-gestión-del-contexto)

[5.4.3 Casos de Uso y Arquitectura de Archivos	63](#5.4.3-casos-de-uso-y-arquitectura-de-archivos)

[5.4.4 Agentes Generalistas frente a Agentes de Dominio	65](#5.4.4-agentes-generalistas-frente-a-agentes-de-dominio)

[5.4.5 Intersección Estratégica: Skills, Tools, MCP y Subagentes	66](#5.4.5-intersección-estratégica:-skills,-tools,-mcp-y-subagentes)

[5.4.6 Estándares de Diseño y Buenas Prácticas para SKILL.md	68](#5.4.6-estándares-de-diseño-y-buenas-prácticas-para-skill.md)

[5.5. Entornos de Desarrollo e IA de Proyecto (Codificación)	69](#5.5.-entornos-de-desarrollo-e-ia-de-proyecto-\(codificación\))

[5.5.1. Visual Studio Code	69](#5.5.1.-visual-studio-code)

[5.5.2. Google Antigravity	70](#5.5.2.-google-antigravity)

[5.5.3. GitHub Copilot Agent	71](#5.5.3.-github-copilot-agent)

[5.5.4. Codex App	73](#5.5.4.-codex-app)

[**6\. Caso de Estudio: Desarrollo Funcional Integral de un Chatbot	74**](#6.-caso-de-estudio:-desarrollo-funcional-integral-de-un-chatbot)

[6.1. Introducción al Caso Práctico	74](#6.1.-introducción-al-caso-práctico)

[Fase 1:	76](#fase-1:)

[Fase 2:	117](#fase-2:)

[Fase 3:	137](#fase-3:)

[Fase 4:	151](#fase-4:)

[**7\. Conclusiones finales	166**](#7.-conclusiones-finales)

[7.1 Conclusiones	166](#7.1-conclusiones)

[7.2 Workflow Completo	168](#7.2-workflow-completo)

[7.3 Trabajo futuro	170](#7.3-trabajo-futuro)

[7.4 Lecciones aprendidas	171](#heading=)

[**9\. Referencias	174**](#heading=)

# Índice de Figuras

[Figura 1: Ilustración sobre la paradoja del empleo y la crisis de identidad en la ingeniería de software 	30](#figura-1:-ilustración-sobre-la-paradoja-del-empleo-y-la-crisis-de-identidad-en-la-ingeniería-de-software-[1])

[Figura 2: Tendencias de contratación en el mercado laboral tecnológico y el aumento de ofertas de empleo relacionadas con IA](#figura-2:-tendencias-de-contratación-en-el-mercado-laboral-tecnológico-y-el-aumento-de-ofertas-de-empleo-relacionadas-con-ia-[1]) 	

[Figura 3: Gráfico sobre la  porcentaje de commits en Github con código repetido creado por Inteligencia Artificial 	32](#figura-3:-gráfico-sobre-la-porcentaje-de-commits-en-github-con-código-repetido-creado-por-inteligencia-artificial-[5])

[Figura 4: Gráfico sobre el estado actual del software comparado con hace 10 años 	36](#figura-4:-gráfico-sobre-el-estado-actual-del-software-comparado-con-hace-10-años-[10]-[11]-[12])

[Figura 5 : Arquitectura del Model Context Protocol (MCP) y su topología Host-Client-Server	 	43](#figura-5-:-arquitectura-del-model-context-protocol-\(mcp\)-y-su-topología-host-client-server)

[Figura 6: Lógica de orquestación jerárquica en sistemas multi-agente versus single agent	44](#figura-6:-lógica-de-orquestación-jerárquica-en-sistemas-multi-agente-versus-single-agent)

[Figura 7: Diagrama de la invocación dinámica de Skills (Capacidades Especializadas) por un agente	46](#figura-7:-diagrama-de-la-invocación-dinámica-de-skills-\(capacidades-especializadas\)-por-un-agente)

[Figura 8: Plataforma Codex desarrollada OpenAI para el desarrollo	47](#figura-8:-plataforma-codex-desarrollada-openai-para-el-desarrollo)

[Figura 9: Plataforma Claude CLI plataforma integrada en terminal para el desarrollo creada por Anthropic	48](#figura-9:-plataforma-claude-cli-plataforma-integrada-en-terminal-para-el-desarrollo-creada-por-anthropic)

[Figura 10: Diagrama de  conceptualización de un MCP versus una REST API tradicional	56](#figura-8:-diagrama-de-conceptualización-de-un-mcp-versus-una-rest-api-tradicional)

[Figura 11: Captura de ventana de selección que muestra los tres modos mencionados previamente en Visual Studio Code	62](#figura-9:-captura-de-ventana-de-selección-que-muestra-los-tres-modos-mencionados-previamente-en-visual-studio-code)

[Figura 12: Ventana de creación de un agente personalizado en Visual Studio Code	63](#figura-10:-ventana-de-creación-de-un-agente-personalizado-en-visual-studio-code)

[Figura 13: Captura del archivo config.json donde se puede ver la definición de los agentes con sus parámetros y permisos	64](#figura-11:-captura-del-archivo-config.json-donde-se-puede-ver-la-definición-de-los-agentes-con-sus-parámetros-y-permisos)

[Figura 14: Imagen de un agent.md personalizado su cabecera yaml	65](#figura-12:-imagen-de-un-agent.md-personalizado-su-cabecera-yaml)

[Figura 15: Imagen de un agent.md personalizado su context	66](#figura-13:-imagen-de-un-agent.md-personalizado-su-context)

[Figura 16: Fichero SKILL.md junto con su referencia para un caso de delegación específico	72](#figura-15:-fichero-skill.md-junto-con-su-referencia-para-un-caso-de-delegación-específico)

[Figura 17:Cabecera YAML de una skill.md	73](#figura-16:cabecera-yaml-de-una-skill.md)

[Figura 18 : Apartado de referencias en un skill.md	74](#figura-17-:-apartado-de-referencias-en-un-skill.md)

[Figura 19 : Organización de archivos de una skill con su carpeta de referencias	75](#figura-18-:-organización-de-archivos-de-una-skill-con-su-carpeta-de-referencias)

[Figura 20 : Diferencias entre  un  entorno con múltiples  agentes especializados VS Un único agente con skills	76](#figura-19-:-diferencias-entre-un-entorno-con-múltiples-agentes-especializados-vs-un-único-agente-con-skills)

[Figura 21 : Flujo Operativo de un Agente de IA implementando skills	76](#figura-20-:-flujo-operativo-de-un-agente-de-ia-implementando-skills)

[Figura 22 : Arquitectura de un Agente único implementando las diversas tecnologías mencionadas previamente	77](#figura-21-:-arquitectura-de-un-agente-único-implementando-las-diversas-tecnologías-mencionadas-previamente)

[Figura 23 : IDE Visual Studio Code	80](#figura-22-:-ide-visual-studio-code)

[Figura 24 : IDE Antigravity	81](#figura-23-:-ide-antigravity)

[Figura 25 : PR cerrada creada a traves de github copilot agent desde github.com	82](#figura-24-:-pr-cerrada-creada-a-traves-de-github-copilot-agent-desde-github.com)

[Figura 26 : Ventana de chat con github agent	82](#figura-25-:-ventana-de-chat-con-github-agent)

[Figura 27 : IDE CodexApp	84](#figura-26-:-ide-codexapp)

[Figura 28 : Captura del perfil 1 de la fase 1 con el prompt insertado en la ventana de chat  de Visual Studio Code	88](#figura-27-:-captura-del-perfil-1-de-la-fase-1-con-el-prompt-insertado-en-la-ventana-de-chat-de-visual-studio-code)

[Figura 29 : Captura del perfil 2 de la fase 1 con el prompt insertado en la ventana de chat  de Visual Studio Code	92](#figura-28-:-captura-del-perfil-2-de-la-fase-1-con-el-prompt-insertado-en-la-ventana-de-chat-de-visual-studio-code)

[Figura 30 : Captura del perfil 2 respondiendo a las preguntas claves a aclarar	95](#figura-29-:-captura-del-perfil-2-respondiendo-a-las-preguntas-claves-a-aclarar)

[Figura 31 : Captura del perfil 3 de la fase 1 con el prompt insertado en la ventana de chat  de Visual Studio Code	101](#figura-30-:-captura-del-perfil-3-de-la-fase-1-con-el-prompt-insertado-en-la-ventana-de-chat-de-visual-studio-code)

[Figura 32 : Captura del perfil 3 aplicando una corrección al mensaje de la primera iteración	112](#figura-31-:-captura-del-perfil-3-aplicando-una-corrección-al-mensaje-de-la-primera-iteración)

[Figura 33 : Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Primera pregunta	113](#figura-32-:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-primera-pregunta)

[Figura 34: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Segunda pregunta	113](#figura-33:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-segunda-pregunta)

[Figura 35: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Tercera pregunta	114](#figura-34:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-tercera-pregunta)

[Figura 36: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Cuarta pregunta	114](#figura-35:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-cuarta-pregunta)

[Figura 37: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Quinta pregunta	115](#figura-36:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-quinta-pregunta)

[Figura 38: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Sexta pregunta	115](#figura-37:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-sexta-pregunta)

[Figura 39: Mensaje final del perfil 3 para dar por finalizada la fase 1	121](#figura-38:-mensaje-final-del-perfil-3-para-dar-por-finalizada-la-fase-1)

[Figura 40: Archivo instructions.md	128](#figura-39:-archivo-instructions.md)

[Figura 41: Imagen del repositorio skills.sh	129](#figura-40:-imagen-del-repositorio-skills.sh)

[Figura 42: Carpeta skills de .agents con las skills instaladas para la codificacion del proyecto	129](#figura-41:-carpeta-skills-de-.agents-con-las-skills-instaladas-para-la-codificacion-del-proyecto)

[Figura 43: Agente especializado en la documentación de OpenAI-API con sus archivos de referencias	130](#figura-42:-agente-especializado-en-la-documentación-de-openai-api-con-sus-archivos-de-referencias)

[Figura 44: Agente especializado en la documentación de ElevenLabs-Api	131](#figura-43:-agente-especializado-en-la-documentación-de-elevenlabs-api)

[Figura 45: Ambos agentes personalizados en el directorio de agents	131](#figura-44:-ambos-agentes-personalizados-en-el-directorio-de-agents)

[Figura 46 Plan de implementación del chatbot con Supabase	133](#heading=h.y5q80kf77wiv)

[Figura 47: Plan de implementación de conversación por Voz con IA	133](#figura-46:-plan-de-implementación-de-conversación-por-voz-con-ia)

[Figura 48: Captura de varios archivos de planificación creados por los agentes.	134](#figura-47:-captura-de-varios-archivos-de-planificación-creados-por-los-agentes.)

[Figura 49: Google Stitch	139](#figura-50:-google-stitch)

[Figuras 50 y 51 : Captura de pantalla de login y registro generadas por Stitch	140](#figuras-50-y-51-:-captura-de-pantalla-de-login-y-registro-generadas-por-stitch)

[Figura 52: Captura de la pantalla principal del chatbot generada por Stitch	141](#figura-52:-captura-de-la-pantalla-principal-del-chatbot-generada-por-stitch)

[Figura 53: Captura de la pantalla de interfaz de voz del chatbot generada por Stitch	141](#figura-53:-captura-de-la-pantalla-de-interfaz-de-voz-del-chatbot-generada-por-stitch)

[Figura 54: Captura del endpoint /analizar pdf creado por el agente especializado	142](#figura-54:-captura-del-endpoint-/analizar-pdf-creado-por-el-agente-especializado)

[Figura 55: Captura del Swagger UI generado por el agente en FastAPI	142](#figura-55:-captura-del-swagger-ui-generado-por-el-agente-en-fastapi)

[Figura 56: Captura de la documentación generada automáticamente por un endpoint de la FastApi	143](#figura-56:-captura-de-la-documentación-generada-automáticamente-por-un-endpoint-de-la-fastapi)

[Figura 57: Captura de un test generado por la IA en la codificación asistida	144](#heading=h.e6cd86t7pqh7)

[Figura 58: Captura en detalle de un test	144](#figura-58:-captura-en-detalle-de-un-test)

[Figura 59: Captura de la ejecución de los tests generados	145](#figura-60:-captura-de-la-ejecución-de-los-tests-generados)

[Figuras 60 y 61: Captura de auto detección y posterior corrección de un endpoint de manera autónoma	146](#figuras-60-y-61:-captura-de-auto-detección-y-posterior-corrección-de-un-endpoint-de-manera-autónoma)

[Figura 62: Captura del agente QA-Security-Agent	150](#figura-62:-captura-del-agente-qa-security-agent)

[Figura 63: Captura del agente QA-Security-Agent analizando el repositorio y encontrado vulnerabilidades	152](#figura-63:-captura-del-agente-qa-security-agent-analizando-el-repositorio-y-encontrado-vulnerabilidades)

[Figuras 64 y 65: Captura del análisis generado por QA-Security-Agent	152](#figuras-64-y-65:-captura-del-análisis-generado-por-qa-security-agent)

[Figura 66: Captura de la creación de un test de integración y de su ejecución	155](#figura-67:-captura-de-la-creación-de-un-test-de-integración-y-de-su-ejecución)

[Figura 67: Captura de la ejecución de un test unitario y su validación	156](#figura-68:-captura-de-la-ejecución-de-un-test-unitario-y-su-validación)

[Figura 68: Captura de la ejecución de un test unitario y su validación	158](#figura-69:-captura-de-la-ejecución-de-un-test-unitario-y-su-validación)

[Figura 69: Captura de la corrección aplicada para la accesibilidad	159](#figura-70:-captura-de-la-corrección-aplicada-para-la-accesibilidad)

[Figura 70: Captura del agente DevOps-Planner	163](#figura-71:-captura-del-agente-devops-planner)

[Figura 71: Captura del plan generado por DevOps-Planner	164](#figura-72:-captura-del-plan-generado-por-devops-planner)

[Figura 72: Captura del vercel con los deployments automáticos según el commit en el repositorio de github	167](#figura-73:-captura-del-vercel-con-los-deployments-automáticos-según-el-commit-en-el-repositorio-de-github)

[Figuras 73 y 74: Captura de la configuración de las variables de entorno en vercel y de un commit en específico que se ha compilado correctamente	167](#figuras-74-y-75:-captura-de-la-configuración-de-las-variables-de-entorno-en-vercel-y-de-un-commit-en-específico-que-se-ha-compilado-correctamente)

[Figura 75: Captura de Render con los deployments automáticos según el commit en el repositorio de github del backend	169](#figura-76:-captura-de-render-con-los-deployments-automáticos-según-el-commit-en-el-repositorio-de-github-del-backend)

[Figura 76: Captura de la configuración de las variables de entorno en render	169](#figura-77:-captura-de-la-configuración-de-las-variables-de-entorno-en-render)

[Figura 77: Captura de la configuración de los parámetros de build para el backend en render		170](#figura-78:-captura-de-la-configuración-de-los-parámetros-de-build-para-el-backend-en-render)

[Figura 78: Captura de la creación del esquema SQL	171](#figura-73:-captura-de-la-creación-del-esquema-sql)

[Figura 79: Captura de los secretos en Supabase	172](#figura-73:-captura-de-los-secretos-en-supabase)

# Índice de Tablas

[Tabla 1\. Comparativa de Defectos \- Código IA vs. Código Humano (2025-2026) 	25](#tabla-1.-comparativa-de-defectos---código-ia-vs.-código-humano-\(2025-2026\)-[6])

[Tabla 2: Comparativa de los Gigantes de la IA (Marzo 2026\)	26](#tabla-2:-comparativa-de-los-gigantes-de-la-ia-\(marzo-2026\))

[Tabla 3: Comparativa de Parámetros y Eficiencia en Modelos (2026)	43](#tabla-3:-comparativa-de-parámetros-y-eficiencia-en-modelos-\(2026\)-[19]-[20]-[21])

[Tabla 4: Comparativa de Herramientas de Desarrollo y Modos de Interacción (2026)	44](#tabla-4:-comparativa-de-herramientas-de-desarrollo-y-modos-de-interacción-\(2026\)-[24]-[25]-[26])

[Tabla 5: Comparativa de Rendimiento: Local vs. Cloud (2026)	47](#tabla-5:-comparativa-de-rendimiento:-local-vs.-cloud-\(2026\)-[17]-[29])

[Tabla 6: Comparativa técnica de las primitivas del Model Context Protocol (MCP): Tools, Resources y Prompts	49](#tabla-6:-comparativa-técnica-de-las-primitivas-del-model-context-protocol-\(mcp\):-tools,-resources-y-prompts-[27]-[28]-[29])

[Tabla 7: Comparativa Del Model Context Protocol (MCP) frente REST API Tradicionales	50](#tabla-7:-comparativa-del-model-context-protocol-\(mcp\)-frente-rest-api-tradicionales-[37]-[38]-[39])

[Tabla 8: Anatomía de elementos que componen a un Agente	51](#tabla-8:-anatomia-de-elementos-que-componen-a-un-agente-[40]-[43]-[44])

[Tabla 9: Roles en sistemas multiagentes	60](#tabla-9:-roles-en-sistemas-multiagentes-[42][46])

[Tabla 10: Diferencia según estructura de gestión	61](#tabla-10:-diferencia-según-estructura-de-gestión)

[Tabla 11: Matriz de Evaluación Comparativa de Perfiles	117](#tabla-11:-matriz-de-evaluación-comparativa-de-perfiles)

[Tabla 12: Matriz de los pilares de la verificación de la Fase 3	151](#tabla-12:-matriz-de-los-pilares-de-la-verificación-de-la-fase-3)

# 1\. Introducción {#1.-introducción}

La ingeniería del *software* se define por una evolución constante marcada por logros metodológicos y tecnológicos que han redefinido la interacción entre el programador y la programación. El sector ha pasado desde los modelos lineales en cascada hasta la adopción de metodologías ágiles y marcos de trabajo como *Scrum*, los cuales permitieron gestionar la complejidad mediante la iteración y la entrega de valor continúa. En la actualidad, nos encontramos ante un nuevo punto de inflexión histórico: la integración de la Inteligencia Artificial (IA) generativa en el núcleo del desarrollo de *software*.

El uso de la IA se ha hecho un importante hueco en el flujo de trabajo cotidiano, siendo empleada para tareas que van desde la generación de código y la búsqueda de errores, hasta la redacción de correos electrónicos. Sin embargo, el problema está en que, en muchos casos, estas herramientas se tratan como facilitadores temporales. Para extraer su verdadero potencial, es necesario realizar una transición hacia un enfoque de ingeniería. Esto implica definir pautas, guías de buenas prácticas y técnicas de *prompt engineering* o gestión de contexto que aseguren un desarrollo escalable, seguro y eficiente. Debido a que este campo se encuentra en constante transformación, el presente trabajo pretende servir como una base metodológica y una iniciación formal en la integración sistémica de la IA dentro del desarrollo de *software*.

A diferencia de las transiciones previas, la adopción de la IA no solo plantea un cambio en la velocidad de ejecución, sino un desafío estructural en la integridad del código. Si no se aborda desde una perspectiva de ingeniería, se corre el riesgo de automatizar la generación de deuda técnica y degradar la calidad sistémica del *software*.

## 1.1 Motivación personal {#1.1-motivación-personal}

Como estudiante de Ingeniería Informática, la Inteligencia Artificial (IA) ha sido una herramienta recurrente durante toda mi etapa académica. La he utilizado de manera habitual para generar código o agilizar la redacción de informes, pero siempre desde una perspectiva superficial; sin mucho conocimiento de causa. Me limitaba a interactuar con los modelos de forma básica, sin profundizar realmente en cómo optimizar su comportamiento, como obtener el mejor resultado posible o entender las diferencias arquitectónicas entre las varias soluciones disponibles para obtener el mejor resultado posible. El uso que le daba era del más puro "copiar y pegar" y “fuerza bruta”.

A lo largo de la carrera, he adquirido una base en principios fundamentales de ingeniería: desarrollo de *software* escalable, gestión de requisitos, redacción de historias de usuario y estrategias de despliegue entre otras cosas. Sin embargo, mi visión sobre la IA alcanzó un punto de inflexión al iniciar mis prácticas curriculares en iAR Software. Durante los primeros meses estuve en una fase de formación intensiva en la que descubrí un ecosistema técnico que desconocía por completo: la naturaleza profunda de los modelos de lenguaje, el diseño de *workflows* especializados, la integración de *skills* y la creación de agentes especializados (*agents*) y diferentes metodologías de desarrollo asistido

Este aprendizaje me ha permitido ser consciente de que, hasta este momento, solo estaba aprovechando una mínima fracción de la capacidad real de estas herramientas.

Con un cambio de ecosistema y de metodologías totalmente distinto; sentí una gran incertidumbre; la cual era muy complicada de hacer desaparecer debido al bombardeo de información, videos explicativos y contradicciones entre diversas fuentes.

La razón de este proyecto no surge sólo de la curiosidad tecnológica, sino de la necesidad de aplicar un proceso de ingeniería riguroso a una herramienta que ya no considero un simple asistente de escritura, sino un colaborador estratégico en el ciclo de vida del *software*. Tengo la absoluta certeza de que el proceso de programación va a cambiar (si no ha cambiado ya), y en lo personal para mí ha significado un cambio de paradigma total. 

## 1.2 Contexto de las prácticas {#1.2-contexto-de-las-prácticas}

Durante el semestre de primavera de 2026, he tenido la oportunidad de realizar mis prácticas curriculares en iAR Software, una entidad especializada en el diseño y desarrollo de soluciones tecnológicas personalizadas para diversos sectores industriales. Actualmente, la organización atraviesa un proceso de transformación estratégica orientado a optimizar su flujo de trabajo mediante la integración de nuevas tecnologías. Este escenario ha sido el contexto idóneo para continuar mi formación como ingeniero informático, aportando valor directo a través de la investigación, el análisis de casos prácticos y la documentación técnica sobre el impacto de la Inteligencia Artificial (IA) en el ámbito profesional , con la posterior inclusión en equipos de trabajo para el desarrollo de proyectos.

Mi trabajo durante estos cuatro meses de formación se ha centrado en explorar cómo estas herramientas pueden integrarse en todas las etapas del ciclo de vida del *software*: desde la planificación y el análisis de requisitos, hasta el diseño, las pruebas, el despliegue y el mantenimiento. El objetivo final ha sido establecer hábitos de trabajo seguros, eficientes y mantenibles que redefinen el estándar de desarrollo en la compañía.

En iAR, el uso de la Inteligencia Artificial se encuentra totalmente integrado en la actividad diaria de los desarrolladores. La organización emplea principalmente herramientas como *GitHub Copilot*, así como *Copilot* dentro del ecosistema de *Microsoft 365*. Este uso no es informal, sino que se apoya en licencias corporativas activas, permitiendo una adopción estructurada y alineada con el entorno tecnológico de la empresa.

El acceso a estas herramientas es amplio y no existen restricciones específicas por proyecto. Sin embargo, la empresa pone un fuerte énfasis en la concienciación sobre el uso responsable de la Inteligencia Artificial, especialmente en lo relativo al tratamiento de datos. Dado que se opera dentro de un entorno *Microsoft*, donde se gestionan datos a través de plataformas como *SharePoint*, se requiere un alto nivel de rigor en la manipulación de la información. Una de las iniciativas para enfrentar esta problemática en la empresa ha sido la creación de un foro formativo sobre el uso de Inteligencia Artificial donde varios trabajadores y trabajadoras comparten información , opiniones y consejos sobre el uso de la Inteligencia Artificial en su trabajo diario.

En este sentido, se evita el uso de herramientas externas gratuitas que no ofrezcan garantías de control o confidencialidad. Además, se analiza qué tipo de información puede compartirse con sistemas de Inteligencia Artificial. En el caso de datos de cliente, se lleva a cabo una revisión a nivel de arquitectura para determinar su posible uso y, cuando procede, se consensúa previamente con el propio cliente.

Uno de los motivos por el cual nuestros primeros meses fueron exclusivamente dedicados a la formación y a la investigación de su *stack* tecnológico fue debido a su mayor preocupación identificada sobre la IA;  la cual no reside en la tecnología en sí misma, sino en su uso por parte de los desarrolladores. En particular, han observado el riesgo de que la Inteligencia Artificial deje de utilizarse como una herramienta de apoyo y pase a convertirse en un sustituto, lo que puede implicar una delegación excesiva sin la supervisión adecuada.

Este riesgo es especialmente relevante en perfiles junior como el mío, donde puede producirse una menor asunción de responsabilidad sobre el código generado. A largo plazo, esta situación puede derivar en problemas de calidad y mantenibilidad, ya que el código podría resultar más difícil de comprender, revisar y mantener.

Para mitigar estos riesgos, la empresa insiste en que la Inteligencia Artificial debe concebirse como un “copiloto”, manteniendo siempre al desarrollador como responsable final del producto. Además, se aplican procesos de revisión y validación equivalentes a los de cualquier desarrollo tradicional. 

En cuanto a la seguridad de los datos, existen políticas claras que garantizan que la información sensible del cliente no esté disponible en entornos de desarrollo y que cualquier uso de datos en herramientas de IA sea previamente evaluado.

Desde la perspectiva de la empresa, la incorporación de la inteligencia artificial en el desarrollo de *software* supone un cambio de paradigma, más allá de una simple mejora incremental. Se trata de una transformación profunda en la forma de concebir, desarrollar y gestionar proyectos tecnológicos.

En la práctica, esta evolución se traduce en una reducción significativa de los tiempos de desarrollo. Proyectos que anteriormente requerían varios meses pueden completarse actualmente en cuestión de días o semanas. Este cambio no solo afecta a la velocidad, sino también a la forma de diseñar arquitecturas, organizar equipos y abordar los problemas.

La empresa considera que la adopción de la inteligencia artificial tiene un impacto directo en la competitividad. Aquellas organizaciones que no integren estas tecnologías de manera intensiva en su operativa diaria podrían enfrentarse a dificultades para mantenerse en el mercado. Por este motivo, iAR está realizando esfuerzos activos en formación, adopción de herramientas y redefinición de sus procesos internos.

Mientras que hace uno o dos años las herramientas de inteligencia artificial se limitaban principalmente a funciones de autocompletado avanzado, en la actualidad son capaces de desarrollar aplicaciones completas con un alto grado de autonomía.

Este avance se ha evidenciado en casos internos donde perfiles no especializados en desarrollo han logrado construir aplicaciones complejas con el apoyo de la inteligencia artificial. Este hecho ha reforzado la percepción de que la adopción de estas herramientas no es opcional, sino una necesidad estratégica, lo que ha motivado una apuesta decidida por su integración.

La empresa prevé que la estandarización del uso de la Inteligencia Artificial producirá cambios significativos tanto en la forma de trabajar como en el perfil de los desarrolladores. El modelo tradicional, centrado en la escritura manual de código, está dando paso a un enfoque en el que el desarrollador se orienta más hacia la definición de problemas, la estructuración de soluciones y la supervisión de resultados.

## 1.3 Problemática {#1.3-problemática}

En la última década , el *software* ha dejado de ser una herramienta sectorial para convertirse en la infraestructura crítica sobre la que se asienta cualquier actividad económica, social o industrial. Esta realidad ha generado una demanda masiva y transversal en todos los sectores, donde la digitalización —ya sea a través de aplicaciones *web*, plataformas en la nube o soluciones móviles— no es una opción, sino un requisito indispensable para las industrias.

Sin embargo, esta presencia general ha creado una crisis de identidad en la ingeniería de *software*. La entrada masiva de la Inteligencia Artificial  generativa ha alterado los procesos de creación y el mantenimiento de sistemas digitales. Lo que inicialmente se percibió como un salto en la productividad se ha manifestado también como una disminución sistemática en la calidad del código, reportando una tasa de errores y bugs superior a la del desarrollo manual tradicional.

### 1.3.1 Paradoja del Empleo en la Ingeniería de Software {#1.3.1-paradoja-del-empleo-en-la-ingeniería-de-software}

Uno de los campos en los cuales la Inteligencia Artificial más ha afectado respecto a los desarrolladores de *software* es el mercado laboral.  En este campo se ha creado una paradoja compleja: mientras existe una necesidad urgente de talento capaz de orquestar estas nuevas tecnologías, el acceso al empleo para perfiles con una formación tradicional se ha vuelto selectivo y restrictivo. El sector ha pasado de una fase de contratación basada en el volumen (sobre todo después del 2020-2021 por la pandemia) a una centrada en el valor técnico y la fluidez en el uso de herramientas de IA, lo que ha reducido drásticamente las oportunidades para los roles de entrada o junior que no logren demostrar esta nueva competencia híbrida.  
![][image1]

##### ***Figura 1: Ilustración sobre la paradoja del empleo y la crisis de identidad en la ingeniería de software \[1\]*** {#figura-1:-ilustración-sobre-la-paradoja-del-empleo-y-la-crisis-de-identidad-en-la-ingeniería-de-software-[1]}

El mercado ya no busca simplemente "programadores". Se ha producido un giro drástico hacia roles que integran la inteligencia artificial en el flujo de trabajo *core*. Las ofertas de empleo que mencionan IA o términos relacionados han aumentado más del 130% desde 2020, incluso cuando las ofertas totales en el sector tecnológico han disminuido en comparación con su pico de 2022 \[2\].

![][image2]

##### ***Figura 2: Tendencias de contratación en el mercado laboral tecnológico y el aumento de ofertas de empleo relacionadas con IA \[1\]*** {#figura-2:-tendencias-de-contratación-en-el-mercado-laboral-tecnológico-y-el-aumento-de-ofertas-de-empleo-relacionadas-con-ia-[1]}

Debido a esto han aparecido nuevos títulos que no existían hace cinco años:

* **Ingeniero de Implementación (*Forward-Deployed Engineer*):** Centrado en integrar modelos de IA en flujos de trabajo empresariales complejos para maximizar el retorno de inversión (*ROI*) \[3\].  
* **Ingeniero de IA y ML:** Profesional responsable de la selección, entrenamiento y optimización de modelos de lenguaje (LLM) y arquitecturas de aprendizaje automático. Su labor es crítica para garantizar que los sistemas de IA sean escalables, precisos y eficientes en entornos productivos de alta demanda \[3\].  
* **Ingeniero de *Prompt* y Desarrollador de IA:** Especialista en el diseño de instrucciones estructuradas y la orquestación de agentes autónomos. Este perfil domina la creación de *skills* —capacidades específicas para realizar tareas concretas— y el uso de MCP 's ( Model Context Protocol) para permitir que la IA interactúe de forma bidireccional con herramientas y datos externos \[3\]

Actualmente en el entorno laboral se está gestando un  "*low-hire*, *low-fire*". Las empresas están reteniendo a sus trabajadores actuales para evitar la pérdida de conocimiento institucional, pero son extremadamente selectivas al contratar nuevos perfiles.

### 1.3.2 La Calidad del Software en la Era de la Inteligencia Artificial {#1.3.2-la-calidad-del-software-en-la-era-de-la-inteligencia-artificial}

Uno de los puntos más críticos de la problemática actual es el estado de la calidad del *software*. Existe una percepción creciente de que, si bien la IA permite generar código de forma más acelerada, este suele ser de menor calidad, más difícil de mantener y proponer errores estructurales con mayor frecuencia que el código escrito íntegramente por humanos a pesar de que, en teoría,  se necesite más tiempo para su desarrollo . Esta preocupación se ve agravada por la tendencia de las herramientas generativas a priorizar la estética visual o la funcionalidad inmediata sobre la arquitectura subyacente.

Un análisis de 211 millones de líneas de código realizado por *GitClear* revela que la calidad del código está sufriendo una "presión a la baja" significativa \[4\]. Entre 2020 y 2024, se observaron las siguientes tendencias:

![][image3]

##### ***Figura 3: Gráfico sobre la  porcentaje de commits en Github con código repetido creado por Inteligencia Artificial \[5\]*** {#figura-3:-gráfico-sobre-la-porcentaje-de-commits-en-github-con-código-repetido-creado-por-inteligencia-artificial-[5]}

Los mayores efectos secundarios de la IA generativa de código son : 

* **Aumento del Código Duplicado:** Como se puede observar en la Figura 3, las líneas copiadas y pegadas han aumentado casi en un  8% en los últimos años  \[4\].  
* **Colapso del *Refactoring*:** El porcentaje de código "movido" o refactorizado cayó drásticamente del 24,1% al 9,5% \[4\]. Esto indica que los desarrolladores se centran en la implementación rápida de funciones mediante IA, ignorando la salud a largo plazo de la arquitectura y generando lo que se conoce como "ruido visual".  
* **Incremento del *Churn* (Rotación de Código):** El código que se revisa o se borra a las dos semanas de ser escrito aumentó del 3,1% al 5,7% \[4\]. Esta métrica indica una mayor tasa de *commits* prematuros o de baja calidad que requieren correcciones inmediatas.

| Categoría de Error |  Incremento en Código IA | Impacto en la Mantenibilidad |
| ----- | ----- | ----- |
| Defectos Totales | 1,7x más que el humano | Mayor carga de revisión y pruebas (*testing*) |
| Errores de Lógica | \+75% | Fallos en flujos de control y dependencias críticas |
| Problemas de Legibilidad | 3x más frecuentes | Violacion de patrones locales de nombrado y estructura |
| Vulnerabilidades de Seguridad | 2,74x más frecuentes | Manejo inseguro de credenciales y objetos. |
| Inconsistencias de Formato | 2,66x más frecuentes | Fragmentación estética y técnica del código base |
| Accesibilidad (a11y) | Alta tasa de omisión | Incumplimiento de estándares WCAG y atributos ARIA |
| Operaciones de *I/O* Excesivas | 8x más comunes | Regresiones de rendimiento por patrones de código ineficientes |

##### ***Tabla 1\. Comparativa de Defectos \- Código IA vs. Código Humano (2025-2026) \[6\]*** {#tabla-1.-comparativa-de-defectos---código-ia-vs.-código-humano-(2025-2026)-[6]}

### 

### 1.3.3 Homogeneización de la Web y la Teoría del Internet Muerto {#1.3.3-homogeneización-de-la-web-y-la-teoría-del-internet-muerto}

La llegada de la IA no solo ha afectado a lo que hay "bajo el capó" (el código), sino también a la dimensión estética de la *web*. En 2025, más del 70% de las empresas han incorporado IA en su diseño *web* y estrategias de marca \[7\]. El uso de estas herramientas permite crear sitios más rápido y a menor coste, y en consecuencia ha dado lugar a la "estética de la IA". 

Las herramientas de diseño basadas en IA generativa funcionan bajo una lógica probabilística. Al ser entrenadas con conjuntos de datos de sitios *web* existentes, tienden a proponer estructuras, paletas de colores y tipografías que representan el "promedio" de lo que ya existe. El resultado es un paisaje digital donde todas las páginas comienzan a verse iguales: interfaces predecibles, sin capas, sin personalidad y sin imaginación; la cual genera un rechazo al usuario.

Esto se conoce como la "paradoja de la homogeneidad inteligente" \[8\] . A pesar de que cada producto quiere parecer avanzado e inteligente, terminan siendo y viéndose idénticos. Estudios sobre la fijación del diseño en la IA muestran que los diseñadores expuestos a resultados de IA tienden a perpetuar los mismos patrones visuales y conceptuales, creando un ciclo vicioso de empobrecimiento creativo.

Esto mismo alimenta a  la "Teoría del Internet Muerto". Según esta teoría, la mayor parte de la actividad en internet hoy en día ya no es generada por humanos, sino por *bots* de IA, *scripts* automatizados y contenido algorítmico diseñado para maximizar métricas de interacción para las corporaciones.

Entre 2018 y 2025 \[9\], la *DIT* pasó de ser una teoría de conspiración a un marco de análisis relevante para entender la pérdida de autenticidad en línea. Los factores que impulsan este sentimiento incluyen:

* **Contenido Sintético Masivo:** Videos generados por IA, voces sintetizadas, *influencers* "*deepfake*" y artículos de noticias redactados por algoritmos que llenan los resultados de búsqueda.  
* **Manipulación de Redes Sociales:** *Bots* programados para dar "*like*", comentar y compartir crean una ilusión de actividad.  
* **Control Algorítmico:** Las plataformas priorizan las recomendaciones generadas por IA sobre las publicaciones orgánicas de los usuarios, creando un entorno donde el contenido humano es cada vez más difícil de encontrar.

### 1.3.4 Los Gigantes de la IA: Anthropic , OpenAI y Google {#1.3.4-los-gigantes-de-la-ia:-anthropic-,-openai-y-google}

La revolución actual está siendo dirigida por un pequeño grupo de entidades que controlan los modelos de lenguaje extenso (*Large Language Models* \- LLM) más avanzados. En 2026, el mercado de la IA empresarial se ha consolidado como un oligopolio donde OpenAI, Anthropic y Google (Alphabet) no solo proveen la infraestructura, sino que definen los estándares de desarrollo que el resto de la industria debe adoptar.

| Entidad | Modelo Principal | Fortaleza en el SDLC | Debilidad |
| ----- | ----- | ----- | ----- |
| Anthropic | Claude 4.6 / Claude Code | Razonamiento técnico y refactorización compleja de código. | Alta barrera de entrada técnica; requiere uso intensivo de CLI y gestión manual de tokens. |
| OpenAI | GPT-5.4 / Codex | Lógica algorítmica pura y rapidez en tareas de boilerplate. | Propensión al "ruido visual" y a la generación de código redundante si no hay supervisión estricta. |
| Google | Gemini 3 / Nano Banana | Multimodalidad y materialización de UI a partir de bocetos. | Inconsistencia sistémica; suele ignorar estándares de accesibilidad (a11y) y sistemas de diseño persistentes. |

### 

##### ***Tabla 2: Comparativa de los Gigantes de la IA (Marzo 2026\)*** {#tabla-2:-comparativa-de-los-gigantes-de-la-ia-(marzo-2026)}

Como podemos observar en la Tabla 2, el panorama competitivo de la Inteligencia Artificial en 2026 presenta una especialización funcional donde cada actor dominante ha consolidado nichos de valor diferenciados dentro del ciclo de vida del desarrollo de software (SDLC).

Por un lado, Anthropic ha protagonizado un hito histórico al capturar hasta el 40% de la cuota de mercado con Claude 4.6. Su fortaleza radica en una integración nativa y segura bajo la herramienta *Claude Code*, que prioriza el razonamiento técnico y la refactorización compleja. Aunque presenta una barrera de entrada más técnica debido al uso intensivo de interfaces de línea de comandos (CLI), se ha vuelto el estándar para ingenieros que buscan fidelidad técnica y seguridad sobre la generación masiva.

En contraste, OpenAI mantiene su hegemonía en términos de potencia bruta y velocidad de inferencia. El modelo Codex, integrado en la familia GPT-5.4, sigue siendo la opción preferencial para la resolución de lógica algorítmica pura y la generación rapida. Aun asi varios usuarios señalan que su uso requiere una supervisión humana más estricta para mitigar la propensión al 'ruido visual' o a la redundancia de código si no se aplican directrices de contexto precisas.

Finalmente, Google ha redefinido el concepto de multimodalidad con la arquitectura Gemini 3 y modelos especializados como Nano Banana Pro. Su capacidad para materializar interfaces de usuario (UI) a partir de bocetos y su potencia en visión artificial lo hacen imbatible en las fases de prototipado rápido. Aun así tienen una debilidad en la consistencia sistémica, mostrando carencias en la adherencia a estándares de accesibilidad (a11y) y en el mantenimiento de sistemas de diseño persistentes.

### 1.3.5 Determinantes de la Convergencia Tecnológica {#1.3.5-determinantes-de-la-convergencia-tecnológica}

Estamos viviendo una confluencia de factores tecnológicos y económicos que han generado una convergencia de fuerzas sin precedentes para la explosión de la IA.

El factor desencadenante actual tiene también una base física. El crecimiento de la capacidad de cómputo, impulsado por *clusters* de *GPUs* de alto rendimiento, ha seguido una trayectoria exponencial. Entre 2024 y 2025, la inversión en infraestructura de *hardware* dedicada exclusivamente a la IA superó a todas las inversiones tecnológicas previas.

Asimismo, el volumen de datos disponible para el entrenamiento ha alcanzado una masa crítica. Toda la producción digital de las últimas dos décadas ha servido de material de entrenamiento para los modelos actuales. Actualmente, la IA ha alcanzado un umbral de madurez donde comienza a generar sus propios "datos sintéticos" para continuar su aprendizaje, lo que podría desvincular su crecimiento de la producción de datos humanos, aunque este fenómeno refuerza las preocupaciones mencionadas sobre la degradación de la autenticidad en la red. 

La viabilidad económica de la IA ha experimentado un cambio radical. El coste de la inferencia —el proceso de ejecución de un modelo ya entrenado— ha caído aproximadamente 280 veces en los últimos dos años \[11\]. Esta reducción de costes ha permitido que la IA deje de ser una herramienta de nicho para integrarse en procesos cotidianos, desde el autocompletado de comunicaciones hasta la optimización logística compleja, haciendo que su adopción sea financieramente imperativa para el tejido empresarial global.

La combinación de todos estos factores, han causado la mayor explosicion en la industria del *Software*

![][image4]

##### ***Figura 4: Gráfico sobre el estado actual del software comparado con hace 10 años \[10\] \[11\] \[12\]*** {#figura-4:-gráfico-sobre-el-estado-actual-del-software-comparado-con-hace-10-años-[10]-[11]-[12]}

# 2\. Objetivos

## 2.1 Objetivo general {#2.1-objetivo-general}

El objetivo principal de este Trabajo de Fin de Grado es investigar, estructurar y validar la integración práctica de la Inteligencia Artificial (IA) generativa en todas las fases del ciclo de vida del desarrollo de *software* (SDLC). Esto es debido a que existe una incertidumbre en el entorno empresarial a la hora de adoptar estas tecnologías, motivada por el riesgo real de que el código pierda calidad, aumentan los errores de lógica, degenere en una arquitectura difícil de mantener a largo plazo o que los programadores pierdan el contexto de los proyectos. Por tanto, este trabajo de fin de grado busca superar el enfoque simplista que limita la IA a un "autocompletador" o asistente superficial.

Para lograrlo, el proyecto asume un propósito amplio y formativo: desmitificar el funcionamiento interno de la IA aplicada a la programación, catalogar y evaluar las distintas herramientas disponibles en el mercado, y proporcionar el conocimiento necesario para que cualquier desarrollador sepa cómo configurar y optimizar su propio entorno de trabajo.

De este modo, se busca capacitar al lector para dominar desde el *stack* tecnológico básico hasta conceptos más avanzados, como la orquestación de sistemas multi-agente, la gestión dinámica del contexto y la integración de arquitecturas RAG (*Retrieval-Augmented Generation*). Todo este recorrido técnico convergerá en la definición de un marco de trabajo (*workflow*) claro y respaldado por principios de ingeniería sólidos.

Para demostrar la viabilidad de todo lo anterior, los conocimientos adquiridos se aplicarán en el desarrollo de un caso de uso completo y de mayor envergadura, abarcando todas las fases del desarrollo del *software*.

En definitiva, este trabajo pretende demostrar que la integración de la IA no debe ser una fuente de caos o deuda técnica, sino un motor de eficiencia bajo un control de ingeniería riguroso. Se busca definir un modelo de trabajo profesional, responsable y adaptado a las exigencias tecnológicas actuales

## 2.2 Objetivos específicos {#2.2-objetivos-específicos}

A continuación, se listan los objetivos específicos del trabajo, los cuales detallan las metas técnicas, analíticas y documentales que permitirán alcanzar el propósito general de la investigación:

### 2.2.1 Selección, categorización y evaluación del ecosistema tecnológico {#2.2.1-selección,-categorización-y-evaluación-del-ecosistema-tecnológico}

El primer paso consiste en identificar y categorizar un conjunto representativo de soluciones de IA que cubra todas las fases del desarrollo de *software*, abarcando desde asistentes de código (*copilots*) hasta plataformas *no-code/low-code*, herramientas de automatización y soluciones de *testing*. 

### 2.2.2 Desarrollo de un caso de estudio funcional integral {#2.2.2-desarrollo-de-un-caso-de-estudio-funcional-integral}

Este objetivo constituye el núcleo práctico del proyecto y busca medir la expansión del alcance productivo del desarrollador de forma cuantitativa y cualitativa. Consiste en implementar una aplicación basada en IA que integre una interfaz de chat, gestión de conversaciones temporales, integración de una base de conocimiento (*Knowledge Base*) y capacidades de generación de voz (*Text-to-Speech* o TTS). El desarrollo se apoyará en un *copilot* para la creación de la API y los servicios,la creación de agentes personalizados para librerías especificas, utilización de *skills* para la codificación, y una metodología *Specific Driven Development* (SDD);  priorizando en todo momento la robustez y la calidad. 

Se pretende demostrar que un solo ingeniero puede abarcar tareas transversales (creación de documentación exhaustiva, diseño funcional y generación de *tests* automáticos) entregando una solución compleja en ciclos más cortos. Todo ello manteniendo una estructura limpia y una arquitectura modular, asegurando que la agilidad inicial no genere una deuda técnica inmanejable derivada de una automatización mal supervisada.

### 2.2.3 Diseño de un entorno de trabajo (*workspace*) personalizado y arquitecturas de vanguardia {#2.2.3-diseño-de-un-entorno-de-trabajo-(workspace)-personalizado-y-arquitecturas-de-vanguardia}

Este objetivo se centra en la aplicación práctica y autónoma de los conocimientos, introduciendo y difundiendo arquitecturas de IA de vanguardia. Se explicarán de manera clara conceptos avanzados como el protocolo *Model Context Protocol* (MCP), el diseño de *skills* y el despliegue de agentes (*agents*). La finalidad es capacitar al desarrollador para que construya su propio ecosistema a medida (*workspace*), aprendiendo a seleccionar y orquestar agentes autónomos, definiendo capacidades específicas para tareas repetitivas y aplicando técnicas de *prompting* y gestión de contexto. A través de este marco, se produce una transferencia de conocimiento: el ingeniero pasa de ser un usuario pasivo de herramientas preconfiguradas a un orquestador activo, capaz de optimizar su entorno de trabajo adaptándolo a su propio estilo de programación.

### 2.2.4 Definición de un workflow estandarizado y guía de adopción práctica {#2.2.4-definición-de-un-workflow-estandarizado-y-guía-de-adopción-práctica}

El objetivo final consiste en consolidar todo el conocimiento adquirido a lo largo de la investigación en un entregable de alto valor práctico: una "Guía de adopción rápida". La intención de esta guía es servir como un manual para estandarizar el uso de la IA en el día a día de los desarrolladores. 

Sintetiza recomendaciones específicas por fase del proyecto e incluirá herramientas visuales, como matrices de decisión, para determinar qué IA utilizar en cada contexto. Además, documentará estrictamente un conjunto de "hábitos seguros mínimos viables", estableciendo reglas claras para la revisión de código, el control de versiones y la protección de datos sensibles. El propósito último es entregar un *workflow* comprobado que elimine la incertidumbre empresarial, demostrando que la integración de la IA puede ser un proceso ordenado, auditable y altamente profesional.

# 3\. Alineación a los objetivos de desarrollo sostenible

El proyecto desarrollado se alinea de manera significativa con los Objetivos de Desarrollo Sostenible (ODS) de la Agenda 2030 de las Naciones Unidas, demostrando que la evolución de la Ingeniería de Software mediante la Inteligencia Artificial (IA) trasciende la mera eficiencia técnica para impactar positivamente en el entorno socioeconómico y ambiental. A través de la investigación y estandarización del uso de herramientas generativas en el ciclo de vida del desarrollo (SDLC), este Trabajo de Fin de Grado contribuye de forma directa y transversal a las siguientes metas globales:

En primer lugar, el proyecto incide fundamentalmente en el ODS 9 (Industria, Innovación e Infraestructura). La sistematización de la IA generativa supone una modernización profunda de las infraestructuras tecnológicas y los procesos industriales. Al transicionar de una generación de código estocástica o impulsiva (*vibecoding*) a paradigmas estructurados y auditables como el *Specific-Driven Development* (SDD), se fomenta una innovación tecnológica resiliente, dotando a las empresas de marcos de trabajo que les permiten construir sistemas de información más robustos, seguros y escalables.

En segundo lugar, se aporta valor al ODS 8 (Trabajo Decente y Crecimiento Económico). La automatización algorítmica de tareas repetitivas y la asistencia inteligente (mediante agentes o *copilots*) no buscan la sustitución del talento humano, sino la elevación del rol del desarrollador hacia labores de alto nivel cognitivo, como el diseño arquitectónico y la orquestación de sistemas. Esto mejora de forma drástica la productividad empresarial, optimiza el entorno de trabajo al reducir la fatiga operativa (*burnout*) y fomenta la capacitación continua de los profesionales en competencias digitales de vanguardia.

Adicionalmente, la propuesta guarda una estrecha relación con el ODS 12 (Producción y Consumo Responsables) mediante el fomento de la sostenibilidad del software. El código generado sin supervisión metodológica incrementa la "deuda técnica", lo que exige un mayor consumo de recursos computacionales (y, por ende, energéticos) para el posterior mantenimiento, depuración y ejecución de procesos ineficientes. Al imponer metodologías rigurosas, pruebas automatizadas y control de calidad asistido desde la fase de ideación, se promueve un desarrollo de software eficiente y limpio, mitigando la huella de carbono asociada al uso innecesario de servidores corporativos.

Por último, aunque de forma más transversal, el proyecto apoya el ODS 4 (Educación de Calidad). Al consolidar guías prácticas, matrices de evaluación y marcos metodológicos, este documento actúa como una herramienta pedagógica de alto valor, facilitando que estudiantes y desarrolladores emergentes adquieran los hábitos seguros y necesarios para integrar la IA de manera ética, responsable y profesional en su día a día.

# 4\. Ecosistema Tecnológico y Metodológico {#4.-ecosistema-tecnológico-y-metodológico}

Este capítulo tiene como objetivo definir y analizar el *stack* tecnológico fundamental que sustenta el desarrollo en un entorno asistido por Inteligencia Artificial. Para ello, se desglosan los pilares técnicos que permiten una integración sistémica. A través de esta especificación, se pretende establecer la base conceptual necesaria para transformar el uso libre y heterogéneo de estas tecnologías en un modelo de trabajo profesional, auditable y eficiente.

## 4.1  Large Language Models (LLM) y Gestión de Contexto {#4.1-large-language-models-(llm)-y-gestión-de-contexto}

### 4.1.1 Concepto y Definición {#4.1.1-concepto-y-definición}

Los *Large Language Models* (LLM) son el núcleo de la Inteligencia Artificial (IA) generativa contemporánea, definiéndose como sistemas de procesamiento de lenguaje natural basados en redes neuronales de escala masiva. En 2026, estos modelos han evolucionado de ser motores de predicción de texto a infraestructuras de razonamiento automatizado, capaces de interpretar lógica compleja y ejecutar tareas.

### 4.1.2 Arquitectura y Mecánica Interna {#4.1.2-arquitectura-y-mecánica-interna}

La arquitectura de los modelos más potentes actualmente, como *GPT-5.4, Claude Opus 4.6*  o *Gemini 3.1*, se basa en sistemas de *Sparse Mixture of Experts* (MoE). En este diseño, solo una fracción de los parámetros totales se activa para cada *token* procesado, optimizando drásticamente la eficiencia computacional.

* **El *Token* como Unidad Atómica:** Un *token* es la unidad mínima de información que procesa un LLM; no equivale necesariamente a una palabra, sino a fragmentos de caracteres o sílabas que el modelo utiliza para descomponer y entender el lenguaje.  
* **Gestión de la Ventana de Contexto:** La capacidad de "memoria" a corto plazo de una IA está delimitada por su ventana de contexto, cuyo límite lo marcan los *tokens*. Para generar una respuesta coherente, el modelo "lee" continuamente el pasado de la conversación y el código previo, utilizándolos como referencia para predecir el siguiente fragmento de información.  
* **Generalismo vs. Especialización:** Mientras que modelos como *Gemini 3* son de propósito general y multimodales , existen otros como *Codex* o *Claude Opus 4.6* que, aunque mantienen capacidades generales, han sido entrenados u optimizados mayoritariamente con *datasets* de código fuente, lo que los hace superiores en tareas de arquitectura y refactorización.  
* **Modos de Interacción en Desarrollo:** En los entornos modernos, el desarrollador interactúa con el LLM mediante tres modos principales:  
  * ***Plan*****:** El modelo analiza el problema y propone una estrategia de solución antes de escribir código.  
  * ***Ask*****:** Un modo de consulta tipo chat para resolver dudas puntuales o entender fragmentos de lógica.  
  * ***Edit*****:** El modelo aplica cambios directamente sobre los archivos existentes, realizando refactorizaciones o correcciones.  
* **Despliegue Local vs. Nube:** Los modelos pueden residir en la nube (accesibles vía *API* para máxima potencia) o ejecutarse de forma local mediante herramientas como *Ollama*, priorizando la privacidad y soberanía de los datos.

### 4.1.3 Integración en el Ecosistema {#4.1.3-integración-en-el-ecosistema}

En el flujo de trabajo moderno, el LLM funciona como el "cerebro" orquestador que interactúa con el entorno mediante canales como la *Command Line Interface* (CLI) o entornos integrados (*IDE*). Su potencia se multiplica al integrarse con sistemas de agentes autónomos y protocolos de comunicación como el *Model Context Protocol* (MCP), permitiendo que el modelo acceda de forma bidireccional a herramientas externas, bases de datos y sistemas de archivos para ejecutar acciones reales

### 4.1.4. Propósito y Aplicación en el SDLC {#4.1.4.-propósito-y-aplicación-en-el-sdlc}

El propósito principal de los LLM dentro del Ciclo de Vida del Desarrollo de *Software* (*SDLC*) es actuar como un colaborador estratégico. Su aplicación abarca desde la ingeniería de requisitos y el prototipado rápido hasta la implementación de código, la validación mediante *testing* automático y la generación de documentación técnica. 

## 4.2  *Ingeniería de Instrucciones (Prompting)* {#4.2-ingeniería-de-instrucciones-(prompting)}

### 4.2.1  Concepto y Definición {#4.2.1-concepto-y-definición}

El *prompting* ha dejado de ser una simple interacción conversacional para consolidarse como la interfaz lógica fundamental del desarrollo moderno. Se define como el proceso sistemático de diseñar y optimizar las instrucciones de entrada para dirigir el comportamiento de un LLM hacia resultados que cumplan con estándares de precisión y seguridad. En 2026, el *Prompt Engineering* no es una habilidad accesoria, sino una disciplina técnica esencial para garantizar que el desarrollo asistido sea escalable y no degenere en deuda técnica prematura.

### 4.2.2 Arquitectura y Mecánica Interna {#4.2.2-arquitectura-y-mecánica-interna}

Técnicamente, el *prompting* actúa sobre la gestión del contexto y la probabilidad de predicción de *tokens*. Su efectividad reside en la capacidad del ingeniero para orquestar la información mediante estrategias de estructuración de datos:

* **Gestión de Contexto:** Consiste en suministrar al modelo el marco de referencia exacto (código previo, esquemas de bases de datos o requisitos funcionales) para que la respuesta sea coherente con el sistema global.  
* **Técnicas de Estructuración:** Se aplican métodos como *Zero-shot* (instrucciones directas) o *Few-shot* (aprendizaje mediante ejemplos) para moldear la naturaleza de la salida del modelo.  
* **Instrucciones de Sistema:** Permiten asignar un "rol" o perfil técnico específico al modelo (ej. experto en seguridad *OWASP*), lo que eleva la fidelidad técnica y reduce el ruido visual en el código generado.

### 4.2.3 Propósito y Aplicación en el SDLC {#4.2.3-propósito-y-aplicación-en-el-sdlc}

Su propósito dentro del ciclo de vida (*SDLC*) es actuar como el primer filtro de calidad del código. Un enfoque de ingeniería en las instrucciones permite mitigar la "erosión sistemática" de la calidad observada en el desarrollo manual sin supervisión. Esto facilita la automatización de requisitos en especificaciones técnicas ejecutables y asegura que el código cumpla con los protocolos de seguridad de la compañía desde su concepción.

### 4.2.4. Integración en el Ecosistema {#4.2.4.-integración-en-el-ecosistema}

El *prompting* es el lenguaje de control que orquesta el resto del *stack*. Es la señal de activación para las *skills* de los agentes y define el uso de herramientas externas a través del protocolo *MCP*. Bajo esta visión, el ingeniero informático deja de ser un mero "escritor de sintaxis" para transformarse en un orquestador activo que configura y dirige un ecosistema de desarrollo a medida.

## 4.3 Model Context Protocol (MCP) {#4.3-model-context-protocol-(mcp)}

### 4.3.1.  Concepto y Definición {#4.3.1.-concepto-y-definición}

El *Model Context Protocol* (MCP) surge como la respuesta a la fragmentación tecnológica que lastraba la productividad en años anteriores. Es un estándar abierto de conectividad diseñado para unificar la interacción entre los modelos de lenguaje y cualquier herramienta o fuente de datos externa. En la práctica, funciona como el "estándar universal" que permite que cualquier modelo de IA se conecte a entornos diversos sin necesidad de desarrollar conectores propietarios.

### 4.3.2 Arquitectura y Mecánica Interna {#4.3.2-arquitectura-y-mecánica-interna}

Su robustez reside en una arquitectura tripartita que separa las responsabilidades de conexión:

* ***Host***: El entorno donde reside el razonamiento de la IA (un *IDE* o un agente autónomo).  
* ***Client***: El puente encargado de gestionar la comunicación segura con los servidores de recursos.  
* ***Server***: La capa que expone las capacidades mediante tres primitivas: *Tools* (funciones para ejecutar acciones), *Resources* (contexto de solo lectura) y *Prompts* (flujos de trabajo predefinidos).

![][image5]

##### ***Figura 5 : Arquitectura del Model Context Protocol (MCP) y su topología Host-Client-Server*** {#figura-5-:-arquitectura-del-model-context-protocol-(mcp)-y-su-topología-host-client-server}

### 4.3.3 Propósito y Aplicación en el SDLC {#4.3.3-propósito-y-aplicación-en-el-sdlc}

El MCP tiene como misión eliminar los silos de información. En el desarrollo cotidiano, permite que la IA acceda de forma bidireccional a repositorios de *GitHub*, bases de datos o herramientas de comunicación como *Slack*. Esto asegura que el agente tenga una visión holística del proyecto, reduciendo la tasa de errores lógicos derivada de la falta de contexto.

### 4.3.4 Integración en el Ecosistema {#4.3.4-integración-en-el-ecosistema}

Representa el "cableado" que hace posible la autonomía real. No solo alimenta al modelo con datos, sino que introduce el concepto de *sampling*, donde el sistema externo puede solicitar tareas específicas al modelo. Es, en definitiva, la tecnología que permite que la IA deje de ser un asistente de texto para convertirse en un actor operativo dentro de la infraestructura de la empresa.

## 4.4  Agentes Autónomos (Agents) {#4.4-agentes-autónomos-(agents)}

### 4.4.1 Concepto y Definición {#4.4.1-concepto-y-definición}

Los agentes autónomos son la evolución de los modelos "copilotos" de primera generación. Como indica su nombre los modelos "copilotos" eran acompañantes, donde el usuario era el encargado de llevar "el volante" y el copiloto simplemente acataba ordenes o no tenia una gran capacidad de ejecución individual, en cambio los agentes representan entidades de *software* con capacidad de razonamiento, planificación y ejecución independiente. Los modelos han pasado de sugerir líneas de código a gestionar objetivos complejos con una intervención humana mínima, actuando como colaboradores estratégicos que entienden el "para qué" de una tarea y no solo el "cómo".

### 4.4.2. Arquitectura y Mecánica Interna {#4.4.2.-arquitectura-y-mecánica-interna}

La operatividad de las herramientas de IA generativa en entornos de desarrollo profesional han superado la interacción mediante *prompts* aislados. La eficiencia de estos sistemas en el ciclo de vida del *software* (SDLC) depende de una arquitectura subyacente que permita gestionar la complejidad, mantener la coherencia del contexto y garantizar la trazabilidad de las decisiones técnicas. En este sentido, la transición hacia ecosistemas de agentes especializados marca un punto de inflexión en la autonomía del sistema, permitiendo que la IA deje de ser un asistente de autocompletado, para convertirse en un colaborador estratégico estructurado.

Estos sistemas operan bajo una lógica jerárquica de orquestación *multi-agent*. Un "Agente Orquestador" recibe la instrucción, descompone la problemática en subtareas lógicas y las delega en "Agentes Ejecutores" especializados. Esta estructura permite diseñar organigramas donde cada agente asume un perfil técnico (analista, desarrollador *backend*, experto en QA), lo que optimiza la precisión y evita que la arquitectura del sistema se degrade bajo el peso de una automatización mal dirigida.

![][image6]

##### ***Figura 6: Lógica de orquestación jerárquica en sistemas multi-agente versus single agent*** {#figura-6:-lógica-de-orquestación-jerárquica-en-sistemas-multi-agente-versus-single-agent}

### 

### 4.4.3. Propósito y Aplicación en el SDLC {#4.4.3.-propósito-y-aplicación-en-el-sdlc}

La integración de agentes en el entorno de trabajo de un desarrollador redefine su rol de ingeniero informático: pasa de un implementador a supervisor. Dentro del ciclo de vida del *software* (SDLC) , los agentes pueden asumir tareas repetitivas o de alta complejidad técnica — que van desde el análisis inicial de requisitos hasta el despliegue—, permitiendo alcanzar velocidades de entrega más cortas sin comprometer la robustez del producto final siempre.

### 4.4.4. Integración en el Ecosistema {#4.4.4.-integración-en-el-ecosistema}

El agente es el motor que da vida al *workspace* del desarrollador. Se integran con el contexto del producto para interactuar con el proyecto. Esta conexión le permite no solo "proponer" cambios, sino operar activamente sobre el sistema de archivos y las herramientas de desarrollo, ejecutando refactorizaciones y correcciones en tiempo real bajo la supervisión del ingeniero. 

Esta integración se da mediante el uso de diversas herramientas como *Github Copilot*, *Claude CLI* o hasta un *chatbot web*.

## 4.5 Skills (Capacidades Especializadas) {#4.5-skills-(capacidades-especializadas)}

### 4.5.1 Concepto y Definición {#4.5.1-concepto-y-definición}

Las skills son las habilidades técnicas modulares que permiten a un agente realizar tareas de ingeniería con un alto nivel de especialización y detalle. Representan el conjunto de capacidades prácticas —como ejecutar un *script*, consultar una base de datos o realizar un despliegue— que se le otorgan a la IA para que su interacción con el mundo real sea precisa y eficiente. De la misma manera que una persona cuenta con habilidades específicas para ejecuciones de tareas como, un diseñador tiene más habilidad de diseño , una skill trata de nutrir el conocimiento y la habilidad de un agente a través de la especificación y el conocimiento para tareas específicas concretas.

### 4.5.2 Arquitectura y Mecánica Interna {#4.5.2-arquitectura-y-mecánica-interna}

A diferencia del conocimiento general de un modelo, las *skills* son herramientas estructuradas que el agente invoca dinámicamente según lo requiera su plan de trabajo. Generalmente expuestas a través de MCP o instaladas localmente a través de ficheros de especificación en formato *Markdown*, estas capacidades permiten que el modelo comprenda el momento exacto en que debe abandonar el razonamiento probabilístico para para pasar a una especificación y ejecutar una acción técnica concreta. 

La gran ventaja competitiva de este paradigma es que el desarrollador puede crear sus propias *skills* personalizadas. En lugar de repetir instrucciones complejas repetidamente para una misma tarea, el ingeniero encapsula flujos recurrentes en habilidades reutilizables, reduciendo la variación de las generaciones de LLM basados en probabilidad y asegurando que las tareas se ejecuten siempre bajo los mismos estándares y especificación; consiguiendo así resultados de mayor calidad y constantes.

![][image7]

##### ***Figura 7: Diagrama de la invocación dinámica de Skills (Capacidades Especializadas) por un agente*** {#figura-7:-diagrama-de-la-invocación-dinámica-de-skills-(capacidades-especializadas)-por-un-agente}

### 4.5.3 Propósito y Aplicación en el SDLC {#4.5.3-propósito-y-aplicación-en-el-sdlc}

Su propósito es dotar a la IA de la "especialización" necesaria para tareas que el lenguaje natural no puede resolver por sí solo. En el SDLC, se aplican para cualquier fase;  desde automatizar planes de pruebas, gestionar infraestructura, generación de código para *frameworks* específicos o diseño de UI ; garantizando que la agilidad ganada no se traduzca en una pérdida de calidad técnica.

### 4.5.4 Integración en el Ecosistema {#4.5.4-integración-en-el-ecosistema}

Las *skills* son la siguiente fase después del razonamiento del agente y la acción física sobre el código. Mediante la orquestación de estas capacidades, el ingeniero informático configura un ecosistema de herramientas a medida, adaptando la potencia de la IA a su estilo particular de programación o necesidades y a los requisitos específicos de cada proyecto profesional. 

## 4.6 Interfaces de Desarrollo: CLI, IDE y Low-Code {#4.6-interfaces-de-desarrollo:-cli,-ide-y-low-code}

### 4.6.1 Concepto y Definición {#4.6.1-concepto-y-definición}

Las interfaces de desarrollo constituyen la base de un desarrollo, casi desde un principio hasta su final. A lo largo de los años han evolucionado de editores de texto a centros de mando asistidos por Inteligencia Artificial. Representan las capas de interacción donde el ingeniero orquesta el ecosistema que constituye un proyecto, permitiendo flujos de trabajo que transitan desde el control técnico absoluto, control de versiones, hasta la materialización visual de ideas mediante lenguaje natural en la actualidad.

### 4.6.2 Mecánica de Interacción {#4.6.2-mecánica-de-interacción}

La interacción hombre-máquina se diversifica en función de la fase del proyecto y el nivel de precisión requerido, es por eso que existen distintos entornos de desarrollo. Con la implementación de la IA, no solo los desarrolladores han necesitado la evolución de estos entornos; sino que con la entrada de nuevos usuarios de un nivel no tan técnico, han tenido que surgir nuevas plataformas para ellos; donde el coste de entrada sea mucho menor. Es por eso que se pueden categorizar en 3 tipos; de un nivel de conocimiento mayor enfocado a gente con unos conocimientos tecnicos superiores a unos de menor complejidad y más amistosos para el usuario no programador:

* ***Command Line Interface*** **(CLI):** Es el canal de máxima fidelidad para la orquestación de agentes y flujos complejos. Herramientas como *Claude Code* operan aquí de forma nativa, permitiendo ejecutar refactorizaciones y gestiones de dependencias con un control total sobre el sistema.  
* ***Integrated Development Environment*** **(IDE):** Editores como Cursor, Windsurf o Visual Studio integran la IA en el flujo de escritura, ofreciendo una visión integral del *workspace*. Facilitan los modos operativos de *Plan* (diseño), *Ask* (consulta) y *Edit* (aplicación de cambios).  
* **Plataformas *Low-Code/No-Code*:** Soluciones como *Loovable* o *Stitch* permiten generar prototipos funcionales e interfaces directamente desde instrucciones verbales o bocetos, abstrayendo la complejidad del *frontend* en las fases iniciales.

![][image8]

##### ***Figura 8: Plataforma Codex desarrollada OpenAI para el desarrollo*** {#figura-8:-plataforma-codex-desarrollada-openai-para-el-desarrollo}

![][image9]

##### ***Figura 9: Plataforma Claude CLI plataforma integrada en terminal para el desarrollo creada por Anthropic*** {#figura-9:-plataforma-claude-cli-plataforma-integrada-en-terminal-para-el-desarrollo-creada-por-anthropic}

### 4.6.3 Propósito y Aplicación en el SDLC {#4.6.3-propósito-y-aplicación-en-el-sdlc}

Estas interfaces buscan optimizar la velocidad de entrega sin sacrificar el rigor de ingeniería. Mientras que las plataformas *Low-Code* aceleran la validación de ideas y diseños en horas, se pierde pero control sobre el código generado. En cambio, la combinación de la CLI y los IDEs asistidos asegura que la lógica de negocio y el *backend* mantengan la escalabilidad y adherencia a los patrones de diseño ya que habilitan al usuario de una revisión más activa y control. Las distintas interfaces requieren un nivel de abstracción diferente.

### 4.6.4 Integración en el Ecosistema {#4.6.4-integración-en-el-ecosistema}

Estas plataformas actúan como el punto de entrada para los LLM, los agentes y la interacción con el usuario. A través de estas capas, el desarrollador configura su entorno de trabajo personalizado, seleccionando el grado de abstracción necesario para cada tarea y supervisando la interacción de la IA con su proyecto.

## 4.7 Metodologías de Desarrollo Asistido por IA {#4.7-metodologías-de-desarrollo-asistido-por-ia}

### 4.7.1 Concepto y Definición {#4.7.1-concepto-y-definición}

Las metodologías de desarrollo en 2026 han evolucionado para integrar de forma sistémica la IA generativa en el *Software Development Life Cycle* (*SDLC*). Son los marcos de trabajo y procesos que definen cómo el ingeniero interactúa con los agentes para transformar una necesidad de negocio en un sistema funcional, seguro y mantenible. Esta evolución metodológica busca mitigar riesgos críticos como la generación masiva de deuda técnica o la pérdida de coherencia arquitectónica.

### 4.7.2 Mecánica y Diversidad Metodológica {#4.7.2-mecánica-y-diversidad-metodológica}

El ecosistema actual se divide principalmente en tres enfoques que varían en su nivel de rigor y control:

* ***Vibecoding*** **(Desarrollo por Intención):** Se define como un proceso iterativo de "intento-a-código" donde el desarrollador actúa como un director de visión. El programador describe objetivos en lenguaje natural y la IA se encarga de la implementación técnica, priorizando la agilidad y el resultado visual inmediato sobre la microgestión sintáctica. Aunque acelera drásticamente el prototipado, conlleva riesgos de seguridad y de "comportamientos desconocidos" debido a una gestión deficiente de los casos de borde.  
* ***Specific-Driven Development*** **(SDD):** Es el antítesis del *Vibecoding*, apoyado en herramientas como el *Spec Kit*. En el *SDD*, la especificación técnica es el "único punto de verdad" ejecutable que guía a los agentes. El flujo se basa en comandos como */specify* (definición de requisitos), */plan* (arquitectura) y */implement* (ejecución), garantizando la reproducibilidad y la coherencia sistémica.  
* ***Prompt-Driven Development*** **(PDD) y *TDD*:** El *PDD* eleva el lenguaje natural a instrucción de ingeniería de alto nivel para orquestar la construcción de componentes. Se combina frecuentemente con el *Test-Driven Development* (*TDD*) asistido, donde los agentes generan primero la suite de pruebas basada en la especificación y solo escriben el código cuando los criterios de aceptación están formalmente definidos.

### 4.7.3 Propósito y Aplicación en el SDLC {#4.7.3-propósito-y-aplicación-en-el-sdlc}

El propósito de aplicar estas metodologías es gestionar la "Paradoja de METR". Este es el fenómeno donde la percepción de velocidad en el desarrollo aumenta , pero el tiempo real de finalización se ralentiza debido a la carga excesiva de verificación y corrección de errores sutiles.

 La aplicación de marcos como el SDD o el TDD asistido busca controlar el "Impuesto de Calidad" (gestionando el aumento en el tamaño de las solicitudes de cambio (PRs) generadas por IA, facilitando su revisión), reducir la tasa de defectos (mitigando el incremento  en vulnerabilidades de seguridad observados en el código generado sin supervisión metodológica) y asegurar la mantenibilidad (evitando el colapso del refactoring, asegurando que la arquitectura evolucione de forma ordenada y no mediante parches aislados).

### 4.7.4 Integración en el Ecosistema {#4.7.4-integración-en-el-ecosistema}

Estas metodologías actúan como la capa lógica que gobierna el uso de los LLM, los agentes y demás tecnologías mencionadas anteriormente. Mientras que las tecnologías proporcionan la "potencia", las metodologías proporcionan el "control". El ingeniero utiliza interfaces como la CLI o el IDE para aplicar estos marcos, transformando el proceso de desarrollo de una tarea de escritura manual a una de orquestación y validación de alto nivel bajo principios de ingeniería rigurosos.

# 5\. Estado del Arte {#5.-estado-del-arte}

Una vez definidos conceptos claves y haberte tenido una introducción a estos, es imperativo profundizar en ellos.

## 5.1 Evolución y Taxonomía de los Modelos de Lenguaje (LLM):  {#5.1-evolución-y-taxonomía-de-los-modelos-de-lenguaje-(llm):}

## La arquitectura de los Modelos de Lenguaje de Gran Escala (LLM) han evolucionado de unos modelos monolíticos y pesados (*Feed-Forward Network* o FFN)  con grandes problemas de ineficiencias (sobre todo en latencia) a modelos pesados a arquitecturas de Mezcla Escasa de Expertos (MoE) y sistemas de razonamiento de tiempo de inferencia. Este cambio, más que un aumento de escala, prioriza la eficiencia, la soberanía de los datos y la planificación autónoma. La nueva taxonomía clasifica estos sistemas por su capacidad para manejar ventanas de contexto de millones de tokens y operar en modalidades multimodales nativas (visión, audio, ejecución de código) en flujos de trabajo agénticos unificados.

### 5.1.1 Mezcla Escasa de Expertos (MoE) {#5.1.1-mezcla-escasa-de-expertos-(moe)}

Una Mezcla Escasa de Expertos (o *Sparse Mixture of Experts*, MoE por sus siglas en inglés) es una arquitectura avanzada de redes neuronales que permite crear modelos de Inteligencia Artificial gigantescos sin que el coste de computación se dispare.  En lugar de que toda la red neuronal procese cada palabra o dato que introduces, el modelo está dividido en sub-redes más pequeñas, y solo se activan unas pocas para cada tarea.    
El diseño de los LLM actuales están basados en estas arquitecturas MoE,  debido a su capacidad para equilibrar potencia y coste de inferencia.

Esta premisa, que está basada en un estudio de 1991 "Adaptive Mixture of Local Experts" \[13\] , se ha implementado como el estándar para los modelos actuales. Esta tecnología consiste en, mediante capas con un "*gating route*r", seleccionan dinámicamente una pequeña parte de los "expertos" (parámetros) para procesar cada token.\[14\] 

### 5.1.2 Fundamentos Matemáticos y Mecanismos de Gating {#5.1.2-fundamentos-matemáticos-y-mecanismos-de-gating}

Técnicamente, una capa MoE sustituye a la capa tradicional de red de alimentación lineal por un conjunto de bloques expertos { E1, E2, . . . , En} y una red de compuerta G. La salida de la capa para un vector de entrada dado X se puede expresar mediante la siguiente fórmula:

### **y \= i= 1uG(x)i Ei(x)**

Donde G(x)i es un vector escaso donde la mayoría de los componentes son cero.\[15\] La eficiencia se maximiza cuando solo los expertos con los pesos más altos en G(x) son computados. La escasez se define formalmente como la proporción de parámetros inactivos:

                                                 Sparsity \= 1 \-Top-k ExpertsTotal Experts

Este diseño permite que modelos actuales como GPT-5.4 mantengan una latencia extremadamente baja y un coste operativo reducido a pesar de su gran inteligencia latente \[16\]. La especialización de los expertos permite que el modelo asimile patrones de datos mucho más complejos sin sufrir la interferencia de información irrelevante durante el entrenamiento, lo que se traduce en una mayor precisión y una reducción del 33% \[17\]  en los errores de afirmaciones individuales en comparación con versiones anteriores. \[18\] 

La siguiente tabla detalla la distribución de parámetros y la eficiencia de activación de los principales modelos que definen el mercado actual:

| Modelo | Parámetros Totales (E) | Parámetros Activos/Token | Arquitectura | Contexto Máximo |
| ----- | ----- | ----- | ----- | ----- |
| **GPT-5.4 Pro** | \~1.8 Trillones | \~40-60 Billones | Sparse MoE | 1.05M |
| **Gemini 3.1 Pro** | \~1.75 Trillones | \~11-20 Billones  | MoE \+ Deep Think | 1.0M |
| **Claude 4.6 Opus** | \~800 Billones | No Divulgado | Adaptive Thinking | 1.0M |
| **Mistral Large 3** | 673 Billones | 39 Billones  | 128 Experts/Layer  | 128K |
| **DeepSeek-V4** | 675.2 Billones | \~32 Billones | Multi-Token Prediction | 164K |
| **Trinity Mini** | 26 Billones | 3 Billones  | Sparse MoE Compact | 131K |

##### ***Tabla 3: Comparativa de Parámetros y Eficiencia en Modelos (2026) \[19\] \[20\] \[21\]***    {#tabla-3:-comparativa-de-parámetros-y-eficiencia-en-modelos-(2026)-[19]-[20]-[21]}

### 5.1.3 Predicción vs. Pensamiento Extendido (Extended Thinking) {#5.1.3-predicción-vs.-pensamiento-extendido-(extended-thinking)}

Una de las mayores diferencias en la categorización de los modelos  es el cambio entre la predicción tradicional de tokens y las capacidades de razonamiento profundo o *Extended* *Thinking* \[22\]. Mientras que los modelos convencionales generan respuestas de forma inmediata basándose en la probabilidad estadística de predicción del texto, los modelos de razonamiento introducen una fase sustancial de computación interna antes de emitir cualquier tipo de respuesta \[16\].

### Esta capacidad no se limita a un aumento de la potencia de cálculo, sino que representa un cambio hacia el paradigma de la Cadena de Pensamiento (*Chain of Thought*) \[23\]. Técnicamente, este proceso permite al modelo 3 características clave:

* ### **Descomponer problemas complejos:** La IA segmenta una instrucción de alto nivel en subtareas lógicas ejecutables.

* ### **Validación interna:** El sistema evalúa la viabilidad de una solución arquitectónica y realiza una autocrítica de su propia lógica antes de la implementación final.

* ### **Reducción de errores estructurales:** Al planificar antes de codificar, se mitigan los fallos en flujos de control y dependencias críticas que suelen aparecer en modelos de respuesta inmediata

| Herramienta | Filosofía de Diseño | Modos Destacados | Puntos Fuertes Técnicos |
| ----- | ----- | ----- | ----- |
| **Claude Code** | Agente de ejecución terminal  | Plan, Ask, Edit, Review  | Razonamiento profundo multi-archivo  |
| **Cursor** | IDE aumentado visualmente  | Composer, Agent, Chat  | Autocompletado Supermaven de baja latencia  |
| **Visual Studio Agent** | Integración nativa de Microsoft  | Ask, Agent, Planning  | Depuración profunda y builds integrados  |
| **Copilot Workspace** | Flujo Issue-to-PR en GitHub  | Plan, Implement, Review  | Alineación con flujos de trabajo de GitHub  |

  ##### ***Tabla 4: Comparativa de Herramientas de Desarrollo y Modos de Interacción (2026) \[24\] \[25\] \[26\]*** {#tabla-4:-comparativa-de-herramientas-de-desarrollo-y-modos-de-interacción-(2026)-[24]-[25]-[26]}

### 5.1.4 Gestión de Contexto y Dinámica de Tokens {#5.1.4-gestión-de-contexto-y-dinámica-de-tokens}

La unidad atómica de procesamiento de un LLM es el token, que puede representar una palabra, una sub-palabra o un carácter \[15\]. La gestión eficiente de estos tokens define la capacidad de un modelo para retener información durante sesiones de larga duración.

### La ventana de contexto representa el límite de la "memoria de trabajo" de un modelo durante una sesión, determinando cuánta información puede procesar de forma simultánea para generar una respuesta coherente basándose en las siguientes estrategias:  

1. **Auditoría exhaustiva de software**: La capacidad de cargar repositorios de código completos en una sola solicitud permite a los modelos comprender las dependencias globales y las relaciones entre módulos.  
2. **Análisis documental masivo**: Es posible procesar cientos de documentos de gran tamaño para realizar comparaciones cruzadas y obtener una síntesis de los datos.  
3. **Aprendizaje contextual inmediato**: Los modelos pueden asimilar guías de estilo y bases de conocimiento completas rápidamente, reduciendo o eliminando la necesidad de procesos de *fine-tuning* o entrenamiento adicional.

### 5.1.5 *Context Rot* y Eficiencia

### A pesar del gran tamaño de las ventanas de contexto actuales, los modelos de lenguaje sufren de *Context Rot*  (pérdida del contexto), donde la atención o la capacidad de “recordar” se degrada hacia el centro o prioriza excesivamente los tokens recientes. Esto provoca que los modelos puedan "olvidar" instrucciones iniciales críticas tras pocas interacciones, incluso estando lejos del límite de tokens.

### Para afrontar este problema y gestionar el alto coste asociado al contexto largo, se implementan técnicas como:

* **Context Caching**: Almacena fragmentos de contexto estáticos en los servidores del proveedor, lo que reduce el coste de procesamiento recurrente hasta en un 90% \[27\].  
* **Context Compaction**: Utilizada en Claude 4.6, resume automáticamente el historial de la conversación al alcanzar un umbral de tokens, liberando espacio y manteniendo la coherencia narrativa \[28\].

### 5.1.6 Modelos Especializados y Multimodales {#5.1.6-modelos-especializados-y-multimodales}

La evolución arquitectónica de los Modelos de Lenguaje Extenso (LLM) ha evolucionado en una diferenciación estratégica en sus procesos de entrenamiento. Al principio, los modelos base, son pre entrenados mediante una entrada masiva de datos heterogéneos y de propósito general, lo que les da una comprensión semántica amplia y capacidades conversacionales para abarcar todo tipo de temas. 

Sin embargo, para cumplir las exigencias  de los desarrolladores, las empresas en su momento optaron por, aparte de crear modelos más generalistas, a crear modelos más específicos, los cuales,  mediante procesos de *fine-tuning* se crean modelos enfocados a dominios técnicos específicos.

Dentro de este ámbito, destacan  ( y son de gran interés para el desarrollo de este trabajo de fin de grado), los modelos especializados en la generación, comprensión y refactorización de código. Por parte de OpenAI, la familia de Codex ha sido optimizada con conjuntos de datos de repositorios de código,  con una gran velocidad (por su modo *fastest*) en tareas lógicas y algorítmicas. Por otro lado, Anthropic ha liderado esta especialización técnica en el flujo de trabajo del ingeniero con variantes avanzadas como Opus y su modelo derivado Claude Code, los cuales priorizan el razonamiento técnico profundo y la comprensión estructural para sistemas complejos, junto con una alta calidad de codigo y comprensión de arquitecturas. A día de hoy, popularmente, se considera a Claude Code la mejor familia de modelos LLM para la codificación. 

La frontera del desarrollo actual exige superar la barrera del simple texto mediante la adopción de la multimodalidad nativa. Existen modelos avanzados que poseen una capacidad para entender, interpretar imágenes y generar imágenes. El ecosistema tecnológico de Google es el lider en este campo, integrando en su serie Gemini una capacidad de visión artificial de gran potencia con los modelos Nano Banana  y su variante Nano Banana Pro. 

Estos modelos multimodales especializadas permiten no solo analizar entornos visuales, sino materializar interfaces de usuario (UI) a partir de bocetos simples, haciendo desaparecer el límite entre el diseño visual y la implementación técnica en las fases de prototipado del ciclo de vida del *software*

### 5.1.7 Despliegue: API Cloud vs. Soberanía Local {#5.1.7-despliegue:-api-cloud-vs.-soberanía-local}

La decisión sobre el despliegue de modelos de lenguaje en 2026 se centra en equilibrar la potencia de cálculo, la latencia, el coste y la soberanía de los datos.

Los servicios basados en API Cloud (Vertex AI, OpenAI, Anthropic) ofrecen acceso a modelos masivos ideales para tareas de razonamiento extremo, integración de herramientas nativas (búsqueda, ejecución de código) y escalabilidad automática.

Por otro lado, la ejecución local ha evolucionado gracias a herramientas como Ollama. Ollama es un entorno de ejecución de código abierto diseñado para gestionar, optimizar y ejecutar Modelos de Lenguaje de Gran Escala (LLM) de forma local. 

Sumado a la revolución de hardware mencionada anteriormente, con la arquitectura de Memoria Unificada de Apple Silicon (chips M4/M5), la ejecución de modelos locales se ha vuelto una opción muy popular por ingenieros y científicos de datos para garantizar la privacidad y soberanía de los datos; sumado a que tienen un coste fijo de entrada y una capacidad de uso ilimitada. 

Al ser dos tipos de servicios totalmente distintos, sus diferencias son notorias. Los modelos más potentes actuales del mercado están bajo el monopolio de las empresas que los desarrollaron ya que son de propiedad privada, en cambio para las ejecuciones en locales se usan modelos de código abierto (*open sourc*e) que tienen un peor rendimiento que los anteriores. El uso de LLM locales de gran capacidad están limitados por la capacidad hardware del sistema ya que requieren una gran infraestructura. 

| Dimensión | API Cloud (GPT-5.4 Pro) | Local (Ollama M5 Max 128GB) |
| ----- | ----- | ----- |
| **Latencia inicial** | 500ms \- 2s (Depende de red) | \<100ms (Inmediato)  |
| **Coste** | Per-token ($2.50/$15.00)  | Coste de hardware fijo  |
| **Privacidad** | ZDR disponible en planes Enterprise  | Datos nunca abandonan la máquina  |
| **Capacidad** | Frontera (1.8T parámetros)  | Quantized (Hasta 120B parámetros)  |
| **Disponibilidad** | Requiere internet | Funciona offline |

##### ***Tabla 5: Comparativa de Rendimiento: Local vs. Cloud (2026) \[17\] \[29\]***  {#tabla-5:-comparativa-de-rendimiento:-local-vs.-cloud-(2026)-[17]-[29]}

## 5.2 Análisis del Model Context Protocol (MCP) {#5.2-análisis-del-model-context-protocol-(mcp)}

### 5.2.1 El Problema de la Integración N x M y el Surgimiento del Estándar Abierto {#5.2.1-el-problema-de-la-integración-n-x-m-y-el-surgimiento-del-estándar-abierto}

En las fases tempranas, los desarrolladores se enfrentaban a el problema de integración N x M.  Si existen N  aplicaciones de IA y M fuentes de datos o herramientas, la integración de cada par requería un *custom connector* (fragmento de código único y específico escrito exclusivamente para que una aplicación "A" pueda hablar con una fuente de datos "B"), resultando en código redundante y fragmentado \[30\].

El Model Context Protocol aborda esta ineficiencia al exigir que tanto el cliente de IA como el servidor de datos implementen el estándar una sola vez, reduciendo la complejidad total de las integraciones de N x M a N \+ M \[31\]. Esta estandarización no sólo aceleró el desarrollo, sino que también estandarizó el acceso a capacidades de IA, permitiendo que incluso las herramientas más pequeñas se vuelvan "compatibles con la IA" sin una inversión masiva en integraciones personalizadas. \[32\]\[33\]

### 5.2.2 Arquitectura Host-Client-Server {#5.2.2-arquitectura-host-client-server}

## El Model Context Protocol (MCP) se basa en una arquitectura tripartita (razonamiento, comunicación y ejecución) que mejora la seguridad y la flexibilidad en comparación con las arquitecturas de API tradicionales. Su topología permite que un único Host orqueste múltiples Clientes conectados a servidores especializados, creando un tejido de contexto modular.

## El Host es la aplicación de IA utilizada por el usuario (ej. Claude Desktop, Visual Studio Code), actuando como coordinador central. Gestiona el ciclo de vida de las conexiones, aplica políticas de seguridad y consentimiento, y orquesta la integración del modelo de lenguaje con datos externos. Puede manejar múltiples clientes simultáneamente y optimiza el uso de la ventana de contexto al presentar solo información relevante al modelo.

## El Cliente MCP, dentro del Host, es la capa de transporte y traducción. Se encarga del inicio de la sesión, la negociación de capacidades (handshake) y asegura el cumplimiento del protocolo JSON-RPC \[34\]. Además, actúa como gestor de descubrimiento, recuperando metadatos sobre herramientas y recursos del servidor, y mantiene sesiones con estado para gestionar suscripciones a flujos de datos en tiempo real.

## El Servidor MCP es el componente que envuelve una fuente de datos o herramienta específica (ej. una base de datos PostgreSQL o la API de Slack), exponiéndola al ecosistema de IA de forma estandarizada. Actúa como una fachada que hace que cualquier sistema conectado "se vea igual" para la IA, independientemente de la tecnología subyacente, permitiendo al modelo interactuar con diversos sistemas usando un lenguaje unificado. Los servidores pueden ejecutarse local o remotamente.

![][image10]

##### ***Figura 8: Diagrama de  conceptualización de un MCP versus una REST API tradicional*** {#figura-8:-diagrama-de-conceptualización-de-un-mcp-versus-una-rest-api-tradicional}

### 5.2.3 Resources, Tools y Prompts {#5.2.3-resources,-tools-y-prompts}

La verdadera potencia del MCP está en cómo categoriza las interacciones entre la IA y los sistemas externos. Estas tres permiten a los desarrolladores definir qué puede "saber" la IA, qué puede "hacer" y cómo debe "comportarse" de manera segura y estructurada.\[35\]

#### 5.2.3.1 Resources (Recursos):  {#5.2.3.1-resources-(recursos):}

### Los Recursos son fuentes de datos de solo lectura esenciales para el *grounded generation* y el *Retrieval-Augmented Generation* (RAG) avanzado, ya que fijan las respuestas del modelo en hechos verificables basados en el contexto o documentos adjuntos por el usuario. Se identifican de forma única mediante un *URI* y un tipo MIME. Existen Recursos Directos (datos específicos) y Plantillas de Recursos (consultas parametrizadas para acceso dinámico a datos). El protocolo también soporta suscripciones y notificaciones para alertar al cliente sobre cambios en los datos.

#### 5.2.3.2 Tools (Herramientas):  {#5.2.3.2-tools-(herramientas):}

Las herramientas en la IA son funciones ejecutables que permiten a los modelos realizar acciones y generar cambios en sistemas, a menudo con efectos secundarios como el envío de mensajes o la ejecución de scripts. Su invocación depende de descripciones semánticas claras que guían al LLM. Para garantizar la seguridad y previsibilidad, estas herramientas utilizan un estricto JSON Schema para la validación de parámetros. Además, debido a que pueden realizar acciones críticas, se enfatiza el control del usuario (*Human-in-the-Loop*), implementándose a menudo diálogos de aprobación antes de su ejecución.

#### 5.2.3.3 Prompts:  {#5.2.3.3-prompts:}

Los prompts en el MCP son plantillas parametrizadas que guían la interacción del modelo para tareas específicas o dominios complejos \[35\]. Permiten a los desarrolladores de servidores ofrecer "recetas" optimizadas para interactuar con sus sistemas \[36\].

| Atributo | Tools | Resources | Prompts |
| ----- | ----- | ----- | ----- |
| **Control** | Modelo de IA (autónomo) | Aplicación Host (gestión) | Usuario Final (selección)  |
| **Estado** | Modificable (escritura/acción) | Solo lectura (recuperación) | Plantilla de instrucción  |
| **Identificador** | Nombre de función único | URI (esquema file://, https://, etc.) | Nombre del prompt (ej. /plan-vacation)  |
| **Uso Principal** | Ejecución de lógica y side-effects | Alimentación de contexto al modelo | Guía de workflows y roles  |

##### ***Tabla 6: Comparativa técnica de las primitivas del Model Context Protocol (MCP): Tools, Resources y Prompts \[27\] \[28\] \[29\]*** {#tabla-6:-comparativa-técnica-de-las-primitivas-del-model-context-protocol-(mcp):-tools,-resources-y-prompts-[27]-[28]-[29]}

## 

## 

### 

### 

### 

### 

### 

### 5.2.4 MCP vs. REST APIs Tradicionales {#5.2.4-mcp-vs.-rest-apis-tradicionales}

Es fundamental entender que el MCP no reemplaza a las *APIs REST*, sino que construye una capa de abstracción sobre ellas diseñada específicamente para el consumo por parte de modelos de IA \[37\] .

| Dimensión | Model Context Protocol (MCP) | *REST API* Tradicional |
| ----- | ----- | ----- |
| Modelo de Conexión | Sesiones con estado (Stateful) | Peticiones independientes (Stateless)  |
| Descubrimiento de Capacidades | Dinámico (Runtime discovery) | Estático (Design-time integration)  |
| Transmisión de Contexto | Intrínseca al protocolo (Context awareness) | Manual y fragmentada (External management)  |
| Bidireccionalidad | Nativa (Sampling y Elicitation) | Simulada o compleja (Webhooks/Polling)  |
| Interoperabilidad | Estandarizada (Protocolo universal) | Fragmentada (Múltiples patrones y formatos)  |

##### ***Tabla 7: Comparativa Del Model Context Protocol (MCP) frente REST API Tradicionales \[37\] \[38\] \[39\]*** {#tabla-7:-comparativa-del-model-context-protocol-(mcp)-frente-rest-api-tradicionales-[37]-[38]-[39]}

Como se puede observar en la tabla 7 hay diferencias sustanciales entre ambas tecnologías a pesar de tener un propósito similar.

El MCP resuelve el problema de la "pérdida de contexto" entre llamadas sucesivas a una API. Mientras que en REST el desarrollador debe pasar manualmente el estado entre peticiones, en MCP la sesión persistente mantiene la conciencia de las acciones previas y sus resultados, permitiendo flujos de trabajo multietapa mucho más naturales para los agentes de IA. Es por esto que los modelos actuales implementan MCP para manejar el contexto.

## 5.3 Arquitecturas de Agentes Autónomos y Sistemas Multi-Agente {#5.3-arquitecturas-de-agentes-autónomos-y-sistemas-multi-agente}

En la actualidad, el concepto de "agente" va más allá  de la generación de texto; representa una entidad autónoma diseñada para navegar por los procesos de negocio mediante el uso de herramientas, memoria y una capacidad de planificación que imita la resolución de problemas humanos \[40\]. Esta evolución está basada en arquitecturas que no solo buscan la eficacia, sino la predictibilidad y consistencia necesaria para la integración empresarial, apoyándose en estructuras de datos y flujos de trabajo definidos \[41\]. El despliegue de estos sistemas requiere un entendimiento de la orquestación jerárquica y los modelos de organización, tales como la estructura horizontal y la estructura departamental, que permiten escalar la inteligencia artificial a una integración similar al funcionamiento de un equipo de trabajo \[42\].

Un agente autónomo no es simplemente un modelo de lenguaje grande (LLM) operando en un vacío; es una construcción arquitectónica que utiliza al modelo como su "cerebro" o motor de razonamiento, pero que se integra con una serie de componentes externos para interactuar con el mundo real \[43\]. La distinción técnica entre un sistema de inteligencia artificial convencional y un sistema agéntico radica en la capacidad de este último para tomar iniciativas, ejecutar acciones multietapa y ajustar su estrategia basándose en la retroalimentación del entorno sin intervención humana constante \[40\].

### 5.3.1 Anatomia de un Agente

Un agente de inteligencia artificial es un sistema diseñado para operar de forma autónoma mediante la integración de varios módulos funcionales que le permiten percibir, razonar, actuar y aprender de su entorno. A diferencia de un *chatbot* tradicional, cuya funcionalidad se limita a generar respuestas, un agente es capaz de ejecutar tareas complejas dentro de un ecosistema..

El funcionamiento de un agente comienza con el módulo de percepción, encargado de recopilar información relevante del entorno. Esta información puede provenir tanto de entradas directas del usuario como de sistemas externos (APIs, bases de datos, sensores digitales) o incluso de cambios en un entorno compartido.

Una vez obtenidos los datos, el agente activa su módulo de razonamiento, basado en un Modelo de Lenguaje de Gran Escala (LLM). Este componente interpreta la intención del usuario, gestiona la ambigüedad inherente al lenguaje natural y elabora un plan de acción estructurado, descomponiendo el objetivo en múltiples pasos.

La fase de ejecución traduce este plan en acciones concretas mediante el uso de herramientas integradas. Estas herramientas permiten al agente interactuar con sistemas reales, como repositorios de código, servicios *web* o plataformas de automatización empresarial, convirtiendo así el razonamiento en resultados tangibles. 

Finalmente, el agente incorpora mecanismos de memoria y recuperación de información, fundamentales para evitar que cada interacción comience desde cero. La memoria permite mantener el contexto en el corto plazo y almacenar conocimiento relevante a largo plazo, facilitando tanto la continuidad en tareas complejas como la adaptación a preferencias y patrones históricos.

| Componente | Función Técnica | Impacto en la Autonomía |
| ----- | ----- | ----- |
| Cerebro (LLM) | Razonamiento, planificación y toma de decisiones. | Proporciona la lógica para manejar la ambigüedad |
| Memoria de Corto Plazo | Contexto de la conversación actual y estado inmediato. | Permite mantener la coherencia en tareas complejas. |
| Memoria de Largo Plazo | Almacenamiento semántico de experiencias previas. | Facilita el aprendizaje y la personalización histórica. |
| Herramientas (Tools) | APIs, intérpretes de código y acceso a archivos. | Transforma el pensamiento en acción tangible. |
| Planificación | Descomposición de objetivos en sub-tareas ejecutables. | Estructura la ejecución para evitar errores de lógica. |

##### ***Tabla 8: Anatomia de elementos que componen a un Agente \[40\] \[43\] \[44\]*** {#tabla-8:-anatomia-de-elementos-que-componen-a-un-agente-[40]-[43]-[44]}

### 5.3.2 Arquitectura en Cuatro Niveles {#5.3.2-arquitectura-en-cuatro-niveles}

La evolución desde un sistema conversacional básico hasta un agente autónomo puede entenderse como una progresión en cuatro niveles de capacidad. Cada nivel añade una capa de funcionalidad que acerca al sistema a una operación más autónoma y fiable dentro del ciclo de vida del desarrollo de software.

#### Nivel 1: Motor de Razonamiento (LLM) {#nivel-1:-motor-de-razonamiento-(llm)}

El núcleo de cualquier agente es el Modelo de Lenguaje. Más allá de generar texto, el LLM actúa como un motor de inferencia capaz de interpretar la intención del usuario a partir de instrucciones en lenguaje natural.

En esta etapa, el sistema puede identificar objetivos y parámetros clave, así como determinar si dispone de suficiente información para responder o si necesita generar un plan intermedio. No obstante, su conocimiento está limitado a los datos de entrenamiento, lo que restringe su capacidad operativa en entornos dinámicos.

#### Nivel 2: Interoperabilidad mediante Herramientas {#nivel-2:-interoperabilidad-mediante-herramientas}

Para superar estas limitaciones, el agente se conecta a herramientas externas que amplían su alcance. Estas herramientas suelen definirse mediante esquemas estructurados (por ejemplo, en formato JSON) que describen las capacidades disponibles, como acceso a bases de datos, navegación web o ejecución de código.

Gracias a esta integración, el agente puede obtener información actualizada, interactuar con sistemas reales y reducir significativamente el riesgo de generar respuestas incorrectas o desactualizadas.

#### Nivel 3: Persistencia de Contexto (Memoria) {#nivel-3:-persistencia-de-contexto-(memoria)}

En aplicaciones reales, especialmente dentro del desarrollo de software, es fundamental que el agente mantenga contexto a lo largo del tiempo. Para ello, se incorporan sistemas de memoria persistente, frecuentemente implementados mediante bases de datos vectoriales.

Estas bases permiten almacenar información de forma semántica y recuperarla mediante búsquedas de similitud, lo que facilita al agente recordar decisiones previas, preferencias del usuario o patrones de diseño sin sobrecargar su contexto inmediato.

#### Nivel 4: Determinismo y Automatización (Skills) {#nivel-4:-determinismo-y-automatización-(skills)}

El nivel más avanzado introduce el concepto de *skills* o habilidades, que son flujos de trabajo predefinidos y deterministas diseñados para tareas específicas.

Dado que los modelos de lenguaje son inherentemente probabilísticos, las organizaciones requieren mecanismos que garanticen resultados consistentes. Las *skills* responden a esta necesidad encapsulando lógica estructurada que el agente puede activar cuando detecta una intención concreta.

Esto permite automatizar procesos complejos de múltiples etapas —como análisis de logs, auditorías de seguridad o generación de *tickets*— con un alto grado de fiabilidad, combinando la flexibilidad del razonamiento con la precisión de la ejecución programada.

### 5.3.3  Modos Operativos y Supervisión: Plan, Ask y Edit {#5.3.3-modos-operativos-y-supervisión:-plan,-ask-y-edit}

La integración de agentes en el flujo de desarrollo de *software* no se realiza como un proceso único, sino mediante la separación explícita de modos operativos. Esta segmentación permite desacoplar el razonamiento de la ejecución, facilitando la supervisión humana y reduciendo riesgos asociados a cambios automáticos en sistemas complejos.

En este contexto, los agentes modernos operan principalmente bajo tres modos: *Plan*, *Ask* y Edit (o *Agent*). 

#### Modo Plan (Estrategia) {#modo-plan-(estrategia)}

El modo *Plan* constituye la fase deliberativa del agente. En este nivel, el sistema actúa como un arquitecto de *software*, generando un plan estructurado sin realizar modificaciones directas sobre el código.

El resultado de este proceso es un conjunto de pasos organizados —normalmente representados como un grafo de tareas— que describe:

* Qué componentes serán modificados  
* Qué dependencias están implicadas  
* Qué estrategia de implementación se seguirá

Es el componente esencial del *Spec-Driven Development* (SDD), donde el plan debe ser validado por el ingeniero antes de pasar a la fase de construcción, reduciendo drásticamente la "Paradoja de METR" o el tiempo excesivo de corrección posterior \[41\].

#### Modo Ask (Consulta) {#modo-ask-(consulta)}

El modo *Ask* funciona como una interfaz de exploración y análisis. Su objetivo no es actuar sobre el sistema, sino comprenderlo. En este modo, el agente, analiza la base de código, responde preguntas sobre lógica de negocio e identifica relaciones entre componentes

En sistemas avanzados, este proceso puede implicar el uso de sub-agentes que operan en paralelo para analizar grandes repositorios, detectando dependencias implícitas o patrones arquitectónicos complejos.

Este modo es ideal para procesos de consultas a nivel técnico como por ejemplo:  “¿Donde está definida esta funcionalidad ? “  o “¿Como hace el proyecto X? ”, donde el agente explora el repositorio para rastrear el flujo de datos entre microservicios 

#### Modo Edit / Agent (Ejecución) {#modo-edit-/-agent-(ejecución)}

El modo *Edit* representa la fase de ejecución. Aquí el agente traduce el plan en acciones concretas, realizando modificaciones reales sobre el sistema. Estas acciones incluyen:  edición de múltiples archivos , ejecución de comandos en terminal, instalación de dependencias o ejecución de *tests*.

Una característica clave es la presencia de bucles de retroalimentación autónomos. Si una acción genera un error (por ejemplo, un *test* fallido), el agente analiza el error, ajusta su estrategia y propone o aplica una corrección todo automáticamente.

El agente puede ejecutar *scripts* de compilación y pruebas automáticas de forma autónoma. Si se detecta un fallo en la terminal (*CLI*), el sistema analiza la traza del error, ajusta su lógica y propone una corrección inmediata 

#### Construccion de  Agentes Personalizados {#construccion-de-agentes-personalizados}

Para comprender la construcción de agentes personalizados, es fundamental diferenciar entre el uso tradicional de un LLM y un sistema agéntico completo. Para ello hay que diferenciar entre dos tipos de sistemas distintos:

* **Sistemas *Stateless***: Las interfaces de *chat* tradicionales no mantienen un estado persistente de las acciones técnicas realizadas, limitándose a la predicción de texto.  
* **Sistemas *Stateful* (*Agents*)**: Mantienen el contexto de la ejecución, poseen memoria de largo plazo y operan bajo el paradigma ReAct (*Reasoning \+ Acting*)\[45\], donde el sistema alterna ciclos de pensamiento lógico con la ejecución de herramientas externas. El sistema alterna entre razonamiento, acción y evaluación de resultados.

  ![][image11]

##### ***Figura 9: Captura de ventana de selección que muestra los tres modos mencionados previamente en Visual Studio Code*** {#figura-9:-captura-de-ventana-de-selección-que-muestra-los-tres-modos-mencionados-previamente-en-visual-studio-code}

### 5.3.4  El Directorio de Configuración .agent {#5.3.4-el-directorio-de-configuración-.agent}

La definición de los agentes de Inteligencia Artificial supera la  interacción de propósito específico mediante *prompts* en interfaces conversacionales y transiciona  a la robustez del sistema, adoptando un enfoque de configuración centralizado en el directorio .*agent*. 

![][image12]

##### ***Figura 10: Ventana de creación de un agente personalizado en Visual Studio Code*** {#figura-10:-ventana-de-creación-de-un-agente-personalizado-en-visual-studio-code}

Esta carpeta se integra de forma orgánica en el sistema de control de versiones (Git) junto al código fuente, lo que permite que las instrucciones, reglas y capacidades de los agentes evolucionen en total sincronía con la lógica de negocio del proyecto.

Esta arquitectura garantiza que el comportamiento de la IA sea versionable, reproducible y auditable, disminuyendo el riesgo de discrepancias entre los entornos de desarrollo de distintos miembros del equipo. Un directorio .*agent* típico constituye el "cerebro configurado" del sistema y contiene los siguientes ficheros de configuración:

#### **1\. Configuración Operativa (config.json / config.yaml)**

Este archivo actúa como el manifiesto de gobernanza del agente. Su propósito es definir los límites técnicos y económicos de la autonomía de la IA para evitar el consumo descontrolado de recursos o acciones no autorizadas sobre el sistema.

**Especificación del Modelo (*model*):** Es el parámetro que define el "motor cognitivo" del agente. No se utiliza el mismo modelo para todo. Como se observa en el código, se emplea anthropic/claude-sonnet-4 para tareas de construcción (que requieren alto razonamiento) y anthropic/claude-haiku-4 para planificación (donde prima la velocidad y el bajo coste).

**Definición del Modo de Operación (*mode*):** Determina la jerarquía del agente dentro del ecosistema y consta de dos modos:

* ***primary*****:** Agentes autónomos con capacidad de toma de decisiones directa.  
* ***subagent*****:** Agentes especializados que actúan bajo la supervisión de un orquestador (ej. el code-reviewer). 

La existencia de estos dos modos es la prueba de que los agentes están basados en una arquitectura jerárquica que evita la saturación del contexto.

**Inyección de Contexto y Prompts (prompt):** Es el archivo que contiene la "misión" del agente. Este hace referencia externa a un archivo *({file:./prompts/build.txt})*: Este es un punto clave de limpieza de código. Al externalizar el *prompt*, separa la configuración técnica del comportamiento semántico, permitiendo versionar las instrucciones sin tocar la arquitectura del sistema.

**Matriz de Capacidades y Permisos (tools):** Es el apartado de permisos y acción . Define qué puede hacer el agente:

* ***write / edit:*** Permiso para modificar el código fuente.  
* ***bash*****:** El permiso más crítico y potente. Permite al agente ejecutar comandos en la terminal (instalar librerías, correr *tests*, borrar archivos).

El hecho de que el code-reviewer tenga estos permisos en false mientras que el build los tenga en true es una implementación del Principio de Mínimo Privilegio, garantizando que un agente supervisor no pueda alterar el código por error.

### 

### ***![][image13]***

##### ***Figura 11: Captura del archivo config.json donde se puede ver la definición de los agentes con sus parámetros y permisos*** {#figura-11:-captura-del-archivo-config.json-donde-se-puede-ver-la-definición-de-los-agentes-con-sus-parámetros-y-permisos}

### 

#### **2\. Metadatos y Definición de Interfaz (Cabecera YAML)**

La cabecera YAML del archivo de instrucciones define la identidad del agente y su modo de interacción con el sistema. A diferencia del cuerpo del texto (que es semántico), estos campos actúan como parámetros de configuración que el orquestador utiliza para indexar y presentar al agente dentro del entorno de desarrollo.

Los parámetros se definen de la siguiente manera:

* **name (Identificador del Sistema):** Establece el nombre único del agente en el entorno (ej. AgenteOpenAI-FullContext). Este nombre es el que se invoca desde la consola o el chat para activar el contexto específico de este agente.  
* **description (Alcance Cognitivo):** Define la especialización y el propósito del agente. En este caso, al especificar "Ingeniero Full-Stack experto en la API de OpenAI", se está acotando la base de conocimientos y el tono de las respuestas a un perfil técnico senior, garantizando que el desarrollador sepa exactamente qué nivel de asistencia esperar.  
* **argument-hint (Criterio de Selección por Contexto):** Este es el parámetro clave para el enrutamiento inteligente. Define las palabras clave o temas (ej. "implementación de código", "wiki", "refactorización") que actúan como disparadores (*triggers*). El sistema analiza la petición del usuario y, si detecta coincidencia semántica con estos *hints*, activa automáticamente este agente y sus *skills* asociadas. Es lo que permite que el sistema sea proactivo y no solo reactivo.  
* **tools (Declaración de Capacidades):** Es el campo más crítico a nivel de seguridad y funcionalidad. Aquí se enumeran los "superpoderes" o permisos del agente:  
  * ***read*****:** Permite al agente analizar el código fuente existente para tener contexto real del proyecto.  
  * ***search*****:** Habilita la capacidad de realizar búsquedas indexadas (en la wiki o documentación interna), evitando que el agente dependa solo de su conocimiento preentrenado y permitiéndole acceder a datos actualizados en tiempo real

### 

### ![][image14]

##### ***Figura 12: Imagen de un agent.md personalizado su cabecera yaml***  {#figura-12:-imagen-de-un-agent.md-personalizado-su-cabecera-yaml}

#### **3\. Base de Conocimiento y Contexto Dinámico (context/)**

### Esta sección sirve para alimentar la ventana de contexto masiva del agente, reduciendo drásticamente la tasa de alucinaciones lógicas al proporcionar una "fuente de verdad" in situ. Este apartado tiene más libertad que las anteriores pudiendo crear apartados según la necesidad o preferencia del usuario, aun así estos son los más comunes:

* ### **Esquemas y Diccionarios de Datos:** Permite al agente comprender la estructura de la base de datos sin necesidad de realizar consultas exploratorias costosas.

* ### **Documentación Técnica Interna:** Archivos *Markdown* que describen decisiones arquitectónicas previas, flujos de despliegue y guías de resolución de errores comunes en la organización.

* ### **Ejemplos de Referencia (*Few-shot*):** Fragmentos de código "perfecto" que el agente debe imitar para mantener la coherencia estética y técnica del repositorio.

![][image15]

##### ***Figura 13: Imagen de un agent.md personalizado su context*** {#figura-13:-imagen-de-un-agent.md-personalizado-su-context}

### 5.3.5 Flujo de Ejecución de un Agente {#5.3.5-flujo-de-ejecución-de-un-agente}

El flujo de trabajo de un agente personalizado no es un proceso lineal, sino un ciclo recursivo de razonamiento y acción. Este bucle iterativo convierte al sistema en una entidad autónoma capaz de operar sobre entornos reales de desarrollo, gestionando la incertidumbre y corrigiendo errores de forma dinámica.

A continuación, se detalla la arquitectura de este ciclo iterativo:

#### **1\. Interpretación del Objetivo** {#1.-interpretación-del-objetivo}

En esta fase inicial, el sistema decodifica la instrucción del usuario. No se limita a una traducción literal del lenguaje natural, sino que realiza un análisis de contexto para identificar la intención técnica subyacente, asegurando que el punto de partida esté perfectamente alineado con los requisitos del proyecto.

#### **2\. Planificación de Acciones** {#2.-planificación-de-acciones}

Antes de alterar el estado del sistema, el agente proyecta una solución estructurada. Descompone el objetivo principal en una secuencia lógica de subtareas y genera un plan de acción. Esta fase previene la introducción de fallos arquitectónicos al establecer un orden de ejecución claro y evaluar las dependencias implicadas.

#### **3\. Ejecución mediante Herramientas** {#3.-ejecución-mediante-herramientas}

El agente transita del análisis a la intervención directa. Utilizando las herramientas integradas en su entorno, materializa el plan paso a paso. Esta fase operativa abarca desde la edición de código en múltiples archivos y la ejecución de comandos en la terminal, hasta la interacción con bases de datos o sistemas corporativos para aplicar los cambios previstos.

#### **4\. Evaluación de Resultados** {#4.-evaluación-de-resultados}

Tras ejecutar las acciones, el sistema no asume el éxito por defecto, sino que entra en una fase de verificación crítica. Analiza la salida real del entorno —como los mensajes de la consola de compilación o los resultados de las baterías de *tests*— para confirmar empíricamente que la intervención ha cumplido el objetivo sin provocar regresiones en el código base.

#### **5\. Ajuste y Repetición** {#5.-ajuste-y-repetición}

Si la evaluación detecta un fallo o una discrepancia con el plan original, el agente inicia un proceso de autocorrección autónomo. Analiza la traza del error, recalcula su estrategia y repite el ciclo desde la fase de planificación. Este bucle iterativo se mantiene activo hasta que la tarea se completa satisfactoriamente bajo los estándares de calidad exigidos.

### 5.3.6 Modelos de Organización en Sistemas Multi-Agente {#5.3.6-modelos-de-organización-en-sistemas-multi-agente}

A medida que la complejidad del desarrollo de *software* aumenta, delegar todas las tareas a un único agente central genera saturación de contexto y degradación lógica. En 2026, el estándar industrial se basa en sistemas multi-agente jerárquicos, donde la carga cognitiva se distribuye mediante la instancia dinámica de sub-entidades. Un sistema multi-agente está principalmente formado por: 

* **El Agente Orquestador (Supervisor):** Actúa como el director técnico del proyecto. No programa directamente, sino que recibe los requisitos de alto nivel del ingeniero, diseña la arquitectura de la solución, divide el problema en un grafo de tareas y coordina los tiempos de ejecución.  
* **Agentes Ejecutores:** Son entidades especializadas (ej. *Frontend Agent*, *Database Agent*) que reciben paquetes de trabajo muy acotados por el orquestador. Al tener un contexto limitado exclusivamente a su tarea, su precisión y adherencia a los estándares de código es significativamente mayor.  
* **Instanciación Dinámica de Sub-agentes (Spawning):** Una de las capacidades más avanzadas de estas arquitecturas es el paralelismo agéntico. Si un Agente Ejecutor se encuentra con un bloqueo, como la necesidad de leer un archivo de *logs* masivo de 50.000 líneas para encontrar un error, puede "lanzar" (*spawn*) un sub-agente temporal. Este sub-agente se crea en memoria con el único propósito de procesar ese archivo en paralelo, devolviendo un resumen estructurado al agente principal, el cual puede seguir escribiendo código sin detener su flujo de trabajo. Una vez completada la tarea, el sub-agente se destruye, optimizando el consumo de *tokens* .

| Patrón de Orquestación | Mecanismo de Control | Ventajas Principales | Desafíos |
| ----- | ----- | ----- | ----- |
| Supervisor (Centralizado) | Un solo nodo gestiona la delegación y validación. | Alta trazabilidad, seguridad y calidad consistente. | Puede ser un punto único de fallo y añadir latencia. |
| Red Adaptativa (Descentralizada) | Los agentes colaboran y pasan tareas directamente. | Baja latencia, alta interactividad y resiliencia. | Coordinación compleja y dificultad en la auditoría. |
| Custom (Programático) | Lógica de orquestación definida por código. | Control determinístico total y cumplimiento estricto. | Alta complejidad de desarrollo y menor flexibilidad. |

##### ***Tabla 9: Roles en sistemas multiagentes \[42\]\[46\]*** {#tabla-9:-roles-en-sistemas-multiagentes-[42][46]}

#### 

La eficacia de un sistema multi-agente no reside únicamente en la capacidad individual de sus componentes, sino en la topología de su red de comunicaciones. En el diseño de arquitecturas de IA, la estructuración de agentes responde a la necesidad de gestionar el flujo de información y los privilegios de ejecución. 

A continuación, se analizan las topologías más predominantes:

#### 

#### **Estructura Horizontal: Agilidad y Simplicidad**

En una estructura horizontal, el Agente Orquestador gestiona directamente a un grupo de agentes subalternos sin niveles intermedios de supervisión. Este modelo es muy eficiente para tareas que son paralelas por naturaleza y que no requieren una coordinación profunda entre los sub-pasos. Por ejemplo, en una investigación financiera donde se deben analizar simultáneamente las tendencias de ingresos, las estructuras de costos y las comparaciones de mercado, una estructura horizontal permite ejecutar estas búsquedas en paralelo, reduciendo el tiempo total de respuesta hasta en un 90% \[47\].

Sin embargo, la estructura horizontal tiene límites claros. A medida que el número de agentes crece, el orquestador central puede experimentar una saturación de contexto, lo que lleva a una degradación en la calidad de la toma de decisiones \[48\]. Además, la falta de capas intermedias dificulta la aplicación de reglas específicas para diferentes dominios dentro de la misma organización.

#### **Estructura Departamental: Especialización e Aislamiento de Contexto**

La estructura departamental organiza a los agentes en grupos especializados, cada uno bajo la supervisión de su propio sub-orquestador. Este modelo imita la organización de una corporación humana, donde diferentes departamentos (como Recursos Humanos, Finanzas o TI) operan de manera semi-autónoma bajo sus propios estándares y protocolos\[42\].

La estructura departamental permite que estas revisiones de código y ejecuciones de pruebas se realicen en contextos aislados \[45\]. El aislamiento asegura que los datos sensibles de producción no se filtren hacia los agentes de desarrollo y que los errores en una fase de prueba no corrompan el estado global del sistema de orquestación principal\[47\]. Además, facilita el cumplimiento de normativas como GDPR o HIPAA al aplicar capas de seguridad específicas sólo a los departamentos que manejan datos sensibles

| Dimensión de Comparación | Estructura Horizontal | Estructura Departamental |
| ----- | ----- | ----- |
| Complejidad de Gestión | Baja; relación directa orquestador-agente. | Alta; múltiples capas de supervisión. |
| Gestión de Contexto | Riesgo de saturación y "deriva" del contexto. | Aislamiento robusto; el contexto se filtra por nivel. |
| Estándares Corporativos | Difíciles de aplicar de forma granular. | Aplicación nativa de reglas por especialidad. |
| Escalabilidad | Limitada por el orquestador central. | Virtualmente ilimitada mediante nuevos departamentos. |
| Costo de Comunicación | Bajo; comunicación directa. | Alto; sobrecarga por handoffs jerárquicos. |

##### ***Tabla 10: Diferencia según estructura de gestión*** {#tabla-10:-diferencia-según-estructura-de-gestión}

### 5.3.7 Orquestación Visual de Agentes: El Paradigma Basado en Nodos (n8n) {#5.3.7-orquestación-visual-de-agentes:-el-paradigma-basado-en-nodos-(n8n)}

#### Si bien la configuración de agentes mediante código y archivos .*agent* representa el estándar para entornos de desarrollo puro, el despliegue de sistemas multi-agente en el entorno corporativo ha adoptado interfaces de programación visual específicamente para esos usuarios no tan técnicos . Plataformas como n8n han surgido para ofrecer una arquitectura diseñada de forma nativa para la integración de Inteligencia Artificial con la orquestación de agentes y modelado de procesos .

#### El paradigma de orquestación visual democratiza y acelera el desarrollo agéntico al transformar la complejidad del código en grafos dirigidos acíclicos (DAGs) manipulables. La anatomía de un agente en n8n se estructura mediante la interconexión técnica de cuatro tipos de nodos especializados:

1. #### **Nodos Disparadores (Triggers):** Representan el punto de entrada asíncrono o síncrono. En un sistema de soporte técnico interactivo, el disparador es un componente de chat embebido (mediante *Webhooks* o *snippets* de código en plataformas como WordPress), el cual captura el *input* del usuario y lo inyecta en el flujo de trabajo.

2. #### **Nodo Agente (Core):** Es el orquestador visual central. Recibe el *input*, procesa el *prompt* de sistema (las instrucciones de comportamiento) y evalúa qué recursos necesita para resolver la intención del usuario.

3. #### **Módulos de Memoria Persistente:** A diferencia de una llamada estándar a la API de un modelo (que carece de estado), n8n permite acoplar nodos de memoria, como el *Window Buffer Memory*. Esto permite que el agente almacene el contexto conversacional localmente, iterando sobre las preguntas previas sin necesidad de reevaluar todo el historial.

4. #### **Capa de Herramientas (Tools):** Es el equivalente visual a las *Skills*. Permite conectar el agente a bases de datos estructuradas externas (como Supabase) o a sistemas de ofimática (Google Workspace). Mediante estas herramientas, el agente puede realizar consultas semánticas o determinísticas sobre los registros de una empresa (ej. leer un temario o un inventario en tiempo real) y generar una respuesta fundamentada, eliminando el riesgo de alucinación.

#### Un factor determinante en la adopción de n8n dentro de la arquitectura corporativa es su naturaleza de código abierto utilizable en infraestructura propia. A diferencia de soluciones alojadas en la nube, los ingenieros pueden desplegar instancias de n8n en servidores locales o infraestructuras NAS (Network Attached Storage) privadas. Este enfoque de *self-hosting* resuelve el problema de la fuga de datos sensibles y permite la orquestación de modelos de lenguaje de código abierto sin incurrir en costes operativos por consumo de *tokens*  a través de servicios API ni comprometer la política de seguridad y tratamiento de datos \[49\].

**![][image16]**

##### ***Figura 14: Imagen de n8n simulando un flujo de automatización utilizando un agente autónomo***

## 5.4 Skills (Capacidades Especializadas) {#5.4-skills-(capacidades-especializadas)}

### 5.4.1 Introducción y Naturaleza de las Skills  {#5.4.1-introducción-y-naturaleza-de-las-skills}

Una *skill* (o capacidad especializada) se define como una aptitud o herramienta específica que se otorga a un agente autónomo para habilitar su interacción con el entorno exterior y permitir la ejecución de tareas concretas. Un ejemplo ilustrativo de esta necesidad se observa en las limitaciones inherentes de los modelos de Inteligencia Artificial para el cálculo de la hora preciso; mediante la creación de una *skill* denominada "reloj" —respaldada por un programa subyacente sencillo en python de consulta sobre la hora actual—, el agente adquiere la competencia para resolver dudas o preguntas sobre la hora actual y dejar de estar desfasado delegando la ejecución a dicha *skill* especializada.

Es fundamental distinguir *agents* de *skill*, una *skill* es una herramienta o conjunto de instrucciones encapsuladas que otorgan al agente un "superpoder" específico (ej. interactuar con una base de datos, analizar un log o ejecutar comandos de terminal). A diferencia del agente, la *skill* es pasiva: no tiene autonomía ni razonamiento propio; es un recurso que el agente "empuña" solo cuando la lógica de la tarea lo requiere.

### 5.4.2 Proceso de Integración y Gestión del Contexto  {#5.4.2-proceso-de-integración-y-gestión-del-contexto}

La asimilación de una *skill* por parte de un agente sigue un procedimiento metodológico estructurado en tres fases fundamentales. 

La primera fase es la *Definición*, que consiste en proporcionar al agente una descripción unívoca y semánticamente clara sobre la función de la herramienta (por ejemplo, "Calcula el precio del IVA"). 

La segunda fase es la *Selección*, etapa en la cual el agente analiza la petición formulada por el usuario y determina de forma heurística qué *skill* resulta adecuada para resolver la tarea. 

Finalmente, la fase de *Ejecución*, donde el propio agente se encarga de generar y estructurar los parámetros requeridos para que el código o las instrucciones de dicha *skill* se inicien de manera efectiva.

En la actualidad, este ecosistema de capacidades ha alcanzado una estandarización, lo que permite la portabilidad y el reciclaje de *skills* entre distintos agentes. A nivel de infraestructura, toda *skill* exige la presencia ineludible de un archivo raíz denominado SKILL.MD. 

![][image17]

##### ***Figura 15: Fichero SKILL.md junto con su referencia para un caso de delegación específico*** {#figura-15:-fichero-skill.md-junto-con-su-referencia-para-un-caso-de-delegación-específico}

### 

El manejo de estas capacidades por parte del agente se fundamenta en una optimización estricta de la ventana de contexto. Las *skills* se encuentran presentes de forma latente; es decir, el agente únicamente carga de manera permanente el nombre y la descripción de las mismas. 

Las instrucciones operativas permanecen excluidas de la memoria a corto plazo hasta que el agente recibe una tarea que coincide de forma precisa con la descripción de una *skill*, momento en el cual procede a cargar el archivo en su totalidad para ejecutar las directrices detalladas. 

Para que un agente pueda hacer uso operativo de estas *skills*, la infraestructura debe proporcionar permisos de lectura y escritura, acceso al sistema de ficheros y disponibilidad de herramientas de consola (*bash tool*) para la ejecución de código.

### 5.4.3 Casos de Uso y Arquitectura de Archivos {#5.4.3-casos-de-uso-y-arquitectura-de-archivos}

La justificación principal para el desarrollo de una *skill* radica en la automatización de flujos de trabajo altamente repetitivos. En escenarios donde el ingeniero requiere que el agente ejecute una misma acción de manera constante —como la extracción y creación de datos bajo un formato muy específico—, la estandarización mediante una *skill* encapsula estas instrucciones, evitando la redundancia constante en el envío de *prompts* y garantizando la consistencia del resultado.

A nivel de arquitectura de archivos, el documento SKILL.md se redacta utilizando formato *markdown* (.md), actuando como una instrucción extendida para gobernar el comportamiento del agente frente a acciones sistemáticas, como la realización de análisis de mercado. Este archivo exige una cabecera en formato YAML (*Frontmatter*) que incluye el campo name (formateado en minúsculas y separado por guiones, como analyzing-marketing-campaign) y el campo description, el cual resulta crítico para que la IA evalúe la pertinencia de su invocación ante un escenario específico.

![][image18]

##### ***Figura 16:Cabecera YAML de una skill.md***  {#figura-16:cabecera-yaml-de-una-skill.md}

Además, la arquitectura no se restringe a un único archivo monolítico, sino que incorpora un sistema de "referencias" que permite gestionar la complejidad y la inyección de contexto. Una *skill* puede hacer llamadas estructuradas a otros documentos *markdown*, imágenes, informes en formato PDF o *scripts* ejecutables. 

Como se puede observar en la imagen, esta *skill* de buenas prácticas de supabase tiene  adjuntas referencia enlaces  y archivos para que en un momento dado un agente consulte estas referencias para ampliar su conocimiento sobre una necesidad específica dentro del uso de la *skill*.

![][image19]

##### ***Figura 17 : Apartado de referencias en un skill.md*** {#figura-17-:-apartado-de-referencias-en-un-skill.md}

Este documento complementario no constituye una *skill* independiente, sino un caso de uso o "prompt específico" que aporta un marco de decisión detallado al que la IA debe ceñirse al ejecutar la acción. Visualmente, dentro del código del SKILL.md se incluyen enlaces internos que dirigen al agente hacia estas referencias documentales para completar su conocimiento operativo. La inclusión de *scripts* resulta particularmente útil para suplir carencias algorítmicas orgánicas del modelo, tal y como la inserción dinámica de la fecha y hora actual mediante la ejecución automatizada de un *script* en Python. Toda esta arquitectura debe seguir una estructura jerárquica obligatoria donde el SKILL.md reside en el directorio raíz (nombrado como la propia *skill*), acompañado de una subcarpeta references/ que almacena los archivos y recursos importados, empaquetándose comúnmente en un archivo comprimido .zip.

![][image20]

##### ***Figura 18 : Organización de archivos de una skill con su carpeta de referencias*** {#figura-18-:-organización-de-archivos-de-una-skill-con-su-carpeta-de-referencias}

La interacción visual y técnica de este proceso se resume en un flujo continuo: el usuario envía el *prompt* con los datos de entrada, el agente lee el archivo SKILL.md para asimilar las mejores prácticas, procede a ingerir las reglas adicionales (referencias) y, finalmente, ejecuta el análisis sobre los datos cargados.

### 5.4.4 Agentes Generalistas frente a Agentes de Dominio  {#5.4.4-agentes-generalistas-frente-a-agentes-de-dominio}

En las primeras iteraciones de la ingeniería de IA, la práctica recomendada dictaba la creación y despliegue de múltiples agentes aislados, cada uno especializado en un dominio de conocimiento concreto. Aunque el uso de agentes personalizados sigue siendo una práctica útil, el despliegue puramente fragmentado conlleva el riesgo de generar silos de información perjudiciales para la coherencia sistémica del proyecto. La evolución arquitectónica actual defiende que no se trata de enfoques inherentemente mejores o peores, sino de métodos de trabajo divergentes. El paradigma moderno fomenta la transición hacia el empleo de un único agente generalista orquestador equipado con un repositorio dinámico de *skills*.

![][image21]

##### ***Figura 19 : Diferencias entre  un  entorno con múltiples  agentes especializados VS Un único agente con skills*** {#figura-19-:-diferencias-entre-un-entorno-con-múltiples-agentes-especializados-vs-un-único-agente-con-skills}

Este enfoque agéntico unificado optimiza la mantenibilidad. En lugar de crear un nuevo agente desde cero para cada necesidad emergente, el ingeniero desarrolla una *skill* que dota al agente preexistente del contexto y el acceso especializado requeridos. Esto facilita la evaluación de calidad y garantiza una escalabilidad sostenible del ecosistema tecnológico.

![][image22]

##### ***Figura 20 : Flujo Operativo de un Agente de IA implementando skills*** {#figura-20-:-flujo-operativo-de-un-agente-de-ia-implementando-skills}

### 

### 5.4.5 Intersección Estratégica: Skills, Tools, MCP y Subagentes  {#5.4.5-intersección-estratégica:-skills,-tools,-mcp-y-subagentes}

La verdadera potencia del paradigma de desarrollo asistido por IA no reside en la suma de sus componentes, sino en la intersección estratégica de sus capacidades en tiempo real. En esta etapa de la arquitectura, la distinción teórica entre recursos se transforma en una colaboración funcional donde el flujo de información y ejecución es circular y constante.

La sincronía de estos elementos se articula de la siguiente manera:

1. El Sistema de Ingesta y Contexto (MCP): El *Model Context Protocol* actúa como el sistema nervioso del agente, inyectando datos externos (documentación, bases de datos o telemetría) que el modelo no posee de forma nativa. Es el proveedor del "qué está pasando fuera".  
2. La Lógica de Procedimiento (Skills): Una vez que el agente tiene el contexto vía MCP, invoca una *Skill*. Esta no es una herramienta de acción, sino el marco lógico y metodológico que dicta cómo procesar esa información según los estándares del proyecto.  
3. La Capacidad Ejecutora (Tools): Finalmente, para materializar la decisión tomada por la *Skill*, el agente emplea las *Tools*. Estas son los "brazos" mecánicos que realizan los cambios físicos: editar un archivo, ejecutar un comando *bash* o realizar un *commit*.

Esta infraestructura permite que la orquestación escale hacia un modelo de subagentes especializados. En este escenario, el Agente Orquestador no sólo delega tareas, sino que transfiere "paquetes de capacidades" específicos. Mediante *frameworks* de última generación (como Claude Code), es posible instanciar subagentes en entornos aislados de contexto (*sandboxing*), dotándolos únicamente de la combinación necesaria de MCP \+ *Skill* \+ *Tool* para una misión concreta.

![][image23]

##### ***Figura 21 : Arquitectura de un Agente único implementando las diversas tecnologías mencionadas previamente*** {#figura-21-:-arquitectura-de-un-agente-único-implementando-las-diversas-tecnologías-mencionadas-previamente}

### 

### 5.4.6 Estándares de Diseño y Buenas Prácticas para SKILL.md  {#5.4.6-estándares-de-diseño-y-buenas-prácticas-para-skill.md}

Una vez comprendida la estructura de una *skill*  y las partes que la componen, estos son los estándares de diseño y de buenas prácticas para que un ingeniero pueda crear sus propias *skills*:

* **Campos Obligatorios y Opcionales del Frontmatter:** El bloque de metadatos (cabezera YAML) exige la inclusión del campo name (restringido a 64 caracteres, caracteres alfanuméricos en minúsculas y guiones medios, coincidente con el directorio padre, y recomendado en forma de gerundio, ej. "verbo \+ \-ing") y el campo description (limitado a 1024 caracteres, no vacío, describiendo la utilidad de la *skill* mediante el uso de palabras clave para la activación del agente). Entre los campos opcionales, la convención admite license (referencia de licenciamiento), compatibility (hasta 500 caracteres detallando requisitos de entorno), metadata (claves y valores arbitrarios como autor o versión), y allowed-tools (un vector delimitado por espacios de herramientas experimentales pre-aprobadas).  
* **Estructuración del Cuerpo y Buenas Prácticas:** Aunque el formato interno carece de restricciones formales de sintaxis, los estándares de calidad dictaminan la inclusión de directrices lógicas: instrucciones paso a paso, especificación de formatos de entrada y salida (*I/O*), casos de ejemplo y contemplación explícita de casos límite (*edge cases*).

Además se establecen varias pautas de control de calidad; la extensión del archivo debe limitarse idealmente a menos de 500 líneas, delegando el volumen documental denso hacia referencias externas (archivos separados); asimismo, la profundidad jerárquica no debe superar un único nivel de referencias relativas desde el archivo SKILL.md. La consistencia semántica exige el uso de terminología estandarizada y la obligación de utilizar barras diagonales (/) para las rutas de archivos de manera universal, omitiendo los estándares específicos de Windows.

Adicionalmente, el ingeniero debe diseñar las instrucciones aplicando un control sobre los "Grados de Libertad" concedidos al agente:

* *Libertad Alta:* Se proporcionan directrices generales en texto, validando múltiples enfoques de resolución heurística por parte del modelo.  
* *Libertad Media:* La directriz contiene patrones algorítmicos o pseudocódigo personalizable; existe un patrón estructural preferido, pero el agente posee margen de variación adaptativa.  
* *Libertad Baja:* La directriz anula el razonamiento libre, invocando *scripts* inmutables que deben ejecutarse bajo una secuencia algorítmica determinista.

Cuando la escalabilidad del sistema requiere flujos de trabajo extraordinariamente complejos, la operación debe subdividirse en directorios opcionales complementarios. La jerarquía recomendada incluye un directorio /*assets* destinado a plantillas de configuración, esquemas de bases de datos, diagramas o tablas de búsqueda; una carpeta /*references* que contiene documentación contextual adicional; y un entorno /*scripts*, el cual obliga a documentar exhaustivamente el manejo de errores, sus dependencias subyacentes, y dictaminar explícitamente si la IA debe compilar/ejecutar el fragmento o meramente utilizarlo como literatura de referencia técnica. Para aquellos documentos de gran volumen (superiores a las 100 líneas), resulta indispensable la integración de un índice al inicio del archivo.

## 5.5. Entornos de Desarrollo e IA de Proyecto (Codificación) {#5.5.-entornos-de-desarrollo-e-ia-de-proyecto-(codificación)}

En esta sección se evalúan en detalle las principales plataformas tecnológicas empleadas en la fase de codificación y desarrollo de proyectos, analizando sus ventajas, desventajas, características únicas y su capacidad de integración sistémica.

### 5.5.1. Visual Studio Code {#5.5.1.-visual-studio-code}

Visual Studio Code (VS Code) es el entorno de desarrollo integrado más extendido en la industria. Su principal ventaja competitiva frente a editores especializados radica en su extrema modularidad y madurez en el mercado, es por eso que tiene una gran base de usuarios fieles.

* **Características Únicas e Integración:** La arquitectura de extensiones de VS Code permite que el desarrollador no se ate a un proveedor exclusivo. En un mismo entorno, el ingeniero puede configurar una *Command Line Interface* (CLI) nativa para operaciones de control total y, simultáneamente, integrar extensiones específicas como Claude Code (de Anthropic) o motores basados en la familia de OpenAI. Esta versatilidad facilita la adopción de flujos de trabajo donde el modelo asume modos operativos como *Plan* (arquitectura), *Ask* (consulta) y *Edit* (aplicación de cambios). Además, VS Code fue pionero en la adopción e implementación del *Model Context Protocol* (MCP), actuando como el *Host* que unifica la comunicación segura entre los *Large Language Models* (LLM) y recursos externos (como bases de datos u otras herramientas corporativas).  
* **Modelos Soportados:** Dada su naturaleza agnóstica, permite inyectar diversos modelos vía API, desde GPT-5.4, hasta Claude 4.6. Pero sobre todo destaca por su integración con Github Copilot (plan de Github en el cual tienes acceso a varios modelos de distintas empresas), que son usados en la ventana de chat o en la sugerencias de líneas directamente en el editor.  
* **Ventajas:** Ofrece una visión panorámica y flexible del proyecto. Su sistema abierto impide el *vendor lock-in* (dependencia de un solo proveedor) y permite que el ingeniero configure su *workspace* adaptando el grado de abstracción a las normativas de seguridad de la empresa.  
* **Desventajas:** La flexibilidad tiene un precio: una curva de configuración y mantenimiento inicial muy alta. Para lograr que múltiples agentes, extensiones y servidores MCP colaboren armónicamente sin generar conflictos o solapamiento de tareas, se requiere un nivel de ingeniería de *prompts* avanzado. Además de que a diferencia  de otros entornos no está centrado exclusivamente en la implementación con IA por lo que varias funcionalidades que otros entornos incluyen no están aquí. 


  ![][image24]

##### ***Figura 22 : IDE Visual Studio Code***  {#figura-22-:-ide-visual-studio-code}

### 5.5.2. Google Antigravity {#5.5.2.-google-antigravity}

Google Antigravity, es un entorno reciente en el panorama tecnológico, rompe con el flujo clásico de "autocompletado" para proponer un IDE puramente *agent-first* (centrado en el agente). Es un  *fork* de Visual Studio Code altamente modificado. La filosofía de Antigravity presupone que la IA no es una utilidad para redactar líneas, sino un actor autónomo con capacidad de planificar, validar y ejecutar.

* **Características Únicas e Integración:** El IDE bifurca su interfaz en dos áreas fundamentales. Por un lado, una vista síncrona clásica del editor de código; por otro, el *Agent Manager*, una superficie de gestión asíncrona. Esta arquitectura permite al ingeniero instanciar múltiples agentes autónomos en paralelo, cada uno dedicado a un hilo de resolución distinto (por ejemplo, diseño visual, validación de *backend* o gestión de la base de datos). Para mitigar la pérdida de mantenibilidad y fomentar la confianza, Antigravity produce "Artefactos" verificables. Antes de inyectar código, los agentes generan planes de arquitectura, listas de tareas estructuradas, diagramas y capturas de interfaz. Además, integra un navegador interno (Browser Agent) que permite a la IA realizar pruebas *end-to-end* en vivo y grabar la sesión de *testing* para revisión humana.  
* **Modelos Soportados:** Su núcleo operativo depende fuertemente del ecosistema de Alphabet, destacando Gemini 3.1 Pro para tareas de lógica profunda y la multimodalidad de Nano Banana Pro para diseño de interfaces (UI) a partir de bocetos.  
* **Ventajas:** Eleva al programador de un rol de "escritor de sintaxis" a un verdadero director de orquesta. Permite el desarrollo y la exploración rápida de funcionalidades sin interrumpir el trabajo de la rama principal gracias al trabajo asíncrono. Ademas tienen una ventana de contexto que puede alcanzar hasta 1 millón  o incluso 2 millones de tokens.   
* **Desventajas:** Consume cuotas de rendimiento masivas. Su tendencia a requerir ventanas de contexto tan grandes, hace que  computacional e infraestructuralmente sea costoso. En proyectos con deudas técnicas heredadas o metodologías de arquitectura muy cerradas, la autonomía de estos agentes suele ignorar estándares organizativos menores si no se limitan de manera agresiva.

### **![][image25]**

##### ***Figura 23 : IDE Antigravity***  {#figura-23-:-ide-antigravity}

### 5.5.3. GitHub Copilot Agent {#5.5.3.-github-copilot-agent}

La solución de Microsoft y GitHub ha transitado desde el autocompletado probabilístico hasta lo que hoy se denomina Copilot Agent. A diferencia de las soluciones confinadas estrictamente al IDE local, Copilot Agent difumina la barrera entre el repositorio remoto y el flujo de desarrollo diario, alineándose estrechamente con metodologías como el *Prompt-Driven Development* (PDD).

* **Características Únicas e Integración:** Su verdadero valor es la integración endémica con la plataforma de GitHub. Hoy en día, un desarrollador puede asignar un *issue* (requisito) directamente a Copilot en la nube (Proyecto Padawan). La herramienta levanta un entorno efímero, razona el problema, implementa la solución y envía automáticamente un *Pull Request* (PR) con pruebas integradas. En el ámbito local (dentro de VS Code, por ejemplo), funciona bajo un modelo iterativo de ejecución: propone cambios, lanza comandos de terminal, monitoriza la salida y se auto-corrige si la compilación falla.   
* **Modelos Soportados:** Se sustenta principalmente en arquitecturas de la familia OpenAI, empleando modelos densos para análisis de repositorio completo y versiones optimizadas (como adaptaciones sobre Codex o GPT veloces) para la escritura reactiva en el editor. Aun así, tiene acceso a varios modelos y su uso está restringido por los distintos planes contratados.  
* **Ventajas:** La gestión unificada de las credenciales, la integración nativa de la seguridad y la naturalidad del ecosistema GitHub Actions lo convierten en la opción más robusta y segura para entornos corporativos (Enterprise). Minimiza la fricción entre la conceptualización de un *ticket* en el panel y la entrega de código.  
* **Desventajas**: A pesar del avance en el modo agente, cuando se le exige a Copilot el diseño de soluciones completas sin el soporte de herramientas de especificación metodológica (cayendo en el *vibecoding* no estructurado), tiende a generar "ruido visual" y presenta incrementos en código duplicado. Requiere segmentar las tareas muy bien para mantener la salud a largo plazo de la arquitectura.

![][image26]

##### ***Figura 24 : PR cerrada creada a traves de github copilot agent desde github.com*** {#figura-24-:-pr-cerrada-creada-a-traves-de-github-copilot-agent-desde-github.com}

![][image27]

##### ***Figura 25 : Ventana de chat con github agent*** {#figura-25-:-ventana-de-chat-con-github-agent}

### 5.5.4. Codex App {#5.5.4.-codex-app}

Desarrollado por OpenAI Codex App es un IDE principalmente centrado en el desarrollo a través de su ventana de chat. Es la IDE que más se parece a un chatbot tradicional, pero aun así no deja de estar enfocado al desarrollo de proyectos, implementando control de versiones con Git o la capacidad de multitasking en distintos repositorios de manera síncrona.

* **Características Únicas e Integración:** Codex no es un IDE, sino un motor de traducción e inferencia de lenguaje a código. En el año 2026, si bien las tareas algorítmicas puras han recaído en modelos más masivos como GPT-5.4, Codex sigue siendo la base y el cerebro detrás de incontables sistemas de autocompletado en la industria. A menudo se integra a través de interfaces de línea de comandos (CLI) ligeras o como extensiones de soporte en plataformas en la nube, donde actúa silenciosamente en segundo plano interceptando el *input* del desarrollador en tiempo real.  
* **Modelos Soportados:** Codex es en sí mismo el modelo de lenguaje de la familia OpenAI (entrenado sobre miles de millones de líneas de código fuente público).  
* **Ventajas:** Su latencia es insuperable (*fastest*). En tareas como la resolución de bloques lógicos algorítmicos estándar, el *boilerplate*, o la traducción rápida entre lenguajes (ej., migración parcial de funciones), Codex ofrece un retorno inmediato sin necesidad de cargar complejos *prompts* de orquestación. Al no requerir infraestructura de simulación de entorno o navegación web, es increíblemente eficiente desde el punto de vista computacional.  
* **Desventajas:** Carece de la noción de "agente". No retiene una memoria profunda de la arquitectura global del sistema ni comprende el contexto de negocio, por lo que una sobre-dependencia de esta tecnología sin revisión humana continua conduce directamente a las llamadas "inconsistencias de formato" y violaciones de legibilidad o accesibilidad (a11y). Su uso es altamente dependiente del desarrollador humano para mantener la coherencia sistémica.

# ![][image28]

##### ***Figura 26 : IDE CodexApp*** {#figura-26-:-ide-codexapp}

# 6\. Caso de Estudio: Desarrollo Funcional Integral de un Chatbot {#6.-caso-de-estudio:-desarrollo-funcional-integral-de-un-chatbot}

## 6.1. Introducción al Caso Práctico {#6.1.-introducción-al-caso-práctico}

Para validar empíricamente el marco teórico expuesto en los capítulos anteriores, esta investigación incorpora el desarrollo de un caso de estudio funcional.

El objetivo principal de este desarrollo no es simplemente la construcción de un producto de *software*, sino la demostración práctica de cómo la Inteligencia Artificial (IA) y las metodologías emergentes —como el *Specification-Driven Development* (SDD) y el *Test-Driven Development* (TDD) mencionadas anteriormente— transforman y enriquecen cada fase del ciclo de vida del desarrollo de *software* (SDLC).

El producto a desarrollar consiste en una aplicación conversacional (*Chatbot*) orientada al ámbito empresarial. Las características clave de este sistema incluyen:

* Un sistema de autenticación de usuarios y registro.  
* Aislamiento de sesiones y gestión de histórico de conversaciones en tiempo real.  
* Integración de una arquitectura *Retrieval-Augmented Generation* (RAG) alimentada por una base de conocimiento interna, empleando bases de datos vectoriales y búsqueda semántica.  
* Capacidades multimodales, incluyendo procesamiento de imágenes y comunicación bidireccional mediante voz (*Text-to-Speech* y *Speech-to-Text*) en tiempo real.

A nivel de infraestructura, la arquitectura real del sistema se apoya en un *stack* con un *Frontend* implementado como *SPA* basado en React 19, TypeScript y Bun desplegado de forma estática en la nube (Vercel); un *Backend* en Python (*FastAPI*) orquestando conexiones *WebSocket*; y una capa de datos gestionada mediante Supabase (*PostgreSQL* con extensión *pgvector* y *Row Level Security*). La inteligencia del sistema se delega a las APIs de *OpenAI* (modelos *GPT* y *Embeddings*) e *ElevenLabs* para el procesamiento de audio. La generación de la  UI será a través de *Stitch*, plataforma low-code de google que utiliza Gemini 3.1 Pro para el diseño y prototipado de mockups debido a su gran calidad y facilidad de exportación de código. Por último,  todo el desarrollo será llevado a cabo en Visual Studio Code debido a que es el entorno con el que más familiarizado estoy y es el estándar en la industria. 

Las decisiones de este stack están basadas en que el desarrollo de este proyecto fue llevado a cabo íntegramente en semana y media durante mi proceso formativo en iAR.

Para ilustrar de forma empírica el impacto de la IA, la ejecución de este caso práctico se estructura siguiendo las fases clásicas de la ingeniería de *software*, pero asistidas íntegramente por IA:

1. **Análisis y Especificación de Requisitos:** Aplicación de ingeniería inversa sobre requerimientos ambiguos.  
2. **Implementación Asistida:** Prototipado y diseño de UI junto a desarrollo guiado por especificaciones (SDD) y TDD y con reacción de ecosistemas de agentes y *skills* personalizados.  
3. **Validación y Verificación:** Creación automatizada de pruebas (unitarias, de integración y *end-to-end*) guiada por LLMs. Esta fase incluye la auditoría estática de código, la verificación de las políticas de seguridad de acceso a datos (RLS en Supabase).  
4. **Despliegue:** Generación asistida de *pipelines* de CI/CD para la orquestación y entrega continua del sistema. Esto abarca la automatización de *builds* con Bun para el despliegue estático en Vercel, la contenerización y configuración del entorno cloud para el backend en Python, y la gestión controlada de migraciones (esquemas relacionales y *pgvector*) en la base de datos de Supabase.

A continuación, se detallan las fases que componen este marco de trabajo:

**Fase 1: Análisis y Detallamiento de Requisitos**  
Esta fase tiene como objetivo demostrar que la Inteligencia Artificial, sin una orquestación metodológica basada en principios de ingeniería, actúa como un generador de ruido y deuda técnica. Para ello, se simulará la ingesta de requisitos ambiguos y se comparará el desempeño de tres perfiles de interacción, evaluando cómo la aplicación de metodologías como el *Prompt-Driven Development* (PDD) y el *Specific-Driven Development* (SDD) transforma la ambigüedad en especificaciones ejecutables.

**Fase 2: Diseño Generativo e Implementación Asistida**  
Esta fase consistirá en  la generación del diseño UI junto a configurar el IDE asistido (Visual Studio Code \+ GitHub Copilot Business) sentando las bases deterministas del comportamiento de la IA antes de escribir código.

**Fase 3: Validación y Verificación (V\&V)**  
El objetivo de la tercera fase es que el sistema desarrollado no solo cumple con los requisitos funcionales definidos, sino que también satisface criterios críticos de calidad, seguridad, robustez y accesibilidad. En el contexto del paradigma Specific-Driven Development (SDD), la automatización intensiva del desarrollo mediante Inteligencia Artificial introduce una nueva categoría de riesgo sistémico: sistemas sintácticamente correctos pero con vulnerabilidades latentes o inconsistencias semánticas. Para mitigar estos riesgos, la validación se concibe como una arquitectura de auditoría automatizada, donde la IA asume un rol dual como generadora del sistema y agente auditor que lo evalúa.

**Fase 4: Despliegue Continuo y Operaciones Asistidas**  
Para finalizar, la última fase aborda la materialización del sistema en entornos productivos. A diferencia de fases anteriores donde la IA generaba artefactos complejos (especificaciones, código, pruebas), el ecosistema PaaS moderno (Vercel, Render, Supabase) ha abstraído la infraestructura tradicional. El rol de la IA pivotó hacia la planificación estratégica, orquestación de configuración y verificación post-despliegue.

## **Fase 1:**  {#fase-1:}

**Definición del Artefacto de Entrada:**

Para emular la fricción habitual del entorno empresarial, se ha diseñado una transcripción simulada de una reunión de *kick-off* con un cliente no técnico.

El texto, coloquial y desestructurado, contiene lenguaje ambiguo, requerimientos implícitos de alta complejidad técnica y contradicciones lógicas. El propósito de este artefacto es evaluar la capacidad de los distintos perfiles de interacción con IA para purgar el ruido, detectar riesgos latentes y abstraer la lógica de negocio subyacente.

*"Hombre, ¡por fin\! Pasa, pasa. Perdona que te haga esperar, es que me tenían frito al teléfono los de logística. Menuda mañana. Bueno, siéntate, que te cuento rápido la idea que tengo en la cabeza porque a las doce me tengo que ir pitando a otra reunión.* \> *A ver, tú sabes esto del ChatGPT, ¿no? Que ahora está en todos lados y hasta mi hijo lo usa para los trabajos del instituto. Pues quiero eso, pero para nosotros. Para la empresa. La idea es que los de mi equipo se metan ahí con su usuario de la empresa y listo. Y bueno, a ver cómo te lo explico... que no sea un cacao, ¿vale? Imagínate que un comercial está preguntándole al bicho este por una caldera para un cliente, y le entra una urgencia de otro por unas tuberías. Pues que no se le mezcle todo, que luego acaban dándole el precio de los tubos al de la caldera. Que sea fácil empezar con un tema nuevo y limpio, y lo que ya está cerrado y no sirve para nada, pues que no estorbe en la pantalla.*

*Oye, y una cosa clave, ¿se puede hacer que el cacharro este tenga todos nuestros documentos de la empresa y así? ¿Sabes? Como cuando le pasas un PDF al ChatGPT de ahora y luego le preguntas cosas. Porque tenemos un servidor antiguo lleno de manuales de productos, tarifas, normativas... Yo quiero que el comercial esté con el cliente, le pregunten algo raro, y el cacharro este se lea lo que haga falta y le dé la respuesta exacta al vuelo. Y por favor, que no se invente nada, que luego el lío me lo como yo.*

*Y otra movida. Los comerciales se pasan la vida en el coche. No me vale que tengan que ir tecleando. Yo quiero que vayan conduciendo y puedan hablarle al trasto este de voz, de forma natural, y que les conteste hablando. Como si llevaran a un asistente de copiloto. Pero que sea rápido, ¿eh? Que una vez probé una cosa de estas de voz y tardaba un siglo en contestarme, y eso te corta todo el rollo con el cliente.*

*Y luego, los clientes son tremendos. A veces te mandan una foto de una pieza rota por WhatsApp y te dicen 'oye, que se ha roto esto'. ¿Habría alguna forma de que le enseñemos esa foto a la maquinita y sepa qué pieza es? Nos ahorraría la vida.*

*Eso sí, el tema de privacidad es sagrado. Lo que hable Paco con su cacharro es de Paco, no quiero que Lucía vea sus cosas. Cada uno a lo suyo y con total confidencialidad.*

*En fin, esa es la idea general. ¿Cómo lo ves? ¿Crees que para el jueves que viene, o el viernes a muy tardar, me puedes traer unos dibujitos o unas pantallas de cómo se vería esto para enseñárselo al jefe.*

### **Interacción Perfil 1: Usuario Básico (Enfoque Zero-Shot sobre Entorno Agéntico)**

El primer escenario simula la interacción de un usuario sin formación metodológica en ingeniería de *prompts*, pero que tiene acceso a herramientas de desarrollo. Para llevar a cabo esta prueba, se introdujo el artefacto en la ventana de chat de Visual Studio Code, configurando el asistente explícitamente en modo *Agent* y con el modo de ejecución Automático (*Auto*).

Este perfil se acerca al concepto de *vibecoding* en sus fases tempranas: el usuario posee una herramienta con capacidad de planificación autónoma, pero describe el objetivo final en lenguaje natural y delega toda la responsabilidad estructural e interpretativa a la probabilidad estadística del modelo.

**Instrucción proporcionada (*Prompt*):**

Se empleó una instrucción directa (*zero-shot*) y carente de contexto estructural, inyectando directamente la transcripción del cliente en la interfaz de la IA con el modo Automático sin posibilidad de elegir el modelo *LLM* para la tarea y con el modo *Agent*  :

*"Sácame los requisitos y la especificación para este proyecto a partir de este texto: \[Inserción del Artefacto\]"*.

![][image29]

##### ***Figura 27 : Captura del perfil 1 de la fase 1 con el prompt insertado en la ventana de chat  de Visual Studio Code*** {#figura-27-:-captura-del-perfil-1-de-la-fase-1-con-el-prompt-insertado-en-la-ventana-de-chat-de-visual-studio-code}

### 

### 

### 

### 

### **Respuesta generada:**

Especificación del Proyecto: Asistente IA Empresarial Conversacional

Basado en el texto proporcionado, se describe un sistema de IA conversacional personalizado para comerciales de una empresa de calderas y tuberías. El objetivo es crear una herramienta similar a ChatGPT, integrada con documentos internos, que permita consultas eficientes, manejo de conversaciones separadas, interacción por voz y reconocimiento de imágenes, con énfasis en privacidad y rapidez.

Requisitos Funcionales

Gestión de Conversaciones Independientes: Permitir a los usuarios iniciar conversaciones separadas por temas (ej. una para calderas y otra para tuberías), evitando mezclas de información entre consultas. Las conversaciones cerradas deben archivarse sin interferir en la interfaz.

Acceso a Documentos Empresariales: Integrar un repositorio de documentos (manuales de productos, tarifas, normativas) alojados en un servidor antiguo. El sistema debe consultar estos documentos para proporcionar respuestas precisas basadas en información real, sin inventar datos.

Interacción por Voz: Soporte para entrada y salida de voz natural, permitiendo a los comerciales hablar mientras conducen. Las respuestas deben ser rápidas (sin demoras significativas) para mantener el flujo conversacional.

Reconocimiento de Imágenes: Capacidad para analizar fotos de piezas rotas enviadas por clientes (ej. vía WhatsApp) y identificar el componente, proporcionando información relevante.

Autenticación y Privacidad: Cada usuario (comercial) debe acceder con credenciales empresariales. Las conversaciones y datos deben ser estrictamente privados por usuario, sin acceso cruzado entre empleados.

Requisitos No Funcionales

Rendimiento: Respuestas rápidas en consultas de voz (menos de unos segundos para mantener el ritmo conversacional).

Usabilidad: Interfaz intuitiva y fácil de usar, especialmente en entornos móviles (coche). Debe ser accesible sin tecleo excesivo.

Privacidad y Seguridad: Confidencialidad total por usuario; cumplimiento de normativas de datos empresariales.

Integración: Compatibilidad con servidores antiguos para documentos; soporte para imágenes desde WhatsApp.

Escalabilidad: Capaz de manejar múltiples usuarios simultáneos sin degradación.

Especificación General

El proyecto consiste en desarrollar una aplicación web/móvil con IA (posiblemente basada en modelos como GPT, con fine-tuning para el dominio empresarial). Arquitectura: Frontend para chat e interfaz de voz; Backend para procesamiento de consultas, integración con base de documentos y reconocimiento de imágenes (usando APIs como OCR o visión por computadora). Entregables iniciales: Prototipos de pantallas y wireframes para presentación al jefe, listos en 1-2 semanas. Tecnologías sugeridas: Python/Node.js para backend, React para frontend, integración con servicios de voz (ej. Google Speech API) y visión (ej. Azure Computer Vision). Presupuesto y timeline dependen de complejidad; priorizar MVP con chat básico, documentos y voz.

#### **Análisis de la Salida Generada:**

La salida generada por el modelo bajo un enfoque *zero-shot* demuestra limitaciones estructurales cuando se evalúa desde la ingeniería de *software* profesional. Aunque el resultado presenta una organización superficialmente correcta, su utilidad como artefacto base para el desarrollo es limitada.

En primer lugar, hay una falsa sensación de completitud. El modelo produce una especificación que, en apariencia, cubre los aspectos funcionales del sistema, pero en realidad se limita a reformular el discurso del cliente en lenguaje técnico, sin realizar un proceso real de abstracción ni refinamiento. Esto implica que no existe una transformación efectiva de requisitos ambiguos en especificaciones operativas.

En segundo lugar, la salida tiene una baja descomposición funcional. Los requisitos están definidos a nivel macro (*feature-level*), pero no se descomponen en unidades mínimas implementables (*task-level* o *story-level*). Esta ausencia de descomposición impide:

* La planificación iterativa (*Scrum/Kanban*)  
* La estimación de esfuerzo  
* La asignación de responsabilidades  
* La implementación incremental

Desde la perspectiva de calidad, la falla más crítica es la ausencia total de criterios de aceptación verificables. Ningún requisito está formulado en términos testables (por ejemplo, mediante BDD o Given/When/Then), lo que imposibilita:

* La validación automática (TDD)  
* La definición de “Definition of Done”  
* La trazabilidad entre requisitos y tests

Además, el modelo demuestra una falta para detectar implicaciones arquitectónicas. Aunque menciona tecnologías genéricas, no identifica decisiones críticas derivadas de los requisitos, como por ejemplo:

* La necesidad de comunicación en tiempo real (WebSockets) para voz bidireccional  
* Problemas de latencia en pipelines de audio  
* Complejidad del RAG sobre fuentes no estructuradas  
* Gestión de contexto conversacional persistente

En definitiva queda claro que el modelo opera a nivel semántico superficial, pero no a nivel de diseño de sistemas.

Otro punto relevante es la presencia de alucinaciones tecnológicas y decisiones arbitrarias. La recomendación de herramientas como APIs externas (Google, Azure) no responde a un análisis contextual del problema, sino a patrones estadísticos, introduciendo ruido y puede desviar decisiones técnicas si no se filtra.

Por último, no existe ningún tipo de análisis de riesgos. El modelo ignora completamente factores clave como:

* Riesgos de escalabilidad  
* Dependencia de terceros (APIs de IA)  
* Problemas de privacidad en entornos multiusuario  
* Fallos en integraciones críticas (voz, imágenes, RAG)

En conjunto, la salida no cumple con los estándares mínimos de un documento de especificación técnica utilizable en entornos profesionales.

#### **Conclusión del Perfil 1** 

El comportamiento observado en este perfil confirma que, en ausencia de una orquestación metodológica, la Inteligencia Artificial no actúa como un agente de ingeniería, sino como un amplificador de ambigüedad estructurada.

Aunque el modelo es capaz de producir texto con sentido y en un principio algo técnico, su contribución real al proceso de desarrollo es limitada, ya que:

* No reduce la incertidumbre del problema  
* No transforma requisitos en artefactos ejecutables  
* No habilita procesos de validación automática  
* No anticipa complejidades técnicas ni riesgos

Desde una perspectiva práctica, utilizar este tipo de salida como punto de partida en un proyecto real conduciría a:

* Deuda técnica temprana, debido a decisiones mal fundamentadas  
* Retrabajo continuo, al descubrir requisitos implícitos no capturados  
* Desalineación entre negocio y tecnología  
* Incremento del coste de desarrollo en fases avanzadas

### **Interacción Perfil 2: Usuario Intermedio (Enfoque Estructurado Básico)**

El segundo escenario evalúa a un perfil intermedio que, si bien no sigue un marco metodológico como el *Specific-Driven Development* (SDD), entiende la necesidad de estructurar la información y separar los dominios lógicos. Para esta prueba, se empleó un modelo de razonamiento rápido (Claude Haiku 4.5) dentro del entorno integrado, utilizando el modo de planificación (*Plan Agent*).

**Instrucción proporcionada (*Prompt*):** Se inyectó la transcripción del cliente precedida de una directriz orientada a la extracción y categorización de requisitos:

*"Lee esta transcripción. Extrae una lista de Historias de Usuario (HUs) y separa los requisitos de Frontend y Backend: \[Inserción del Artefacto\]"*.

![][image30]

##### ***Figura 28 : Captura del perfil 2 de la fase 1 con el prompt insertado en la ventana de chat  de Visual Studio Code*** {#figura-28-:-captura-del-perfil-2-de-la-fase-1-con-el-prompt-insertado-en-la-ventana-de-chat-de-visual-studio-code}

### 

### **Respuesta generada:**

Voy a analizar esta transcripción, extraer las Historias de Usuario y separar los requisitos técnicos. Permíteme guardar un análisis estructurado que podemos refinar juntos.

## **Análisis de Requisitos \- Asistente IA Empresarial**

He extraído 9 Historias de Usuario de la transcripción. Aquí está el resumen:

### **Historias de Usuario (HUs)**

| HU | Título | Descripción Breve |
| ----- | ----- | ----- |
| 1 | Acceso Autenticado | Login con credenciales corporativas |
| 2 | Conversaciones Aisladas | Cada conversación independiente, sin mezcla |
| 3 | Gestión de Conversaciones | Archivar/cerrar conversaciones antiguas |
| 4 | Consulta de Documentos | Asistente responde basándose en documentos internos |
| 5 | Subida de Documentos | Administrador carga PDFs, manuales, tarifas |
| 6 | Entrada por Voz | Hablar al asistente mientras se conduce |
| 7 | Salida por Voz | Escuchar respuestas en voz (rápido) |
| 8 | Reconocimiento de Imágenes | Fotografiar pieza rota → identificar qué es |
| 9 | Privacidad/Aislamiento | Datos completamente segregados por usuario |

**Requisitos FRONTEND**

* Autenticación (login)  
* Dashboard con historial de conversaciones  
* Interfaz chat interactivo  
* Botón grabar audio / micrófono  
* Reproductor de audio para respuestas  
* Captura/subida de imágenes  
* Indicadores de carga (especialmente importante para latencia de voz)  
* Diseño responsive (móvil, conducción)

### **Requisitos BACKEND**

* Autenticación y sesiones  
* API REST/GraphQL (conversaciones: CRUD)  
* RAG (Búsqueda en documentos):  
  * Indexador de documentos con embeddings  
  * Vector store (búsqueda semántica)  
* Servicios de IA:  
  * LLM (ChatGPT/Claude/alternativa)  
  * Speech-to-Text (voz → texto)  
  * Text-to-Speech (texto → voz, \<3seg)  
  * Computer Vision (identificar piezas en fotos)  
* Base de datos: usuarios, conversaciones, mensajes, documentos  
* Validación de respuestas (sin alucinaciones)  
* Aislamiento de datos por usuario

*“Preguntas Clave a Aclarar*

1. *¿Qué LLM prefieren? (OpenAI, Claude, Llama, etc.)*  
2. *¿Dónde está el servidor con documentos? ¿Cómo acceder?*  
3. *¿Solo español o multiidioma?*  
4. *¿Catálogo digital de piezas disponible para matching de imágenes?*  
5. *¿Cuántos usuarios concurrentes esperados?*  
6. *¿Infraestructura on-premise o cloud?*  
   *¿Quieres que afinemos estas HUs, que haga preguntas al cliente para aclarar detalles, o que pasemos a diseñar “*

#### **Análisis del Proceso de Iteración y Refinamiento:**

En esta interacción se evidencia una diferencia metodológica sustancial respecto al Perfil 1, propiciada por la utilización del modo de planificación (*Plan Agent*). Al delegar la tarea a un agente diseñado para la deliberación previa a la ejecución, la IA detiene la generación inmediata de un producto final y exige la intervención del usuario para acotar la incertidumbre.

Esta dinámica sitúa al ingeniero de *software* en una posición de control activo, aplicando el paradigma *Human-in-the-Loop* (HITL). El desarrollador se convierte en partícipe del flujo de pensamiento del agente, iterando con él para delimitar el alcance del proyecto.

Para continuar el ejercicio, se proporcionaron respuestas directas a las interrogantes del agente, forzando definiciones técnicas:

**Respuestas:** 

1.- Usaremos OpenAI 

2.- Pasarán una lista con los documentos o los mismos usuarios irán subiéndolos al chatbot 

3.- Sólo español 

4.- En los PDFs habrá fotos de los productos / dispositivos 

5.- 10 

 6.- Cloud

![][image31]

##### ***Figura 29 : Captura del perfil 2 respondiendo a las preguntas claves a aclarar***  {#figura-29-:-captura-del-perfil-2-respondiendo-a-las-preguntas-claves-a-aclarar}

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### **Respuesta generada tras segunda iteración:**

## **Plan: Asistente IA Empresarial con RAG \+ Voz**

TL;DR: Construir chatbot multimodal (texto, voz, imágenes) que usa OpenAI \+ PDFs subidos por usuarios, almacenado en cloud con búsqueda semántica (RAG), garantizando aislamiento de datos por usuario. Stack: React (frontend) \+ Node.js/Python (backend) \+ PostgreSQL \+ Pinecone \+ AWS/Azure.

### **Decisiones Técnicas Confirmadas** 

* LLM: OpenAI GPT-4 Turbo (+ Vision API para imágenes)  
* Documentos: Usuarios suben PDFs directamente → extracción de texto \+ imágenes  
* Idioma: Solo español  
* Imágenes: Extraerlas de PDFs para análisis de productos  
* Escala: \~10 usuarios concurrentes  
* Infraestructura: Cloud (AWS S3 / Azure Blob Storage)

### **Arquitectura**

### **12 Fases de Implementación** 

| Fase | Descripción |
| :---- | :---- |
| 1 | Setup cloud, repos, env vars |
| 2 | Auth JWT \+ DB schema |
| 3 | CRUD conversaciones \+ aislamiento |
| 4 | Pipeline PDFs (upload → extract → embed) |
| 5 | RAG (búsqueda semántica) |
| 6 | LLM OpenAI con inyección de contexto |
| 7 | Speech-to-Text (micrófono → texto) |
| 8 | Text-to-Speech (texto → audio \<3seg) |
| 9 | Vision API (foto → identificar producto) |
| 10 | Frontend UI/UX (chat, grabador, uploader) |
| 11 | Testing \+ verificación de aislamiento |
| 12 | CI/CD \+ Deploy cloud |

### **Componentes Frontend Clave**

* Autenticación (login)  
* Dashboard de conversaciones (nuevo/archivo/borrar)  
* Chat interactivo con historial  
* Botón micrófono \+ indicador grabación  
* Reproductor audio para respuestas TTS  
* Upload de imágenes  
* Upload de PDFs (admin)  
* Indicadores de carga real-time

### **Endpoints Backend Core**

**POST /auth/login:** Autenticación y generación de JWT.  
**GET /conversations:** Recuperar listado de chats del usuario.  
**POST /conversations:** Inicializar nuevo hilo de conversación.  
**POST /chat/message:** Procesar texto, ejecutar RAG e invocar LLM.  
**POST /chat/audio:** Recibir audio, procesar vía STT, ejecutar lógica de chat y devolver respuesta en TTS (idealmente vía WebSocket).  
**POST /documents/upload:** Subida de PDFs, procesamiento y generación de embeddings.  
**Stack Recomendado**

* Backend: Node.js \+ Express \+ TypeScript (o Python \+ FastAPI)  
* Frontend: React \+ TypeScript \+ Tailwind  
* DB Principal: PostgreSQL  
* Vector DB: Pinecone o Supabase (pgvector)  
* Cloud Storage: AWS S3 o Azure Blob  
* PDF Parser: pdfplumber (extrae imágenes \+ texto)  
* Speech: Azure Cognitive Services (STT/TTS español)  
* Externos: OpenAI API (GPT-4 Turbo \+ Vision)

**Base de Datos \- Schema Esencial**  
**Users:** id (PK), email, password\_hash, created\_at.  
**Conversations:** id (PK), user\_id (FK), title, status, created\_at.  
**Messages:** id (PK), conversation\_id (FK), role (user/assistant), content, media\_url, created\_at.  
**Documents:** id (PK), user\_id (FK), filename, storage\_path, status, created\_at.  
**Document\_Embeddings:** id (PK), document\_id (FK), chunk\_text, embedding\_vector.  
**Verificación**

1. Privacidad: Query de usuario X solo retorna sus datos (test de aislamiento)  
2. RAG: Respuesta referencia documentos reales (sin alucinaciones)  
3. Voz: Latencia \<3seg STT→LLM→TTS  
4. Imágenes: Foto de producto → identifica correctamente  
5. Load test: 10 usuarios simultáneos sin degradación  
6. Conversaciones: Nueva conversación \= estado limpio

#### **Análisis de la Salida Generada**

La salida obtenida en este segundo perfil supone una mejora sustancial respecto al enfoque *zero-shot* previo. La estructuración del *prompt* obliga al modelo a abandonar la respuesta puramente narrativa para organizar la información en artefactos más cercanos a una especificación técnica, introduciendo una primera capa de abstracción mediante la separación de dominios (*Frontend* y *Backend*) debido a la especificación del usuario en el prompt inicial. Esto facilita la asignación de responsabilidades en etapas tempranas; sin embargo, el resultado sigue presentando limitaciones críticas para la ingeniería de *software*:

* **Déficit de Formalización y Trazabilidad:** Las Historias de Usuario generadas actúan como un mero inventario de capacidades (ej. "Acceso Autenticado"), omitiendo el actor, el beneficio esperado y el contexto de uso. Al carecer de criterios de aceptación verificables o sintaxis estructurada (como BDD), el artefacto no es directamente implementable ni automatizable mediante pruebas (TDD).  
* **Falta de Modelado y Métricas:** Aunque el modelo sugiere componentes válidos (RAG, TTS, APIs), no aporta métricas precisas ni estados alternativos. Requisitos como "TTS \<3 seg" se formulan como intenciones, sin contexto técnico sobre cómo medir o validar dicho rendimiento en producción.  
* **Sesgo Tecnológico Prematuro:** El agente ha propuesto infraestructuras específicas (Pinecone, AWS S3) sin que estén justificadas por los requisitos explícitamente. Este comportamiento es debido a la limitación del modelo para completar lagunas de información con heurísticas plausibles, lo que puede introducir decisiones arquitectónicas erróneas antes de cerrar el análisis.

A pesar de estas carencias, este perfil aporta una característica diferencial respecto al perfil anterior y es la reducción de la ambigüedad mediante iteración. Al generar "Preguntas Clave", el modelo reconoce sus vacíos de contexto y fuerza una validación humana antes de avanzar. Metodológicamente, esto desplaza al usuario hacia un rol activo, consolidando un enfoque *Human-in-the-Loop* (HITL) que mejora drásticamente la calidad del preanálisis frente al Perfil 1\.

#### **Conclusión del Perfil 2**

El segundo escenario demuestra que la inyección de una estructura mínima en el *prompt*  y la selección del modo *Plan*, condiciona de forma decisiva la utilidad de la IA, transformándola de un simple resumidor a un asistente de descubrimiento.

No obstante, aun   así sigue teniendo un límite: la clasificación inteligente de información no garantiza el rigor que se le pediría a un ingeniero de *software*. El artefacto generado es un mapa de ruta útil para ordenar ideas, pero sigue siendo vulnerable a ambigüedades, supuestos implícitos y carencias de testabilidad. En definitiva, para convertir esta base organizativa en una especificación técnica formal y ejecutable sin supervisión constante, resulta necesaria la aplicación de una segunda capa de control mucho más estricta, justificando así la necesidad de marcos de trabajo avanzados como el *Specific-Driven Development* (SDD).

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### **Interacción Perfil 3: Ingeniero de Software (Orquestación SDD y TDD Asistido)**

El tercer escenario representa la aproximación metodológica óptima y la cual debería ser perseguida para una correcta utilización de la IA. En este perfil, el desarrollador asume el rol de arquitecto orquestador, aplicando los principios del *Specific-Driven Development* (SDD). El objetivo no es obtener un resumen o un borrador interactivo, sino generar un artefacto técnico inmutable y determinista que guíe a los agentes de codificación en las fases posteriores sin necesidad de intervención humana constante.

A diferencia de las aproximaciones de los perfiles anteriores, el Perfil 3 no emplea un comando genérico, sino que aplica técnicas avanzadas de *Prompt Engineering*, dividiendo la instrucción en directrices lógicas, roles de comportamiento y restricciones estrictas de salida. El *prompt* maestro introducido se estructuró de la siguiente manera:

**Contexto de Sistema (*System Role*):** Se definió una identidad experta exigiendo que el agente actúe como un "Arquitecto de *Software* Principal y *Product Owner* experto en metodologías ágiles". Además , se especificó un marco de trabajo basado en el paradigma de "Cero Asunciones", obligando a la IA a identificar explícitamente cualquier requerimiento del cliente que implique un desafío técnico complejo (tales como la latencia, el procesamiento masivo de archivos o la concurrencia) como un Riesgo Arquitectónico.

**Instrucción de Tarea (*Task Prompt*):** Junto con la transcripción del cliente, se solicitó la generación de un Documento de Especificación formal dividido en tres bloques:

**Bloque 1:** Extracción de Requisitos No Funcionales ocultos y planteamiento de diversas opciones arquitectónicas para el despliegue, la base de datos y la integración de APIs (LLM, *Text-To-Speech* y *Speech-To-Text*).

**Bloque 2:** Identificación de Riesgos Técnicos o fricciones entre las peticiones del cliente y la viabilidad técnica, proponiendo estrategias de mitigación.

**Bloque 3:** Redacción de Historias de Usuario (HUs) para el Producto Mínimo Viable (MVP) bajo una plantilla estricta de *Behavior-Driven Development* (BDD). Se forzó al modelo a redactar los Criterios de Aceptación utilizando la sintaxis formal de "Dado que \[Precondición\]... Cuando \[Acción\]... Entonces \[Resultado\]".

**Restricciones de Formato (*Constraints*):** Para asegurar el determinismo de la salida y facilitar su integración directa en el repositorio, se prohibió explícitamente al modelo la inclusión de explicaciones introductorias o conclusiones de cortesía, forzando la devolución única y exclusiva del artefacto técnico en formato Markdown.

**Instrucción proporcionada (*Prompt*):** 

***“\[System Role / Contexto\]:***

*Actúa como un Arquitecto de Software Principal y Product Owner experto en metodologías ágiles y diseño de software. Tu objetivo es analizar transcripciones de clientes no técnicos, purgar el ruido conversacional, extraer la lógica de negocio subyacente y generar especificaciones técnicas inmutables y ejecutables.*

*Trabajas bajo un paradigma de "Cero Asunciones": si un requisito del cliente implica un desafío técnico complejo (ej. latencia, procesamiento de archivos grandes, concurrencia), debes identificarlo explícitamente como un Riesgo Arquitectónico.*

***TAREA:** Analiza el texto y genera un Documento de Especificación formal estructurado en tres bloques exactos:*

***BLOQUE 1: Requisitos No Funcionales y Decisiones Arquitectónicas Ocultas** Extrae qué requerimientos técnicos (que el cliente no ha nombrado explícitamente) son necesarios para cumplir sus deseos. Categorízalos.*

*Plantea una arquitectura para el proyecto; propone varias opciones para tanto tema despliegue, base de datos o API de LLM y Text To Speech y Speech To Text*

***BLOQUE 2: Riesgos Técnicos y Contradicciones** Identifica cualquier fricción entre lo que el cliente pide y la viabilidad técnica o de costes, proponiendo una solución y cómo enfrentar el problema.*

***BLOQUE 3: Historias de Usuario (Formato Estricto BDD)** Redacta las Historias de Usuario (HUs) necesarias para el MVP. Cada HU debe seguir EXACTAMENTE esta estructura:*

* ***ID:** \[Ej: HU-01\]*  
* ***Título:** \[Breve y descriptivo\]*  
* ***Descripción:** Como \[Rol\], quiero \[Acción\] para \[Beneficio\].*  
* ***Criterios de Aceptación (Sintaxis BDD):** \> \- Escenario 1: \[Nombre\]*  
  * *Dado que \[Precondición técnica clara\]*  
  * *Cuando \[Acción del usuario/sistema\]*  
  * *Entonces \[Resultado medible y testeable\]*

  ***RESTRICCIÓN:** No incluyas explicaciones introductorias ni conclusiones de cortesía. Devuelve únicamente el documento técnico solicitado en formato Markdown.”*

![][image32]

##### ***Figura 30 : Captura del perfil 3 de la fase 1 con el prompt insertado en la ventana de chat  de Visual Studio Code*** {#figura-30-:-captura-del-perfil-3-de-la-fase-1-con-el-prompt-insertado-en-la-ventana-de-chat-de-visual-studio-code}

### 

### **Respuesta generada**

# **DOCUMENTO DE ESPECIFICACIÓN TÉCNICA**

# **BLOQUE 1: REQUISITOS NO FUNCIONALES Y DECISIONES ARQUITECTÓNICAS**

### **Requisitos No Funcionales Implícitos**

Latencia y Rendimiento

* Tiempo de respuesta máximo en modo voz: \<2s (cliente menciona experiencias negativas previas con sistemas lentos)  
* Procesamiento de imágenes: \<1.5s para análisis de piezas  
* Disponibilidad: 99.5% (comerciales en campo requieren acceso permanente)

Seguridad y Aislamiento

* Aislamiento de contexto por usuario (conversaciones privadas no compartidas)  
* Encriptación end-to-end de datos en tránsito  
* Control de acceso granular (usuario solo ve sus conversaciones)  
* Cumplimiento GDPR/normativa privacidad local

Gestión de Conocimiento

* RAG (Retrieval Augmented Generation) obligatorio para evitar alucinaciones  
* Integración con repositorio legado de documentos (manuales, tarifas, normativas)  
* Indexación de documentos con versionado  
* Trazabilidad: qué fuente generó cada respuesta

Concurrencia y Escalabilidad

* Soporte mínimo 50+ usuarios simultáneos en fase inicial  
* Gestión de conversaciones concurrentes por usuario  
* Queue management para picos de carga en TTS/STT

### **Opciones de Arquitectura**

#### **Opción A: Arquitectura Monolítica Cloud-Native (RECOMENDADA para MVP)**

Ventajas: Rápido de iterar, menor complejidad operativa  
Desventajas: Acoplamiento futuro si escalas

#### **Opción B: Arquitectura Microservicios**

Ventajas: Escalabilidad independiente, separación de responsabilidades  
Desventajas: Complejidad operativa, overhead inicial

#### **Opción C: Serverless Híbrido**

Ventajas: Cero infraestructura, escalado automático, menor costo en valle  
Desventajas: Latencia fría en funciones, costo impredecible

### **Opciones de Base de Datos**

| Componente | Opción 1 | Opción 2 | Opción 3 |
| :---- | :---- | :---- | :---- |
| Conversaciones (OLTP) | PostgreSQL \+ JSON | MongoDB | Cloud Firestore |
| Vector Store (Embeddings) | Pinecone (managed) | Milvus (self-hosted) | Weaviate Cloud |
| Documentos (Blob) | AWS S3 / MinIO | Google Cloud Storage | Azure Blob Storage |
| Cache (Sesiones) | Redis | Memcached | DynamoDB |

Recomendación: PostgreSQL (conversaciones) \+ Pinecone (embeddings) \+ S3 (documentos) \= mejor relación costo-complejidad

### **Opciones de Proveedores LLM/TTS/STT**

| Capacidad | Opción 1 (Premium) | Opción 2 (Hybrid) | Opción 3 (Open) |
| :---- | :---- | :---- | :---- |
| LLM | OpenAI GPT-4 | Anthropic Claude 3.5 | Llama 2 (self-hosted) |
| Text-to-Speech | Azure Cognitive / Google Cloud | ElevenLabs | Festival/TTS open-source |
| Speech-to-Text | Azure Speech / Google Cloud | Deepgram | Whisper (OpenAI OSS) |
| Vision (Imágenes) | GPT-4 Vision | Claude Vision | LLaVA (open-source) |

Recomendación para MVP: OpenAI GPT-4o (multimodal) \+ Azure Cognitive Services (TTS/STT) \= mejor latencia y fiabilidad

### **Stack Tecnológico Propuesto**

Backend: Node.js \+ Express o Python \+ FastAPI  
Frontend: React/React Native (web \+ mobile)  
Vector Store: Pinecone o Supabase (pgvector)  
Deployment: Docker \+ Kubernetes o AWS ECS  
Auth: JWT \+ OAuth 2.0  
Monitoring: Datadog / New Relic (latencia crítica en voz)  
**BLOQUE 2: RIESGOS TÉCNICOS Y CONTRADICCIONES**

### **Riesgo 1: Alucinaciones del LLM vs. Precisión de Respuestas**

Criticidad: ALTA  
Descripción: Cliente explícita: "no se invente nada". Los LLMs generan hallucinations cuando no encuentran información relevante en el contexto.  
Impacto: Respuestas incorrectas sobre precios/normativas → pérdida de cliente, conflictos legales  
Solución:

* Implementar prompt engineering con instrucción explícita: "Si no encuentras la información en los documentos, di exactamente 'No tengo esta información en la base de datos de la empresa'"  
* RAG obligatorio: respuesta solo si embedding similarity \> 0.85  
* Verificación post-generación: buscar cita del documento origen  
* UX: mostrar "Fuente: Manual-Productos-v3.pdf (página 12)"

### **Riesgo 2: Latencia en Voz durante Conducción**

Criticidad: ALTA  
Descripción: Cliente menciona experiencia negativa con soluciones lentas. Conducción requiere respuesta \<2s.  
Impacto: Comercial pierde fluidez, no usa la herramienta, fracaso del producto  
Solución:

* Arquitectura de streaming (WebSockets, no polling)  
* Cache local de respuestas frecuentes  
* Whisper (STT) en edge si es posible, fallback a Azure  
* Paralelizar: STT \+ intent detection simultáneamente  
* Métricas: medir p95 latencia en voz en producción  
* Failover a LLM local (Llama 2\) si cloud falla

### **Riesgo 3: Costo Operativo de APIs (LLM \+ TTS/STT)**

Criticidad: MEDIA-ALTA  
Descripción: LLM 0.03  
/1Ktokens,TTS0.02  
/1Ktokens,TTS0.02/1K caracteres, STT variable. Con 50 usuarios activos y 10 interacciones/día cada uno \= \~500 llamadas/día.  
Estimación: $150-300/mes en cloud puro (escala a $1500+ si crece 10x)  
Solución:

* Implementar LLM local (Llama 2 13B) en servidor GPU como fallback  
* Rate limiting por usuario (ej: 100 interacciones/día)  
* Monitoreo de costos real-time  
* Contrato con OpenAI si \> $1K/mes mensual

### **Riesgo 4: Integración con Sistema Antiguo de Documentos**

Criticidad: MEDIA  
Descripción: "servidor antiguo lleno de manuales" \- tecnología, formato, acceso desconocido  
Impacto: Bloqueador de fase 1; retrasos en RAG setup  
Solución:

* Sprint 0 (1 semana): Auditoría de documentos existentes (formato, tamaño, cantidad)  
* ETL customizado según formato (PDF, DOC, TXT, DB)  
* Indexación incremental con versionado  
* Validación manual: verificar que RAG recupera documentos correctos antes de producción

### **Riesgo 5: Privacidad: Aislamiento de Datos por Usuario**

Criticidad: ALTA (legal \+ confianza)  
Descripción: Cliente: "Lo que hable Paco con su cacharro es de Paco". Riesgo: data leakage entre usuarios.  
Solución:

* Row-level security en PostgreSQL (RLS policy por user\_id)  
* Conversaciones en tabla separada con FK strict a usuario  
* Embeddings en Pinecone con namespaces por usuario  
* Audit log de accesos  
* Prueba de penetración pre-producción

### **Riesgo 6: Análisis de Imágenes (Reconocimiento de Piezas)**

Criticidad: MEDIA  
Descripción: Cliente pide reconocer "pieza rota" en foto WhatsApp. Requerimiento vago (qué catálogo de piezas, qué precisión).  
Impacto: Expectativa vs realidad; GPT-4 Vision tiene \~85-90% accuracy sin entrenamiento custom  
Solución:

* MVP: GPT-4 Vision \+ prompt \+ context de catálogo de productos  
* Recopilar feedback de comerciales sobre precisión en producción  
* Roadmap: fine-tuning de modelo custom si accuracy insuficiente  
* UX: "¿Es esta la pieza?" (validación manual) antes de retornar precio

### **Riesgo 7: Escalabilidad de Almacenamiento y Búsqueda**

Criticidad: MEDIA  
Descripción: "Servidor antiguo lleno de manuales" \- volumen desconocido. Vector DB puede crecer 100x si agregan imágenes, audios, logs.  
Impacto: Degradación de búsemántica, costo de Pinecone crece  
Solución:

* Arquitectura de sharding horizontal desde día 1  
* Purga de embeddings obsoletos (ej: conversaciones \>6 meses)  
* Métricas de tamaño y costo de vector DB en dashboard

## **BLOQUE 3: HISTORIAS DE USUARIO (BDD)**

### **HU-01: Autenticación y Acceso a la Plataforma**

ID: HU-01  
Título: Usuario accede a la plataforma con credenciales corporativas  
Descripción: Como comercial, quiero acceder a la plataforma con mi usuario corporativo (email \+ contraseña) para empezar a usar el asistente IA.  
Criterios de Aceptación:  
Escenario 1: Login exitoso

* Dado que un usuario registrado accede a la URL de login  
* Cuando ingresa email válido y contraseña correcta  
* Entonces se autentica, recibe token JWT, y redirige al dashboard de conversaciones

Escenario 2: Credenciales inválidas

* Dado que un usuario intenta login con contraseña incorrecta  
* Cuando presiona "Entrar"  
* Entonces muestra error "Credenciales inválidas" y no concede acceso

Escenario 3: Usuario no registrado

* Dado que un usuario nuevo intenta acceder  
* Cuando el admin corporativo lo registra en el panel de administración  
* Entonces recibe email de activación con enlace temporal (válido 24h)

Escenario 4: Sesión expirada

* Dado que un usuario tiene token JWT expirado (\>8h)  
* Cuando intenta hacer una llamada a la API  
* Entonces recibe 401 Unauthorized y debe re-autenticarse

### **HU-02: Crear Nueva Conversación Aislada**

ID: HU-02  
Título: Comercial inicia conversación nueva sin mezclarse con anterior  
Descripción: Como comercial, quiero comenzar una conversación completamente nueva sobre un tema diferente para que el asistente no confunda información de clientes distintos.  
Criterios de Aceptación:  
Escenario 1: Crear conversación desde UI

* Dado que el usuario está autenticado en el dashboard  
* Cuando presiona botón "+ Nueva Conversación"  
* Entonces se abre chat vacío con campo de entrada, contexto anterior limpio, y conversación nueva registrada en BD con user\_id \+ timestamp

Escenario 2: Listar conversaciones anteriores

* Dado que un usuario abre el dashboard  
* Cuando carga la página  
* Entonces muestra lista de sus conversaciones anteriores (solo del usuario autenticado) ordenadas por fecha reciente, sin información de otros usuarios

Escenario 3: Cambiar entre conversaciones

* Dado que el usuario tiene 3 conversaciones activas (cliente A, cliente B, cliente C)  
* Cuando hace clic en "Conversación \- Cliente A"  
* Entonces carga historial de esa conversación sin mezclar con Cliente B/C, y contexto del LLM se limpia/reestablece

Escenario 4: Conversación antigua no estorba

* Dado que una conversación tiene \>3 meses sin actividad  
* Cuando el usuario abre el dashboard  
* Entonces la conversación se archiva automáticamente (sin eliminar) y no aparece en lista principal, pero es recuperable en "Conversaciones Archivadas"

### **HU-03: Consulta a LLM con Documentos de la Empresa**

ID: HU-03  
Título: Asistente responde preguntas usando información de manuales y tarifas  
Descripción: Como comercial, quiero preguntarle al asistente sobre especificaciones de productos, precios y normativas para que me responda con información actualizada de la empresa sin inventar datos.  
Criterios de Aceptación:  
Escenario 1: Búsqueda correcta en documentos

* Dado que el comercial pregunta "¿Cuál es el precio de la caldera modelo XR-2000?"  
* Cuando envía el mensaje  
* Entonces el sistema recupera el documento "Tarifas-2025.pdf", extrae el precio, y responde "La caldera XR-2000 cuesta €X (fuente: Tarifas-2025.pdf, página Y)"

Escenario 2: Información no disponible

* Dado que el comercial pregunta "¿Cuál es la compatibilidad con sistemas Martian de 2035?"  
* Cuando envía la consulta  
* Entonces el asistente responde "No tengo esta información en los documentos disponibles de la empresa. Te recomiendo contactar al departamento técnico." (NO inventa respuesta)

Escenario 3: Múltiples documentos relevantes

* Dado que la pregunta "¿Qué normativa aplica para instalaciones en hospitales?" tiene respuesta en 2 documentos (Normativa-2024.pdf \+ Manual-Cumplimiento.pdf)  
* Cuando envía el mensaje  
* Entonces el asistente consolida ambas fuentes y cita: "Según normativa X (Normativa-2024.pdf) y procedimiento Y (Manual-Cumplimiento.pdf)..."

Escenario 4: Versionado de documentos

* Dado que se actualiza "Tarifas-2025.pdf" a versión 2.1 (cambio de precio)  
* Cuando un comercial hace una consulta posterior  
* Entonces el sistema usa la versión más reciente (2.1) automáticamente y responde con precio actualizado

### **HU-04: Interacción por Voz (Speech-to-Text \+ Text-to-Speech)**

ID: HU-04  
Título: Comercial habla al asistente sin usar teclado  
Descripción: Como comercial en el coche, quiero hablar al asistente de forma natural para que me entienda y me responda hablando, sin necesidad de escribir.  
Criterios de Aceptación:  
Escenario 1: Grabación y transcripción de audio

* Dado que el comercial presiona micrófono y dice "¿Cuál es la garantía de las tuberías de cobre?"  
* Cuando termina de hablar (detección de silencio \>1.5s)  
* Entonces el sistema envía audio a STT, transcribe a texto, y muestra en chat: "¿Cuál es la garantía de las tuberías de cobre?"

Escenario 2: Latencia de respuesta \<2 segundos

* Dado que el comercial hace una pregunta por voz  
* Cuando la pregunta está indexada en documentos de la empresa  
* Entonces recibe respuesta en audio en \<2 segundos (medido p95) para no interrumpir flujo de conversación

Escenario 3: Text-to-Speech de respuesta

* Dado que el asistente genera respuesta "La garantía es 10 años en tuberías de cobre"  
* Cuando completa la respuesta  
* Entonces automáticamente reproduce audio con voz natural (masculina/femenina configurable), a velocidad 1x (0.8-1.2x ajustable)

Escenario 4: Ruido de fondo moderado

* Dado que el comercial habla desde un coche con ruido ambiente (música radio, tráfico)  
* Cuando STT procesa audio  
* Entonces transcribe correctamente (tolerancia: \>90% Word Error Rate para ruido medio)

Escenario 5: Fallo de STT/TTS

* Dado que la conexión de internet falla durante TTS  
* Cuando intenta reproducir respuesta en audio  
* Entonces fallback a texto mostrado en pantalla \+ notificación "Audio no disponible en este momento"

### **HU-05: Análisis de Imágenes de Piezas**

ID: HU-05  
Título: Comercial envía foto de pieza rota y asistente la identifica  
Descripción: Como comercial, quiero enviar foto de una pieza rota (vía cámara o WhatsApp) para que el asistente identifique qué es y qué información técnica tiene.  
Criterios de Aceptación:  
Escenario 1: Carga y análisis de imagen

* Dado que el comercial presiona ícono de cámara/galería y selecciona foto de pieza dañada  
* Cuando carga la imagen en la conversación  
* Entonces el sistema envía imagen a GPT-4 Vision, recibe análisis, y responde: "Esta es una válvula de cierre modelo ABC-123. Precio: €X (fuente: Catálogo-Piezas.pdf)"

Escenario 2: Imagen poco clara

* Dado que el comercial envía foto de baja calidad/ángulo incorrecto  
* Cuando el asistente procesa imagen  
* Entonces responde: "No puedo identificar claramente la pieza. ¿Puedes enviar una foto desde otro ángulo?" (NO inventa identificación)

Escenario 3: Pieza no catalogada

* Dado que la imagen es de una pieza que no existe en el catálogo de productos de la empresa  
* Cuando el asistente la analiza  
* Entonces responde: "No reconozco esta pieza en nuestro catálogo. Parece ser un \[descripción genérica\]. Contacta a técnico para confirmación."

Escenario 4: Confirmación manual

* Dado que el asistente propone identificación con confianza \<85%  
* Cuando muestra resultado  
* Entonces añade botón "¿Es esta la pieza?" (sí/no) para capturar feedback y mejorar precisión

Escenario 5: Límite de tamaño

* Dado que el comercial intenta cargar imagen \>10MB  
* Cuando presiona enviar  
* Entonces muestra error: "Imagen demasiado grande. Máximo 10MB. Comprime o reduce resolución."

### **HU-06: Privacidad y Aislamiento de Datos**

ID: HU-06  
Título: Conversaciones privadas por usuario sin acceso cruzado  
Descripción: Como comercial, quiero garantizar que mis conversaciones sean completamente privadas y no vea información de otros colegas para cumplir con confidencialidad.  
Criterios de Aceptación:  
Escenario 1: Usuario no ve conversaciones de otros

* Dado que Paco se autentica en la plataforma  
* Cuando abre el dashboard de conversaciones  
* Entonces ve SOLO sus conversaciones, no las de Lucía, Juan, u otros usuarios (row-level security)

Escenario 2: Contexto aislado en LLM

* Dado que el comercial pregunta algo al asistente  
* Cuando el LLM procesa la consulta  
* Entonces el contexto de conversación enviado al LLM es SOLO del usuario autenticado, sin datos históricos de otros

Escenario 3: Encriptación en tránsito

* Dado que un comercial envía un mensaje de texto/audio/imagen  
* Cuando viaja desde app a servidor  
* Entonces usa HTTPS/TLS 1.3 (cifrado en tránsito), validable en DevTools/Fiddler

Escenario 4: Admin no accede sin autorización

* Dado que un admin de sistema abre la base de datos  
* Cuando intenta leer conversaciones de un usuario específico sin rol autorizado  
* Entonces base de datos deniega acceso (RLS policy) y registra intento en audit log

Escenario 5: GDPR \- Derecho al olvido

* Dado que un usuario solicita borrado de sus datos (art. 17 GDPR)  
* Cuando se procesa la solicitud  
* Entonces se eliminan todas sus conversaciones, embeddings, e historial en \<30 días, con confirmación auditada

### **HU-07: Dashboard de Conversaciones**

ID: HU-07  
Título: Usuario visualiza lista clara de conversaciones con estado  
Descripción: Como comercial, quiero ver mis conversaciones organizadas de forma clara para saber rápidamente cuál abrir sin confusiones.  
Criterios de Aceptación:  
Escenario 1: Lista con metadatos clave

* Dado que el usuario abre el dashboard  
* Cuando se carga la página  
* Entonces ve tabla/lista con: \[Nombre conversación\] \[Fecha inicio\] \[Último mensaje\] \[\# mensajes\] \[Estado: Activa/Archivada\]

Escenario 2: Búsqueda rápida

* Dado que el usuario tiene 20+ conversaciones  
* Cuando escribe "Cliente ABC" en campo de búsqueda  
* Entonces filtra lista en tiempo real mostrando solo conversaciones que contengan "ABC"

Escenario 3: Ordenamiento flexible

* Dado que el usuario ve lista de conversaciones  
* Cuando hace clic en encabezado "Fecha"  
* Entonces ordena ascendente/descendente, permitiendo ver conversaciones más recientes o antiguas primero

Escenario 4: Renombrar conversación

* Dado que el usuario quiere claridad sobre tema de una conversación  
* Cuando hace clic derecho en conversación y selecciona "Renombrar"  
* Entonces permite editar nombre a "Cliente XYZ \- Oferta Tubería" y guarda cambio

### **HU-08: Monitoreo de Calidad y Latencia**

ID: HU-08  
Título: Sistema monitorea latencia de voz y alucinaciones del LLM  
Descripción: Como Product Owner, quiero visibilidad en la calidad de respuestas (latencia, precisión, hallucinations) para asegurar experiencia óptima en producción.  
Criterios de Aceptación:  
Escenario 1: Métrica de latencia en voz

* Dado que un comercial usa modo voz  
* Cuando completa ciclo STT → LLM → TTS  
* Entonces el sistema registra latencia total (ej: 1.2s, 0.8s, 2.5s) en dashboard de métricas, con p50/p95/p99

Escenario 2: Detección de alucinaciones

* Dado que el LLM genera respuesta  
* Cuando la respuesta NO tiene documento origen con similarity \>0.85  
* Entonces se marca como "alucinación potencial" en log, visible en dashboard de calidad

Escenario 3: Feedback de usuario

* Dado que el comercial recibe respuesta  
* Cuando ve ícono de "👍 / 👎" al pie del mensaje  
* Entonces puede dar feedback (útil/no útil), capturado para análisis de calidad

Escenario 4: Dashboard de alertas

* Dado que latencia p95 excede 3s o tasa de alucinaciones \>5%  
* Cuando ingresa el PO al dashboard  
* Entonces ve alerta roja \+ recomendación (ej: "Latencia alta \- revisar carga de Pinecone")

### **HU-09: Integración de Documentos Nuevos**

ID: HU-09  
Título: Admin carga nuevos documentos de la empresa al sistema  
Descripción: Como administrador, quiero poder añadir nuevos manuales, tarifas y normativas de forma regular para mantener el conocimiento del asistente actualizado.  
Criterios de Aceptación:  
Escenario 1: Carga de PDF

* Dado que el admin accede al panel de administración  
* Cuando sube archivo "Tarifas-2025-v2.pdf" (máx 50MB)  
* Entonces el sistema procesa el PDF, extrae texto, genera embeddings, e indexa en Pinecone en \<2 minutos

Escenario 2: Versionado automático

* Dado que se carga una versión nueva de "Tarifas-2025-v1.pdf"  
* Cuando se sube "Tarifas-2025-v2.pdf"  
* Entonces el sistema marca v1 como deprecada, prioriza v2 en búsemántica, mantiene histórico

Escenario 3: Validación de contenido

* Dado que admin carga documento  
* Cuando se procesa  
* Entonces el sistema extrae 5 fragmentos muestrales y muestra: "¿Confirma que el contenido es válido?" para validación manual antes de activar en RAG

Escenario 4: Documento en idioma no soportado

* Dado que admin carga PDF en chino  
* Cuando el sistema intenta procesar  
* Entonces muestra error "Idioma no soportado. Aceptamos: Español, English, Français"

### **HU-10: Degradación Elegante y Fallback**

ID: HU-10  
Título: Sistema mantiene funcionalidad mínima si falla cloud API  
Descripción: Como usuario, quiero que si la API de OpenAI o Azure falla, el sistema me informe claramente y ofrezca alternativa (no crash silencioso).  
Criterios de Aceptación:  
Escenario 1: OpenAI API timeout

* Dado que comercial envía pregunta y OpenAI tarda \>10s en responder  
* Cuando timeout ocurre  
* Entonces el sistema retorna: "El servicio está lento. Reintentando..." y fallback a Llama 2 local si timeout persiste

Escenario 2: Sin conexión internet

* Dado que el comercial pierde conexión en coche (túnel, zona rural)  
* Cuando intenta enviar mensaje  
* Entonces muestra: "Sin conexión. Mensaje guardado localmente. Se enviará cuando recuperes conexión" \+ queue visible

Escenario 3: STT indisponible

* Dado que Azure Speech-to-Text está down  
* Cuando comercial intenta modo voz  
* Entonces desactiva botón de micrófono con mensaje: "Modo voz temporalmente no disponible. Usa teclado"

Escenario 4: Recuperación automática

* Dado que API estaba caída hace 10 minutos  
* Cuando servicio se recupera  
* Entonces system automáticamente reintenta y procesa mensajes en queue sin intervención del usuario

### **HU-11: Análisis de Rentabilidad de Conversaciones**

ID: HU-11  
Título: Comercial ve impacto de asistente en sus cifras de negocio  
Descripción: Como comercial, quiero ver datos de cómo el asistente me ha ayudado (tiempo ahorrado, números de consultas) para justificar su valor.  
Criterios de Aceptación:  
Escenario 1: Estadísticas básicas

* Dado que el comercial abre su perfil  
* Cuando navega a "Mi Actividad"  
* Entonces ve: \# de conversaciones, \# de mensajes, \# de imágenes analizadas, \# de consultas por voz (esta semana/mes/año)

Escenario 2: Tiempo ahorrado

* Dado que el comercial usó el asistente en lugar de buscar manual  
* Cuando abre dashboard  
* Entonces muestra estimación: "Hoy: 45 min ahorrados. Mes: 8 horas ahorradas" (basado en comparación con búsqueda manual promedio)

Escenario 3: Documentos más usados

* Dado que el comercial ha hecho múltiples consultas  
* Cuando abre "Análisis"  
* Entonces muestra gráfico: "Top 3 documentos consultados: Tarifas (80%), Manual-XR-2000 (65%), Normativa (45%)"

### **HU-12: Integración con Sistema Antiguo de Documentos**

ID: HU-12  
Título: Sistema accede y sincroniza documentos del servidor legado  
Descripción: Como administrador, quiero que el asistente IA acceda automáticamente a manuales y tarifas almacenados en el servidor antiguo de la empresa para no duplicar información.  
Criterios de Aceptación:  
Escenario 1: Sincronización automática inicial

* Dado que se ejecuta job de sincronización por primera vez  
* Cuando conecta al servidor legado y escanea /docs/manuales, /docs/tarifas, /docs/normativas  
* Entonces extrae 500+ archivos, genera embeddings, indexa en Pinecone, registra log de operación en \<4 horas

Escenario 2: Incremental diario

* Dado que cada noche a las 2am se ejecuta sincronización incremental  
* Cuando detecta 5 archivos nuevos en servidor legado  
* Entonces procesa solo los nuevos (no re-procesa existentes), actualiza indices en \<15 minutos

Escenario 3: Conflicto de versiones

* Dado que existe "Tarifas.pdf" (v1 en legado, v2 localmente cacheada)  
* Cuando sincroniza  
* Entonces marca versión legada como obsoleta, prioriza v2 en búsqueda, genera alerta al admin

Escenario 4: Fallo de sincronización

* Dado que servidor legado está offline  
* Cuando job de sincronización intenta conectar  
* Entonces registra fallo, reintentar cada hora durante 24h, alerta al admin si no se recupera

Escenario 5: Acceso a formatos variados

* Dado que servidor legado contiene PDFs, DOCx, TXTs, CSVs  
* Cuando sincroniza  
* Entonces convierte todos a texto normalizado (OCR para imágenes en PDFs), genera embeddings uniformes

Tras suministrar el *prompt* inicial al sistema, el agente generó una primera aproximación de la Especificación Técnica de un tamaño muy superior a los demás perfiles y con un nivel de detalle altísimo. Si bien el modelo demostró una capacidad analítica superior (extrayendo métricas implícitas), la sección arquitectónica difteria de la arquitectura que se utiliza en iAR por lo que el perfil 3 procedió a corregir ciertos aspectos, comenzando así una fase de iteración con la IA: 

**Mensaje de corrección (Steering Prompt):** 

*“El análisis de requisitos y las historias de usuario están bien encaminados, pero necesitamos ajustar el Bloque 1 (Decisiones Arquitectónicas) y el Bloque 2 (Riesgos) a las restricciones tecnológicas reales que tenemos en la empresa.*

***1\. Frontend (SPA Estática):** En la empresa tenemos estandarizado desplegar en Vercel. Usaremos React \+ TypeScript \+ Bun. Se desplegará como Static SPA* 

***2\. Backend (Monolito API):** Vercel Serverless no nos sirve para el backend porque el cliente exige voz en tiempo real con baja latencia. Necesitamos conexiones persistentes. Por tanto, el backend será una API tradicional con FastAPI (Python) corriendo sobre Uvicorn, desplegado en Render.* 

***3\. Capa de Datos y BaaS:** Usaremos Supabase.* 

***4\. Servicios de IA:** Core IA: Usaremos la API de OpenAI (GPT-4o para chat/visión y text-embedding-3) porque actualmente ofrece el mejor equilibrio entre coste y rendimiento para las capacidades multimodales que pide el cliente (análisis de imágenes de piezas). Voz: usaremos ElevenLabs para TTS y STT.”*

**![][image33]**

##### ***Figura 31 : Captura del perfil 3 aplicando una corrección al mensaje de la primera iteración*** {#figura-31-:-captura-del-perfil-3-aplicando-una-corrección-al-mensaje-de-la-primera-iteración}

Al procesar la corrección, la IA asimiló las nuevas directrices y priorizó la resolución de incertidumbres. En lugar de proceder con una sobrescritura automática, el entorno agéntico activó su capacidad de *Plan Mode*, pausando el proceso ante conflictos de diseño a bajo nivel. El agente solicitó entonces una validación técnica detallada a través de la interfaz de desarrollo :

1. **Despliegue del Backend:** Ante la elección de la plataforma Render, el sistema consultó si se utilizará un servicio nativo o un contenedor. Se seleccionó *Container Docker* para garantizar un mayor control sobre los procesos de CI/CD desde el repositorio en GitHub.

![][image34]

##### ***Figura 32 : Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Primera pregunta*** {#figura-32-:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-primera-pregunta}

2. **Estrategia de Embeddings:** Con la restricción de Supabase activa, la IA solicitó diferenciar entre el uso interno de *pgvector* o un Vector DB externo (Pinecone). Se marcó el uso de *pgvector* en Supabase, priorizando la consolidación en un único BaaS para reducir la complejidad del sistema.

![][image35]

##### ***Figura 33: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Segunda pregunta*** {#figura-33:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-segunda-pregunta}

3. **Modelo de Autenticación:** Se descartó el uso de un *OAuth* corporativo externo en favor de la integración nativa de Supabase Auth, agilizando así el desarrollo del Producto Mínimo Viable (MVP).

![][image36]

##### ***Figura 34: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Tercera pregunta*** {#figura-34:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-tercera-pregunta}

4. **Gestión de Documentos Legados:** Se resolvió migrar los archivos a Supabase Storage (compatible con S3) para centralizar el control, rechazando el mantenimiento de accesos directos al servidor antiguo.

![][image37]

##### ***Figura 35: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Cuarta pregunta*** {#figura-35:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-cuarta-pregunta}

5. **Protocolo para Baja Latencia (Voz):** Para cumplir el estricto requerimiento del cliente sobre la fluidez del asistente conversacional, el agente planteó la disyuntiva entre *Server-Sent Events* (SSE) y *WebSockets*. Se seleccionó WebSockets, justificando su capacidad bidireccional *full-duplex*, tecnológicamente indispensable para el *streaming* ininterrumpido de audio.

![][image38]

##### ***Figura 36: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Quinta pregunta*** {#figura-36:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-quinta-pregunta}

6. **Presupuesto Operativo:** Se especificó la ausencia de un límite presupuestario estricto para las APIs en la fase inicial, estableciendo una reevaluación estratégica tras el primer mes de producción.

##### ***![][image39]Figura 37: Captura de la encuesta generada por el agente en plan mode para resolver la incertidumbre: Sexta pregunta*** {#figura-37:-captura-de-la-encuesta-generada-por-el-agente-en-plan-mode-para-resolver-la-incertidumbre:-sexta-pregunta}

### 

### 

### **Respuesta generada tras segunda iteración:**

## **DOCUMENTO DE ESPECIFICACIÓN TÉCNICA (REVISIÓN 2\)**

### **BLOQUE 1: REQUISITOS NO FUNCIONALES Y DECISIONES ARQUITECTÓNICAS**

#### **Arquitectura Confirmada**

#### **Stack Tecnológico Detallado**

Frontend (Vercel Static SPA)

* Runtime: Node.js \+ Bun (bundle \+ package manager)  
* Framework: React 19 \+ TypeScript  
* Estado: React Query \+ Zustand  
* WebSocket: Socket.IO-client  
* UI: TailwindCSS \+ HeadlessUI  
* Build: Vite

Backend (Render Docker)

* Runtime: Python 3.11 \+ Uvicorn  
* Framework: FastAPI  
* ASGI: Uvicorn con workers \= 4  
* WebSocket: FastAPI WebSocketRoute  
* ORM: SQLAlchemy 2.0 (async)  
* Vector Search: pgvector \+ psycopg3

Base de Datos (Supabase)

* OLTP: PostgreSQL 15  
* Vector Store: pgvector (1000D embeddings para text-embedding-3-large)  
* Auth: Supabase Auth (JWT)  
* Blob Storage: Supabase Storage (S3-compatible)  
* RLS: Row-Level Security (aislamiento por user\_id)

IA & Voz

* LLM: OpenAI GPT-4o (multimodal: texto \+ imagen)  
* Embeddings: OpenAI text-embedding-3-large (1536D)  
* TTS: ElevenLabs API (v2, latencia \<1s)  
* STT: ElevenLabs API (latencia \<1.5s con streaming)  
* Fallback: Whisper OSS local (si ElevenLabs falla)

#### **Requisitos No Funcionales Implícitos**

| Requisito | Valor | Justificación |
| :---- | :---- | :---- |
| Latencia voz STT+LLM+TTS | \<2s (p95) | Cliente en coche, no puede esperar |
| Latencia imagen análisis | \<3s | Aceptable para casos puntuales |
| Throughput concurrent | 50 usuarios simultáneos | Capacidad inicial |
| Availability | 99.5% | Comerciales en campo requieren acceso |
| RTO (Recovery Time) | \<30 min | Redeploy de backend en Render |
| Aislamiento datos | Por user\_id (RLS) | GDPR \+ confianza cliente |
| Encriptación tránsito | TLS 1.3 (WSS) | Estándar obligatorio |
| Costo mensual objetivo | \<$800 (mes 1\) | Sin presupuesto fijo, re-eval mes 2 |

---

#### **Decisiones Clave y Trade-offs**

¿Por qué Render \+ WebSocket y no Vercel Serverless?

* Vercel Functions tienen max 60s timeout  
* Voz requiere conexiones persistentes (streaming audio)  
* WebSocket no se puede usar en Vercel (stateless)  
* Render permite workers de larga duración

¿Por qué pgvector en Supabase y no Pinecone externo?

* Menos servicios externos \= menor complejidad operativa  
* pgvector \+ PostgreSQL juntos \= transaccionalidad  
* Costo: $5-40/mes vs $25-250/mes Pinecone  
* Trade-off: búsqueda ligeramente menos rápida, pero suficiente para 50 usuarios

¿Por qué ElevenLabs y no Azure Cognitive Services?

* ElevenLabs: latencia \<1s, streaming bidireccional, calidad de voz superior  
* Azure: latencia 1-2s, más estable, pero más costoso  
* Riesgo mitigado: Whisper OSS como fallback local

¿Por qué OpenAI GPT-4o y no Claude 3.5 Sonnet?

* GPT-4o Vision: mejor reconocimiento de piezas industriales (entrenado con datos técnicos)  
* Costo comparable  
* Mejor integración con ecosystem OpenAI (embeddings \+ vision)

### **BLOQUE 2: RIESGOS TÉCNICOS Y CONTRADICCIONES**

#### Riesgo 1: Latencia End-to-End en Voz \<2s

Criticidad: CRÍTICA  
Descripción:

* STT ElevenLabs: 300-800ms (con streaming audio chunks)  
* LLM OpenAI: 800-1200ms (dependiendo de context window)  
* TTS ElevenLabs: 300-600ms  
* Ruta crítica: 1400-2600ms (sin paralelización \= FALLA)

Impacto: Cliente abandona si latencia \>2.5s (experiencia rota)  
Mitigación:

1. Paralelizar: initiar TTS apenas LLM envíe primer chunk (streaming response)  
2. Cache de respuestas frecuentes: pre-generar audio para preguntas típicas  
3. Latency budgeting:  
   * STT: 600ms (streaming chunks de 500ms)  
   * LLM: 900ms (priorizar fast models, usar cache de embeddings)  
   * TTS: 400ms (streaming audio chunks)  
   * Network: 100ms (Render ubicado US-East-1 o similar)  
4. Monitoreo en tiempo real: dashboard de p50/p95/p99 por comercial  
5. Fallback: si latencia \>3s, mostrar respuesta en texto y reproducir audio async

Responsable: Backend \+ DevOps (tuning Render \+ OpenAI rate limits)

#### Riesgo 2: Costo de APIs (OpenAI \+ ElevenLabs)

Criticidad: ALTA  
Descripción:

* OpenAI GPT-4o: $0.015/1K input tokens \+ $0.06/1K output tokens  
* OpenAI embeddings: $0.02/1M tokens  
* ElevenLabs STT: $0.30/min de audio  
* ElevenLabs TTS: $0.30/1M caracteres (metered)

Proyección (50 usuarios, 10 consultas/día c/u, 30 días):

* LLM: 15K prompts × 500 input tokens × 200 output tokens \= \*\*$45/mes\*\*  
* Embeddings: (100 docs × 2000 tokens cada uno) × $0.02/1M \= \<$1/mes  
* STT: 50 × 10 × 2 min audio/día × 30 × $0.30 \= $90/mes  
* TTS: 50 × 10 × 150 chars/respuesta × 30 × $0.30/1M \= $2.25/mes  
* TOTAL: \~$140-200/mes (+ infraestructura Render/Supabase \~$50/mes \= $190-250/mes)

Riesgo: Si se agregan 10 comerciales más o duplican uso, costo crece exponencialmente.  
Mitigación:

1. Rate limiting: máx 100 consultas/usuario/día (hardlimit)  
2. Caché de respuestas: si pregunta idéntica en últimas 24h, reutilizar sin API call  
3. Batch processing para embeddings (generar offline en job nocturno)  
4. Presupuesto alert: si gasto del mes \>$250, enviar email de alerta al PO  
5. Opción B para producción: switchear a Llama 2 7B local en GPU si costo excede $400/mes

Responsable: PO \+ DevOps (monitoreo de costos en dashboard de APIs)

#### Riesgo 3: Rendimiento de pgvector a 50 Usuarios

Criticidad: MEDIA-ALTA  
Descripción:

* pgvector búsqueda de similitud es O(n) sin índices HNSW/IVFFlat  
* Con 1000+ documentos indexados, búsqueda linear puede tardar \>500ms  
* A 50 usuarios concurrentes, contención en PostgreSQL

Impacto: Latencia de RAG sube, impacta latencia total voz  
Mitigación:

1. Índice HNSW en pgvector: CREATE INDEX ON embeddings USING hnsw (embedding vector\_cosine\_ops)  
2. Limit early: buscar solo top 5 documentos más similares (no todos)  
3. Connection pooling: PgBouncer en Render \+ Supabase connection limits (15 concurrent)  
4. Caching de búsquedas: Redis cache para top 100 queries populares  
5. Monitoreo: slow query log si búsqueda \>300ms  
6. Plan B: Si congestión, migrar a Pinecone (costo \+$30/mes pero escalado garantizado)

Testing: Stress test con 50 concurrent users, 10 queries/s, medir p95 latencia

#### Riesgo 4: Integración con Servidor Legacy de Documentos

Criticidad: MEDIA  
Descripción:

* Formato desconocido (PDF, DOC, TXT, CSV, DB?)  
* Acceso desconocido (FTP, SMB, API, local filesystem?)  
* Volumen desconocido (10GB, 100GB, 500GB?)  
* Documentos sin versionado (¿cómo saber si cambió?)

Impacto: Bloqueador de Fase 5; ETL puede tomar semanas  
Mitigación:

1. Sprint 0 de Auditoría (3 días):  
   * Mapear servidor legacy: IP, protocolo, autenticación  
   * Muestrear 10% de archivos: analizar formato, encoding, tamaño  
   * Cuantificar volumen total y distribución (% PDF vs DOC vs otros)  
   * Crear playbook de acceso para equipo  
2. Pipeline ETL flexible:  
   * PDF handler: PyPDF2 \+ pdfplumber (extraer texto \+ tablas)  
   * DOC handler: python-docx \+ textract  
   * CSV handler: pandas (detectar encoding, delimiter)  
   * Fallback OCR: Tesseract para PDFs con imágenes  
3. Versionado incremental:  
   * Hash de archivo (MD5) como identificador  
   * Tabla document\_versions en Supabase: file\_hash, created\_at, embedding\_id  
   * Job diario detecta cambios por hash, re-indexa solo modificados  
4. Validación manual:  
   * Mostrar sample de 5 documentos extraídos al admin: "¿Contenido correcto?"  
   * No activar en RAG hasta confirmación manual  
5. Plan B: Si legacy server inaccesible, solicitar copia (SCP/rsync) de archivos

#### Riesgo 5: Privacidad y Aislamiento en Supabase

Criticidad: CRÍTICA  
Descripción:

* RLS policies mal configuradas \= Paco ve datos de Lucía  
* Backend sin validación \= user\_id spoofing en JWT  
* Logs y audits sin encriptación \= exposición accidental

Impacto: Violación GDPR, pérdida de confianza cliente, multas  
Mitigación:

1. RLS obligatorio en todas las tablas:  
2. JWT validation en backend:  
   * Cada request valida user\_id en JWT contra endpoint /auth/user  
   * No confiar en header X-User-ID del cliente  
3. Audit logging:  
   * Tabla audit\_logs: user\_id, action, timestamp, ip\_address  
   * Logs encriptados en Supabase Storage (no acceso directo)  
4. Testing de seguridad:  
   * Penetration test pre-producción: intentar acceder datos de otro usuario  
   * Script de verificación: cada RLS policy testeable automáticamente  
5. Política de datos:  
   * Documentar qué datos se guardan (conversaciones, embeddings, audio files)  
   * Implementar GDPR right-to-deletion: borrar todos datos de usuario en \<30 días

#### Riesgo 6: Alucinaciones de GPT-4o Vision en Análisis de Piezas

Criticidad: MEDIA  
Descripción:

* GPT-4o Vision tiene \~85-90% accuracy en clasificación de objetos generales  
* Piezas industriales especializadas \= menor accuracy  
* Cliente confía en identificación → compra pieza equivocada → error costoso

Impacto: Pérdida de cliente, conflicto legal  
Mitigación:

1. Prompt engineering:  
2. Validación post-respuesta:  
   * Buscar pieza en catálogo (pgvector similarity)  
   * Solo si similarity \>0.85 AND GPT confidence \>90%, retornar precio  
   * Sino: "Pieza identificada (90% confianza) pero NO en catálogo. Confirma con técnico"  
3. UX de confirmación:  
   * Mostrar imagen analizada \+ propuesta de pieza  
   * Botones: "✓ Correcto / ✗ Incorrecto"  
   * Capturar feedback para fine-tuning futuro  
4. Fine-tuning roadmap:  
   * Recopilar 100+ ejemplos de piezas industriales  
   * Entrenar modelo custom en OpenAI fine-tuning  
   * Desplegar en Fase 4 si accuracy inicial \<85%

#### Riesgo 7: Escalabilidad de WebSocket en Render

Criticidad: MEDIA  
Descripción:

* Render workers \= 4 por defecto  
* WebSocket es stateful: cada usuario activo consume 1 conexión  
* 50 usuarios simultáneos \= 50 conexiones activas  
* Problema: si worker recibe \>12 conexiones, degrada rendimiento

Impacto: Algunos comerciales desconectados al azar durante pico de uso  
Mitigación:

1. Upscale Render:  
   * Cambiar a instancia con más workers (8-16)  
   * Costo: \+$50/mes  
2. Redis pub/sub para broadcast:  
   * Sincronizar sesiones múltiples workers  
   * Mensajes broadcast en tema de usuario\_id  
3. Heartbeat \+ reconnection:  
   * Cliente envía heartbeat cada 30s  
   * Auto-reconexión si socket cae (exponential backoff)  
4. Monitoreo:  
   * Alert si \# conexiones activas \>40  
   * Escalar antes de fallar

#### Riesgo 8: Costo de Supabase Storage para Documentos Legacy

Criticidad: BAJA-MEDIA  
Descripción:

* Supabase Storage: $5/mes \+ $0.05/GB (almacenamiento) \+ $0.10/GB (transfer)  
* Si 500GB de documentos legacy: $5 \+ $25 \+ $50 \= $80/mes solo almacenamiento  
* Transfer ilimitado si usuarios acceden desde backend interno

Impacto: Costo operativo escondido  
Mitigación:

1. Auditoría inicial: Cuantificar volumen real de documentos legacy  
2. Deduplicación: Si hay documentos duplicados, eliminar antes de migrar  
3. Compresión: PDFs \+ DOCX comprimidos con zstd antes de upload  
4. CDN: Vercel fronted como CDN para acceso frecuente a documentos  
5. Plan alternativo: Si \>100GB, mantener documentos en servidor legacy, acceso vía API desde backend (ETL sin migración)

### **Resumen de Decisiones Arquitectónicas**

| Componente | Selección | Alternativa Descartada | Razón |
| :---- | :---- | :---- | :---- |
| Frontend Deploy | Vercel SPA | Next.js SSR | Cliente requiere SPA static |
| Backend Deploy | Render Docker | Vercel Serverless | Necesita WebSocket persistente |
| DB Principal | Supabase PostgreSQL | MongoDB | Requiere transaccionalidad \+ RLS |
| Vector DB | pgvector | Pinecone | Menor costo, suficiente para 50 usuarios |
| LLM | OpenAI GPT-4o | Claude 3.5 | Visión (piezas) \+ embedding en ecosystem |
| STT/TTS | ElevenLabs | Azure Cognitive | Latencia \<1s, streaming mejor |
| Cache | Redis | Memcached | Expire policies, pub/sub para WebSocket |
| Auth | Supabase Auth | OAuth corporativo | Más rápido MVP, OAuth es future |

---

**FIN DEL BLOQUE 1 Y 2 (REVISIÓN 2\)**  
El plan actualizado está guardado. ¿Deseas que proceda a refinar el Bloque 3 (Historias de Usuario) con detalles técnicos específicos de Supabase RLS, WebSocket, y ElevenLabs, o hay otras áreas que necesites clarificar?

Después de esta segunda iteración y revisando la respuesta generada por la IA , el perfil 3 determinó que con la respuesta anterior y esta segunda respuesta tiene suficiente información para dar por finalizada la fase de análisis. 

**Mensaje final:**

*“No hace falta revisar las historias de usuarios, están bastante completas ahora me gustaría que redactaras todo esto en .md para la documentación del proyecto. Una vez redactada la documentación te avisare cuando proceder a la implementación.”*

![][image40]

##### ***Figura 38: Mensaje final del perfil 3 para dar por finalizada la fase 1*** {#figura-38:-mensaje-final-del-perfil-3-para-dar-por-finalizada-la-fase-1}

#### **Análisis de la Salida Generada**

La salida generada en el Perfil 3 representa un salto cualitativo significativo respecto a los perfiles anteriores, tanto en profundidad analítica como en utilidad práctica dentro del ciclo de vida del desarrollo de *software*. A diferencia de los casos previos, el modelo no actúa como un resumidor ni como un organizador de información, sino como un agente de ingeniería parcialmente determinista, capaz de producir un artefacto técnico estructurado, trazable y orientado a ejecución.

El primer aspecto diferencial es la formalización del *output* como documento de especificación. La estructura en bloques (requisitos no funcionales, decisiones arquitectónicas, riesgos e historias de usuario en BDD) introduce una separación clara de responsabilidades conceptuales, alineada con prácticas reales de ingeniería. Esto permite que el resultado no solo sea legible, sino directamente utilizable como base para desarrollo, testing y despliegue.

En contraste con los perfiles anteriores, aquí se observa una correcta identificación de requisitos no funcionales implícitos, especialmente en dimensiones críticas como latencia, disponibilidad, concurrencia y seguridad. El modelo no se limita a repetir lo que el cliente expresa, sino que infiere restricciones técnicas derivadas del contexto de uso (por ejemplo, el uso en conducción o la necesidad de respuestas en tiempo real). Esta capacidad de inferencia marca la transición desde un procesamiento superficial a un análisis más cercano al diseño de sistemas.

Otro avance clave es la explicitación de decisiones arquitectónicas junto con sus *trade-offs*. El modelo no solo propone tecnologías, sino que justifica su elección frente a alternativas descartadas (por ejemplo, *Render* vs *Vercel*, *pgvector* vs *Pinecone*, *WebSockets* vs *Serverless*). Este tipo de razonamiento es característico de perfiles senior en ingeniería, ya que introduce criterios de decisión basados en latencia, coste, complejidad operativa y escalabilidad.

Asimismo, destaca la inclusión de un bloque completo de gestión de riesgos técnicos, donde cada riesgo es categorizado por criticidad, impacto y estrategia de mitigación. A diferencia de los perfiles anteriores —donde los riesgos eran inexistentes o implícitos— aquí se construye un sistema anticipatorio que permite:

* Detectar puntos de fallo antes de la implementación  
* Definir estrategias de fallback  
* Establecer métricas de monitorización  
* Reducir incertidumbre en fases avanzadas

Este enfoque transforma el documento en un artefacto no sólo descriptivo, sino preventivo y estratégico.

Sin embargo, el elemento más relevante desde una perspectiva metodológica es la correcta implementación de Historias de Usuario en formato BDD con criterios de aceptación verificables. Cada historia incluye:

* Contexto (rol)  
* Intención (acción)  
* Valor de negocio (beneficio)  
* Escenarios concretos con condiciones medibles

Esto permite una integración directa con metodologías como TDD, ya que los criterios de aceptación pueden traducirse de forma casi inmediata en tests automatizados. A diferencia de los perfiles anteriores, aquí sí existe una trazabilidad clara entre requisito, implementación y validación.

Otro punto crítico es la naturaleza iterativa y controlada del proceso. La interacción no finaliza con una primera respuesta, sino que evoluciona mediante restricciones adicionales (steering prompt), que el modelo incorpora de forma coherente. Esto demuestra que el sistema no solo genera contenido, sino que es capaz de:

* Reconfigurar decisiones arquitectónicas bajo nuevas condiciones  
* Detectar inconsistencias  
* Solicitar validación en puntos críticos de diseño

Este comportamiento refleja un patrón avanzado de colaboración humano-IA, donde el modelo actúa como coprocesador de decisiones y no como generador autónomo.

No obstante, aunque el resultado es notablemente superior, no está completamente exento de limitaciones. Se observa cierta tendencia a la sobreingeniería, especialmente en la fase inicial (primera iteración), donde se proponen múltiples alternativas que pueden introducir complejidad innecesaria si no se acotan adecuadamente. Esta dispersión se corrige parcialmente tras la intervención del ingeniero, lo que refuerza la idea de que la calidad final sigue dependiendo del control humano.

En conjunto, la salida del Perfil 3 se aproxima a un estándar profesional real, donde la IA no sustituye al ingeniero, pero amplifica su capacidad de análisis, estructuración y toma de decisiones.

#### **Conclusión del Perfil 3**

El tercer perfil demuestra que la Inteligencia Artificial, cuando se utiliza bajo un marco metodológico riguroso como Specific-Driven Development (SDD), puede trascender su papel tradicional como herramienta generativa y convertirse en un componente activo dentro del proceso de ingeniería de software.

A diferencia de los perfiles anteriores, donde la IA producía resultados descriptivos o parcialmente estructurados, en este caso se obtiene un artefacto técnico que cumple con características clave de un documento profesional:

* Es estructurado y modular  
* Es trazable y verificable  
* Está alineado con decisiones arquitectónicas reales  
* Integra gestión de riesgos  
* Permite implementación directa bajo TDD

Esto confirma que el valor de la IA no reside en su capacidad de generar contenido, sino en su capacidad de ser dirigida mediante restricciones, roles y estructuras formales.

Además, este perfil evidencia un cambio de paradigma en el rol del ingeniero de software. El desarrollador deja de ser únicamente un implementador para convertirse en un orquestador de sistemas inteligentes, responsable de:

* Definir el marco de interacción  
* Establecer criterios de calidad  
* Validar decisiones críticas  
* Reducir la entropía generativa del modelo

La IA, en este contexto, actúa como un acelerador cognitivo, pero no como una fuente autónoma de verdad.

Desde una perspectiva práctica, este enfoque permite:

* Reducir drásticamente la ambigüedad en fases tempranas  
* Alinear negocio y tecnología desde el inicio  
* Minimizar retrabajo en fases de implementación  
* Facilitar la automatización de pruebas y despliegue

No obstante, el experimento también confirma que alcanzar este nivel de calidad requiere un alto grado de especialización por parte del usuario. Sin conocimiento en arquitectura, metodologías ágiles y diseño de sistemas, resulta inviable formular prompts con el nivel de precisión necesario para obtener este tipo de resultados.

En consecuencia, el Perfil 3 no solo representa una mejora incremental, sino un cambio cualitativo: la IA deja de ser una herramienta pasiva y se integra como un sistema co-diseñador dentro del SDLC, siempre bajo supervisión experta.

### **Matriz de Evaluación Comparativa de Perfiles**

Para cuantificar de forma objetiva las diferencias cualitativas observadas en el análisis empírico, se presenta a continuación la matriz de evaluación de los tres perfiles de interacción. Los criterios seleccionados responden directamente a los principios de la ingeniería de software moderna y a las capacidades exigidas a un artefacto de especificación en un entorno profesional real.

|  Criterio de Evaluación | Perfil 1: Usuario Básico (*Zero-shot* / *Vibecoding*) | Perfil 2: Usuario Intermedio (*Plan Agent* / Iterativo) | Perfil 3: Ingeniero de Software (*SDD* / *TDD* Asistido) |
| :---- | :---- | :---- | :---- |
| Granularidad y Descomposición | Baja. El output se presenta como un monolito narrativo o una lista simple de capacidades. No existe descomposición atómica de tareas ni separación de dominios de responsabilidad. | Media. Introduce una primera capa de abstracción al separar componentes por dominios (*Frontend* / *Backend*). Sin embargo, no alcanza el nivel de tareas atómicas ejecutables ni descompone las historias en escenarios operativos. | Alta. Estructura el output en bloques técnicos diferenciados (*RNF*, Riesgos, HUs). Las Historias de Usuario se descomponen en escenarios *BDD* atómicos, facilitando la asignación granular de trabajo y la trazabilidad. |
| Rigor de los Criterios de Aceptación | Nulo. No genera condiciones de éxito medibles ni verificables. Los requisitos se formulan como deseos sin mecanismo de validación. | Bajo. Formula intenciones declarativas (ej. "latencia \< 3 segundos") pero carece de sintaxis estructurada, contexto técnico de medición y condiciones de pre-/post-estado. No son automatizables. | Alto. Aplica sintaxis formal *BDD* estricta (Dado que... Cuando... Entonces...) en todos los escenarios. Los criterios son medibles, testeables y directamente implementables mediante pruebas automatizadas (TDD). |
| Cobertura de Edge Cases | Nula. No detecta ni menciona posibles fallos lógicos, estados de error ni contradicciones técnicas latentes en los requisitos del cliente. | Baja. Reconoce vacíos de información mediante "Preguntas Clave", pero no *prop edge* cases técnicos ni estrategias de mitigación ante fallos de infraestructura o lógica de negocio. | Alta. Identifica explícitamente 8 riesgos técnicos y arquitectónicos (latencia, costo APIs, rendimiento de *pgvector*, integración legacy, privacidad, alucinaciones, escalabilidad WebSocket, storage) con planes de mitigación documentados. |
| Alineación Arquitectónica | Nula. No traduce los deseos del cliente en decisiones tecnológicas concretas ni identifica las restricciones de infraestructura implícitas. | Media-Alta. Propone tecnologías específicas (Pinecone, AWS S3, Azure) pero con sesgo tecnológico prematuro: las decisiones no están justificadas por requisitos explícitos y pueden introducir deuda técnica por sobre-ingeniería. | Alta. Traduce cada deseo del cliente en decisiones arquitectónicas concretas y justificadas (Vercel SPA, Render Docker, Supabase \+ pgvector, WebSockets, ElevenLabs). Documenta explícitamente trade-offs y alternativas descartadas con razón técnica.  |

##### ***Tabla 11: Matriz de Evaluación Comparativa de Perfiles*** {#tabla-11:-matriz-de-evaluación-comparativa-de-perfiles}

## 

### **Análisis Cruzado por Criterio**

* **Granularidad y Descomposición:** El salto cualitativo entre el Perfil 2 y el Perfil 3 es el más significativo en este eje. Mientras que el Perfil 2 organiza información, el Perfil 3 la descompone hasta el nivel de instrucción ejecutable. La diferencia radica en que el Perfil 3 no se limita a clasificar, sino que aplica principios de diseño de software para fragmentar la complejidad en unidades manejables.  
* **Rigor de los Criterios de Aceptación:** Este criterio evidencia la frontera entre un "asistente de descubrimiento" y un "agente de ingeniería". Solo el Perfil 3 genera artefactos que pueden ser consumidos por un pipeline de CI/CD sin reinterpretación humana. La ausencia de rigor en los perfiles inferiores condena a los equipos a retrabajo manual durante la fase de testing.  
* **Cobertura de Edge Cases:** La capacidad de anticipar fallos es el principal diferenciador de madurez ingenieril. El Perfil 3 demuestra que la IA puede actuar como un analista de riesgos cuando se le inyecta un contexto de sistema que le obliga a operar bajo el paradigma de "Cero Asunciones". Los perfiles anteriores, al carecer de esta restricción, asumen un escenario feliz por defecto.  
* **Alineación Arquitectónica:** El Perfil 2 cae en la trampa del sesgo tecnológico prematuro: al no tener un marco de restricciones, el modelo completa lagunas con heurísticas plausibles pero no validadas. El Perfil 3, mediante la imposición de restricciones de infraestructura (ej. "Supabase como BaaS") y la exigencia de justificar trade-offs, fuerza una alineación realista entre el problema de negocio y la solución técnica.

### **Conclusiones Finales de la Fase 1**

El caso de estudio desarrollado en esta fase ha demostrado que la utilidad de la Inteligencia Artificial no está determinada por el  modelo empleado únicamente , sino que hay otros factores, principalmente la orquestación metodológica del prompt y el rol asumido por el ingeniero. El caso del perfil 1 es totalmente descartado debido a la falta de calidad y profesionalismo que se pediría en un entorno laboral, generando una respuesta que en teoría parece correcta pero no tiene ningún tipo de valor real que aportar al desarrollo del proyecto. Con el perfil 2 y perfil 3 el operando sobre el mismo modelo de lenguaje y el mismo contexto de la descripción del producto, han producido resultados totalmente distintos en cuanto a calidad, trazabilidad y ejecutabilidad. Esta diferencia está totalmente por la metodología empleada por cada uno de ellos. A pesar de que los dos perfiles aportan en mayor o menor medida valor al proyecto, en el caso del perfil 2 es mucho menor y con varios fallos que el perfil 3 no tiene.  Esto deja entrever que es necesario una planificación previa y un análisis previo al uso de agentes utilizando metodologías emergentes mencionadas previamente.

### **Cierre de la Fase y Transición**

La Fase 1 ha establecido las bases que justifican la adopción del *Specific-Driven Development* (SDD) como marco de trabajo para las siguientes fases. El documento de especificación técnica generado en el Perfil 3 —con sus bloques de requisitos no funcionales, matriz de riesgos y historias de usuario en formato BDD— servirá como el artefacto maestro que guiará el desarrollo funcional integral del agente IA en las fases posteriores: prototipado visual (UI/UX), implementación asistida, verificación y validación y despliegue automatizado.  
La demostración práctica confirma que la transformación del *Vibecoding* impulsivo al *Prompt Engineering* disciplinado no es un cambio de herramienta, sino un cambio de paradigma: de la delegación irresponsable a la orquestación metodológica

## **Fase 2:** {#fase-2:}

Antes de iniciar la fase de implementación de código, el paradigma de desarrollo moderno exige la configuración del entorno de trabajo (*Workspace*). En un flujo de *Specific-Driven Development* (SDD), esta fase no se limita a la instalación de dependencias tradicionales, sino a la orquestación de la Inteligencia Artificial: definir agentes con  sus capacidades de ejecución y sus límites de conocimiento, instalacion de *skills* y una planificación de los recursos extras que nutrirán el desarrollo.

### **Establecimiento del Contexto Global (instructions.md)**

El primer paso metodológico consistió en la creación de un archivo de contexto permanente (*instructions.md*) alojado en la raíz del repositorio. A diferencia de un *prompt* conversacional, este documento actúa como la "constitución técnica" del proyecto.

Su función es inyectar de forma constante al modelo (específicamente a *GitHub Copilot*) las decisiones arquitectónicas previamente acordadas en la Fase 1\. El documento define:

* El *stack* tecnológico estricto a utilizar (React 19, FastAPI, Supabase, Vercel, Render).  
* Patrones de diseño obligatorios (arquitectura de componentes, convenciones de nombrado, manejo de estado con Zustand).  
* Protocolos de seguridad, imponiendo que cualquier interacción con la base de datos deba contemplar el *Row Level Security* (RLS) configurado en Supabase.

**Archivo INSTRUCTIONS.MD :**

**![][image41]**

##### ***Figura 39: Archivo instructions.md*** {#figura-39:-archivo-instructions.md}

##### 

##### 

##### 

##### 

##### 

##### 

### **Integración de Herramientas de Especialización (Skills)**

Para evitar la degradación técnica y garantizar que la IA ejecute tareas bajo estándares de la industria, se implementó un repositorio local de *skills* (capacidades modulares y estructuradas). Todas ellas obtenidas del proyecto *skills.sh .* Alojadas en el directorio *.agents/skills*, se integraron herramientas específicas para potenciar a los agentes durante el desarrollo:

![][image42]

##### ***Figura 40: Imagen del repositorio skills.sh*** {#figura-40:-imagen-del-repositorio-skills.sh}

* **supabase-postgres-best-practices:** Garantiza que el código SQL generado para RLS o esquemas relacionales cumpla con los estándares de rendimiento y seguridad de Supabase.  
* **vercel-react-best-practices:** Obliga a los agentes de *frontend* a estructurar el código React 19 optimizado para un despliegue como SPA estática.  
* **frontend-design & ui-animation:** *Skills* encargadas de guiar la consistencia visual y la implementación de animaciones fluidas utilizando TailwindCSS y HeadlessUI.

Esta arquitectura de *skills* previene el uso de código genérico u obsoleto, asegurando que el modelo ejecute sus acciones con el mayor rigor técnico disponible.

![][image43]

##### ***Figura 41: Carpeta skills de .agents con las skills instaladas para la codificacion del proyecto*** {#figura-41:-carpeta-skills-de-.agents-con-las-skills-instaladas-para-la-codificacion-del-proyecto}

### 

### **Creación de Agentes Personalizados de Dominio (.agent)**

Uno de los mayores riesgos en el desarrollo asistido por IA es la alucinación de sintaxis (*Syntax Hallucination*), especialmente al utilizar APIs que actualizan su documentación frecuentemente. Para mitigar este riesgo, se procedió a la creación de un Agente Autónomo Especializado en el entorno de desarrollo.

Bajo el directorio .github/agents, se configuró el AgenteOpenAI-API.agent.md. Este agente fue dotado de una base de conocimiento estática local (almacenada en la carpeta /OpenAI API/), compuesta por documentación estructurada en Markdown directamente extraída de las fuentes oficiales recientes. Los documentos proporcionados al agente incluyen, entre otros:

![][image44]

##### ***Figura 42: Agente especializado en la documentación de OpenAI-API con sus archivos de referencias*** {#figura-42:-agente-especializado-en-la-documentación-de-openai-api-con-sus-archivos-de-referencias}

* structured output.md (Para forzar respuestas en formatos JSON específicos).  
* streaming.md (Esencial para la implementación de *WebSockets* de baja latencia requerida en el sistema de voz).  
* analizar imagenes y archivos.md (Para la correcta invocación de modelos multimodales como GPT-4o Vision).

De esta manera, cuando durante la fase de codificación se requiera integrar los servicios core de OpenAI o la gestión de audio, el desarrollador no invocará a un modelo genérico, sino a este agente especialista. El agente leerá la documentación inyectada en su contexto y generará el código exacto, asegurando una integración determinista y sin errores de versionado.

De manera análoga, bajo el mismo directorio .github/agents, se configuró el AgenteElevenLabs-API.agent.md. Este agente constituye el especialista técnico en el stack de voz del sistema, cuya documentación también se mantiene de forma estática y local en la carpeta /ElevenLabs API/. El conjunto de documentos inyectados en su contexto abarca los siguientes dominios críticos:

![][image45]

##### ***Figura 43: Agente especializado en la documentación de ElevenLabs-Api***  {#figura-43:-agente-especializado-en-la-documentación-de-elevenlabs-api}

* tts.md (Text-to-Speech): Guía para la generación de audio a partir de texto, fundamental para la síntesis de voz del asistente.  
* stt.md (Speech-to-Text): Protocolos de transcripción de audio a texto, necesarios para la captura y comprensión de la entrada del usuario por voz.  
* agente-conversacional.md: Configuración del agente de voz de ElevenLabs, webhooks, eventos y flujo de conversación, pieza clave para la gestión del diálogo en tiempo real.  
* voces.md: Catálogo de voces disponibles y ajustes de VoiceSettings, esencial para la personalización acústica del chatbot.  
* configuracion.md y despliegue.md: Inicialización del cliente, variables de entorno, despliegue en Render/Vercel y resolución de incidencias.

Gracias a este esquema, cuando el desarrollador deba implementar o depurar cualquier funcionalidad relacionada con el procesamiento de audio —ya sea síntesis, reconocimiento o la orquestación del agente conversacional de voz—, invocará al agente especialista de ElevenLabs en lugar de un modelo genérico. Al disponer de la documentación oficial inyectada directamente en su contexto, el agente generará los snippets de código, las configuraciones de API y las secuencias de eventos exactas vigentes, garantizando así una integración determinista, libre de alucinaciones de sintaxis y a salvo de inconsistencias derivadas de cambios de versionado.

![][image46]

##### ***Figura 44: Ambos agentes personalizados en el directorio de agents***  {#figura-44:-ambos-agentes-personalizados-en-el-directorio-de-agents}

### **Estrategia de Planificación Jerárquica y Taxonomía de Modelos**

Con el ecosistema preparado, la implementación se abordó mediante una planificación jerárquica, diseñada para evitar el antipatrón del *Vibecoding* (desarrollo no estructurado basado puramente en intención). Para ejecutar esta fase con el máximo rigor, se estableció una separación estricta de responsabilidades delegada a diferentes modelos de IA, optimizando la carga cognitiva:

1. **Razonamiento y Planificación (GPT-5.2 Reasoning High):** Utilizando el modo de planificación (*Plan Mode*), se empleó este modelo de alto razonamiento para traducir el TECHNICAL-SPECIFICATION.md en un Plan General del proyecto y planes de implementación para funcionalidades específicas, definiendo *checkpoints* verificables. Por cada funcionalidad atómica, este modelo generó un sub-plan detallado antes de autorizar cualquier escritura de código.  
2. **Ejecución y Codificación (Codex 5.3):** Una vez validados los planes y generadas las pruebas unitarias (TDD Asistido), se conmutó al modo de edición (*Edit / Agent Mode*) utilizando Codex 5.3. Gracias a su excepcional baja latencia y optimización algorítmica, este modelo se encargó de la escritura física del código fuente, apoyándose dinámicamente en las *skills* instaladas.

Esta orquestación garantiza que la alta velocidad de generación de código no comprometa la mantenibilidad ni la coherencia arquitectónica del sistema global, asegurando que cada línea escrita responde a una especificación técnica validada previamente.

##### *![][image47]**Figura 45: Plan de implementación del chatbot con Supabase***

#### **![][image48]**

##### ***Figura 46: Plan de implementación de conversación por Voz con IA*** {#figura-46:-plan-de-implementación-de-conversación-por-voz-con-ia}

***![][image49]*** 

##### ***Figura 47: Captura de varios archivos de planificación creados por los agentes.*** {#figura-47:-captura-de-varios-archivos-de-planificación-creados-por-los-agentes.}

### **Prototipado *Frontend* de Alta Velocidad (GenUI)**

Para hacer el prototipo del frontend había gran cantidad de opciones a elegir : Loovable, Figma , Stitch , pencil dev... Para este proyecto he elegido la opción de Google Stitch.


Para este caso de estudio era necesario que la plataforma elegida no solo generará una representación visual rápida de la interfaz, sino que existiera una transición desde el requerimiento funcional (definido por la plantilla de *prompting* que se explicará más abajo ) hasta un código frontend directamente utilizable. En este contexto, Stitch es mejor opción que otras alternativas porque combina generación multimodal, capacidad de interpretar *prompts* extensos y específicos, y salida orientada a componentes reutilizables en React y Tailwind CSS, alineándose con el stack técnico del proyecto. Además, otra gran ventaja frente a sus competidores es su modelo de accesibilidad actual; a diferencia de otras plataformas, Stitch se encuentra en una fase donde no impone planes de suscripción restrictivos ni barreras de pago por uso, ofreciendo acceso gratuito y sin limitaciones de cuota.

Por otro lado, descarté el uso de Figma. Si bien esta herramienta es el estándar de la industria para el diseño colaborativo, la iteración visual y la creación de sistemas de diseño, su flujo de trabajo permanece  anclado en la fase conceptual de UI/UX, requiriendo una posterior traducción manual o semi-automatizada hacia el código. Stitch, por el contrario, minimiza la fricción estructural entre el diseño y el desarrollo, materializando una aproximación mucho más fiel al paradigma design-to-code.

En comparación con Lovable y Pencil Dev; Lovable presenta un modelo de negocio  restrictivo en su capa gratuita, con un sistema de créditos que penaliza el desarrollo iterativo; incluso *prompts* de baja complejidad conllevan un alto consumo de cuota, haciendo inviable su uso a lo largo del tiempo sin necesidad de gastar dinero en licencias corporativas que tienen un coste bastante elevado. 

Por su parte, Pencil Dev (desarrollado por Anthropic) presenta una propuesta muy interesante al integrarse directamente en los Entornos de Desarrollo Integrados (IDE) para centralizar el flujo de trabajo —a diferencia del resto de alternativas basadas en entornos *web*—. Sin embargo, se encuentra todavía en una fase de desarrollo demasiado temprana, teniendo bastante inestabilidad.

Consolidado el entorno de desarrollo y la arquitectura del sistema, la siguiente fase aborda la construcción de la interfaz de usuario (UI). 

Uno de los riesgos respecto al diseño generativo es la "paradoja de la homogeneidad inteligente", donde los modelos tienden a producir interfaces genéricas si no se especifica y se es claro con el diseño que se quiere obtener. Para disminuir este sesgo y alinear la interfaz con el documento TECHNICAL-SPECIFICATION.md generado en la Fase 1, se ha diseñado una plantilla de *Prompt* estructurada.  
Esta plantilla actúa como un puente entre los requisitos de negocio y el modelo de visión/generación de la IA. Esta plantilla se divide en cinco dominios de control estricto:

1. **Product Context:** Define la naturaleza del producto, la industria y el usuario final, proporcionando al modelo la información necesaria para adaptar la ergonomía de la interfaz.  
2. **Visual Specifications (Look & Feel):** Impone el sistema de diseño. Establece paletas de colores (modos claro/oscuro), tipografías y geometría de los elementos (ej. bordes afilados, sombreados), evitando que la IA alucine estilos inconsistentes.  
3. **Technical Specifications:** Fuerza al generador a restringir la salida al *stack* del proyecto (*Bun \+ Vite \+ TailwindCSS \+ Supabase*), garantizando que los componentes sean directamente integrables en el repositorio local.  
4. **Screen Structure:** Delimita el alcance de la generación a vistas atómicas específicas (Login, Dashboard principal, Vista detallada del Chat), facilitando la extracción modular del código.  
5. **Detailed Flow Description:** Traslada las Historias de Usuario (BDD) a requerimientos de interacción (ej. indicadores visuales de prioridad, filtros de estado, o *feedback* de carga para la latencia de voz).

#### **Ejecución y Extracción de Componentes:**

Se insertó esta plantilla en Google Stitch, reemplazando los campos genéricos con las directrices exactas del Asistente IA Empresarial (Chatbot). La plataforma procesó la semántica y generó *mockups* funcionales de alta fidelidad.

La principal ventaja competitiva de esta fase fue la capacidad de extraer el código de componentes atómicos de forma aislada. El código fuente generado (estructuras Flexbox/Grid en React con clases utilitarias de Tailwind) se exportó directamente al entorno de Visual Studio Code. Este proceso redujo el tiempo de diseño y creación de la interfaz de usuario en gran medida, permitiendo centrarme en la conexión de la lógica de negocio y la inyección del estado global, validando la eficiencia operativa del flujo SDD.

**PROMPT PARA LA GENERACIÓN DE LA UI:**

**PRODUCT CONTEXT** 

**Project Name: Chatbot Inteligente Multimodal con Agente de Voz**

**Sector/Industry:** Inteligencia Artificial, Interfaces Conversacionales, Asistentes Virtuales.

**Product Description:** Aplicación full-stack que permite a los usuarios interactuar con un asistente de IA avanzado mediante texto, voz, imágenes y documentos. Incluye chat en tiempo real con streaming de respuestas, asistente de voz en tiempo real (Text-to-Speech y Speech-to-Text) integrado con ElevenLabs, análisis de imágenes con OpenAI Vision, procesamiento de archivos (PDF y TXT) con búsqueda semántica, y gestión persistente de historial de conversaciones con autenticación JWT.

**Target Audience:** Usuarios que buscan un asistente inteligente versátil, profesionales que necesitan analizar documentos o imágenes conversacionalmente, y cualquier persona interesada en interactuar con IA de forma multimodal (texto, voz y archivos).

**VISUAL SPECIFICATIONS (LOOK & FEEL)**   

**Design Style:** Minimalista, limpio y profesional, inspirado en sistemas de diseño modernos (shadcn/ui). Prioriza la legibilidad y la facilidad de uso en sesiones de chat prolongadas.

**Color Palette:** Two modes required: Dark Mode and Light Mode.

\- Primary: Gris muy oscuro (oklch(0.205 0 0)) en modo claro / Gris claro (oklch(0.922 0 0)) en modo oscuro.

\- Secondary/Accent: Gris neutro (oklch(0.97 0 0)) con posibles indicadores de estado en verde (conexión WS) y rojo terracota (oklch(0.577 0.245 27.325)) para errores/destructivo.

\- Background: Blanco puro (oklch(1 0 0)) en modo claro / Gris muy oscuro (oklch(0.145 0 0)) en modo oscuro.

\- Card/Popover: Blanco en claro / Gris oscuro (oklch(0.205 0 0)) en oscuro.

**Typography:** Moderna, tipografía del sistema por defecto (inter/sans-serif), optimizada para lectura en pantalla de mensajes largos.

**Element Shapes:** Bordes moderadamente redondeados (radius: 0.625rem), tarjetas con sombras sutiles, botones con transiciones suaves (hover:scale-105, active:scale-95). Input flotante tipo "pill" con backdrop-blur en móvil.

**Iconography Style:** Iconos de lucide-react, estilo lineal y ultra-minimalista, consistentes con el lenguaje visual de shadcn/ui.

**TECHNICAL SPECIFICATIONS** 

**Deployment Devices:** Web (responsive, mobile-first) y escritorio.

**Content Language:** Español (interfaz y comunicación del asistente).

Output Technology (Stack): Bun \+ React 19 \+ TypeScript \+ Tailwind CSS v4 \+ Radix UI \+ shadcn/ui \+ Zustand \+ Supabase Auth \+ WebSocket nativo.

**SCREEN STRUCTURE** 

**Requested Screens:**

\- Login – Inicio de sesión con email y password, diseño centrado con tarjeta sobre fondo animado.

\- Register – Registro de usuario con confirmación de contraseña y pantalla de éxito post-registro.

\- Chat Principal – Vista principal de tres zonas: sidebar de historial (izquierda), ventana de mensajes (centro) y panel lateral deslizable con herramientas (derecha).

\- Agente de Voz (AgentPage) – Pantalla fullscreen para el agente de voz en tiempo real de ElevenLabs ConvAI.

\- Historial de Conversaciones – Sidebar/drawer responsive para gestionar sesiones de chat (crear, renombrar, eliminar).

**Key Components:**  

\- HistorySidebar: Lista de conversaciones con operaciones CRUD. Responsive (overlay en móvil, fijo en desktop xl).

\- ChatWindow: Renderizado de burbujas de mensaje, soporte para imágenes incrustadas, archivos adjuntos y audio. Input con drag & drop, paste de imágenes y auto-scroll.

\- VoiceRecorder: Grabación de audio con MediaRecorder para transcripción STT.

\- AudioPlayer: Reproductor de audio para respuestas TTS.

\- FileUploader: Panel de subida múltiple con validación de tipos y análisis batch.

\- SemanticSearch: Búsqueda semántica en documentos indexados.

\- SystemPromptEditor: Modal para editar instrucciones del sistema por sesión.

\- ElevenLabsAgentWidget: Integración dinámica del SDK de ElevenLabs ConvAI.

\- Barra Superior de Acciones: Indicador de conexión WS, botones de archivo, documentos, TTS, agente de voz, system prompt, toggle de tema y logout. En móvil se agrupa en un DropdownMenu.

**DETAILED FLOW DESCRIPTION** 

**1\. User Management & Security (Authentication)** 

User Registration: El sistema permite a nuevos usuarios crear una cuenta mediante email y password a través de Supabase Auth. Tras el registro, se muestra una pantalla de éxito solicitando la verificación del correo electrónico.

Login: Los usuarios acceden con sus credenciales. El AuthContext gestiona la sesión vía Supabase (getSession \+ onAuthStateChange), y el apiClient inyecta automáticamente el header Authorization: Bearer \<JWT\> en todas las peticiones.

Data Isolation: Cada usuario solo visualiza y gestiona sus propias sesiones de conversación. El backend filtra estrictamente por user\_id en la base de datos, garantizando la privacidad total de los datos.

Cloud Persistence: Todo el historial de conversaciones, sesiones y documentos indexados se sincroniza con Supabase, asegurando continuidad entre dispositivos.

**2\. Chat & Multimodal Interaction (Core Flow)** 

**Create/ Send Message:** El usuario puede enviar mensajes de texto, o utilizar modalidades avanzadas:

\- Voz: El componente VoiceRecorder captura audio, lo envía al backend (/transcribe-audio) e inserta el texto transcrito en el input para su envío automático con flag enableVoice=true.

\- Imágenes: Soporte para arrastrar, pegar (paste) o seleccionar imágenes. Se previsualiza como "pending file" y se analiza vía /analyze-image.

\- Archivos (PDF/TXT): Subida mediante FileUploader o FileUploadButton, con análisis y generación de embeddings para búsqueda semántica posterior (/analyze-file).

Streaming de Respuestas: El backend envía tokens parciales vía WebSocket (type: "token") que se renderizan progresivamente en la burbuja del asistente. Al finalizar (type: "done"), se actualiza el estado definitivo del mensaje.

Reconexión Automática: Si el WebSocket cae, el sistema reintenta la conexión cada 3 segundos.

**3\. Session Management (CRUD)** 

Gestión de Sesiones: El chatStore (Zustand) gestiona el estado global de las sesiones. La sesión en BD se crea de forma optimizada (solo al enviar el primer mensaje).

Edit/ Rename Session: El usuario puede renombrar una sesión haciendo doble clic sobre ella en el HistorySidebar.

Delete Session: Posibilidad de eliminar permanentemente una sesión de conversación y todos sus mensajes asociados.

Switch Session: El sidebar permite cambiar entre conversaciones previas cargando su historial completo en el ChatWindow.

**4\. Interface & User Experience (UI/UX)** 

Responsive Design (Mobile-First): La aplicación se adapta fluidamente a móvil y escritorio. En móvil, el input de mensaje es flotante tipo "pill" con backdrop-blur; el sidebar de historial se convierte en un drawer/overlay; la barra de acciones se agrupa en un menú desplegable. En escritorio, el layout es de tres columnas con sidebar fijo y panel de herramientas deslizable.

Indicadores de Conexión: Badge visual en la barra superior que indica el estado del WebSocket (verde \= conectado, rojo \= desconectado).

Feedback Visual Inmediato: Las burbujas de mensaje del usuario se renderizan instantáneamente. Las respuestas del asistente aparecen con animación suave (fadeInUp, scaleIn). Los archivos en proceso muestran estados de carga (processing, pending).

Dark/Light Mode: Toggle global que cambia toda la paleta de colores mediante next-themes, adaptando fondos, texto, tarjetas y bordes entre modos claro y oscuro.

Animaciones: Sistema de animaciones CSS suaves (cubic-bezier(0.22, 1, 0.36, 1), \~220ms) para aparición de mensajes, paneles y componentes.

**5\. Advanced Tools & Voice Agent** 

Text-to-Speech (TTS): El backend puede generar audio de las respuestas del asistente. El frontend las reproduce mediante el componente AudioPlayer con controles nativos \<audio\>.

Speech-to-Text (STT): Captura de voz del usuario transcrita a texto para su envío al chat.

Agente de Voz en Tiempo Real (AgentPage): Pantalla dedicada que carga dinámicamente el SDK de ElevenLabs ConvAI. Gestiona una sesión de voz bidireccional (STT \+ IA \+ TTS) en tiempo real. Incluye navegación flotante para regresar al chat o cerrar sesión.

Búsqueda Semántica: El componente SemanticSearch permite indexar texto en una base de embeddings y realizar consultas semánticas sobre los documentos cargados.

Editor de System Prompt: Modal accesible desde la barra superior para personalizar las instrucciones del sistema de la sesión actual, permitiendo adaptar el comportamiento del asistente

El desarrollo se llevó a cabo de manera iterativa, validando cada componente antes de avanzar al siguiente. Este proceso se llevó a cabo en distintos paso:

1. **Generación de Interfaces de Usuario (UI):** Basándose en la plantilla de prototipado y procesada por Google Stitch (y posteriormente refinada en el entorno local), la IA materializó las pantallas solicitadas, respetando el sistema de diseño impuesto (Tailwind CSS) y la integración con la base de datos (Supabase)

![][image50]

##### ***Figura 50: Google Stitch*** {#figura-50:-google-stitch}

* **Pantalla de *Login* y Registro:** Se generan interfaces funcionales con validación de formularios, aun así este diseño le falto la implementación de un  botón para login y registro mediante OAuth de Supabase.

![][image51]![][image52]

##### ***Figuras 50 y 51 : Captura de pantalla de login y registro generadas por Stitch*** {#figuras-50-y-51-:-captura-de-pantalla-de-login-y-registro-generadas-por-stitch}

* **Dashboard y Gestión de Conversaciones (Chat):** La IA implementó la vista principal, incluyendo el historial de sesiones y la integración de herramientas avanzadas como la edición del *System Prompt* y la búsqueda semántica.

![][image53]

##### ***Figura 52: Captura de la pantalla principal del chatbot generada por Stitch*** {#figura-52:-captura-de-la-pantalla-principal-del-chatbot-generada-por-stitch}

* **Interfaz de Voz (STT/TTS):** Para cumplir con el requerimiento de accesibilidad y uso en movilidad, se implementó una interfaz de escucha activa, vinculada a los servicios de ElevenLabs. 

![][image54]

##### ***Figura 53: Captura de la pantalla de interfaz de voz del chatbot generada por Stitch*** {#figura-53:-captura-de-la-pantalla-de-interfaz-de-voz-del-chatbot-generada-por-stitch}

2. **Desarrollo del Backend (FastAPI) y Agentes Especializados:** La potencia del ecosistema configurado se demostro durante la creación de la API. En lugar de depender del conocimiento general del LLM (con información obsoleta de la librería ), la IA utilizó el agente especializado (AgenteOpenAI-API.agent.md) para consultar la documentación local estática antes de generar el código.  
   Un ejemplo claro de esta integración es el *endpoint* de análisis de archivos (/analizar-pdf). La IA redactó el código en Python (FastAPI) haciendo que la manipulación de archivos asíncronos (UploadFile), la conexión segura con la API de OpenAI y el manejo de errores mediante excepciones HTTP.

   ![][image55]

##### ***Figura 54: Captura del endpoint /analizar pdf creado por el agente especializado*** {#figura-54:-captura-del-endpoint-/analizar-pdf-creado-por-el-agente-especializado}

3. **Documentación y Despliegue de la API:** Como resultado de la orquestación metodológica, FastAPI generó automáticamente la documentación interactiva (Swagger UI), reflejando los *endpoints* estructurados (gestión de sesiones, procesamiento de audio, análisis de documentos) según el diseño arquitectónico inicial.

![][image56]

##### ***Figura 55: Captura del Swagger UI generado por el agente en FastAPI*** {#figura-55:-captura-del-swagger-ui-generado-por-el-agente-en-fastapi}

![][image57]

##### ***Figura 56: Captura de la documentación generada automáticamente por un endpoint de la FastApi*** {#figura-56:-captura-de-la-documentación-generada-automáticamente-por-un-endpoint-de-la-fastapi}

4. **Orquestación mediante TDD Asistido (Definición de Contratos y Fase Red/Green):** Para garantizar la robustez del sistema y evitar la generación de código funcional huérfano de validación, la implementación del backend se guía por el Desarrollo Guiado por Pruebas (TDD). Antes de codificar la lógica del *endpoint*, se especifico a la IA para definir el contrato de la API mediante pruebas unitarias estructuradas en pytest. Como se observa en las figuras, el agente redactó los *tests* (aplicando sintaxis de Behavior-Driven Development (BDD) y utilizando unittest.mock para aislar dependencias externas como Supabase y OpenAI. La posterior ejecución en consola validando estos tests (Fase Verde) demuestra empíricamente que el código final generado responde de forma exacta a los criterios de aceptación predefinidos. 

*![][image58]*

##### ***Figura 57: Captura de un test generado por la IA en la codificación asistida***

*![][image59]*

##### ***Figura 58: Captura en detalle de un test*** {#figura-58:-captura-en-detalle-de-un-test}

*![][image60]*

##### ***Figura 60: Captura de la ejecución de los tests generados*** {#figura-60:-captura-de-la-ejecución-de-los-tests-generados}

5. **Bucle de Autocorrección Autónoma (*Agentic Loop* y Paradigma ReAct):** Durante el desarrollo y validación del backend, la Inteligencia Artificial trabajo de forma continua bajo el paradigma ReAct (Reasoning \+ Acting), gestionando excepciones en tiempo real de manera autónoma. Un ejemplo de esto, fue que al testear la seguridad de los endpoints: el agente detectó un error lógico provocado por una sobrescritura global en la dependencia de autenticación (get\_current\_user), la cual bloqueaba la correcta validación de las respuestas HTTP 401 (No Autorizado). Sin requerir nuevas directrices ni intervención manual, el agente monitorizó la salida de error en la terminal integrada del IDE, razonó la causa raíz del fallo y aplicó unos cambios sobre el código incorrecto para corregirlo y conseguir el comportamiento esperado. Esta intervención demuestra cómo el agente utiliza el entorno de desarrollo local no solo para generar código, sino para auditar y corregir activamente la lógica de la aplicación frente a fallos de ejecución

*![][image61]![][image62]*

##### ***Figuras 60 y 61: Captura de auto detección y posterior corrección de un endpoint de manera autónoma*** {#figuras-60-y-61:-captura-de-auto-detección-y-posterior-corrección-de-un-endpoint-de-manera-autónoma}

### **Conclusiones Finales de la Fase 2**

La Fase 2 del caso de estudio ha permitido validar que el salto cualitativo en el desarrollo asistido por Inteligencia Artificial no reside en la generación de código, sino en la orquestación sistemática del entorno de ejecución. A diferencia de la Fase 1 —centrada en la calidad del artefacto de especificación—, esta fase demuestra que la capacidad de la IA para producir *software* funcional depende directamente de cómo se estructuran sus reglas, contexto, herramientas y mecanismos de control dentro del *workspace*.

Usando el archivo *instructions.md*  y la orquestación de agentes especializados dotados de gobernanza técnica mediante *skills*, se logra mitigar la incertidumbre y las alucinaciones sintácticas, transformando el proceso de codificación en una arquitectura de diseño de sistemas de generación. Este entorno híbrido, fundamentado en la separación entre la planificación y la ejecución técnica, permite que el *workspace* actúe como un sistema cognitivo semi-autónomo capaz de autocorregirse mediante bucles *ReAct* y validarse bajo principios de *TDD* asistido. Además, la calidad del producto final deja de depender exclusivamente de la implementación manual para sustentarse en la robustez del marco metodológico, desplazando el rol del ingeniero hacia la supervisión estratégica y la gestión de la configuración sistémica, lo que consolida un modelo de desarrollo altamente eficiente, escalable y alineado con los estándares industriales de calidad. 

### **Cierre de la Fase y Transición**

La Fase 2 ha demostrado que la implementación asistida por IA solo es viable a escala cuando se apoya en un entorno estructurado. El conjunto de artefactos generados —*workspace* configurado, agentes especializados, sistema de planificación jerárquica y prototipos funcionales— crean una base sólida para la evolución del sistema hacia fases de optimización, escalado y despliegue productivo.  
A diferencia de enfoques tradicionales, donde la fase de implementación genera incertidumbre, este paradigma reduce la variabilidad al mínimo, garantizando que cada componente desarrollado responde a una especificación previamente validada.  
El paso siguiente natural no consiste en “programar más”, sino en refinar, escalar y automatizar el sistema construido, consolidando un modelo donde la IA actúa como un componente estructural del proceso de ingeniería.

## 

## **Fase 3:**  {#fase-3:}

Tras la finalización de la fase de implementación asistida, comienza la siguiente etapa:  Validación y Verificación (V\&V), donde el  objetivo es garantizar que el sistema desarrollado no solo cumple con los requisitos funcionales definidos en la especificación técnica, sino que también satisface criterios críticos de calidad, seguridad, robustez y accesibilidad antes de su despliegue en entornos productivos.

En el contexto del paradigma *Specific-Driven Development* (SDD), esta fase adquiere una relevancia estructural de gran valor. La automatización intensiva del desarrollo mediante Inteligencia Artificial introduce una nueva categoría de riesgo sistémico: sistemas que son sintácticamente correctos y funcionales en apariencia, pero que pueden contener vulnerabilidades latentes, inconsistencias semánticas en la lógica de negocio, o desviaciones respecto a estándares técnicos y regulatorios. 

Como se ha demostrado en los apartados recientes y en los experimentos de fases anteriores, los modelos generativos priorizan la probabilidad sintáctica y la resolución funcional inmediata, sin una comprensión inherente de las implicaciones de seguridad, integridad transaccional o inclusión digital.

Entre los principales vectores de riesgo asociados al desarrollo intensivo con IA destacan:

* **Exposición inadvertida de credenciales y secretos:** El código generado puede incluir *hardcoding* de claves API o configuraciones de acceso directo a bases de datos.  
* **Configuraciones inseguras en capas de red y acceso:** Políticas CORS excesivamente permisivas, ausencia de validación de certificados o apertura innecesaria de endpoints públicos.  
* **Fallos en la lógica de control de acceso a datos:** Políticas de *Row Level Security* (RLS) incompletas o mal formuladas que permiten escaladas de privilegios o fugas de información entre usuarios.  
* **Integraciones defectuosas entre servicios distribuidos:** Manejo incorrecto de estados en conexiones WebSocket, inconsistencias en la serialización de datos entre *frontend* y *backend*, o fallos silenciosos en la comunicación con APIs externas.  
* **Interfaces visualmente correctas pero no accesibles:** Generación de componentes UI que carecen de atributos semánticos necesarios para tecnologías asistivas, violando estándares WCAG y creando barreras de uso.




Para mitigar estos riesgos de manera sistemática, la validación en este proyecto no se concibe como una fase manual y posterior al desarrollo, sino como una arquitectura de auditoría automatizada integrada. La Inteligencia Artificial asume un rol dual: no solo es la herramienta que generó el sistema, sino también el agente auditor que lo evalúa.   
La IA actúa como un sistema de verificación continúa, evaluando el código, la configuración y la interfaz frente a los estándares definidos en la "constitución técnica" del proyecto (instructions.md) y aplicando mecanismos de análisis, detección y, en algunos casos, corrección autónoma.

La Fase 3 se estructura en torno a tres pilares de validación transversal, cada uno abordado mediante un agente especializado y un proceso de verificación riguroso:

1. **Auditoría Estática de Seguridad (*Security* & RLS):** Evaluación de vulnerabilidades en el código *backend*, configuración de red y políticas de aislamiento de datos.  
2. **Pruebas de Integración Automatizadas:** Validación del comportamiento sistémico del ecosistema completo (*Frontend*, *Backend*, Base de Datos y Servicios Externos) mediante suites de pruebas.  
3. **Verificación de Accesibilidad (a11y) y Experiencia de Usuario:** Auditoría multimodal de la interfaz gráfica para detectar incumplimientos de estándares de accesibilidad *web*.

A continuación, se detalla el desarrollo metodológico, la ejecución y el análisis crítico de cada uno de estos pilares.

### **1\. Auditoría Estática de Seguridad (Security & RLS)**

La seguridad representa el vector de mayor criticidad en el desarrollo de *software* contemporáneo, especialmente en entornos donde el código ha sido generado o asistido por Inteligencia Artificial. La literatura reciente indica que estos sistemas presentan una mayor probabilidad estadística de incluir errores en la gestión de permisos, configuración de servicios y exposición de información sensible, dado que los modelos están entrenados para optimizar la funcionalidad y no la postura de seguridad.  
Para abordar este problema de manera determinista, se diseñó y desplegó un Agente Especializado de Auditoría de Seguridad: QA-Security-Agent.agent.md. Este agente no es un modelo genérico, sino una entidad de verificación configurada con un conjunto estricto de reglas, contexto de arquitectura y capacidad de análisis estático de código fuente. Su objetivo es auditar el sistema desde una perspectiva de seguridad aplicada, simulando el rol de un pentester automatizado integrado en el pipeline de desarrollo.

#### **1.1. Configuración del Agente y Artefacto de Entrada**

El agente fue dotado de un contexto de sistema que le obligaba a actuar como un "Auditor de Seguridad Senior especializado en aplicaciones Web Full-Stack (React, FastAPI, Supabase)". Las reglas inyectadas en su system prompt le ordenaban evaluar exclusivamente los siguientes dominios críticos:

* **Gestión de Variables de Entorno y Secretos:** Detección de hardcoding de claves API, tokens de servicio o credenciales de base de datos en el código fuente del repositorio.  
* **Configuración de Políticas CORS:** Análisis de la configuración de Cross-Origin Resource Sharing en el backend (FastAPI) para identificar políticas excesivamente permisivas (allow\_origins=\["\*"\]) que incrementen la superficie de ataque.  
* I**mplementación de Row Level Security (RLS):** Verificación exhaustiva de las políticas RLS en Supabase, asegurando que todas las operaciones CRUD (Create, Read, Update, Delete) cuenten con restricciones de aislamiento por user\_id y que las operaciones de escritura incluyan la cláusula WITH CHECK para prevenir modificaciones de identidad.  
* **Exposición de Endpoints Públicos:** Identificación de rutas de API no protegidas por autenticación JWT o que expongan información de configuración del sistema.

**Instrucción proporcionada (Prompt):**  
*“Actúa como QA-Security-Agent. Tu tarea es auditar el repositorio actual en busca de vulnerabilidades críticas. Analiza:*

1. *Todos los archivos de backend (FastAPI) en busca de claves API expuestas, configuraciones CORS inseguras o endpoints que filtren secretos.*  
2. *Todas las políticas RLS definidas en Supabase (archivos SQL o migraciones) para verificar que existan políticas activas en tablas sensibles (conversations, messages, documents) y que las operaciones UPDATE/DELETE incluyan WITH CHECK.*  
3. *Genera un informe estructurado clasificando cada hallazgo por criticidad (CRÍTICA, ALTA, MEDIA) y propón remediaciones concretas en código.*

*Restricción: No generes código de ejemplo genérico. La remediación debe basarse en el código real encontrado en el repositorio.”*  
*![][image63]*

##### ***Figura 62: Captura del agente QA-Security-Agent*** {#figura-62:-captura-del-agente-qa-security-agent}

#### **1.2. Ejecución y Resultados de la Auditoría**

La ejecución del agente sobre la base de código completa permitió identificar vulnerabilidades reales que habían pasado desapercibidas durante la fase de implementación. El agente demostró una capacidad superior a una revisión manual ocular al correlacionar configuraciones distribuidas en múltiples archivos (*backend*, migraciones SQL, variables de entorno).  
Los hallazgos principales fueron:

* **Vulnerabilidad CRÍTICA \- Configuración CORS Excesivamente Permisiva:** Se detectó en el archivo principal de la aplicación FastAPI el uso de *“allow\_origins=\["\*"\]*”. Esta configuración permite solicitudes desde cualquier dominio de origen, facilitando potenciales ataques de *Cross-Site Request Forgery* (CSRF) o *exploits* desde dominios no controlados por el cliente. En un entorno de producción empresarial, esto constituye una brecha de seguridad grave.

* **Vulnerabilidad CRÍTICA \- Exposición de Credenciales Sensibles:** El análisis estático identificó que el backend exponía la clave privada *ELEVENLABS\_API\_KEY* a través de un *endpoint* de configuración pública (*/public-config*), accesible sin autenticación. Este tipo de filtración implica un riesgo directo tanto en términos de seguridad (uso no autorizado del servicio de voz) como de impacto económico (facturación por consumo fraudulento de la API).

* **Vulnerabilidad ALTA \- Deficiencias en Políticas Row Level Security (RLS):** Aunque el sistema implementa políticas básicas de aislamiento por usuario en Supabase, el agente detectó una inconsistencia en las operaciones de actualización (UPDATE). La política existente carecía de la cláusula WITH CHECK, lo que permitía teóricamente que un usuario autenticado modificara el campo *user\_id* de una conversación, transfiriendo la propiedad del dato a otro usuario o facilitando escenarios de escalada de privilegios.

#### **1.3. Remediación Autónoma y Ciclo de Corrección**

Una de las capacidades diferenciales de este enfoque es que el agente no se limitó a la identificación pasiva de problemas (modo *linter*), sino que ejecutó un proceso completo de corrección asistida. Tras la validación humana de los hallazgos, el agente procedió a:

1. **Refactorización de la Configuración CORS:** Sustituyó la configuración permisiva por una lista explícita de orígenes permitidos, parametrizada mediante variables de entorno (ALLOWED\_ORIGINS), eliminando el *wildcard*.  
2. E**liminación de la Exposición de Secretos:** Refactorizó el *endpoint* problemático para eliminar cualquier referencia a claves API del cuerpo de respuesta, asegurando que la configuración sensible sólo resida en el entorno del servidor.  
3. **Generación de Sentencias SQL para RLS:** Construyó y aplicó sentencias SQL ALTER POLICY para reforzar las políticas de aislamiento, añadiendo la cláusula WITH CHECK (user\_id \= auth.uid()) a las operaciones de actualización en las tablas críticas.  
     
   ![][image64]

##### ***Figura 63: Captura del agente QA-Security-Agent analizando el repositorio y encontrado vulnerabilidades*** {#figura-63:-captura-del-agente-qa-security-agent-analizando-el-repositorio-y-encontrado-vulnerabilidades}

Este comportamiento demuestra que, bajo un marco metodológico adecuado con contexto arquitectónico explícito, la IA puede operar no solo como herramienta de diagnóstico, sino como un sistema activo de hardening, alineado con prácticas reales de seguridad en entornos productivos (DevSecOps).  
![][image65]![][image66]

##### ***Figuras 64 y 65: Captura del análisis generado por QA-Security-Agent*** {#figuras-64-y-65:-captura-del-análisis-generado-por-qa-security-agent}

#### **1.4. Análisis Crítico del Proceso de Auditoría de Seguridad**

La ejecución de este pilar evidencia un punto clave para la ingeniería de *software* moderna: la seguridad en sistemas generados por IA no puede ser un proceso reactivo o manual. El agente especializado demostró una capacidad de correlación de configuraciones distribuidas (código Python \+ SQL \+ variables de entorno) que supera la revisión humana en velocidad y consistencia, aunque no reemplaza el juicio experto en la validación de la remediación propuesta.  
El valor añadido del enfoque reside en la formalización de la seguridad como código: las reglas de auditoría no son abstractas, sino que se inyectan en el contexto del agente, garantizando que cada ejecución evalúe los mismos vectores de riesgo contra la base de código actualizada. Esto transforma la seguridad de una "fase de revisión" a un "servicio continuo" dentro del SDLC.

### **2\. Pruebas de Integración Automatizadas**

Mientras que en la Fase 2 se garantizó la corrección sintáctica y lógica de unidades funcionales individuales mediante *Test-Driven Development* (TDD) asistido, la presente fase aborda la validación del sistema a nivel global. El objetivo es verificar la correcta interacción entre los distintos componentes distribuidos que conforman la arquitectura del *chatbot* empresarial.  
El sistema integra múltiples elementos heterogéneos:

* Cliente WebSocket en el frontend (React 19 \+ Socket.IO-client).  
* Backend basado en FastAPI orquestando conexiones persistentes.  
* Servicios externos de terceros (APIs de OpenAI para LLM/Vision/Embeddings y ElevenLabs para TTS/STT).  
* Base de datos relacional y vectorial con Supabase (PostgreSQL \+ pgvector).

La complejidad de esta arquitectura distribuida hace que los errores más críticos no se encuentren en funciones individuales, sino en las fronteras entre componentes: en la serialización de mensajes, en la persistencia transaccional de datos, en el manejo de estados de conexión WebSocket, o en la caída de servicios externos.

#### **2.1. Diseño del Agente y Artefacto de Prueba**

Para validar este comportamiento sistémico, se diseñó un script de pruebas de integración (*test\_integration\_chat.py*), generado de forma asistida por IA pero orquestado bajo los principios de SDD. El agente encargado de esta tarea recibió como entrada la especificación técnica de la Fase 1 (especialmente los criterios de aceptación BDD de las HUs relacionadas con chat y voz) y el contrato de API del backend.

**Instrucción proporcionada (Prompt):**  
*“Actúa como QA-Integration-Agent. Basándote en la especificación técnica (HU-02, HU-03, HU-04) y el contrato de API del backend FastAPI, genera un script de pruebas de integración completo usando pytest y pytest-asyncio.*  
*El script debe validar:*

1. ***El ciclo completo de un mensaje de chat:** Cliente WebSocket envía mensaje → Backend procesa → LLM (mock) responde → Mensaje se persiste en Supabase (tabla messages).*  
2. ***El aislamiento de conversaciones:** un usuario no puede suscribirse o recibir mensajes de una conversation\_id que no le pertenece (verificación de RLS a nivel de integración).*  
3. ***El manejo de errores en servicios externos:** Simular un timeout o error 500 de la API de OpenAI y verificar que el backend devuelve un mensaje de error controlado al cliente sin romper la conexión WebSocket.*  
4. ***El pipeline de voz:** Simular el envío de audio (bytes) → STT mock → LLM mock → TTS mock, midiendo que la latencia simulada total sea menor a 2 segundos.*

*Utiliza mocks realistas para OpenAI y ElevenLabs. No realices llamadas reales a APIs de pago durante los tests.”*

#### **2.2. Ejecución y Resultados de Validación**

El agente demostró ser capaz de inferir el contrato funcional del *endpoint* de *chat* y construir *mocks* que replicaban el comportamiento de servicios externos sin necesidad de conectividad real. El script generado incluía *fixtures* de pytest para inicializar un cliente de pruebas de FastAPI, una conexión a una base de datos de pruebas, y mocks asíncronos para las funciones de llamada a OpenAI y ElevenLabs.  
Las pruebas permitieron verificar empíricamente:

* **Coherencia del Flujo Cliente-Servidor:** La correcta transmisión de mensajes a través del protocolo WebSocket, incluyendo la serialización/deserialización de payloads JSON con metadatos (*timestamps*, IDs de conversación, roles).  
* **Persistencia Transaccional:** La inserción atómica de mensajes en la tabla *messages* de Supabase, verificando que tanto el mensaje del usuario como la respuesta del asistente quedaban registrados con el conversation\_id y user\_id correctos.  
* **Manejo de Estados Asíncronos:** La sincronización entre eventos de conexión, desconexión y retransmisión, asegurando que el *backend* no dejaba conexiones "huérfanas" en caso de cierre abrupto del cliente.  
* **Aislamiento a Nivel de Integración:** Se validó que un intento de conexión a un WebSocket de una conversación ajena resultaba en un cierre de conexión con código de error de autorización, confirmando que la lógica de RLS no solo existía en la base de datos, sino que también estaba correctamente implementada en la capa de aplicación.

![][image67]

##### ***Figura 67: Captura de la creación de un test de integración y de su ejecución*** {#figura-67:-captura-de-la-creación-de-un-test-de-integración-y-de-su-ejecución}

La ejecución satisfactoria de estas pruebas mediante pytest confirmó la coherencia sistémica del ecosistema, asegurando que los distintos módulos operan de forma integrada y sin inconsistencias de estado.

### **![][image68]**

##### ***Figura 68: Captura de la ejecución de un test unitario y su validación*** {#figura-68:-captura-de-la-ejecución-de-un-test-unitario-y-su-validación}

#### **2.3. Análisis Crítico del Proceso de Integración**

Este pilar demuestra que la IA es capaz de extender su utilidad más allá de la generación de código de producción, asumiendo tareas tradicionalmente reservadas para *Quality Assurance* *senior*. La capacidad del agente para construir *mocks* realistas de servicios externos y para diseñar escenarios de error (fallos de *red*, *timeouts*) evidencia un nivel de razonamiento sobre la arquitectura distribuida que reduce drásticamente el esfuerzo humano requerido para configurar entornos de pruebas complejos.  
Sin embargo, el análisis también revela una limitación inherente: el agente genera pruebas basadas en el conocimiento explícito del contrato de API. Si existieran *edge cases* no documentados en la especificación (por ejemplo, comportamientos específicos de la librería de WebSocket ante paquetes de red fragmentados), el agente no los anticiparía. Por ello, la supervisión humana sigue siendo necesaria para definir los escenarios límite, mientras que la IA se encarga de la implementación mecánica y repetitiva de la suite de pruebas.

### **3\. Verificación de Accesibilidad (a11y) y Experiencia de Usuario**

La generación de interfaces de usuario mediante modelos de IA tiende a priorizar la coherencia visual, la estética y la rapidez de implementación, descartando aspectos estructurales como la accesibilidad digital (accessibility, a11y). Esto introduce un riesgo significativo, especialmente en aplicaciones empresariales destinadas a un uso diverso y potencialmente obligado por normativas de inclusión digital.  
Para abordar esta limitación de manera rigurosa, se diseñó un proceso de auditoría visual asistido por un agente multimodal con capacidades de visión artificial. A este agente se le proporcionaron capturas de pantalla de la interfaz desarrollada (*dashboard* de conversaciones, interfaz de *chat*, modal de subida de archivos) y se le instruyó para que actuara como un auditor especializado en accesibilidad WCAG 2.1 Nivel AA.

#### **3.1. Configuración del Agente y Artefacto de Entrada**

El agente recibió un contexto de sistema que le definía como "Experto en Accesibilidad Web y Auditoría WCAG 2.1". Se le proporcionaron capturas de los componentes principales de la aplicación React, y se le solicitó un análisis estructurado.

**Instrucción proporcionada (Prompt):**  
*“Actúa como un auditor de accesibilidad senior (WCAG 2.1 Nivel AA). Analiza las siguientes capturas de pantalla de la interfaz de nuestra aplicación React.*  
*Para cada imagen, identifica:*

1. *Elementos interactivos (botones, inputs, enlaces) que carezcan de atributos aria-label, aria-describedby o texto accesible.*  
2. *Contenedores dinámicos (listas de mensajes, notificaciones) que no utilicen aria-live regiones para notificar cambios a lectores de pantalla.*  
3. *Problemas de contraste de color o navegación por teclado visibles.*  
4. *Componentes que simulan roles nativos (como botones custom) sin el atributo role adecuado.*

*Genera un informe en formato lista de verificación y propón el código React/TailwindCSS específico para corregir cada incidencia sin alterar la lógica de negocio ni el diseño visual.”*

#### **3.2. Ejecución y Resultados del Análisis**

El agente multimodal procesó las imágenes y correlacionó los elementos visuales con el código fuente del frontend (al que tenía acceso en el repositorio). Identificó múltiples deficiencias de accesibilidad que comprometían la usabilidad del sistema para personas con discapacidad visual o motora:

* **Ausencia de Atributos Semánticos en Botones de Icono:** Botones críticos como "Enviar mensaje", "Grabar audio" y "Subir imagen" estaban implementados únicamente con iconos SVG sin atributos aria-label. Un lector de pantalla los anunciaría como "botón" sin contexto, dejando al usuario ciego sin saber qué acción realiza.  
* **Falta de Notificación de Cambios Dinámicos:** El contenedor de mensajes de chat, que se actualiza en tiempo real con nuevas respuestas del asistente, carecía de atributos aria-live="polite". Esto implica que un usuario con lector de pantalla no recibiría notificación alguna cuando el asistente generará una nueva respuesta, rompiendo por completo la funcionalidad del chat.  
* **Componentes Interactivos sin Soporte de Foco:** Ciertos componentes custom (como el selector de conversaciones) no implementaban los estilos de :focus-visible ni la gestión de eventos de teclado (Tab, Enter), haciendo la navegación imposible sin ratón.

![][image69]

##### ***Figura 69: Captura de la ejecución de un test unitario y su validación*** {#figura-69:-captura-de-la-ejecución-de-un-test-unitario-y-su-validación}

#### **3.3. Correcciones Aplicadas y Ciclo de Mejora**

Siguiendo las recomendaciones del agente, se aplicaron las correcciones directamente en el código React. El agente fue capaz de generar los snippets de código exactos a insertar, manteniendo intacta la lógica de negocio y la hoja de estilos:

1. **Incorporación de Atributos Semánticos:** Se añadieron atributos aria-label descriptivos a todos los botones basados en iconos (ej. aria-label="Enviar mensaje de texto", aria-label="Iniciar grabación de voz").  
2. **Implementación de Regiones Vivas (Live Regions):** Se envolvió el contenedor de mensajes en una \<div aria-live="polite" aria-atomic="false"\>, permitiendo que los lectores de pantalla anunciaran nuevas respuestas sin interrumpir la narración actual del usuario.  
3. **Mejora de la Navegación por Teclado:** Se ajustaron los componentes interactivos para soportar tabIndex adecuado y estilos de foco visibles, garantizando la navegación completa mediante teclado.

![][image70]

##### ***Figura 70: Captura de la corrección aplicada para la accesibilidad*** {#figura-70:-captura-de-la-corrección-aplicada-para-la-accesibilidad}

### **Síntesis de Hallazgos y Métricas de Calidad**

La ejecución de los tres pilares de la Fase 3 permite cuantificar el impacto de la auditoría automatizada sobre la base de código generada en fases anteriores. A continuación se presenta una síntesis de los hallazgos operativos:

| Pilar de Validación | Artefacto Generado | Hallazgos Críticos | Hallazgos Medios | Estado Post-Remediación |
| :---- | :---- | :---- | :---- | :---- |
| Seguridad (Security & RLS) | QA-Security-Agent.agent.md | 2 (CORS wildcard, API Key leak) | 1 (RLS UPDATE sin WITH CHECK) | Resuelto |
| Integración | test\_integration\_chat.py | 0 | 0 | Validado (Tests pasando) |
| Accesibilidad (a11y) | Informe WCAG \+ Correcciones React | 3 (aria-label, aria-live, focus) | 2 (tabIndex, roles) | Resuelto |

##### ***Tabla 12: Matriz de los pilares de la verificación de la Fase 3*** {#tabla-12:-matriz-de-los-pilares-de-la-verificación-de-la-fase-3}

Como se puede ver en la matriz, aunque la Fase 2 produjo un sistema funcionalmente coherente, la ausencia de una fase de V\&V estructurada habría dejado vulnerabilidades activas y barreras de accesibilidad en el producto final. La intervención de los agentes especializados no fue meramente decorativa, sino correctora de defectos reales.

### **Conclusiones Finales de la Fase 3**

La Inteligencia Artificial puede integrarse de manera efectiva y rigurosa en procesos avanzados de validación y aseguramiento de calidad dentro del ciclo de vida del *software*. A diferencia de las fases anteriores, donde la IA se empleaba principalmente como herramienta de generación y ejecución creativa, en esta etapa asume un rol activo y crítico como sistema de auditoría y verificación.  
El caso de estudio evidencia que, bajo un marco metodológico estructurado (extensión de los principios SDD al dominio de la calidad), la IA es capaz de:

* Identificar vulnerabilidades de seguridad críticas en sistemas reales, operando con una velocidad y exhaustividad difícilmente sostenibles de forma manual.  
    
* Validar la integración de componentes distribuidos generando suites de pruebas complejas con mocks sofisticados y validando contratos de API implícitos  
  .  
* Detectar y remediar deficiencias en accesibilidad y experiencia de usuario, demostrando una capacidad de análisis multimodal que trasciende el código fuente para evaluar el producto final desde la perspectiva del usuario humano.  
    
* Generar y aplicar correcciones alineadas con estándares técnicos, cerrando el ciclo de "detección → remediación" de forma autónoma pero supervisada.


Este comportamiento sitúa a la IA en una posición equivalente a la de un sistema de aseguramiento de calidad (QA) automatizado de nivel empresarial, con capacidades ampliadas en términos de velocidad, cobertura transversal y consistencia de aplicación.  
Por otro lado, el experimento también confirma que la efectividad de este enfoque depende directamente de la correcta definición del entorno de validación. La IA no establece por sí misma los estándares de calidad ni los vectores de riesgo a evaluar; los ejecuta con rigor en función de las reglas, restricciones y contexto arquitectónico definidos por el ingeniero. Sin la inyección explícita de las mejores prácticas de seguridad (OWASP), los estándares de accesibilidad (WCAG) y los contratos de API de la Fase 1, los agentes de validación carecerían de criterios para operar.

## **Cierre de la Fase y Transición**

La Fase 3 consolida el sistema desarrollado como un producto técnicamente validado, endurecido en seguridad, verificado en su cohesión arquitectónica y corregido en accesibilidad, preparando así su despliegue en entornos reales. La combinación de auditoría de seguridad, pruebas de integración y verificación de accesibilidad reduce de forma drástica la incertidumbre asociada al desarrollo asistido por IA, transformando la validación de un cuello de botella manual a un proceso continuo y automatizado.  
El recorrido completo del proyecto refleja una evolución progresiva, coherente y gobernada metodológicamente. En la Fase 1 se estableció el control sobre la generación de conocimiento y la trazabilidad de requisitos, en la Fase 2 se estructuró la ejecución del sistema mediante la orquestación de agentes especializados y la planificación jerárquica, y en la Fase 3 se garantizó la calidad, la seguridad y la fiabilidad del resultado final mediante la auditoría automatizada transversal.  
Este proceso confirma que el desarrollo moderno con Inteligencia Artificial no se basa en la generación aislada y estocástica de código, sino en la orquestación integral del ciclo de vida del *software*, donde cada fase está gobernada por principios metodológicos explícitos, roles de agentes definidos y criterios de calidad verificables.  
En este contexto, la IA no actúa como un sustituto del ingeniero, sino como un componente estructural y operativo del sistema de desarrollo, cuya efectividad depende directamente de la capacidad del profesional para definir, controlar, validar y, en última instancia, hacer responsable su comportamiento.

## **Fase 4:** {#fase-4:}

Tras la validación y verificación del sistema en la Fase 3, el proyecto alcanza su etapa final dentro del ciclo de vida del desarrollo de *software* (SDLC): el despliegue en entornos productivos. Normalmente, esta fase es uno de los cuellos de botella más significativos, ya que requiere la configuración manual de servidores, la creación de contenedores (*dockers*), la gestión de redes, certificados SSL y la integración de pipelines de CI/CD complejos.  
Sin embargo, esta ya no es la realidad hoy en día, con las plataformas *Platform-as-a-Service* (PaaS) y *Backend-as-a-Service* (BaaS). En el contexto de este caso de estudio, la arquitectura elegida —Vercel para el *frontend* estático, Render para el *backend* Python y Supabase para la capa de datos— representa la tercera generación de despliegue *cloud*, donde la complejidad operativa (construcción de imágenes, balanceo de carga, despliegue de borde) ha sido abstraída casi por completo por la plataforma.

Esta abstracción introduce una pregunta metodológica fundamental para el marco SDD: ¿Cuál es el rol de la Inteligencia Artificial en una fase donde la infraestructura ya no requiere generación manual de artefactos como Dockerfiles o scripts de CI/CD?

La respuesta que he obtenido en este caso de estudio redefine el valor de la IA en el despliegue moderno. La IA no generó pipelines ni contenedores porque la plataforma ya los proporcionaba de forma nativa. En su lugar, la IA asumió un rol de planificación estratégica, orquestación de configuración y verificación post-despliegue.

 Su contribución residió en:

* **Generación de un Plan de Despliegue Determinista:** A partir de la especificación técnica de la Fase 1, la IA elaboró un plan secuencial que definía el orden de despliegue (datos → *backend* → *frontend*), las variables de entorno necesarias para cada componente y las dependencias entre servicios.  
* **Asesoramiento de Configuración:** La IA identificó qué variables sensibles debían inyectarse en los dashboards de plataforma (OPENAI\_API\_KEY, SUPABASE\_SERVICE\_ROLE\_KEY, ELEVENLABS\_API\_KEY, DATABASE\_URL, etc.), diferenciando entre variables de *build-time* y *runtime*.  
* **Verificación de Contrato entre Código y Plataforma:** Una vez desplegado, la IA validó que la abstracción de la plataforma no ocultara errores de configuración (rutas de SPA, *timeouts* de WebSocket, políticas CORS en producción).

La Fase 4 se estructura en torno a cuatro ejes de despliegue y verificación, cada uno representando un componente crítico de la arquitectura distribuida, y concluye con una reflexión sobre las implicaciones de dependencia tecnológica (Vendor Lock-in) inherente a este modelo PaaS.

### **1\. Planificación Estratégica del Despliegue (Agente DevOps-Planner)**

Antes de interactuar con cualquier plataforma *cloud*, se estableció una regla clave: "No desplegar sin un plan determinista". En el marco SDD, si la especificación técnica es la "única fuente de verdad" para el código, el plan de despliegue debe ser la "única fuente de verdad" para la infraestructura.  
Para ello, se diseñó un agente especializado de planificación de despliegue, configurado para actuar como un "Ingeniero de Plataforma Cloud Senior" con conocimiento específico del stack Vercel-Render-Supabase.  
![][image71]

##### ***Figura 71: Captura del agente DevOps-Planner*** {#figura-71:-captura-del-agente-devops-planner}

### 

### **1.1. Configuración del Agente y Artefacto de Entrada**

El agente recibe como entrada la especificación técnica consolidada de la Fase 1 (stack tecnológico, restricciones de arquitectura, variables de entorno identificadas) y fue instruido para no generar código de infraestructura innecesario (Dockerfiles, Kubernetes, GitHub Actions), sino para producir un plan de despliegue secuencial y un mapa de variables de entorno.

**Instrucción proporcionada (Prompt):**  
*“Actúa como DevOps-Planner-Agent. Eres un experto en despliegue de aplicaciones full-stack en plataformas PaaS modernas (Vercel, Render, Supabase).*  
*Tu tarea es generar un Plan de Despliegue Secuencial para nuestro proyecto. NO generes Dockerfiles ni pipelines de CI/CD, ya que usaremos la abstracción nativa de las plataformas.*  
*Basándote en nuestra arquitectura (React 19 SPA en Vercel, FastAPI en Render, Supabase PostgreSQL+pgvector), debes producir:*

1. *Orden de Despliegue: ¿Qué componente se despliega primero, segundo y tercero? Justifica las dependencias (ej: el backend necesita la URL de Supabase, el frontend necesita la URL del backend).*  
2. *Mapa de Variables de Entorno: Lista exhaustiva de todas las variables necesarias para cada plataforma, clasificadas por criticidad (sensibles vs. no sensibles) y por entorno (build-time vs. runtime).*  
3. *Checklist de Verificación Post-Despliegue: Lista de 5-7 verificaciones manuales (smoke tests) para confirmar que cada componente funciona correctamente en producción.*  
4. *Riesgos de Despliegue: Identifica posibles puntos de fallo en este flujo PaaS (ej: timeouts de WebSocket en Render, rutas SPA en Vercel, latencia de pgvector en Supabase cloud).*

*Restricción: No sugieras herramientas fuera de nuestro stack. No generes código YAML o JSON. El output debe ser un plan de acción humano-legible en Markdown.”*  
![][image72]

##### ***Figura 72: Captura del plan generado por DevOps-Planner*** {#figura-72:-captura-del-plan-generado-por-devops-planner}

### **1.2. Resultado Generado: Plan de Despliegue y Mapa de Configuración**

El agente generó un plan estructurado que demostró un razonamiento sobre las dependencias distribuidas del sistema. El output incluyó:

* **Orden de Despliegue Propuesto:**  
  1. Paso 1 (Datos): Asegurar que el proyecto Supabase está creado, la extensión pgvector está habilitada y las migraciones de esquema están aplicadas. Sin la base de datos, el backend no puede iniciar.  
  2. Paso 2 (Backend): Desplegar la API FastAPI en Render. Esto expone la URL del backend (https://api-tuapp.onrender.com) y valida que la conexión a Supabase es funcional.  
  3. Paso 3 (Frontend): Desplegar la SPA React en Vercel. El frontend necesita la URL del backend ya activa para configurar correctamente el cliente WebSocket y las llamadas API.  
* **Mapa de Variables de Entorno:** El agente clasificó las variables en tres bloques, diferenciando entre sensibles (secretos que nunca deben exponerse al cliente) y públicas ( configuración de entorno que el frontend puede conocer):  
  1. **Variables de Render (Backend Runtime):**  
     * *SUPABASE\_URL*: URL del proyecto Supabase.  
     * *SUPABASE\_SERVICE\_ROLE\_KEY*: Clave de servicio con privilegios elevados para operaciones de backend (ROL: sensible).  
     * *OPENAI\_API\_KEY*: Clave de acceso a GPT-4o y embeddings (ROL: sensible).  
     * *ELEVENLABS\_API\_KEY*: Clave de acceso a TTS/STT (ROL: sensible).  
     * *JWT\_SECRET*: Secreto para firmar tokens de autenticación (ROL: sensible).  
     * *FRONTEND\_URL*: URL de producción de Vercel (para configuración CORS).  
  2. **Variables de Vercel (Frontend Build-time):**  
     * *VITE\_API\_UR*L: URL pública del backend en Render (ROL: pública, necesaria en build).  
     * *VITE\_SUPABASE\_ANON\_KEY*: Clave anónima de Supabase para operaciones desde el navegador (ROL: pública por diseño).  
* **Checklist de Smoke Tests Propuestos:**  
  1. Acceso a la URL de Vercel: la SPA carga sin errores de build (HTTP 200, consola limpia).  
  2. Autenticación: un usuario puede registrarse e iniciar sesión a través de Supabase Auth.  
  3. WebSocket: al abrir una conversación, la conexión wss:// se establece y permanece activa (verificar en DevTools).  
  4. RAG: una pregunta sobre documentos internos devuelve una respuesta con cita de fuente en menos de 3 segundos.  
  5. Pipeline de Voz: la grabación de audio se transmite, se procesa y se reproduce la respuesta con latencia menor a 2 segundos.  
  6. Aislamiento de Datos: el usuario A no puede ver conversaciones del usuario B (verificación de RLS en producción).  
  7. Carga de Imágenes: el análisis de una foto de una pieza funciona y referencia el catálogo correcto.

### **1.3. Análisis Crítico del Proceso de Planificación**

El valor de este agente no residió en la generación de artefactos técnicos complejos, sino en la reducción de la incertidumbre operativa. Al descomponer el despliegue en una secuencia determinista y en un mapa de variables explícito, la IA eliminó el ensayo y error típico de los despliegues manuales.  
El agente demostró una comprensión de los principios de infraestructura  y d*ependency injection*: entendió que el *frontend* no debe "esperar" al backend en tiempo de ejecución, sino que debe "conocer" su URL en tiempo de build. Asimismo, identificó correctamente que las claves de servicio (SERVICE\_ROLE\_KEY) deben residir únicamente en el entorno seguro de Render, mientras que la clave anónima (ANON\_KEY) es segura para el navegador.  
Este proceso confirma que, incluso en entornos PaaS donde la infraestructura está abstraída, la orquestación de la configuración y la planificación de la secuencia de despliegue siguen siendo tareas de alto valor que la IA puede asumir eficazmente.

## **2\. Despliegue del Frontend (Vercel — Zero-Config)**

El frontend de la aplicación, desarrollado como una *Single Page Application* (SPA) estática con React 19, TypeScript y Bun, fue desplegado en la plataforma Vercel..

### **2.1. Proceso de Despliegue**

El flujo de despliegue real fue:

1. **Conexión del Repositorio:** El repositorio de código *frontend* fue vinculado directamente a Vercel a través de la integración nativa con GitHub.  
2. **Detección Automática:** Vercel detecta automáticamente la presencia de un proyecto React basado en Vite, identificando el uso de Bun como gestor de paquetes y sistema de *build*.  
3. **Build y Deploy:** Tras cada *git push* a la rama principal (*main*), Vercel ejecuta automáticamente el proceso de construcción (*bun run build*), genera los assets estáticos optimizados y los distribuye a través de su red CDN global (*Edge Network*).  
4. **Configuración de SPA Routing:** Dado que se trata de una SPA, la navegación es gestionada por el lado del cliente (React Router). La IA verificó que Vercel estaba configurado para redirigir todas las rutas al archivo *index.html*, permitiendo que el enrutamiento del cliente funcionara correctamente incluso al acceder directamente a URLs profundas (ej. /dashboard/conversation/123).

![][image73]

##### ***Figura 73: Captura del vercel con los deployments automáticos según el commit en el repositorio de github*** {#figura-73:-captura-del-vercel-con-los-deployments-automáticos-según-el-commit-en-el-repositorio-de-github}

![][image74]![][image75]

##### ***Figuras 74 y 75: Captura de la configuración de las variables de entorno en vercel y de un commit en específico que se ha compilado correctamente*** {#figuras-74-y-75:-captura-de-la-configuración-de-las-variables-de-entorno-en-vercel-y-de-un-commit-en-específico-que-se-ha-compilado-correctamente}

### **2.2. Análisis Crítico: La Abstracción Total del Frontend**

Este pilar representa el extremo más puro de la abstracción PaaS. No he intervenido en ningún momento en la configuración de servidores web, compresión de assets, cabeceras HTTP, caché de CDN o renovación de certificados SSL. Todo ello fue gestionado por la plataforma.  
La única intervención requerida fue la inyección de las variables de entorno en el panel de configuración de Vercel. Este patrón demuestra que el despliegue del *frontend* ha dejado de ser un problema de ingeniería de infraestructura para convertirse en un problema de configuración de entorno.  
La implicación metodológica es profunda: en el contexto de este caso de estudio, la "Deuda Técnica de Infraestructura" ha sido transferida de la propiedad del desarrollador a la propiedad de la plataforma. El coste de esta transferencia es la dependencia tecnológica (Vendor Lock-in), tema que se desarrollará en la sección final de esta fase.

## **3\. Despliegue del Backend y Entorno de Ejecución (Render Dashboard)**

A diferencia del *frontend*, el *backend* presentó un nivel ligeramente mayor de complejidad debido a su naturaleza *stateful*: la necesidad de mantener conexiones WebSocket persistentes y la gestión de variables de entorno sensibles que no pueden versionarse en el repositorio.

### **3.1. Proceso de Despliegue y Configuración Manual**

El despliegue del backend FastAPI se realizó mediante la plataforma Render, siguiendo un flujo híbrido entre automatización y configuración manual guiada:

1. **Conexión del Repositorio:** Al igual que con Vercel, el repositorio del *backend* fue conectado a Render.  
2. **Detección Automática del Runtime:** Render analizó el repositorio, detectó el archivo *requirements.txt* y configuró automáticamente un entorno de ejecución Python 3.11. No fue necesario crear un Dockerfile; Render generó y gestionó el entorno de ejecución de forma opaca.  
3. **Configuración Manual de Variables de Entorno**: A través del panel de control de Render, se inyectaron manualmente las variables de entorno identificadas por el agente en la fase de planificación: *SUPABASE\_URL*, *SUPABASE\_SERVICE\_ROLE\_KEY*, *OPENAI\_API\_KEY*, *ELEVENLABS\_API\_KEY*, *JWT\_SECRET* y *FRONTEND\_URL*..  
4. **Configuración del Servicio WebSocket:** Render, por defecto, configura servicios *web* con timeouts estándar de HTTP. La IA asistió indicando que era necesario verificar que el servicio soportara conexiones de larga duración para el protocolo WebSocket (ws:// / wss://), asegurando que los *timeouts* de inactividad no cerraran las sesiones de chat en tiempo real.  
5. **Despliegue:** Tras la configuración inicial, el proceso de despliegue se volvió completamente automático: cada *git push* a la rama principal desencadenaba un nuevo *build* y despliegue del servicio.

![][image76]

##### ***Figura 76: Captura de Render con los deployments automáticos según el commit en el repositorio de github del backend*** {#figura-76:-captura-de-render-con-los-deployments-automáticos-según-el-commit-en-el-repositorio-de-github-del-backend}

##### ***![][image77]Figura 77: Captura de la configuración de las variables de entorno en render*** {#figura-77:-captura-de-la-configuración-de-las-variables-de-entorno-en-render}

![][image78]

##### ***Figura 78: Captura de la configuración de los parámetros de build para el backend en render*** {#figura-78:-captura-de-la-configuración-de-los-parámetros-de-build-para-el-backend-en-render}

### **3.2. Análisis Crítico: El Último punto de la Intervención Manual**

De la misma manera que con el frontend, en vercel se configuraron varios secretos en el *backend* pasa lo mismo; aunque la plataforma PaaS elimina la necesidad de gestionar servidores o contenedores, no elimina la necesidad de gestionar secretos y la lógica de conectividad de red. El panel de control de Render siguió siendo el punto de intervención humana obligatoria.  
La contribución de la IA en este pilar fue, por tanto, de tipo asesoría preventiva: al anticipar la necesidad de configurar el *FRONTEND\_URL* para las políticas CORS, al recordar que el *SUPABASE\_SERVICE\_ROLE\_KEY* (y no la *ANON\_KEY*) era la clave correcta para operaciones de backend, y al señalar la importancia de los *timeouts* de WebSocket. La IA actuó como un "*checklist* cognitivo" que redujo la probabilidad de errores de configuración en el *dashboard*.  
Este comportamiento refuerza el principio de que la IA no sustituye la intervención humana en puntos de alto riesgo (manejo de secretos), pero reduce drásticamente la carga de pensamiento asociada a la toma de decisiones de configuración.

## **4\. Gestión del Estado de Base de Datos (Supabase CLI)**

Mientras que Vercel y Render abstraen el despliegue de código, la base de datos sigue siendo un componente que requiere gestión explícita del estado. El esquema relacional, la extensión vectorial pgvector y las políticas de seguridad a nivel de fila (RLS) deben existir en el entorno cloud antes de que la aplicación pueda funcionar.

### **4.1. Proceso de Despliegue del Esquema y Migraciones**

La gestión de la capa de datos se realizó mediante el Supabase CLI, la única herramienta de línea de comandos utilizada activamente en esta fase de despliegue. El proceso fue el siguiente:

1. **Inicialización del Proyecto Cloud:** Se creó un proyecto en la instancia *cloud* de Supabase, obteniendo la URL de conexión y las claves de API.  
2. **Habilitación de pgvector:** Se verificó que la extensión para búsqueda vectorial estuviera habilitada en la instancia PostgreSQL, tal como se había definido en el esquema local.  
3. **Aplicación de Migraciones:** Utilizando el comando supabase db push, se sincronizó el esquema de la base de datos local con la instancia remota. Esto incluyó la creación de tablas (users, conversations, messages, documents, document\_embeddings), la definición de claves foráneas, la creación de índices HNSW para pgvector y la aplicación de las políticas RLS auditadas en la Fase 3\.  
4. **Verificación de Congruencia:** Se validó que las políticas RLS migradas localmente se aplicaran idénticamente en el entorno de producción, garantizando que el aislamiento de datos no se degradara durante la transición del entorno de desarrollo al cloud.

![][image79]

##### ***Figura 73: Captura de la creación del esquema SQL***  {#figura-73:-captura-de-la-creación-del-esquema-sql}

![][image80]

##### ***Figura 73: Captura de los secretos en Supabase*** {#figura-73:-captura-de-los-secretos-en-supabase}

### 

## **5\. Verificación Post-Despliegue (Smoke Tests en Producción)**

El despliegue técnico (el código está en los servidores) no equivale al despliegue funcional (el sistema cumple sus objetivos de negocio). Siguiendo el plan generado por el agente en la sección 1.2, se ejecutó una batería de pruebas de humo (smoke tests) directamente sobre las URLs de producción.

### **5.1. Ejecución de Validaciones Funcionales en Entorno Real**

Se verificaron los siguientes puntos críticos, que representan una traslación directa de los criterios de aceptación BDD de la Fase 1 al entorno productivo:

1. **Carga de la Aplicación:** La URL de Vercel respondió con HTTP 200, la SPA cargó correctamente y no se observaron errores de red en la consola del navegador para los assets estáticos.  
2. **Flujo de Autenticación:** Se completó con éxito el registro de un usuario de prueba y el inicio de sesión mediante Supabase Auth. El token JWT se almacenó correctamente en el cliente y fue validado por el backend en Render.  
3. **Conectividad WebSocket:** Se abrió una conversación y se verificó en las herramientas de desarrollo del navegador (pestaña Network → WS) que la conexión wss:// al backend de Render se establecía, se mantenía abierta y no era cerrada por timeouts de la plataforma.  
4. **Consulta RAG con Latencia Aceptable:** Se realizó una pregunta sobre documentos técnicos ("¿Cuál es el precio de la caldera XR-2000?"). El sistema respondió correctamente citando la fuente (Tarifas-2025.pdf) en un tiempo menor a 3 segundos, validando el funcionamiento del pipeline: consulta al embedding en pgvector → recuperación de contexto → llamada a OpenAI GPT-4o.  
5. **Pipeline de Voz en Condiciones de Red Reales:** Se activó el modo de voz, se grabó una pregunta y se midió la latencia total (STT → LLM → TTS). El audio de respuesta se reprodujo en menos de 2 segundos, cumpliendo el requisito no funcional crítico definido en la Fase 1\.  
6. **Aislamiento de Datos (Validación de RLS en Vivo):** Se verificó que un usuario autenticado solo visualizaba sus propias conversaciones en el dashboard, confirmando que las políticas RLS migradas a Supabase Cloud operaban correctamente en el entorno real.  
7. **Análisis Multimodal:** Se subió una fotografía de una pieza industrial y el sistema, utilizando GPT-4o Vision, identificó correctamente el componente y proporcionó información técnica del catálogo.

### **5.2. Análisis Crítico: El Cierre del Ciclo SDLC**

Esta fase de verificación post-despliegue representa el cierre del bucle de retroalimentación del proyecto. Los criterios de aceptación definidos en la Fase 1 (en formato BDD) fueron validados empíricamente en la Fase 3 (mediante pruebas automatizadas en entorno controlado) y finalmente confirmados en la Fase 4 (en el entorno productivo real).  
El hecho de que todas las validaciones superaran los umbrales definidos demuestra que la metodología SDD, aplicada de forma estricta a lo largo de las cuatro fases, logró mantener la alineación entre la intención del cliente (Fase 1), la implementación técnica (Fase 2), la calidad interna (Fase 3\) y la operación en producción (Fase 4). La trazabilidad entre fases se mantuvo intacta.

## **Conclusiones Finales de la Fase 4**

La Fase 4 ha permitido validar el comportamiento del sistema en un entorno de producción real, completando así el ciclo de vida del *software* planteado en este trabajo. A diferencia de las fases anteriores —centradas en especificación, implementación y validación interna— esta etapa introduce un elemento diferencial: la confrontación del sistema con condiciones operativas reales, donde arquitectura, configuración, automatización y comportamiento funcional deben mantenerse alineados sin intervención constante.

El despliegue exitoso del sistema demuestra que el enfoque *Specific-Driven Development* (SDD) no solo es válido para estructurar la generación e implementación de *software* asistido por IA, sino también para garantizar la continuidad metodológica hasta la operación en producción.

Uno de los resultados más relevantes observados durante esta fase ha sido la transformación del papel de la Inteligencia Artificial. Mientras que en etapas anteriores la IA actuaba principalmente como generador de especificaciones, código y pruebas, en el contexto del despliegue su función evoluciona hacia un rol de soporte operacional y planificación estratégica.

La IA deja de ser un generador directo de infraestructura y pasa a actuar como un sistema de razonamiento operativo capaz de:

* Organizar secuencias de despliegue  
* Validar configuraciones críticas  
* Anticipar riesgos de integración  
* Supervisar coherencia entre servicios distribuidos  
* Reducir incertidumbre durante la puesta en producción

Este cambio evidencia una nueva aplicación para la IA en la ingeniería de software contemporánea: a medida que las plataformas *cloud* abstraen complejidad técnica, el valor diferencial de la IA se desplaza desde la automatización mecánica hacia la orquestación inteligente de procesos.

Asimismo, la fase ha puesto de manifiesto que el despliegue moderno ya no constituye una operación aislada y manual, sino un proceso continuo profundamente integrado con el *pipeline* de desarrollo. Plataformas como Vercel, Render y Supabase encapsulan gran parte de la complejidad tradicional asociada a infraestructura, integración continua y distribución.

Sin embargo, esta simplificación operativa introduce una nueva problematica  arquitectónica: la dependencia estructural respecto a proveedores específicos. El proyecto ha demostrado que la velocidad de desarrollo obtenida mediante plataformas PaaS implica aceptar determinados niveles de *vendor lock-in*, especialmente en capas críticas como autenticación, políticas de seguridad y extensiones vectoriales.

En consecuencia, la Fase 4 confirma que el desarrollo moderno asistido por IA no elimina la necesidad de decisiones arquitectónicas complejas, sino que desplaza dichas decisiones desde la implementación técnica hacia la selección estratégica de plataformas, servicios y mecanismos de gobernanza.

## **Cierre de la Fase**

La Fase 4 completa el ciclo metodológico planteado en este trabajo y consolida la viabilidad práctica del enfoque metodológico aplicado al desarrollo asistido.

El recorrido realizado a lo largo del proyecto evidencia una evolución progresiva y coherente:

* En la Fase 1 se estructuró el conocimiento y la especificación del problema.  
* En la Fase 2 se organizó la implementación mediante agentes y entornos controlados.  
* En la Fase 3 se garantizó la calidad mediante auditoría automatizada y validación continua.  
* Finalmente, en la Fase 4 se verificó la capacidad del sistema para operar de forma consistente en producción.

La continuidad observada entre estas etapas demuestra que es posible construir un *pipeline* completo de desarrollo gobernado por IA sin perder trazabilidad ni coherencia arquitectónica.

Más allá del caso práctico desarrollado, el proyecto pone de manifiesto una transformación estructural en la ingeniería de *software* contemporánea. El desarrollo moderno deja de centrarse exclusivamente en la escritura manual de código y evoluciona hacia la orquestación de sistemas inteligentes compuestos por:

* modelos generativos,  
* agentes especializados,  
* plataformas cloud abstraídas,  
* pipelines automatizados,  
* y mecanismos continuos de validación.

En este nuevo paradigma, el rol del ingeniero no desaparece, sino que se redefine. La principal responsabilidad ya no consiste únicamente en programar, sino en diseñar y gobernar sistemas capaces de generar, validar, desplegar y mantener software de forma semiautónoma bajo supervisión humana.

# 7\. Conclusiones finales {#7.-conclusiones-finales}

## 7.1 Conclusiones {#7.1-conclusiones}

Este Trabajo de Fin de Grado partía de una premisa que, a día de hoy, resulta difícil cuestionar: la Inteligencia Artificial generativa ha irrumpido en la ingeniería de *software* con la magnitud propia de un cambio de paradigma. Sin embargo, el propósito de esta investigación no ha sido simplemente constatar esa irrupción, sino analizar bajo qué condiciones la IA deja de ser un generador probabilístico de contenido para convertirse en un componente fiable y estructural dentro del ciclo de vida del desarrollo de *software*.

La principal conclusión que puede extraerse del análisis realizado —tanto desde el marco teórico como, especialmente, desde el caso práctico desarrollado— es clara: la utilidad real de la IA no depende exclusivamente de la capacidad del modelo, sino del rigor metodológico con el que se gobierna su comportamiento.

La experimentación realizada en la Fase 1 constituye la evidencia más representativa de todo el trabajo. Un mismo modelo de lenguaje, alimentado con exactamente la misma transcripción ambigua de un cliente, produjo resultados radicalmente distintos dependiendo del nivel de estructuración metodológica aplicado por el ingeniero.

El Perfil 1, basado en un enfoque *Zero-shot* naïf y cercano al denominado *vibecoding*, confirmó que delegar razonamiento técnico en un modelo sin restricciones explícitas no implica automatización inteligente, sino pérdida de control. El artefacto generado era superficialmente correcto, pero completamente insuficiente como especificación técnica: carecía de trazabilidad, criterios verificables, gestión de riesgos y delimitación funcional precisa.

El Perfil 2 introdujo una mejora sustancial mediante ciclos iterativos *Human-in-the-Loop* (HITL), donde la IA comenzó a comportarse como un asistente de descubrimiento capaz de reducir incertidumbre a través de preguntas de clarificación y organización estructurada de requisitos. No obstante, el estudio evidenció que la iteración por sí sola no garantiza rigor ingenieril. La salida continuaba siendo vulnerable a ambigüedades, supuestos implícitos y carencias de verificabilidad.

Fue el Perfil 3, basado en *Specific-Driven Development* (SDD), TDD asistido y formalización mediante BDD, el que logró transformar la IA en un co-diseñador técnico parcialmente determinista. La generación de un documento de especificación formal con requisitos funcionales y no funcionales cuantificados, criterios de aceptación verificables y riesgos arquitectónicos explícitos permitió construir un artefacto capaz de actuar como fuente única de verdad para el resto del proyecto.

No es casualidad que las fases posteriores —implementación, validación y despliegue— pudieran sostenerse de manera consistente sobre la especificación generada en este perfil. El estudio confirma así una de las hipótesis centrales del trabajo: la calidad del *output* generado por IA es una función directa del control aplicado sobre la entrada.

La Fase 2 permitió demostrar que el verdadero salto cualitativo no reside únicamente en la capacidad de generar código, sino en la arquitectura metodológica y contextual que gobierna a los agentes generativos. La construcción de un entorno disciplinado —mediante archivos de gobernanza persistente (*instructions.md*), *skills* especializadas, documentación estática local y taxonomías de modelos— resultó determinante para reducir alucinaciones y aumentar consistencia técnica.

El caso práctico evidenció que cuando un agente especializado opera sobre documentación oficial previamente indexada, la diferencia respecto a un modelo genérico sin contexto es sustancial: disminuyen drásticamente los errores sintácticos, desaparecen referencias obsoletas y se reduce significativamente la generación de APIs inexistentes o configuraciones inválidas.

En consecuencia, el estudio demuestra que la IA no “se vuelve más inteligente” por sí misma; simplemente produce mejores resultados cuando opera bajo mejores restricciones, mejor contexto y mejores mecanismos de gobernanza.

La Fase 3 añadió una dimensión especialmente relevante: la validación y auditoría sistemática del *software* generado. Uno de los riesgos más frecuentes en el desarrollo asistido por IA es asumir erróneamente que un sistema funcionalmente operativo equivale a un sistema correcto o seguro.

La auditoría automatizada realizada mediante agentes especializados demostró precisamente lo contrario. El QA-Security-Agent identificó vulnerabilidades críticas que habían sobrevivido a toda la fase de implementación, incluyendo configuraciones CORS excesivamente permisivas, exposición de claves API y debilidades en políticas RLS susceptibles de escalada de privilegios.

De forma paralela, las auditorías de accesibilidad revelaron incumplimientos WCAG que afectan directamente a la interacción de usuarios con tecnologías asistivas. Estos hallazgos resultan especialmente relevantes porque muchos de ellos no son detectados por *linters* tradicionales ni suelen emerger en revisiones manuales convencionales.

La Fase 3 confirmó así que la IA puede actuar simultáneamente como generadora y auditora del sistema, siempre que opere bajo reglas explícitas de validación y dentro de un paradigma de Cero Asunciones.

Finalmente, la Fase 4 permitió cerrar el ciclo completo del SDLC, conectando de forma trazable la especificación inicial con el comportamiento real del sistema desplegado en producción.

El despliegue realizado sobre Vercel, Render y Supabase puso de manifiesto otra transformación relevante de la ingeniería moderna: la complejidad operativa ya no reside principalmente en la construcción manual de infraestructura, sino en la correcta orquestación de configuración, automatización y dependencias distribuidas.

En este contexto, el rol de la IA volvió a pivotar. Su valor dejó de estar asociado a la generación de archivos de infraestructura y pasó a centrarse en la planificación operacional, la validación de configuraciones críticas y la supervisión de consistencia entre servicios.

La generación automatizada de planes de despliegue, mapas de variables de entorno y *smoke tests* permitió verificar que existía trazabilidad completa entre los criterios de aceptación definidos en BDD durante la Fase 1 y el comportamiento observable del sistema en producción.

Todo ello converge en una conclusión central: *Specific-Driven Development* no constituye simplemente una técnica de *prompting* avanzada, sino una respuesta metodológica al problema de la entropía generativa inherente a los sistemas basados en IA.

Frente al paradigma del *vibecoding* —caracterizado por velocidad sin control, iteración sin trazabilidad y generación sin restricciones— el enfoque SDD propone un modelo donde:

* la ambigüedad se combate mediante formalización,  
* la variabilidad se reduce mediante restricciones,  
* y la velocidad se sostiene mediante trazabilidad estructural.

El caso práctico desarrollado demuestra que es posible recorrer el ciclo completo de desarrollo —desde una conversación desestructurada con un cliente hasta un sistema multimodal operativo en producción— en tiempos extremadamente reducidos, siempre que cada fase se apoye sobre artefactos formales capaces de actuar como fuentes únicas de verdad.

No obstante, sería incorrecto presentar este enfoque como una solución mágica o completamente autónoma.

El Perfil 3 —el único capaz de producir artefactos realmente robustos— exigía conocimientos sólidos de arquitectura *software*, metodologías ágiles, diseño de sistemas, seguridad, *testing* y *prompt engineering* avanzado. La IA no sustituyó al ingeniero; amplificó su capacidad de análisis, síntesis y ejecución.

Este trabajo confirma así otra idea fundamental: un mal ingeniero con una IA potente seguirá produciendo deuda técnica, solo que a mayor velocidad. Por el contrario, un ingeniero con criterio metodológico y capacidad de orquestación puede alcanzar niveles de productividad y calidad que hace apenas unos años requerían equipos completos de desarrollo.

En última instancia, la aportación principal de este trabajo no reside en afirmar que la IA cambiará la ingeniería de *software* —algo ya ampliamente asumido—, sino en demostrar empíricamente que la diferencia entre caos generativo e ingeniería disciplinada no depende de la herramienta utilizada, sino del método aplicado para gobernarla.

## 7.2 Workflow Completo {#7.2-workflow-completo}

A modo de síntesis operativa, el flujo de trabajo que se ha validado a lo largo del caso práctico puede representarse como un *pipeline* metodológico continuo donde cada fase consume el artefacto de salida de la anterior y produce el artefacto de entrada para la siguiente. La clave no está en la sofisticación de cada etapa por separado, sino en la trazabilidad que las une.

**Fase 1 — De la ambigüedad a la especificación ejecutable.**  
*Entrada:* Transcripción desestructurada del cliente, cargada de ruido conversacional, contradicciones y requisitos implícitos.

*Proceso:* El ingeniero, actuando como arquitecto orquestador, aplica un *prompt* maestro estructurado en tres capas (rol de sistema, instrucción de tarea y restricciones de formato). La IA, operando bajo el paradigma de Cero Asunciones, extrae requisitos funcionales y no funcionales, identifica riesgos arquitectónicos, plantea *trade-offs* tecnológicos y redacta historias de usuario en formato BDD con criterios de aceptación verificables.

*Salida:* Documento de Especificación Técnica (TECHNICAL-SPECIFICATION.md) que actúa como única fuente de verdad para el resto del proyecto.

*Condición crítica:* Sin restricciones de formato explícitas y sin la exigencia de BDD, la salida degenera al nivel del Perfil 1 o 2\.

**Fase 2 — De la especificación al código funcional.**  
*Entrada:* TECHNICAL-SPECIFICATION.md \+ decisiones arquitectónicas confirmadas.

*Proceso:* Se configura el *workspace* con reglas de gobernanza (instructions.md), se instalan *skills* especializadas como módulos de conocimiento y se crean agentes de dominio con documentación estática local. Se establece una taxonomía de modelos (razonamiento para planificación, ejecución para codificación) y se genera el prototipo visual mediante Google Stitch aplicando una plantilla de *prompt* de cinco dominios. La implementación sigue un ciclo de TDD asistido donde la IA genera primero los *tests* y después el código que los satisface, operando bajo el paradigma ReAct para autocorregir fallos de ejecución.

*Salida:* Sistema *full-stack* funcional (React 19 \+ FastAPI \+ Supabase) con *endpoints* documentados automáticamente vía Swagger, componentes UI exportables y cobertura de pruebas unitarias.

*Condición crítica:* Sin la documentación estática local en los agentes especializados, la IA alucina sintaxis obsoletas o parámetros inexistentes. Sin el ciclo TDD previo, el código generado carece de validación estructural.

**Fase 3 — Del código funcional al sistema validado.**  
*Entrada:* Repositorio completo con código fuente, migraciones SQL y configuración de servicios.

*Proceso:* Se despliegan tres agentes de auditoría especializados: QA-Security-Agent para vulnerabilidades de seguridad (CORS, secretos expuestos, RLS), QA-Integration-Agent para pruebas de integración sobre WebSockets, persistencia y APIs externas, y un agente multimodal de accesibilidad para verificar cumplimiento WCAG 2.1. Cada agente opera sobre su dominio con reglas de auditoría inyectadas en el *system prompt* y propone —o ejecuta— remediaciones concretas.

*Salida:* Sistema *hardened* con vulnerabilidades críticas corregidas, políticas RLS reforzadas, *tests* de integración pasando en verde y atributos de accesibilidad integrados en el *frontend*.

*Condición crítica:* La auditoría debe ser un proceso activo, no un *linter* pasivo. Si el agente solo reporta sin corregir, los hallazgos se acumulan y no se resuelven.

**Fase 4 — Del sistema validado al sistema en producción.**  
*Entrada:* Sistema validado \+ stack tecnológico confirmado (Vercel, Render, Supabase).

*Proceso:* La IA genera un Plan de Despliegue Determinista con secuencia ordenada por dependencias (datos → *backend* → *frontend*), un mapa de variables de entorno clasificadas por criticidad y ámbito, y un *checklist* de *smoke tests*. El despliegue se ejecuta mediante las abstracciones nativas de cada plataforma (conexión GitHub, detección automática de *runtime*, *build* y *deploy* continuos). La IA actúa como asesora de configuración y validadora post-despliegue, no como generadora de infraestructura.

*Salida:* Sistema operativo en producción con trazabilidad verificada entre los criterios de aceptación BDD de la Fase 1 y el comportamiento real en las URLs de producción.

*Condición crítica:* Las variables de entorno sensibles requieren intervención humana en los *dashboards* de las plataformas. La IA no puede —ni debe— gestionar secretos de forma autónoma.

Lo relevante de este *workflow* no es su complejidad —que es moderada— sino su reproducibilidad. Durante mi estancia en iAR, he podido aplicar este mismo esquema a proyectos de naturaleza distinta con resultados notablemente consistentes. La estructura de fases, la exigencia de artefactos formales entre etapas y la separación entre planificación y ejecución no son patrones ligados a un *stack* concreto, sino principios metodológicos transferibles.

El flujo pone de manifiesto, además, un principio que considero fundamental: la IA funciona mejor cuando se le pide menos, pero se le exige más. Menos ambigüedad en la entrada, más restricciones en la salida. Menos confianza en su "criterio", más validación humana en los puntos de decisión. Menos generación indiscriminada, más trazabilidad entre lo que se pide, lo que se construye y lo que se verifica.

## 7.3 Trabajo futuro {#7.3-trabajo-futuro}

Como todo trabajo de investigación aplicada, el presente estudio abre más preguntas de las que cierra. La principal limitación es evidente: el caso práctico se desarrolló en un contexto muy acotado —un solo desarrollador, un *stack* tecnológico concreto (OpenAI, ElevenLabs, Supabase, Vercel, Render), un plazo de semana y media y un alcance de MVP—. Extrapolar las conclusiones a entornos empresariales con equipos distribuidos, sistemas heredados complejos o requisitos regulatorios estrictos requiere cautela y, sobre todo, más experimentación.

A continuación, se esbozan las líneas de trabajo futuro que, a mi juicio, merecen ser exploradas:

**Validación del marco SDD en equipos multidisciplinares.** El caso práctico se ejecutó de forma individual, con un único ingeniero orquestando todas las fases. Queda por validar cómo se comporta este mismo enfoque cuando intervienen varios desarrolladores, cada uno interactuando con agentes distintos y compartiendo artefactos formales entre fases. La gestión de la consistencia del *workspace* (instructions.md compartido, *skills* sincronizadas, conflictos de fusión en artefactos generados por IA) introduce desafíos de gobernanza colaborativa que no se han abordado aquí.

**Evaluación del *vendor lock-in* metodológico.** Como se ha señalado en la Fase 4, la abstracción que ofrecen plataformas como Vercel, Render y Supabase conlleva un acoplamiento implícito. Un trabajo futuro debería replicar el caso práctico con *stacks* alternativos —por ejemplo, Next.js en lugar de React SPA, AWS Lambda en lugar de Render, o modelos *open-source* como Llama 3 en lugar de OpenAI— para medir cuánto del éxito obtenido es atribuible a la metodología y cuánto a las decisiones concretas de plataforma.

**Orquestación multi-agente concurrente.** Los agentes especializados del caso práctico operaron de forma secuencial: primero el de especificación, luego los de implementación, después los de auditoría. Una evolución natural sería explorar arquitecturas donde varios agentes colaboren en paralelo —por ejemplo, un agente de *frontend* y otro de *backend* trabajando simultáneamente sobre la misma especificación, coordinados por un agente orquestador que resuelva conflictos de contrato en tiempo real—. Esto acercaría el paradigma a la dinámica real de un equipo de desarrollo humano.

**Desarrollo de métricas cuantitativas para la calidad del output de IA.** La matriz de evaluación comparativa de la Fase 1 es cualitativa y, aunque útil, depende del criterio del evaluador. Sería deseable avanzar hacia métricas automatizadas: porcentaje de criterios de aceptación que compilan directamente como *tests*, tasa de riesgos arquitectónicos identificados frente a los emergidos en producción, o índice de trazabilidad entre requisitos y artefactos generados. Esto permitiría comparar objetivamente distintos enfoques de *prompting* y distintos modelos.

**Automatización del ciclo completo de *Product Owner* asistido.** El caso práctico se centró en la generación de especificaciones y su implementación, pero el rol del *Product Owner* —priorización de *backlog*, refinamiento continuo, gestión de *stakeholders*— sigue siendo predominantemente humano. Explorar hasta qué punto la IA puede asistir en la priorización dinámica de historias de usuario basada en métricas de producción o *feedback* de usuario es un campo prometedor.

**Evaluación del impacto en la curva de aprendizaje.** Una cuestión que me ronda desde que terminé la implementación es si este enfoque acelera o ralentiza la formación de ingenieros junior. Por un lado, la IA resuelve tareas que antes requerían horas de documentación y ensayo-error; por otro, existe el riesgo de que el desarrollador en formación no adquiera los fundamentos subyacentes al delegar sistemáticamente en el modelo. Un estudio longitudinal con estudiantes o *junior developers* sería esclarecedor.

**Integración de verificación formal.** Las auditorías de la Fase 3 se basaron en análisis estático y pruebas de integración, pero no abordaron la verificación formal de propiedades del sistema (ausencia de *deadlocks* en WebSockets, invariantes de consistencia en la base de datos). La combinación de IA generativa con métodos formales es un territorio apenas explorado que podría elevar significativamente las garantías sobre sistemas críticos.

En conjunto, estas líneas de trabajo no hacen sino confirmar que el campo de la ingeniería de *software* asistida por IA está en un momento de efervescencia donde cada respuesta abre varias preguntas nuevas. El presente trabajo aspira a ser una contribución modesta pero fundamentada a ese debate.

## 7.4 Lecciones aprendidas

Si tuviera que resumir en una sola frase lo que me llevo de estos meses de trabajo —entre la investigación teórica, el caso práctico y la experiencia en iAR—, sería esta: la IA no es un atajo, es un multiplicador. Multiplica la calidad de quien la gobierna con criterio y multiplica el desastre de quien la usa sin método. No hay término medio.

Escribo este apartado en primera persona porque las lecciones que siguen no son conclusiones académicas, sino impresiones forjadas en horas de *prompts*, errores de compilación, correcciones a las dos de la mañana y algún que otro momento de genuina sorpresa al ver lo que un agente bien configurado era capaz de hacer.

La lección más valiosa sin duda es que el *prompt* es el nuevo código fuente. Cuando empecé el proyecto, confieso que yo también caía en la tentación del *vibecoding*, de soltarle a la IA una idea vaga y esperar un milagro. La Fase 1 me quitó todas las ganas. Vi con mis propios ojos cómo una misma transcripción producía basura estructurada o una especificación de nivel profesional en función de cómo se formulaba el *prompt*. Desde entonces, cada vez que me siento frente al IDE, la primera pregunta que me hago no es "¿qué quiero que la IA haga?", sino "¿qué restricciones necesito imponer para que lo haga bien?". Parece una sutileza, pero es un cambio de mentalidad radical.

La velocidad sin estructura es deuda técnica garantizada. Durante la Fase 2 hubo momentos en los que la IA generaba cientos de líneas de código en segundos. La sensación de productividad era embriagadora. Pero cuando el mismo agente especializado detectaba al día siguiente que varias funciones no estaban correctamente conectadas con la capa de autenticación, entendí que esa velocidad era ficticia: lo que ganaba en escritura lo perdía —con intereses— en depuración. A partir de ahí incorporé el TDD asistido como norma: primero los *tests*, luego el código. La velocidad neta del desarrollo bajó, sí, pero la velocidad real —la de entregar algo que funciona— se disparó.

La seguridad no es negociable, y la IA no la prioriza por defecto. El momento más revelador de la Fase 3 fue cuando el QA-Security-Agent encontró una clave de API de ElevenLabs expuesta en un *endpoint* público. Ese código lo había generado la IA y yo lo había revisado, y aun así se me pasó. La IA había optimizado la funcionalidad, no la seguridad. Esto me enseñó que la auditoría no puede ser un pensamiento tardío: tiene que ser un agente más del *pipeline*, con sus propias reglas, su propio contexto y su propia ejecución automatizada en cada iteración.

La accesibilidad no aparece si no la pides explícitamente. Relacionado con lo anterior, pero con un matiz distinto: mientras que la seguridad es algo que sabes que tienes que vigilar, la accesibilidad es algo que simplemente no se te pasa por la cabeza hasta que alguien te lo señala. Ver cómo un lector de pantallas era incapaz de navegar por el *chatbot* que yo mismo había diseñado fue un golpe de realidad. Desde entonces, las reglas WCAG forman parte de mi *instructions.md* por defecto, y el agente de a11y se ejecuta en cada iteración del *frontend*.

El ecosistema PaaS ha cambiado las reglas del despliegue. Hace unos años, poner un sistema en producción significaba configurar servidores, instalar *runtimes*, gestionar certificados y rezar para que nada se cayera. Hoy, con Vercel, Render y Supabase, el 90% de ese trabajo ha desaparecido. Lo que queda —y es donde la IA aporta valor real— es la fase de planificación: decidir el orden correcto, mapear las variables de entorno sin mezclar secretos con configuración pública, y verificar que todo funciona en conjunto. La infraestructura se ha vuelto commodity; la orquestación sigue siendo territorio del ingeniero.

Aprender a hablar con la IA es una competencia profesional de primer orden. Al inicio del grado, nadie me enseñó *prompt engineering*. No estaba en el plan de estudios. Sin embargo, tras este proyecto, estoy convencido de que debería estarlo. Saber estructurar un *prompt* con roles, restricciones y formatos de salida es tan importante como saber estructurar una clase o una consulta SQL. No es un hype pasajero ni una moda de *influencers* tecnológicos: es una habilidad que separa a quien usa la IA como un juguete de quien la usa como una herramienta de ingeniería.

Y si algo he aprendido en este viaje es que el futuro no es de quien mejor programa, sino de quien mejor sabe mandar y de quien en su día a día aplica la ingeniería a todo su entorno. Porqué ingeniero no se nace, se hace. 

# 

# 

# 

# 

# 9\. Referencias

\[1\] Lenny's Newsletter, State of the Product Job Market. 2026\. \[Online\]. Available: [https://www.lennysnewsletter.com/p/state-of-the-product-job-market-in-ee9](https://www.lennysnewsletter.com/p/state-of-the-product-job-market-in-ee9). \[Accessed: May. 13, 2026\].

\[2\] Hiring Lab, January Labor Market Update: Jobs Mentioning AI Are Growing Amid Broader Hiring Weakness. 2026\. \[Online\]. Available: [https://www.hiringlab.org/2026/01/22/january-labor-market-update-jobs-mentioning-ai-are-growing-amid-broader-hiring-weakness/](https://www.hiringlab.org/2026/01/22/january-labor-market-update-jobs-mentioning-ai-are-growing-amid-broader-hiring-weakness/). \[Accessed: May. 13, 2026\].

\[3\] LinkedIn Economic Graph, Labor Market Report: Building a Future of Work That Works. 2026\. \[Online\]. Available: [https://economicgraph.linkedin.com/content/dam/me/economicgraph/en-us/PDF/linkedIn-labor-market-report-building-a-future-of-work-that-works-jan-2026.pdf](https://economicgraph.linkedin.com/content/dam/me/economicgraph/en-us/PDF/linkedIn-labor-market-report-building-a-future-of-work-that-works-jan-2026.pdf). \[Accessed: May. 13, 2026\].

\[4\] Jonas.rs, Report Summary: GitClear AI Code Quality Research 2025\. 2025\. \[Online\]. Available: [https://www.jonas.rs/2025/02/09/report-summary-gitclear-ai-code-quality-research-2025.html](https://www.jonas.rs/2025/02/09/report-summary-gitclear-ai-code-quality-research-2025.html). \[Accessed: May. 13, 2026\].

\[5\] GitClear, AI Assistant Code Quality 2025 Research. 2025\. \[Online\]. Available: [https://www.gitclear.com/ai\_assistant\_code\_quality\_2025\_research](https://www.gitclear.com/ai_assistant_code_quality_2025_research). \[Accessed: May. 13, 2026\].

\[6\] CodeRabbit, State of AI vs Human Code Generation Report. 2026\. \[Online\]. Available: [https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-repor](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-repor). \[Accessed: May. 13, 2026\].

\[7\] ACM Digital Library, DOI 10.1145/3613904.3642919. 2026\. \[Online\]. Available: [https://dl.acm.org/doi/full/10.1145/3613904.3642919](https://dl.acm.org/doi/full/10.1145/3613904.3642919). \[Accessed: May. 13, 2026\].

\[8\] Wikipedia, Paradoja de Fermi. 2026\. \[Online\]. Available: [https://es.wikipedia.org/wiki/Paradoja\_de\_Fermi](https://es.wikipedia.org/wiki/Paradoja_de_Fermi). \[Accessed: May. 13, 2026\].

\[9\] ResearchGate, The Dead Internet Theory: A Survey on Artificial Interactions and the Future of Social Media. 2026\. \[Online\]. Available: [https://www.researchgate.net/publication/387764031\_The\_Dead\_Internet\_Theory\_A\_Survey\_on\_Artificial\_Interactions\_and\_the\_Future\_of\_Social\_Media](https://www.researchgate.net/publication/387764031_The_Dead_Internet_Theory_A_Survey_on_Artificial_Interactions_and_the_Future_of_Social_Media). \[Accessed: May. 13, 2026\].

\[10\] GitHub, The State of the Octoverse 2016\. 2016\. \[Online\]. Available: [https://octoverse.github.com/2016/](https://octoverse.github.com/2016/). \[Accessed: May. 13, 2026\].

\[11\] GitHub, Octoverse: The state of open source and AI. GitHub Blog. 2025\. \[Online\]. Available: [https://github.blog/news-insights/octoverse/](https://github.blog/news-insights/octoverse/). \[Accessed: May. 13, 2026\].

\[12\] Microsoft, GitHub Universe 2025: Where developer innovation took center stage. Azure Blog. 2025\. \[Online\]. Available: [https://azure.microsoft.com/en-us/blog/github-universe-2025-where-developer-innovation-took-center-stage/](https://azure.microsoft.com/en-us/blog/github-universe-2025-where-developer-innovation-took-center-stage/). \[Accessed: May. 13, 2026\].

\[13\] Jacobs, R. A., Jordan, M. I., Nowlan, S. J. & Hinton, G. E., Adaptive Mixtures of Local Experts. Neural Computation, 3(1), 79-87. 1991\. \[Online\]. Available: [https://doi.org/10.1162/neco.1991.3.1.79](https://doi.org/10.1162/neco.1991.3.1.79). \[Accessed: May. 13, 2026\].

\[14\] Shazeer, N., Mirhoseini, A., Maziarz, K., Davis, A., Le, Q., Hinton, G. & Dean, J., Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer. arXiv:1701.06538. 2017\. \[Online\]. Available: [https://arxiv.org/abs/1701.06538](https://arxiv.org/abs/1701.06538). \[Accessed: May. 13, 2026\].

\[15\] IBM, What is mixture of experts?. 2026\. \[Online\]. Available: [https://www.ibm.com/think/topics/mixture-of-experts](https://www.ibm.com/think/topics/mixture-of-experts). \[Accessed: May. 13, 2026\].

\[16\] Lavaee, A., Gemini 3.1 Pro, Opus 4.6, and Codex 5.3: A Technical Breakdown. 2026\. \[Online\]. Available: [https://alexlavaee.me/blog/gemini-3-1-pro-opus-codex-technical-comparison/](https://alexlavaee.me/blog/gemini-3-1-pro-opus-codex-technical-comparison/). \[Accessed: May. 13, 2026\].

\[17\] Patel, S., 12+ AI Models in March 2026: The Week That Changed AI. Medium. 2026\. \[Online\]. Available: [https://medium.com/@sanjeevpatel3007/12-ai-models-in-march-2026-the-week-that-changed-ai-bb21c6624036](https://medium.com/@sanjeevpatel3007/12-ai-models-in-march-2026-the-week-that-changed-ai-bb21c6624036). \[Accessed: May. 13, 2026\].

\[18\] Fedus, W., Zoph, B. & Shazeer, N., Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity. JMLR. arXiv:2101.03961. 2022\. \[Online\]. Available: [https://arxiv.org/abs/2101.03961](https://arxiv.org/abs/2101.03961). \[Accessed: May. 13, 2026\].

\[19\] Google Cloud, Gemini 3.1 Pro | Generative AI on Vertex AI. 2026\. \[Online\]. Available: [https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-1-pro](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-1-pro). \[Accessed: May. 13, 2026\].

\[20\] Anthropic, Introducing Claude Opus 4.6. 2026\. \[Online\]. Available: [https://www.anthropic.com/news/claude-opus-4-6](https://www.anthropic.com/news/claude-opus-4-6). \[Accessed: May. 13, 2026\].

\[21\] OpenRouter, Trinity Mini vs GPT-5.4 \- AI Model Comparison. 2026\. \[Online\]. Available: [https://openrouter.ai/compare/arcee-ai/trinity-mini/openai/gpt-5.4](https://openrouter.ai/compare/arcee-ai/trinity-mini/openai/gpt-5.4). \[Accessed: May. 13, 2026\].

\[22\] DeepLearning.AI, Claude Opus 4.6 Thinks Smarter, xAI Joins SpaceX... The Batch, Issue 340\. 2026\. \[Online\]. Available: [https://www.deeplearning.ai/the-batch/issue-340/](https://www.deeplearning.ai/the-batch/issue-340/). \[Accessed: May. 13, 2026\].

\[23\] Wei, J. et al., Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. NeurIPS 2022\. arXiv:2201.11903. 2022\. \[Online\]. Available: [https://arxiv.org/abs/2201.11903](https://arxiv.org/abs/2201.11903). \[Accessed: May. 13, 2026\].

\[24\] NxCode, Claude Code vs Cursor 2026: Which Is Better for Building Real Apps?. 2026\. \[Online\]. Available: [https://www.nxcode.io/resources/news/claude-code-vs-cursor-which-is-better-2026](https://www.nxcode.io/resources/news/claude-code-vs-cursor-which-is-better-2026). \[Accessed: May. 13, 2026\].

\[25\] Microsoft Learn, Use Agent Mode \- Visual Studio (Windows). 2026\. \[Online\]. Available: [https://learn.microsoft.com/en-us/visualstudio/ide/copilot-agent-mode?view=visualstudio](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-agent-mode?view=visualstudio). \[Accessed: May. 13, 2026\].

\[26\] Idlen.io, Claude Code vs GitHub Copilot Workspace vs Cursor Composer. 2026\. \[Online\]. Available: [https://www.idlen.io/blog/claude-code-vs-copilot-workspace-vs-cursor-composer](https://www.idlen.io/blog/claude-code-vs-copilot-workspace-vs-cursor-composer). \[Accessed: May. 13, 2026\].

\[27\] Google AI, Long context | Gemini API | Google AI for Developers. 2026\. \[Online\]. Available: [https://ai.google.dev/gemini-api/docs/long-context](https://ai.google.dev/gemini-api/docs/long-context). \[Accessed: May. 13, 2026\].

\[28\] Anthropic, Building with extended thinking \- Claude API Docs. 2026\. \[Online\]. Available: [https://platform.claude.com/docs/en/build-with-claude/extended-thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking). \[Accessed: May. 13, 2026\].

\[29\] Hyperion Consulting, The Complete Ollama Enterprise Deployment Guide (2026). 2026\. \[Online\]. Available: [https://hyperion-consulting.io/ar/insights/ollama-enterprise-deployment-guide-2026](https://hyperion-consulting.io/ar/insights/ollama-enterprise-deployment-guide-2026). \[Accessed: May. 13, 2026\].

\[30\] Wikipedia, Model Context Protocol. 2026\. \[Online\]. Available: [https://en.wikipedia.org/wiki/Model\_Context\_Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol). \[Accessed: May. 13, 2026\].

\[31\] Databricks, What is the Model Context Protocol (MCP)?. 2026\. \[Online\]. Available: [https://www.databricks.com/blog/what-is-model-context-protocol](https://www.databricks.com/blog/what-is-model-context-protocol). \[Accessed: May. 13, 2026\].

\[32\] Neo4j, What Is Model Context Protocol (MCP)?. 2026\. \[Online\]. Available: [https://neo4j.com/blog/genai/what-is-model-context-protocol-mcp/](https://neo4j.com/blog/genai/what-is-model-context-protocol-mcp/). \[Accessed: May. 13, 2026\].

\[33\] Anthropic / Linux Foundation, Donating the Model Context Protocol and establishing the Agentic AI Foundation. 2026\. \[Online\]. Available: [https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation). \[Accessed: May. 13, 2026\].

\[34\] Model Context Protocol, Architecture (Specification v2025-06-18). 2026\. \[Online\]. Available: [https://modelcontextprotocol.io/specification/2025-06-18/architecture](https://modelcontextprotocol.io/specification/2025-06-18/architecture). \[Accessed: May. 13, 2026\].

\[35\] Model Context Protocol, Understanding MCP servers. 2026\. \[Online\]. Available: [https://modelcontextprotocol.io/docs/learn/server-concepts](https://modelcontextprotocol.io/docs/learn/server-concepts). \[Accessed: May. 13, 2026\].

\[36\] Elastic, What is the Model Context Protocol (MCP)?. 2026\. \[Online\]. Available: [https://www.elastic.co/what-is/mcp](https://www.elastic.co/what-is/mcp). \[Accessed: May. 13, 2026\].

\[37\] Loginsoft, MCP vs API: What's the Actual Difference and When to Use Each. 2026\. \[Online\]. Available: [https://www.loginsoft.com/post/mcp-vs-api-whats-the-actual-difference-and-when-to-use-each](https://www.loginsoft.com/post/mcp-vs-api-whats-the-actual-difference-and-when-to-use-each). \[Accessed: May. 13, 2026\].

\[38\] Roo Code Documentation, MCP vs REST APIs: A Fundamental Distinction. 2026\. \[Online\]. Available: [https://docs.roocode.com/features/mcp/mcp-vs-api](https://docs.roocode.com/features/mcp/mcp-vs-api). \[Accessed: May. 13, 2026\].

\[39\] Scalekit, MCP vs API: How are they different?. 2026\. \[Online\]. Available: [https://www.scalekit.com/blog/mcp-vs-apis-how-are-they-different](https://www.scalekit.com/blog/mcp-vs-apis-how-are-they-different). \[Accessed: May. 13, 2026\].

\[40\] ServiceNow, ¿Qué son los agentes autónomos?. 2026\. \[Online\]. Available: [https://www.servicenow.com/latam/ai/what-are-autonomous-agents.html](https://www.servicenow.com/latam/ai/what-are-autonomous-agents.html). \[Accessed: May. 13, 2026\].

\[41\] GoodData, AI Agent Workflows: Everything You Need to Know. 2026\. \[Online\]. Available: [https://www.gooddata.com/blog/ai-agent-workflows-everything-you-need-to-know/](https://www.gooddata.com/blog/ai-agent-workflows-everything-you-need-to-know/). \[Accessed: May. 13, 2026\].

\[42\] Kore.ai, Choosing the right orchestration pattern for multi-agent systems. 2026\. \[Online\]. Available: [https://www.kore.ai/blog/choosing-the-right-orchestration-pattern-for-multi-agent-systems](https://www.kore.ai/blog/choosing-the-right-orchestration-pattern-for-multi-agent-systems). \[Accessed: May. 13, 2026\].

\[43\] Google Cloud, ¿Qué es un sistema multiagente en la IA?. 2026\. \[Online\]. Available: [https://cloud.google.com/discover/what-is-a-multi-agent-system?hl=es-419](https://cloud.google.com/discover/what-is-a-multi-agent-system?hl=es-419). \[Accessed: May. 13, 2026\].

\[44\] Vellum AI, Agentic Workflows in 2026: The ultimate guide. 2026\. \[Online\]. Available: [https://vellum.ai/blog/agentic-workflows-emerging-architectures-and-design-patterns](https://vellum.ai/blog/agentic-workflows-emerging-architectures-and-design-patterns). \[Accessed: May. 13, 2026\].

\[45\] Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K. & Cao, Y., ReAct: Synergizing Reasoning and Acting in Language Models. arXiv:2210.03629. 2022\. \[Online\]. Available: [https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629). \[Accessed: May. 13, 2026\].

\[46\] IBM, ¿Qué es un sistema multiagente?. 2026\. \[Online\]. Available: [https://www.ibm.com/es-es/think/topics/multiagent-system](https://www.ibm.com/es-es/think/topics/multiagent-system). \[Accessed: May. 13, 2026\].

\[47\] Agility at Scale, Multi-Agent Systems for the Enterprise: Architecture and Coordination. 2026\. \[Online\]. Available: [https://agility-at-scale.com/ai/agents/multi-agent-systems/](https://agility-at-scale.com/ai/agents/multi-agent-systems/). \[Accessed: May. 13, 2026\].

\[48\] Redis, Multi-agent systems: Why coordinated AI beats going solo. 2026\. \[Online\]. Available: [https://redis.io/blog/multi-agent-systems-coordinated-ai/](https://redis.io/blog/multi-agent-systems-coordinated-ai/). \[Accessed: May. 13, 2026\].

\[49\] n8n, Self-hosted AI starter kit / n8n Workflow Automation. 2026\. \[Online\]. Available: [https://n8n.io/](https://n8n.io/). \[Accessed: May. 13, 2026\].

