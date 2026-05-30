# Prompt de la Aplicación - SEM Digital Salta (Versión Mejorada)

---

## A. Aplicación Conductor (App móvil)

### Onboarding / Registro (Pantalla 0)

Pantalla de bienvenida con logo institucional del SEM Salta. El conductor puede registrarse con:

- Teléfono (verificación SMS) o cuenta de Google/Apple
- Datos obligatorios: nombre, apellido, DNI
- Carga de patente(s): puede registrar uno o más vehículos, indicando tipo (automóvil o motocicleta)
- Medio de pago preferido (configurable luego)

Tras el registro, se muestra un tour rápido de 3 slides explicando: cómo iniciar estacionamiento, cómo pagar, y cómo extender tiempo.

---

### Pestaña Principal (3 pantallas)

#### Pantalla 1: Inicio de estacionamiento

- **Selector de vehículo**: Campo de patente con menú desplegable que muestra patentes registradas previamente. Incluye la opción "Agregar nueva patente". Al lado, un ícono de auto o moto para indicar el tipo de vehículo (la tarifa cambia según la selección: $700/h auto, $300/h motocicleta).

- **Ubicación**: Cuadro con la dirección detectada por GPS (nombre de calle + numeración desde-hasta de la cuadra). Ícono de lápiz a la derecha para edición manual si el GPS no es preciso. Debajo del texto de ubicación se muestra:

  - Etiqueta verde: "Zona habilitada - Turno diurno" o "Zona habilitada - Turno nocturno" según corresponda.
  - Etiqueta roja: "Cobro no habilitado" si es feriado/no laborable en turno diurno, o si está fuera de horario.
  - Etiqueta roja con ícono de prohibido: "Zona no habilitada para estacionar" si la ubicación está fuera del área SEM.
  - Si es zona nocturna, se indica explícitamente: "Zona nocturna - Horario 22:00 a 05:00".

- **Duración del estacionamiento**: Cuadro con selector de tiempo.

  - Primera hora: selector fijo de 1 hora (mínimo obligatorio por ordenanza).
  - A partir de la 2da hora: aparecen botones de fracciones de 15 minutos (+15min, -15min) según lo establecido por la Ordenanza N.º 12.170 ("Fraccionamiento cada 15 minutos a partir de la segunda hora").
  - Se muestra el monto total calculado en tiempo real, aplicando:

    - Tarifa estándar según tipo de vehículo.

- **Medio de pago**: Cuadro con 3 opciones seleccionables:

  - **Mercado Pago** (ícono MP) — Crédito, débito y transferencia vía MP.
  - **Otros medios digitales** (ícono tarjeta) — Débito y crédito con otras pasarelas.
  - **Efectivo** (ícono billete) — Pago al permisionario. Se muestra ícono de alerta amarillo: "El pago deberá realizarse con el permisionario de la cuadra".

- **Botón "Continuar al pago"**: Deshabilitado si la zona no está habilitada para cobro. Habilitado solo cuando todos los campos están completos y la zona/horario son válidos.

---

#### Pantalla 2: Confirmación y pago

**Si el conductor eligió Mercado Pago u Otros medios digitales:**

- Resumen de la operación: patente, ubicación, tipo de vehículo, turno (diurno/nocturno), duración, precio final.
- Botón principal "Pagar con Mercado Pago" o "Pagar con tarjeta" que redirige a la pasarela de pago. La integración debe usar el SDK de Mercado Pago para que la transacción se complete sin salir de la app (webview embebida) en menos de 10 segundos, cumpliendo con el requisito de velocidad del antecedente municipal.
- Mientras se procesa el pago: spinner con texto "Procesando pago..."

**Si el conductor eligió Efectivo:**

- Alerta visible: "Diríjase al permisionario de la cuadra para efectuar el pago en efectivo. Muestre el código QR al permisionario."
- Código QR grande que codifica: patente, ubicación, tipo de vehículo, duración del estacionamiento, monto a pagar, timestamp de generación. El QR se renueva cada 5 minutos para evitar reuso.
- Botón secundario: "El permisionario ya cobró" o se deja "pendiente de cobro" — que avanza a la Pantalla 3 en estado "pendiente de verificación" (hasta que el permisionario confirme el cobro desde su app).

---

#### Pantalla 3: Estacionamiento activo

- **Notificación de estado**: Badge verde "Pago aprobado" (si pagó digitalmente) o Badge amarillo "Pago en efectivo - verificación pendiente" (si pagó en efectivo y el permisionario aún no confirmó).

- **Ticket digital**: Cuadro expandible con número de ticket (#SEM-XXXXX). Al desplegar muestra: patente, ubicación, tipo de vehículo, turno, hora de inicio, hora de vencimiento, fecha, medio de pago utilizado, monto abonado. Incluye un botón para copiar el número de ticket al portapapeles.

- **Temporizador visual**: Reloj circular con cuenta regresiva. Muestra:

  - Tiempo restante en formato HH:MM:SS en el centro.
  - Hora exacta de vencimiento debajo.
  - Barra de progreso que va de verde a amarillo a rojo conforme se acerca el vencimiento.
  - El color de fondo cambia: verde (>30 min restante), amarillo (<30 min), rojo (<10 min).

- **Botones de acción**:

  - **"Extender tiempo"**: Abre un modal con selector de tiempo adicional (fracciones de 15 min). Si el medio de pago fue digital, redirige a nueva pasarela de pago. Si fue efectivo, genera nuevo QR para cobro de la extensión. Se calcula el nuevo monto aplicando la tarifa correspondiente. Si es la 2da hora o más, permite fracciones de 15 min.
  - **"Descargar comprobante"**: Genera PDF del ticket con todos los datos del estacionamiento.
  - **"Compartir comprobante"**: Abre menú de compartir nativo del sistema (WhatsApp, email, etc.).

- **Botón "Liberar estacionamiento"**: Color rojo, con confirmación. Al presionar:

  - Dialog: "¿Desea liberar su estacionamiento? El tiempo restante seguirá corriendo y solo podrá utilizarse en otra cuadra habilitada."
  - Si confirma, se registra la hora de liberación, se libera el espacio en el sistema, y se emite comprobante final.

- **Cuadro "Reportar problema"**: Botón que abre un formulario con opciones predefinidas (cobro indebido, permisionario ausente, error en tarifa, problema técnico) y campo de texto libre. Se envía al sistema municipal para seguimiento.

- **Notificaciones push**: El sistema envía notificaciones automáticas al conductor:

  - 15 minutos antes del vencimiento: "Su estacionamiento vence en 15 minutos. ¿Desea extenderlo?"
  - Al vencimiento: "Su estacionamiento ha vencido. Libere el espacio o extienda el tiempo."

---

### Pestaña Mapa

- Mapa interactivo (Google Maps / Mapbox) centrado en el microcentro de Salta.
- Capa SEM superpuesta que colorea las cuadras:

  - **Verde**: Zonas con baja ocupación (0-50% de espacios ocupados). Permite al conductor identificar dónde hay disponibilidad.
  - **Amarillo**: Zonas con alta ocupación (50-90%).
  - **Rojo**: Zonas no habilitadas para estacionar (calles fuera del SEM, zonas restringidas).
  - **Azul oscuro**: Zonas de turno nocturno (Paseo Balcarce, Paseo Güemes, Plaza Alvarado, etc.). Se activan solamente en horario nocturno.

- Leyenda visible con los significados de cada color y fecha/hora del turno actual.
- Al tocar una cuadra, se muestra un card con: nombre de calle, tarifa vigente, horario del turno actual, y botón "Estacionar aquí" que redirige a la Pestaña Principal con la ubicación pre-cargada.
- Indicador de feriado/no laborable: si el día es feriado y es turno diurno, se muestra un banner rojo "Cobro diurno no habilitado - Feriado".

---

### Pestaña Perfil

- **Datos del conductor**: Nombre, apellido, DNI, teléfono, email. Botón editar.
- **Mis vehículos**: Lista de patentes registradas con tipo de vehículo (auto/moto). Botón agregar/eliminar vehículo.
- **Historial de estacionamiento**: Lista cronológica de todos los tickets, filtrable por fecha. Cada entrada muestra: fecha, patente, ubicación, duración, monto, estado (pagado, verificado, expirado, liberado). Al tocar un ticket se ve el detalle completo.
- **Medios de pago guardados**: Tarjetas registradas, cuenta Mercado Pago vinculada. Botón agregar/eliminar medio de pago.
- **Programa de beneficios**: Cuadro donde se acumulan puntos por cada estacionamiento digital (1 punto por cada $100 abonado digitalmente). Los puntos se pueden canjear por horas de estacionamiento gratis. Muestra: puntos acumulados, nivel actual (Bronce/Plata/Oro), premios disponibles.
- **Infracciones**: Lista de infracciones registradas (estacionamiento sin pago, exceso de tiempo, etc.) con estado (pendiente de pago, pagada, en reclamo). Desde aquí se pueden pagar infracciones pendientes.
- **Reclamos**: Lista de reclamos realizados con estado (abierto, en proceso, resuelto). Botón "Nuevo reclamo" que abre el formulario de reportar problema.
- **Configuración**: Notificaciones (on/off), idioma, modo oscuro, datos de cuenta.

## Requisitos técnicos

Crear únicamente navegación simulada entre pantallas.

No conectar bases de datos.

No realizar integración real con Mercado Pago.

No implementar autenticación real.

Usar datos ficticios coherentes.

El prototipo debe permitir navegar por ambos flujos: pago con Mercado Pago y pago en efectivo.