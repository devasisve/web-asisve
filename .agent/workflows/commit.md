---
description: Estándar Global de Commits Profesionales (Conventional Commits)
---

Este workflow asegura que todos los cambios en el repositorio sigan la convención global de `Conventional Commits`.

### 📝 Guía Rápida de Tipos
- **feat**: Nueva funcionalidad para el usuario.
- **fix**: Corrección de un error.
- **docs**: Cambios en la documentación.
- **style**: Cambios estéticos (espacios, formateo) sin afectar lógica.
- **refactor**: Mejora de código que no cambia comportamiento.
- **perf**: Cambios destinados a mejorar el rendimiento.
- **test**: Añadir o corregir pruebas unitarias.
- **chore**: Mantenimiento general (configuraciones, dependencias).

### ⚙️ Pasos del Workflow
1. **Identificar**: Lee los cambios realizados en el `git diff`.
2. **Analizar Atomicidad**: Si los cambios tocan múltiples funcionalidades o capas (ej: UI y Config), DEBES separarlos en commits independientes.
3. **Clasificar**: Elige el tipo correcto (`feat`, `fix`, `build`, etc.) para cada grupo atómico.
4. **Redactar**: Escribe el mensaje en presente, indicando el 'qué' (descripción corta) y el 'por qué' (detalles en el cuerpo si es complejo).
5. **Validar**: Asegurar que la descripción sea corta (< 70 chars) pero contextual.
6. **Ejecutar**: Realizar cada commit por separado y finalmente el push.