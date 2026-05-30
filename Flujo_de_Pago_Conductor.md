# Flujo Completo de Pago para el Conductor — SEM Digital Salta

**Proyecto:** Sistema de Estacionamiento Medido Digital — Municipalidad de Salta  
**Marco:** PunaTech 2026 — Ordenanza N.º 12.170  
**Equipo:** Florencia María Aguirrebengoa, Pablo Cinco Reynaga 

---

## 1. Resumen ejecutivo

El presente documento describe el flujo completo de pago del conductor desde la apertura de la aplicación hasta la finalización de la sesión de estacionamiento. El diseño responde directamente a las cinco problemáticas centrales identificadas en el diagnóstico del sistema actual y cumple con los seis requisitos obligatorios establecidos por la Municipalidad.

### Vinculación con las problemáticas identificadas

| Problemática actual | Cómo la resuelve este flujo |
|---|---|
| Ausencia total de trazabilidad | Todo pago (digital o en efectivo) genera un registro electrónico con número de ticket único, timestamp, ubicación, monto, medio de pago y permisionario asociado. Los pagos en efectivo deben ser recibidos por los permisionarios y registrados en la aplicación|
| Control prácticamente nulo | El sistema bloquea automáticamente el inicio de estacionamiento en horarios/zonas no habilitadas. Las infracciones se generan digitalmente. Los inspectores pueden consultar la vigencia de cualquier ticket por patente. |
| Infracción frecuente y silenciosa | El roster de horarios, zonas y feriados está codificado en la aplicación. Si un conductor intenta estacionar en un turno diurno en día feriado, la app muestra "Cobro no habilitado — Feriado" y deshabilita el botón de pago. |
| Costos operativos y fricción | Se elimina el talonario físico. Los permisionarios no necesitan comprar ni trasladar talonarios. Todo se gestiona desde la aplicación. |
| Exclusión de medios modernos | Se integra Mercado Pago (crédito, débito, transferencia) como medio digital y se habilita efectivo con registro digital obligatorio vía código QR. |

### Vinculación con los requisitos obligatorios

| Requisito | Implementación en el flujo |
|---|---|
| Inclusión social | El permisionario sigue siendo actor central: confirma cobros en efectivo vía su app, recibe su porcentaje de cada transacción (80%), y puede reportar incidencias. |
| Plataforma de pago |Mercado Pago integrado mediante SDK nativo (webview embebida), sin redirección externa. |
| Medios de pago | Pago digital (Mercado Pago: crédito, débito, transferencia) y pago en efectivo (QR dinámico escaneado por el permisionario). |
| Registro 100 % digital | Todo cobro genera un ticket digital con datos completos, independientemente del medio de pago. Se elimina el talonario físico. |
| Cumplimiento normativo | La app valida automáticamente turnos (diurno/nocturno), tarifas ($700/h auto, $300/h moto), tolerancia (5 min), fraccionamiento (15 min desde la 2da hora), feriados y zonas habilitadas/deshabilitadas. |
| Éxito en velocidad | El pago digital se procesa en menos de 10 segundos mediante SDK embebido, evitando el problema del antecedente 2025 (2 min por transacción). |

---

## 2. Flujo completo — Paso a paso

### 2.1. Onboarding (Primer uso)

**Objetivo:** Registrar al conductor y sus vehículos en menos de 2 minutos, reduciendo la barrera de entrada.

1. El conductor abre la app y ve la pantalla de bienvenida con logo institucional del SEM Salta.
2. Ingresa su número de teléfono (verificación SMS) o se autentica con Google/Apple.
3. Completa datos obligatorios: nombre, apellido, DNI.
4. Registra uno o más vehículos: patente + tipo (automóvil o motocicleta). La app aplica la tarifa correspondiente automáticamente ($700/h para auto, $300/h para moto).
5. Selecciona medio de pago preferido (modificable después).
6. Se muestra un tour rápido de 3 pantallas: iniciar estacionamiento, pagar, extender tiempo.
7. Se accede al dashboard principal.

**Modo invitado:** Si el conductor no desea registrarse, puede usar la app en modo "invitado" donde ingresa la patente manualmente en cada sesión, sin guardar historial ni datos de pago.

> **Vinculación con problemática — Exclusión de medios modernos:** El onboarding es breve y la app es usable por conductores con distintos niveles de manejo del smartphone. Se mantiene la accesibilidad sin sacrificar funcionalidad.

### 2.2. Selección de estacionamiento (Pantalla principal — pestaña "Inicio")

**Objetivo:** Permitir al conductor elegir vehículo, ubicación, duración y medio de pago, validando automáticamente las reglas de la Ordenanza N.º 12.170.

#### 2.2.1. Selector de vehículo

- Desplegable con las patentes registradas durante el onboarding.
- Ícono de auto (🚗) o moto (🏍️) al lado de cada patente.
- Botón "Agregar nueva patente" para registrar un vehículo adicional en el momento.
- La tarifa se actualiza dinámicamente según el tipo de vehículo seleccionado.

#### 2.2.2. Ubicación y validación de zona

- La app detecta la ubicación por GPS y la traduce a la cuadra más cercana del microcentro (formato: "Caseros 400-500, Microcentro, Salta Capital").
- El conductor puede editar manualmente la ubicación si el GPS no es preciso (ícono de lápiz).
- Debajo de la ubicación se muestra una de las siguientes etiquetas de estado:

  | Estado | Etiqueta | Color | ¿Se puede estacionar? | ¿Cobro habilitado? |
  |--------|----------|-------|----------------------|--------------- |
  | Turno diurno, zona habilitada | "Zona habilitada — Turno diurno" | Verde | Sí | Sí |
  | Turno nocturno, zona nocturna | "Zona habilitada — Turno nocturno (22:00-05:00)" | Verde | Sí | Sí |
  | Fuera de horario | "Cobro no habilitado — Fuera de horario de turno" | Rojo | Sí | No |
  | Feriado (turno diurno) | "Cobro no habilitado — Feriado" | Rojo | Sí | No |
  | Zona Prohibido Estacionar | "Zona no habilitada para estacionar" | Rojo con ícono de prohibido | No | No |

> **Vinculación con problemática — Infracción frecuente y silenciosa:** La validación automática de zona y horario previene cobros indebidos. Si un conductor intenta iniciar estacionamiento en horario no permitido, el sistema bloquea la operación con un mensaje claro. Esto resuelve el problema de que "pocos vecinos conocen estas restricciones" — la app lo comunica de forma proactiva.

> **Vinculación con requisito — Cumplimiento normativo automático:** El calendario de feriados 2026 está integrado en la app. Cuando es feriado y turno diurno, el botón "Continuar al pago" se deshabilita automáticamente. El turno nocturno opera con normalidad en feriados.

#### 2.2.3. Duración del estacionamiento

- **Mínimo obligatorio:** 1 hora (por Ordenanza N.º 12.170).
- **Desde la 2da hora:** Se habilitan botones de +15 min y −15 min, cumpliendo el fraccionamiento tarifario dispuesto por la ordenanza ("Fraccionamiento cada 15 minutos a partir de la segunda hora").
- **Cálculo dinámico en tiempo real:** El monto total se actualiza al tocar + o −, aplicando:
  - Auto: $700 por la primera hora; $175 cada 15 minutos adicionales (proporcional de $700/h).
  - Moto: $300 por la primera hora; $75 cada 15 minutos adicionales.
- **Ejemplo de cálculo:**
  - Auto, 1h → $700
  - Auto, 2h → $1.400
  - Auto, 2h 15min → $1.575
  - Moto, 1h → $300
  - Moto, 1h 30min → $450

> **Vinculación con requisito — Cumplimiento normativo:** La tolerancia de 5 minutos se aplica automáticamente: el conductor puede iniciar el estacionamiento y tiene 5 minutos de gracia antes de que comience a contar el tiempo.

#### 2.2.4. Medio de pago

Tres opciones seleccionables:

| Opción | Descripción | Flujo |
|--------|-------------|-------|
| **Mercado Pago** | Crédito, débito y transferencia vía MP. | Pasa a pantalla de confirmación → Pago digital embebido. |
| **Otros medios digitales** | Tarjeta de débito o crédito con otras pasarelas. | Pasa a pantalla de confirmación → Pago digital embebido. |
| **Efectivo** | Pago al permisionario de la cuadra. Alerta visible: "El pago deberá realizarse con el permisionario de la cuadra." | Pasa a pantalla de QR dinámico. |

#### 2.2.5. Botón "Continuar al pago"

- Se habilita solo cuando: vehículo seleccionado, ubicación válida, duración seleccionada, medio de pago elegido y la zona/horario están habilitados para cobro.
- Se deshabilita si: la zona no está habilitada, no corresponde el cobro según la fecha y hora, o falta algún campo.

---

### 2.3. Confirmación y pago (Pantalla 2)

#### Flujo A — Pago digital (Mercado Pago u otros medios digitales)

1. Se muestra un resumen de la operación:

   | Campo | Ejemplo |
   |-------|---------|
   | Vehículo | 🚗 ABC 123 (Automóvil) |
   | Ubicación | Caseros 400-500, Microcentro |
   | Turno | Diurno (L-V 07:00-21:00) |
   | Duración | 1 hora |
   | Hora de inicio | 14:35 |
   | Hora de vencimiento | 15:35 |
   | Monto | $700 |
   | Medio de pago | Mercado Pago |

2. Botón principal: **"Pagar con Mercado Pago"** o **"Pagar con tarjeta"** según la selección.
3. La integración utiliza el **SDK nativo deMercado Pago** embebido en una webview dentro de la app. El conductor no sale de la aplicación en ningún momento.
4. Se muestra un spinner con texto "Procesando pago..." durante la transacción.
5. Tiempo objetivo de procesamiento: **menos de 10 segundos** (lección del antecedente 2025, donde demoras de 2 minutos por transacción tornaron inviable la operativa).

> **Vinculación con requisito — Éxito en velocidad:** La solución utiliza SDK embebido (no redirección a browser externo) para completar la transacción en menos de 10 segundos. Esto resuelve directamente el problema que inhabilitó la propuesta anterior.

6. Si el pago es exitoso, se avanza automáticamente a la Pantalla 3 (Estacionamiento activo) con estado **"Pago aprobado"**.

> **Vinculación con problemática — Ausencia total de trazabilidad:** Cada transacción digital genera un registro en el sistema con: número de ticket, patente, ubicación, timestamp, monto, medio de pago (Mercado Pago/tarjeta), ID de permisionario asignado a la cuadra, y estado (activo). La Municipalidad dispone de estos datos en tiempo real.

#### Flujo B — Pago en efectivo

1. Se muestra una alerta visible: **"Diríjase al permisionario de la cuadra para efectuar el pago en efectivo. Muestre el código QR al permisionario."**
2. Se genera un **código QR dinámico** en pantalla que codifica:

   | Campo | Contenido |
   |-------|-----------|
   | patente | ABC 123 |
   | ubicacion | Caseros 400-500 |
   | tipo_vehiculo | auto |
   | duracion | 60 |
   | monto | 700 |
   | timestamp | 2026-05-30T14:35:00Z |

3. El QR se **renueva automáticamente cada 5 minutos** para evitar reuso fraudulento. Se muestra un contador regresivo visible.
4. El conductor se acerca al permisionario de la cuadra y le muestra el QR.
5. El permisionario escanea el QR con su aplicación (ver flujo del permisionario), confirma el monto recibido en efectivo, y el sistema registra el pago digitalmente.
6. El conductor puede presionar **"El permisionario ya cobró"** para avanzar a la Pantalla 3 en estado **"Pendiente de verificación"** hasta que el permisionario confirme el cobro.
7. Una vez confirmado por el permisionario, el estado cambia a **"Pago aprobado"**.

> **Vinculación con requisito — Registro 100 % digital del efectivo:** El QR dinámico es el mecanismo que garantiza la trazabilidad del pago en efectivo. El permisionario no puede omitir el registro: al escanear el QR y confirmar el monto, el cobro queda registrado electrónicamente. Esto elimina la posibilidad de que un cobro en efectivo quede sin registro.

> **Vinculación con problemática — Control prácticamente nulo:** Hoy el permisionario puede no entregar el ticket o cobrar un monto incorrecto sin consecuencias. En el sistema digital, el monto está predefinido en el QR y el permisionario solo confirma. No hay margen para cobros incorrectos ni omisiones.

> **Vinculación con requisito — Inclusión social / Rol del permisionario:** El permisionario sigue siendo actor central. Su participación (escaneo y confirmación) es lo que habilita el cobro, además se le asigna la tarea de cargar las patentes de todos los autos que estacionen en su cuadra aunque no interactue con los conductores, recibe su porcentaje (80%) de cada transacción que se realice en su cuadra, sea en efectivo o virtual. Su rol se mantiene —se digitaliza, no se elimina.

---

### 2.4. Estacionamiento activo (Pantalla 3)

**Objetivo:** Brindar al conductor visibilidad total del estado de su sesión y acciones inmediatas (extender, liberar, reportar).

#### 2.4.1. Encabezado de estado

| Estado | Badge | Significado |
|--------|-------|-------------|
| Pago digital aprobado | 🟢 "Pago aprobado" | El ticket está activo y vigente. |
| Pago en efectivo pendiente | 🟡 "Pago en efectivo — Verificación pendiente" | El permisionario aún no confirmó el cobro. |

#### 2.4.2. Ticket digital

Cuadro expandible con número de ticket único (formato: **SEM-XXXXX**). Al desplegar muestra la información completa:

| Campo | Contenido |
|-------|-----------|
| Número de ticket | SEM-48291 |
| Patente | ABC 123 |
| Ubicación | Caseros 400-500 |
| Tipo de vehículo | Automóvil |
| Turno | Diurno |
| Hora de inicio | 14:35 |
| Hora de vencimiento | 15:35 |
| Fecha | 30/05/2026 |
| Medio de pago | Mercado Pago / Efectivo |
| Monto abonado | $700 |

Botón para copiar el número de ticket al portapapeles.

#### 2.4.3. Temporizador visual

Reloj circular con cuenta regresiva que muestra:

- **Barra de progreso:** Se va consumiendo circularmente. El color cambia según el tiempo restante:
  - Verde: más de 30 minutos restantes.
  - Amarillo: menos de 30 minutos restantes.
  - Rojo: menos de 10 minutos restantes.
- **Izquierda:** Tiempo restante en formato `MM`.
- **Derecha:** Hora exacta de vencimiento (ej. "Vence a las 15:35").
#### 2.4.4. Acciones disponibles

| Acción | Descripción |
|--------|-------------|
| **Extender tiempo** | Abre un modal con selector de tiempo adicional en fracciones de 15 min (solo desde la 2da hora). Si el pago fue digital, se procesa un nuevo cobro por la extensión. Si fue efectivo, se genera un nuevo QR de "pendiente de pago" para pagar la extensión al volver con el permisionario. |
| **Descargar comprobante** | Genera un PDF con todos los datos del estacionamiento. |
| **Compartir comprobante** | Abre el menú de compartir nativo (WhatsApp, email, etc.). |
| **Liberar estacionamiento** | Botón rojo con confirmación. Libera el espacio. El tiempo restante sigue corriendo y puede utilizarse en otra cuadra habilitada hasta su vencimiento. Genera 1 punto en el programa de beneficios. |
| **Reportar problema** | Formulario con opciones predefinidas (cobro indebido, permisionario ausente, error en tarifa, problema técnico) y campo de texto libre. Se envía al sistema municipal para seguimiento. |

> **Vinculación con requisito — Cumplimiento normativo (fraccionamiento):** La extensión de tiempo respeta el fraccionamiento de 15 minutos a partir de la 2da hora. La primera hora no es fraccionable (mínimo obligatorio).

#### 2.4.5. Notificaciones push automáticas

| Momento | Mensaje |
|---------|---------|
| 15 min antes del vencimiento | "Su estacionamiento vence en 15 minutos. ¿Desea extenderlo?" |
| Al vencimiento | "Su estacionamiento ha vencido. Libere el espacio o extienda el tiempo." |
| Feriado y el conductor tiene una sesión activa | "Hoy es feriado. El turno diurno no está habilitado para cobro." |

---

### 2.5. Finalización del estacionamiento

El estacionamiento finaliza cuando:

1. **El conductor presiona "Liberar estacionamiento":** Se emite un comprobante final con la hora de liberación. Se genera 1 punto en el programa de beneficios (1 punto por cada estacionamiento finalizado).
2. **Se agota el tiempo contratado y no se extiende:** El sistema marca el ticket como "Expirado" y envía notificación push.
3. **Se excede el tiempo sin extensión:** El sistema notifica tanto al usuario como al permisionario de que el conductor tiene un tiempo de 10 min de gracia para retirar el vehículo o se registrará una falta en la base de datos que la municipalidad puede usar para sancionar según corresponda.

En todos los casos, el registro queda almacenado en el sistema con trazabilidad completa.

---

### 2.6. Pestaña Mapa

- Mapa interactivo centrado en el microcentro de Salta con capa SEM superpuesta.
- Colores por cuadra:
  - **Verde:** Baja ocupación (0-50%).
  - **Amarillo:** Alta ocupación (50-90%).
  - **Rojo:** Zona no habilitada.
  - **Azul oscuro:** Zona de turno nocturno (solo visible en horario nocturno).

> **Vinculación con problemática — Infracción frecuente y silenciosa:** El mapa informa visualmente al conductor sobre las restricciones de cada zona. Ya no depende del conocimiento del permisionario ni del conductor para saber si una cuadra está habilitada — la app lo muestra claramente.

---

### 2.7. Pestaña Perfil

La pestaña de perfil centraliza la gestión del conductor:

| Sección | Contenido |
|---------|-----------|
| **Datos del conductor** | Nombre, apellido, DNI, teléfono, email. Editable. |
| **Mis vehículos** | Patentes registradas con tipo (auto/moto). Agregar/eliminar. |
| **Historial de estacionamiento** | Lista cronológica de tickets filtrable por fecha. Cada entrada muestra: fecha, patente, ubicación, duración, monto, estado. Detalle completo al tocar. |
| **Medios de pago** | Tarjetas registradas, cuenta MP vinculada. Agregar/eliminar. |
| **Programa de beneficios** | 1 punto por cada estacionamiento finalizado. 10 puntos = 1 hora gratis. 15 puntos = 2 horas gratis. 20 puntos = 3 horas gratis. Muestra puntos acumulados y horas disponibles para canje. |
| **Infracciones** | Lista de infracciones con estado (pendiente, pagada, en reclamo). Pago en línea. |
| **Reclamos** | Lista de reclamos con estado. Formulario de nuevo reclamo con opciones predefinidas y texto libre. |
| **Configuración** | Notificaciones, idioma, modo oscuro, datos de cuenta. |

> **Vinculación con problema — Costos operativos:** El historial de estacionamiento elimina la necesidad de conservar boletas físicas. El conductor accede a un registro digital permanente de todas sus transacciones.

---

## 3. Mecanismo de registro digital del pago en efectivo

El pago en efectivo es la innovación crítica que resuelve la coexistencia del dinero físico con la trazabilidad digital:

1. El conductor selecciona "Efectivo" como medio de pago.
2. La app genera un **código QR dinámico** que contiene: patente, ubicación, tipo de vehículo, duración, monto a pagar y timestamp de generación.
3. El QR se **renueva cada 5 minutos** con un nuevo timestamp, evitando que un QR capturado pueda ser reutilizado.
4. El conductor se dirige al permisionario de la cuadra y le muestra el QR en su pantalla.
5. El permisionario escanea el QR con la app de permisionario (o ingresa un código numérico manualmente si no tiene dispositivo).
6. La app del permisionario muestra los datos del estacionamiento y el monto. El permisionario ingresa el monto recibido en efectivo y confirma.
7. El sistema registra el cobro digitalmente con todos los datos obligatorios: número de ticket, patente, ubicación, fecha/hora, monto, medio de pago (efectivo), ID del permisionario.
8. La app del conductor cambia automáticamente de "Pendiente de verificación" a "Pago aprobado".


> **Vinculación con requisito — Inclusión social y trazabilidad:** El permisionario participa activamente en el cobro en efectivo. Su confirmación es lo que válida la transacción. Al mismo tiempo, el cobro queda registrado electrónicamente. La Municipalidad obtiene trazabilidad completa sin eliminar el rol del permisionario.

---

## 4. Programa de beneficios

Se implementa un sistema de puntos por estacionamiento para incentivar el uso de la app:

- **1 punto** por cada estacionamiento finalizado (al presionar "Liberar estacionamiento" o al expirar el tiempo).
- **10 puntos** = 1 hora gratis de estacionamiento.
- **15 puntos** = 2 horas gratis.
- **20 puntos** = 3 horas gratis.
- **30 puntos** = 5 horas gratis.

Las horas gratis se pueden canjear desde la sección "Programa de beneficios" en el perfil del conductor, seleccionando la recompensa y aplicándola al siguiente estacionamiento.

---

## 5. Cumplimiento normativo (Ordenanza N.º 12.170)

| Disposición de la ordenanza | Implementación en el flujo |
|---|---|
| Turno diurno (L-V 07:00-21:00, S 07:00-14:00) | Validación automática de zona habilitada según horario. Botón "Continuar al pago" se deshabilita fuera de horario. |
| Turno nocturno (22:00-05:00, zonas específicas) | Zonas nocturnas identificadas en el mapa con color azul oscuro. Solo se habilitan en horario nocturno. |
| Feriados sin cobro diurno | Calendario de feriados integrado. En días feriado+turno diurno se muestra banner "Cobro no habilitado — Feriado" y se deshabilita el inicio de estacionamiento diurno. |
| Tarifa auto $700/h | Tarifa preconfigurada, cálculo automático. |
| Tarifa moto $300/h | Tarifa diferenciada según tipo de vehículo seleccionado. |
| Tolerancia 5 minutos | Se aplica automáticamente al iniciar el estacionamiento. |
| Fraccionamiento 15 min (desde 2da hora) | Selector de duración: mínimo 1 hora. Desde la 2da hora, botones de ±15 minutos. |
| Zonificación nocturna | Zonas diferenciadas en mapa y selector de ubicación con etiqueta "Zona nocturna". |
| Permisionario como agente de cobro | El permisionario confirma cobros en efectivo, recibe su 80%, y puede reportar incidencias. |

---

## 6. Prevención de cobros indebidos

El sistema implementa tres capas de prevención:

1. **Bloqueo automático:** La app no permite iniciar estacionamiento en horarios/zonas no habilitadas. No depende del conductor ni del permisionario conocer las reglas — el sistema las aplica.
2. **Validación cruzada:** Cuando el conductor genera un QR, el monto está precalculado. El permisionario solo confirma; no puede modificar el monto. Esto elimina cobros incorrectos.
3. **Auditoría en tiempo real:** El dashboard municipal muestra alertas automáticas cuando se detecta un cobro en zona deshabilitada, un cobro en horario no permitido, o un vehículo con más de 2 horas de estacionamiento.

---

## 7. Flujo visual resumido

```
Inicio
  │
  ├─→ Onboarding (registro, vehículos, medio de pago, tour)
  │
  ├─→ Dashboard → "Comenzar a Estacionar"
  │
  ├─→ Seleccionar vehículo (patente + tipo)
  │
  ├─→ Detectar ubicación (GPS) → Validar zona y horario
  │     ├─ Zona habilitada → Continuar
  │     └─ Zona no habilitada / fuera de horario / feriado → Bloquear
  │
  ├─→ Seleccionar duración (mín 1h, +15min desde 2da hora)
  │
  ├─→ Seleccionar medio de pago
  │     │
  │     ├─→ [Digital] Mercado Pago / Tarjeta
  │     │     │
  │     │     ├─→ Pantalla de confirmación (resumen)
  │     │     ├─→ SDKMercado Pago embebido (<10 seg)
  │     │     └─→ Estacionamiento activo ✅ "Pago aprobado"
  │     │
  │     └─→ [Efectivo]
  │           │
  │           ├─→ Pantalla con QR dinámico (se renueva cada 5 min)
  │           ├─→ Conductor muestra QR al permisionario
  │           ├─→ Permisionario escanea y confirma
  │           └─→ Estacionamiento activo ✅ "Pago aprobado"
  │                 (estado intermedio: "Pendiente de verificación")
  │
  ├─→ Estacionamiento activo (timer, ticket digital, acciones)
  │     │
  │     ├─→ Extender tiempo (nuevo pago → nuevo cobro)
  │     ├─→ Descargar/compartir comprobante (PDF)
  │     ├─→ Liberar estacionamiento (+1 punto en beneficios)
  │     └─→ Reportar problema
  │
  └─→ Perfil (historial, vehículos, medios de pago, beneficios, infracciones, reclamos)
```

---

## 8. Conclusión

El flujo propuesto resuelve las cinco problemáticas centrales del sistema actual:

1. **Trazabilidad:** Todo cobro —digital o en efectivo— genera un registro electrónico con datos completos. La Municipalidad dispone de información en tiempo real.

2. **Control:** La aplicación bloquea automáticamente cobros indebidos (feriados, zonas deshabilitadas, fuera de horario). Los inspectores pueden consultar tickets por patente en tiempo real.

3. **Prevención de infracciones:** La validación automática de zonas, horarios y feriados elimina la posibilidad de cobros indebidos por desconocimiento.

4. **Reducción de costos operativos:** Se elimina el talonario físico. Los permisionarios no necesitan comprar ni trasladar talonarios.

5. **Inclusión de medios modernos:** La integración con Mercado Pago y el mecanismo de QR para efectivo digitalizan el 100% de los cobros sin excluir a ningún actor del sistema.

El permisionario mantiene su rol central en el cobro en efectivo, se garantiza la trazabilidad de todas las transacciones, y el conductor obtiene una experiencia de pago rápida (menos de 10 segundos en pago digital), transparente y conforme a la Ordenanza N.º 12.170.
