## C. Panel Municipal (Dashboard web)

### Dashboard principal

- **Mapa en tiempo real**: Visualización de todas las cuadras del SEM con nivel de ocupación en vivo, cobros en tiempo real, vehículos estacionados.

- **Métricas clave**: Recaudación del día, cantidad de tickets emitidos, cobros digitales vs efectivo, tasa de cumplimiento.

- **Alertas**: Cobros indebidos detectados automáticamente, cuadras sin permisionario activo, vehículos con más de 2 horas estacionados.

### Gestión de permisionarios

- ABM de permisionarios: alta, baja, modificación, asignación de cuadra.
- Monitoreo de actividad por permisionario: cobros registrados, ausencias, incidencias.

### Control y fiscalización

- Vista de inspector móvil: el inspector puede buscar por patente o escanear un código para ver si un vehículo tiene ticket activo.
- Generación de infracciones: formulario digital para labrar actas de infracción con foto y ubicación GPS.

### Tarifas y configuración

- Configuración de tarifas por tipo de vehículo y turno.
- Configuración de horarios y zonas habilitadas (con mapa interactivo).
- Gestión de feriados y días no laborables (se cargan en el sistema y se desactiva automáticamente el cobro diurno).

### Reportes y auditoría

- Reportes de recaudación por fecha, zona, permisionario, medio de pago.
- Auditoría de trazabilidad: cada ticket tiene un registro completo (quién cobró, cuándo, dónde, monto, medio de pago).
- Exportación a PDF/Excel.

---

## Notas de diseño UX/UI generales

- **Velocidad**: Toda transacción de pago digital debe completarse en menos de 10 segundos (lección del antecedente 2025). Usar SDK nativo de Mercado Pago con webview embebida, no redirección a browser externo.

- **Accesibilidad**: Tipografía grande en pantallas clave (ingreso de patente, duración, pago). Botones con áreas de toque amplias. Compatible con TalkBack/VoiceOver. Paleta de colores con contraste adecuado (WCAG AA).

- **Modo offline / baja conectividad**: La app almacena localmente el último estado de tickets activos para poder consultar offline. Si no hay datos, se muestra última información conocida con aviso de "datos actualizados al [fecha/hora]".

- **Modo visitante**: Si el conductor no quiere registrarse, puede usar la app en modo "invitado" donde ingresa la patente manualmente, sin guardar historial.

- **Prevención de cobros indebidos**: El sistema bloquea automáticamente el inicio de estacionamiento en horarios no habilitados (feriados diurnos, fuera de turno) y en zonas no contempladas por el SEM. Si un conductor intenta iniciar estacionamiento en un horario no permitido, se muestra un mensaje: "El cobro no está habilitado en este horario/zona. Día feriado / Fuera de horario de turno."

## Requisitos técnicos

Crear únicamente navegación simulada entre pantallas.

No conectar bases de datos.

No realizar integración real con Mercado Pago.

No implementar autenticación real.

Usar datos ficticios coherentes.

El prototipo debe permitir navegar por ambos flujos: pago con Mercado Pago y pago en efectivo.