# Rol del Permisionario en el Nuevo Sistema y Garantía de Continuidad

**Proyecto:** SEM Digital Salta — Sistema de Estacionamiento Medido  
**Marco:** PunaTech 2026 — Ordenanza N.º 12.170  
**Equipo:** Florencia María Aguirrebengoa, Pablo Cinco Reynaga 

---

## 1. Resumen ejecutivo

El permisionario es —y sigue siendo— un actor central del sistema de estacionamiento medido de Salta. La digitalización no elimina su rol: lo transforma, lo fortalece y lo hace más transparente. Este documento describe en detalle qué hace el permisionario en el nuevo sistema, cómo se garantiza su continuidad económica, y cómo cada aspecto de su participación responde a las problemáticas identificadas en el diagnóstico del sistema actual.

### Vinculación con las problemáticas del diagnóstico

| Problemática actual | Cómo la resuelve la participación del permisionario |
|---|---|
| Ausencia de trazabilidad | El permisionario confirma cada cobro en efectivo mediante escaneo de QR, generando un registro digital con su legajo, monto, patente y timestamp. Además corrobora de que los vehículos, cuyos conductores no hayan interactuado con el permisionario, hayan pagado de manera virtual. |
| Control nulo | El permisionario puede reportar vehículos sin ticket y visualizar en su app todos los estacionamientos activos en su cuadra. La Municipalidad recibe datos en tiempo real. |
| Infracciones silenciosas | La app del permisionario muestra alertas de cobros indebidos, horarios habilitados y vehículos sin ticket. El permisionario ya no necesita conocer las reglas de memoria — el sistema se las comunica. |
| Costos operativos | Se elimina el traslado a la Municipalidad para comprar talonarios. La liquidación se calcula automáticamente y se visualiza en la app. |
| Exclusión de medios modernos | El permisionario participa activamente en el cobro digital (confirma cobros en efectivo vía QR) y ve reflejados los cobros digitales en su registro de actividad, sin intervención manual. |

### Vinculación con los requisitos obligatorios

| Requisito | Implementación |
|---|---|
| Inclusión social | El permisionario sigue siendo agente activo: confirma cobros en efectivo, reporta incidencias, y recibe su porcentaje de cada transacción. Su rol se digitaliza, no se elimina. |
| Plataforma de pago | Los cobros digitales se procesan sin intervención del permisionario, pero se registran a su nombre. Su porcentaje se calcula automáticamente. |
| Medios de pago | El efectivo se procesa mediante QR dinámico escaneado por el permisionario, garantizando trazabilidad. |
| Registro 100 % digital | Cada cobro —efectivo o digital— queda asociado al permisionario de la cuadra. Se elimina el talonario. |
| Cumplimiento normativo | La Ordenanza N.º 12.170 establece que el permisionario cobra en la cuadra y emite boleta. En el sistema digital, emite ticket digital. |
| Éxito en velocidad | La confirmación del permisionario al escanear un QR toma menos de 10 segundos. |

---

## 2. Rol del permisionario en el sistema actual vs. el nuevo sistema

### 2.1. Sistema actual (talonarios manuales)

| Función | Descripción |
|---|---|
| Cobro en efectivo | Cobra al conductor en la calle, entrega talonario físico como comprobante. |
| Emisión de boleta | Completa manualmente: patente, hora, fecha, número de boleta, monto. |
| Compra de talonarios | Se traslada periódicamente a la Municipalidad para adquirir talonarios, pagando el 20% de la recaudación estimada. |
| Control visual | Verifica que los vehículos en su cuadra tengan ticket visible en el parabrisas. |
| Reporte de infracciones | Puede indicar a la autoridad de control vehículos sin ticket, pero no tiene herramienta digital para hacerlo. |
| Liquidación | Se liquida periódicamente en la Municipalidad, en formato papel. |

**Problemas del sistema actual para el permisionario:**
- Debe comprar talonarios por adelantado (costo principalmente logístico).
- No tiene visibilidad en tiempo real sobre los cobros digitales que se hacen en su cuadra.
- Puede cometer errores en el cálculo manual del monto.
- La liquidación es opaca: no sabe con precisión cuánto le corresponde hasta que se liquida.
- Está expuesto a cobros indebidos por desconocimiento de horarios, feriados y prácticas fraudulentas.

### 2.2. Nuevo sistema (SEM Digital)

| Función | Descripción |
|---|---|
| Cobro en efectivo | El conductor genera un QR en su app. El permisionario lo escanea, verifica los datos y confirma el monto recibido. El cobro queda registrado digitalmente. |
| Cobro digital (sin intervención) | Los cobros hechos por Mercado Pago o tarjeta se registran automáticamente en la cuadra del permisionario. No requiere acción alguna. |
| Emisión de ticket digital | El sistema genera automáticamente el ticket con todos los datos obligatorios (patente, ubicación, duración, monto, medio de pago, ID del permisionario). El permisionario no completa nada manualmente. |
| Verificación visual | La app del permisionario muestra en tiempo real todos los vehículos estacionados en su cuadra con ticket activo, permitiéndole identificar vehículos sin pago. |
| Reporte de incidencias | Puede reportar desde su app: vehículos sin ticket, vehículos excedidos de tiempo, cobros indebidos, conflictos, vehículos abandonados y situaciones peligrosas. |
| Alertas automáticas | Recibe notificaciones cuando un estacionamiento en su cuadra está por vencer. |
| Liquidación transparente | Ve en su app el resumen diario: cobros digitales, cobros en efectivo, retención municipal (20%), neto percibido. Puede descargar comprobantes de liquidación. |
| Eliminación de talonarios | No necesita comprar ni trasladar talonarios. Todo se gestiona desde la app. |

---

## 3. Flujo detallado de la participación del permisionario

### 3.1. Cobro en efectivo (flujo principal del permisionario)

```
1. El conductor selecciona "Efectivo" en su app.
2. La app del conductor genera un código QR dinámico que contiene:
   - Patente
   - Ubicación
   - Tipo de vehículo
   - Duración
   - Monto a pagar
   - Timestamp de generación
3. El QR se renueva cada 5 minutos (seguridad contra reuso).
4. El conductor se acerca al permisionario y le muestra el QR en su pantalla.
5. El permisionario abre su app y presiona "Escanear QR".
6. La cámara del dispositivo del permisionario escanea el QR.
7. La app del permisionario muestra los datos del estacionamiento:
   - Patente: ABC 123
   - Ubicación: Caseros 400-500
   - Duración: 1 hora
   - Monto: $700
   - Tipo: Automóvil
8. El permisionario verifica que los datos coinciden con la situación real.
9. El permisionario confirma el cobro presionando "Confirmar cobro".
10. El sistema registra el pago con los siguientes campos:
    - Número de ticket: SEM-XXXXX
    - Patente: ABC 123
    - Ubicación: Caseros 400-500
    - Duración: 60 minutos
    - Monto: $700
    - Medio de pago: Efectivo
    - ID del permisionario: SEM-1042
    - Nombre del permisionario: José Mendoza
    - Timestamp: 2026-05-30T14:35:00Z
11. La app del conductor cambia de "Pendiente de verificación" a "Pago aprobado".
12. El ticket digital queda disponible para ambos: conductor y permisionario.
```

**Tiempo estimado del proceso completo:** 30 segundos desde el escaneo hasta la confirmación.

### 3.2. Cobro digital (sin intervención del permisionario)

```
1. El conductor selecciona "Mercado Pago" u "Otros medios digitales" en su app.
2. El pago se procesa automáticamente en menos de 10 segundos.
3. El ticket se genera automáticamente con:
   - Medio de pago: Digital (Mercado Pago / Tarjeta)
   - ID del permisionario asignado a la cuadra
4. El cobro aparece en el registro del permisionario como "Digital" (sin necesidad de acción).
5. El permisionario puede ver el cobro en su app en la sección "Cobros del día".
```

### 3.3. Verificación y control

```
1. El permisionario abre su app y ve "Mi Cuadra".
2. Se muestra una lista simplificada con los vehículos estacionados en su cuadra.
3. Cada vehículo muestra:
   - Patente
   - Hora de vencimiento
   - Medio de pago (digital/efectivo)
   - Estado (verificado/pendiente)
   - Tiempo restante (se pone rojo si está por vencer)
4. Si un vehículo NO aparece en la lista (no tiene ticket), el permisionario puede:
   - Presionar "Reportar incidencia" → "Vehículo sin ticket"
   - El sistema genera una alerta para los inspectores municipales.
5. El permisionario recibe notificaciones automáticas de:
   - Vehículos próximos a vencer y vencidos
```

### 3.4. Liquidación y cobros

```
1. El permisionario accede a "Cobros" en su app.
2. Se ve un resumen:
   - Total recaudado: $XX.XXX
   - Cobros digitales: $XX.XXX
   - Cobros efectivo: $XX.XXX
   - Retención municipal (20%): $X.XXX
   - Neto percibido: $XX.XXX
3. Ve la lista completa del día: hora, patente, monto, medio de pago, estado.
4. Los cobros se separan visualmente:
   - Cobros digitales (sin intervención del permisionario)
   - Cobros en efectivo (confirmados por el permisionario)
5. Puede acceder a "Liquidaciones" para ver el historial quincenal.
6. Puede descargar comprobantes de liquidación en PDF.
```

---

## 4. Garantía de continuidad económica del permisionario

### 4.1. Esquema de repartición

| Concepto | Sistema actual | Nuevo sistema |
|---|---|---|
| Ingreso del permisionario | 80% de cada cobro en efectivo (después de descontar la cuota del 20% por los talonarios) | 80% de cada cobro (digital y efectivo) |
| Cuota municipal | 20% (compra de talonarios por adelantado) | 20% (deducción automática por transacción) |
| Costo de talonarios | Sí — el permisionario debe comprarlos en la Municipalidad | No — se eliminan los talonarios físicos |
| Forma de cobro | Efectivo manual con talonario | Efectivo digital (QR) + digital automático |


### 4.2. Puntos a favor del sistema

1. La eliminación de talonarios reduce gastos operativos (no más traslados a la Municipalidad).
2. El sistema digital reduce la morosidad (cobros indebidos se previenen automáticamente)
3. La incurrencia (vehículos que no pagan porque el permisionario no está presente) se reduce porque el pago digital funciona 24/7.
4. Las prácticas fraudulentas se reducen (el registros por ambas partes conductor-permisionario permite que se auditen mutuamente mediante sus respectivos botones de reclamos).

### 4.3. Puntos a resolver del sistema

1. El sistema requiere que todos los permisionarios tengan un teléfono celular en condiciones para trabajar (cámara funcional, duraciónd e batería de almenos 8 horas). Este punto se puede abordar mediante un sistema de créditos para que los permisionarios adquieran teléfonos celulares.

2. Se requiere que los permisionarios tengan cierto dominio sobre el uso de teléfonos celulares. Se puede resolver con pequeñas capacitaciones sobre el uso de la aplicación.

3. Si las liquidaciones se realizan en la municipalidad, se mantiene la problemática de la logística.


## 6. Garantía de inclusión: qué pasa si el permisionario no tiene smartphone

El diagnóstico establece que "no debe asumirse que el permisionario dispone obligatoriamente de un dispositivo móvil propio". Para esto se contempla:

### 6.1. Mecanismo alternativo de confirmación de cobro en efectivo

Si el permisionario no tiene smartphone, se implementa un código numérico de 6 dígitos que el conductor ingresa en su app en lugar de escanear el QR:

1. El conductor genera el QR en su app como de costumbre.
2. Debajo del QR se muestra un **código numérico de 6 dígitos** (ej: `482917`).
3. El permisionario, que tiene una planilla o ficha proporcionada por la Municipalidad con códigos preasignados, verifica el código y confirma verbalmente al conductor.
4. El conductor ingresa el código en su app y presiona "Confirmar cobro en efectivo".
5. El sistema registra el cobro con el ID del permisionario asignado a la cuadra.

### 6.2. Fichas preasignadas

La Municipalidad puede proveer al permisionario un block de fichas numeradas con códigos QR impresos. El conductor escanea la ficha del permisionario como alternativa al intercambio de QR entre dispositivos.

### 6.3. Cobros digitales sin intervención

Los cobros digitales (Mercado Pago, tarjeta) se procesan automáticamente sin necesidad de que el permisionario tenga dispositivo. El sistema asigna el cobro a la cuadra correspondiente y lo registra a nombre del permisionario.

---

## 7. Cumplimiento normativo

| Disposición de la Ordenanza N.º 12.170 | Implementación en el rol del permisionario |
|---|---|
| Art. 6º — Permisionarios seleccionados por orden de prelación (discapacitados, madres solteras, sexagenarios) | El sistema mantiene el mismo orden de prelación. La digitalización no altera la selección ni los derechos existentes. |
| Art. 7º — Permiso personal e intransferible | El acceso a la app del permisionario es con legajo + contraseña (propios). El cobro se registra a nombre del permisionario asignado. No se permite que terceros cobren en su lugar. |
| Art. 8º — Obligación de cobrar por adelantado y emitir boleta | El ticket digital cumple esta función: se emite al momento del pago, contiene patente, fecha, hora, número de ticket y monto. Es más completo que la boleta física. |
| Art. 9º — Sanciones al permisionario | El sistema registra automáticamente: ausencias (si no hay cobros en su cuadra en horario hábil), cobros fuera de zona, actividad de terceros o acumulación de reclamos de parte de los conductores. Esto facilita la Fiscalización y protege al permisionario honesto. |
| Art. 10º — Control y supervisión | El dashboard municipal muestra en tiempo real la actividad de cada permisionario: cobros, ausencias, incidencias. Esto permite un control efectivo que hoy no existe. |

---

## 8. Transición del sistema actual al nuevo

La transición debe ser gradual y garantizar que ningún permisionario pierda ingresos durante el proceso:

| Fase | Descripción | Duración estimada |
|---|---|---|
| **1. Capacitación** | Talleres presenciales donde se enseña a usar la app, escanear QR y consultar liquidaciones. Se distribuyen folletos con instrucciones paso a paso. | 2 semanas |
| **2. Período de coexistencia** | El permisionario puede usar tanto talonarios como la app simultáneamente. Los cobros manuales se registran también en la app por el inspector municipal. | 4 semanas |
| **3. Uso exclusivo de la app** | Se retiran los talonarios físicos. Todos los cobros se registran digitalmente. Los permisionarios que no tengan smartphone usan el mecanismo de código numérico o fichas. | Permanente |
| **4. Ajuste y soporte** | Permanente. Mesa de ayuda telefónica y presencial para permisionarios. Actualizaciones de la app basadas en feedback. | Permanente |

---

## 9. Conclusión

El nuevo sistema transforma el rol del permisionario de un cobrador manual de talonarios a un **agente digital de verificación y control**:

1. **Su rol se mantiene como actor central:** Confirma cobros en efectivo, verifica vehículos en su cuadra, reporta incidencias.
2. **Sus ingresos se garantizan y probablemente aumentan:** Cobra por todas las transacciones de su cuadra (no solo efectivo). Elimina costos de talonarios y traslados.
3. **Se elimina la fricción operativa:** No más compra de talonarios, no más traslados a la Municipalidad, no más cálculos manuales.
4. **Se mejora la transparencia:** Ve en su app exactamente cuánto cobró, cuánto se retiene y cuánto le corresponde.
5. **Se previene el error y la infracción:** El sistema calcula automáticamente el monto, valida horarios y zonas, y alerta sobre irregularidades.
6. **Se respeta y se concientiza sobre la Ordenanza N.º 12.170:** El permisionario sigue cobrando por adelantado, emitiendo boleta (ahora digital), y cumpliendo sus obligaciones. La relación con la Municipalidad se mantiene en los mismos términos.

La digitalización del SEM no elimina al permisionario: lo empodera con herramientas que mejoran su trabajo, protegen sus ingresos y facilitan el cumplimiento normativo.
