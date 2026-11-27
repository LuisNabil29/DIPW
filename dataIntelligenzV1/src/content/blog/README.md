# Cómo publicar un artículo en el blog

Cada archivo `.md` de esta carpeta es un artículo. Este `README.md` no se publica.

1. Crea un archivo nuevo con el nombre que quieras para la URL, por ejemplo `mi-articulo.md`. Quedará en `/blog/mi-articulo`.
2. Copia la plantilla de abajo, llena el encabezado y escribe el contenido en Markdown.
3. Haz commit y push a `main`. GitHub Actions compila y publica el sitio en Hostinger.

```markdown
---
title: "Título del artículo"
date: 2026-12-01
author: DataIntelligenz
category: Inteligencia Artificial
excerpt: "Resumen de una o dos frases que aparece en las tarjetas."
tags: [IA, ERP]
featured: false
---

Primer párrafo del artículo.

## Un subtítulo

Texto, **negritas**, [enlaces](/contacto), listas y tablas.
```

## Campos del encabezado

| Campo | Obligatorio | Descripción |
|---|---|---|
| `title` | Sí | Título visible. Usa comillas si lleva dos puntos. |
| `date` | Sí | Fecha `AAAA-MM-DD`. Los artículos se ordenan del más reciente al más antiguo. |
| `excerpt` | Sí | Resumen corto para tarjetas y vista previa. Usa comillas. |
| `category` | No | Agrupa los artículos en el filtro del blog. Por defecto `General`. |
| `author` | No | Por defecto `DataIntelligenz`. |
| `tags` | No | Lista entre corchetes: `[IA, ERP]`. |
| `featured` | No | `true` lo muestra primero en la página de inicio. |
| `readTime` | No | Minutos de lectura. Si se omite se calcula solo. |
| `slug` | No | Cambia la URL. Por defecto es el nombre del archivo. |
| `cover` | No | Ruta de una imagen en `public/`, por ejemplo `/assets/blog/mi-imagen.jpg`. |
| `draft` | No | `true` oculta el artículo sin borrarlo. |

Cada campo va en una sola línea con el formato `campo: valor`.
