---
name: actualizar-sitio-clickup
description: >-
  Actualiza la sección Apps y Desarrollos del sitio DataIntelligenz desde la
  lista SitioData de ClickUp y, al terminar, hace commit y push a main.
  Usar cuando pidan actualizar, publicar o rediseñar la página de forma
  periódica a partir de ClickUp, SitioData o las tareas en estado publicar.
---

# Actualizar el sitio desde SitioData

La lista [SitioData](https://app.clickup.com/9014170949/v/li/901422251480) es la única fuente de las tarjetas. Workspace `9014170949`, lista `901422251480`.

Publica solo las tareas en estado `publicar`. Ignora `ocultar`, `archivar` y los campos heredados del espacio (montos, garantía, módulo, forma de pago).

## Por cada tarea en publicar

Lee el nombre, la descripción, el campo `URL`, el campo `YouTube` y los adjuntos.

| Dato de ClickUp | Tarjeta |
|---|---|
| Nombre | `title` |
| Descripción | `description`, una o dos frases bajo la miniatura |
| `URL` | `siteUrl` |
| `YouTube` | `videoUrl` (también acepta una liga de Loom) |
| Adjunto PDF | `pdfUrl` en `dataIntelligenzV1/public/pdfs/{Nombre}.pdf` |
| Imagen jpg/png de la app | `imgUrl` |

Si la descripción está vacía, abre la página del campo `URL` y redacta una o dos frases en español sobre lo que hace la aplicación. Guarda ese texto en la descripción de la tarea y úsalo en la tarjeta. Si la descripción ya tiene texto, úsalo tal cual.

Si la tarea no tiene imagen de la app, genera una miniatura 4:3 y adjúntala a la tarea antes de copiarla al sitio. Mismo sistema visual en todas: fondo `#f3f4f6`, tarjeta blanca, borde gris, acento `#a9173e`, pocas palabras en español, el nombre del producto y su función principal. Guárdala en `dataIntelligenzV1/public/assets/FigDesarrollos/{Nombre}-thumbnail.jpg`.

Categoría `Webs`, salvo que la tarea indique otra de estas: `Apps Móviles`, `Integraciones`.

## Archivo de tarjetas

Reescribe `dataIntelligenzV1/public/data/CardsDesarrollos.xml` solo con las tareas en `publicar`, en el orden de la lista. Una tarea, una tarjeta. No conserves tarjetas que ya no estén en `publicar`.

```xml
<card>
  <id>1</id>
  <title>Nombre</title>
  <category>Webs</category>
  <imgUrl>/assets/FigDesarrollos/Nombre-thumbnail.jpg</imgUrl>
  <description>Una o dos frases de lo que hace la aplicación.</description>
  <pdfUrl>/pdfs/Nombre.pdf</pdfUrl>
  <videoUrl></videoUrl>
  <siteUrl>https://ejemplo.net</siteUrl>
</card>
```

`Desarrollos.jsx` muestra la descripción bajo la miniatura, el mundo si hay `siteUrl`, el PDF si hay `pdfUrl` y el video si hay `videoUrl`.

## Comprobar

En PowerShell no uses `&&`. Si el puerto `5173` está libre, arranca `npm run dev` en `dataIntelligenzV1`. Abre `http://localhost:5173/#desarrollos` y confirma que cada tarjeta en `publicar` muestra su imagen y la frase de la descripción, que el mundo abre el sitio y que el PDF abre la ficha. El filtro `Webs` las deja; `Apps Móviles` e `Integraciones` las ocultan cuando su categoría es `Webs`.

## Commit y push

Al terminar la comprobación, haz commit y push a `main`. Si no hay cambios, no crees un commit vacío.

Revisa en paralelo `git status`, `git diff` y `git log --oneline -10`. Agrega solo los archivos de esta actualización (XML, componente, miniaturas, PDF y este skill). No agregues secretos (`.env`, credenciales).

El mensaje va en español, en una o dos frases, y explica el porqué. En PowerShell no uses heredoc: escribe el mensaje en `.git/COMMIT_EDITMSG_TMP`, haz `git commit -F .git/COMMIT_EDITMSG_TMP` y borra ese archivo. Luego `git push` para publicarlo en `origin/main` y confirma con `git status` que `main` quedó al día con el remoto.
