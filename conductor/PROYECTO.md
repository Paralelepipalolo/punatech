# SEM Salta - Estacionamiento Digital

## Resumen del Proyecto

Aplicación web para la digitalización del Sistema de Estacionamiento Medido (SEM) de la Municipalidad de Salta Capital, en el marco del PunaTech 2026. El sistema reemplaza los talonarios manuales por un flujo 100% digital, manteniendo al permisionario como actor central del servicio e integrando Mercado Pago como plataforma de pago principal.

---

## Contexto y Problematica

### Sistema Actual

La Municipalidad de Salta gestiona el estacionamiento vehicular en el microcentro a traves del SEM, regulado por la Ordenanza N.o 12.170. El sistema opera con ~900 permisionarios (personas jubiladas o con discapacidad autorizadas) que cobran estacionamiento en cuadras habilitadas usando **talonarios fisicos impresos**.

**Turnos:**
- **Diurno:** Lunes a viernes 07:00-21:00, sabados 07:00-14:00
- **Nocturno:** 22:00-05:00, lunes a domingo, en zonas especificas (locales de diversion, Paseo Balcarce, Paseo Guemes, Plaza Alvarado)

**Tarifas:**
- Auto: $700/hora
- Moto: $300/hora
- Tolerancia: 5 minutos
- Fraccionamiento cada 15 minutos a partir de la segunda hora (Ordenanza 12.170)
- Descuento del 20% para pagos digitales (absorbido por la cuota municipal del 20%)

**Cobro:** Prepago (al estacionar) o pospago (al retirar). Si el conductor abona una hora pero se retira antes, puede estacionar en otra cuadra habilitada sin cargo adicional hasta cumplir la hora.

### Problemas Centrales

1. **Sin trazabilidad digital:** Ningun pago queda registrado electronicamente. La Municipalidad no tiene datos en tiempo real sobre recaudacion, ocupacion ni demanda.
2. **Control practicamente nulo:** No hay inspectores efectivos. Permisionarios pueden no entregar ticket o cobrar montos incorrectos sin consecuencias.
3. **Infracciones frecuentes y silenciosas:** El desconocimiento de horarios permitidos genera cobros indebidos que el sistema no puede prevenir ni detectar.
4. **Costos operativos:** Los permisionarios deben trasladarse fisicamente a la Municipalidad para comprar talonarios.
5. **Exclusion de medios modernos:** No se admite ningun medio de pago digital, limitando la experiencia y la auditoria.

### Antecedentes

La Municipalidad analizo en 2025 una propuesta de SEM que fue suspendida. La causa principal fue el tiempo de procesamiento de la plataforma de pago (demoras de hasta 1 minuto por transaccion), con una demora total de ~2 minutos, tornando inviable la operativa en la via publica.

---

## Requisitos Obligatorios

| # | Requisito | Descripcion |
|---|-----------|-------------|
| 1 | **Inclusion social** | Mantener a los permisionarios como agentes activos del sistema |
| 2 | **Plataforma de pago** | Integrar Mercado Pago como plataforma de pago digital |
| 3 | **Medios de pago** | Admitir transferencia, debito, credito (via Mercado Pago) y efectivo |
| 4 | **Registro 100% digital** | Todo pago, sea en efectivo o digital, debe quedar registrado electronicamente. Eliminar talonarios fisicos |
| 5 | **Cumplimiento normativo** | Respetar automaticamente la Ordenanza N.o 12.170 |
| 6 | **Velocidad** | La plataforma de pago debe permitir transacciones en pocos segundos |

### Consideraciones Adicionales

- **Rol del permisionario:** Los equipos definen libremente que acciones realiza el permisionario, siempre que su participacion e ingresos queden garantizados.
- **Flujo del dinero:** Puede ir directamente al permisionario (descontando cuota municipal) o pasar primero por la Municipalidad y luego liquidarse.
- **Efectivo:** Debe generar un registro digital.
- **Conectividad:** Se asume conectividad de datos moviles razonable en todas las cuadras.
- **Accesibilidad:** El sistema debe ser usable por conductores con distintos niveles de manejo del smartphone, y no debe asumir que el permisionario dispone obligatoriamente de un dispositivo movil.

---

## Arquitectura de la Aplicacion

### Stack Tecnologico

| Capa | Tecnologia | Justificacion |
|------|-----------|---------------|
| **Framework** | Next.js 16 (App Router) | SSR/SSG, rendimiento, ecosistema React |
| **Lenguaje** | TypeScript 5.7 | Tipado estatico, mantenibilidad |
| **UI** | React 19 + shadcn/ui (Radix UI) | Componentes accesibles, consistentes, customizables |
| **Estilos** | Tailwind CSS 4 | Utilidad-first, rapido desarrollo, responsive |
| **Formularios** | react-hook-form + zod | Validacion declarativa, UX robusta |
| **Iconos** | Lucide React | Iconografia consistente |
| **Graficos** | Recharts | Visualizacion de datos estadisticos |
| **Fechas** | date-fns | Manipulacion de fechas (turnos, horarios) |
| **Analitica** | Vercel Analytics | Metricas de uso en produccion |

### Paleta de Colores

| Color | Codigo | Uso |
|-------|--------|-----|
| Azul principal | `#004B9E` | Header, textos principales, identidad institucional |
| Azul claro | `#009EE3` | Acentos, botones secundarios, stepper |
| Naranja | `#FF6B35` | Botones primarios, alertas, Montos |
| Verde | `#22C55E` | Confirmaciones, estados exitosos |
| Teal | `0D9488` / teal-600 | Boton continuar al pago |

---

## Flujo de la Aplicacion (Frontend Actual)

### 1. Onboarding (`welcome`)

Pantalla de bienvenida con logo institucional, titulo "SEM Salta - Estacionamiento Digital" y boton "Comenzar".

### 2. Registro (`register`)

**Paso 1 - Telefono:** Ingreso de numero de telefono con codigo de area (+54 9 388...). Opcion de registro con Google o Apple.

**Paso 2 - Datos personales:** Nombre, apellido, DNI. Validacion minima de longitud.

### 3. Registro de Vehiculos (`vehicles`)

- Permite registrar uno o mas vehiculos
- Cada vehiculo tiene: **patente** y **tipo** (auto/moto)
- Se pueden agregar o eliminar vehiculos
- Validacion: todas las patentes deben estar completas

### 4. Seleccion de Medio de Pago (`payment`)

Opciones disponibles:
- Mercado Pago (logo institucional)
- Efectivo
- Tarjeta de Credito
- Tarjeta de Debito

### 5. Tour Interactivo (`tour`)

3 slides instructivos:
1. **Inicia Estacionamiento** - Seleccionar ubicacion en mapa
2. **Selecciona Tiempo** - Elegir duracion del estacionamiento
3. **Paga y Controla** - Comprobante instantaneo via WhatsApp

### 6. Dashboard (`dashboard`)

Pantalla de confirmacion de registro exitoso. Muestra resumen del usuario (nombre, telefono, DNI mascarado) y vehiculos registrados. Boton "Comenzar a Estacionar".

### 7. Seleccion de Estacionamiento (`parking`)

**Componente:** `ParkingSelectScreen`

- **Selector de vehiculo:** Lista de vehiculos registrados con tarifa ($700/h auto, $300/h moto). Opcion de agregar nueva patente.
- **Ubicacion:** Muestra ubicacion actual (simulada: "Caseros 400-500, Microcentro, Salta Capital"). Indicador de zona habilitada/deshabilitada. Boton de edicion.
- **Duracion:** Selector con incrementos de 15 minutos. Minimo 1 hora. Calculo de precio dinamico segun tipo de vehiculo y duracion.
- **Medio de pago:** Mercado Pago, Otros medios digitales, Efectivo (con advertencia de registro digital obligatorio).
- **Validacion de zona:** El boton "Continuar al pago" se deshabilita si la zona no esta habilitada (`isZoneEnabled`).

### 8. Reviso de Pago (`review`)

**Componente:** `PaymentReviewScreen`

Muestra stepper visual (3 pasos) y resumen completo:
- Datos del vehiculo (patente, tipo)
- Ubicacion
- Duracion y horario (inicio/fin calculados)
- Detalle del importe
- Medio de pago seleccionado
- Boton `PAGAR CON MERCADO PAGO` (o TARJETA) con procesamiento simulado
- Indicador de seguridad

### 9. Pago en Efectivo (`cash-payment`) - **Si selecciona efectivo**

**Componente:** `CashPaymentScreen`

- Genera un **codigo QR** que el conductor muestra al permisionario
- El QR contiene: patente, ubicacion, tipo de vehiculo, duracion, monto, timestamp
- El QR se renueva cada 5 minutos (300 segundos con countdown visible)
- Resumen del estacionamiento con monto a pagar
- Estado del pago: "Pendiente de verificacion" hasta que el permisionario confirme
- Boton: "El permisionario ya cobro" para confirmar manualmente

### 10. Confirmacion de Pago (`confirmation`)

**Componente:** `PaymentConfirmationScreen`

- Animacion de exito con checkmark verde
- **Timer circular** con porcentaje restante y tiempo en minutos/segundos
- Horario de vencimiento calculado
- Numero de ticket generado (formato `SEM-XXXXX`)
- Medio de pago utilizado
- Acciones rapidas en grilla:
  - Extender tiempo
  - Descargar comprobante
  - Ver recibo
  - Compartir ticket
- Seccion de reporte de problemas

---

## Mecanismo de Pago en Efectivo (Propuesta de Diseno)

El flujo de efectivo se resuelve con **codigo QR dinamico**:

1. El conductor selecciona "Efectivo" como medio de pago
2. La app genera un QR con los datos de la sesion de estacionamiento (patente, ubicacion, duracion, monto, timestamp)
3. El conductor muestra el QR al permisionario de la cuadra
4. El permisionario escanea el QR con su dispositivo (o lo ingresa manualmente si no tiene dispositivo)
5. El permisionario confirma el cobro en su aplicacion
6. La sesion del conductor pasa de "Pendiente de verificacion" a "Activo"
7. El QR se renueva cada 5 minutos por seguridad

**Si el permisionario no tiene dispositivo:** Se puede implementar un mecanismo alternativo donde el conductor ingresa un codigo numerico proporcionado por el permisionario, o donde el permisionario utiliza una ficha/token preasignada por la Municipalidad.

---

## Cumplimiento Normativo (Ordenanza N.o 12.170)

La aplicacion implementa automaticamente:

| Disposicion | Implementacion |
|-------------|----------------|
| Turno diurno (L-V 07:00-21:00, S 07:00-14:00) | Validacion de zona habilitada segun horario |
| Turno nocturno (22:00-05:00 zonas especificas) | Zonas diferenciadas en el mapa |
| Feriados sin cobro diurno | Calendario de feriados integrado |
| Tarifa unica $700/h (auto) | Tarifas preconfiguradas por tipo de vehiculo |
| Tarifa moto $300/h | Tarifa diferenciada por tipo |
| Descuento 20% pago digital | Aplicable automaticamente al seleccionar medio digital |
| Fraccionamiento 15 min (2da hora+) | Selector de duracion con incrementos de 15 min |
| Tolerancia 5 minutos | Periodo de gracia en el timer |
| Zonificacion nocturna | Zonas diferenciadas en selector de ubicacion |

---

## Estructura del Proyecto

```
app-sem/
├── app/
│   ├── layout.tsx              # Layout raiz (metadata, fuentes, viewport)
│   ├── page.tsx                # Pagina principal - Orquestador de flujo completo
│   ├── globals.css             # Estilos globales
│   └── layer3/
│       └── page.tsx            # Preview/demo de pantallas de pago
├── components/
│   ├── onboarding/
│   │   ├── welcome-screen.tsx       # Pantalla de bienvenida
│   │   ├── register-form.tsx        # Registro de usuario (telefono + datos)
│   │   ├── vehicle-registration.tsx # Alta de vehiculos
│   │   ├── payment-method.tsx       # Seleccion de medio de pago
│   │   ├── onboarding-tour.tsx      # Tutorial interactivo (3 pasos)
│   │   └── page-header.tsx          # Header comun con logo y stepper
│   ├── parking/
│   │   ├── parking-select-screen.tsx      # Seleccion de vehiculo/ubicacion/duracion/pago
│   │   ├── payment-review-screen.tsx      # Reviso y confirmacion de pago
│   │   ├── payment-confirmation-screen.tsx # Confirmacion con timer y ticket
│   │   └── cash-payment-screen.tsx        # Pago en efectivo via QR
│   └── ui/                    # Componentes shadcn/ui (70+ componentes)
├── hooks/
│   ├── use-toast.ts            # Hook de notificaciones toast
│   └── use-mobile.ts           # Hook de detencion de dispositivo movil
├── lib/
│   └── utils.ts                # Utilidades generales (cn helper)
├── styles/
│   └── globals.css             # Estilos globales (legacy)
├── package.json                # Dependencias y scripts
├── next.config.mjs             # Configuracion de Next.js
├── tsconfig.json               # Configuracion de TypeScript
├── postcss.config.mjs          # Configuracion de PostCSS
└── components.json             # Configuracion de shadcn/ui
```

---

## Estado Actual del Proyecto

### Implementado (Frontend)

- [x] Flujo completo de onboarding (bienvenida, registro, vehiculos, medio de pago, tutorial)
- [x] Dashboard post-registro
- [x] Pantalla de seleccion de estacionamiento (vehiculo, ubicacion, duracion, medio de pago)
- [x] Pantalla de revision de pago con stepper visual
- [x] Pantalla de pago en efectivo con codigo QR dinamico
- [x] Pantalla de confirmacion con timer circular y ticket
- [x] Logica de tarifas basica ($700/h auto, $300/h moto)
- [x] Fraccionamiento de 15 minutos en duracion
- [x] Validacion de zona habilitada
- [x] Demo navegabl en `/layer3` para pantallas de pago

### Pendiente de Implementar

- [ ] Backend / API REST
- [ ] Base de datos (usuarios, vehiculos, sesiones, permisionarios)
- [ ] Integracion real con Mercado Pago SDK
- [ ] Geolocalizacion GPS para deteccion automatica de cuadra
- [ ] Aplicacion del permisionario (escaneo de QR, confirmacion de cobro)
- [ ] Panel de administracion municipal (dashboard en tiempo real)
- [ ] Sistema de notificaciones (push, WhatsApp, SMS)
- [ ] Calendario de feriados para deshabilitar cobro diurno
- [ ] Aplicar descuento del 20% en pagos digitales
- [ ] Validacion de fraccionamiento solo desde la 2da hora
- [ ] Sistema de tickets digitales reemplazando talonarios
- [ ] Liquidacion de ingresos al permisionario
- [ ] Auditoria y reportes para la Municipalidad
- [ ] Sistema de extension de tiempo de estacionamiento
- [ ] Reporte de irregularidades funcional
- [ ] Compartir/descargar comprobante en formato PDF/imagen
- [ ] Zonificacion real del microcentro con mapa interactivo
- [ ] Tests unitarios y de integracion

---

## Entregables Esperados (PunaTech 2026)

1. **Descripcion del flujo completo de pago para el conductor**
2. **Descripcion del rol del permisionario en el nuevo sistema y como se garantiza su continuidad**
3. **Mecanismo propuesto para el registro digital del pago en efectivo**
4. **Stack tecnologico sugerido con justificacion**
5. **Demo funcional o prototipo navegable**
6. **Video con camara prendida (hasta 5 minutos)**

### Criterios de Evaluacion

| Criterio | Peso |
|----------|------|
| Factibilidad tecnica | 33% |
| Innovacion | 33% |
| Experiencia de usuario | 33% |

---

## Propuesta de Flujo del Conductor

```
Inicio → Bienvenida → Registro (telefono + datos) → Alta vehiculo(s)
  → Seleccion medio de pago → Tutorial → Dashboard
  → Iniciar estacionamiento → Seleccionar vehiculo
  → Detectar ubicacion (GPS) → Verificar zona y horario habilitado
  → Seleccionar duracion → Elegir medio de pago
  → Reviso de pago → Confirmar
    ├── [Digital] → Procesar pago via Mercado Pago → Confirmacion + Timer
    └── [Efectivo] → Mostrar QR al permisionario → Permisionario confirma → Confirmacion + Timer
  → Extender tiempo (si necesita) → Finalizar estacionamiento
```

## Propuesta de Rol del Permisionario

El permisionario mantiene su rol en la via publica pero digitalizado:

1. **Cobro en efectivo:** El conductor muestra un QR dinamico desde su app. El permisionario escanea el QR con su app y confirma el monto. Esto genera un registro digital del cobro en efectivo.
2. **Verificacion visual:** El permisionario puede verificar visualmente que un vehiculo tiene estacionamiento activo (ticket digital visible en la app del conductor o via consulta rapida por patente).
3. **Reporte de irregularidades:** El permisionario puede reportar vehiculos sin pago desde su app.
4. **Ingresos garantizados:** El permisionario recibe su porcentaje (80%) directamente de cada transaccion donde participa, ya sea digital o en efectivo.