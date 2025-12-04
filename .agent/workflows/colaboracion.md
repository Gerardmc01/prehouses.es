---
description: Workflow para trabajar colaborativamente sin conflictos
---

# Workflow de Colaboración en GitHub

Este workflow asegura que tú y tu amigo puedan trabajar simultáneamente en el proyecto sin conflictos.

## Antes de Hacer Cualquier Cambio

**SIEMPRE ejecuta estos comandos primero:**

```bash
cd "e:/Codigo gravity/prehouses"
git pull origin main
```

Esto descarga los últimos cambios que tu amigo haya hecho.

## Hacer Cambios en el Código

1. **Edita los archivos** que necesites modificar
2. **Verifica los cambios** con:
   ```bash
   git status
   ```

## Guardar y Subir Cambios

```bash
# Agregar todos los cambios
git add .

# Hacer commit con un mensaje descriptivo
git commit -m "Descripción clara de los cambios realizados"

# Subir al repositorio
git push origin main
```

## Si Hay Conflictos al Hacer Push

Si ves un error como "Updates were rejected", significa que tu amigo subió cambios mientras trabajabas:

```bash
# Descargar los cambios de tu amigo
git pull origin main

# Si hay conflictos, Git te mostrará qué archivos tienen problemas
# Abre esos archivos y busca las marcas de conflicto:
# <<<<<<< HEAD
# Tu código
# =======
# Código de tu amigo
# >>>>>>> 

# Edita manualmente para resolver el conflicto
# Luego:
git add .
git commit -m "Resolver conflictos de merge"
git push origin main
```

## Workflow Automático para Antigravity

Cuando trabajes conmigo (Antigravity), yo me encargaré automáticamente de:

1. ✅ Hacer `git pull` antes de cualquier cambio
2. ✅ Hacer `git add`, `git commit`, y `git push` después de los cambios
3. ✅ Notificarte si hay conflictos que requieren resolución manual

## Buenas Prácticas

- 🔄 **Sincroniza frecuentemente**: Haz `git pull` cada vez que vayas a empezar a trabajar
- 💬 **Commits descriptivos**: Usa mensajes claros como "Agregar página de contacto" o "Corregir error en formulario"
- 🚀 **Push frecuente**: Sube tus cambios regularmente para que tu amigo los vea
- 📱 **Comunícate**: Avísale a tu amigo cuando estés trabajando en archivos específicos

## Verificar Estado del Repositorio

```bash
# Ver el estado actual
git status

# Ver el historial de commits
git log --oneline -10

# Ver qué archivos cambiaron
git diff
```

## Render Auto-Deploy

Cada vez que hagas `git push`, Render detectará automáticamente los cambios y redesplegará la web. Espera 2-3 minutos para ver los cambios en producción.
