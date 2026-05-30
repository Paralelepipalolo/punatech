# Stack Tecnológico — SEM Digital Salta

**Proyecto:** Sistema de Estacionamiento Medido Digital — Municipalidad de Salta  
**Marco:** PunaTech 2026  
**Fecha:** Mayo 2026

---

## 1. Visión general

El sistema está compuesto por tres aplicaciones que comparten un mismo backend y base de datos:

| Aplicación | Usuarios | Plataforma | Rol |
|---|---|---|---|
| **App Conductor** | Conductores de vehículos | Mobile-first web app (PWA) | Iniciar estacionamiento, pagar, gestionar vehículos |
| **App Permisionario** | Permisionarios del SEM | Mobile-first web app (PWA) | Escanear QR, confirmar cobros, ver liquidaciones |
| **Panel Municipal** | Municipalidad (inspectores, administradores) | Dashboard web responsive | Monitoreo, fiscalización, reportes, configuración |

Las tres apps comparten la misma API backend, la misma base de datos y los mismos servicios de autenticación y pagos.

---

## 2. Stack por capa

### 2.1. Frontend — Las tres aplicaciones

| Tecnología | Justificación |
|---|---|
| **Next.js 16 (App Router)** | Framework React con SSR/SSG, routing basado en archivos, optimización automática de imágenes y bundles. Permite PWAs instalables en el teléfono del conductor sin distributed por stores. Mismos componentes reutilizables entre las tres apps. |
| **TypeScript 5.x** | Tipado estático que previene errores en producción, mejora el autocompletado en el IDE y facilita el mantenimiento en un proyecto con 3 codebases que comparten tipos (Ticket, Permisionario, Zona, etc.). |
| **Tailwind CSS 4** | Utilidad-first: permite estilos responsive sin escribir CSS custom. Mobile-first por defecto, ideal para las apps de conductor y permisionario que se usan 100% en celular. Coherencia visual entre las tres apps con la misma paleta institucional (#004B9E azul, #FF6B35 naranja). |
| **shadcn/ui (Radix UI)** | Componentes accesibles (WCAG AA), customizables, sin dependencias pesadas. Incluye primitivos de accesibilidad (diálogos, selects, toasts) que un proyecto municipal requiere. No es una librería externa — se copian los componentes al proyecto y se modifican. |
| **Lucide React** | Iconografía consistente, tree-shakeable (solo se importa lo que se usa), diseño limpio que alinea con la estética institucional. |
| **PWA (Service Worker + Manifest)** | Permite instalar la app en el celular sin pasar por App Store/Play Store. Soporte offline para consultar tickets activos almacenados localmente. Crítico para zonas con baja conectividad en el microcentro de Salta. |

### 2.2. Backend — API y lógica de negocio

| Tecnología | Justificación |
|---|---|
| **Node.js 22 + Express/Fastify** | Mismo lenguaje que el frontend (TypeScript): un solo equipo puede mantener frontend y backend. Fastify es más rápido que Express (benchmark: ~80k req/s vs ~15k req/s) y tiene validación de schemas integrada. Para un sistema municipal con picos de tráfico en horarios de turno, el rendimiento importa. |
| **Prisma ORM** | ORM type-safe para TypeScript. Genera tipos automáticamente desde el schema de la base de datos, evitando desincronización entre código y DB. Migraciones versionadas. Queries tipadas que previenen SQL injection. |
| **Redis** | Cache en memoria para datos de alta concurrencia: estado de estacionamientos activos, sesiones de usuario, rate limiting. Permite consultas en <1ms para el dashboard municipal en tiempo real. |
| **Bull/BullMQ** | Cola de jobs para procesamiento asíncrono: generación de PDFs de comprobantes, envío de notificaciones push, cálculos de liquidación quincenal, generación de infracciones automáticas. Evita bloquear la API con tareas pesadas. |

### 2.3. Base de datos

| Tecnología | Justificación |
|---|---|
| **PostgreSQL 16** | Base de datos relacional robusta, open source, con soporte para JSON (para datos semi-estructurados como configuración de zonas), geolocalización (PostGIS para consultas de cuadras por coordenadas), y transacciones ACID que garantizan la consistencia de los cobros. Escala bien para ~900 permisionarios y decenas de miles de tickets diarios. |

**Schema principal (tablas clave):**

| Tabla | Descripción |
|---|---|
| `users` | Conductores registrados (nombre, DNI, teléfono, email) |
| `vehicles` | Vehículos registrados (patente, tipo, user_id) |
| `permisionarios` | Permisionarios (nombre, legajo, cuadra, estado) |
| `parking_sessions` | Sesiones de estacionamiento (patente, ubicación, zona, inicio, fin, estado, medio_pago) |
| `payments` | Pagos asociados a sesiones (monto, medio, referencia MP, estado) |
| `infractions` | Infracciones (patente, tipo, ubicación, inspector, estado) |
| `liquidations` | Liquidaciones quincenales de permisionarios |
| `zones` | Zonas del SEM con coordenadas, tarifas, horarios |
| `holidays` | Feriados con tipo (nacional/provincial/municipal) |
| `qr_codes` | QR dinámicos generados para pago en efectivo (timestamp, datos, estado) |

### 2.4. Autenticación y seguridad

| Tecnología | Justificación |
|---|---|
| **NextAuth.js v5 (Auth.js)** | Autenticación plug-and-play para Next.js. Soporta múltiples providers (Google, Apple, credenciales propias). Manejo de sesiones JWT con refresh tokens. Para el conductor: teléfono + SMS o Google/Apple. Para el permisionario: legajo + contraseña. Para el dashboard municipal: credenciales institucionales con 2FA. |
| **JSON Web Tokens (JWT)** | Tokens stateless para autenticación de API. El conductor recibe un JWT al registrarse que se renueva automáticamente. No requiere consulta a DB en cada request — válido para escalabilidad. |
| **bcrypt + rate limiting** | Hash de contraseñas con bcrypt (cost factor 12). Rate limiting por IP y por usuario para prevenir ataques de fuerza bruta en login. Crítico para un sistema municipal expuesto a internet. |

### 2.5. Pagos — Integración con Mercado Pago

| Tecnología | Justificación |
|---|---|
| **Mercado Pago SDK (mercadopago)** | SDK oficial de Mercado Pago para Node.js. Permite integrar checkout embebido (webview dentro de la app) sin redirección a browser externo. Esto resuelve directamente el problema del antecedente 2025: las transacciones deben completarse en menos de 10 segundos, y la redirección a browser externo causaba demoras de hasta 2 minutos. |
| **Webhooks de MP** | Notificaciones en tiempo real del estado de cada pago. Permite confirmar transacciones sin polling (el backend recibe un POST cuando el pago se completa, falla o se rechaza). |
| **QR dinámico de MP** | Para pago en efectivo, se puede usar el QR dinámico de Mercado Pago como alternativa adicional al QR propio del sistema. Esto permite que el conductor pague con la app de MP directamente si lo desea. |

### 2.6. Notificaciones push

| Tecnología | Justificación |
|---|---|
| **Firebase Cloud Messaging (FCM)** | Notificaciones push gratuitas para Android e iOS. El conductor recibe alertas de vencimiento de estacionamiento (15 min antes) y confirmación de cobro. El permisionario recibe alertas de vehículos sin ticket y cobros pendientes. Integración directa con PWA a través de service worker. |

### 2.7. Geolocalización y mapas

| Tecnología | Justificación |
|---|---|
| **Mapbox GL JS** | Mapa interactivo vectorial, más rápido y ligero que Google Maps para este caso de uso. Permite capas custom (colores por zona de ocupación). Pricing generoso (50k cargas/mes gratis). Offile tiles soportados para modo sin conexión. En la app del conductor se usa para seleccionar la cuadra; en el dashboard municipal para monitoreo en tiempo real. |
| **PostGIS** | Extensión de PostgreSQL para consultas espaciales. Permite determinar en qué cuadra se encuentra un conductor por coordenadas GPS con una query tipo `SELECT * FROM zones WHERE ST_Contains(geom, point(-65.41, -24.78))`. Esto reemplaza cualquier lógica de geolocalización custom en el frontend. |

### 2.8. Despliegue e infraestructura

| Tecnología | Justificación |
|---|---|
| **Vercel** | Plattform-as-a-Service optimizado para Next.js. Deploy automático desde Git. CDN global para assets estáticos. Serverless functions para la API. Escalado automático. Plan gratuito generoso para la etapa de hackathon; plan Pro ($20/mes) para producción. Alternativa: Cloudflare Pages con Workers para menor latencia en Sudamérica. |
| **AWS o DigitalOcean** | Para el backend de colas (Bull) y Redis, que no corren en Vercel. Una instancia pequeña ($6-12/mes) es suficiente para la escala del SEM de Salta (~900 permisionarios, ~50k tickets/día). PostgreSQL managed (DigitalOcean Managed DB o AWS RDS) para la base de datos con backups automáticos. |
| **Docker** | Contenedores para el backend API, Bull worker y Redis. Permite deployments consistentes entre desarrollo y producción. Docker Compose para orquestación local en desarrollo. |

### 2.9. Monitoreo y observabilidad

| Tecnología | Justificación |
|---|---|
| **Vercel Analytics** | Metricas de rendimiento web (Core Web Vitals) en producción. Permite detectar si la app es lenta en celulares de gama baja —crítico para un sistema de pago que debe completarse en <10 segundos. |
| **Sentry** | Tracking de errores en producción con stack traces, breadcrumbs y contexto de usuario. Alertas en tiempo real cuando un conductor o permisionario encuentra un bug. Esencial para un sistema municipal que maneja dinero. |

---

## 3. Arquitectura del sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (PWA)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │  App         │  │  App         │  │  Panel             │     │
│  │  Conductor   │  │  Permisionario│  │  Municipal         │     │
│  │  (Next.js)   │  │  (Next.js)   │  │  (Next.js)         │     │
│  └──────┬───────┘  └──────┬───────┘  └────────┬───────────┘     │
│         │                  │                    │                 │
│         └──────────────────┼────────────────────┘                 │
│                            │                                      │
│                    ┌───────▼───────┐                              │
│                    │  Next.js API  │  (SSR + API Routes)         │
│                    │  (App Router) │                              │
│                    └───────┬───────┘                              │
│                            │                                      │
├────────────────────────────┼──────────────────────────────────────┤
│                     BACKEND │                                      │
│                    ┌───────▼───────┐                              │
│                    │  API Server   │  (Node.js + Fastify)        │
│                    │  + Auth       │                              │
│                    └──┬──────┬─────┘                              │
│                       │      │                                    │
│              ┌────────▼┐  ┌──▼─────────┐                        │
│              │ Prisma   │  │ Bull Queue  │                       │
│              │ ORM      │  │ (Jobs)      │                       │
│              └────┬─────┘  └──────┬──────┘                       │
│                   │              │                                │
│            ┌──────▼──────┐  ┌────▼─────┐                         │
│            │ PostgreSQL  │  │  Redis    │                        │
│            │ + PostGIS   │  │  (Cache)  │                        │
│            └─────────────┘  └──────────┘                         │
│                                                                  │
│              ┌─────────────────────────┐                          │
│              │  Servicios Externos      │                         │
│              │  ├─ Mercado Pago SDK     │                         │
│              │  ├─ Firebase Cloud Msg   │                         │
│              │  └─ Auth.js (NextAuth)   │                         │
│              └─────────────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Seguridad

| Aspecto | Implementación |
|---|---|
| **Encriptación en tránsito** | HTTPS obligatorio (TLS 1.3). Todas las comunicaciones entre apps y API encriptadas. |
| **Encriptación en reposo** | Base de datos PostgreSQL con encriptación a nivel de disco. Datos sensibles (DNI, teléfono) encriptados con AES-256. |
| **Autenticación** | JWT con expiración de 15 minutos + refresh token de 7 días. Rate limiting en endpoints de login (5 intentos/minuto por IP). |
| **Autorización** | RBAC con 3 roles: `conductor`, `permisionario`, `municipal`. Cada endpoint valida el rol del usuario antes de ejecutar. |
| **Validación de entrada** | Zod schemas en el backend (mismo validador que en el frontend). Prevención de SQL injection, XSS y CSRF. |
| **Auditoría** | Log inmutable de cada transacción: quién cobró, cuándo, dónde, monto, medio de pago. Cumple con el requisito de trazabilidad del 100% de los cobros. |

---

## 5. Escala estimada y requisitos de infraestructura

| Métrica | Valor estimado | Implicación |
|---|---|---|
| Conductores registrados | ~50.000 en 1 año | PostgreSQL maneja esto sin problemas. |
| Tickets por día (pico) | ~10.000-15.000 | Una instancia de API server es suficiente. |
| Permisionarios activos | ~900 | Sin estrés para la base de datos. |
| Requests por segundo (pico) | ~50-100 en horario de turno | Fastify + Redis cache responde en <10ms. |
| Almacenamiento | ~2-5 GB/mes de datos nuevos | PostgreSQL maneja varios años sin intervención. |
| Costo mensual estimado | $50-80 USD (Vercel Pro + DO droplet + managed DB) | Accesible para un municipio de tamaño medio como Salta. |

---

## 6. Estrategia de desarrollo por hackathon

| Etapa | Duración | Alcance |
|---|---|---|
| **Semana 1-2** | Prototipo navegable | Apps conductor y permisionario con datos mock (ya implementado). Dashboard municipal con datos mock (ya implementado). Demo funcional de los 3 flujos. |
| **Semana 3-4** | Backend + API | Schema Prisma, endpoints CRUD, autenticación, integración Mercado Pago sandbox. |
| **Semana 5-6** | Integración + Testing | Conectar frontend con backend real. Testing de pagos en sandbox. Pruebas de estrés básicas. |
| **Semana 7-8** | Piloto | Despliegue en staging. Pruebas con 5-10 permisionarios reales. Ajustes de UX basados en feedback. |
| **Post-hackathon** | Producción gradual | Rollout por cuadras, empezando por la zona de mayor tráfico. Monitoreo con Sentry + Vercel Analytics. |

---

## 7. Resumen de elecciones y justificación

| Criterio de evaluación | Cómo se cumple |
|---|---|
| **Factibilidad técnica** | Stack 100% JavaScript/TypeScript (un solo lenguaje para frontend y backend). Todas las tecnologías son open source o con tier gratuito. La integración con Mercado Pago usa el SDK oficial con webview embebido, evitando el problema de latencia del antecedente 2025. PostgreSQL + PostGIS resuelve geolocalización sin agregar complejidad. |
| **Innovación** | QR dinámico para efectivo con renovación cada 5 minutos (previene reuso). PWA instalable sin app store. Dashboard municipal en tiempo real con datos de ocupación, cobros y alertas. Programa de beneficios por estacionamiento (1 punto por sesión finalizada). Modo invitado para conductores que no quieren registrarse. |
| **Experiencia de usuario** | Pago digital en <10 segundos (SDK embebido, sin redirección). App mobile-first optimizada para uso en la calle. Validación automática de zonas y horarios (previene cobros indebidos). Notificaciones push de vencimiento. Accesibilidad: tipografía grande, botones con áreas de toque amplias, contraste WCAG AA. |