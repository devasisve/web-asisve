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
2. **Clasificar**: Elige el tipo correcto según la lista anterior.
3. **Redactar**: Escribe el mensaje en presente, indicando el 'qué' (descripción) y el 'por qué' (si es necesario en el cuerpo).
4. **Validar**: Asegurar que la descripción no exceda los 70 caracteres.
5. **Ejecutar**: Realizar el commit final.Luego el push