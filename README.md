# Mandril Templates (Colppy)

Repositorio para mantener **templates transaccionales** con un **diseño único y fijo** (aprobado) y contenido editable **sin tocar HTML gigante** en Mandrill.

La idea es simple:

- **El diseño NO se toca**: estilos + header + footer + estructura del body son fijos.
- **Solo cambia el contenido** (texto/link) por template, editable desde un `.yml`.
- Con un comando generamos HTML final en `dist/`.

---

## Qué problema resuelve

- Evitar que el HTML en Mandrill se vuelva inmanejable.
- Mantener consistencia (branding coherente) en TODOS los correos.
- Control de cambios con Git (historial, rollback, revisión).
- Marketing puede editar contenido sin romper la plantilla.

---

## Requisitos

- macOS (o Windows/Linux) con:
  - **Git**
  - **Node.js + npm**
- **VS Code** recomendado.

Verificar en terminal:

```bash
git --version
node -v
npm -v
