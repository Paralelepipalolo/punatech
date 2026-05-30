# PunaTech — SEM Digital Salta

Sistema de Estacionamiento Medido Digital para la Municipalidad de Salta, desarrollado en el marco de PunaTech 2026.

## Aplicaciones

| Carpeta | Aplicación | Descripción |
|---------|-----------|-------------|
| `conductor/` | App Conductor | App móvil (PWA) para conductores: registro, estacionamiento, pago digital/efectivo, mapa, perfil |
| `permisionario/` | App Permisionario | App móvil (PWA) para permisionarios: escaneo QR, cobros, liquidaciones, incidencias |
| `dashboard/` | Panel Municipal | Dashboard web para la Municipalidad: monitoreo en tiempo real, permisionarios, fiscalización, tarifas, reportes |

## Stack

- **Framework:** Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui
- **Base de datos:** PostgreSQL + PostGIS (propuesto)
- **Pagos:** SDK Mercado Pago (propuesto)

## Documentación

| Archivo | Contenido |
|---------|-----------|
| `documentacion.md` | Problemática, contexto, requisitos obligatorios |
| `Ordenanza_Nº12170.md` | Texto completo de la Ordenanza N.º 12.170 |
| `SEM Diagnostico PunaTech 2026.docx.md` | Diagnóstico del desafío PunaTech |
| `Prompt_Conductor.md` | Especificación de pantallas de la app conductor |
| `PromptPermisionario.md` | Especificación de pantallas de la app permisionario |
| `Prompt dashMuni.md` | Especificación de pantallas del panel municipal |
| `Flujo_de_Pago_Conductor.md` | Flujo completo de pago para el conductor |
| `Rol_permisionado.md` | Rol del permisionario y garantía de continuidad |
| `Stack_tecnologico.md` | Stack tecnológico propuesto con justificación |

## Cómo ejecutar

```bash
# Conductor
cd conductor && npm install && npm run dev

# Permisionario
cd permisionario && npm install && npm run dev

# Dashboard municipal
cd dashboard && npm install && npm run dev
```

## Ordenanza de referencia

Ordenanza N.º 12.170 — Régimen de Estacionamiento Medido y Pago de la Ciudad de Salta.