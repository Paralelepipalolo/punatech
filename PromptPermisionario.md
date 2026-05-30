## B. Aplicación Permisionario (App móvil)

### Login

- Autenticación con legajo + contraseña provista por la Municipalidad.
- Opción de biometría (huella/face) para accesos posteriores.

### Pantalla Principal: Mi Cuadra

- **Mapa de la cuadra asignada**: Vista simplificada de la cuadra del permisionario (hasta 100 metros lineales). Se muestran los vehículos actualmente estacionados con cobro registrado (patente + hora de vencimiento).

- **Lista de estacionamientos activos en mi cuadra**: Cada entrada muestra:

  - Patente del vehículo
  - Hora de inicio y vencimiento
  - Medio de pago (digital/efectivo)
  - Estado del pago (verificado, pendiente de verificación)
  - Ícono de reloj con tiempo restante (se pone rojo si está por vencer)

- **Botón "Escanear QR"**: Abre la cámara para escanear el QR del conductor que paga en efectivo. Al escanear:

  - Se muestran los datos: patente, ubicación, duración, monto.
  - Se confirma el cobro: el permisionario ingresa el monto recibido en efectivo.
  - El sistema registra el pago digitalmente.
  - Se emite ticket digital al conductor.

- **Alertas automáticas**:

  - Vehículo sin ticket registrado en la cuadra (detectado por inspector o automáticamente).
  - Vehículos con estacionamiento por vencer.

### Pantalla: Registro de cobros

- Lista de todos los cobros del día: hora, patente, monto, medio de pago.
- Separador visual entre cobros digitales (donde el permisionario no interviene) y cobros en efectivo (donde el permisionario confirma).
- Resumen diario: total recaudado, monto a retener (20% Municipalidad), monto neto del permisionario.

### Pantalla: Liquidaciones

- Historial de liquidaciones (semanales/quincenales).
- Detalle: total cobros digitales, total cobros efectivo, retención municipal, neto percibido.
- Descarga de comprobantes de liquidación.

### Pantalla: Perfil

- Datos del permisionario: nombre, legajo, cuadra asignada, estado.
- Notificaciones del sistema.
- Botón "Reportar incidencia" (vehículos abandonados, conflictos, etc.).

---

## Requisitos técnicos

Crear únicamente navegación simulada entre pantallas.

No conectar bases de datos.

No realizar integración real con Mercado Pago.

No implementar autenticación real.

Usar datos ficticios coherentes.

El prototipo debe permitir navegar por ambos flujos: pago con Mercado Pago y pago en efectivo.