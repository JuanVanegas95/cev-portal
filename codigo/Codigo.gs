/**
 * PORTAL DE CONSULTORÍA ESTRUCTURAL · Ing. Juan Vanegas
 * Juan + dibujantes (Diana Gutiérrez, María José). Clientes solo reciben estados de cuenta.
 * TODO va en este único archivo Código.gs. Lo que está bajo "PÁGINA" no se edita a mano.
 *
 * INSTALAR (una sola vez):
 *  1. En la hoja Consultoria_Estructural_Juan: Extensiones > Apps Script. Borre lo que haya y pegue este archivo.
 *  2. Configuración del proyecto (engranaje) > Zona horaria: (GMT-05:00) Guayaquil.
 *  3. Elija la función "instalar" y presione Ejecutar. Acepte los permisos (hoja, Drive, correo, activadores).
 *     Crea las pestañas P_..., carga usuarios, SVC Proyectos y sus proyectos, prepara carpetas y activadores.
 *  4. Implementar > Nueva implementación > Aplicación web. Ejecutar como: Yo. Quién tiene acceso: Cualquier usuario con cuenta de Google.
 *     Copie la URL y péguela en P_Config, fila "URL app".
 *  Después de pegar una versión nueva: Implementar > Administrar implementaciones > lápiz > Versión nueva > Implementar.
 *  MODO PRUEBA: en P_Config ponga "Modo prueba" = SI y todos los correos le llegan solo a usted con [PRUEBA].
 */

// ── CONSTANTES ─────────────────────────────────────────────────────────
const SHEET_ID = '1Yc3jfW_1gFVmsLP0QUKvQ5AII6vUax_IpLZEAt4lNG8';            // Consultoria_Estructural_Juan
const RAIZ_CONTRATANTES = '1hAfZP5ZRre7kqILUrugKUYIDS6qbMd3q';              // carpeta Contratantes en Drive
const TZ_EC = 'America/Guayaquil';
const APP = 'Consultora Estructural Vanegas';
const LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAJw0lEQVR4nO2de1BTVx7Hv+eGp8QkVORhVFCnVcGtgAIFX62KCMGyThe3dWfctXV0rI7tutudznZn7I59TGtpqbY623XXfcxsXaldIYIoIqLyFB8IqDyUaAkEUBEEIWhy9w/FAXIvJDeB45jz+Stzfuec/OZ8c3733PO7J5fACpKTk2WVdbp5HEgSMSOGJ5gKwBuAqzXtnYAHANoIj+sAKTDzfHrI9MDCtLQ003ANyVDG6Ohoz46eh++AJ1sBjHeoy88+LQBSFJ6yXUVFRd1ilUQFCJ4dsYoQ8iUA9Yi56AwQ/ASQrVUXSn4QMsuEmswKjfwQhOwCoBh5D595lACSfQPUnq0G/QkAfH/j4BnABYdGfk+AVaPro5NAyH+rLpSsBmDuKxowA0JmR31CCDZQcc45mOXrr3Z5PBOA/gI8ivn4mpprzsMC34CJla0G/RX0haBHqx1TNXhMou2dk6D3kJleOHfu3H0OANq7ze+ywR9V1D0m2WYAIMnJybLLtTea2Dp/1GkOfj5QLZO5ey3kQTbR9sYJkbfe7sjhzDxJou2Js8ITcxIHIIa2I84KAYnhAEyl7YgTM417fKvMoIOKA+BG2wsnxp2j7YGzwwSgDBOAMkwAyjABKMMEoAwTgDJMAMowASjDBKAME4AyTADKMAEowwSgDBOAMkwAyjABKMMEoIzLSHXsM24c5oSHwt/fD0qFAiqVEj09RnR2dUGnu4Ga2jpcu14PnucF23t4eMDHZ5zdfrS0tKK3txd+fr5wdbU80NPd3Y3bt+/Y1CfHcZgwIUDQ1t7egXv37lndl0MFkMvleD35Nby6IgFTpwQNW7+5uQW5efnYf+AHXK/XDbBFR0VgV+oXdvu0avWvcfnKVWzeuAErkxIt7E0GA+I0K2E2mwXbCxEeFop/7N0jaHtrwyaUlJZZ3ZdDQhAhBL9Z8yscz87Au1vetmrwAcDPzxerX09G+sH9SFqhcYQroqRrMwXLA/z9ER4WalNfKzTLBcubDAacLTtvU192CyCXy5Ga8hl+/9stkHt5SeqDEAKVamSfjjl3/gL0jU2CNrEBFcLNzQ3Lli4WtGkPH7FpJsFeAVxcXPB1ymdY8soie7oZFXiehzYzS9AWF7sE7u7uVvWzaME8jB07VtCmzcy22S+7rgHbPngfUZFzRe1tbW348ZAWhcUlaG5pRa/RCIVCgcDJkzAnPAyxS1/BeB8fm7+3vKIS9+/ft6puV1fXk88Z2ixsWPcmCBl4Mksul2Ph/Bjk5OYN219igvBsKb9UgXqdTtA2FJIFmBsehpU/XyFq12Yewcef7kBnvwEAgMYmA65W1+BoTi4+T0nFsqWL8c7mjTZ994fbP0Ft7TWbfb75UwMull9CWOhsC1uiJn5YARSKsVgwX/hR2nSt8OwaDskCbH57vagtXZuJP23bLrrE7OPhw4fIyj6G3Lx8BPj7SXXFJtK1WYICLJwfA6VSgfb2DtG2cbFL4OZm+SChsbcX2cdyJPkj6RowJSgIc+eEC9oamwz46NMdww5+f4xGI3Q3bkpxxWayjx2H0Wi0KHd1dUVc7JIh22pEws/J/NPo6LB+7d8fSQLEREeJ2v7z/QF0d4seDKdOZ2cnTpw8JWhLTIgXbTchwB9zRJarGYelhR9IDUGREXNEbTknhr+Q2cvG9euGDBV9FBYVC8b1DG0W4uNiLcrDQl+EWj0Ben2jhU0TH2dx8QaA27fv4ExBkU3+90eSAGLx+s6dNkHnHY3YOnwwnZ2dggIUFBWj9dYtixUYIQSa+Dh8t3efRZtEjfDsyDxyFCbTsP/JIYqkEOTtrRIsb711S7Ijo4nZbEZm1lFBm9BNWfDM6Zg2dYpgfbE7bGuRJIDXGOE73qc59g9GbOCmBAUhJHjmgDJNvPDFt7qmFtU1tXb5IUkAsd0+L4lbETSorbuGK1erBW2a+LgnnzmOE7xewAG/fki9Btxpa4NaPcGi3Hf8eBBCbFqCSuGLL3eiyWAYtl697saQ9kMZmZg5Y7pFeUL8MqSk7oLJZEJUxFz4+loeoTaZTMg8IhzGbEGSAPrGJvxsVohFuVKpQFBgoKRbclsoKC6WdCc8mKzsY3hv6xa4uAwcBp9x4xAdFYkzhUVIFNmoO1NQZHMeQQhJIaik9KyoLX658HR9Gmlra8NpkSWkJiEO7u7uohuNjgg/kCpAYVGJaJh5Y9Vr8FYJr5KeRsQGcunil6GJj4NcLrewdXTcQ/6pMw75fkkC6BubkJd/WtDm7e2Nj7dvE0z/ifHcc94InjlDiit2k3/qDO62t1uUe3p64r2tWwTbZB/LgbG31yHfLzkf8O2e70STDwvnx2DPN19BLZI37UOpVOCttWuQeSgNEXOF95ZGmgcPHuBItvBGmti+f3qGY8IP7NkNra6pxd6//xPr160VtL8UGQHt/w4gNy8fRcWlMDQ3o6enByqlEpMnT0J4WCjmRUdZnQjpz7/3/RVmk3WZpwMHf0Tqzt1D1sk4nIU3fvkLq/rT6W6gvKLSqrrWYFdCZtfuv2DSpImi62Q3NzfEx8WK2qViS+rTw91j2DoVlVW4Xq+zKpedbsfGmxB2pSR5nsf7H2zD3/b9y3EeUSLDioSK2WzGYQlpx6GwOylvMpnw1c5v8bs//BENDXpJffT09KBhFDbxhkKbNXxC/WzZeatuAG3BYc8FHc3JRU5uHpYvW4pXVyQgPDQUY8Z4itY3m824VFGJ47kncSjjsOBKZDRpbm5BSWkZol+KFK3jqLV/f0hIaOSI7BvIZDLMmP4C/P39oFIqoVIpYTQa0dXVhXrdTdTVXbPIFzsjIyYAwzrYw7mUYQJQhglAGSYAZZgAlGECUIYJQBkmAGWYAJRhAlCGCUAZJgBlmACUYQJQhglAGSYAZZgAlGECUIYJQBkOgGMecmRIwcgBoPs8iHNzlyM87D/pwJAIqeMAUkDbDeeFL+DMPJ9O2w1nhYBP50KmBxY+fgE9Y3Rprrx4tphLS0szAUih7Y2zwRN+BwAzBwBdqjE7AYzO35UwAKBB6eGyG32vNL+r0z30DZjYACC57y3bjBGDJzzWni8rqUD/d8q3GvSXx/ur3QiwgKp7zzo8+aiqvPTJf17K+ttaDfqTvgETZwCYRcW5Zx2e319VXroFwJMn0mWDq7Qa9Af9/NUAsIiFI4fBg+DzqotnNwEYcAxnsAAAgJZHM6ESBNHsdbd2c5PweLPqYuk3/X/5fQgKgEfh6IrXjOf3uPc86ADwIgDLI+OMoWgmIH/uUo1ZU1NSIHqu1doQw4XMjorhiTmJgMQAmAbAm72L+Am9ANoAXANQAJjTqy6WFQ0ON0L8H9fSHAHq26LCAAAAAElFTkSuQmCC';

const ETAPAS = [
  [1, 'Predimensionamiento', 'Juan'],
  [2, 'Trazado', 'Dibujante'],
  [3, 'Modelo ETABS', 'Claude + Juan'],
  [4, 'Dibujo completo', 'Dibujante'],
  [5, 'Revisión estructural', 'Claude + Juan'],
  [6, 'Correcciones', 'Dibujante'],
  [7, 'Plano terminado', 'Juan'],
  [8, 'Planilla de acero y hormigón', 'Claude'],
  [9, 'Presupuesto referencial', 'Claude'],
  [10, 'Memoria de cálculo', 'Claude']
];
const PASOS_DIBUJANTE = [2, 4];
const PASOS_JUAN = [1, 3, 5, 7, 8, 9, 10];          // los aprueba Juan directamente (con archivo manual o de Claude)
const PASOS_CLAUDE = [3, 5, 8, 9, 10];
const PREVIO = { 1: 0, 2: 1, 3: 2, 4: 3, 7: 5, 8: 7, 9: 8, 10: 9 };
const CARPETAS = ['01_Arquitectura', '01_Estudio_de_suelos', '02_Predimensionamiento', '03_Trazado', '04_Modelo_ETABS', '05_Planos', '06_Planillas',
  '07_Presupuesto_y_especificaciones', '08_Memoria_de_calculo', '09_Proformas_y_cobros'];
const CARPETA_PASO = { '-1': '01_Estudio_de_suelos', 0: '01_Arquitectura', 1: '02_Predimensionamiento', 2: '03_Trazado', 3: '04_Modelo_ETABS', 4: '05_Planos', 5: '05_Planos', 6: '05_Planos',
  7: '05_Planos', 8: '06_Planillas', 9: '07_Presupuesto_y_especificaciones', 10: '08_Memoria_de_calculo', 99: '09_Proformas_y_cobros' };
// Carpetas viejas (esquema de 5) → nombre nuevo. Solo se renombran; nada se mueve ni se borra.
const RENOMBRAR = [[/proforma|cobro/i, '09_Proformas_y_cobros'], [/memoria/i, '08_Memoria_de_calculo'], [/presupuesto|especific/i, '07_Presupuesto_y_especificaciones'],
  [/planilla/i, '06_Planillas'], [/plano/i, '05_Planos'], [/modelo|etabs/i, '04_Modelo_ETABS'], [/trazado/i, '03_Trazado'], [/predimen/i, '02_Predimensionamiento'], [/arquitect/i, '01_Arquitectura']];

const CHECKLIST = ['Ejes y cotas coinciden con la arquitectura vigente', 'Secciones iguales al modelo aprobado', 'Aceros mínimos y máximos',
  'Refuerzos adicionales', 'Estribos, confinamiento (zona Lo) y ganchos sísmicos', 'Recubrimientos', 'Traslapes y anclajes',
  'Detalles de nudos, losas y cimentación', 'Rótulo, capas de plantilla y cuadro de revisiones'];

// Ficha técnica: [grupo, clave, etiqueta, obligatorio, ayuda]
const FICHA = [
  ['General', 'uso', 'Uso de la edificación', 1, 'Vivienda, oficinas, comercio, bodega…'],
  ['General', 'pisos', 'Número de pisos', 1, ''],
  ['General', 'alturas', 'Alturas de entrepiso (m)', 1, 'Ej.: PB 3.40 · tipo 3.06'],
  ['General', 'ubicacion', 'Ubicación', 1, 'Ciudad, sector'],
  ['Sistema estructural', 'sistema', 'Sistema estructural', 1, 'Pórticos especiales HA con vigas descolgadas, vigas banda, muros, dual, acero…'],
  ['Sistema estructural', 'R', 'Factor de reducción R', 1, 'Según NEC-SE-DS'],
  ['Sistema estructural', 'phiP', 'φP (irregularidad en planta)', 1, '1.00 si es regular'],
  ['Sistema estructural', 'phiE', 'φE (irregularidad en elevación)', 1, '1.00 si es regular'],
  ['Sismo (NEC-SE-DS)', 'zona', 'Zona sísmica', 1, 'I a VI'],
  ['Sismo (NEC-SE-DS)', 'Z', 'Z (g)', 1, 'Zona V = 0.40'],
  ['Sismo (NEC-SE-DS)', 'suelo', 'Tipo de suelo', 1, 'A, B, C, D, E o F (estudio de suelos)'],
  ['Sismo (NEC-SE-DS)', 'Fa', 'Fa', 1, ''], ['Sismo (NEC-SE-DS)', 'Fd', 'Fd', 1, ''], ['Sismo (NEC-SE-DS)', 'Fs', 'Fs', 1, ''],
  ['Sismo (NEC-SE-DS)', 'eta', 'η (región)', 1, '1.80 Costa (excepto Esmeraldas) · 2.48 Sierra, Esmeraldas y Galápagos · 2.60 Oriente'],
  ['Sismo (NEC-SE-DS)', 'r', 'r', 1, '1.0 suelos A a D · 1.5 suelo E'],
  ['Sismo (NEC-SE-DS)', 'I', 'Importancia I', 1, '1.5 esenciales · 1.3 ocupación especial · 1.0 otras'],
  ['Materiales', 'fc', 'f’c por elemento (kg/cm²)', 1, 'Ej.: cimentación 280 · columnas 280 · vigas y losas 240'],
  ['Materiales', 'fy', 'fy (kg/cm²)', 1, '4200'],
  ['Materiales', 'recub', 'Recubrimientos (cm)', 1, 'Ej.: cimentación 7.5 · columnas y vigas 4 · losas 2.5'],
  ['Materiales', 'mamposteria', 'Mampostería', 0, ''],
  ['Cargas (NEC-SE-CG)', 'cm', 'Carga muerta adicional (kg/m²)', 1, 'Acabados, mampostería, instalaciones'],
  ['Cargas (NEC-SE-CG)', 'cv', 'Carga viva por uso (kg/m²)', 1, ''],
  ['Cargas (NEC-SE-CG)', 'cubierta', 'Cubierta (kg/m²)', 0, ''],
  ['Cargas (NEC-SE-CG)', 'especiales', 'Cargas especiales', 0, 'Tanques, equipos, piscinas…'],
  ['Cimentación', 'cimentacion', 'Tipo de cimentación', 0, ''],
  ['Cimentación', 'qadm', 'Capacidad admisible (t/m²)', 0, 'Estudio de suelos'],
  ['Cimentación', 'df', 'Profundidad de desplante (m)', 0, ''],
  ['Cimentación', 'nf', 'Nivel freático (m)', 0, '']
];

// Pestañas propias del portal (no toca las pestañas existentes de la hoja)
const T = {
  USU: ['P_Usuarios', ['Correo', 'Nombre', 'Iniciales', 'Rol', 'WhatsApp', 'Zona horaria', 'Valor lámina', 'Activo']],
  CLI: ['P_Clientes', ['Clave', 'Contratante', 'Contacto', 'Correo', 'WhatsApp', 'Carpeta ID', 'Activo']],
  PRO: ['P_Proyectos', ['ID', 'Cliente', 'Proyecto', 'Descripción', 'Servicio', 'Valor contrato', 'Anticipo %', 'Entregado', 'Carpeta ID', 'Estado', 'Creado', 'Notas', 'Fecha entrega']],
  ETA: ['P_Etapas', ['Proyecto ID', 'Paso', 'Etapa', 'Estado', 'Actualizado', 'Por', 'Archivos', 'Nota', 'Meta']],
  PLA: ['P_Planos', ['Proyecto ID', 'Rev', 'Fecha', 'Estado', 'Archivos', 'Por', 'Nota']],
  FIC: ['P_Ficha', ['Proyecto ID', 'Clave', 'Valor', 'Actualizado']],
  ENC: ['P_Encargos', ['ID', 'Proyecto ID', 'Paso', 'Tipo', 'Dibujante', 'Qué entregar', 'Láminas estimadas', 'Fecha límite', 'Estado', 'Ronda',
    'Asignado', 'Observaciones Juan', 'Recordatorio enviado', 'Atraso enviado', 'Rev arquitectura', 'Adjuntos']],
  ENT: ['P_Entregas', ['ID', 'Encargo ID', 'Proyecto ID', 'Paso', 'Ronda', 'Fecha', 'Dibujante', 'Archivos', 'Láminas', 'Valor lámina', 'Total declarado',
    'Estado', 'Láminas aprobadas', 'Valor aprobado', 'Total aprobado', 'Revisado', 'Nota', 'Checklist']],
  REV: ['P_Revisiones', ['Entrega ID', 'Ítem', 'Resultado', 'Lámina', 'Observación', 'Fecha']],
  MOV: ['P_Movimientos', ['ID', 'Fecha', 'Tipo', 'Proyecto ID', 'Cliente', 'Dibujante', 'Monto', 'Láminas', 'Detalle', 'Comprobante', 'Registrado']],
  CAM: ['P_Cambios', ['Proyecto ID', 'Rev', 'Fecha', 'Pedido por', 'Descripción', 'Impacto', 'Pasos reabiertos', 'Archivo', 'Láminas rehechas', 'Valor cobro']],
  PRF: ['P_Proformas', ['ID', 'Número', 'Fecha', 'Cliente', 'Atención', 'Proyecto', 'Proyecto ID', 'Estado', 'Ítems', 'Subtotal', 'Descuento', 'IVA %', 'Total',
    'Anticipo %', 'Forma de pago', 'Plazo', 'Exclusiones', 'Condiciones', 'Validez días', 'Archivo', 'Enviada', 'Respuesta', 'Nota']],
  CFG: ['P_Config', ['Clave', 'Valor', 'Nota']],
  LOG: ['P_Log', ['Fecha', 'Usuario', 'Acción', 'Detalle']]
};

/** Fuente única del código: github.com/JuanVanegas95/cev-portal/blob/main/codigo/Codigo.gs
 *  Antes de cambiar el portal: partir SIEMPRE de ese archivo (o de la versión publicada), nunca de una copia vieja. */
const VERSION_PORTAL = '23 · 21/11/2026';
const CFG_DEF = [
  ['Correo admin', '', 'Vacío = la cuenta dueña del script'],
  ['URL app', '', 'URL de la aplicación web publicada'],
  ['Modo prueba', 'NO', 'SI = todos los correos llegan solo a Juan con [PRUEBA]'],
  ['Hora resumen', 10, 'Hora del resumen diario (Ecuador)'],
  ['Hora recordatorios', 9, 'Hora local de cada dibujante para recordatorios y atrasos'],
  ['Valor lámina', 35, 'Valor por defecto por lámina (USD)'],
  ['Vence licencia ETABS', '2027-11-20', 'ETABS Ultimate 22.6.0 · standalone JPVANEGAS'],
  ['Logo URL', '', 'Imagen PNG del logo JV para la pestaña del navegador'],
  ['Google Client ID', '', 'Opcional: OAuth Client ID para el botón "Iniciar sesión con Google"'],
  ['Empresa', 'Consultora Estructural Vanegas', 'Nombre de la empresa (CEV) en membretes'],
  ['Firma', 'Ing. Juan Pablo Vanegas, MSc.', 'Nombre en membrete, correos y documentos'],
  ['Subtítulo', 'Consultoría y Diseño Estructural', 'Debajo del nombre en el membrete'],
  ['Contacto', 'juanpvanegasp@gmail.com · 098 509 8254', 'Correo y teléfono del membrete'],
  ['Datos de pago', 'Transferencia o depósito a:\nBanco Guayaquil · Cuenta de Ahorros\nN.º 0015332497\nTitular: Juan Pablo Vanegas Pinos\nC.I.: 0923966501', 'Bloque "¿Cómo pagar?" del estado de cuenta'],
  ['Pesos etapas', '2:30, 3:10, 4:30, 5:5, 6:10, 7:5, 8:4, 9:3, 10:3', 'Reparto (%) del tiempo entre etapas para calcular la meta interna de cada una, desde el envío del predimensionamiento hasta la entrega al cliente'],
  ['Checklist entrega', 'Rótulo completo: proyecto, lámina, fecha y revisión\nQR de la revisión pegado en el rótulo\nDibujado con la plantilla CEV (capas EST-)\nEjes y cotas completos, iguales a la arquitectura vigente\nCuadros de columnas y vigas con armado\nNotas generales y especificaciones de materiales\nDWG y DXF (AutoCAD 2018) adjuntos', 'Lo que la dibujante confirma antes de enviar una entrega (una línea por punto)'],
  ['Plantilla dibujo', '', 'Enlace a la plantilla .dwt/.dwg de CEV (se sube desde Ajustes)'],
  ['Después de pagar', 'Envíe el comprobante a juanpvanegasp@gmail.com o por WhatsApp al 098 509 8254, indicando el proyecto.', 'Bloque "Después de pagar"']
];

// ── UTILIDADES ─────────────────────────────────────────────────────────
const esc_ = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const r2 = x => Math.round((Number(x) || 0) * 100) / 100;
const usd_ = v => '$' + r2(v).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, 'X').replace('.', ',').replace(/X/g, '.');
const hoy_ = () => Utilities.formatDate(new Date(), TZ_EC, 'yyyy-MM-dd');
const ahora_ = () => Utilities.formatDate(new Date(), TZ_EC, 'yyyy-MM-dd HH:mm');
const id_ = () => Utilities.getUuid().replace(/-/g, '').slice(0, 10);
const norm_ = e => String(e || '').trim().toLowerCase();
const ymd_ = v => v instanceof Date ? Utilities.formatDate(v, TZ_EC, 'yyyy-MM-dd') : String(v == null ? '' : v).trim().replace(/^'/, '');
const dmy_ = v => { const s = ymd_(v); const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s); return m ? m[3] + '/' + m[2] + '/' + m[1] : s; };
const dias_ = (a, b) => Math.round((Date.parse(ymd_(b) + 'T12:00:00Z') - Date.parse(ymd_(a) + 'T12:00:00Z')) / 864e5);   // b - a
const etapaNombre_ = p => (ETAPAS.filter(e => e[0] === Number(p))[0] || [0, 'Etapa ' + p])[1];
function wa_(num, texto) {
  let n = String(num || '').replace(/\D/g, '');
  if (/^0\d{9}$/.test(n)) n = '593' + n.slice(1);
  return n.length >= 10 ? 'https://wa.me/' + n + '?text=' + encodeURIComponent(texto) : '';
}

let SS_ = null;
function ss_() { return SS_ || (SS_ = SpreadsheetApp.openById(SHEET_ID)); }
function hoja_(t) {
  let sh = ss_().getSheetByName(t[0]);
  if (!sh) {
    sh = ss_().insertSheet(t[0]);
    sh.getRange(1, 1, 1, t[1].length).setValues([t[1]]).setFontWeight('bold').setBackground('#3D434A').setFontColor('#FFFFFF').setFontFamily('Arial');
    sh.setFrozenRows(1);
    sh.getRange(2, 1, Math.max(sh.getMaxRows() - 1, 1), t[1].length).setNumberFormat('@');   // todo como texto: sin fechas ni números convertidos
  }
  return sh;
}
const CACHE_ = {};
function filas_(t) {
  if (CACHE_[t[0]]) return CACHE_[t[0]];
  const sh = hoja_(t), n = sh.getLastRow();
  const v = n > 1 ? sh.getRange(2, 1, n - 1, t[1].length).getValues() : [];
  return (CACHE_[t[0]] = v.map((r, i) => { const o = { _fila: i + 2 }; t[1].forEach((h, k) => o[h] = r[k] instanceof Date ? ymd_(r[k]) : r[k]); return o; }));
}
function agregar_(t, o) {
  const sh = hoja_(t), fila = t[1].map(h => o[h] == null ? '' : o[h]);
  sh.appendRow(fila);
  delete CACHE_[t[0]];
}
function editar_(t, filaNum, cambios) {
  const sh = hoja_(t);
  Object.keys(cambios).forEach(h => { const k = t[1].indexOf(h); if (k >= 0) sh.getRange(filaNum, k + 1).setValue(cambios[h] == null ? '' : cambios[h]); });
  delete CACHE_[t[0]];
}
function buscar_(t, campo, valor) { return filas_(t).filter(o => String(o[campo]) === String(valor)); }
function uno_(t, campo, valor) { return buscar_(t, campo, valor)[0] || null; }
function log_(u, accion, det) { try { agregar_(T.LOG, { Fecha: ahora_(), Usuario: u || '', Acción: accion, Detalle: String(det || '').slice(0, 500) }); } catch (e) { } }

let CFG_ = null;
function cfg_(k) {
  if (!CFG_) { CFG_ = {}; filas_(T.CFG).forEach(o => CFG_[String(o.Clave).trim()] = o.Valor); }
  return k ? CFG_[k] : CFG_;
}
function dueno_() { return norm_(Session.getEffectiveUser().getEmail()); }
function admin_() { return norm_(cfg_('Correo admin')) || dueno_(); }
function prueba_() { return /^S/i.test(String(cfg_('Modo prueba') || '')); }
function urlApp_() { let u = String(cfg_('URL app') || '').trim(); if (!u) try { u = ScriptApp.getService().getUrl() || ''; } catch (e) { } return u; }

// ── USUARIOS Y SESIONES ────────────────────────────────────────────────
function usuario_(email) {
  email = norm_(email); if (!email) return null;
  const o = uno_(T.USU, 'Correo', email);
  if (o && /^S/i.test(String(o.Activo || 'SI'))) return { email: email, nombre: o.Nombre || email, ini: o.Iniciales || '', rol: String(o.Rol || 'DIBUJANTE').toUpperCase(),
    wa: o.WhatsApp || '', tz: o['Zona horaria'] || TZ_EC, valor: Number(o['Valor lámina']) || Number(cfg_('Valor lámina')) || 35 };
  if (email === dueno_()) return { email: email, nombre: 'Juan', ini: 'JV', rol: 'ADMIN', wa: '', tz: TZ_EC, valor: 35 };
  return null;
}
function nombre_(email) { const o = uno_(T.USU, 'Correo', norm_(email)); return o ? (o.Nombre || o.Correo) : String(email || ''); }
const DIAS_SESION = 365;
function nuevaSesion_(email) {
  const t = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '').slice(0, 8);
  PropertiesService.getScriptProperties().setProperty('S_' + t, JSON.stringify({ e: norm_(email), x: Date.now() + DIAS_SESION * 864e5 }));
  return t;
}
function sesion_(t) {
  if (!t || !/^[a-f0-9]{40}$/.test(String(t))) return null;
  const p = PropertiesService.getScriptProperties(), v = p.getProperty('S_' + t);
  if (!v) return null;
  const s = JSON.parse(v);
  if (s.x < Date.now()) { p.deleteProperty('S_' + t); return null; }
  return usuario_(s.e);
}
function limpiarSesiones_() {
  const p = PropertiesService.getScriptProperties(), all = p.getProperties(), now = Date.now();
  Object.keys(all).forEach(k => { if (/^S_/.test(k)) try { if (JSON.parse(all[k]).x < now) p.deleteProperty(k); } catch (e) { p.deleteProperty(k); } });
}
function sesionDueno_() {   // Juan entra directo con su cuenta, sin código
  const p = PropertiesService.getScriptProperties(), t = p.getProperty('DUENO_TOKEN');
  if (t && sesion_(t)) return t;
  const n = nuevaSesion_(dueno_()); p.setProperty('DUENO_TOKEN', n); return n;
}

/** Login 1: código de 6 dígitos al correo (siempre disponible). */
function pedirCodigo(email) {
  email = norm_(email);
  const u = usuario_(email);
  if (!u) return { ok: false, msg: 'Ese correo no está autorizado en el portal.' };
  const c = CacheService.getScriptCache(), k = 'N_' + email, n = Number(c.get(k) || 0);
  if (n >= 5) return { ok: false, msg: 'Demasiados intentos. Espere 15 minutos.' };
  c.put(k, String(n + 1), 900);
  const cod = String(Math.floor(100000 + Math.random() * 900000));
  c.put('C_' + email, cod, 600);
  MailApp.sendEmail({ to: email, name: APP, subject: 'Código de acceso: ' + cod,
    htmlBody: caja_(`<p>Hola ${esc_(u.nombre)}:</p><p>Su código para entrar al portal es</p><p style="font-size:28px;letter-spacing:6px;font-weight:bold;color:#3D434A">${cod}</p><p style="color:#6E7679">Vence en 10 minutos. Si no lo pidió, ignore este correo.</p>`) });
  return { ok: true };
}
function verificarCodigo(email, codigo) {
  email = norm_(email);
  const c = CacheService.getScriptCache(), k = 'C_' + email, v = c.get(k);
  if (!v || String(codigo).trim() !== v) return { ok: false, msg: 'Código incorrecto o vencido.' };
  c.remove(k);
  const u = usuario_(email); if (!u) return { ok: false, msg: 'Correo no autorizado.' };
  log_(email, 'ingreso', 'código');
  return { ok: true, token: nuevaSesion_(email) };
}
/** Login 2: botón "Iniciar sesión con Google" (requiere Google Client ID en P_Config). */
function loginGoogle(idToken) {
  const cid = String(cfg_('Google Client ID') || '').trim();
  if (!cid) return { ok: false, msg: 'El inicio con Google no está configurado. Use el código por correo.' };
  const r = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken), { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return { ok: false, msg: 'No se pudo verificar la cuenta de Google.' };
  const j = JSON.parse(r.getContentText());
  if (j.aud !== cid || String(j.email_verified) !== 'true') return { ok: false, msg: 'Cuenta de Google no válida.' };
  const u = usuario_(j.email); if (!u) return { ok: false, msg: 'La cuenta ' + j.email + ' no está autorizada en el portal.' };
  log_(u.email, 'ingreso', 'google');
  return { ok: true, token: nuevaSesion_(u.email) };
}
function salir(token) { if (token) PropertiesService.getScriptProperties().deleteProperty('S_' + token); return { ok: true }; }

// ── PÁGINA ─────────────────────────────────────────────────────────────
function doGet(ev) {
  if (ev && ev.parameter && ev.parameter.v) return verificarPlano_(String(ev.parameter.v), Number(ev.parameter.r) || 0);
  if (!ss_().getSheetByName(T.CFG[0])) return HtmlService.createHtmlOutput('<p style="font-family:Arial;padding:24px">Falta instalar: abra el editor de Apps Script y ejecute la función <b>instalar</b>.</p>');
  const yo = norm_(Session.getActiveUser().getEmail());
  const boot = { token: yo && yo === dueno_() ? sesionDueno_() : '', clientId: String(cfg_('Google Client ID') || ''), app: APP, prueba: prueba_() };
  const out = HtmlService.createHtmlOutput(PAGE.replace('__BOOT__', JSON.stringify(boot).replace(/</g, '\\u003c')))
    .setTitle('CEV · ' + APP).addMetaTag('viewport', 'width=device-width, initial-scale=1').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  const logo = String(cfg_('Logo URL') || '').trim(); if (logo) try { out.setFaviconUrl(logo); } catch (e) { }
  return out;
}

/** Punto único de entrada desde la página. req = {token, accion, datos} */
function api(req) {
  try {
    const u = sesion_(req && req.token);
    if (!u) return { ok: false, auth: false, msg: 'Su sesión venció. Ingrese de nuevo.' };
    const a = ACCIONES[req.accion];
    if (!a) throw new Error('Acción desconocida: ' + req.accion);
    if (a.admin && u.rol !== 'ADMIN') throw new Error('Solo Juan puede hacer esto.');
    let lock = null;
    if (a.w) { lock = LockService.getScriptLock(); lock.waitLock(30000); }
    try {
      const r = a.fn(u, req.datos || {}) || {};
      if (a.w) log_(u.email, req.accion, JSON.stringify(req.datos || {}).replace(/"b64":"[^"]*"/g, '"b64":"…"'));
      return Object.assign({ ok: true }, r);
    } finally { if (lock) lock.releaseLock(); }
  } catch (err) {
    const m = String(err && err.message || err);
    // Solo fallas inesperadas (no los avisos normales como "Falta…" o "Suba…")
    const inesperado = (err && err.name && err.name !== 'Error') || /(exception|service|cannot|undefined|null|is not a function|timed? ?out|tiempo|quota|cuota|límite|limit|denegado|denied|permission|permiso|no se pudo|failed|falló)/i.test(m);
    try { if (req && req.accion && inesperado) log_('', 'error', req.accion + ': ' + m.slice(0, 300)); } catch (x) { }
    return { ok: false, msg: m };
  }
}

const ACCIONES = {
  inicio: { fn: (u) => u.rol === 'ADMIN' ? inicioAdmin_() : inicioDibujante_(u) },
  proyecto: { admin: 1, fn: (u, d) => detalleProyecto_(d.id) },
  encargo: { fn: (u, d) => detalleEncargo_(u, d.id) },
  guardarProyecto: { admin: 1, w: 1, fn: (u, d) => guardarProyecto_(d) },
  anotarProforma: { admin: 1, w: 1, fn: (u, d) => { const p = proyecto_(d.id); editar_(T.PRO, p._fila, { Notas: (p.Notas ? p.Notas + '\n' : '') + 'Proforma del cliente (' + dmy_(hoy_()) + '): ' + (d.nombre || '') + ' · ' + (d.url || '') }); return { msg: 'Proforma guardada.' }; } },
  prepararCarpetas: { admin: 1, w: 1, fn: (u, d) => ({ msg: prepararCarpetas_(d.id).join(' · ') || 'Carpetas al día.' }) },
  guardarFicha: { admin: 1, w: 1, fn: (u, d) => guardarFicha_(u, d) },
  fichaModelo: { admin: 1, w: 1, fn: (u, d) => fichaDesdeModelo_(d.proyectoId) },
  asignar: { admin: 1, w: 1, fn: (u, d) => asignar_(u, d) },
  archivarProyecto: { admin: 1, w: 1, fn: (u, d) => archivarProyecto_(u, d) },
  eliminarProyecto: { admin: 1, w: 1, fn: (u, d) => eliminarProyecto_(u, d) },
  enviarPredim: { admin: 1, w: 1, fn: (u, d) => enviarPredim_(u, d) },
  aprobarEtapa: { admin: 1, w: 1, fn: (u, d) => aprobarEtapa_(u, d) },
  paraClaude: { admin: 1, w: 1, fn: (u, d) => paraClaude_(u, d) },
  archivosEtapa: { admin: 1, fn: (u, d) => archivosEtapa_(d) },
  saltarA: { admin: 1, w: 1, fn: (u, d) => saltarA_(u, d) },
  iniciarSubida: { w: 1, fn: (u, d) => iniciarSubida_(u, d) },
  subirTrozo: { fn: (u, d) => subirTrozo_(u, d) },
  entregar: { w: 1, fn: (u, d) => entregar_(u, d) },
  revisar: { admin: 1, w: 1, fn: (u, d) => revisar_(u, d) },
  registrarCambio: { admin: 1, w: 1, fn: (u, d) => registrarCambio_(u, d) },
  registrarCobro: { admin: 1, w: 1, fn: (u, d) => registrarCobro_(u, d) },
  registrarPago: { admin: 1, w: 1, fn: (u, d) => registrarPago_(u, d) },
  cuentas: { admin: 1, fn: () => cuentasAdmin_() },
  proformas: { admin: 1, fn: () => proformas_() },
  guardarProforma: { admin: 1, w: 1, fn: (u, d) => guardarProforma_(u, d) },
  verProforma: { admin: 1, fn: (u, d) => ({ html: htmlProforma_(proforma_(d.id)), f: vistaProforma_(proforma_(d.id)) }) },
  descargarProforma: { admin: 1, fn: (u, d) => { const b = pdfProforma_(proforma_(d.id)); return { b64: Utilities.base64Encode(b.getBytes()), nombre: b.getName() }; } },
  enviarProforma: { admin: 1, w: 1, fn: (u, d) => enviarProforma_(u, d) },
  aprobarProforma: { admin: 1, w: 1, fn: (u, d) => aprobarProforma_(u, d) },
  rechazarProforma: { admin: 1, w: 1, fn: (u, d) => { const f = proforma_(d.id); editar_(T.PRF, f._fila, { Estado: 'RECHAZADA', Respuesta: "'" + hoy_(), Nota: d.nota || f.Nota || '' }); return { msg: 'Proforma marcada como rechazada.' }; } },
  eliminarProforma: { admin: 1, w: 1, fn: (u, d) => eliminarProforma_(u, d) },
  estadoCuenta: { fn: (u, d) => vistaEstado_(u, d) },
  enviarEstado: { admin: 1, w: 1, fn: (u, d) => enviarEstado_(u, d) },
  descargarEstado: { fn: (u, d) => descargarEstado_(u, d) },
  ajustes: { admin: 1, fn: () => (asegurarConfig_(), { version: VERSION_PORTAL, plantilla: plantilla_(), usuarios: filas_(T.USU), clientes: filas_(T.CLI), config: filas_(T.CFG), cuota: MailApp.getRemainingDailyQuota() }) },
  ponerMeta: { admin: 1, w: 1, fn: (u, d) => ponerMeta_(u, d) },
  qr: { fn: (u, d) => qrInfo_(u, d) },
  registrarRev: { admin: 1, w: 1, fn: (u, d) => { const p = proyecto_(d.proyectoId), n = registrarRev_(p, u, d.rev, d.nota); return { msg: 'Planos Rev. ' + n + ' registrados como vigentes. Los QR de revisiones anteriores ahora muestran "reemplazada".' }; } },
  guardarPlantilla: { admin: 1, w: 1, fn: (u, d) => guardarPlantilla_(d) },
  guardarUsuario: { admin: 1, w: 1, fn: (u, d) => guardarFila_(T.USU, 'Correo', Object.assign({}, d, { Correo: norm_(d.Correo) })) },
  guardarCliente: { admin: 1, w: 1, fn: (u, d) => guardarFila_(T.CLI, 'Clave', d) },
  guardarConfig: { admin: 1, w: 1, fn: (u, d) => guardarFila_(T.CFG, 'Clave', d) }
};

// ── DATOS DE NEGOCIO ───────────────────────────────────────────────────
function proyectos_() { return filas_(T.PRO).filter(p => p.ID && String(p.Estado).toUpperCase() !== 'ARCHIVADO'); }
function proyecto_(id) { const p = uno_(T.PRO, 'ID', id); if (!p) throw new Error('Proyecto no encontrado.'); return p; }
function cliente_(clave) { return uno_(T.CLI, 'Clave', clave) || { Clave: clave, Contratante: clave }; }
function etapas_(pid) {
  const E = {}; buscar_(T.ETA, 'Proyecto ID', pid).forEach(e => E[Number(e.Paso)] = e);
  const ent = /^S/i.test(String((uno_(T.PRO, 'ID', pid) || {}).Entregado || ''));
  return ETAPAS.map(x => { const e = E[x[0]]; return { paso: x[0], nombre: x[1], resp: x[2], estado: e ? String(e.Estado || 'PENDIENTE') : ent ? 'APROBADO' : 'PENDIENTE',
    fecha: e ? String(e.Actualizado || '') : '', por: e ? String(e.Por || '') : '', archivos: e ? String(e.Archivos || '') : '', nota: e ? String(e.Nota || '') : '', _fila: e ? e._fila : 0 }; });
}
function ponerEtapa_(pid, paso, estado, por, extra) {
  const e = buscar_(T.ETA, 'Proyecto ID', pid).filter(x => Number(x.Paso) === Number(paso))[0];
  const c = Object.assign({ Estado: estado, Actualizado: ahora_(), Por: por || '' }, extra || {});
  if (e) editar_(T.ETA, e._fila, c);
  else agregar_(T.ETA, Object.assign({ 'Proyecto ID': pid, Paso: paso, Etapa: etapaNombre_(paso) }, c));
}
// ── METAS INTERNAS POR ETAPA ───────────────────────────────────────────
// Desde el envío del predimensionamiento (o la creación del proyecto) hasta la entrega al cliente, el tiempo
// hábil se reparte entre las etapas según "Pesos etapas". Juan puede fijar a mano la meta de una etapa (columna Meta).
function pesos_() {
  const o = {}; String(cfg_('Pesos etapas') || '2:30, 3:10, 4:30, 5:5, 6:10, 7:5, 8:4, 9:3, 10:3').split(/[,;\n]+/).forEach(x => { const m = x.match(/(\d+)\s*:\s*([\d.]+)/); if (m) o[Number(m[1])] = Number(m[2]); });
  return o;
}
const fecha_ = f => new Date(f + 'T12:00:00-05:00');
const ymdD_ = d => Utilities.formatDate(d, TZ_EC, 'yyyy-MM-dd');
function habiles_(a, b) { let n = 0; const d = fecha_(a), fin = fecha_(b); while (d < fin) { d.setDate(d.getDate() + 1); const w = d.getDay(); if (w && w !== 6) n++; } return n; }
function masHabiles_(a, n) { const d = fecha_(a); let k = 0; while (k < n) { d.setDate(d.getDate() + 1); const w = d.getDay(); if (w && w !== 6) k++; } return ymdD_(d); }
function metas_(p, E) {
  const D = ymd_(p['Fecha entrega'] || '').slice(0, 10); if (!/^\d{4}-\d{2}-\d{2}$/.test(D)) return {};
  E = E || etapas_(p.ID);
  const e1 = E.filter(e => e.paso === 1)[0] || {}, r1 = buscar_(T.ETA, 'Proyecto ID', p.ID).filter(e => Number(e.Paso) === 1)[0] || {};
  let S = (e1.estado === 'APROBADO' && e1.nota !== 'Hecho antes del portal' ? ymd_(r1.Actualizado || '') : ymd_(p.Creado || '')).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(S) || S > D) S = hoy_() < D ? hoy_() : D;
  const W = pesos_(), pasos = ETAPAS.map(x => x[0]).filter(n => n >= 2 && W[n] > 0), tot = pasos.reduce((s, n) => s + W[n], 0) || 1, N = habiles_(S, D), M = {};
  let cum = 0; pasos.forEach(n => { cum += W[n]; M[n] = cum >= tot ? D : masHabiles_(S, Math.round(N * cum / tot)); });
  buscar_(T.ETA, 'Proyecto ID', p.ID).forEach(e => { const m = ymd_(e.Meta || '').slice(0, 10); if (/^\d{4}-\d{2}-\d{2}$/.test(m)) M[Number(e.Paso)] = m; });
  return M;
}
function ponerMeta_(u, d) {
  const p = proyecto_(d.proyectoId), paso = Number(d.paso), f = String(d.fecha || '').trim();
  if (f && !/^\d{4}-\d{2}-\d{2}$/.test(f)) throw new Error('Fecha no válida.');
  const e = buscar_(T.ETA, 'Proyecto ID', p.ID).filter(x => Number(x.Paso) === paso)[0];
  if (e) editar_(T.ETA, e._fila, { Meta: f ? "'" + f : '' }); else agregar_(T.ETA, { 'Proyecto ID': p.ID, Paso: paso, Etapa: etapaNombre_(paso), Estado: 'PENDIENTE', Actualizado: ahora_(), Meta: f ? "'" + f : '' });
  return { msg: f ? 'Meta de la etapa ' + paso + ': ' + dmy_(f) + '.' : 'La etapa ' + paso + ' vuelve a la meta automática.' };
}
/** Estado de la meta: dias que faltan (negativo = atrasada). */
const diasMeta_ = m => m ? dias_(hoy_(), m) : null;
const aprobado_ = (E, paso) => !paso || (E.filter(e => e.paso === paso)[0] || {}).estado === 'APROBADO';
function etapaActual_(E) { const e = E.filter(x => x.estado !== 'APROBADO')[0]; return e ? e : { paso: 11, nombre: 'Terminado', estado: 'TERMINADO' }; }
function ficha_(pid) { const F = {}; buscar_(T.FIC, 'Proyecto ID', pid).forEach(f => F[f.Clave] = { v: f.Valor, fila: f._fila }); return F; }
function fichaFaltan_(pid) { const F = ficha_(pid); return FICHA.filter(f => f[3] && !String((F[f[1]] || {}).v || '').trim()).map(f => f[2]); }

function costoAprobado_(pid, email) {   // total aprobado de láminas (por proyecto y/o dibujante)
  return r2(filas_(T.ENT).filter(e => e.Estado === 'APROBADA' && (!pid || e['Proyecto ID'] === pid) && (!email || norm_(e.Dibujante) === email))
    .reduce((s, e) => s + (Number(e['Total aprobado']) || 0), 0));
}
function movs_(tipo, f) { return filas_(T.MOV).filter(m => m.Tipo === tipo && f(m)); }
const suma_ = L => r2(L.reduce((s, m) => s + (Number(m.Monto) || 0), 0));
/** Abonos a cuenta del cliente (cobros sin proyecto): se aplican solos a los proyectos con saldo, del más antiguo al más nuevo. */
let ABO_ = null;
function abonosCliente_(clave) {
  const M = filas_(T.MOV); if (!ABO_ || ABO_.movs !== M) ABO_ = { movs: M, c: {} };
  if (ABO_.c[clave]) return ABO_.c[clave];
  let pozo = suma_(M.filter(m => m.Tipo === 'COBRO' && !m['Proyecto ID'] && m.Cliente === clave)); const total = pozo, map = {};
  proyectos_().filter(p => p.Cliente === clave && String(p.Estado).toUpperCase() !== 'PROFORMA').sort((a, b) => String(a.Creado) < String(b.Creado) ? -1 : 1).forEach(p => {
    if (pozo <= 0.004) return;
    const extra = buscar_(T.CAM, 'Proyecto ID', p.ID).reduce((s, c) => s + (Number(c['Valor cobro']) || 0), 0);
    const falta = r2((Number(p['Valor contrato']) || 0) + extra - suma_(M.filter(m => m.Tipo === 'COBRO' && m['Proyecto ID'] === p.ID)));
    if (falta > 0) { const x = r2(Math.min(falta, pozo)); map[p.ID] = x; pozo = r2(pozo - x); }
  });
  return (ABO_.c[clave] = { map: map, total: total, aFavor: r2(pozo) });
}
function resumenProyecto_(p) {
  const E = etapas_(p.ID), act = etapaActual_(E), costo = costoAprobado_(p.ID), pagado = suma_(movs_('PAGO', m => m['Proyecto ID'] === p.ID));
  const extra = r2(buscar_(T.CAM, 'Proyecto ID', p.ID).reduce((s, c) => s + (Number(c['Valor cobro']) || 0), 0));   // cambios después de aprobación: se cobran al cliente
  const valor = r2((Number(p['Valor contrato']) || 0) + extra), abono = (abonosCliente_(p.Cliente).map[p.ID] || 0);
  const cobrado = r2(suma_(movs_('COBRO', m => m['Proyecto ID'] === p.ID)) + abono);
  const pct = Math.min(100, Math.max(0, Number(p['Anticipo %']) || 0)), entregado = /^S/i.test(String(p.Entregado || ''));
  const alaEntrega = entregado ? 0 : Math.floor(valor * (100 - pct)) / 100;          // ej.: 2.261,25 al 50 % → 1.130,62 a la entrega
  const saldo = r2(valor - cobrado), hoyDebe = r2(Math.max(0, Math.min(saldo, (valor - alaEntrega) - cobrado)));
  const estadoPago = valor <= 0 ? 'Sin valor' : saldo <= 0.004 ? 'Pagado' : entregado ? 'Pendiente' : cobrado + 0.004 < valor - alaEntrega ? 'Anticipo pendiente' : 'En ejecución';
  return { id: p.ID, nombre: p.Proyecto, desc: p['Descripción'] || '', servicio: p.Servicio || 'Diseño estructural', anticipo: pct, entregado: entregado,
    porPagarHoy: hoyDebe, aLaEntrega: r2(saldo - hoyDebe), estadoPago: estadoPago,
    cliente: p.Cliente, contratante: cliente_(p.Cliente).Contratante, valor: valor, contrato: r2(valor - extra), cambios: extra, cobrado: cobrado, abonos: abono, porCobrar: saldo,
    costoDibujo: costo, pagado: pagado, porPagar: r2(costo - pagado), margen: r2(valor - costo), paso: act.paso, etapa: act.nombre, estado: act.estado,
    avance: Math.round(E.filter(e => e.estado === 'APROBADO').length / ETAPAS.length * 100), entrega: ymd_(p['Fecha entrega'] || '').slice(0, 10), carpeta: p['Carpeta ID'] ? 'https://drive.google.com/drive/folders/' + p['Carpeta ID'] : '' };
}
function encargosAbiertos_() { return filas_(T.ENC).filter(e => ['ASIGNADO', 'CORRECCIONES'].indexOf(String(e.Estado)) >= 0); }
function encargoVista_(e) {
  const p = uno_(T.PRO, 'ID', e['Proyecto ID']) || {}, d = usuario_(e.Dibujante) || { nombre: nombre_(e.Dibujante) };
  const f = ymd_(e['Fecha límite']), M = p.ID ? metas_(p) : {}, meta = e.Tipo === 'MODIFICACION' ? '' : (M[Number(e.Paso)] || ''), obj = meta || f, dr = obj ? dias_(hoy_(), obj) : null;
  return { id: e.ID, meta: meta, proyectoId: e['Proyecto ID'], proyecto: p.Proyecto || '', cliente: cliente_(p.Cliente).Contratante, paso: Number(e.Paso), etapa: etapaNombre_(e.Paso),
    tipo: e.Tipo || 'NUEVO', dibujante: norm_(e.Dibujante), dibujanteNombre: d.nombre, que: e['Qué entregar'], laminas: e['Láminas estimadas'], fecha: f, dias: dr,
    estado: e.Estado, ronda: Number(e.Ronda) || 1, obs: e['Observaciones Juan'], rev: e['Rev arquitectura'] || '',
    alerta: (e.Estado === 'ASIGNADO' || e.Estado === 'CORRECCIONES') && dr != null ? (dr < 0 ? 'Atrasado' : dr <= 7 ? 'Esta semana' : 'A tiempo') : '' };
}

function inicioAdmin_() {
  const P = proyectos_().map(resumenProyecto_).sort((a, b) => String(a.contratante).localeCompare(String(b.contratante)) || String(a.nombre).localeCompare(String(b.nombre)));
  const enc = encargosAbiertos_().map(encargoVista_);
  const porRevisar = filas_(T.ENT).filter(e => e.Estado === 'ENTREGADA').map(e => entregaVista_(e));
  const claude = []; proyectos_().forEach(p => etapas_(p.ID).forEach(e => { if (e.estado === 'PARA CLAUDE') claude.push({ proyectoId: p.ID, proyecto: p.Proyecto, paso: e.paso, etapa: e.nombre }); }));
  const dib = filas_(T.USU).filter(x => String(x.Rol).toUpperCase() === 'DIBUJANTE' && /^S/i.test(String(x.Activo || 'SI'))).map(x => { const em = norm_(x.Correo), c = costoAprobado_(null, em), pg = suma_(movs_('PAGO', m => norm_(m.Dibujante) === em));
    return { email: em, nombre: x.Nombre, aprobado: c, pagado: pg, porPagar: r2(c - pg) }; });
  const lic = ymd_(cfg_('Vence licencia ETABS')), dl = lic ? dias_(hoy_(), lic) : null;
  const arch = filas_(T.PRO).filter(p => p.ID && String(p.Estado).toUpperCase() === 'ARCHIVADO').map(p => ({ id: p.ID, nombre: p.Proyecto, contratante: cliente_(p.Cliente).Contratante }));
  return { proyectos: P, archivados: arch, encargos: enc, porRevisar: porRevisar, claude: claude, dibujantes: dib, clientes: filas_(T.CLI),
    kpi: { porRevisar: porRevisar.length, atrasos: enc.filter(e => e.alerta === 'Atrasado').length, claude: claude.length,
      porPagar: r2(dib.reduce((s, d) => s + Math.max(0, d.porPagar), 0)), porCobrar: r2(P.reduce((s, p) => s + Math.max(0, p.porCobrar), 0)) },
    licencia: dl != null && dl <= 30 ? 'La licencia de ETABS vence el ' + dmy_(lic) + ' (' + dl + ' días).' : '',
    cuota: MailApp.getRemainingDailyQuota(), etapas: ETAPAS, prueba: prueba_(), semana: semana_() };
}
function inicioDibujante_(u) {
  const mios = filas_(T.ENC).filter(e => norm_(e.Dibujante) === u.email).map(encargoVista_).reverse();
  return { encargos: mios, cuenta: cuentaDibujante_(u.email), yo: { nombre: u.nombre, tz: u.tz } };
}
function cuentaDibujante_(email) {   // la dibujante ve solo "por pagar": nada del cliente
  const ent = filas_(T.ENT).filter(e => norm_(e.Dibujante) === email);
  const aprob = ent.filter(e => e.Estado === 'APROBADA'), decl = ent.filter(e => e.Estado === 'ENTREGADA');
  const pagos = movs_('PAGO', m => norm_(m.Dibujante) === email);
  const nombreP = id => id ? ((uno_(T.PRO, 'ID', id) || {}).Proyecto || id) : 'Abono a cuenta';
  const aprobado = r2(aprob.reduce((s, e) => s + (Number(e['Total aprobado']) || 0), 0)), pagado = suma_(pagos);
  return { aprobado: aprobado, pagado: pagado, porPagar: r2(aprobado - pagado), porConfirmar: r2(decl.reduce((s, e) => s + (Number(e['Total declarado']) || 0), 0)),
    lineas: aprob.map(e => ({ fecha: ymd_(e.Revisado).slice(0, 10), proyecto: nombreP(e['Proyecto ID']), etapa: etapaNombre_(e.Paso), laminas: Number(e['Láminas aprobadas']) || 0,
      valor: Number(e['Valor aprobado']) || 0, total: Number(e['Total aprobado']) || 0 })),
    pagos: pagos.map(m => ({ fecha: ymd_(m.Fecha), proyecto: nombreP(m['Proyecto ID']), monto: Number(m.Monto) || 0, detalle: m.Detalle })) };
}

function detalleProyecto_(id) {
  const p = proyecto_(id), F = ficha_(id), fv = {}; Object.keys(F).forEach(k => fv[k] = F[k].v);
  const enc = filas_(T.ENC).filter(e => e['Proyecto ID'] === id).map(encargoVista_).reverse();
  const ent = filas_(T.ENT).filter(e => e['Proyecto ID'] === id).map(e => entregaVista_(e)).reverse();
  const E0 = etapas_(id), M0 = metas_(p, E0), Rv = revVigente_(id);
  return { p: resumenProyecto_(p), notas: p.Notas || '', etapas: E0, metas: M0, metasManual: buscar_(T.ETA, 'Proyecto ID', id).filter(e => String(e.Meta || '').trim()).map(e => Number(e.Paso)),
    planos: { vigente: Rv ? Number(Rv.Rev) : 0, fecha: Rv ? ymd_(Rv.Fecha).slice(0, 10) : '', revs: buscar_(T.PLA, 'Proyecto ID', id).map(r => ({ rev: Number(r.Rev), fecha: ymd_(r.Fecha).slice(0, 10), estado: r.Estado, archivos: r.Archivos || '' })).reverse() }, ficha: fv, fichaDef: FICHA, faltan: fichaFaltan_(id), encargos: enc, entregas: ent,
    cambios: buscar_(T.CAM, 'Proyecto ID', id), dibujantes: filas_(T.USU).filter(x => String(x.Rol).toUpperCase() === 'DIBUJANTE' && /^S/i.test(String(x.Activo || 'SI')))
      .map(x => ({ email: norm_(x.Correo), nombre: x.Nombre, valor: Number(x['Valor lámina']) || Number(cfg_('Valor lámina')) || 35 })),
    clientes: filas_(T.CLI), checklist: CHECKLIST,
    cobros: movs_('COBRO', m => m['Proyecto ID'] === id), pagos: movs_('PAGO', m => m['Proyecto ID'] === id), docs: docs_(p) };
}
function entregaVista_(e) {
  const p = uno_(T.PRO, 'ID', e['Proyecto ID']) || {}, d = usuario_(e.Dibujante) || { nombre: nombre_(e.Dibujante) };
  let arch = []; try { arch = JSON.parse(e.Archivos || '[]'); } catch (x) { }
  return { id: e.ID, encargoId: e['Encargo ID'], proyectoId: e['Proyecto ID'], proyecto: p.Proyecto || '', paso: Number(e.Paso), etapa: etapaNombre_(e.Paso), ronda: Number(e.Ronda) || 1,
    fecha: e.Fecha, dibujante: norm_(e.Dibujante), dibujanteNombre: d.nombre, archivos: arch, laminas: Number(e['Láminas']) || 0, valor: Number(e['Valor lámina']) || 0,
    total: Number(e['Total declarado']) || 0, estado: e.Estado, totalAprobado: Number(e['Total aprobado']) || 0, nota: e.Nota || '', checklist: e.Checklist || '',
    revision: buscar_(T.REV, 'Entrega ID', e.ID).map(r => ({ item: r['Ítem'], res: r.Resultado, lamina: r['Lámina'], obs: r['Observación'] })) };
}
function detalleEncargo_(u, id) {
  const e = uno_(T.ENC, 'ID', id); if (!e) throw new Error('Encargo no encontrado.');
  if (u.rol !== 'ADMIN' && norm_(e.Dibujante) !== u.email) throw new Error('Este encargo no es suyo.');
  const v = encargoVista_(e), p = proyecto_(e['Proyecto ID']);
  const base = p['Carpeta ID'] ? carpetasDe_(p['Carpeta ID']) : {};
  const links = {}; ['01_Arquitectura', '02_Predimensionamiento', '04_Modelo_ETABS', CARPETA_PASO[v.paso]].forEach(n => { if (base[n]) links[n] = base[n].getUrl(); });
  let adj = []; try { adj = JSON.parse(e.Adjuntos || '[]'); } catch (x) { }
  const Rv = revVigente_(p.ID), prox = (Rv ? Number(Rv.Rev) : 0) + 1;
  return { e: v, checklist: checkEntrega_(), plantilla: plantilla_(), qr: [4, 6].indexOf(v.paso) >= 0 ? { rev: prox, url: urlQr_(p.ID, prox), proyecto: p.Proyecto } : null,
    entregaCliente: ymd_(p['Fecha entrega'] || '').slice(0, 10), adjuntos: adj, entregas: filas_(T.ENT).filter(x => x['Encargo ID'] === id).map(x => entregaVista_(x)).reverse(), carpetas: links,
    valorDef: (usuario_(e.Dibujante) || {}).valor || 35, limite: e.Tipo === 'MODIFICACION' ? limiteTexto_(v.fecha, (usuario_(e.Dibujante) || {}).tz) : dmy_(v.fecha) };
}
function limiteTexto_(f, tz) {   // la fecha límite vence a las 23:59 de Ecuador
  if (!f) return '';
  const d = new Date(f + 'T23:59:00-05:00');
  let s = dmy_(f) + ' a las 23:59 (Ecuador)';
  if (tz && tz !== TZ_EC) s += ' = ' + Utilities.formatDate(d, tz, 'dd/MM HH:mm') + ' en su hora local';
  return s;
}

// ── PROYECTOS, CARPETAS Y FICHA ────────────────────────────────────────
function carpetasDe_(carpetaId) { const o = {}, it = raiz_(carpetaId).getFolders(); while (it.hasNext()) { const f = it.next(); if (!f.isTrashed() && !o[f.getName()]) o[f.getName()] = f; } return o; }
/** Documentación enviada por el contratante: planos arquitectónicos (01_Arquitectura) y estudio de suelos (01_Estudio_de_suelos). */
function docs_(p) {
  const o = { arq: [], suelo: [] };
  try {
    const C = carpetasDe_(p['Carpeta ID']);
    [['arq', '01_Arquitectura'], ['suelo', '01_Estudio_de_suelos']].forEach(x => {
      const c = C[x[1]]; if (!c) return;
      const it = c.getFiles(); while (it.hasNext()) { const f = it.next(); if (f.isTrashed()) continue; o[x[0]].push({ nombre: f.getName(), url: f.getUrl(), fecha: Utilities.formatDate(f.getDateCreated(), TZ_EC, 'yyyy-MM-dd') }); }
      o[x[0]].sort((a, b) => a.fecha < b.fecha ? 1 : -1);
    });
  } catch (e) { }
  return o;
}
function sub_(padre, nombre) { const it = padre.getFoldersByName(nombre); while (it.hasNext()) { const f = it.next(); if (!f.isTrashed()) return f; } return padre.createFolder(nombre); }   // nunca reutiliza una carpeta de la papelera
/** Carpeta raíz de un proyecto activo: si quedó en la papelera, la recupera (con todo lo que tenía). */
function raiz_(id) { const f = DriveApp.getFolderById(id); if (f.isTrashed()) { f.setTrashed(false); log_('', 'carpeta', 'Recuperada de la papelera: ' + f.getName()); } return f; }
function prepararCarpetas_(pid) {   // crea las 9 carpetas y renombra las del esquema viejo; no mueve ni borra nada
  const p = proyecto_(pid); if (!p['Carpeta ID']) throw new Error('El proyecto no tiene carpeta.');
  const raiz = DriveApp.getFolderById(p['Carpeta ID']), hechos = [];
  const actuales = carpetasDe_(p['Carpeta ID']);
  Object.keys(actuales).forEach(n => {
    if (CARPETAS.indexOf(n) >= 0 || !/^\d{2}_/.test(n)) return;
    const m = RENOMBRAR.filter(r => r[0].test(n))[0];
    if (m && !actuales[m[1]]) { actuales[n].setName(m[1]); actuales[m[1]] = actuales[n]; delete actuales[n]; hechos.push(n + ' → ' + m[1]); }
  });
  CARPETAS.forEach(n => { if (!actuales[n]) { raiz.createFolder(n); hechos.push('creada ' + n); } });
  return hechos;
}
function guardarProyecto_(d) {
  if (!d.Cliente || !String(d.Proyecto || '').trim()) throw new Error('Falta cliente o nombre del proyecto.');
  if (d.ID) { const p = proyecto_(d.ID); editar_(T.PRO, p._fila, { Proyecto: d.Proyecto, 'Descripción': d['Descripción'] || '', Servicio: d.Servicio || 'Diseño estructural', 'Valor contrato': d['Valor contrato'],
    'Anticipo %': d['Anticipo %'] || 0, Entregado: d.Entregado || 'NO', Notas: d.Notas || '', Cliente: d.Cliente, 'Fecha entrega': d['Fecha entrega'] ? "'" + d['Fecha entrega'] : '' }); return { id: d.ID }; }
  const c = cliente_(d.Cliente);
  const padre = c['Carpeta ID'] ? DriveApp.getFolderById(c['Carpeta ID']) : sub_(DriveApp.getFolderById(RAIZ_CONTRATANTES), c.Contratante);
  if (!c['Carpeta ID'] && c._fila) editar_(T.CLI, c._fila, { 'Carpeta ID': padre.getId() });
  const nom = String(d.Proyecto).trim(); let carpeta = sub_(padre, nom);
  if (filas_(T.PRO).some(o => o['Carpeta ID'] === carpeta.getId())) carpeta = padre.createFolder(nom + ' (' + hoy_() + ')');   // otro proyecto ya usa esa carpeta: no compartirla
  const id = id_();
  agregar_(T.PRO, { ID: id, Cliente: d.Cliente, Proyecto: String(d.Proyecto).trim(), 'Descripción': d['Descripción'] || '', Servicio: d.Servicio || 'Diseño estructural',
    'Valor contrato': d['Valor contrato'] || '', 'Anticipo %': d['Anticipo %'] == null ? 50 : d['Anticipo %'], Entregado: 'NO', 'Carpeta ID': carpeta.getId(), Estado: 'ACTIVO', Creado: ahora_(), Notas: d.Notas || '', 'Fecha entrega': d['Fecha entrega'] ? "'" + d['Fecha entrega'] : '' });
  ETAPAS.forEach(x => agregar_(T.ETA, { 'Proyecto ID': id, Paso: x[0], Etapa: x[1], Estado: 'PENDIENTE', Actualizado: ahora_() }));
  prepararCarpetas_(id);
  return { id: id };
}
/** Archivar: sale del inicio, de los totales y del resumen diario; no se borra nada y se puede restaurar. */
function archivarProyecto_(u, d) {
  const p = proyecto_(d.id), volver = !!d.restaurar;
  editar_(T.PRO, p._fila, { Estado: volver ? 'ACTIVO' : 'ARCHIVADO' });
  log_(u.email, volver ? 'restaurar proyecto' : 'archivar proyecto', p.Proyecto);
  return { msg: volver ? 'Proyecto restaurado.' : 'Proyecto archivado. Lo puede restaurar desde "Archivados" en el inicio.' };
}
/** Eliminar: solo si no tiene cobros, pagos ni entregas (si los tiene, se archiva). La carpeta de Drive va a la papelera (30 días). */
function eliminarProyecto_(u, d) {
  const p = proyecto_(d.id);
  if (String(d.confirmar || '').trim() !== String(p.Proyecto).trim()) throw new Error('Escriba el nombre exacto del proyecto para confirmar.');
  const mov = filas_(T.MOV).filter(m => m['Proyecto ID'] === p.ID).length, ent = filas_(T.ENT).filter(e => e['Proyecto ID'] === p.ID).length;
  if (mov || ent) throw new Error('No se puede eliminar: tiene ' + [mov ? mov + ' cobro(s)/pago(s)' : '', ent ? ent + ' entrega(s)' : ''].filter(String).join(' y ') + '. Archívelo para conservar las cuentas.');
  [T.ETA, T.FIC, T.ENC, T.CAM].forEach(t => borrarFilas_(t, o => o['Proyecto ID'] === p.ID));
  borrarFilas_(T.PRO, o => o.ID === p.ID);
  let papelera = '';
  if (d.carpeta && p['Carpeta ID'] && !filas_(T.PRO).some(o => o['Carpeta ID'] === p['Carpeta ID'])) { try { DriveApp.getFolderById(p['Carpeta ID']).setTrashed(true); papelera = ' La carpeta de Drive quedó en la papelera (se recupera hasta 30 días).'; } catch (e) { } }
  log_(u.email, 'eliminar proyecto', p.Proyecto + ' · ' + p.ID);
  return { msg: 'Proyecto eliminado.' + papelera };
}
function borrarFilas_(t, pred) {
  const sh = hoja_(t), filas = filas_(t).filter(pred).map(o => o._fila).sort((a, b) => b - a);
  filas.forEach(f => sh.deleteRow(f)); delete CACHE_[t[0]];
}
function guardarFicha_(u, d) {
  const pid = d.proyectoId; proyecto_(pid);
  const F = ficha_(pid), claves = FICHA.map(f => f[1]).concat(['espectroSitio', 'rige']);
  Object.keys(d.valores || {}).forEach(k => {
    if (claves.indexOf(k) < 0) return;
    const v = String(d.valores[k] == null ? '' : d.valores[k]).slice(0, 45000);
    if (F[k]) { if (String(F[k].v) !== v) editar_(T.FIC, F[k].fila, { Valor: "'" + v, Actualizado: ahora_() }); }
    else if (v) agregar_(T.FIC, { 'Proyecto ID': pid, Clave: k, Valor: "'" + v, Actualizado: ahora_() });
  });
  return { faltan: fichaFaltan_(pid) };
}

// ── FICHA DESDE EL MODELO ETABS (.e2k) ─────────────────────────────────
// Lee el .e2k más reciente de 04_Modelo_ETABS y llena la ficha técnica con lo que el modelo define.
// Lo que el modelo no trae (uso, ubicación, cimentación…) queda como estaba.
function leerE2k_(txt) {
  const L = String(txt).replace(/\r/g, '').split('\n'), S = {}; let cur = '';
  L.forEach(l => { if (/^\$ /.test(l)) { cur = l.slice(2).trim().toUpperCase(); S[cur] = S[cur] || []; } else if (cur && l.trim()) S[cur].push(l.trim()); });
  const sec = k => { const n = Object.keys(S).filter(x => x.indexOf(k) === 0)[0]; return n ? S[n] : []; };
  const q = (l, k) => { const m = new RegExp('(?:^|\\s)' + k + '\\s+"([^"]*)"').exec(l); return m ? m[1] : null; };
  const n = (l, k) => { const m = new RegExp('(?:^|\\s)' + k + '\\s+(-?[\\d.]+(?:E[-+]?\\d+)?)', 'i').exec(l); return m ? Number(m[1]) : null; };
  const nom = l => { const m = /^\S+\s+"([^"]*)"/.exec(l); return m ? m[1] : null; };
  // Unidades del archivo → kgf y m
  const u = (sec('CONTROLS').filter(l => /^UNITS/.test(l))[0] || '').match(/"([^"]+)"/g) || ['"TONF"', '"M"'];
  const fu = { TONF: 1000, KGF: 1, KN: 101.972, N: 0.101972, KIP: 453.592, LB: 0.453592 }[u[0].replace(/"/g, '').toUpperCase()] || 1;
  const lu = { M: 1, CM: 0.01, MM: 0.001, IN: 0.0254, FT: 0.3048 }[(u[1] || '"M"').replace(/"/g, '').toUpperCase()] || 1;
  const kgcm2 = v => v * fu / Math.pow(lu * 100, 2), kgm2 = v => v * fu / (lu * lu), m = v => v * lu;
  const r1 = v => Math.round(v * 10) / 10, r2 = v => Math.round(v * 100) / 100, fmt = v => String(r2(v)).replace(/\.0+$/, '');
  const out = {}, notas = [];

  // Pisos y alturas
  const st = sec('STORIES').filter(l => /^STORY/.test(l)).map(l => ({ n: nom(l), h: n(l, 'HEIGHT'), e: n(l, 'ELEV') })).reverse();   // de abajo hacia arriba
  const pisos = st.filter(s => s.h != null && s.h > 0);
  if (pisos.length) {
    out.pisos = String(pisos.length);
    const g = []; pisos.forEach(s => { const h = r2(m(s.h)), z = g[g.length - 1]; if (z && z.h === h) { z.n2 = s.n; z.c++; } else g.push({ n1: s.n, n2: s.n, c: 1, h: h }); });
    out.alturas = g.map(z => (z.c > 1 ? z.n1 + '–' + z.n2 + ' ' + z.c + ' × ' : z.n1 + ' ') + fmt(z.h)).join(' · ') + ' · total ' + fmt(pisos.reduce((a, s) => a + m(s.h), 0)) + ' m';
  }

  // Materiales
  const MAT = {}; sec('MATERIAL PROPERTIES').forEach(l => { const k = nom(l); if (!k) return; const o = MAT[k] = MAT[k] || {};
    const t = q(l, 'TYPE'); if (t) o.tipo = t; const fc = n(l, 'FC'); if (fc != null) o.fc = kgcm2(fc); const fy = n(l, 'FY'); if (fy != null) o.fy = kgcm2(fy); });
  const FR = {}; sec('FRAME SECTIONS').forEach(l => { const k = nom(l), mt = q(l, 'MATERIAL'); if (k && mt) FR[k] = mt; });
  const CS = {}; sec('CONCRETE SECTIONS').forEach(l => { const k = nom(l); if (k) CS[k] = { tipo: q(l, 'TYPE'), barra: q(l, 'LONGBARMATERIAL'), cover: n(l, 'COVER'), top: n(l, 'COVERTOP') }; });
  const SH = {}; sec('SLAB PROPERTIES').concat(sec('WALL PROPERTIES')).forEach(l => { const k = nom(l); if (!k) return; const o = SH[k] = SH[k] || {};
    ['PROPTYPE', 'MATERIAL', 'SLABTYPE'].forEach(c => { const v = q(l, c); if (v) o[c] = v; }); ['OVERALLDEPTH', 'SLABTHICKNESS', 'WALLTHICKNESS'].forEach(c => { const v = n(l, c); if (v != null) o[c] = v; }); });
  // Qué secciones se usan de verdad (LINE ASSIGNS / AREA ASSIGNS)
  const usoF = {}, usoA = {};
  sec('LINE ASSIGNS').forEach(l => { const s = q(l, 'SECTION'); if (s) usoF[s] = 1; });
  sec('AREA ASSIGNS').forEach(l => { const s = q(l, 'SECTION'); if (s) usoA[s] = 1; });
  const hayUsoF = Object.keys(usoF).length > 0, hayUsoA = Object.keys(usoA).length > 0;
  const fcDe = mats => { const v = []; mats.forEach(k => { const x = MAT[k]; if (x && x.fc) { const r = Math.round(x.fc / 5) * 5; if (v.indexOf(r) < 0) v.push(r); } }); return v.sort((a, b) => a - b).join(' / '); };
  const secc = tipo => Object.keys(CS).filter(k => CS[k].tipo === tipo && (!hayUsoF || usoF[k]));
  const losas = Object.keys(SH).filter(k => SH[k].PROPTYPE === 'Slab' && (!hayUsoA || usoA[k]));
  const muros = Object.keys(SH).filter(k => SH[k].PROPTYPE === 'Wall' && (!hayUsoA || usoA[k]));
  const partes = [['columnas', fcDe(secc('Column').map(k => FR[k]))], ['vigas', fcDe(secc('Beam').map(k => FR[k]))], ['losas', fcDe(losas.map(k => SH[k].MATERIAL))], ['muros', fcDe(muros.map(k => SH[k].MATERIAL))]].filter(p => p[1]);
  if (partes.length) { const unico = partes.every(p => p[1] === partes[0][1]);
    out.fc = unico ? partes[0][1] + ' (' + partes.map(p => p[0]).join(', ') + ')' : partes.map(p => p[0] + ' ' + p[1]).join(' · '); }
  const barras = []; Object.keys(CS).filter(k => !hayUsoF || usoF[k]).forEach(k => { const b = CS[k].barra; if (b && barras.indexOf(b) < 0) barras.push(b); });
  const fys = []; barras.forEach(b => { const x = MAT[b]; if (x && x.fy) { let v = Math.round(x.fy / 10) * 10; if (Math.abs(v - 4200) <= 50) v = 4200; if (fys.indexOf(v) < 0) fys.push(v); } });
  if (fys.length) out.fy = fys.join(' / ');
  const cv = arr => { const v = []; arr.forEach(x => { if (x != null) { const c = r1(m(x) * 100); if (v.indexOf(c) < 0) v.push(c); } }); return v.sort((a, b) => a - b).map(fmt).join('/'); };
  const rc = [], cC = cv(secc('Column').map(k => CS[k].cover)), cB = cv(secc('Beam').map(k => CS[k].top));
  const cL = cv(sec('CONCRETE SLAB DESIGN PREFERENCES').map(l => n(l, 'COVERTOP')));
  if (cC) rc.push('columnas ' + cC); if (cB) rc.push('vigas ' + cB + ' (al eje de varilla, ETABS)'); if (cL && losas.length) rc.push('losas ' + cL);
  if (rc.length) out.recub = rc.join(' · ');

  // Sistema estructural (propuesta: se puede corregir a mano)
  let nCol = 0, nVig = 0, nMur = 0;
  sec('LINE CONNECTIVITIES').forEach(l => { if (/\bCOLUMN\b/.test(l)) nCol++; else if (/\bBEAM\b/.test(l)) nVig++; });
  sec('AREA CONNECTIVITIES').forEach(l => { if (/\bPANEL\b/.test(l)) nMur++; });
  const losaTxt = losas.filter(k => SH[k].SLABTYPE !== 'Slab' || (SH[k].SLABTHICKNESS || 0) >= 0.08).map(k => { const o = SH[k], h = o.OVERALLDEPTH || o.SLABTHICKNESS;
    return (o.SLABTYPE === 'Ribbed' ? 'nervada' : o.SLABTYPE === 'Waffle' ? 'reticular' : 'maciza') + (h ? ' ' + fmt(m(h) * 100) + ' cm' : ''); }).filter((x, i, a) => a.indexOf(x) === i);

  // Sismo: espectro NEC-SE-DS del modelo y factor de escala de los casos espectrales
  const FN = {}; sec('FUNCTIONS').forEach(l => { const k = nom(l); if (!k) return; const o = FN[k] = FN[k] || { pts: [] };
    const t = q(l, 'SPECTYPE'); if (t) o.tipo = t; if (q(l, 'FUNCTYPE')) o.ft = q(l, 'FUNCTYPE');
    [['ZONE', 'Z'], ['ETA', 'eta'], ['FA', 'Fa'], ['FD', 'Fd'], ['FS', 'Fs'], ['I', 'I'], ['R', 'R']].forEach(c => { const v = n(l, c[0]); if (v != null) o[c[1]] = v; });
    const st2 = /SOILTYPE\s+"?([A-F])"?/.exec(l); if (st2) o.suelo = st2[1];
    const tv = q(l, 'TIMEVAL'); if (tv) { const a = tv.trim().split(/\s+/).map(Number); for (let i = 0; i + 1 < a.length; i += 2) o.pts.push([a[i], a[i + 1]]); } });
  const casos = {}; sec('LOAD CASES').forEach(l => { const k = nom(l); if (!k) return; const o = casos[k] = casos[k] || { acc: [] };
    if (/TYPE\s+"Response Spectrum"/i.test(l)) o.rs = true; const a = q(l, 'ACCEL'); if (a) o.acc.push({ dir: a, f: q(l, 'FUNC'), sf: n(l, 'SF') }); });
  // Caso principal de cada función: el de diseño (no derivas), componente principal = mayor SF
  const princ = [];
  Object.keys(casos).filter(k => casos[k].rs && !/deriv|drift/i.test(k)).forEach(k => { const a = casos[k].acc.filter(x => x.f && x.sf); if (!a.length) return;
    const p = a.sort((x, y) => y.sf - x.sf)[0]; princ.push({ caso: k, f: p.f, sf: p.sf }); });
  const usadas = princ.map(p => p.f).filter((x, i, a) => a.indexOf(x) === i);
  const nec = Object.keys(FN).filter(k => /NEC/i.test(FN[k].tipo || '')).sort((a, b) => (usadas.indexOf(b) >= 0) - (usadas.indexOf(a) >= 0))[0];
  const sitio = Object.keys(FN).filter(k => FN[k].ft === 'SPECTRUM' && /USER/i.test(FN[k].tipo || '') && FN[k].pts.length > 2 && usadas.indexOf(k) >= 0)[0];
  let R = null;
  if (nec) { const f = FN[nec];
    if (f.Z != null) { out.Z = fmt(f.Z); const zs = [[0.15, 'I'], [0.25, 'II'], [0.30, 'III'], [0.35, 'IV'], [0.40, 'V'], [0.50, 'VI']]; const z = zs.filter(x => Math.abs(x[0] - f.Z) < 0.001)[0] || (f.Z >= 0.5 ? zs[5] : null); if (z) out.zona = z[1]; }
    ['eta', 'Fa', 'Fd', 'Fs'].forEach(k => { if (f[k] != null) out[k] = fmt(f[k]); });
    if (f.suelo) { out.suelo = f.suelo; out.r = f.suelo === 'E' ? '1.5' : '1.0'; }
    const I = f.I != null ? f.I : 1; out.I = fmt(I);
    // I/(R·φP·φE) = (I_f/R_f)·(SF/g) con el caso de diseño que usa este espectro
    const p = princ.filter(x => x.f === nec)[0], g = 9.80665 / lu;
    const Rf = f.R != null ? f.R : 1;
    const k = p ? (I / Rf) * (p.sf / g) : I / Rf;
    const Rphi = I / k;   // R·φP·φE efectivo del modelo
    if (Rf > 1) { R = Rf; const phi = Rphi / Rf;
      out.R = fmt(Rf);
      if (Math.abs(phi - 1) < 0.02) { out.phiP = '1.00'; out.phiE = '1.00'; } else { notas.push('El caso ' + (p ? p.caso : '') + ' da φP·φE = ' + r2(phi).toFixed(2) + ': sepárelo en φP y φE.'); }
    } else { R = r2(Rphi); out.R = fmt(R); out.phiP = '1.00'; out.phiE = '1.00';
      notas.push('El espectro del modelo tiene R = 1 y el factor va en el caso ' + (p ? p.caso : '') + ' (SF ' + (p ? p.sf : '') + '): R·φP·φE = ' + fmt(Rphi) + '. Se tomó φP = φE = 1.00; corríjalo si hay irregularidad.'); }
  }
  if (sitio) { out.espectroSitio = FN[sitio].pts.map(x => x[0] + '\t' + x[1]).join('\n');
    const soloSitio = usadas.every(f => f === sitio || !/NEC/i.test((FN[f] || {}).tipo || ''));
    if (soloSitio) out.rige = 'SITIO'; else if (!nec) out.rige = 'SITIO'; else notas.push('El modelo usa el espectro NEC y el del sitio ("' + sitio + '"): elija cuál rige.'); }
  else if (nec && usadas.indexOf(nec) >= 0) out.rige = 'NEC';

  let sist = '';
  if (nMur && nCol) sist = 'Sistema dual: pórticos de HA con muros estructurales';
  else if (nMur) sist = 'Muros estructurales de HA';
  else if (nCol && nVig) sist = 'Pórticos ' + (R >= 8 ? 'especiales ' : '') + 'de HA resistentes a momento con vigas descolgadas';
  if (sist) out.sistema = sist + (losaTxt.length ? '; losa ' + losaTxt.join(' / ') : '');

  // Cargas: sobrecarga muerta y viva por conjunto de cargas (kg/m²)
  const tipoPat = {}; sec('LOAD PATTERNS').forEach(l => { const k = nom(l); if (k && /^LOADPATTERN/.test(l)) tipoPat[k] = { t: q(l, 'TYPE') || '', sw: n(l, 'SELFWEIGHT') || 0 }; });
  const esCM = p => tipoPat[p] && (/Super Dead/i.test(tipoPat[p].t) || /^Dead$/i.test(tipoPat[p].t));
  const esCV = p => tipoPat[p] && /Live/i.test(tipoPat[p].t) && !/Roof/i.test(tipoPat[p].t);
  const SET = {}; sec('SHELL UNIFORM LOAD SETS').forEach(l => { const k = nom(l), p = q(l, 'LOADPAT'), v = n(l, 'VALUE'); if (!k || !p || v == null) return;
    const o = SET[k] = SET[k] || { cm: 0, cv: 0 }; if (esCM(p)) o.cm += kgm2(v); else if (esCV(p)) o.cv += kgm2(v); });
  const AL = { cm: {}, cv: {} }; sec('SHELL OBJECT LOADS').forEach(l => { if (!/^AREALOAD/.test(l) || !/UNIFF/i.test(l) || !/GRAV/i.test(l)) return; const p = q(l, 'LC'), v = n(l, 'FVAL'); if (!p || v == null) return;
    const c = esCM(p) ? 'cm' : esCV(p) ? 'cv' : null; if (!c) return; const k = Math.round(kgm2(v)); AL[c][k] = (AL[c][k] || 0) + 1; });
  const esCub = k => /cub|techo|azotea/i.test(k), esEsp = k => /jacuzzi|piscina|tanque|cisterna|equipo|relleno|jardin|jardín/i.test(k);
  const lista = (c, filtro) => Object.keys(SET).filter(filtro).filter(k => SET[k][c] > 0).map(k => k + ' ' + Math.round(SET[k][c])).join(' · ');
  const suelto = c => Object.keys(AL[c]).map(Number).sort((a, b) => AL[c][b] - AL[c][a]).slice(0, 4).map(v => v + (Object.keys(AL[c]).length > 1 ? ' (' + AL[c][v] + (AL[c][v] === 1 ? ' paño)' : ' paños)') : '')).join(' · ');
  const normal = k => !esCub(k) && !esEsp(k);
  out.cm = [lista('cm', normal), suelto('cm')].filter(Boolean).join(' · ') || undefined;
  out.cv = [lista('cv', normal), suelto('cv')].filter(Boolean).join(' · ') || undefined;
  const cub = Object.keys(SET).filter(esCub).map(k => k + ': CM ' + Math.round(SET[k].cm) + ' · CV ' + Math.round(SET[k].cv)).join(' | ');
  if (cub) out.cubierta = cub;
  const esp = Object.keys(SET).filter(esEsp).map(k => k + ': CM ' + Math.round(SET[k].cm) + (SET[k].cv ? ' · CV ' + Math.round(SET[k].cv) : '')).join(' | ');
  if (esp) out.especiales = esp;
  Object.keys(out).forEach(k => { if (out[k] == null || out[k] === '') delete out[k]; });
  const titulo = (sec('PROJECT INFORMATION').map(l => q(l, 'MODELNAME')).filter(Boolean)[0]) || '';
  return { valores: out, notas: notas, modelo: titulo, version: (sec('PROGRAM INFORMATION').map(l => q(l, 'VERSION')).filter(Boolean)[0]) || '' };
}
function fichaDesdeModelo_(pid, fileId) {
  const p = proyecto_(pid); let f = null;
  if (fileId) f = DriveApp.getFileById(fileId);
  else {
    if (!p['Carpeta ID']) throw new Error('El proyecto no tiene carpeta en Drive.');
    const cf = carpetasDe_(p['Carpeta ID'])['04_Modelo_ETABS']; if (!cf) throw new Error('No hay carpeta 04_Modelo_ETABS.');
    const it = cf.getFiles(); while (it.hasNext()) { const x = it.next(); if (!x.isTrashed() && /\.e2k$/i.test(x.getName()) && (!f || x.getLastUpdated() > f.getLastUpdated())) f = x; }
    if (!f) throw new Error('Suba primero el modelo .e2k en el paso 3 (Modelo ETABS).');
  }
  const r = leerE2k_(f.getBlob().getDataAsString()), F = ficha_(pid), ks = Object.keys(r.valores);
  if (!ks.length) throw new Error('No se pudo leer el modelo ' + f.getName() + '.');
  const poner = (k, v) => { v = String(v).slice(0, 45000); if (F[k]) { if (String(F[k].v) !== v) editar_(T.FIC, F[k].fila, { Valor: "'" + v, Actualizado: ahora_() }); } else agregar_(T.FIC, { 'Proyecto ID': pid, Clave: k, Valor: "'" + v, Actualizado: ahora_() }); };
  ks.forEach(k => poner(k, r.valores[k]));
  const fecha = Utilities.formatDate(new Date(), TZ_EC, 'dd/MM/yyyy HH:mm');
  poner('modeloFicha', JSON.stringify({ archivo: f.getName(), url: f.getUrl(), fecha: fecha, claves: ks, notas: r.notas, modelo: r.modelo, version: r.version }));
  return { n: ks.length, archivo: f.getName(), notas: r.notas, faltan: fichaFaltan_(pid) };
}

// ── ETAPAS, ENCARGOS Y ENTREGAS ────────────────────────────────────────
function asignar_(u, d) {
  const p = proyecto_(d.proyectoId), paso = Number(d.paso), E = etapas_(p.ID);
  if (PASOS_DIBUJANTE.indexOf(paso) < 0) throw new Error('Solo se asignan el trazado (2) y el dibujo completo (4).');
  const dib = usuario_(d.dibujante); if (!dib || dib.rol !== 'DIBUJANTE') throw new Error('Elija una dibujante.');
  if (!d.fecha) d.fecha = d.entrega || ymd_(p['Fecha entrega'] || '').slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(d.fecha || ''))) throw new Error('Falta la fecha de entrega.');
  if (!String(d.que || '').trim()) throw new Error('Indique qué debe entregar.');
  if (d.tipo !== 'MODIFICACION' && !/^\d{4}-\d{2}-\d{2}$/.test(String(d.entrega || ymd_(p['Fecha entrega'] || '').slice(0, 10)))) throw new Error('Falta la fecha de entrega del proyecto al cliente.');
  if (d.entrega) { editar_(T.PRO, p._fila, { 'Fecha entrega': "'" + d.entrega }); p['Fecha entrega'] = d.entrega; }
  if (paso === 2) {
    if (!aprobado_(E, 1)) throw new Error('Primero apruebe el predimensionamiento (paso 1).'); }
  if (paso === 4 && !aprobado_(E, 3) && d.tipo !== 'MODIFICACION') throw new Error('Primero apruebe el modelo ETABS (paso 3).');
  const abierto = filas_(T.ENC).filter(e => e['Proyecto ID'] === p.ID && Number(e.Paso) === paso && ['ASIGNADO', 'CORRECCIONES'].indexOf(e.Estado) >= 0)[0];
  if (abierto) throw new Error('Ya hay un encargo abierto de esta etapa (' + (usuario_(abierto.Dibujante) || {}).nombre + ').');
  const revs = buscar_(T.CAM, 'Proyecto ID', p.ID), rev = revs.length ? revs[revs.length - 1].Rev : '';
  const id = id_();
  agregar_(T.ENC, { ID: id, 'Proyecto ID': p.ID, Paso: paso, Tipo: d.tipo === 'MODIFICACION' ? 'MODIFICACION' : 'NUEVO', Dibujante: dib.email, 'Qué entregar': d.que,
    'Láminas estimadas': d.laminas || '', 'Fecha límite': "'" + d.fecha, Estado: 'ASIGNADO', Ronda: 1, Asignado: ahora_(), 'Observaciones Juan': d.obs || '', 'Rev arquitectura': rev, Adjuntos: (d.adjuntos || []).length ? JSON.stringify(d.adjuntos.map(a => ({ nombre: a.nombre, url: a.url }))) : '' });
  ponerEtapa_(p.ID, paso, 'EN CURSO', dib.nombre);
  compartirCarpetas_(p, dib.email, paso);
  const msg = avisoAsignacion_(p, dib, id, paso, d, rev);
  return { id: id, wa: msg.wa, msg: 'Encargo asignado a ' + dib.nombre + '. Correo enviado.' };
}
function compartirCarpetas_(p, email, paso) {   // la dibujante puede ver (no editar) la base del proyecto
  try {
    const C = carpetasDe_(p['Carpeta ID']);
    ['01_Arquitectura', '02_Predimensionamiento', '03_Trazado', '04_Modelo_ETABS', '05_Planos'].forEach(n => {
      if (!C[n]) return; if (paso === 2 && n === '05_Planos') return;
      const ya = C[n].getViewers().concat(C[n].getEditors()).some(x => norm_(x.getEmail()) === email);
      if (!ya) verSinAviso_(C[n], email);
    });
  } catch (e) { log_('', 'compartir', String(e)); }
}
/** Da acceso de lectura SIN el correo "Carpeta compartida contigo" de Drive (servicio avanzado Drive API).
 *  Si el servicio no está activado, no comparte: la dibujante ve todo desde los enlaces del encargo y el portal. */
function verSinAviso_(f, email) {
  if (typeof Drive === 'undefined' || !Drive.Permissions) { log_('', 'compartir', 'Drive API no activada: no se compartió ' + f.getName() + ' con ' + email); return; }
  if (Drive.Permissions.create) Drive.Permissions.create({ role: 'reader', type: 'user', emailAddress: email }, f.getId(), { sendNotificationEmail: false, supportsAllDrives: true });
  else Drive.Permissions.insert({ role: 'reader', type: 'user', value: email }, f.getId(), { sendNotificationEmails: false, supportsAllDrives: true });
}
/** Paso 1 → dibujante: Juan sube el predimensionamiento (PDF/imagen) + indicaciones y pulsa Enviar.
 *  Aprueba el paso 1 y asigna el trazado (paso 2) a la dibujante elegida; el correo lleva los archivos adjuntos. */
function enviarPredim_(u, d) {
  const p = proyecto_(d.proyectoId), arch = d.archivos || [], ind = String(d.indicaciones || '').trim();
  if (!arch.length) throw new Error('Suba el predimensionamiento (PDF o imagen).');
  if (!ind && !arch.some(a => /^Nota de voz/i.test(String(a.nombre)))) throw new Error('Escriba las indicaciones o grabe una nota de voz para la dibujante.');
  const dib = usuario_(d.dibujante); if (!dib || dib.rol !== 'DIBUJANTE') throw new Error('Elija una dibujante.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(d.entrega || ''))) throw new Error('Falta la fecha de entrega al cliente.');
  d.fecha = d.entrega;
  if (!docs_(p).arq.length) throw new Error('Primero suba los planos arquitectónicos enviados por el contratante.');
  if (filas_(T.ENC).some(e => e['Proyecto ID'] === p.ID && Number(e.Paso) === 2 && ['ASIGNADO', 'CORRECCIONES'].indexOf(e.Estado) >= 0)) throw new Error('El trazado ya está asignado.');
  aprobarEtapa_(u, { proyectoId: p.ID, paso: 1, archivos: arch, nota: 'Enviado a ' + dib.nombre });
  const r = asignar_(u, { proyectoId: p.ID, paso: 2, dibujante: dib.email, fecha: d.fecha, entrega: d.entrega, que: ind || 'Ver la nota de voz adjunta.', adjuntos: arch });
  return { wa: r.wa, msg: 'Predimensionamiento enviado a ' + dib.nombre + ' por correo, con ' + arch.length + ' archivo(s) adjunto(s).' };
}
function adjuntos_(lista) {   // blobs de Drive para el correo (máx. ~20 MB); si no caben, van solo como enlace
  const out = []; let tot = 0;
  (lista || []).forEach(a => { try { const b = DriveApp.getFileById(a.id).getBlob(), n = b.getBytes().length; if (tot + n <= 20 * 1024 * 1024) { b.setName(a.nombre); out.push(b); tot += n; } } catch (e) { } });
  return out;
}
function avisoAsignacion_(p, dib, encId, paso, d, rev) {
  const c = cliente_(p.Cliente), C = p['Carpeta ID'] ? carpetasDe_(p['Carpeta ID']) : {}, lim = limiteTexto_(d.fecha, dib.tz);
  const link = n => C[n] ? `<a href="${C[n].getUrl()}">${n}</a>` : n;
  const tipo = d.tipo === 'MODIFICACION' ? 'MODIFICACIÓN' + (rev ? ' por Rev. ' + rev + ' de arquitectura' : '') : 'Nuevo encargo';
  const html = caja_(`<p>Hola ${esc_(dib.nombre)}:</p><p>Tiene un <b>${tipo}</b>.</p>
    <table style="border-collapse:collapse;font-size:14px">${fila_('Proyecto', esc_(p.Proyecto))}${fila_('Contratante', esc_(c.Contratante))}
    ${fila_('Etapa', paso + '. ' + etapaNombre_(paso))}${fila_('Qué entregar', esc_(d.que).replace(/\n/g, '<br>'))}
    ${d.tipo === 'MODIFICACION' ? fila_('Fecha de entrega', '<b>' + esc_(lim) + '</b>') : (metas_(p)[paso] ? fila_('Meta de su etapa', '<b>' + dmy_(metas_(p)[paso]) + '</b>') : '') + fila_('Entrega del proyecto completo al cliente', '<b>' + dmy_(d.fecha) + '</b>')}
    ${plantilla_() ? fila_('Plantilla CEV', `<a href="${plantilla_().descarga}">Descargar ${esc_(plantilla_().nombre)}</a>`) : ''}${fila_('Formato', 'DWG + DXF (Guardar como → DXF AutoCAD 2018), dibujado desde la plantilla de capas EST-')}
    ${fila_('Archivos base', [link('01_Arquitectura'), link('02_Predimensionamiento')].concat(paso === 4 ? [link('03_Trazado'), link('04_Modelo_ETABS')] : []).join(' · '))}
    ${(d.adjuntos || []).length ? fila_('Predimensionamiento', d.adjuntos.map(a => `<a href="${a.url}">${esc_(a.nombre)}</a>`).join('<br>') + ' <span style="color:#6E7679">(adjuntos)</span>') : ''}
    ${d.obs ? fila_('Observaciones', esc_(d.obs).replace(/\n/g, '<br>')) : ''}</table>
    <p style="margin:18px 0"><a href="${urlApp_()}" style="background:#3D434A;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold">Abrir el encargo en el portal</a></p>
    <p style="color:#6E7679;font-size:12px">La entrega se sube en el portal con sus archivos, el número de láminas y el valor por lámina.</p>`);
  enviar_({ to: dib.email, subject: `${tipo}: ${p.Proyecto} – ${etapaNombre_(paso)} – ${d.tipo === 'MODIFICACION' ? 'entrega' : 'proyecto completo al cliente'} ${dmy_(d.fecha)}`, html: html, attachments: adjuntos_(d.adjuntos) });
  const txt = `*${tipo} · ${p.Proyecto}*\nEtapa: ${paso}. ${etapaNombre_(paso)}\nQué entregar: ${d.que}\n${d.tipo === 'MODIFICACION' ? 'Fecha de entrega: ' + lim : 'Entrega del proyecto completo al cliente: ' + dmy_(d.fecha)}\nFormato: DWG + DXF desde la plantilla EST-\n${(d.adjuntos || []).length ? 'Predimensionamiento:\n' + d.adjuntos.map(x => '• ' + x.nombre + ': ' + x.url).join('\n') + '\n' : ''}${d.obs ? 'Observaciones: ' + d.obs + '\n' : ''}Portal: ${urlApp_()}\nLe envié el detalle por correo.`;
  return { wa: wa_(dib.wa, txt) };
}
function aprobarEtapa_(u, d) {
  const p = proyecto_(d.proyectoId), paso = Number(d.paso), E = etapas_(p.ID);
  if (PASOS_JUAN.indexOf(paso) < 0) throw new Error('Esta etapa se aprueba desde la revisión de la entrega.');
  if (paso === 1 && !docs_(p).arq.length) throw new Error('Primero suba los planos arquitectónicos enviados por el contratante (Documentación del contratante).');
  if (paso === 3 && !docs_(p).suelo.length) throw new Error('Primero suba el estudio de suelos enviado por el contratante (Documentación del contratante).');
  if (paso === 3) { const f = fichaFaltan_(p.ID); if (f.length) throw new Error('Complete la ficha técnica antes del modelo: falta ' + f.slice(0, 6).join(', ') + (f.length > 6 ? '…' : '') + '.'); }
  if (!aprobado_(E, PREVIO[paso])) throw new Error('Primero apruebe la etapa ' + PREVIO[paso] + ' (' + etapaNombre_(PREVIO[paso]) + ').');
  ponerEtapa_(p.ID, paso, 'APROBADO', u.nombre, { Archivos: (d.archivos || []).map(a => a.nombre).join(' · '), Nota: d.nota || '' });
  if (paso === 7) { const n = registrarRev_(p, u, '', 'Plano terminado aprobado'); return { msg: 'Etapa 7 aprobada. Planos Rev. ' + n + ' quedan como vigentes (QR).' }; }
  if (paso === 10) { editar_(T.PRO, p._fila, { Entregado: 'SI' }); return { msg: 'Memoria aprobada: proyecto entregado. El saldo pasa a "por pagar hoy" en el estado de cuenta.' }; }
  return { msg: 'Etapa ' + paso + ' aprobada.' };
}
/** Archivos de la carpeta de una etapa (versión más nueva primero) para ver, descargar y volver a subir. */
/** Proyectos que ya venían avanzados: marca como hechas fuera del portal las etapas anteriores a la elegida. */
function saltarA_(u, d) {
  const p = proyecto_(d.proyectoId), paso = Number(d.paso);
  if (!(paso >= 2 && paso <= 10)) throw new Error('Elija la etapa desde la que sigue el proyecto.');
  if (filas_(T.ENC).some(e => e['Proyecto ID'] === p.ID && ['ASIGNADO', 'CORRECCIONES', 'ENTREGADO'].indexOf(e.Estado) >= 0 && Number(e.Paso) < paso)) throw new Error('Hay encargos abiertos en etapas anteriores; ciérrelos primero.');
  const n = etapas_(p.ID).filter(e => e.paso < paso && e.estado !== 'APROBADO');
  n.forEach(e => ponerEtapa_(p.ID, e.paso, 'APROBADO', u.nombre, { Nota: 'Hecho antes del portal' }));
  return { msg: n.length ? 'Etapas 1 a ' + (paso - 1) + ' marcadas como hechas antes del portal. Sigue en la etapa ' + paso + ' (' + etapaNombre_(paso) + ').' : 'No había etapas anteriores pendientes.' };
}
// Archivos exactos que pide cada etapa (checklist en el diálogo de archivos). ob = obligatorio para enviar.
const REQ_ETAPA = {
  5: [
    { k: 'dxf', t: 'Planos estructurales (todas las láminas)', ext: ['dxf'], carpeta: '05_Planos', ob: 1 },
    { k: 'e2k', t: 'Modelo ETABS', ext: ['e2k'], carpeta: '04_Modelo_ETABS', ob: 1 },
    { k: 'tablas', t: 'Tablas de diseño ETABS (vigas, columnas, derivas, modal, reacciones)', ext: ['xlsx', 'xls'], carpeta: '04_Modelo_ETABS', ob: 0, rec: 1 },
    { k: 'dwg', t: 'Planos en DWG (respaldo)', ext: ['dwg'], carpeta: '05_Planos', ob: 0 },
    { k: 'suelo', t: 'Estudio geotécnico (si no está en la documentación del contratante)', ext: ['pdf'], carpeta: '01_Estudio_de_suelos', ob: 0 },
    { k: 'informe', t: 'Informe de revisión (lo genera Claude)', ext: ['pdf'], carpeta: '05_Planos', ob: 0, pat: 'Revision_' }
  ]
};
function reqEstado_(p, paso) {
  const R = REQ_ETAPA[paso]; if (!R) return null;
  const raiz = p['Carpeta ID'] ? DriveApp.getFolderById(p['Carpeta ID']) : null, cache = {};
  const listar = n => { if (cache[n]) return cache[n]; const L = []; if (raiz) { const it = raiz.getFoldersByName(n); if (it.hasNext()) { const fs = it.next().getFiles(); while (fs.hasNext()) { const f = fs.next();
    L.push({ id: f.getId(), nombre: f.getName(), url: f.getUrl(), descarga: 'https://drive.google.com/uc?export=download&id=' + f.getId(), fecha: Utilities.formatDate(f.getLastUpdated(), TZ_EC, 'yyyy-MM-dd HH:mm'), tam: f.getSize() }); } } }
    L.sort((a, b) => a.fecha < b.fecha ? 1 : -1); return (cache[n] = L); };
  return R.map(r => { const re = new RegExp('\\.(' + r.ext.join('|') + ')$', 'i'), A = listar(r.carpeta).filter(f => re.test(f.nombre) && (!r.pat || f.nombre.indexOf(r.pat) >= 0) && (r.pat || f.nombre.indexOf('Revision_') < 0));
    return { k: r.k, t: r.t, ext: r.ext, carpeta: r.carpeta, ob: r.ob, rec: r.rec || 0, archivos: A }; });
}
function archivosEtapa_(d) {
  const p = proyecto_(d.proyectoId), paso = Number(d.paso), nombre = CARPETA_PASO[paso];
  if (!nombre) throw new Error('Etapa sin carpeta.');
  if (!p['Carpeta ID']) throw new Error('El proyecto no tiene carpeta en Drive (pestaña Datos → Preparar carpetas).');
  const cf = carpetasDe_(p['Carpeta ID'])[nombre], L = [];
  if (cf) { const fs = cf.getFiles(); while (fs.hasNext()) { const f = fs.next(); if (f.isTrashed()) continue; L.push({ id: f.getId(), nombre: f.getName(), url: f.getUrl(),
    descarga: 'https://drive.google.com/uc?export=download&id=' + f.getId(), fecha: Utilities.formatDate(f.getLastUpdated(), TZ_EC, 'yyyy-MM-dd HH:mm'), tam: f.getSize() }); } }
  L.sort((a, b) => a.fecha < b.fecha ? 1 : -1);
  const comparte = Object.keys(CARPETA_PASO).filter(k => CARPETA_PASO[k] === nombre && Number(k) !== paso && Number(k) > 0).map(Number);
  return { carpeta: nombre, archivos: L, comparte: comparte, req: reqEstado_(p, paso) };
}
function paraClaude_(u, d) {
  const p = proyecto_(d.proyectoId), paso = Number(d.paso);
  if (PASOS_CLAUDE.indexOf(paso) < 0) throw new Error('Esta etapa no la prepara Claude.');
  if (paso === 5) {   // revisión completa: necesita modelo y planos en Drive (sirve también para proyectos que entran directo a esta etapa)
    const C5 = p['Carpeta ID'] ? carpetasDe_(p['Carpeta ID']) : {}, hay = (n, re) => { if (!C5[n]) return false; const fs = C5[n].getFiles(); while (fs.hasNext()) { const f = fs.next(); if (!f.isTrashed() && re.test(f.getName())) return true; } return false; };
    const R = reqEstado_(p, 5), falta = R.filter(r => r.ob && !r.archivos.length).map(r => r.t + ' (.' + r.ext.join('/.') + ')');
    if (falta.length) throw new Error('Para enviar a revisión falta subir en la etapa 5: ' + falta.join(' y ') + '.');
  } else if (!aprobado_(etapas_(p.ID), PREVIO[paso])) throw new Error('Primero apruebe la etapa ' + PREVIO[paso] + '.');
  if (paso === 3) { const f = fichaFaltan_(p.ID); if (f.length) throw new Error('Complete la ficha técnica antes del modelo: falta ' + f.slice(0, 6).join(', ') + (f.length > 6 ? '…' : '') + '.'); }
  ponerEtapa_(p.ID, paso, 'PARA CLAUDE', u.nombre, { Nota: d.nota || '' });
  const FUENTE = { 5: 'los planos y el modelo, con NEC-15, ASCE 7-22 y ACI 318-25 según el sistema estructural de la ficha', 8: 'los planos terminados (etapa 7)', 9: 'la planilla de acero y hormigón (etapa 8)', 10: 'toda la información del proyecto: arquitectura, suelo, ficha, modelo ETABS, planos, planilla y presupuesto' };
  return { msg: 'Pedido a Claude' + (FUENTE[paso] ? ', a partir de ' + FUENTE[paso] : '') + '. Pídamelo en el chat: «' + etapaNombre_(paso) + ' de ' + p.Proyecto + '».' };
}

// Subida por trozos a Drive (archivos grandes: DWG, EDB, PDF). Corre como Juan; la dibujante no necesita permisos de edición.
const TROZO = 4 * 1024 * 1024;   // múltiplo de 256 KB
function destino_(u, d) {
  if (d.encargoId) {
    const e = uno_(T.ENC, 'ID', d.encargoId); if (!e) throw new Error('Encargo no encontrado.');
    if (u.rol !== 'ADMIN' && norm_(e.Dibujante) !== u.email) throw new Error('Este encargo no es suyo.');
    if (u.rol !== 'ADMIN' && ['ASIGNADO', 'CORRECCIONES'].indexOf(e.Estado) < 0) throw new Error('Este encargo ya no recibe archivos.');
    return { p: proyecto_(e['Proyecto ID']), carpeta: CARPETA_PASO[Number(e.Paso)], pref: 'R' + (Number(e.Ronda) || 1) + '_' };
  }
  if (u.rol !== 'ADMIN') throw new Error('Sin permiso.');
  if (!d.proyectoId && d.abono === 'cliente') { const c = uno_(T.CLI, 'Clave', d.cliente); if (!c || !c['Carpeta ID']) throw new Error('El cliente no tiene carpeta en Drive.'); return { p: { 'Carpeta ID': c['Carpeta ID'] }, carpeta: '_Abonos', pref: '' }; }
  if (!d.proyectoId && d.plantilla) return { p: { 'Carpeta ID': sub_(DriveApp.getFolderById(RAIZ_CONTRATANTES), '_Plantillas').getId() }, carpeta: 'CEV', pref: '' };
  if (!d.proyectoId && d.abono === 'dibujante') return { p: { 'Carpeta ID': sub_(DriveApp.getFolderById(RAIZ_CONTRATANTES), '_Dibujantes').getId() }, carpeta: '_Comprobantes', pref: '' };
  if (d.req && REQ_ETAPA[Number(d.paso)]) { const r = REQ_ETAPA[Number(d.paso)].filter(x => x.k === d.req)[0]; if (!r) throw new Error('Archivo no previsto en esta etapa.');
    if (!new RegExp('\\.(' + r.ext.join('|') + ')$', 'i').test(String(d.nombre || ''))) throw new Error('Este espacio solo acepta .' + r.ext.join(' o .') + '.');
    return { p: proyecto_(d.proyectoId), carpeta: r.carpeta, pref: '' }; }
  return { p: proyecto_(d.proyectoId), carpeta: CARPETA_PASO[Number(d.paso)] || '01_Arquitectura', pref: '' };
}
function iniciarSubida_(u, d) {
  const t = destino_(u, d), raiz = DriveApp.getFolderById(t.p['Carpeta ID']), carpeta = sub_(raiz, t.carpeta);
  const nombre = t.pref + Utilities.formatDate(new Date(), TZ_EC, 'yyyyMMdd-HHmm') + '_' + String(d.nombre || 'archivo').replace(/[\\/:*?"<>|]/g, '_');
  const r = UrlFetchApp.fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,webViewLink', {
    method: 'post', contentType: 'application/json; charset=UTF-8', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken(), 'X-Upload-Content-Type': d.mime || 'application/octet-stream', 'X-Upload-Content-Length': String(d.tam) },
    payload: JSON.stringify({ name: nombre, parents: [carpeta.getId()] }) });
  if (r.getResponseCode() !== 200) throw new Error('Drive no aceptó la subida (' + r.getResponseCode() + ').');
  const h = r.getAllHeaders(), url = h.Location || h.location;
  const sid = id_(); CacheService.getScriptCache().put('U_' + sid, JSON.stringify({ url: url, u: u.email, pid: t.p.ID || '', e2k: t.carpeta === '04_Modelo_ETABS' && u.rol === 'ADMIN' }), 21600);
  return { sid: sid, trozo: TROZO, nombre: nombre };
}
function subirTrozo_(u, d) {
  const s = JSON.parse(CacheService.getScriptCache().get('U_' + d.sid) || 'null');
  if (!s || s.u !== u.email) throw new Error('La subida expiró. Intente de nuevo.');
  const bytes = Utilities.base64Decode(d.b64), fin = d.inicio + bytes.length - 1;
  const r = UrlFetchApp.fetch(s.url, { method: 'put', contentType: 'application/octet-stream', payload: bytes, muteHttpExceptions: true,
    headers: { 'Content-Range': 'bytes ' + d.inicio + '-' + fin + '/' + d.tam } });
  const c = r.getResponseCode();
  if (c === 308) return { listo: false };
  if (c === 200 || c === 201) { const j = JSON.parse(r.getContentText()), res = { listo: true, id: j.id, nombre: j.name, url: j.webViewLink || ('https://drive.google.com/file/d/' + j.id + '/view') };
    if (s.e2k && s.pid && /\.e2k$/i.test(j.name || '')) { try { res.ficha = fichaDesdeModelo_(s.pid, j.id).n; } catch (e) { res.fichaError = e.message; } }   // ficha técnica sale del modelo
    return res; }
  throw new Error('Falló la subida (' + c + ').');
}

function entregar_(u, d) {
  const e = uno_(T.ENC, 'ID', d.encargoId); if (!e) throw new Error('Encargo no encontrado.');
  if (norm_(e.Dibujante) !== u.email && u.rol !== 'ADMIN') throw new Error('Este encargo no es suyo.');
  if (['ASIGNADO', 'CORRECCIONES'].indexOf(e.Estado) < 0) throw new Error('Este encargo no está abierto.');
  const A = (d.archivos || []).filter(a => a && a.id);
  if (!A.length) throw new Error('Suba los archivos de la entrega.');
  if (!A.some(a => /\.dwg$/i.test(a.nombre)) || !A.some(a => /\.dxf$/i.test(a.nombre))) throw new Error('La entrega necesita el DWG y también el DXF (Guardar como → DXF AutoCAD 2018).');
  const CK = checkEntrega_(), marc = (d.check || []).filter(Boolean).length;
  if (CK.length && marc < CK.length) throw new Error('Confirme todos los puntos de la lista antes de enviar (' + marc + ' de ' + CK.length + ').');
  const lam = Math.max(0, Math.round(Number(d.laminas) || 0)), val = r2(d.valor);
  if (e.Tipo !== 'MODIFICACION' && !(lam > 0)) throw new Error('Indique el número de láminas.');
  if (lam > 0 && !(val > 0)) throw new Error('Indique el valor por lámina.');
  const id = id_(), ronda = Number(e.Ronda) || 1, paso = Number(e.Paso), p = proyecto_(e['Proyecto ID']);
  agregar_(T.ENT, { ID: id, 'Encargo ID': e.ID, 'Proyecto ID': p.ID, Paso: paso, Ronda: ronda, Fecha: ahora_(), Dibujante: u.email, Archivos: JSON.stringify(A),
    'Láminas': lam, 'Valor lámina': val, 'Total declarado': r2(lam * val), Estado: 'ENTREGADA', Nota: d.nota || '', Checklist: CK.length ? CK.length + '/' + CK.length + ' confirmados' : '' });
  editar_(T.ENC, e._fila, { Estado: 'ENTREGADO' });
  ponerEtapa_(p.ID, paso, 'ENTREGADO', u.nombre);
  if (paso === 4) ponerEtapa_(p.ID, 5, 'POR REVISAR', u.nombre);
  const html = caja_(`<p>Juan:</p><p><b>${esc_(u.nombre)}</b> entregó <b>${esc_(etapaNombre_(paso))}</b> de <b>${esc_(p.Proyecto)}</b>${ronda > 1 ? ' (ronda ' + ronda + ', correcciones)' : ''}.</p>
    <p>${lam} lámina(s) × ${usd_(val)} = <b>${usd_(lam * val)}</b> declarado (por confirmar en su revisión).</p>
    <p>${A.map(a => `<a href="${a.url}">${esc_(a.nombre)}</a>`).join('<br>')}</p>${d.nota ? '<p>Nota: ' + esc_(d.nota) + '</p>' : ''}
    <p><a href="${urlApp_()}">Revisar en el portal</a></p>`);
  enviar_({ to: admin_(), subject: `Entrega: ${p.Proyecto} – ${etapaNombre_(paso)} – ${u.nombre}`, html: html });
  return { msg: 'Entrega enviada a Juan. Le avisaremos cuando la revise.' };
}

function revisar_(u, d) {
  const x = uno_(T.ENT, 'ID', d.entregaId); if (!x) throw new Error('Entrega no encontrada.');
  if (x.Estado !== 'ENTREGADA') throw new Error('Esta entrega ya fue revisada.');
  const e = uno_(T.ENC, 'ID', x['Encargo ID']), p = proyecto_(x['Proyecto ID']), paso = Number(x.Paso), dib = usuario_(x.Dibujante) || { email: x.Dibujante, nombre: x.Dibujante };
  const items = (d.items || []).filter(i => i && i.item && ['SI', 'NO', 'NA'].indexOf(i.res) >= 0);
  const nos = items.filter(i => i.res === 'NO');
  if (nos.some(i => String(i.obs || '').trim().length < 3)) throw new Error('Cada "No" necesita qué corregir.');
  const sinMarcar = CHECKLIST.filter(c => !items.some(i => i.item === c));
  if (!nos.length && sinMarcar.length) throw new Error('Para aprobar, marque todo el checklist (faltan ' + sinMarcar.length + ').');
  const f = ahora_();
  items.forEach(i => agregar_(T.REV, { 'Entrega ID': x.ID, 'Ítem': i.item, Resultado: i.res, 'Lámina': i.lamina || '', 'Observación': i.obs || '', Fecha: f }));
  if (nos.length) {   // devolver con observaciones
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(d.nuevaFecha || ''))) throw new Error('Indique la nueva fecha para las correcciones.');
    const ronda = (Number(e.Ronda) || 1) + 1;
    editar_(T.ENT, x._fila, { Estado: 'CON OBSERVACIONES', Revisado: f, Nota: d.nota || '' });
    editar_(T.ENC, e._fila, { Estado: 'CORRECCIONES', Ronda: ronda, 'Fecha límite': "'" + d.nuevaFecha, 'Recordatorio enviado': '', 'Atraso enviado': '' });
    ponerEtapa_(p.ID, paso, 'CON OBSERVACIONES', u.nombre);
    if (paso === 4) { ponerEtapa_(p.ID, 5, 'CON OBSERVACIONES', u.nombre); ponerEtapa_(p.ID, 6, 'EN CURSO', dib.nombre); }
    const lim = limiteTexto_(d.nuevaFecha, dib.tz);
    const lista = nos.map((i, k) => `<li><b>${esc_(i.item)}</b>${i.lamina ? ' · lámina ' + esc_(i.lamina) : ''}: ${esc_(i.obs)}</li>`).join('');
    enviar_({ to: dib.email, subject: `Correcciones: ${p.Proyecto} – ${etapaNombre_(paso)} – nueva fecha ${dmy_(d.nuevaFecha)}`,
      html: caja_(`<p>Hola ${esc_(dib.nombre)}:</p><p>La entrega de <b>${esc_(etapaNombre_(paso))}</b> de <b>${esc_(p.Proyecto)}</b> tiene observaciones:</p><ol>${lista}</ol>
      ${d.nota ? '<p>' + esc_(d.nota) + '</p>' : ''}<p>Nueva fecha de entrega: <b>${esc_(lim)}</b>.</p><p><a href="${urlApp_()}">Abrir el encargo en el portal</a></p>`) });
    const txt = `*Correcciones · ${p.Proyecto}*\n${etapaNombre_(paso)}\n` + nos.map((i, k) => `${k + 1}. ${i.item}${i.lamina ? ' (lám. ' + i.lamina + ')' : ''}: ${i.obs}`).join('\n') + `\nNueva fecha: ${lim}\nDetalle en su correo y en el portal.`;
    return { msg: 'Devuelto con ' + nos.length + ' observación(es).', wa: wa_(dib.wa, txt) };
  }
  // aprobar: Juan confirma láminas y valor; recién ahí suma al saldo por pagar
  const lam = Math.max(0, Math.round(Number(d.laminas != null ? d.laminas : x['Láminas']) || 0)), val = r2(d.valor != null ? d.valor : x['Valor lámina']);
  editar_(T.ENT, x._fila, { Estado: 'APROBADA', 'Láminas aprobadas': lam, 'Valor aprobado': val, 'Total aprobado': r2(lam * val), Revisado: f, Nota: d.nota || '' });
  editar_(T.ENC, e._fila, { Estado: 'APROBADO' });
  if (paso === 2) ponerEtapa_(p.ID, 2, 'APROBADO', u.nombre);
  else [4, 5, 6, 7].forEach(s => ponerEtapa_(p.ID, s, 'APROBADO', u.nombre));
  const lim2 = buscar_(T.CAM, 'Proyecto ID', p.ID); if (e.Tipo === 'MODIFICACION' && lim2.length) { const c = lim2[lim2.length - 1]; editar_(T.CAM, c._fila, { 'Láminas rehechas': lam || c['Láminas rehechas'] }); }
  enviar_({ to: dib.email, subject: `Aprobado: ${p.Proyecto} – ${etapaNombre_(paso)}`,
    html: caja_(`<p>Hola ${esc_(dib.nombre)}:</p><p>Juan aprobó <b>${esc_(etapaNombre_(paso))}</b> de <b>${esc_(p.Proyecto)}</b>.</p>
    ${lam ? `<p>Láminas confirmadas: <b>${lam} × ${usd_(val)} = ${usd_(lam * val)}</b>, ya suman a su saldo por pagar.</p>` : '<p>Modificación sin láminas nuevas.</p>'}
    ${d.nota ? '<p>' + esc_(d.nota) + '</p>' : ''}<p>¡Gracias!</p>`) });
  return { msg: 'Aprobado. ' + (lam ? lam + ' lámina(s) por ' + usd_(lam * val) + ' pasan a "por pagar".' : '') };
}

// ── CAMBIOS DE ARQUITECTURA ────────────────────────────────────────────
function registrarCambio_(u, d) {
  const p = proyecto_(d.proyectoId), imp = String(d.impacto || '').toUpperCase();
  if (['MENOR', 'MODERADO', 'MAYOR'].indexOf(imp) < 0) throw new Error('Elija el impacto.');
  if (String(d.descripcion || '').trim().length < 5) throw new Error('Describa el cambio.');
  const prev = buscar_(T.CAM, 'Proyecto ID', p.ID), rev = String.fromCharCode(65 + prev.length);
  const pasos = imp === 'MENOR' ? [4, 5, 6, 7] : imp === 'MODERADO' ? [3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const E = etapas_(p.ID), reab = [];
  E.forEach(e => { if (pasos.indexOf(e.paso) >= 0 && e.estado !== 'PENDIENTE') { ponerEtapa_(p.ID, e.paso, 'REABIERTO', u.nombre, { Nota: 'Rev. ' + rev + ' de arquitectura' }); reab.push(e.paso); } });
  agregar_(T.CAM, { 'Proyecto ID': p.ID, Rev: rev, Fecha: ahora_(), 'Pedido por': d.pedidoPor || '', Descripción: d.descripcion, Impacto: imp, 'Pasos reabiertos': reab.join(','),
    Archivo: (d.archivos || []).map(a => a.nombre).join(' · '), 'Valor cobro': r2(d.valor) > 0 ? r2(d.valor) : '' });
  let wa = '', extra = '';
  if (imp === 'MENOR' && d.dibujante && d.fecha && (E.filter(e => e.paso === 4)[0] || {}).estado !== 'PENDIENTE') {   // menor: encargo de modificación directo a la dibujante
    const r = asignar_(u, { proyectoId: p.ID, paso: 4, tipo: 'MODIFICACION', dibujante: d.dibujante, fecha: d.fecha, laminas: d.laminas || '',
      que: 'Actualizar las láminas por Rev. ' + rev + ' de arquitectura: ' + d.descripcion, obs: 'Marque los cambios con nube en la capa EST-REVISION y actualice el cuadro de revisiones. Solo las láminas nuevas suman al saldo.' });
    wa = r.wa; extra = ' Encargo de modificación enviado.';
  }
  if (r2(d.valor) > 0) extra += ' Se suman ' + usd_(r2(d.valor)) + ' al valor del proyecto (cobro al cliente).';
  return { msg: 'Rev. ' + rev + ' registrada (' + imp.toLowerCase() + '). Reabiertas: ' + (reab.join(', ') || 'ninguna') + '.' + extra, wa: wa };
}

// ── CUENTAS ────────────────────────────────────────────────────────────
function registrarCobro_(u, d) {
  const m = r2(d.monto);
  if (!(m > 0)) throw new Error('Indique el monto.');
  if (!d.proyectoId) {   // abono a cuenta del cliente
    const c = uno_(T.CLI, 'Clave', d.cliente); if (!c) throw new Error('Elija el cliente.');
    agregar_(T.MOV, { ID: id_(), Fecha: "'" + (d.fecha || hoy_()), Tipo: 'COBRO', 'Proyecto ID': '', Cliente: c.Clave, Monto: m, Detalle: d.detalle || 'Abono a cuenta', Comprobante: (d.archivos || []).map(a => a.url).join(' '), Registrado: ahora_() });
    const a = abonosCliente_(c.Clave);
    return { msg: 'Abono de ' + usd_(m) + ' registrado a la cuenta de ' + c.Contratante + '. Se aplica solo a sus proyectos con saldo, del más antiguo al más nuevo.' + (a.aFavor > 0 ? ' Saldo a favor del cliente: ' + usd_(a.aFavor) + '.' : ''), porPagar: [], proyectoId: '' };
  }
  const p = proyecto_(d.proyectoId);
  agregar_(T.MOV, { ID: id_(), Fecha: "'" + (d.fecha || hoy_()), Tipo: 'COBRO', 'Proyecto ID': p.ID, Cliente: p.Cliente, Monto: m, Detalle: d.detalle || '', Comprobante: (d.archivos || []).map(a => a.url).join(' '), Registrado: ahora_() });
  // lo que debe a cada dibujante en este proyecto
  const deuda = {}; filas_(T.ENT).filter(e => e['Proyecto ID'] === p.ID && e.Estado === 'APROBADA').forEach(e => { const k = norm_(e.Dibujante); deuda[k] = (deuda[k] || 0) + (Number(e['Total aprobado']) || 0); });
  movs_('PAGO', x => x['Proyecto ID'] === p.ID).forEach(x => { const k = norm_(x.Dibujante); deuda[k] = (deuda[k] || 0) - (Number(x.Monto) || 0); });
  const porPagar = Object.keys(deuda).filter(k => deuda[k] > 0.004).map(k => ({ email: k, nombre: (usuario_(k) || {}).nombre || k, monto: r2(deuda[k]) }));
  return { msg: 'Cobro de ' + usd_(m) + ' registrado en ' + p.Proyecto + '.', porPagar: porPagar, proyectoId: p.ID };
}
function registrarPago_(u, d) {
  const p = d.proyectoId ? proyecto_(d.proyectoId) : { ID: '', Proyecto: '' }, dib = usuario_(d.dibujante), m = r2(d.monto);
  if (!dib) throw new Error('Elija la dibujante.'); if (!(m > 0)) throw new Error('Indique el monto.');
  const comp = (d.archivos || []).map(a => a.url).join(' ');
  agregar_(T.MOV, { ID: id_(), Fecha: "'" + (d.fecha || hoy_()), Tipo: 'PAGO', 'Proyecto ID': p.ID, Dibujante: dib.email, Monto: m, 'Láminas': d.laminas || '', Detalle: d.detalle || '', Comprobante: comp, Registrado: ahora_() });
  const c = cuentaDibujante_(dib.email);
  enviar_({ to: dib.email, subject: `Pago registrado: ${usd_(m)}` + (p.Proyecto ? ` – ${p.Proyecto}` : ' – abono a su cuenta'),
    html: caja_(`<p>Hola ${esc_(dib.nombre)}:</p><p>Se registró su pago de <b>${usd_(m)}</b> ${p.Proyecto ? 'por <b>' + esc_(p.Proyecto) + '</b>' : 'como <b>abono a su cuenta</b>'}${d.laminas ? ' (' + esc_(d.laminas) + ' láminas)' : ''}, fecha ${dmy_(d.fecha || hoy_())}.</p>
    <p>Saldo por pagar después de este pago: <b>${usd_(c.porPagar)}</b>.</p>${d.detalle ? '<p>' + esc_(d.detalle) + '</p>' : ''}`) });
  return { msg: 'Pago registrado y aviso enviado a ' + dib.nombre + '.' };
}
function cuentasAdmin_() {
  const P = proyectos_().map(resumenProyecto_);
  const cli = filas_(T.CLI).map(c => { const L = P.filter(p => p.cliente === c.Clave); return { clave: c.Clave, nombre: c.Contratante, contacto: c.Contacto, correo: c.Correo, wa: c.WhatsApp,
    valor: r2(L.reduce((s, p) => s + p.valor, 0)), cobrado: r2(L.reduce((s, p) => s + p.cobrado, 0) + abonosCliente_(c.Clave).aFavor), porCobrar: r2(L.reduce((s, p) => s + p.porCobrar, 0) - abonosCliente_(c.Clave).aFavor), aFavor: abonosCliente_(c.Clave).aFavor }; });
  const dib = filas_(T.USU).filter(x => String(x.Rol).toUpperCase() === 'DIBUJANTE' && /^S/i.test(String(x.Activo || 'SI'))).map(x => Object.assign({ email: norm_(x.Correo), nombre: x.Nombre }, cuentaDibujante_(norm_(x.Correo))));
  return { proyectos: P, clientes: cli, dibujantes: dib, movimientos: filas_(T.MOV).slice(-60).reverse() };
}

// Estados de cuenta (PDF con el formato de Juan: estado de cuenta SVC de noviembre 2026)
function datosEstado_(u, d) {
  if (d.tipo === 'dibujante') {
    const email = u.rol === 'ADMIN' ? norm_(d.clave) : u.email, dib = usuario_(email); if (!dib) throw new Error('Dibujante no encontrada.');
    const c = cuentaDibujante_(email);
    const html = docBase_('ESTADO DE CUENTA', 'DIBUJANTE', dib.nombre, '', 'Por pagar', c.porPagar, 'Láminas aprobadas menos pagos recibidos',
      [['Total aprobado', c.aprobado, '#1D2B36'], ['Pagado', c.pagado, '#2E7D4F'], ['Por pagar', c.porPagar, '#A65E2E'], ['Por confirmar', c.porConfirmar, '#3D434A']],
      `<h3>Láminas aprobadas</h3>` + tabla_(['Fecha', 'Proyecto', 'Etapa', 'Láminas', 'Valor', 'Total'], c.lineas.map(l => [dmy_(l.fecha), esc_(l.proyecto), esc_(l.etapa), l.laminas, usd_(l.valor), usd_(l.total)]), [3, 4, 5])
      + `<h3>Pagos recibidos</h3>` + tabla_(['Fecha', 'Proyecto', 'Detalle', 'Monto'], c.pagos.map(m => [dmy_(m.fecha), esc_(m.proyecto), esc_(m.detalle || ''), usd_(m.monto)]), [3]),
      '', `Valores en dólares de los Estados Unidos. "Por confirmar" son láminas entregadas que aún no revisa Juan; suman al saldo cuando las aprueba. Corte al ${dmy_(hoy_())}.`);
    return { html: html, nombre: 'Estado_de_cuenta_' + dib.nombre.replace(/\W+/g, '_') + '_' + hoy_(), para: dib.email, wa: dib.wa, quien: dib.nombre, saldo: c.porPagar };
  }
  if (u.rol !== 'ADMIN') throw new Error('Sin permiso.');
  const c = cliente_(d.clave), P = proyectos_().filter(p => p.Cliente === d.clave && (Number(p['Valor contrato']) || 0) > 0).map(resumenProyecto_);
  const tv = r2(P.reduce((s, p) => s + p.valor, 0)), tc = r2(P.reduce((s, p) => s + p.cobrado, 0));
  const hoy = r2(P.reduce((s, p) => s + p.porPagarHoy, 0)), ent = r2(P.reduce((s, p) => s + p.aLaEntrega, 0));
  const queHoy = P.filter(p => p.porPagarHoy > 0).map(p => p.estadoPago === 'Anticipo pendiente' ? 'anticipo ' + p.anticipo + '% ' + p.nombre : p.nombre).join(' + ');
  const pend = P.filter(p => p.aLaEntrega > 0);
  const kEnt = pend.length === 1 ? 'A la entrega de ' + pend[0].nombre.split(' ')[0] : 'A la entrega';
  const badge = e => { const col = e === 'Pagado' ? ['#E6F2EA', '#2E7D4F'] : e === 'En ejecución' ? ['#ECEEF0', '#3D434A'] : ['#F6EBE2', '#A65E2E']; return `<span style="background:${col[0]};color:${col[1]};padding:3px 9px;border-radius:10px;font-weight:bold;font-size:10px">${esc_(e)}</span>`; };
  const filas = P.map(p => [`<b>${esc_(p.nombre)}</b>${p.desc || p.anticipo ? `<br><span style="color:#6E7679;font-size:10px">${esc_(p.desc)}${p.desc && !p.entregado && p.anticipo ? '<br>' : ''}${!p.entregado && p.anticipo ? p.anticipo + '% anticipo · ' + (100 - p.anticipo) + '% contra entrega' : ''}${p.cambios > 0 ? '<br>Incluye cambios solicitados: ' + usd_(p.cambios) : ''}</span>` : ''}`,
    esc_(p.servicio), usd_(p.valor), usd_(p.cobrado), p.porCobrar > 0 ? '<b>' + usd_(p.porCobrar) + '</b>' : usd_(p.porCobrar), badge(p.estadoPago)]);
  filas.push(['<b>Total</b>', '', '<b>' + usd_(tv) + '</b>', '<b>' + usd_(tc) + '</b>', `<b style="color:#A65E2E">${usd_(tv - tc)}</b>`, '']);
  const notaEnt = pend.map(p => `${p.nombre}${p.estadoPago === 'Anticipo pendiente' ? ' (en ejecución): el anticipo del ' + p.anticipo + '% (' + usd_(p.valor - p.aLaEntrega - p.cobrado > 0 ? r2(p.valor - p.aLaEntrega - p.cobrado) : 0) + ') corresponde pagarlo ahora;' : ':'} el ${100 - p.anticipo}% restante (${usd_(p.aLaEntrega)}) se paga al entregar los planos y la memoria de cálculo.`).join(' ');
  const html = docBase_('ESTADO DE CUENTA', 'CLIENTE', c.Contratante, c.Contacto ? 'Atención: ' + c.Contacto : '', 'Por pagar hoy', hoy, queHoy || 'Al día',
    [['Total contratado', tv, '#1D2B36'], ['Pagado', tc, '#2E7D4F'], ['Por pagar hoy', hoy, '#A65E2E'], [kEnt, ent, '#3D434A']],
    `<h3>Detalle por proyecto</h3>` + tabla_(['Proyecto', 'Servicio', 'Valor', 'Pagado', 'Saldo', 'Estado'], filas, [2, 3, 4], 5)
    + `<h3>Pagos recibidos</h3>` + tabla_(['Fecha', 'Aplicado a', 'Detalle', 'Monto'], filas_(T.MOV).filter(m => m.Tipo === 'COBRO' && m.Cliente === d.clave && (!m['Proyecto ID'] || P.some(p => p.id === m['Proyecto ID'])))
      .sort((a, b) => String(a.Fecha) < String(b.Fecha) ? -1 : 1).map(m => [m.Fecha ? dmy_(ymd_(m.Fecha)) : '—', m['Proyecto ID'] ? esc_((P.filter(p => p.id === m['Proyecto ID'])[0] || {}).nombre || '') : 'Abono a cuenta', esc_(m.Detalle || ''), usd_(Number(m.Monto) || 0)]), [3])
    + (abonosCliente_(d.clave).aFavor > 0 ? `<p><b>Saldo a favor del cliente: ${usd_(abonosCliente_(d.clave).aFavor)}</b></p>` : ''),
    barra_(tv, tc, hoy, ent, pend.length === 1 ? 'se paga al entregar ' + pend[0].nombre : 'se paga a la entrega'),
    `Valores en dólares de los Estados Unidos. Este estado de cuenta resume los trabajos contratados y los pagos registrados al ${dmy_(hoy_())}. ${notaEnt} Si encuentra alguna diferencia, escríbame y la revisamos juntos. ¡Gracias por su confianza!`, true);
  return { html: html, nombre: 'Estado_de_cuenta_' + String(c.Contratante).replace(/\W+/g, '_') + '_' + hoy_(), para: c.Correo, wa: c.WhatsApp, quien: c.Contacto || c.Contratante, saldo: hoy, total: r2(tv - tc), proyectos: P };
}
function tabla_(cab, filas, num, centro) {
  const al = i => (num || []).indexOf(i) >= 0 ? 'right' : i === centro ? 'center' : 'left';
  return `<table class="t" width="100%" cellspacing="0"><tr>${cab.map((h, i) => `<th style="text-align:${al(i)}">${h}</th>`).join('')}</tr>${filas.length ? filas.map(r => `<tr>${r.map((c, i) => `<td style="text-align:${al(i)}">${c}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${cab.length}" style="color:#888">Sin registros</td></tr>`}</table>`;
}
function barra_(tv, tc, hoy, ent, txt) {
  if (!(tv > 0)) return '';
  const p = x => Math.max(0, Math.round(x / tv * 100)), a = p(tc), b = Math.min(100 - a, p(hoy)), c = Math.max(0, 100 - a - b);
  const td = (w, col) => w > 0 ? `<td width="${w}%" style="width:${w}%;background:${col};height:10px;font-size:1px;line-height:10px">&nbsp;</td>` : '';
  return `<table width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;border-collapse:collapse;margin:12px 0 4px"><tr>${td(a, '#2E7D4F')}${td(b, '#C9874F')}${td(c, '#C3C8CE')}</tr></table>
  <div style="color:#555;font-size:10px">Verde: pagado (${a}%) · Naranja: por pagar hoy (${b}%)${c ? ' · Gris: ' + esc_(txt) + ' (' + c + '%)' : ''}.</div>`;
}
function docBase_(titulo, etiqueta, nombre, atencion, kTitulo, kValor, kSub, tarjetas, cuerpo, barra, pie, conPago) {
  const k = tarjetas.map(t => `<td width="25%" style="width:25%;border:1px solid #D5DADC;padding:10px 12px;vertical-align:top"><div style="color:#555;font-size:10px;height:26px">${esc_(t[0])}</div><div style="font-size:16px;font-weight:bold;color:${t[2]};white-space:nowrap">${usd_(t[1])}</div></td>`).join('');
  const pago = conPago ? `<table width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;margin-top:18px;border-collapse:separate;border-spacing:0"><tr>
    <td width="52%" style="width:52%;border:2px solid #3D434A;padding:12px 14px;vertical-align:top"><div style="color:#3D434A;font-weight:bold;font-size:13px;margin-bottom:6px">¿Cómo pagar?</div>${esc_(cfg_('Datos de pago') || '').replace(/\n/g, '<br>')}</td>
    <td width="4%" style="width:4%"></td><td width="44%" style="width:44%;background:#EEF1F5;padding:12px 14px;vertical-align:top"><div style="font-weight:bold;font-size:13px;margin-bottom:6px">Después de pagar</div>${esc_(cfg_('Después de pagar') || '')}</td></tr></table>` : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;font-size:11px;color:#1D2B36;margin:26px 30px}table{font-size:11px;font-family:Arial,sans-serif}
  h3{font-family:Arial,sans-serif;font-size:13px;margin:18px 0 8px}.t{width:100%;border-collapse:collapse}.t th{background:#EEF1F5;padding:8px 6px;font-size:11px}.t td{border-bottom:1px solid #E3E6E8;padding:8px 6px;vertical-align:middle}</style></head><body>
  <table width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;border-collapse:collapse;border-bottom:2px solid #3D434A"><tr><td width="62%" style="width:62%;padding-bottom:10px;vertical-align:top">
    <table cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tr><td style="width:62px;vertical-align:top;padding-right:12px"><img src="${LOGO}" width="56" height="56" style="width:56px;height:56px"></td><td style="vertical-align:top">
    <div style="font-size:17px;font-weight:bold;color:#2B3036">${esc_(cfg_('Empresa') || APP)}</div><div style="color:#3D434A;margin-top:3px;font-weight:bold">${esc_(cfg_('Firma') || '')}</div><div style="color:#555;margin-top:2px">${esc_(cfg_('Subtítulo') || '')} · ${esc_(cfg_('Contacto') || '')}</div></td></tr></table></td>
    <td width="38%" style="width:38%;text-align:right;vertical-align:top"><div style="font-size:19px;font-weight:bold;letter-spacing:1px;white-space:nowrap">${esc_(titulo)}</div><div style="color:#555;margin-top:4px">Fecha: ${fechaLarga_()}</div></td></tr></table>
  <table width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;margin-top:16px;border-collapse:collapse"><tr><td width="58%" style="width:58%;vertical-align:top"><div style="color:#6E7679;font-size:9px;letter-spacing:1px">${esc_(etiqueta)}</div>
    <div style="font-size:15px;font-weight:bold;margin-top:3px">${esc_(nombre)}</div><div style="color:#555;margin-top:2px">${esc_(atencion)}</div></td>
    <td width="42%" style="width:42%;background:#3D434A;color:#ffffff;padding:14px 18px;vertical-align:top"><div style="font-size:11px;color:#ffffff">${esc_(kTitulo)}</div><div style="font-size:26px;font-weight:bold;margin:4px 0;color:#ffffff">${usd_(kValor)}</div><div style="font-size:10px;color:#ffffff">${esc_(kSub)}</div></td></tr></table>
  <h3>Resumen de un vistazo</h3><table width="100%" cellspacing="6" cellpadding="0" style="width:100%;table-layout:fixed;border-collapse:separate;border-spacing:6px 0;margin-left:-6px"><tr>${k}</tr></table>${barra || ''}
  ${cuerpo}${pago}<div style="margin-top:18px;border-top:1px solid #D5DADC;padding-top:8px;color:#555;font-size:10px;line-height:1.5">${esc_(pie)}</div></body></html>`;
}
function fechaLarga_() { const M = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'], h = hoy_().split('-'); return h[2] + ' de ' + M.at(Number(h[1]) - 1) + ' de ' + h[0]; }
function vistaEstado_(u, d) { const x = datosEstado_(u, d); return { html: x.html, para: x.para, saldo: x.saldo }; }
function pdfEstado_(x) { return Utilities.newBlob(x.html, 'text/html', 'e.html').getAs('application/pdf').setName(x.nombre + '.pdf'); }
function descargarEstado_(u, d) { const x = datosEstado_(u, d), b = pdfEstado_(x); return { b64: Utilities.base64Encode(b.getBytes()), nombre: b.getName() }; }
function enviarEstado_(u, d) {
  const x = datosEstado_(u, d), pdf = pdfEstado_(x);
  if (!x.para) throw new Error('Falta el correo de ' + x.quien + '.');
  let file = null;
  if (d.tipo === 'cliente') x.proyectos.forEach(p => { const pr = proyecto_(p.id); if (pr['Carpeta ID']) { const f = sub_(DriveApp.getFolderById(pr['Carpeta ID']), '09_Proformas_y_cobros').createFile(pdf.copyBlob()); if (!file) file = f; } });
  else file = sub_(sub_(DriveApp.getFolderById(RAIZ_CONTRATANTES), '_Dibujantes'), x.quien).createFile(pdf.copyBlob());
  if (file) try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) { }
  const cuerpo = d.tipo === 'cliente' ? `<p>Estimado(a) ${esc_(x.quien)}:</p><p>Le comparto el estado de cuenta al ${dmy_(hoy_())}. Por pagar hoy: <b>${usd_(x.saldo)}</b>${x.total > x.saldo ? ' (saldo total ' + usd_(x.total) + ')' : ''}.</p><p>Si encuentra alguna diferencia, escríbame y la revisamos juntos.</p>`
    : `<p>Hola ${esc_(x.quien)}:</p><p>Le comparto su estado de cuenta al ${dmy_(hoy_())}. Por pagar: <b>${usd_(x.saldo)}</b>.</p>`;
  enviar_({ to: x.para, subject: `Estado de cuenta – ${x.quien} – ${dmy_(hoy_())}`, attachments: [pdf], html: caja_(cuerpo) });
  const txt = d.tipo === 'cliente' ? `Estimado(a) ${x.quien}, le comparto el estado de cuenta al ${dmy_(hoy_())}. Por pagar hoy: ${usd_(x.saldo)}.${file ? '\n' + file.getUrl() : ''}\nTambién se lo envié por correo. Saludos, ${cfg_('Firma') || ''}`
    : `Hola ${x.quien}, su estado de cuenta al ${dmy_(hoy_())}: por pagar ${usd_(x.saldo)}.${file ? '\n' + file.getUrl() : ''}`;
  return { msg: 'Estado de cuenta enviado por correo a ' + x.para + '.', wa: wa_(x.wa, txt), pdf: file ? file.getUrl() : '' };
}


// ── PROFORMAS ──────────────────────────────────────────────────────────
// Cada proforma define sus condiciones (tarifa, ítems, forma de pago, plazo, exclusiones). Al aprobarla crea o actualiza el proyecto.
const COND_CAMBIOS = 'Los cambios en el proyecto solicitados después de aprobada esta proforma se cotizan y cobran aparte.';
function proforma_(id) { const f = uno_(T.PRF, 'ID', id); if (!f) throw new Error('Proforma no encontrada.'); return f; }
function itemsPrf_(f) { try { return JSON.parse(f['Ítems'] || '[]'); } catch (e) { return []; } }
const numPrf_ = n => 'No. ' + String(n).padStart(2, '0');
function vistaProforma_(f) {
  return { id: f.ID, numero: Number(f['Número']) || 1, fecha: ymd_(f.Fecha).slice(0, 10), cliente: f.Cliente, contratante: cliente_(f.Cliente).Contratante, atencion: f['Atención'] || '',
    proyecto: f.Proyecto, proyectoId: f['Proyecto ID'] || '', estado: f.Estado || 'BORRADOR', items: itemsPrf_(f), subtotal: Number(f.Subtotal) || 0, descuento: Number(f.Descuento) || 0,
    iva: f['IVA %'] === '' ? 15 : Number(f['IVA %']), total: Number(f.Total) || 0, anticipo: f['Anticipo %'] === '' ? 50 : Number(f['Anticipo %']), pago: f['Forma de pago'] || '',
    plazo: f.Plazo || '', exclusiones: f.Exclusiones || '', condiciones: f.Condiciones || '', validez: Number(f['Validez días']) || 15, archivo: f.Archivo || '',
    enviada: ymd_(f.Enviada || '').slice(0, 10), respuesta: ymd_(f.Respuesta || '').slice(0, 10), nota: f.Nota || '' };
}
function proformas_() {
  const L = filas_(T.PRF).filter(f => f.ID).map(vistaProforma_).reverse();
  return { proformas: L, clientes: filas_(T.CLI).filter(c => /^S/i.test(String(c.Activo || 'SI'))).map(c => ({ clave: c.Clave, nombre: c.Contratante, contacto: c.Contacto || '' })),
    proyectos: proyectos_().map(p => ({ id: p.ID, cliente: p.Cliente, nombre: p.Proyecto })), iva: Number(cfg_('IVA %')) || 15, condiciones: COND_CAMBIOS };
}
function totalesPrf_(items, desc, iva) {
  const L = items.map(i => { const glb = /^(glb|gl|global)$/i.test(String(i.und || '').trim()), cant = glb ? 1 : r2(i.cant), pu = r2(i.pu);
    return { desc: String(i.desc || '').trim(), cant: cant, und: String(i.und || 'm²').trim() || 'm²', pu: pu, total: r2(cant * pu), grupo: String(i.grupo || '').trim() }; })
    .filter(i => i.desc);
  const sub = r2(L.reduce((s, i) => s + i.total, 0)), base = r2(sub - r2(desc)), v = r2(base * (Number(iva) || 0) / 100);
  return { items: L, subtotal: sub, base: base, iva: v, total: r2(base + v) };
}
function guardarProforma_(u, d) {
  if (!d.cliente) throw new Error('Elija el cliente.');
  if (!String(d.proyecto || '').trim()) throw new Error('Escriba el nombre del proyecto.');
  const t = totalesPrf_(d.items || [], d.descuento, d.iva);
  if (!t.items.length) throw new Error('Agregue al menos un ítem.');
  if (t.items.some(i => i.pu < 0 || (i.cant <= 0 && i.pu > 0))) throw new Error('Revise cantidades y precios.');
  if (r2(d.descuento) < 0 || r2(d.descuento) > t.subtotal) throw new Error('El descuento no puede ser mayor que el subtotal.');
  const anticipo = Math.min(100, Math.max(0, Number(d.anticipo == null || d.anticipo === '' ? 50 : d.anticipo)));
  const c = { Cliente: d.cliente, 'Atención': d.atencion || '', Proyecto: String(d.proyecto).trim(), 'Proyecto ID': d.proyectoId || '', 'Ítems': JSON.stringify(t.items),
    Subtotal: t.subtotal, Descuento: r2(d.descuento) || 0, 'IVA %': Number(d.iva) || 0, Total: t.total, 'Anticipo %': anticipo, 'Forma de pago': d.pago || '', Plazo: d.plazo || '',
    Exclusiones: d.exclusiones || '', Condiciones: d.condiciones == null ? COND_CAMBIOS : d.condiciones, 'Validez días': Number(d.validez) || 15, Nota: d.nota || '' };
  if (d.id) {
    const f = proforma_(d.id);
    if (f.Estado === 'APROBADA') throw new Error('Esta proforma ya está aprobada. Haga una nueva versión.');
    editar_(T.PRF, f._fila, c); return { id: d.id, msg: 'Proforma ' + numPrf_(f['Número']) + ' guardada.' };
  }
  const k = s => norm_(String(s || '').trim());
  const n = filas_(T.PRF).filter(f => f.Cliente === d.cliente && k(f.Proyecto) === k(d.proyecto)).reduce((m, f) => Math.max(m, Number(f['Número']) || 0), 0) + 1;
  const id = id_(); agregar_(T.PRF, Object.assign({ ID: id, 'Número': n, Fecha: "'" + hoy_(), Estado: 'BORRADOR' }, c));
  return { id: id, msg: 'Proforma ' + numPrf_(n) + ' creada.' };
}
function htmlProforma_(F) {
  const f = vistaProforma_(F), cli = cliente_(f.cliente), t = totalesPrf_(f.items, f.descuento, f.iva), base = t.base;
  const M = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'], h = (f.fecha || hoy_()).split('-');
  const fecha = Number(h[2]) + ' de ' + M[Number(h[1]) - 1] + ' de ' + h[0], num = n => Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 });
  let filas = '', g = null;
  t.items.forEach(i => {
    if (i.grupo && i.grupo !== g) { g = i.grupo; filas += `<tr><td colspan="5" style="background:#F4F6F7;font-weight:bold">${esc_(g)}</td></tr>`; }
    filas += `<tr><td>${esc_(i.desc)}</td><td style="text-align:right">${/^gl/i.test(i.und) ? '1' : num(i.cant)}</td><td style="text-align:center">${esc_(i.und)}</td>
      <td style="text-align:right">${i.pu > 0 ? usd_(i.pu) : ''}</td><td style="text-align:right">${i.pu > 0 ? usd_(i.total) : '<i>Incluido</i>'}</td></tr>`;
  });
  const fila = (k, v, b) => `<tr><td colspan="4" style="text-align:right;${b ? 'font-weight:bold' : ''}">${k}</td><td style="text-align:right;${b ? 'font-weight:bold' : ''}">${v}</td></tr>`;
  filas += fila('Subtotal', usd_(t.subtotal)) + (f.descuento > 0 ? fila('Descuento', '−' + usd_(f.descuento)) + fila('Subtotal con descuento', usd_(base)) : '')
    + fila('IVA ' + f.iva + '%', usd_(t.iva)) + fila('TOTAL', usd_(t.total), 1);
  const pago = f.pago || (f.anticipo >= 100 ? 'Pago del 100 % a la firma.' : f.anticipo > 0 ? `${f.anticipo} % de anticipo a la aprobación de la proforma (${usd_(r2(t.total * f.anticipo / 100))}) y ${100 - f.anticipo} % a la entrega de planos y memoria de cálculo (${usd_(r2(t.total - r2(t.total * f.anticipo / 100)))}).` : 'Pago a la entrega de planos y memoria de cálculo.');
  const lista = txt => String(txt || '').split(/\n+/).map(x => x.replace(/^[\s•\-–]+/, '').trim()).filter(Boolean);
  let sec = 1; const S = (tit, cuerpo) => cuerpo ? `<h3>${sec++}. ${tit}</h3>${cuerpo}` : '';
  const ul = L => L.length ? '<ul style="margin:4px 0 0 18px;padding:0">' + L.map(x => `<li style="margin:3px 0">${esc_(x)}</li>`).join('') + '</ul>' : '';
  const datosPago = String(cfg_('Datos de pago') || '').trim();
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;font-size:11px;color:#1D2B36;margin:26px 30px;line-height:1.45}table{font-size:11px;font-family:Arial,sans-serif}
  h3{font-size:12.5px;margin:18px 0 6px;color:#2B3036}.t{width:100%;border-collapse:collapse}.t th{background:#3D434A;color:#fff;padding:7px 6px;font-size:10.5px}.t td{border-bottom:1px solid #E3E6E8;padding:6px}</style></head><body>
  <table width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;border-collapse:collapse;border-bottom:2px solid #3D434A"><tr><td width="60%" style="width:60%;padding-bottom:10px;vertical-align:top">
    <table cellspacing="0" cellpadding="0"><tr><td style="width:62px;vertical-align:top;padding-right:12px"><img src="${LOGO}" width="56" height="56"></td><td style="vertical-align:top">
    <div style="font-size:17px;font-weight:bold;color:#2B3036">${esc_(cfg_('Empresa') || APP)}</div><div style="color:#3D434A;margin-top:3px;font-weight:bold">${esc_(cfg_('Firma') || '')}</div><div style="color:#555;margin-top:2px">${esc_(cfg_('Subtítulo') || '')} · ${esc_(cfg_('Contacto') || '')}</div></td></tr></table></td>
    <td width="40%" style="width:40%;text-align:right;vertical-align:top"><div style="font-size:17px;font-weight:bold;letter-spacing:.5px">PROFORMA DE SERVICIOS</div><div style="font-size:15px;font-weight:bold;margin-top:2px">${numPrf_(f.numero)}</div><div style="color:#555;margin-top:4px">Fecha: ${fecha}</div></td></tr></table>
  <table width="100%" cellspacing="0" cellpadding="0" style="width:100%;margin-top:14px"><tr><td style="vertical-align:top"><div style="color:#6E7679;font-size:9px;letter-spacing:1px">CLIENTE</div>
    <div style="font-size:14px;font-weight:bold;margin-top:2px">${esc_(cli.Contratante)}</div>${f.atencion || cli.Contacto ? `<div style="color:#555">Atención: ${esc_(f.atencion || cli.Contacto)}</div>` : ''}</td>
    <td style="vertical-align:top;text-align:right"><div style="color:#6E7679;font-size:9px;letter-spacing:1px">PROYECTO</div><div style="font-size:14px;font-weight:bold;margin-top:2px">${esc_(f.proyecto)}</div></td></tr></table>
  <p>Por medio de la presente pongo a su consideración la propuesta económica para el siguiente servicio:</p>
  ${S('Alcance y valor', `<table class="t" cellspacing="0"><tr><th style="text-align:left">Descripción</th><th style="text-align:right;width:70px">Cantidad</th><th style="width:42px">Und.</th><th style="text-align:right;width:75px">P. unitario</th><th style="text-align:right;width:85px">Total</th></tr>${filas}</table>`)}
  ${S('Forma de pago', '<p style="margin:4px 0">' + esc_(pago).replace(/\n/g, '<br>') + '</p>' + (datosPago ? `<p style="margin:6px 0;color:#555">${esc_(datosPago).replace(/\n/g, '<br>')}</p>` : ''))}
  ${S('Plazo', f.plazo ? '<p style="margin:4px 0">' + esc_(f.plazo).replace(/\n/g, '<br>') + '</p>' : '')}
  ${S('Exclusiones', ul(lista(f.exclusiones)))}
  ${S('Condiciones', ul(lista(f.condiciones)))}
  <p style="margin-top:16px">Validez de la oferta: ${f.validez} días a partir de la fecha de emisión. Valores en dólares de los Estados Unidos.</p>
  <p style="margin-top:34px">Atentamente,</p><div style="margin-top:46px;width:240px;border-top:1px solid #1D2B36;padding-top:4px"><b>${esc_(cfg_('Firma') || '')}</b><br><span style="color:#555">${esc_(cfg_('Subtítulo') || '')}</span></div>
  </body></html>`;
}
function pdfProforma_(F) {
  const nombre = ('Proforma_' + String(F['Número']).padStart(2, '0') + '_' + F.Proyecto + '_' + cliente_(F.Cliente).Contratante).replace(/[^\wÁÉÍÓÚÑáéíóúñ]+/g, '_');
  return Utilities.newBlob(htmlProforma_(F), 'text/html', 'p.html').getAs('application/pdf').setName(nombre + '.pdf');
}
function carpetaPrf_(F) {
  if (F['Proyecto ID']) { const p = uno_(T.PRO, 'ID', F['Proyecto ID']); if (p && p['Carpeta ID']) return sub_(DriveApp.getFolderById(p['Carpeta ID']), '09_Proformas_y_cobros'); }
  const c = cliente_(F.Cliente), padre = c['Carpeta ID'] ? DriveApp.getFolderById(c['Carpeta ID']) : sub_(DriveApp.getFolderById(RAIZ_CONTRATANTES), c.Contratante);
  return sub_(padre, '_Proformas');
}
function enviarProforma_(u, d) {
  const F = proforma_(d.id), c = cliente_(F.Cliente), para = norm_(d.para || c.Correo);
  if (!para) throw new Error('Falta el correo de ' + c.Contratante + ' (Ajustes → Clientes).');
  const pdf = pdfProforma_(F), file = carpetaPrf_(F).createFile(pdf.copyBlob());
  try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) { }
  const v = vistaProforma_(F), quien = F['Atención'] || c.Contacto || c.Contratante;
  enviar_({ to: para, subject: `Proforma ${numPrf_(v.numero)} – ${F.Proyecto}`, attachments: [pdf],
    html: caja_(`<p>Estimado(a) ${esc_(quien)}:</p><p>Le envío la proforma ${numPrf_(v.numero)} para <b>${esc_(F.Proyecto)}</b>, por un total de <b>${usd_(v.total)}</b> (IVA incluido).</p>
    <p>Quedo atento a sus comentarios. Si está de acuerdo, me confirma por este medio para empezar.</p>`) });
  editar_(T.PRF, F._fila, { Estado: F.Estado === 'APROBADA' ? 'APROBADA' : 'ENVIADA', Enviada: "'" + hoy_(), Archivo: file.getUrl() });
  const txt = `Estimado(a) ${quien}, le comparto la proforma ${numPrf_(v.numero)} de ${F.Proyecto}: total ${usd_(v.total)} (IVA incluido).\n${file.getUrl()}\nTambién se la envié por correo. Saludos, ${cfg_('Firma') || ''}`;
  return { msg: 'Proforma enviada por correo a ' + para + '.', wa: wa_(c.WhatsApp, txt), pdf: file.getUrl() };
}
function aprobarProforma_(u, d) {
  const F = proforma_(d.id), v = vistaProforma_(F);
  if (F.Estado === 'APROBADA') throw new Error('Ya está aprobada.');
  const t = totalesPrf_(v.items, v.descuento, v.iva), nota = 'Proforma ' + numPrf_(v.numero) + ' aprobada ' + dmy_(hoy_()) + ' (' + usd_(t.base) + ' + IVA).';
  let pid = F['Proyecto ID'];
  if (pid) {
    const p = proyecto_(pid);
    editar_(T.PRO, p._fila, Object.assign({ 'Valor contrato': t.base, 'Anticipo %': v.anticipo, Notas: (p.Notas ? p.Notas + '\n' : '') + nota }, d.entrega ? { 'Fecha entrega': "'" + d.entrega } : {}));
  } else {
    pid = guardarProyecto_({ Cliente: F.Cliente, Proyecto: F.Proyecto, Servicio: d.servicio || 'Diseño estructural', 'Valor contrato': t.base, 'Anticipo %': v.anticipo, Notas: nota, 'Fecha entrega': d.entrega || '' }).id;
  }
  editar_(T.PRF, F._fila, { Estado: 'APROBADA', Respuesta: "'" + hoy_(), 'Proyecto ID': pid });
  const k = s => norm_(String(s || '').trim());
  filas_(T.PRF).filter(x => x.ID !== F.ID && x.Cliente === F.Cliente && k(x.Proyecto) === k(F.Proyecto) && ['BORRADOR', 'ENVIADA'].indexOf(x.Estado) >= 0)
    .forEach(x => editar_(T.PRF, x._fila, { Estado: 'REEMPLAZADA' }));
  try { const p = proyecto_(pid); if (p['Carpeta ID']) { const fl = sub_(DriveApp.getFolderById(p['Carpeta ID']), '09_Proformas_y_cobros'); if (!F.Archivo) editar_(T.PRF, F._fila, { Archivo: fl.createFile(pdfProforma_(proforma_(F.ID))).getUrl() }); } } catch (e) { }
  return { msg: nota + ' Valor del contrato: ' + usd_(t.base) + ', anticipo ' + v.anticipo + ' %.', proyectoId: pid };
}
function eliminarProforma_(u, d) {
  const F = proforma_(d.id);
  if (F.Estado === 'APROBADA') throw new Error('No se elimina una proforma aprobada.');
  hoja_(T.PRF).deleteRow(F._fila); delete CACHE_[T.PRF[0]];
  return { msg: 'Proforma eliminada.' };
}


// ── PLANOS: REVISIÓN VIGENTE Y QR ──────────────────────────────────────
// Cada vez que se aprueba "Plano terminado" (etapa 7) se registra una revisión nueva de planos (Rev. 1, 2, 3…).
// El QR del rótulo lleva el proyecto y la revisión; al escanearlo, la página dice si esa revisión es la vigente.
function revVigente_(pid) { const R = buscar_(T.PLA, 'Proyecto ID', pid).filter(r => r.Estado === 'VIGENTE'); return R.length ? R[R.length - 1] : null; }
function urlQr_(pid, rev) { return String(cfg_('URL verificación') || ScriptApp.getService().getUrl()).split('?')[0] + '?v=' + encodeURIComponent(pid) + '&r=' + rev; }
function registrarRev_(p, u, rev, nota) {
  const R = buscar_(T.PLA, 'Proyecto ID', p.ID), n = Number(rev) > 0 ? Number(rev) : R.reduce((m, r) => Math.max(m, Number(r.Rev) || 0), 0) + 1;
  R.filter(r => r.Estado === 'VIGENTE').forEach(r => editar_(T.PLA, r._fila, { Estado: 'REEMPLAZADA' }));
  let arch = []; try { const c = carpetasDe_(p['Carpeta ID'])['05_Planos']; if (c) { const it = c.getFiles(), L = []; while (it.hasNext()) { const f = it.next(); if (!f.isTrashed() && /\.(dwg|dxf|pdf)$/i.test(f.getName()) && f.getName().indexOf('Revision_') < 0) L.push([f.getLastUpdated().getTime(), f.getName()]); }
    arch = L.sort((a, b) => b[0] - a[0]).slice(0, 6).map(x => x[1]); } } catch (e) { }
  agregar_(T.PLA, { 'Proyecto ID': p.ID, Rev: n, Fecha: "'" + hoy_(), Estado: 'VIGENTE', Archivos: arch.join(' · '), Por: u ? u.nombre : '', Nota: nota || '' });
  return n;
}
function qrInfo_(u, d) {
  const p = proyecto_(d.proyectoId), Rv = revVigente_(p.ID), vig = Rv ? Number(Rv.Rev) : 0;
  if (u.rol !== 'ADMIN' && !filas_(T.ENC).some(e => e['Proyecto ID'] === p.ID && norm_(e.Dibujante) === u.email)) throw new Error('Sin permiso.');
  return { proyecto: p.Proyecto, vigente: vig, fecha: Rv ? ymd_(Rv.Fecha).slice(0, 10) : '', urlVigente: vig ? urlQr_(p.ID, vig) : '', proxima: vig + 1, urlProxima: urlQr_(p.ID, vig + 1) };
}
function verificarPlano_(pid, r) {
  const p = uno_(T.PRO, 'ID', pid), Rv = p ? revVigente_(pid) : null, vig = Rv ? Number(Rv.Rev) : 0, R = p ? buscar_(T.PLA, 'Proyecto ID', pid) : [];
  const esta = R.filter(x => Number(x.Rev) === r)[0];
  let color = '#A33A32', titulo = 'Plano no reconocido', texto = 'Este código no corresponde a un proyecto registrado. Consulte a CEV antes de construir.';
  if (p && r && r === vig) { color = '#2E7D4F'; titulo = '✓ Revisión vigente'; texto = 'Este plano es la revisión <b>Rev. ' + r + '</b>, la última aprobada (' + dmy_(ymd_(Rv.Fecha).slice(0, 10)) + '). Puede usarse.'; }
  else if (p && r && r < vig) { titulo = '✗ Revisión reemplazada'; texto = 'Este plano es la <b>Rev. ' + r + '</b>' + (esta ? ' del ' + dmy_(ymd_(esta.Fecha).slice(0, 10)) : '') + '. Ya no es válido: la vigente es la <b>Rev. ' + vig + '</b> del ' + dmy_(ymd_(Rv.Fecha).slice(0, 10)) + '. Pida la versión actual.'; }
  else if (p && r) { color = '#B7791F'; titulo = '⚠ Revisión en preparación'; texto = 'Este plano es la <b>Rev. ' + r + '</b>, que todavía no está aprobada' + (vig ? ' (la vigente es la Rev. ' + vig + ')' : '') + '. No construya con él.'; }
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Verificación de plano · CEV</title></head>
  <body style="font-family:Arial,sans-serif;margin:0;background:#F4F5F6;color:#1D2B36"><div style="max-width:520px;margin:0 auto;padding:22px">
  <div style="display:flex;align-items:center;gap:12px"><img src="${LOGO}" width="48" height="48"><div><b>${esc_(cfg_('Empresa') || APP)}</b><div style="color:#6E7679;font-size:13px">${esc_(cfg_('Firma') || '')}</div></div></div>
  <div style="background:#fff;border-radius:12px;margin-top:18px;padding:20px;border-top:6px solid ${color}"><div style="font-size:22px;font-weight:bold;color:${color}">${titulo}</div>
  ${p ? `<div style="margin-top:10px;color:#6E7679;font-size:13px">PROYECTO</div><div style="font-size:18px;font-weight:bold">${esc_(p.Proyecto)}</div>` : ''}
  <p style="font-size:15px;line-height:1.5">${texto}</p>${Rv && Rv.Archivos ? `<p style="color:#6E7679;font-size:12px">Archivos de la Rev. ${vig}: ${esc_(Rv.Archivos)}</p>` : ''}</div>
  <p style="color:#6E7679;font-size:12px;margin-top:14px">Consultado el ${Utilities.formatDate(new Date(), TZ_EC, 'dd/MM/yyyy HH:mm')} · ${esc_(cfg_('Contacto') || '')}</p></div></body></html>`;
  return HtmlService.createHtmlOutput(html).setTitle('Verificación de plano · CEV').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ── CHECKLIST DE ENTREGA Y PLANTILLA ───────────────────────────────────
function checkEntrega_() { return String(cfg_('Checklist entrega') || '').split(/\n+/).map(x => x.trim()).filter(Boolean); }
function plantilla_() { const v = String(cfg_('Plantilla dibujo') || '').trim(); if (!v) return null; const m = v.match(/[-\w]{25,}/); return { url: v, descarga: m ? 'https://drive.google.com/uc?export=download&id=' + m[0] : v, nombre: (v.split('|')[1] || 'Plantilla CEV').trim() }; }
function guardarPlantilla_(d) {
  const a = (d.archivos || [])[0]; if (!a || !a.id) throw new Error('Suba el archivo de la plantilla.');
  const f = DriveApp.getFileById(a.id); try { f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) { }
  asegurarConfig_(); const c = uno_(T.CFG, 'Clave', 'Plantilla dibujo'); editar_(T.CFG, c._fila, { Valor: f.getUrl() + ' | ' + a.nombre }); CFG_ = null;
  return { msg: 'Plantilla guardada. Las dibujantes la ven en cada encargo y en el correo.' };
}
function asegurarConfig_() { const cfg = filas_(T.CFG); let n = 0; CFG_DEF.forEach(c => { if (!cfg.some(o => o.Clave === c[0])) { agregar_(T.CFG, { Clave: c[0], Valor: c[1], Nota: c[2] }); n++; } }); if (n) CFG_ = null; }

// ── VISTA SEMANAL Y CONTROLES ──────────────────────────────────────────
function semana_() {
  const S = [], esp = [];
  proyectos_().forEach(p => {
    if (/^S/i.test(String(p.Entregado || ''))) return;
    const E = etapas_(p.ID), M = metas_(p, E), act = E.filter(e => e.estado !== 'APROBADO')[0]; if (!act) return;
    const enc = encargosAbiertos_().filter(e => e['Proyecto ID'] === p.ID && Number(e.Paso) === act.paso)[0];
    const quien = enc ? (usuario_(enc.Dibujante) || {}).nombre || '' : act.resp;
    const m = M[act.paso] || '', dm = diasMeta_(m), D = ymd_(p['Fecha entrega'] || '').slice(0, 10);
    if (m && dm <= 7) S.push({ proyectoId: p.ID, proyecto: p.Proyecto, contratante: cliente_(p.Cliente).Contratante, paso: act.paso, etapa: act.nombre, estado: act.estado, quien: quien, meta: m, dias: dm, entrega: D });
    const deJuan = /Juan|Claude/.test(act.resp) && ['PENDIENTE', 'POR REVISAR'].indexOf(act.estado) >= 0 && !enc;
    if (deJuan || act.estado === 'ENTREGADO') esp.push({ proyectoId: p.ID, proyecto: p.Proyecto, paso: act.paso, etapa: act.nombre, estado: act.estado, meta: m, dias: dm });
  });
  return { metas: S.sort((a, b) => a.dias - b.dias), esperando: esp.sort((a, b) => (a.dias == null ? 999 : a.dias) - (b.dias == null ? 999 : b.dias)) };
}
/** Problemas para el resumen diario: errores del portal, carpetas recuperadas, encargos sin archivos base. */
function chequeos_() {
  const P = [];
  const t0 = Date.now() - 864e5, tLog = v => v instanceof Date ? v.getTime() : Date.parse(String(v).replace(/^(\d{4}-\d{2}-\d{2}) (\d):/, '$1 0$2:').replace(' ', 'T') + ':00-05:00');
  const L = filas_(T.LOG).filter(l => tLog(l.Fecha) >= t0 && /^(error|compartir|carpeta|correo sin cuota)$/.test(String(l['Acción'])));
  const cuenta = {}; L.forEach(l => { const k = l['Acción'] + ' · ' + String(l.Detalle).slice(0, 140); cuenta[k] = (cuenta[k] || 0) + 1; });
  Object.keys(cuenta).slice(0, 12).forEach(k => P.push(k + (cuenta[k] > 1 ? ' (×' + cuenta[k] + ')' : '')));
  encargosAbiertos_().forEach(e => {
    const p = uno_(T.PRO, 'ID', e['Proyecto ID']); if (!p) return;
    if (!p['Carpeta ID']) { P.push(p.Proyecto + ': el proyecto no tiene carpeta en Drive.'); return; }
    try { const C = carpetasDe_(p['Carpeta ID']), tiene = n => { const c = C[n]; if (!c) return false; const it = c.getFiles(); while (it.hasNext()) if (!it.next().isTrashed()) return true; return false; };
      let adj = []; try { adj = JSON.parse(e.Adjuntos || '[]'); } catch (x) { }
      if (!tiene('01_Arquitectura') && !adj.length) P.push(p.Proyecto + ' · ' + etapaNombre_(e.Paso) + ' (' + ((usuario_(e.Dibujante) || {}).nombre || e.Dibujante) + '): la dibujante no tiene arquitectura ni archivos base.');
    } catch (x) { P.push(p.Proyecto + ': no se pudo abrir la carpeta (' + String(x).slice(0, 80) + ').'); }
  });
  return P;
}

// ── CORREO ─────────────────────────────────────────────────────────────
function caja_(cuerpo) {
  return `<div style="font-family:Arial,sans-serif;font-size:14px;color:#1D2B36;max-width:620px"><div style="border-bottom:2px solid #2B3036;padding-bottom:8px;margin-bottom:14px"><span style="display:inline-block;background:#2B3036;color:#fff;font-weight:900;padding:4px 8px;border-radius:5px;letter-spacing:-0.5px">CEV</span> <b style="color:#2B3036">${esc_(cfg_('Empresa') || APP)}</b></div>${prueba_() ? '<p style="background:#F1F2F3;padding:6px 10px"><b>[PRUEBA]</b> Este correo es una prueba.</p>' : ''}
  ${cuerpo}<p style="margin-top:22px;color:#6E7679;font-size:12px;border-top:1px solid #D5DADC;padding-top:8px">${esc_(cfg_('Firma') || '')} · ${APP}</p></div>`;
}
const fila_ = (k, v) => `<tr><td style="padding:4px 14px 4px 0;color:#6E7679;vertical-align:top">${k}</td><td style="padding:4px 0">${v}</td></tr>`;
function enviar_(o) {
  let to = o.to, subject = o.subject;
  if (prueba_()) { subject = '[PRUEBA → ' + to + '] ' + subject; to = admin_(); }
  if (MailApp.getRemainingDailyQuota() < 3) { log_('', 'correo sin cuota', to + ' · ' + subject); return false; }
  MailApp.sendEmail({ to: to, subject: subject, htmlBody: o.html, name: APP, attachments: o.attachments || [], replyTo: o.to === admin_() ? '' : admin_() });
  return true;
}

// ── ACTIVADORES ────────────────────────────────────────────────────────
/** Cada hora: recordatorio 3 días antes y aviso de atraso, a la hora local de cada dibujante. */
function tareasHorarias() {
  const hora = Number(cfg_('Hora recordatorios')) || 9;
  encargosAbiertos_().forEach(e => {
    const dib = usuario_(e.Dibujante); if (!dib) return;
    if (Number(Utilities.formatDate(new Date(), dib.tz, 'H')) !== hora) return;
    const f = ymd_(e['Fecha límite']); if (!f) return;
    const p = uno_(T.PRO, 'ID', e['Proyecto ID']) || {}, meta = e.Tipo === 'MODIFICACION' || !p.ID ? '' : (metas_(p)[Number(e.Paso)] || ''), obj = meta || f, dr = dias_(hoy_(), obj);
    const linea = meta ? `La meta de su etapa <b>${esc_(etapaNombre_(e.Paso))}</b> es el <b>${dmy_(meta)}</b> (el proyecto completo se entrega al cliente el ${dmy_(f)}).` : `El proyecto <b>${esc_(p.Proyecto)}</b> se entrega completo al cliente el <b>${dmy_(f)}</b>.`;
    if (dr === 2 && String(e['Recordatorio enviado']) !== obj) {
      enviar_({ to: dib.email, subject: `Recordatorio: ${p.Proyecto} – ${etapaNombre_(e.Paso)} vence en 2 días`,
        html: caja_(`<p>Hola ${esc_(dib.nombre)}:</p><p>${linea} Su entrega aún está pendiente en <b>${esc_(p.Proyecto)}</b>.</p><p><a href="${urlApp_()}">Abrir el portal</a></p>`) });
      editar_(T.ENC, e._fila, { 'Recordatorio enviado': "'" + obj });
    }
    if (dr < 0 && String(e['Atraso enviado']) !== obj) {
      enviar_({ to: dib.email, subject: `Atrasado: ${p.Proyecto} – ${etapaNombre_(e.Paso)}`,
        html: caja_(`<p>Hola ${esc_(dib.nombre)}:</p><p>${linea} La fecha ya pasó y su etapa aún no tiene entrega.</p><p>Por favor súbala o escríbale a Juan con la nueva fecha posible.</p><p><a href="${urlApp_()}">Abrir el portal</a></p>`) });
      editar_(T.ENC, e._fila, { 'Atraso enviado': "'" + obj });
      enviar_({ to: admin_(), subject: `Atraso: ${p.Proyecto} – ${etapaNombre_(e.Paso)} (${dib.nombre})`, html: caja_(`<p>Juan:</p><p>${esc_(dib.nombre)} no entregó <b>${esc_(etapaNombre_(e.Paso))}</b> de <b>${esc_(p.Proyecto)}</b>. Meta: ${dmy_(obj)}. Entrega al cliente: ${dmy_(f)}.</p><p><a href="${urlApp_()}">Abrir el portal</a></p>`) });
    }
  });
  try { limpiarSesiones_(); } catch (x) { }
}
/** Todos los días a la hora de P_Config (10:00): resumen solo para Juan, y solo si hay algo. */
function resumenDiario() {
  const D = inicioAdmin_(), sec = [];
  const lista = (t, L) => { if (L.length) sec.push(`<h3 style="color:#3D434A;margin:16px 0 6px">${t}</h3><ul style="margin:0;padding-left:18px">${L.join('')}</ul>`); };
  lista('Etapas atrasadas (meta interna)', D.semana.metas.filter(m => m.dias < 0).map(m => `<li>${esc_(m.proyecto)} · ${m.paso}. ${esc_(m.etapa)} · ${esc_(m.quien)} · meta ${dmy_(m.meta)} (${Math.abs(m.dias)} días de atraso)</li>`));
  lista('Metas de esta semana', D.semana.metas.filter(m => m.dias >= 0).map(m => `<li>${esc_(m.proyecto)} · ${m.paso}. ${esc_(m.etapa)} · ${esc_(m.quien)} · ${dmy_(m.meta)} (${m.dias === 0 ? 'hoy' : m.dias + ' días'})</li>`));
  lista('Esperando tu acción', D.semana.esperando.map(x => `<li>${esc_(x.proyecto)} · ${x.paso}. ${esc_(x.etapa)}${x.meta ? ' · meta ' + dmy_(x.meta) : ''}</li>`));
  let probl = []; try { probl = chequeos_(); } catch (x) { probl = ['No se pudo completar el control: ' + String(x).slice(0, 120)]; }
  lista('⚠ Problemas detectados', probl.map(t => `<li style="color:#A33A32">${esc_(t)}</li>`));
  const hoyMs = new Date(hoy_() + 'T00:00:00').getTime(), dd = f => Math.round((new Date(f + 'T00:00:00').getTime() - hoyMs) / 864e5);
  const conF = D.proyectos.filter(p => p.entrega && !p.entregado);
  lista('Entrega al cliente vencida', conF.filter(p => dd(p.entrega) < 0).map(p => `<li>${esc_(p.contratante)} · ${esc_(p.nombre)} · era el ${dmy_(p.entrega)} · va en ${p.paso}. ${esc_(p.etapa)}</li>`));
  lista('Entrega al cliente en 7 días o menos', conF.filter(p => dd(p.entrega) >= 0 && dd(p.entrega) <= 7).map(p => `<li>${esc_(p.contratante)} · ${esc_(p.nombre)} · ${dmy_(p.entrega)} (${dd(p.entrega)} días) · va en ${p.paso}. ${esc_(p.etapa)}</li>`));
  lista('Entregas por revisar', D.porRevisar.map(x => `<li>${esc_(x.proyecto)} · ${esc_(x.etapa)} · ${esc_(x.dibujanteNombre)} · ${x.laminas} lám.</li>`));
  lista('Listo para Claude', D.claude.map(x => `<li>${esc_(x.proyecto)} · ${x.paso}. ${esc_(x.etapa)}</li>`));
  lista('Por pagar a dibujantes', D.dibujantes.filter(x => x.porPagar > 0).map(x => `<li>${esc_(x.nombre)}: ${usd_(x.porPagar)}</li>`));
  lista('Por cobrar', D.proyectos.filter(p => p.porCobrar > 0).map(p => `<li>${esc_(p.contratante)} · ${esc_(p.nombre)}: ${usd_(p.porCobrar)}</li>`));
  if (D.licencia) sec.push(`<p style="color:#A33A32"><b>${esc_(D.licencia)}</b></p>`);
  if (D.cuota < 20) sec.push(`<p style="color:#A33A32">Quedan ${D.cuota} correos disponibles hoy.</p>`);
  if (!sec.length) return;
  MailApp.sendEmail({ to: admin_(), name: APP, subject: 'Resumen del día – ' + dmy_(hoy_()), htmlBody: caja_('<p>Juan, esto es lo pendiente hoy:</p>' + sec.join('') + `<p style="margin-top:16px"><a href="${urlApp_()}">Abrir el portal</a></p>`) });
}

// ── INSTALACIÓN ────────────────────────────────────────────────────────
/** Ejecútela una vez desde el editor. Se puede repetir sin duplicar datos. */
function instalar() {
  Object.keys(T).forEach(k => hoja_(T[k]));
  const cfg = filas_(T.CFG); CFG_DEF.forEach(c => { if (!cfg.some(o => o.Clave === c[0])) agregar_(T.CFG, { Clave: c[0], Valor: c[1], Nota: c[2] }); });
  CFG_ = null;
  const U = [[dueno_(), 'Juan Vanegas', 'JV', 'ADMIN', '', TZ_EC, 35],
    ['dbgutierrezv@gmail.com', 'Diana Gutiérrez', 'DG', 'DIBUJANTE', '0992287151', TZ_EC, 35],
    ['maryjos823@gmail.com', 'María José', 'MJ', 'DIBUJANTE', '+393429804459', 'Europe/Rome', 35]];
  U.forEach(u => { if (!uno_(T.USU, 'Correo', u[0])) agregar_(T.USU, { Correo: u[0], Nombre: u[1], Iniciales: u[2], Rol: u[3], WhatsApp: "'" + u[4], 'Zona horaria': u[5], 'Valor lámina': u[6], Activo: 'SI' }); });
  const SVC = '1I5IEi6e0aWS4gC0MPtOzXsPAOvw0TddF';
  if (!uno_(T.CLI, 'Clave', 'SVC')) agregar_(T.CLI, { Clave: 'SVC', Contratante: 'SVC Proyectos', Contacto: 'Arq. Freddy Vanegas', Correo: 'fvanegas@svc-proyectos.com', WhatsApp: "'0959961735", 'Carpeta ID': SVC, Activo: 'SI' });
  // Proyectos de SVC: carpetas existentes + valores del estado de cuenta del 06/11/2026
  const SEED = [[/casa\s*ib/i, 'Casa IB', 'Residencia Aires de Batán', 1400, 1400, 50, 'SI'], [/empacadora/i, 'Empacadora La Mercedes', '', 800, 800, 50, 'SI'],
    [/kaleta/i, 'Mi Kaleta', '', 350, 0, 50, 'SI'], [/veralta/i, 'Veralta Residences', '', 2261.25, 0, 50, 'NO']];
  const it = DriveApp.getFolderById(SVC).getFolders(), hechos = [];
  while (it.hasNext()) {
    const f = it.next(), n = f.getName(); if (/^_/.test(n)) continue;
    if (filas_(T.PRO).some(p => p['Carpeta ID'] === f.getId())) continue;
    const s0 = SEED.filter(x => x[0].test(n))[0] || [null, n, '', 0, 0, 50, 'NO'];
    const id = id_();
    agregar_(T.PRO, { ID: id, Cliente: 'SVC', Proyecto: s0[1], 'Descripción': s0[2], Servicio: 'Diseño estructural', 'Valor contrato': s0[3] || '', 'Anticipo %': s0[5], Entregado: s0[6],
      'Carpeta ID': f.getId(), Estado: 'ACTIVO', Creado: ahora_(), Notas: 'Importado (carpeta ' + n + ')' });
    ETAPAS.forEach(x => agregar_(T.ETA, { 'Proyecto ID': id, Paso: x[0], Etapa: x[1], Estado: s0[6] === 'SI' ? 'APROBADO' : 'PENDIENTE', Actualizado: ahora_(), Nota: s0[6] === 'SI' ? 'Entregado antes del portal' : '' }));
    if (s0[4] > 0) agregar_(T.MOV, { ID: id_(), Fecha: "'" + hoy_(), Tipo: 'COBRO', 'Proyecto ID': id, Cliente: 'SVC', Monto: s0[4], Detalle: 'Pagado antes del portal (estado de cuenta 06/11/2026)', Registrado: ahora_() });
    hechos.push(s0[1] + ': ' + (prepararCarpetas_(id).join(', ') || 'carpetas al día'));
  }
  ScriptApp.getProjectTriggers().forEach(t => { if (['tareasHorarias', 'resumenDiario'].indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('tareasHorarias').timeBased().everyHours(1).create();
  ScriptApp.newTrigger('resumenDiario').timeBased().everyDays(1).atHour(Number(cfg_('Hora resumen')) || 10).nearMinute(0).create();
  log_(dueno_(), 'instalar', hechos.join(' | '));
  Logger.log('Listo. Proyectos SVC: ' + (hechos.join(' | ') || 'ya estaban cargados') + '. Publique la aplicación web y pegue la URL en P_Config.');
}

function guardarFila_(t, clave, d) {
  if (!String(d[clave] || '').trim()) throw new Error('Falta ' + clave + '.');
  const o = uno_(t, clave, d[clave]), c = {}; t[1].forEach(h => { if (d[h] != null) c[h] = h === 'WhatsApp' && d[h] ? "'" + String(d[h]).replace(/^'/, '') : d[h]; });
  if (o) editar_(t, o._fila, c); else agregar_(t, c);
  CFG_ = null;
  return { msg: 'Guardado.' };
}

const PAGE = "<!DOCTYPE html><html lang=\"es\"><head><base target=\"_top\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<style>\n:root{--az:#3D434A;--az2:#2B3036;--tx:#22272C;--mu:#6B7279;--li:#D9DCDF;--bg:#F4F5F6;--ok:#2E7D4F;--okb:#E6F2EA;--na:#A65E2E;--nab:#F6EBE2;--ro:#A33A32;--rob:#F7E7E5;--azb:#ECEEF0}\n*{box-sizing:border-box}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:var(--tx);background:var(--bg);font-size:14px}\na{color:var(--az)}h1{font-size:20px;margin:0}h2{font-size:16px;margin:22px 0 10px}h3{font-size:14px;margin:16px 0 8px}\n.top{background:var(--az2);color:#fff;padding:12px 16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;position:sticky;top:0;z-index:5}\n.top b{font-size:16px}.logo{display:inline-flex;align-items:center;justify-content:center;min-width:46px;height:34px;padding:0 6px;border-radius:7px;background:#fff;color:#2B3036;font-weight:900;font-size:16px;letter-spacing:-1px}.top nav{display:flex;gap:4px;flex-wrap:wrap;margin-left:auto}.top nav a{color:#fff;text-decoration:none;padding:6px 10px;border-radius:6px;cursor:pointer}\n.top nav a.on,.top nav a:hover{background:rgba(255,255,255,.18)}\nmain{max-width:1080px;margin:0 auto;padding:16px}\n.card{background:#fff;border:1px solid var(--li);border-radius:10px;padding:14px 16px;margin-bottom:12px}\n.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:12px}\n.kpi{background:#fff;border:1px solid var(--li);border-radius:10px;padding:12px}.kpi div{color:var(--mu);font-size:12px}.kpi b{font-size:22px;display:block;margin-top:4px}\n.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px}\ntable{width:100%;border-collapse:collapse}th{text-align:left;font-size:12px;color:var(--mu);font-weight:600;border-bottom:1px solid var(--li);padding:6px}\ntd{border-bottom:1px solid #EEF0F2;padding:7px 6px;vertical-align:top}.n{text-align:right;white-space:nowrap}\n.b{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:bold;white-space:nowrap}\n.b-ok{background:var(--okb);color:var(--ok)}.b-na{background:var(--nab);color:var(--na)}.b-az{background:var(--azb);color:var(--az)}.b-ro{background:var(--rob);color:var(--ro)}.b-gr{background:#EEF0F2;color:var(--mu)}\nbutton,.btn{background:var(--az);color:#fff;border:0;border-radius:8px;padding:9px 14px;font-size:14px;font-weight:bold;cursor:pointer;text-decoration:none;display:inline-block}\nbutton.sec,.btn.sec{background:#fff;color:var(--az);border:1px solid var(--az)}button.ok{background:var(--ok)}button.ro{background:var(--ro)}button.chico{padding:5px 10px;font-size:12px}\nbutton:disabled{opacity:.5;cursor:default}.wa{background:#1FA855}\ninput,select,textarea{width:100%;padding:8px 10px;border:1px solid var(--li);border-radius:8px;font:inherit;background:#fff}textarea{min-height:70px}\nlabel{display:block;font-size:12px;color:var(--mu);margin:10px 0 4px}.fila{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}\n.mu{color:var(--mu);font-size:12px}.der{text-align:right}.acc{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}\n.tabs{display:flex;gap:4px;flex-wrap:wrap;border-bottom:2px solid var(--li);margin:12px 0}.tabs a{padding:8px 12px;cursor:pointer;text-decoration:none;color:var(--mu);font-weight:bold}\n.tabs a.on{color:var(--az);border-bottom:3px solid var(--az);margin-bottom:-2px}\n.barra{height:8px;background:#E6E9EC;border-radius:4px;overflow:hidden}.barra i{display:block;height:100%;background:var(--az)}\n.et{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid #EEF0F2}\n.num{width:30px;height:30px;border-radius:50%;background:#EEF0F2;display:flex;align-items:center;justify-content:center;font-weight:bold;color:var(--mu)}\n.num.ok{background:var(--ok);color:#fff}.num.cur{background:var(--az);color:#fff}\n#modal{position:fixed;inset:0;background:rgba(20,30,40,.45);display:none;align-items:flex-start;justify-content:center;z-index:20;overflow:auto;padding:24px 10px}\n#modal .box{background:#fff;border-radius:12px;max-width:760px;width:100%;padding:18px 20px;position:relative}#modal .x{position:absolute;right:12px;top:8px;background:none;color:var(--mu);font-size:22px}\n#toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#1D2B36;color:#fff;padding:10px 16px;border-radius:8px;display:none;z-index:40;max-width:90%}\n#busy{position:fixed;inset:0;background:rgba(255,255,255,.55);display:none;z-index:30;align-items:center;justify-content:center;font-weight:bold;color:var(--az)}\n.aviso{background:#F1F2F3;border:1px solid #D9DCDF;border-radius:8px;padding:8px 12px;margin-bottom:12px}\n.chk td{vertical-align:middle}.chk .r label{display:inline-flex;align-items:center;gap:4px;margin:0 8px 0 0;color:var(--tx);font-size:13px}.chk .r input{width:auto}\n.drop{border:2px dashed var(--li);border-radius:10px;padding:14px;text-align:center;color:var(--mu)}.prog{font-size:12px;color:var(--mu)}\n.login{max-width:380px;margin:60px auto}\nhtml,body{max-width:100%;overflow-x:hidden}\n.card{overflow-x:auto;-webkit-overflow-scrolling:touch}#modal .box{overflow-x:auto}\ntd button,td .btn{white-space:nowrap}\n.ecw{width:100%;overflow:hidden;border:1px solid var(--li);border-radius:8px;background:#fff}.ecw iframe{border:0;transform-origin:0 0;display:block}\n@media(max-width:640px){.et{grid-template-columns:30px 1fr}.et>div:last-child{grid-column:2}\n .top{padding:8px 10px;gap:8px;flex-wrap:nowrap}.top>b{display:none}.top nav{flex-wrap:nowrap;gap:2px}.top nav a{padding:6px 8px;font-size:13px}.top .b{display:none}\n main{padding:10px}.kpis{grid-template-columns:1fr 1fr;gap:8px}.kpi{padding:10px}.kpi b{font-size:18px}\n table{font-size:12px}th{font-size:11px;padding:5px 4px}td{padding:6px 4px}.card{padding:12px}\n .grid{grid-template-columns:1fr}h2{font-size:15px}#modal{padding:10px 6px}#modal .box{padding:14px 12px}\n .tabs{flex-wrap:nowrap;overflow-x:auto}.tabs a{white-space:nowrap;padding:8px 10px}}\n</style></head><body>\n<div id=\"app\"></div><div id=\"modal\"><div class=\"box\"><button class=\"x\" onclick=\"cerrar()\">\u00d7</button><div id=\"mbody\"></div></div></div><div id=\"toast\"></div><div id=\"busy\">Trabajando\u2026</div>\n<script>\n/* qrcode-generator \u00b7 (c) Kazuhiko Arase \u00b7 MIT License */\nvar qrcode = function() {\n  var qrcode = function(typeNumber, errorCorrectionLevel) {\n    var PAD0 = 0xEC;\n    var PAD1 = 0x11;\n    var _typeNumber = typeNumber;\n    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];\n    var _modules = null;\n    var _moduleCount = 0;\n    var _dataCache = null;\n    var _dataList = [];\n    var _this = {};\n    var makeImpl = function(test, maskPattern) {\n      _moduleCount = _typeNumber * 4 + 17;\n      _modules = function(moduleCount) {\n        var modules = new Array(moduleCount);\n        for (var row = 0; row < moduleCount; row += 1) {\n          modules[row] = new Array(moduleCount);\n          for (var col = 0; col < moduleCount; col += 1) {\n            modules[row][col] = null;\n          }\n        }\n        return modules;\n      }(_moduleCount);\n      setupPositionProbePattern(0, 0);\n      setupPositionProbePattern(_moduleCount - 7, 0);\n      setupPositionProbePattern(0, _moduleCount - 7);\n      setupPositionAdjustPattern();\n      setupTimingPattern();\n      setupTypeInfo(test, maskPattern);\n      if (_typeNumber >= 7) {\n        setupTypeNumber(test);\n      }\n      if (_dataCache == null) {\n        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);\n      }\n      mapData(_dataCache, maskPattern);\n    };\n    var setupPositionProbePattern = function(row, col) {\n      for (var r = -1; r <= 7; r += 1) {\n        if (row + r <= -1 || _moduleCount <= row + r) continue;\n        for (var c = -1; c <= 7; c += 1) {\n          if (col + c <= -1 || _moduleCount <= col + c) continue;\n          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )\n              || (0 <= c && c <= 6 && (r == 0 || r == 6) )\n              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {\n            _modules[row + r][col + c] = true;\n          } else {\n            _modules[row + r][col + c] = false;\n          }\n        }\n      }\n    };\n    var getBestMaskPattern = function() {\n      var minLostPoint = 0;\n      var pattern = 0;\n      for (var i = 0; i < 8; i += 1) {\n        makeImpl(true, i);\n        var lostPoint = QRUtil.getLostPoint(_this);\n        if (i == 0 || minLostPoint > lostPoint) {\n          minLostPoint = lostPoint;\n          pattern = i;\n        }\n      }\n      return pattern;\n    };\n    var setupTimingPattern = function() {\n      for (var r = 8; r < _moduleCount - 8; r += 1) {\n        if (_modules[r][6] != null) {\n          continue;\n        }\n        _modules[r][6] = (r % 2 == 0);\n      }\n      for (var c = 8; c < _moduleCount - 8; c += 1) {\n        if (_modules[6][c] != null) {\n          continue;\n        }\n        _modules[6][c] = (c % 2 == 0);\n      }\n    };\n    var setupPositionAdjustPattern = function() {\n      var pos = QRUtil.getPatternPosition(_typeNumber);\n      for (var i = 0; i < pos.length; i += 1) {\n        for (var j = 0; j < pos.length; j += 1) {\n          var row = pos[i];\n          var col = pos[j];\n          if (_modules[row][col] != null) {\n            continue;\n          }\n          for (var r = -2; r <= 2; r += 1) {\n            for (var c = -2; c <= 2; c += 1) {\n              if (r == -2 || r == 2 || c == -2 || c == 2\n                  || (r == 0 && c == 0) ) {\n                _modules[row + r][col + c] = true;\n              } else {\n                _modules[row + r][col + c] = false;\n              }\n            }\n          }\n        }\n      }\n    };\n    var setupTypeNumber = function(test) {\n      var bits = QRUtil.getBCHTypeNumber(_typeNumber);\n      for (var i = 0; i < 18; i += 1) {\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;\n      }\n      for (var i = 0; i < 18; i += 1) {\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;\n      }\n    };\n    var setupTypeInfo = function(test, maskPattern) {\n      var data = (_errorCorrectionLevel << 3) | maskPattern;\n      var bits = QRUtil.getBCHTypeInfo(data);\n      for (var i = 0; i < 15; i += 1) {\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n        if (i < 6) {\n          _modules[i][8] = mod;\n        } else if (i < 8) {\n          _modules[i + 1][8] = mod;\n        } else {\n          _modules[_moduleCount - 15 + i][8] = mod;\n        }\n      }\n      for (var i = 0; i < 15; i += 1) {\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n        if (i < 8) {\n          _modules[8][_moduleCount - i - 1] = mod;\n        } else if (i < 9) {\n          _modules[8][15 - i - 1 + 1] = mod;\n        } else {\n          _modules[8][15 - i - 1] = mod;\n        }\n      }\n      _modules[_moduleCount - 8][8] = (!test);\n    };\n    var mapData = function(data, maskPattern) {\n      var inc = -1;\n      var row = _moduleCount - 1;\n      var bitIndex = 7;\n      var byteIndex = 0;\n      var maskFunc = QRUtil.getMaskFunction(maskPattern);\n      for (var col = _moduleCount - 1; col > 0; col -= 2) {\n        if (col == 6) col -= 1;\n        while (true) {\n          for (var c = 0; c < 2; c += 1) {\n            if (_modules[row][col - c] == null) {\n              var dark = false;\n              if (byteIndex < data.length) {\n                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);\n              }\n              var mask = maskFunc(row, col - c);\n              if (mask) {\n                dark = !dark;\n              }\n              _modules[row][col - c] = dark;\n              bitIndex -= 1;\n              if (bitIndex == -1) {\n                byteIndex += 1;\n                bitIndex = 7;\n              }\n            }\n          }\n          row += inc;\n          if (row < 0 || _moduleCount <= row) {\n            row -= inc;\n            inc = -inc;\n            break;\n          }\n        }\n      }\n    };\n    var createBytes = function(buffer, rsBlocks) {\n      var offset = 0;\n      var maxDcCount = 0;\n      var maxEcCount = 0;\n      var dcdata = new Array(rsBlocks.length);\n      var ecdata = new Array(rsBlocks.length);\n      for (var r = 0; r < rsBlocks.length; r += 1) {\n        var dcCount = rsBlocks[r].dataCount;\n        var ecCount = rsBlocks[r].totalCount - dcCount;\n        maxDcCount = Math.max(maxDcCount, dcCount);\n        maxEcCount = Math.max(maxEcCount, ecCount);\n        dcdata[r] = new Array(dcCount);\n        for (var i = 0; i < dcdata[r].length; i += 1) {\n          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];\n        }\n        offset += dcCount;\n        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);\n        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);\n        var modPoly = rawPoly.mod(rsPoly);\n        ecdata[r] = new Array(rsPoly.getLength() - 1);\n        for (var i = 0; i < ecdata[r].length; i += 1) {\n          var modIndex = i + modPoly.getLength() - ecdata[r].length;\n          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;\n        }\n      }\n      var totalCodeCount = 0;\n      for (var i = 0; i < rsBlocks.length; i += 1) {\n        totalCodeCount += rsBlocks[i].totalCount;\n      }\n      var data = new Array(totalCodeCount);\n      var index = 0;\n      for (var i = 0; i < maxDcCount; i += 1) {\n        for (var r = 0; r < rsBlocks.length; r += 1) {\n          if (i < dcdata[r].length) {\n            data[index] = dcdata[r][i];\n            index += 1;\n          }\n        }\n      }\n      for (var i = 0; i < maxEcCount; i += 1) {\n        for (var r = 0; r < rsBlocks.length; r += 1) {\n          if (i < ecdata[r].length) {\n            data[index] = ecdata[r][i];\n            index += 1;\n          }\n        }\n      }\n      return data;\n    };\n    var createData = function(typeNumber, errorCorrectionLevel, dataList) {\n      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);\n      var buffer = qrBitBuffer();\n      for (var i = 0; i < dataList.length; i += 1) {\n        var data = dataList[i];\n        buffer.put(data.getMode(), 4);\n        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );\n        data.write(buffer);\n      }\n      var totalDataCount = 0;\n      for (var i = 0; i < rsBlocks.length; i += 1) {\n        totalDataCount += rsBlocks[i].dataCount;\n      }\n      if (buffer.getLengthInBits() > totalDataCount * 8) {\n        throw 'code length overflow. ('\n          + buffer.getLengthInBits()\n          + '>'\n          + totalDataCount * 8\n          + ')';\n      }\n      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {\n        buffer.put(0, 4);\n      }\n      while (buffer.getLengthInBits() % 8 != 0) {\n        buffer.putBit(false);\n      }\n      while (true) {\n        if (buffer.getLengthInBits() >= totalDataCount * 8) {\n          break;\n        }\n        buffer.put(PAD0, 8);\n        if (buffer.getLengthInBits() >= totalDataCount * 8) {\n          break;\n        }\n        buffer.put(PAD1, 8);\n      }\n      return createBytes(buffer, rsBlocks);\n    };\n    _this.addData = function(data, mode) {\n      mode = mode || 'Byte';\n      var newData = null;\n      switch(mode) {\n      case 'Numeric' :\n        newData = qrNumber(data);\n        break;\n      case 'Alphanumeric' :\n        newData = qrAlphaNum(data);\n        break;\n      case 'Byte' :\n        newData = qr8BitByte(data);\n        break;\n      case 'Kanji' :\n        newData = qrKanji(data);\n        break;\n      default :\n        throw 'mode:' + mode;\n      }\n      _dataList.push(newData);\n      _dataCache = null;\n    };\n    _this.isDark = function(row, col) {\n      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {\n        throw row + ',' + col;\n      }\n      return _modules[row][col];\n    };\n    _this.getModuleCount = function() {\n      return _moduleCount;\n    };\n    _this.make = function() {\n      if (_typeNumber < 1) {\n        var typeNumber = 1;\n        for (; typeNumber < 40; typeNumber++) {\n          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);\n          var buffer = qrBitBuffer();\n          for (var i = 0; i < _dataList.length; i++) {\n            var data = _dataList[i];\n            buffer.put(data.getMode(), 4);\n            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );\n            data.write(buffer);\n          }\n          var totalDataCount = 0;\n          for (var i = 0; i < rsBlocks.length; i++) {\n            totalDataCount += rsBlocks[i].dataCount;\n          }\n          if (buffer.getLengthInBits() <= totalDataCount * 8) {\n            break;\n          }\n        }\n        _typeNumber = typeNumber;\n      }\n      makeImpl(false, getBestMaskPattern() );\n    };\n    _this.createTableTag = function(cellSize, margin) {\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n      var qrHtml = '';\n      qrHtml += '<table style=\"';\n      qrHtml += ' border-width: 0px; border-style: none;';\n      qrHtml += ' border-collapse: collapse;';\n      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';\n      qrHtml += '\">';\n      qrHtml += '<tbody>';\n      for (var r = 0; r < _this.getModuleCount(); r += 1) {\n        qrHtml += '<tr>';\n        for (var c = 0; c < _this.getModuleCount(); c += 1) {\n          qrHtml += '<td style=\"';\n          qrHtml += ' border-width: 0px; border-style: none;';\n          qrHtml += ' border-collapse: collapse;';\n          qrHtml += ' padding: 0px; margin: 0px;';\n          qrHtml += ' width: ' + cellSize + 'px;';\n          qrHtml += ' height: ' + cellSize + 'px;';\n          qrHtml += ' background-color: ';\n          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';\n          qrHtml += ';';\n          qrHtml += '\"/>';\n        }\n        qrHtml += '</tr>';\n      }\n      qrHtml += '</tbody>';\n      qrHtml += '</table>';\n      return qrHtml;\n    };\n    _this.createSvgTag = function(cellSize, margin, alt, title) {\n      var opts = {};\n      if (typeof arguments[0] == 'object') {\n        opts = arguments[0];\n        cellSize = opts.cellSize;\n        margin = opts.margin;\n        alt = opts.alt;\n        title = opts.title;\n      }\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n      alt = (typeof alt === 'string') ? {text: alt} : alt || {};\n      alt.text = alt.text || null;\n      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;\n      title = (typeof title === 'string') ? {text: title} : title || {};\n      title.text = title.text || null;\n      title.id = (title.text) ? title.id || 'qrcode-title' : null;\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var c, mc, r, mr, qrSvg='', rect;\n      rect = 'l' + cellSize + ',0 0,' + cellSize +\n        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';\n      qrSvg += '<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"';\n      qrSvg += !opts.scalable ? ' width=\"' + size + 'px\" height=\"' + size + 'px\"' : '';\n      qrSvg += ' viewBox=\"0 0 ' + size + ' ' + size + '\" ';\n      qrSvg += ' preserveAspectRatio=\"xMinYMin meet\"';\n      qrSvg += (title.text || alt.text) ? ' role=\"img\" aria-labelledby=\"' +\n          escapeXml([title.id, alt.id].join(' ').trim() ) + '\"' : '';\n      qrSvg += '>';\n      qrSvg += (title.text) ? '<title id=\"' + escapeXml(title.id) + '\">' +\n          escapeXml(title.text) + '</title>' : '';\n      qrSvg += (alt.text) ? '<description id=\"' + escapeXml(alt.id) + '\">' +\n          escapeXml(alt.text) + '</description>' : '';\n      qrSvg += '<rect width=\"100%\" height=\"100%\" fill=\"white\" cx=\"0\" cy=\"0\"/>';\n      qrSvg += '<path d=\"';\n      for (r = 0; r < _this.getModuleCount(); r += 1) {\n        mr = r * cellSize + margin;\n        for (c = 0; c < _this.getModuleCount(); c += 1) {\n          if (_this.isDark(r, c) ) {\n            mc = c*cellSize+margin;\n            qrSvg += 'M' + mc + ',' + mr + rect;\n          }\n        }\n      }\n      qrSvg += '\" stroke=\"transparent\" fill=\"black\"/>';\n      qrSvg += '</svg>';\n      return qrSvg;\n    };\n    _this.createDataURL = function(cellSize, margin) {\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n      return createDataURL(size, size, function(x, y) {\n        if (min <= x && x < max && min <= y && y < max) {\n          var c = Math.floor( (x - min) / cellSize);\n          var r = Math.floor( (y - min) / cellSize);\n          return _this.isDark(r, c)? 0 : 1;\n        } else {\n          return 1;\n        }\n      } );\n    };\n    _this.createImgTag = function(cellSize, margin, alt) {\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var img = '';\n      img += '<img';\n      img += '\\u0020src=\"';\n      img += _this.createDataURL(cellSize, margin);\n      img += '\"';\n      img += '\\u0020width=\"';\n      img += size;\n      img += '\"';\n      img += '\\u0020height=\"';\n      img += size;\n      img += '\"';\n      if (alt) {\n        img += '\\u0020alt=\"';\n        img += escapeXml(alt);\n        img += '\"';\n      }\n      img += '/>';\n      return img;\n    };\n    var escapeXml = function(s) {\n      var escaped = '';\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charAt(i);\n        switch(c) {\n        case '<': escaped += '&lt;'; break;\n        case '>': escaped += '&gt;'; break;\n        case '&': escaped += '&amp;'; break;\n        case '\"': escaped += '&quot;'; break;\n        default : escaped += c; break;\n        }\n      }\n      return escaped;\n    };\n    var _createHalfASCII = function(margin) {\n      var cellSize = 1;\n      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n      var y, x, r1, r2, p;\n      var blocks = {\n        '\u2588\u2588': '\u2588',\n        '\u2588 ': '\u2580',\n        ' \u2588': '\u2584',\n        '  ': ' '\n      };\n      var blocksLastLineNoMargin = {\n        '\u2588\u2588': '\u2580',\n        '\u2588 ': '\u2580',\n        ' \u2588': ' ',\n        '  ': ' '\n      };\n      var ascii = '';\n      for (y = 0; y < size; y += 2) {\n        r1 = Math.floor((y - min) / cellSize);\n        r2 = Math.floor((y + 1 - min) / cellSize);\n        for (x = 0; x < size; x += 1) {\n          p = '\u2588';\n          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {\n            p = ' ';\n          }\n          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {\n            p += ' ';\n          }\n          else {\n            p += '\u2588';\n          }\n          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];\n        }\n        ascii += '\\n';\n      }\n      if (size % 2 && margin > 0) {\n        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('\u2580');\n      }\n      return ascii.substring(0, ascii.length-1);\n    };\n    _this.createASCII = function(cellSize, margin) {\n      cellSize = cellSize || 1;\n      if (cellSize < 2) {\n        return _createHalfASCII(margin);\n      }\n      cellSize -= 1;\n      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n      var y, x, r, p;\n      var white = Array(cellSize+1).join('\u2588\u2588');\n      var black = Array(cellSize+1).join('  ');\n      var ascii = '';\n      var line = '';\n      for (y = 0; y < size; y += 1) {\n        r = Math.floor( (y - min) / cellSize);\n        line = '';\n        for (x = 0; x < size; x += 1) {\n          p = 1;\n          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {\n            p = 0;\n          }\n          line += p ? white : black;\n        }\n        for (r = 0; r < cellSize; r += 1) {\n          ascii += line + '\\n';\n        }\n      }\n      return ascii.substring(0, ascii.length-1);\n    };\n    _this.renderTo2dContext = function(context, cellSize) {\n      cellSize = cellSize || 2;\n      var length = _this.getModuleCount();\n      for (var row = 0; row < length; row++) {\n        for (var col = 0; col < length; col++) {\n          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';\n          context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);\n        }\n      }\n    }\n    return _this;\n  };\n  qrcode.stringToBytesFuncs = {\n    'default' : function(s) {\n      var bytes = [];\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charCodeAt(i);\n        bytes.push(c & 0xff);\n      }\n      return bytes;\n    }\n  };\n  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];\n  qrcode.createStringToBytes = function(unicodeData, numChars) {\n    var unicodeMap = function() {\n      var bin = base64DecodeInputStream(unicodeData);\n      var read = function() {\n        var b = bin.read();\n        if (b == -1) throw 'eof';\n        return b;\n      };\n      var count = 0;\n      var unicodeMap = {};\n      while (true) {\n        var b0 = bin.read();\n        if (b0 == -1) break;\n        var b1 = read();\n        var b2 = read();\n        var b3 = read();\n        var k = String.fromCharCode( (b0 << 8) | b1);\n        var v = (b2 << 8) | b3;\n        unicodeMap[k] = v;\n        count += 1;\n      }\n      if (count != numChars) {\n        throw count + ' != ' + numChars;\n      }\n      return unicodeMap;\n    }();\n    var unknownChar = '?'.charCodeAt(0);\n    return function(s) {\n      var bytes = [];\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charCodeAt(i);\n        if (c < 128) {\n          bytes.push(c);\n        } else {\n          var b = unicodeMap[s.charAt(i)];\n          if (typeof b == 'number') {\n            if ( (b & 0xff) == b) {\n              bytes.push(b);\n            } else {\n              bytes.push(b >>> 8);\n              bytes.push(b & 0xff);\n            }\n          } else {\n            bytes.push(unknownChar);\n          }\n        }\n      }\n      return bytes;\n    };\n  };\n  var QRMode = {\n    MODE_NUMBER :    1 << 0,\n    MODE_ALPHA_NUM : 1 << 1,\n    MODE_8BIT_BYTE : 1 << 2,\n    MODE_KANJI :     1 << 3\n  };\n  var QRErrorCorrectionLevel = {\n    L : 1,\n    M : 0,\n    Q : 3,\n    H : 2\n  };\n  var QRMaskPattern = {\n    PATTERN000 : 0,\n    PATTERN001 : 1,\n    PATTERN010 : 2,\n    PATTERN011 : 3,\n    PATTERN100 : 4,\n    PATTERN101 : 5,\n    PATTERN110 : 6,\n    PATTERN111 : 7\n  };\n  var QRUtil = function() {\n    var PATTERN_POSITION_TABLE = [\n      [],\n      [6, 18],\n      [6, 22],\n      [6, 26],\n      [6, 30],\n      [6, 34],\n      [6, 22, 38],\n      [6, 24, 42],\n      [6, 26, 46],\n      [6, 28, 50],\n      [6, 30, 54],\n      [6, 32, 58],\n      [6, 34, 62],\n      [6, 26, 46, 66],\n      [6, 26, 48, 70],\n      [6, 26, 50, 74],\n      [6, 30, 54, 78],\n      [6, 30, 56, 82],\n      [6, 30, 58, 86],\n      [6, 34, 62, 90],\n      [6, 28, 50, 72, 94],\n      [6, 26, 50, 74, 98],\n      [6, 30, 54, 78, 102],\n      [6, 28, 54, 80, 106],\n      [6, 32, 58, 84, 110],\n      [6, 30, 58, 86, 114],\n      [6, 34, 62, 90, 118],\n      [6, 26, 50, 74, 98, 122],\n      [6, 30, 54, 78, 102, 126],\n      [6, 26, 52, 78, 104, 130],\n      [6, 30, 56, 82, 108, 134],\n      [6, 34, 60, 86, 112, 138],\n      [6, 30, 58, 86, 114, 142],\n      [6, 34, 62, 90, 118, 146],\n      [6, 30, 54, 78, 102, 126, 150],\n      [6, 24, 50, 76, 102, 128, 154],\n      [6, 28, 54, 80, 106, 132, 158],\n      [6, 32, 58, 84, 110, 136, 162],\n      [6, 26, 54, 82, 110, 138, 166],\n      [6, 30, 58, 86, 114, 142, 170]\n    ];\n    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);\n    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);\n    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);\n    var _this = {};\n    var getBCHDigit = function(data) {\n      var digit = 0;\n      while (data != 0) {\n        digit += 1;\n        data >>>= 1;\n      }\n      return digit;\n    };\n    _this.getBCHTypeInfo = function(data) {\n      var d = data << 10;\n      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {\n        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );\n      }\n      return ( (data << 10) | d) ^ G15_MASK;\n    };\n    _this.getBCHTypeNumber = function(data) {\n      var d = data << 12;\n      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {\n        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );\n      }\n      return (data << 12) | d;\n    };\n    _this.getPatternPosition = function(typeNumber) {\n      return PATTERN_POSITION_TABLE[typeNumber - 1];\n    };\n    _this.getMaskFunction = function(maskPattern) {\n      switch (maskPattern) {\n      case QRMaskPattern.PATTERN000 :\n        return function(i, j) { return (i + j) % 2 == 0; };\n      case QRMaskPattern.PATTERN001 :\n        return function(i, j) { return i % 2 == 0; };\n      case QRMaskPattern.PATTERN010 :\n        return function(i, j) { return j % 3 == 0; };\n      case QRMaskPattern.PATTERN011 :\n        return function(i, j) { return (i + j) % 3 == 0; };\n      case QRMaskPattern.PATTERN100 :\n        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };\n      case QRMaskPattern.PATTERN101 :\n        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };\n      case QRMaskPattern.PATTERN110 :\n        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };\n      case QRMaskPattern.PATTERN111 :\n        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };\n      default :\n        throw 'bad maskPattern:' + maskPattern;\n      }\n    };\n    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {\n      var a = qrPolynomial([1], 0);\n      for (var i = 0; i < errorCorrectLength; i += 1) {\n        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );\n      }\n      return a;\n    };\n    _this.getLengthInBits = function(mode, type) {\n      if (1 <= type && type < 10) {\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 10;\n        case QRMode.MODE_ALPHA_NUM : return 9;\n        case QRMode.MODE_8BIT_BYTE : return 8;\n        case QRMode.MODE_KANJI     : return 8;\n        default :\n          throw 'mode:' + mode;\n        }\n      } else if (type < 27) {\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 12;\n        case QRMode.MODE_ALPHA_NUM : return 11;\n        case QRMode.MODE_8BIT_BYTE : return 16;\n        case QRMode.MODE_KANJI     : return 10;\n        default :\n          throw 'mode:' + mode;\n        }\n      } else if (type < 41) {\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 14;\n        case QRMode.MODE_ALPHA_NUM : return 13;\n        case QRMode.MODE_8BIT_BYTE : return 16;\n        case QRMode.MODE_KANJI     : return 12;\n        default :\n          throw 'mode:' + mode;\n        }\n      } else {\n        throw 'type:' + type;\n      }\n    };\n    _this.getLostPoint = function(qrcode) {\n      var moduleCount = qrcode.getModuleCount();\n      var lostPoint = 0;\n      for (var row = 0; row < moduleCount; row += 1) {\n        for (var col = 0; col < moduleCount; col += 1) {\n          var sameCount = 0;\n          var dark = qrcode.isDark(row, col);\n          for (var r = -1; r <= 1; r += 1) {\n            if (row + r < 0 || moduleCount <= row + r) {\n              continue;\n            }\n            for (var c = -1; c <= 1; c += 1) {\n              if (col + c < 0 || moduleCount <= col + c) {\n                continue;\n              }\n              if (r == 0 && c == 0) {\n                continue;\n              }\n              if (dark == qrcode.isDark(row + r, col + c) ) {\n                sameCount += 1;\n              }\n            }\n          }\n          if (sameCount > 5) {\n            lostPoint += (3 + sameCount - 5);\n          }\n        }\n      };\n      for (var row = 0; row < moduleCount - 1; row += 1) {\n        for (var col = 0; col < moduleCount - 1; col += 1) {\n          var count = 0;\n          if (qrcode.isDark(row, col) ) count += 1;\n          if (qrcode.isDark(row + 1, col) ) count += 1;\n          if (qrcode.isDark(row, col + 1) ) count += 1;\n          if (qrcode.isDark(row + 1, col + 1) ) count += 1;\n          if (count == 0 || count == 4) {\n            lostPoint += 3;\n          }\n        }\n      }\n      for (var row = 0; row < moduleCount; row += 1) {\n        for (var col = 0; col < moduleCount - 6; col += 1) {\n          if (qrcode.isDark(row, col)\n              && !qrcode.isDark(row, col + 1)\n              &&  qrcode.isDark(row, col + 2)\n              &&  qrcode.isDark(row, col + 3)\n              &&  qrcode.isDark(row, col + 4)\n              && !qrcode.isDark(row, col + 5)\n              &&  qrcode.isDark(row, col + 6) ) {\n            lostPoint += 40;\n          }\n        }\n      }\n      for (var col = 0; col < moduleCount; col += 1) {\n        for (var row = 0; row < moduleCount - 6; row += 1) {\n          if (qrcode.isDark(row, col)\n              && !qrcode.isDark(row + 1, col)\n              &&  qrcode.isDark(row + 2, col)\n              &&  qrcode.isDark(row + 3, col)\n              &&  qrcode.isDark(row + 4, col)\n              && !qrcode.isDark(row + 5, col)\n              &&  qrcode.isDark(row + 6, col) ) {\n            lostPoint += 40;\n          }\n        }\n      }\n      var darkCount = 0;\n      for (var col = 0; col < moduleCount; col += 1) {\n        for (var row = 0; row < moduleCount; row += 1) {\n          if (qrcode.isDark(row, col) ) {\n            darkCount += 1;\n          }\n        }\n      }\n      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;\n      lostPoint += ratio * 10;\n      return lostPoint;\n    };\n    return _this;\n  }();\n  var QRMath = function() {\n    var EXP_TABLE = new Array(256);\n    var LOG_TABLE = new Array(256);\n    for (var i = 0; i < 8; i += 1) {\n      EXP_TABLE[i] = 1 << i;\n    }\n    for (var i = 8; i < 256; i += 1) {\n      EXP_TABLE[i] = EXP_TABLE[i - 4]\n        ^ EXP_TABLE[i - 5]\n        ^ EXP_TABLE[i - 6]\n        ^ EXP_TABLE[i - 8];\n    }\n    for (var i = 0; i < 255; i += 1) {\n      LOG_TABLE[EXP_TABLE[i] ] = i;\n    }\n    var _this = {};\n    _this.glog = function(n) {\n      if (n < 1) {\n        throw 'glog(' + n + ')';\n      }\n      return LOG_TABLE[n];\n    };\n    _this.gexp = function(n) {\n      while (n < 0) {\n        n += 255;\n      }\n      while (n >= 256) {\n        n -= 255;\n      }\n      return EXP_TABLE[n];\n    };\n    return _this;\n  }();\n  function qrPolynomial(num, shift) {\n    if (typeof num.length == 'undefined') {\n      throw num.length + '/' + shift;\n    }\n    var _num = function() {\n      var offset = 0;\n      while (offset < num.length && num[offset] == 0) {\n        offset += 1;\n      }\n      var _num = new Array(num.length - offset + shift);\n      for (var i = 0; i < num.length - offset; i += 1) {\n        _num[i] = num[i + offset];\n      }\n      return _num;\n    }();\n    var _this = {};\n    _this.getAt = function(index) {\n      return _num[index];\n    };\n    _this.getLength = function() {\n      return _num.length;\n    };\n    _this.multiply = function(e) {\n      var num = new Array(_this.getLength() + e.getLength() - 1);\n      for (var i = 0; i < _this.getLength(); i += 1) {\n        for (var j = 0; j < e.getLength(); j += 1) {\n          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );\n        }\n      }\n      return qrPolynomial(num, 0);\n    };\n    _this.mod = function(e) {\n      if (_this.getLength() - e.getLength() < 0) {\n        return _this;\n      }\n      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );\n      var num = new Array(_this.getLength() );\n      for (var i = 0; i < _this.getLength(); i += 1) {\n        num[i] = _this.getAt(i);\n      }\n      for (var i = 0; i < e.getLength(); i += 1) {\n        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);\n      }\n      return qrPolynomial(num, 0).mod(e);\n    };\n    return _this;\n  };\n  var QRRSBlock = function() {\n    var RS_BLOCK_TABLE = [\n      [1, 26, 19],\n      [1, 26, 16],\n      [1, 26, 13],\n      [1, 26, 9],\n      [1, 44, 34],\n      [1, 44, 28],\n      [1, 44, 22],\n      [1, 44, 16],\n      [1, 70, 55],\n      [1, 70, 44],\n      [2, 35, 17],\n      [2, 35, 13],\n      [1, 100, 80],\n      [2, 50, 32],\n      [2, 50, 24],\n      [4, 25, 9],\n      [1, 134, 108],\n      [2, 67, 43],\n      [2, 33, 15, 2, 34, 16],\n      [2, 33, 11, 2, 34, 12],\n      [2, 86, 68],\n      [4, 43, 27],\n      [4, 43, 19],\n      [4, 43, 15],\n      [2, 98, 78],\n      [4, 49, 31],\n      [2, 32, 14, 4, 33, 15],\n      [4, 39, 13, 1, 40, 14],\n      [2, 121, 97],\n      [2, 60, 38, 2, 61, 39],\n      [4, 40, 18, 2, 41, 19],\n      [4, 40, 14, 2, 41, 15],\n      [2, 146, 116],\n      [3, 58, 36, 2, 59, 37],\n      [4, 36, 16, 4, 37, 17],\n      [4, 36, 12, 4, 37, 13],\n      [2, 86, 68, 2, 87, 69],\n      [4, 69, 43, 1, 70, 44],\n      [6, 43, 19, 2, 44, 20],\n      [6, 43, 15, 2, 44, 16],\n      [4, 101, 81],\n      [1, 80, 50, 4, 81, 51],\n      [4, 50, 22, 4, 51, 23],\n      [3, 36, 12, 8, 37, 13],\n      [2, 116, 92, 2, 117, 93],\n      [6, 58, 36, 2, 59, 37],\n      [4, 46, 20, 6, 47, 21],\n      [7, 42, 14, 4, 43, 15],\n      [4, 133, 107],\n      [8, 59, 37, 1, 60, 38],\n      [8, 44, 20, 4, 45, 21],\n      [12, 33, 11, 4, 34, 12],\n      [3, 145, 115, 1, 146, 116],\n      [4, 64, 40, 5, 65, 41],\n      [11, 36, 16, 5, 37, 17],\n      [11, 36, 12, 5, 37, 13],\n      [5, 109, 87, 1, 110, 88],\n      [5, 65, 41, 5, 66, 42],\n      [5, 54, 24, 7, 55, 25],\n      [11, 36, 12, 7, 37, 13],\n      [5, 122, 98, 1, 123, 99],\n      [7, 73, 45, 3, 74, 46],\n      [15, 43, 19, 2, 44, 20],\n      [3, 45, 15, 13, 46, 16],\n      [1, 135, 107, 5, 136, 108],\n      [10, 74, 46, 1, 75, 47],\n      [1, 50, 22, 15, 51, 23],\n      [2, 42, 14, 17, 43, 15],\n      [5, 150, 120, 1, 151, 121],\n      [9, 69, 43, 4, 70, 44],\n      [17, 50, 22, 1, 51, 23],\n      [2, 42, 14, 19, 43, 15],\n      [3, 141, 113, 4, 142, 114],\n      [3, 70, 44, 11, 71, 45],\n      [17, 47, 21, 4, 48, 22],\n      [9, 39, 13, 16, 40, 14],\n      [3, 135, 107, 5, 136, 108],\n      [3, 67, 41, 13, 68, 42],\n      [15, 54, 24, 5, 55, 25],\n      [15, 43, 15, 10, 44, 16],\n      [4, 144, 116, 4, 145, 117],\n      [17, 68, 42],\n      [17, 50, 22, 6, 51, 23],\n      [19, 46, 16, 6, 47, 17],\n      [2, 139, 111, 7, 140, 112],\n      [17, 74, 46],\n      [7, 54, 24, 16, 55, 25],\n      [34, 37, 13],\n      [4, 151, 121, 5, 152, 122],\n      [4, 75, 47, 14, 76, 48],\n      [11, 54, 24, 14, 55, 25],\n      [16, 45, 15, 14, 46, 16],\n      [6, 147, 117, 4, 148, 118],\n      [6, 73, 45, 14, 74, 46],\n      [11, 54, 24, 16, 55, 25],\n      [30, 46, 16, 2, 47, 17],\n      [8, 132, 106, 4, 133, 107],\n      [8, 75, 47, 13, 76, 48],\n      [7, 54, 24, 22, 55, 25],\n      [22, 45, 15, 13, 46, 16],\n      [10, 142, 114, 2, 143, 115],\n      [19, 74, 46, 4, 75, 47],\n      [28, 50, 22, 6, 51, 23],\n      [33, 46, 16, 4, 47, 17],\n      [8, 152, 122, 4, 153, 123],\n      [22, 73, 45, 3, 74, 46],\n      [8, 53, 23, 26, 54, 24],\n      [12, 45, 15, 28, 46, 16],\n      [3, 147, 117, 10, 148, 118],\n      [3, 73, 45, 23, 74, 46],\n      [4, 54, 24, 31, 55, 25],\n      [11, 45, 15, 31, 46, 16],\n      [7, 146, 116, 7, 147, 117],\n      [21, 73, 45, 7, 74, 46],\n      [1, 53, 23, 37, 54, 24],\n      [19, 45, 15, 26, 46, 16],\n      [5, 145, 115, 10, 146, 116],\n      [19, 75, 47, 10, 76, 48],\n      [15, 54, 24, 25, 55, 25],\n      [23, 45, 15, 25, 46, 16],\n      [13, 145, 115, 3, 146, 116],\n      [2, 74, 46, 29, 75, 47],\n      [42, 54, 24, 1, 55, 25],\n      [23, 45, 15, 28, 46, 16],\n      [17, 145, 115],\n      [10, 74, 46, 23, 75, 47],\n      [10, 54, 24, 35, 55, 25],\n      [19, 45, 15, 35, 46, 16],\n      [17, 145, 115, 1, 146, 116],\n      [14, 74, 46, 21, 75, 47],\n      [29, 54, 24, 19, 55, 25],\n      [11, 45, 15, 46, 46, 16],\n      [13, 145, 115, 6, 146, 116],\n      [14, 74, 46, 23, 75, 47],\n      [44, 54, 24, 7, 55, 25],\n      [59, 46, 16, 1, 47, 17],\n      [12, 151, 121, 7, 152, 122],\n      [12, 75, 47, 26, 76, 48],\n      [39, 54, 24, 14, 55, 25],\n      [22, 45, 15, 41, 46, 16],\n      [6, 151, 121, 14, 152, 122],\n      [6, 75, 47, 34, 76, 48],\n      [46, 54, 24, 10, 55, 25],\n      [2, 45, 15, 64, 46, 16],\n      [17, 152, 122, 4, 153, 123],\n      [29, 74, 46, 14, 75, 47],\n      [49, 54, 24, 10, 55, 25],\n      [24, 45, 15, 46, 46, 16],\n      [4, 152, 122, 18, 153, 123],\n      [13, 74, 46, 32, 75, 47],\n      [48, 54, 24, 14, 55, 25],\n      [42, 45, 15, 32, 46, 16],\n      [20, 147, 117, 4, 148, 118],\n      [40, 75, 47, 7, 76, 48],\n      [43, 54, 24, 22, 55, 25],\n      [10, 45, 15, 67, 46, 16],\n      [19, 148, 118, 6, 149, 119],\n      [18, 75, 47, 31, 76, 48],\n      [34, 54, 24, 34, 55, 25],\n      [20, 45, 15, 61, 46, 16]\n    ];\n    var qrRSBlock = function(totalCount, dataCount) {\n      var _this = {};\n      _this.totalCount = totalCount;\n      _this.dataCount = dataCount;\n      return _this;\n    };\n    var _this = {};\n    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {\n      switch(errorCorrectionLevel) {\n      case QRErrorCorrectionLevel.L :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];\n      case QRErrorCorrectionLevel.M :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];\n      case QRErrorCorrectionLevel.Q :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];\n      case QRErrorCorrectionLevel.H :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];\n      default :\n        return undefined;\n      }\n    };\n    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {\n      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);\n      if (typeof rsBlock == 'undefined') {\n        throw 'bad rs block @ typeNumber:' + typeNumber +\n            '/errorCorrectionLevel:' + errorCorrectionLevel;\n      }\n      var length = rsBlock.length / 3;\n      var list = [];\n      for (var i = 0; i < length; i += 1) {\n        var count = rsBlock[i * 3 + 0];\n        var totalCount = rsBlock[i * 3 + 1];\n        var dataCount = rsBlock[i * 3 + 2];\n        for (var j = 0; j < count; j += 1) {\n          list.push(qrRSBlock(totalCount, dataCount) );\n        }\n      }\n      return list;\n    };\n    return _this;\n  }();\n  var qrBitBuffer = function() {\n    var _buffer = [];\n    var _length = 0;\n    var _this = {};\n    _this.getBuffer = function() {\n      return _buffer;\n    };\n    _this.getAt = function(index) {\n      var bufIndex = Math.floor(index / 8);\n      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;\n    };\n    _this.put = function(num, length) {\n      for (var i = 0; i < length; i += 1) {\n        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);\n      }\n    };\n    _this.getLengthInBits = function() {\n      return _length;\n    };\n    _this.putBit = function(bit) {\n      var bufIndex = Math.floor(_length / 8);\n      if (_buffer.length <= bufIndex) {\n        _buffer.push(0);\n      }\n      if (bit) {\n        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );\n      }\n      _length += 1;\n    };\n    return _this;\n  };\n  var qrNumber = function(data) {\n    var _mode = QRMode.MODE_NUMBER;\n    var _data = data;\n    var _this = {};\n    _this.getMode = function() {\n      return _mode;\n    };\n    _this.getLength = function(buffer) {\n      return _data.length;\n    };\n    _this.write = function(buffer) {\n      var data = _data;\n      var i = 0;\n      while (i + 2 < data.length) {\n        buffer.put(strToNum(data.substring(i, i + 3) ), 10);\n        i += 3;\n      }\n      if (i < data.length) {\n        if (data.length - i == 1) {\n          buffer.put(strToNum(data.substring(i, i + 1) ), 4);\n        } else if (data.length - i == 2) {\n          buffer.put(strToNum(data.substring(i, i + 2) ), 7);\n        }\n      }\n    };\n    var strToNum = function(s) {\n      var num = 0;\n      for (var i = 0; i < s.length; i += 1) {\n        num = num * 10 + chatToNum(s.charAt(i) );\n      }\n      return num;\n    };\n    var chatToNum = function(c) {\n      if ('0' <= c && c <= '9') {\n        return c.charCodeAt(0) - '0'.charCodeAt(0);\n      }\n      throw 'illegal char :' + c;\n    };\n    return _this;\n  };\n  var qrAlphaNum = function(data) {\n    var _mode = QRMode.MODE_ALPHA_NUM;\n    var _data = data;\n    var _this = {};\n    _this.getMode = function() {\n      return _mode;\n    };\n    _this.getLength = function(buffer) {\n      return _data.length;\n    };\n    _this.write = function(buffer) {\n      var s = _data;\n      var i = 0;\n      while (i + 1 < s.length) {\n        buffer.put(\n          getCode(s.charAt(i) ) * 45 +\n          getCode(s.charAt(i + 1) ), 11);\n        i += 2;\n      }\n      if (i < s.length) {\n        buffer.put(getCode(s.charAt(i) ), 6);\n      }\n    };\n    var getCode = function(c) {\n      if ('0' <= c && c <= '9') {\n        return c.charCodeAt(0) - '0'.charCodeAt(0);\n      } else if ('A' <= c && c <= 'Z') {\n        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;\n      } else {\n        switch (c) {\n        case ' ' : return 36;\n        case '$' : return 37;\n        case '%' : return 38;\n        case '*' : return 39;\n        case '+' : return 40;\n        case '-' : return 41;\n        case '.' : return 42;\n        case '/' : return 43;\n        case ':' : return 44;\n        default :\n          throw 'illegal char :' + c;\n        }\n      }\n    };\n    return _this;\n  };\n  var qr8BitByte = function(data) {\n    var _mode = QRMode.MODE_8BIT_BYTE;\n    var _data = data;\n    var _bytes = qrcode.stringToBytes(data);\n    var _this = {};\n    _this.getMode = function() {\n      return _mode;\n    };\n    _this.getLength = function(buffer) {\n      return _bytes.length;\n    };\n    _this.write = function(buffer) {\n      for (var i = 0; i < _bytes.length; i += 1) {\n        buffer.put(_bytes[i], 8);\n      }\n    };\n    return _this;\n  };\n  var qrKanji = function(data) {\n    var _mode = QRMode.MODE_KANJI;\n    var _data = data;\n    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];\n    if (!stringToBytes) {\n      throw 'sjis not supported.';\n    }\n    !function(c, code) {\n      var test = stringToBytes(c);\n      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {\n        throw 'sjis not supported.';\n      }\n    }('\\u53cb', 0x9746);\n    var _bytes = stringToBytes(data);\n    var _this = {};\n    _this.getMode = function() {\n      return _mode;\n    };\n    _this.getLength = function(buffer) {\n      return ~~(_bytes.length / 2);\n    };\n    _this.write = function(buffer) {\n      var data = _bytes;\n      var i = 0;\n      while (i + 1 < data.length) {\n        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);\n        if (0x8140 <= c && c <= 0x9FFC) {\n          c -= 0x8140;\n        } else if (0xE040 <= c && c <= 0xEBBF) {\n          c -= 0xC140;\n        } else {\n          throw 'illegal char at ' + (i + 1) + '/' + c;\n        }\n        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);\n        buffer.put(c, 13);\n        i += 2;\n      }\n      if (i < data.length) {\n        throw 'illegal char at ' + (i + 1);\n      }\n    };\n    return _this;\n  };\n  var byteArrayOutputStream = function() {\n    var _bytes = [];\n    var _this = {};\n    _this.writeByte = function(b) {\n      _bytes.push(b & 0xff);\n    };\n    _this.writeShort = function(i) {\n      _this.writeByte(i);\n      _this.writeByte(i >>> 8);\n    };\n    _this.writeBytes = function(b, off, len) {\n      off = off || 0;\n      len = len || b.length;\n      for (var i = 0; i < len; i += 1) {\n        _this.writeByte(b[i + off]);\n      }\n    };\n    _this.writeString = function(s) {\n      for (var i = 0; i < s.length; i += 1) {\n        _this.writeByte(s.charCodeAt(i) );\n      }\n    };\n    _this.toByteArray = function() {\n      return _bytes;\n    };\n    _this.toString = function() {\n      var s = '';\n      s += '[';\n      for (var i = 0; i < _bytes.length; i += 1) {\n        if (i > 0) {\n          s += ',';\n        }\n        s += _bytes[i];\n      }\n      s += ']';\n      return s;\n    };\n    return _this;\n  };\n  var base64EncodeOutputStream = function() {\n    var _buffer = 0;\n    var _buflen = 0;\n    var _length = 0;\n    var _base64 = '';\n    var _this = {};\n    var writeEncoded = function(b) {\n      _base64 += String.fromCharCode(encode(b & 0x3f) );\n    };\n    var encode = function(n) {\n      if (n < 0) {\n      } else if (n < 26) {\n        return 0x41 + n;\n      } else if (n < 52) {\n        return 0x61 + (n - 26);\n      } else if (n < 62) {\n        return 0x30 + (n - 52);\n      } else if (n == 62) {\n        return 0x2b;\n      } else if (n == 63) {\n        return 0x2f;\n      }\n      throw 'n:' + n;\n    };\n    _this.writeByte = function(n) {\n      _buffer = (_buffer << 8) | (n & 0xff);\n      _buflen += 8;\n      _length += 1;\n      while (_buflen >= 6) {\n        writeEncoded(_buffer >>> (_buflen - 6) );\n        _buflen -= 6;\n      }\n    };\n    _this.flush = function() {\n      if (_buflen > 0) {\n        writeEncoded(_buffer << (6 - _buflen) );\n        _buffer = 0;\n        _buflen = 0;\n      }\n      if (_length % 3 != 0) {\n        var padlen = 3 - _length % 3;\n        for (var i = 0; i < padlen; i += 1) {\n          _base64 += '=';\n        }\n      }\n    };\n    _this.toString = function() {\n      return _base64;\n    };\n    return _this;\n  };\n  var base64DecodeInputStream = function(str) {\n    var _str = str;\n    var _pos = 0;\n    var _buffer = 0;\n    var _buflen = 0;\n    var _this = {};\n    _this.read = function() {\n      while (_buflen < 8) {\n        if (_pos >= _str.length) {\n          if (_buflen == 0) {\n            return -1;\n          }\n          throw 'unexpected end of file./' + _buflen;\n        }\n        var c = _str.charAt(_pos);\n        _pos += 1;\n        if (c == '=') {\n          _buflen = 0;\n          return -1;\n        } else if (c.match(/^\\s$/) ) {\n          continue;\n        }\n        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );\n        _buflen += 6;\n      }\n      var n = (_buffer >>> (_buflen - 8) ) & 0xff;\n      _buflen -= 8;\n      return n;\n    };\n    var decode = function(c) {\n      if (0x41 <= c && c <= 0x5a) {\n        return c - 0x41;\n      } else if (0x61 <= c && c <= 0x7a) {\n        return c - 0x61 + 26;\n      } else if (0x30 <= c && c <= 0x39) {\n        return c - 0x30 + 52;\n      } else if (c == 0x2b) {\n        return 62;\n      } else if (c == 0x2f) {\n        return 63;\n      } else {\n        throw 'c:' + c;\n      }\n    };\n    return _this;\n  };\n  var gifImage = function(width, height) {\n    var _width = width;\n    var _height = height;\n    var _data = new Array(width * height);\n    var _this = {};\n    _this.setPixel = function(x, y, pixel) {\n      _data[y * _width + x] = pixel;\n    };\n    _this.write = function(out) {\n      out.writeString('GIF87a');\n      out.writeShort(_width);\n      out.writeShort(_height);\n      out.writeByte(0x80); // 2bit\n      out.writeByte(0);\n      out.writeByte(0);\n      out.writeByte(0x00);\n      out.writeByte(0x00);\n      out.writeByte(0x00);\n      out.writeByte(0xff);\n      out.writeByte(0xff);\n      out.writeByte(0xff);\n      out.writeString(',');\n      out.writeShort(0);\n      out.writeShort(0);\n      out.writeShort(_width);\n      out.writeShort(_height);\n      out.writeByte(0);\n      var lzwMinCodeSize = 2;\n      var raster = getLZWRaster(lzwMinCodeSize);\n      out.writeByte(lzwMinCodeSize);\n      var offset = 0;\n      while (raster.length - offset > 255) {\n        out.writeByte(255);\n        out.writeBytes(raster, offset, 255);\n        offset += 255;\n      }\n      out.writeByte(raster.length - offset);\n      out.writeBytes(raster, offset, raster.length - offset);\n      out.writeByte(0x00);\n      out.writeString(';');\n    };\n    var bitOutputStream = function(out) {\n      var _out = out;\n      var _bitLength = 0;\n      var _bitBuffer = 0;\n      var _this = {};\n      _this.write = function(data, length) {\n        if ( (data >>> length) != 0) {\n          throw 'length over';\n        }\n        while (_bitLength + length >= 8) {\n          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );\n          length -= (8 - _bitLength);\n          data >>>= (8 - _bitLength);\n          _bitBuffer = 0;\n          _bitLength = 0;\n        }\n        _bitBuffer = (data << _bitLength) | _bitBuffer;\n        _bitLength = _bitLength + length;\n      };\n      _this.flush = function() {\n        if (_bitLength > 0) {\n          _out.writeByte(_bitBuffer);\n        }\n      };\n      return _this;\n    };\n    var getLZWRaster = function(lzwMinCodeSize) {\n      var clearCode = 1 << lzwMinCodeSize;\n      var endCode = (1 << lzwMinCodeSize) + 1;\n      var bitLength = lzwMinCodeSize + 1;\n      var table = lzwTable();\n      for (var i = 0; i < clearCode; i += 1) {\n        table.add(String.fromCharCode(i) );\n      }\n      table.add(String.fromCharCode(clearCode) );\n      table.add(String.fromCharCode(endCode) );\n      var byteOut = byteArrayOutputStream();\n      var bitOut = bitOutputStream(byteOut);\n      bitOut.write(clearCode, bitLength);\n      var dataIndex = 0;\n      var s = String.fromCharCode(_data[dataIndex]);\n      dataIndex += 1;\n      while (dataIndex < _data.length) {\n        var c = String.fromCharCode(_data[dataIndex]);\n        dataIndex += 1;\n        if (table.contains(s + c) ) {\n          s = s + c;\n        } else {\n          bitOut.write(table.indexOf(s), bitLength);\n          if (table.size() < 0xfff) {\n            if (table.size() == (1 << bitLength) ) {\n              bitLength += 1;\n            }\n            table.add(s + c);\n          }\n          s = c;\n        }\n      }\n      bitOut.write(table.indexOf(s), bitLength);\n      bitOut.write(endCode, bitLength);\n      bitOut.flush();\n      return byteOut.toByteArray();\n    };\n    var lzwTable = function() {\n      var _map = {};\n      var _size = 0;\n      var _this = {};\n      _this.add = function(key) {\n        if (_this.contains(key) ) {\n          throw 'dup key:' + key;\n        }\n        _map[key] = _size;\n        _size += 1;\n      };\n      _this.size = function() {\n        return _size;\n      };\n      _this.indexOf = function(key) {\n        return _map[key];\n      };\n      _this.contains = function(key) {\n        return typeof _map[key] != 'undefined';\n      };\n      return _this;\n    };\n    return _this;\n  };\n  var createDataURL = function(width, height, getPixel) {\n    var gif = gifImage(width, height);\n    for (var y = 0; y < height; y += 1) {\n      for (var x = 0; x < width; x += 1) {\n        gif.setPixel(x, y, getPixel(x, y) );\n      }\n    }\n    var b = byteArrayOutputStream();\n    gif.write(b);\n    var base64 = base64EncodeOutputStream();\n    var bytes = b.toByteArray();\n    for (var i = 0; i < bytes.length; i += 1) {\n      base64.writeByte(bytes[i]);\n    }\n    base64.flush();\n    return 'data:image/gif;base64,' + base64;\n  };\n  return qrcode;\n}();\n!function() {\n  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {\n    function toUTF8Array(str) {\n      var utf8 = [];\n      for (var i=0; i < str.length; i++) {\n        var charcode = str.charCodeAt(i);\n        if (charcode < 0x80) utf8.push(charcode);\n        else if (charcode < 0x800) {\n          utf8.push(0xc0 | (charcode >> 6),\n              0x80 | (charcode & 0x3f));\n        }\n        else if (charcode < 0xd800 || charcode >= 0xe000) {\n          utf8.push(0xe0 | (charcode >> 12),\n              0x80 | ((charcode>>6) & 0x3f),\n              0x80 | (charcode & 0x3f));\n        }\n        else {\n          i++;\n          charcode = 0x10000 + (((charcode & 0x3ff)<<10)\n            | (str.charCodeAt(i) & 0x3ff));\n          utf8.push(0xf0 | (charcode >>18),\n              0x80 | ((charcode>>12) & 0x3f),\n              0x80 | ((charcode>>6) & 0x3f),\n              0x80 | (charcode & 0x3f));\n        }\n      }\n      return utf8;\n    }\n    return toUTF8Array(s);\n  };\n}();\n(function (factory) {\n  if (typeof define === 'function' && define.amd) {\n      define([], factory);\n  } else if (typeof exports === 'object') {\n      module.exports = factory();\n  }\n}(function () {\n    return qrcode;\n}));\n// \u2500\u2500 QR de planos \u2500\u2500\nfunction qrCanvas(url, rotulo) {\n  const q = qrcode(0, 'M'); q.addData(url); q.make();\n  const n = q.getModuleCount(), cel = 8, mar = 4 * cel, pie = rotulo ? 34 : 0, W = n * cel + 2 * mar;\n  const cv = document.createElement('canvas'); cv.width = W; cv.height = W + pie; const g = cv.getContext('2d');\n  g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = '#000';\n  for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (q.isDark(r, k)) g.fillRect(mar + k * cel, mar + r * cel, cel, cel);\n  if (rotulo) { g.font = 'bold 18px Arial'; g.textAlign = 'center'; g.fillText(rotulo, W / 2, W + 12); }\n  return cv;\n}\nfunction bajarQR(id, nombre) { const a = document.createElement('a'); a.href = document.getElementById(id).toDataURL('image/png'); a.download = nombre; a.click(); }\nfunction bloqueQR(id, url, rotulo, nombre) {\n  setTimeout(() => { const box = document.getElementById(id + '_b'); if (!box) return; const cv = qrCanvas(url, rotulo); cv.id = id; cv.style.cssText = 'width:170px;height:auto;border:1px solid #E3E6E8;border-radius:6px'; box.prepend(cv); }, 30);\n  return `<div id=\"${id}_b\" style=\"display:flex;gap:14px;align-items:center;flex-wrap:wrap\"><div><button class=\"chico\" onclick=\"bajarQR('${id}','${esc(nombre)}')\">Descargar QR (PNG)</button><div class=\"mu\" style=\"font-size:12px;margin-top:6px;max-width:300px\">Ins\u00e9rtelo en el r\u00f3tulo (en AutoCAD: INSERTARIMAGEN / IMAGEATTACH). Al escanearlo dice si el plano es la revisi\u00f3n vigente.</div></div></div>`;\n}\nasync function qrPlanos() {\n  const r = await call('qr', { proyectoId: PROY.p.id });\n  modal(`<h2>QR de planos \u00b7 ${esc(r.proyecto)}</h2>\n  ${r.vigente ? `<h3>Vigente: Rev. ${r.vigente} <span class=\"mu\">(${dmy(r.fecha)})</span></h3>${bloqueQR('qv', r.urlVigente, 'CEV \u00b7 Rev. ' + r.vigente, 'QR_' + r.proyecto + '_Rev' + r.vigente + '.png')}` : '<p class=\"mu\">Todav\u00eda no hay una revisi\u00f3n vigente: se registra al aprobar la etapa 7 (Plano terminado).</p>'}\n  <h3>Pr\u00f3xima: Rev. ${r.proxima}</h3><p class=\"mu\">Para los planos que se est\u00e1n dibujando. Al escanearlo dir\u00e1 \"en preparaci\u00f3n\" hasta que apruebe la etapa 7.</p>${bloqueQR('qp', r.urlProxima, 'CEV \u00b7 Rev. ' + r.proxima, 'QR_' + r.proyecto + '_Rev' + r.proxima + '.png')}\n  <details style=\"margin-top:12px\"><summary class=\"mu\" style=\"cursor:pointer\">Registrar a mano una revisi\u00f3n (proyectos que ya ten\u00edan planos)</summary><div class=\"fila\"><div><label>N\u00famero de revisi\u00f3n</label><input id=\"qr_n\" type=\"number\" min=\"1\" value=\"${r.proxima}\"></div><div><label>Nota</label><input id=\"qr_t\" placeholder=\"Ej.: Rev. 5 entregada antes del portal\"></div></div><div class=\"acc\"><button class=\"sec\" onclick=\"regRev()\">Registrar como vigente</button></div></details>`);\n}\nasync function regRev() { const r = await call('registrarRev', { proyectoId: PROY.p.id, rev: $('#qr_n').value, nota: $('#qr_t').value }); cerrar(); toast(r.msg, 7000); ir('proyecto', PROY.p.id); }\n// \u2500\u2500 metas por etapa \u2500\u2500\nfunction metaTxt(m, aprobado) {\n  if (!m) return ''; const d = Math.round((new Date(m + 'T12:00:00') - new Date(new Date().toISOString().slice(0, 10) + 'T12:00:00')) / 864e5);\n  const col = aprobado ? 'var(--mu)' : d < 0 ? 'var(--ro)' : d <= 2 ? 'var(--na)' : 'var(--mu)';\n  return `<span style=\"color:${col};font-size:12px\">Meta ${dmy(m)}${aprobado ? '' : d < 0 ? ' \u00b7 ' + Math.abs(d) + ' d\u00edas de atraso' : d === 0 ? ' \u00b7 hoy' : ' \u00b7 ' + d + ' d\u00edas'}</span>`;\n}\nasync function editarMeta(paso, actual) {\n  modal(`<h2>Meta de la etapa ${paso}</h2><p class=\"mu\">Se calcula sola repartiendo el tiempo hasta la entrega al cliente. Puede fijarla a mano; vac\u00eda = autom\u00e1tica.</p><label>Fecha meta</label><input id=\"mt_f\" type=\"date\" value=\"${actual || ''}\"><div class=\"acc\"><button class=\"sec\" onclick=\"guardarMeta(${paso},'')\">Volver a autom\u00e1tica</button><button onclick=\"guardarMeta(${paso},$('#mt_f').value)\">Guardar</button></div>`);\n}\nasync function guardarMeta(paso, f) { const r = await call('ponerMeta', { proyectoId: PROY.p.id, paso: paso, fecha: f }); cerrar(); toast(r.msg); ir('proyecto', PROY.p.id); }\nconst BOOT = __BOOT__;\nlet TOKEN = BOOT.token || (function () { try { return localStorage.getItem('pce_token') || ''; } catch (e) { return ''; } })();\nlet ROL = '', VISTA = 'inicio', DATA = {}, PROY = null, TAB = 'etapas', ABIERTO = '';\nfunction abrirContratante(i) { const g = []; DATA.proyectos.forEach(p => { if (g.indexOf(p.contratante) < 0) g.push(p.contratante); }); ABIERTO = ABIERTO === g[i] ? '' : g[i]; pintarAdmin(); setTimeout(() => { const t = document.querySelectorAll('h2')[1]; if (ABIERTO && t) t.scrollIntoView({ behavior: 'smooth' }); }, 50); }\nconst $ = s => document.querySelector(s);\nconst esc = s => String(s == null ? '' : s).replace(/[&<>\"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[c]));\nconst usd = v => '$' + (Math.round((Number(v) || 0) * 100) / 100).toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, 'X').replace('.', ',').replace(/X/g, '.');\nconst dmy = s => { const m = /^(\\d{4})-(\\d{2})-(\\d{2})(.*)$/.exec(String(s || '')); return m ? m[3] + '/' + m[2] + '/' + m[1] + m[4] : esc(s); };\nconst hoy = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };\nfunction guardarToken(t) { TOKEN = t || ''; try { t ? localStorage.setItem('pce_token', t) : localStorage.removeItem('pce_token'); } catch (e) { } arriba({ cev: 'sesion', token: TOKEN }); }\n// App CEV (GitHub Pages): la p\u00e1gina principal guarda la sesi\u00f3n y hace el \"Continuar con Google\" (su dominio s\u00ed est\u00e1 autorizado).\nlet EN_APP = false;\nconst arriba = m => { try { if (window.top !== window) window.top.postMessage(m, '*'); } catch (e) { } };\nfunction pedirSesion() { return new Promise(ok => { if (window.top === window) return ok(''); const t = setTimeout(() => ok(''), 700);\n  const f = ev => { const m = ev.data || {}; if (m.cev === 'sesionGuardada') { EN_APP = true; clearTimeout(t); window.removeEventListener('message', f); ok(m.token || ''); } };\n  window.addEventListener('message', f); arriba({ cev: 'pideSesion' }); }); }\nwindow.addEventListener('message', async ev => {\n  const m = ev.data || {}; if (m.cev === 'usarCodigo') return login(true); if (m.cev !== 'credencial') return;\n  busy(true); try { const x = await raw('loginGoogle', m.t); if (!x.ok) throw new Error(x.msg); guardarToken(x.token); arrancar(); }\n  catch (e) { toast(e.message || e, 8000); arriba({ cev: 'loginError', msg: String(e.message || e) }); } finally { busy(false); }\n});\nfunction toast(m, ms) { const t = $('#toast'); t.textContent = m; t.style.display = 'block'; clearTimeout(toast._t); toast._t = setTimeout(() => t.style.display = 'none', ms || 4500); }\nfunction busy(on, txt) { $('#busy').textContent = txt || 'Trabajando\u2026'; $('#busy').style.display = on ? 'flex' : 'none'; }\nfunction modal(html) { $('#mbody').innerHTML = html; $('#modal').style.display = 'flex'; $('#modal').scrollTop = 0; }\nfunction cerrar() { $('#modal').style.display = 'none'; }\nfunction raw(fn) { const args = [].slice.call(arguments, 1); return new Promise((ok, no) => { google.script.run.withSuccessHandler(ok).withFailureHandler(e => no(e))[fn].apply(null, args); }); }\nasync function call(accion, datos, silencio) {\n  if (!silencio) busy(true);\n  try {\n    const r = await raw('api', { token: TOKEN, accion: accion, datos: datos || {} });\n    if (r && r.auth === false) { guardarToken(''); login(); throw new Error(r.msg); }\n    if (!r || !r.ok) throw new Error(r && r.msg || 'Error');\n    return r;\n  } catch (e) { toast(e.message || String(e), 7000); throw e; } finally { if (!silencio) busy(false); }\n}\nfunction badge(e) {\n  e = String(e || ''); const m = { APROBADO: 'ok', APROBADA: 'ok', Pagado: 'ok', 'A tiempo': 'ok', 'EN CURSO': 'az', ASIGNADO: 'az', 'POR REVISAR': 'na', ENTREGADO: 'na', ENTREGADA: 'na',\n    'CON OBSERVACIONES': 'ro', CORRECCIONES: 'ro', Atrasado: 'ro', 'PARA CLAUDE': 'az', REABIERTO: 'na', 'Esta semana': 'na', 'Anticipo pendiente': 'na', Pendiente: 'na', 'En ejecuci\u00f3n': 'az' };\n  return '<span class=\"b b-' + (m[e] || 'gr') + '\">' + esc(e.charAt(0) + e.slice(1).toLowerCase()) + '</span>';\n}\nfunction waBtn(url, txt) { return url ? '<a class=\"btn wa\" target=\"_blank\" rel=\"noopener\" href=\"' + esc(url) + '\">' + (txt || 'Enviar por WhatsApp') + '</a>' : ''; }\nfunction avisoWa(r) { if (r && r.wa) modal('<h2>\u2713 Correo enviado</h2><p>' + esc(r.msg || '') + '</p><p><b>Ahora el WhatsApp:</b> toque el bot\u00f3n, se abre WhatsApp con el mensaje ya escrito (indicaciones, fecha y enlaces a los archivos) y solo presiona enviar.</p>' + waBtn(r.wa) + ' <button class=\"sec\" onclick=\"cerrar()\">Cerrar</button>'); else toast(r.msg || 'Listo'); }\n\n// \u2500\u2500 LOGIN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction login(conCodigo) {\n  ROL = '';\n  if (EN_APP && !conCodigo) { $('#app').innerHTML = '<div style=\"position:fixed;inset:0;background:#2B3036\"></div>'; arriba({ cev: 'login' }); return; } $('#app').innerHTML = `<div class=\"login card\"><div style=\"display:flex;align-items:center;gap:10px\"><span class=\"logo\" style=\"background:#2B3036;color:#fff\">CEV</span><h1>${esc(BOOT.app)}</h1></div><p class=\"mu\">Ingrese con su cuenta de Gmail autorizada.</p>\n  <div id=\"gbtn\"></div><label>Correo</label><input id=\"lmail\" type=\"email\" placeholder=\"usted@gmail.com\" autocomplete=\"email\">\n  <div id=\"lcod\" style=\"display:none\"><label>C\u00f3digo que le lleg\u00f3 al correo</label><input id=\"lcode\" inputmode=\"numeric\" maxlength=\"6\"></div>\n  <div class=\"acc\"><button id=\"lbtn\" onclick=\"loginPaso()\">Enviar c\u00f3digo</button></div><p class=\"mu\" id=\"lmsg\"></p></div>`;\n  if (false) {\n    const s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true;\n    s.onload = () => { try { google.accounts.id.initialize({ client_id: BOOT.clientId, callback: async r => { busy(true); try { const x = await raw('loginGoogle', r.credential); if (!x.ok) throw new Error(x.msg); guardarToken(x.token); arrancar(); } catch (e) { toast(e.message || e); } finally { busy(false); } } });\n      google.accounts.id.renderButton($('#gbtn'), { theme: 'outline', size: 'large', text: 'signin_with', locale: 'es' }); } catch (e) { } };\n    document.head.appendChild(s);\n  }\n}\nasync function loginPaso() {\n  const mail = $('#lmail').value.trim();\n  if ($('#lcod').style.display === 'none') {\n    busy(true); try { const r = await raw('pedirCodigo', mail); if (!r.ok) throw new Error(r.msg); $('#lcod').style.display = 'block'; $('#lbtn').textContent = 'Entrar'; $('#lmsg').textContent = 'Le enviamos un c\u00f3digo de 6 d\u00edgitos (vence en 10 minutos).'; }\n    catch (e) { toast(e.message || e); } finally { busy(false); }\n  } else {\n    busy(true); try { const r = await raw('verificarCodigo', mail, $('#lcode').value.trim()); if (!r.ok) throw new Error(r.msg); guardarToken(r.token); arrancar(); }\n    catch (e) { toast(e.message || e); } finally { busy(false); }\n  }\n}\nasync function salir() { try { await raw('salir', TOKEN); } catch (e) { } guardarToken(''); login(); }\n\n// \u2500\u2500 ARRANQUE Y MARCO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nlet PEDIDA = false;\nasync function arrancar() {\n  if (!PEDIDA) { PEDIDA = true; const t = await pedirSesion(); if (!TOKEN && t) { TOKEN = t; try { localStorage.setItem('pce_token', t); } catch (e) { } } }\n  if (!TOKEN) return login();\n  try { DATA = await call('inicio'); } catch (e) { return; }\n  ROL = DATA.yo ? 'DIBUJANTE' : 'ADMIN';\n  VISTA = 'inicio'; pintar();\n}\nfunction marco(cont) {\n  const nav = ROL === 'ADMIN' ? [['inicio', 'Inicio'], ['cuentas', 'Cuentas'], ['ajustes', 'Ajustes']] : [['inicio', 'Mis encargos']];\n  $('#app').innerHTML = `<div class=\"top\"><span class=\"logo\">CEV</span><b>${esc(BOOT.app)}</b>${BOOT.prueba || DATA.prueba ? '<span class=\"b b-na\">MODO PRUEBA</span>' : ''}<nav>${nav.map(n => `<a class=\"${VISTA === n[0] ? 'on' : ''}\" onclick=\"ir('${n[0]}')\">${n[1]}</a>`).join('')}<a onclick=\"salir()\">Salir</a></nav></div><main>${cont}</main>`;\n  window.scrollTo(0, 0);\n}\nasync function ir(v, arg) {\n  VISTA = v;\n  if (v === 'inicio') { DATA = await call('inicio'); return pintar(); }\n  if (v === 'proyecto') { PROY = await call('proyecto', { id: arg }); return pintarProyecto(); }\n  if (v === 'encargo') { const r = await call('encargo', { id: arg }); return pintarEncargo(r); }\n  if (v === 'cuentas') { const r = await call('cuentas'); return pintarCuentas(r); }\n  if (v === 'ajustes') { const r = await call('ajustes'); return pintarAjustes(r); }\n}\nfunction pintar() { ROL === 'ADMIN' ? pintarAdmin() : pintarDibujante(); }\n\n// \u2500\u2500 INICIO JUAN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarAdmin() {\n  const D = DATA, k = D.kpi;\n  let h = (D.licencia ? `<div class=\"aviso\">${esc(D.licencia)}</div>` : '') + (D.cuota < 20 ? `<div class=\"aviso\">Quedan ${D.cuota} correos disponibles hoy.</div>` : '');\n  h += `<div class=\"kpis\"><div class=\"kpi\"><div>Por revisar</div><b>${k.porRevisar}</b></div><div class=\"kpi\"><div>Atrasados</div><b style=\"color:var(--ro)\">${k.atrasos}</b></div>\n  <div class=\"kpi\"><div>Listo para Claude</div><b>${k.claude}</b></div></div>`;\n  const SM = D.semana || { metas: [], esperando: [] };\n  h += `<div class=\"card\"><h3 style=\"margin-top:0\">Esta semana</h3>${SM.metas.length ? `<table><tr><th>Proyecto</th><th>Etapa</th><th>Qui\u00e9n</th><th>Meta</th><th>Entrega cliente</th></tr>${SM.metas.map(m => `<tr><td><a onclick=\"ir('proyecto','${m.proyectoId}')\" style=\"cursor:pointer\"><b>${esc(m.proyecto)}</b></a><br><span class=\"mu\">${esc(m.contratante)}</span></td><td>${m.paso}. ${esc(m.etapa)}<br>${badge(m.estado)}</td><td>${esc(m.quien)}</td><td>${metaTxt(m.meta)}</td><td>${m.entrega ? dmy(m.entrega) : ''}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Ninguna etapa vence en los pr\u00f3ximos 7 d\u00edas.</p>'}\n  ${SM.esperando.length ? `<h3>Esperando tu acci\u00f3n</h3>${SM.esperando.map(x => `<div style=\"padding:4px 0\">\u2022 <a onclick=\"ir('proyecto','${x.proyectoId}')\" style=\"cursor:pointer\"><b>${esc(x.proyecto)}</b></a> \u00b7 ${x.paso}. ${esc(x.etapa)} ${badge(x.estado)} ${metaTxt(x.meta)}</div>`).join('')}` : ''}</div>`;\n  if (D.porRevisar.length) h += `<div class=\"card\"><h3 style=\"margin-top:0\">Entregas por revisar</h3><table>${D.porRevisar.map(x => `<tr><td><b>${esc(x.proyecto)}</b><br><span class=\"mu\">${x.paso}. ${esc(x.etapa)} \u00b7 ${esc(x.dibujanteNombre)} \u00b7 ronda ${x.ronda} \u00b7 ${dmy(x.fecha)}</span></td><td class=\"n\">${x.laminas} l\u00e1m.</td><td class=\"der\"><button class=\"chico\" onclick='abrirRevision(${JSON.stringify(x.proyectoId)},${JSON.stringify(x.id)})'>Revisar</button></td></tr>`).join('')}</table></div>`;\n  if (D.claude.length) h += `<div class=\"card\"><h3 style=\"margin-top:0\">Listo para Claude</h3><p class=\"mu\">P\u00eddamelo en el chat del proyecto Consultor Estructural.</p>${D.claude.map(x => `<div>\u2022 <b>${esc(x.proyecto)}</b> \u00b7 ${x.paso}. ${esc(x.etapa)}</div>`).join('')}</div>`;\n  const enc = D.encargos.slice().sort((a, b) => (a.dias == null ? 999 : a.dias) - (b.dias == null ? 999 : b.dias));\n  h += `<div class=\"card\"><h3 style=\"margin-top:0\">Encargos en curso</h3>${enc.length ? `<table><tr><th>Proyecto</th><th>Etapa</th><th>Dibujante</th><th>Meta de la etapa</th><th></th></tr>${enc.map(e => `<tr><td><a onclick=\"ir('proyecto','${e.proyectoId}')\" style=\"cursor:pointer\"><b>${esc(e.proyecto)}</b></a>${e.tipo === 'MODIFICACION' ? ' <span class=\"b b-na\">Modificaci\u00f3n</span>' : ''}</td><td>${e.paso}. ${esc(e.etapa)}${e.ronda > 1 ? ' <span class=\"mu\">(corr. ' + (e.ronda - 1) + ')</span>' : ''}</td><td>${esc(e.dibujanteNombre)}</td><td>${e.meta ? metaTxt(e.meta) + '<br>' : ''}<span class=\"mu\">Cliente: ${dmy(e.fecha)}</span></td><td>${badge(e.alerta)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin encargos abiertos.</p>'}</div>`;\n  const grupos = []; D.proyectos.forEach(p => { if (grupos.indexOf(p.contratante) < 0) grupos.push(p.contratante); });\n  h += `<div style=\"display:flex;align-items:center;justify-content:space-between\"><h2>Contratantes</h2><button onclick=\"nuevoProyecto()\">+ Nuevo proyecto</button></div>\n  <div class=\"grid\" style=\"grid-template-columns:repeat(auto-fit,minmax(220px,1fr))\">${grupos.map((g, i) => { const L = D.proyectos.filter(p => p.contratante === g), on = ABIERTO === g;\n    const cur = L.filter(p => p.paso <= 10 && !(p.estado === 'APROBADO')).length;\n    return `<div class=\"card\" style=\"cursor:pointer;margin:0;${on ? 'border:2px solid var(--az);' : ''}\" onclick=\"abrirContratante(${i})\"><b style=\"font-size:15px\">${esc(g)}</b>\n      <div class=\"mu\" style=\"margin-top:4px\">${L.length} proyecto(s) \u00b7 ${L.filter(p => p.paso <= 10).length} en curso</div>\n</div>`; }).join('')}</div>`;\n  if (ABIERTO) { const L = D.proyectos.filter(p => p.contratante === ABIERTO);\n    h += `<h2>${esc(ABIERTO)} <span class=\"mu\">\u00b7 ${L.length} proyecto(s)</span> <button class=\"chico sec\" onclick=\"ABIERTO='';pintarAdmin()\">Cerrar</button></h2><div class=\"grid\">${L.map(p => `<div class=\"card\" style=\"cursor:pointer\" onclick=\"ir('proyecto','${p.id}')\">\n    <b style=\"font-size:15px\">${esc(p.nombre)}</b><div style=\"margin:8px 0 4px\" class=\"barra\"><i style=\"width:${p.avance}%\"></i></div>\n    <div class=\"mu\">${p.paso <= 10 ? 'Paso ' + p.paso + ': ' + esc(p.etapa) + ' \u00b7 ' : ''}${badge(p.paso <= 10 ? p.estado : 'APROBADO')}</div>\n${p.entrega ? `<div class=\"mu\" style=\"margin-top:6px\">Entrega al cliente: <b>${dmy(p.entrega)}</b></div>` : ''}</div>`).join('')}</div>`; }\n  else h += '<p class=\"mu\">Elija un contratante para ver sus proyectos.</p>';\n  if ((D.archivados || []).length) h += `<details style=\"margin-top:14px\"><summary class=\"mu\" style=\"cursor:pointer\">Archivados (${D.archivados.length})</summary><div class=\"card\">${D.archivados.map(p => `<div style=\"display:flex;justify-content:space-between;align-items:center;padding:4px 0\"><span><b>${esc(p.nombre)}</b> <span class=\"mu\">\u00b7 ${esc(p.contratante)}</span></span><span><button class=\"chico sec\" onclick=\"ir('proyecto','${p.id}')\">Ver</button> <button class=\"chico\" onclick=\"archivar('${p.id}',true)\">Restaurar</button></span></div>`).join('')}</div></details>`;\n  marco(h);\n}\nfunction nuevoProyecto() {\n  modal(`<h2>Nuevo proyecto</h2><label>Cliente</label><select id=\"np_c\">${DATA.clientes.map(c => `<option value=\"${esc(c.Clave)}\">${esc(c.Contratante)}</option>`).join('')}</select>\n  <label>Nombre del proyecto</label><input id=\"np_n\"><label>Descripci\u00f3n (opcional)</label><input id=\"np_d\" placeholder=\"Ej.: Residencia Aires de Bat\u00e1n\">\n  <div class=\"fila\"><div><label>Servicio</label><input id=\"np_s\" value=\"Dise\u00f1o estructural\"></div><div><label>Valor del contrato (USD)</label><input id=\"np_v\" type=\"number\" step=\"0.01\"></div><div><label>Anticipo %</label><input id=\"np_a\" type=\"number\" value=\"50\"></div></div>\n  <label>Bloques (opcional: se crea un proyecto por bloque, cada uno con su valor)</label><div id=\"np_bl\"></div><button class=\"chico sec\" type=\"button\" onclick=\"filaBloque()\">+ Agregar bloque</button>\n  <label>Proforma (opcional)</label><input id=\"np_pf\" type=\"file\" accept=\".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png\"><div id=\"up_np\" class=\"prog\"></div>\n  <p class=\"mu\">Se crea la carpeta del proyecto con sus 9 subcarpetas dentro de la carpeta del cliente. La proforma queda en 09_Proformas_y_cobros (de cada bloque) y su enlace en las notas del proyecto.</p><div class=\"acc\"><button id=\"np_ok\" onclick=\"crearProyecto()\">Crear</button></div>`);\n}\nfunction filaBloque() {\n  const d = document.createElement('div'); d.className = 'fila'; d.style.cssText = 'grid-template-columns:1fr 1fr auto;align-items:center;margin-bottom:6px';\n  d.innerHTML = '<input class=\"bl_n\" placeholder=\"Bloque (ej.: A, B-C, Torre 1)\"><input class=\"bl_v\" type=\"number\" step=\"0.01\" placeholder=\"Valor USD del bloque\"><button class=\"chico sec\" type=\"button\">\u2715</button>';\n  d.querySelector('button').onclick = () => { d.remove(); if (!document.querySelector('#np_bl .fila')) { $('#np_v').disabled = false; $('#np_v').placeholder = ''; } };\n  $('#np_bl').appendChild(d); $('#np_v').disabled = true; $('#np_v').value = ''; $('#np_v').placeholder = 'Por bloque'; d.querySelector('.bl_n').focus();\n}\nasync function crearProyecto() {\n  const f = ($('#np_pf').files || [])[0], nom = $('#np_n').value.trim();\n  const bl = [].slice.call(document.querySelectorAll('#np_bl .fila')).map(d => ({ n: d.querySelector('.bl_n').value.trim(), v: d.querySelector('.bl_v').value })).filter(x => x.n);\n  if (!nom) { toast('Escriba el nombre del proyecto.'); return; }\n  const base = { Cliente: $('#np_c').value, 'Descripci\u00f3n': $('#np_d').value, Servicio: $('#np_s').value, 'Anticipo %': $('#np_a').value };\n  const L = bl.length ? bl.map(x => Object.assign({}, base, { Proyecto: nom + ' \u2013 ' + (/^(bloque|torre|edificio|casa|etapa)/i.test(x.n) ? x.n : 'Bloque ' + x.n), 'Valor contrato': x.v }))\n    : [Object.assign({}, base, { Proyecto: nom, 'Valor contrato': $('#np_v').value })];\n  const b = $('#np_ok'); b.disabled = true; const ids = [], fallo = [];\n  try {\n    for (const d of L) {\n      const r = await call('guardarProyecto', d); ids.push(r.id);\n      if (f) { SUBIDOS.np = []; await subirLista([f], 'np', { proyectoId: r.id, paso: 99 }); const a = SUBIDOS.np[0];\n        if (a) await call('anotarProforma', { id: r.id, nombre: a.nombre, url: a.url }, true); else fallo.push(d.Proyecto); }\n    }\n    if (fallo.length) { toast('Proyecto creado, pero la proforma no se subi\u00f3 en: ' + fallo.join(', ') + '. S\u00fabala desde Archivos.', 9000); await new Promise(z => setTimeout(z, 2500)); }\n    cerrar();\n    if (ids.length === 1) ir('proyecto', ids[0]); else { toast('Se crearon ' + ids.length + ' proyectos, uno por bloque.', 7000); ir('inicio'); }\n  } finally { b.disabled = false; }\n}\n\n// \u2500\u2500 PROYECTO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarProyecto() {\n  const P = PROY, p = P.p;\n  const tabs = [['etapas', 'Etapas'], ['ficha', 'Ficha t\u00e9cnica' + (P.faltan.length ? ' (' + P.faltan.length + ')' : '')], ['encargos', 'Encargos y entregas'], ['cambios', 'Cambios'], ['cuentas', 'Cuentas'], ['datos', 'Datos']];\n  let h = `<div class=\"mu\"><a onclick=\"ir('inicio')\" style=\"cursor:pointer\">\u2190 Inicio</a> \u00b7 ${esc(p.contratante)}</div><h1 style=\"margin:6px 0\">${esc(p.nombre)}</h1>\n  <div class=\"mu\">${esc(p.desc)} ${p.carpeta ? '\u00b7 <a target=\"_blank\" href=\"' + p.carpeta + '\">Carpeta en Drive</a>' : ''}</div>\n  <div class=\"tabs\">${tabs.map(t => `<a class=\"${TAB === t[0] ? 'on' : ''}\" onclick=\"TAB='${t[0]}';pintarProyecto()\">${t[1]}</a>`).join('')}</div>`;\n  h += ({ etapas: tabEtapas, ficha: tabFicha, encargos: tabEncargos, cambios: tabCambios, cuentas: tabCuentasP, datos: tabDatos })[TAB]();\n  marco(h);\n  if (TAB === 'ficha') dibujarEspectro();\n}\nconst PJ = [1, 3, 5, 7, 8, 9, 10], PC = [3, 5, 8, 9, 10], PD = [2, 4];\nconst SOLO_CLAUDE = [5, 8, 9, 10], BOTON_CLAUDE = { 5: 'Revisi\u00f3n con Claude' }, FUENTE_CLAUDE = { 5: 'Planos + modelo \u00b7 NEC-15 \u00b7 ASCE 7-22 \u00b7 ACI 318-25', 8: 'Directo de los planos terminados', 9: 'Desde la planilla de acero y hormig\u00f3n', 10: 'Desde toda la informaci\u00f3n del proyecto' };\nfunction tabEtapas() {\n  const E = PROY.etapas, act = (E.filter(e => e.estado !== 'APROBADO')[0] || {}).paso;\n  const abierto = paso => PROY.encargos.filter(e => e.paso === paso && ['ASIGNADO', 'CORRECCIONES', 'ENTREGADO'].indexOf(e.estado) >= 0)[0];\n  const sinAvance = !E.some(e => e.estado === 'APROBADO' && e.nota !== 'Hecho antes del portal') && E.some(e => e.estado !== 'APROBADO');\n  const salto = sinAvance ? `<div class=\"card\" style=\"padding:10px 14px\"><span class=\"mu\">\u00bfProyecto que ya ven\u00eda avanzado?</span> Empezar desde la etapa <select id=\"sa_p\" style=\"width:auto;display:inline-block\">${E.filter(e => e.paso >= 2).map(e => `<option value=\"${e.paso}\" ${e.paso === 5 ? 'selected' : ''}>${e.paso}. ${esc(e.nombre)}</option>`).join('')}</select> <button class=\"chico sec\" onclick=\"saltarA()\">Aplicar</button></div>` : '';\n  const sinFecha = !PROY.p.entrega ? `<div class=\"aviso\">Sin fecha de entrega al cliente no se calculan las metas por etapa. P\u00f3ngala en la pesta\u00f1a Datos.</div>` : '';\n  return tarjetaDocs() + salto + sinFecha + '<div class=\"card\">' + E.map(e => {\n    let acc = '';\n    if (PJ.indexOf(e.paso) >= 0 && e.estado !== 'APROBADO') acc = SOLO_CLAUDE.indexOf(e.paso) >= 0\n      ? `<span class=\"mu\" style=\"font-size:12px;margin-right:6px\">${FUENTE_CLAUDE[e.paso]}</span>${e.estado !== 'PARA CLAUDE' ? `<button class=\"chico sec\" onclick=\"paraClaude(${e.paso})\">${BOTON_CLAUDE[e.paso] || 'Generar con Claude'}</button> ` : ''}<button class=\"chico ok\" onclick=\"aprobarEtapa(${e.paso})\">Aprobar</button>`\n      : `<button class=\"chico sec\" onclick=\"subirEtapa(${e.paso})\">Subir archivo</button> ${PC.indexOf(e.paso) >= 0 && e.estado !== 'PARA CLAUDE' ? `<button class=\"chico sec\" onclick=\"paraClaude(${e.paso})\">Listo para Claude</button> ` : ''}<button class=\"chico ok\" onclick=\"aprobarEtapa(${e.paso})\">Aprobar</button>`;\n    if (e.paso === 1 && e.estado !== 'APROBADO') acc = `<button class=\"chico\" onclick=\"enviarPredim()\">Enviar a dibujante</button> <button class=\"chico ok\" onclick=\"aprobarEtapa(1)\">Aprobar sin enviar</button>`;\n    if (PD.indexOf(e.paso) >= 0 && e.estado !== 'APROBADO') { const a = abierto(e.paso); acc = a ? `<span class=\"mu\">${esc(a.dibujanteNombre)} \u00b7 ${dmy(a.fecha)}</span>` : `<button class=\"chico\" onclick=\"asignar(${e.paso})\">Asignar</button>`; }\n    if (e.paso === 5 && e.estado === 'POR REVISAR') { const x = PROY.entregas.filter(z => z.estado === 'ENTREGADA' && z.paso === 4)[0]; if (x) acc = `<button class=\"chico sec\" onclick=\"paraClaude(5)\">Revisi\u00f3n con Claude</button> <button class=\"chico\" onclick='abrirRevision(${JSON.stringify(PROY.p.id)},${JSON.stringify(x.id)})'>Revisar entrega</button>`; }\n    if (e.paso === 2 && e.estado === 'ENTREGADO') { const x = PROY.entregas.filter(z => z.estado === 'ENTREGADA' && z.paso === 2)[0]; if (x) acc = `<button class=\"chico\" onclick='abrirRevision(${JSON.stringify(PROY.p.id)},${JSON.stringify(x.id)})'>Revisar trazado</button>`; }\n    const mt = (PROY.metas || {})[e.paso], man = (PROY.metasManual || []).indexOf(e.paso) >= 0;\n    const qrb = e.paso === 7 ? `<button class=\"chico sec\" onclick=\"qrPlanos()\">QR planos${PROY.planos && PROY.planos.vigente ? ' \u00b7 Rev. ' + PROY.planos.vigente : ''}</button> ` : '';\n    return `<div class=\"et\"><div class=\"num ${e.estado === 'APROBADO' ? 'ok' : e.paso === act ? 'cur' : ''}\">${e.estado === 'APROBADO' ? '\u2713' : e.paso}</div>\n    <div><b>${esc(e.nombre)}</b> <span class=\"mu\">\u00b7 ${esc(e.resp)}</span><br>${badge(e.estado)} <span class=\"mu\">${esc(e.fecha)} ${esc(e.por)}${e.nota ? ' \u00b7 ' + esc(e.nota) : ''}${e.archivos ? ' \u00b7 ' + esc(e.archivos) : ''}</span>\n    ${mt && e.paso >= 2 ? `<br>${metaTxt(mt, e.estado === 'APROBADO')}${man ? ' <span class=\"mu\" style=\"font-size:11px\">(fijada)</span>' : ''} <a style=\"cursor:pointer;font-size:12px\" onclick=\"editarMeta(${e.paso},'${mt}')\">\u270e</a>` : ''}</div><div><button class=\"chico sec\" onclick=\"verArchivos(${e.paso})\">\ud83d\udcc1 Archivos</button> ${qrb}${acc}</div></div>`;\n  }).join('') + '</div>';\n}\nfunction tarjetaDocs() {\n  const D = PROY.docs || { arq: [], suelo: [] };\n  const fila = (t, lista, paso) => `<div class=\"et\"><div class=\"num ${lista.length ? 'ok' : 'cur'}\">${lista.length ? '\u2713' : '!'}</div>\n    <div><b>${t}</b><br>${lista.length ? lista.map(f => `<a href=\"${esc(f.url)}\" target=\"_blank\">${esc(f.nombre)}</a> <span class=\"mu\">${esc(f.fecha)}</span>`).join('<br>') : '<span class=\"mu\">Falta subir</span>'}</div>\n    <div><button class=\"chico sec\" onclick=\"subirDocs(${paso})\">Subir</button></div></div>`;\n  return `<div class=\"card\"><h3 style=\"margin-top:0\">0 \u00b7 Documentaci\u00f3n del contratante</h3><p class=\"mu\" style=\"margin-top:-6px\">Lo primero: sin planos no se aprueba el predimensionamiento y sin estudio de suelos no se aprueba el modelo ETABS.</p>`\n    + fila('Planos arquitect\u00f3nicos', D.arq, 0) + fila('Estudio de suelos', D.suelo, -1) + '</div>';\n}\nfunction subirDocs(paso) {\n  modal(`<h2>Subir \u00b7 ${paso === 0 ? 'Planos arquitect\u00f3nicos' : 'Estudio de suelos'}</h2><p class=\"mu\">Puede subir varios archivos (DWG, PDF, Excel). Se guardan con fecha y hora; no se reemplazan las versiones anteriores.</p>${zonaSubida('dc' + (paso + 1), { proyectoId: PROY.p.id, paso: paso })}<div class=\"acc\"><button onclick=\"cerrar();ir('proyecto','${PROY.p.id}')\">Listo</button></div>`);\n}\nasync function saltarA() { const p = Number($('#sa_p').value); if (!confirm('Las etapas 1 a ' + (p - 1) + ' quedan como hechas antes del portal. \u00bfSeguir?')) return; const r = await call('saltarA', { proyectoId: PROY.p.id, paso: p }); toast(r.msg, 8000); ir('proyecto', PROY.p.id); }\nasync function verArchivos(paso) {\n  const r = await call('archivosEtapa', { proyectoId: PROY.p.id, paso: paso }), et = PROY.etapas.filter(e => e.paso === paso)[0] || {};\n  const kb = n => n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';\n  const ext = n => (String(n).match(/\\.([a-z0-9]+)$/i) || [, ''])[1].toUpperCase();\n  const btns = f => `<a class=\"chico sec\" style=\"display:inline-block;padding:5px 10px;border-radius:6px;border:1px solid #ccc;text-decoration:none;color:inherit\" href=\"${esc(f.url)}\" target=\"_blank\">Ver</a> <a class=\"chico\" style=\"display:inline-block;padding:5px 10px;border-radius:6px;background:#3D434A;color:#fff;text-decoration:none\" href=\"${esc(f.descarga)}\" target=\"_blank\">Descargar</a>`;\n  const tabla = L => L.length ? `<table>${L.map((f, i) => `<tr><td><b>${esc(f.nombre)}</b> ${i === 0 ? '<span class=\"b b-ok\">M\u00e1s reciente</span>' : ''}<br><span class=\"mu\">${esc(ext(f.nombre))} \u00b7 ${kb(f.tam)} \u00b7 ${esc(f.fecha)}</span></td><td class=\"der\" style=\"white-space:nowrap\">${btns(f)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Todav\u00eda no hay archivos en esta etapa.</p>';\n  if (r.req) {\n    const listo = r.req.every(q => !q.ob || q.archivos.length), enviado = et.estado === 'PARA CLAUDE', cerrada = et.estado === 'APROBADO';\n    const filas = r.req.map(q => { const f = q.archivos[0], k = 'rq' + paso + q.k, tipo = q.k === 'informe' ? '<span class=\"b b-az\">Claude</span>' : q.ob ? '<span class=\"b b-ro\">Obligatorio</span>' : q.rec ? '<span class=\"b b-az\">Recomendado</span>' : '<span class=\"b b-gr\">Opcional</span>';\n      SUBIDOS[k] = [];\n      return `<div class=\"et\" style=\"grid-template-columns:34px 1fr\"><div class=\"num ${f ? 'ok' : q.ob ? 'cur' : ''}\">${f ? '\u2713' : '!'}</div><div>\n        <b>${esc(q.t)}</b> <span class=\"mu\">\u00b7 .${q.ext.join(' / .')}</span> ${tipo}<br>\n        ${f ? `<span class=\"mu\">${esc(f.nombre)} \u00b7 ${kb(f.tam)} \u00b7 ${esc(f.fecha)}${q.archivos.length > 1 ? ' \u00b7 ' + (q.archivos.length - 1) + ' versi\u00f3n(es) anterior(es)' : ''}</span> ${btns(f)}` : `<span class=\"mu\">${q.ob ? 'Falta subir' : 'Sin archivo'}</span>`}\n        <div style=\"margin-top:6px\">${cerrada ? '' : zonaSubida(k, { proyectoId: PROY.p.id, paso: paso, req: q.k, ext: q.ext })}</div></div></div>`; }).join('');\n    const pie = cerrada ? '<p class=\"mu\">Etapa aprobada.</p>' : enviado ? '<div class=\"aviso\">\u2713 Enviado a revisi\u00f3n: p\u00eddeme la revisi\u00f3n en el chat del proyecto Consultor Estructural.</div>'\n      : `<p class=\"mu\">${listo ? 'Ya est\u00e1n los archivos obligatorios.' : 'Suba los archivos obligatorios para enviar a revisi\u00f3n.'}</p>`;\n    return modal(`<h2>${paso}. ${esc(et.nombre || '')} \u00b7 archivos para la revisi\u00f3n</h2><p class=\"mu\" style=\"margin-top:-6px\">Cada espacio acepta solo su formato y guarda el archivo en su carpeta. Para corregir: suba la versi\u00f3n nueva en el mismo espacio; la anterior queda como historial.</p>\n    <div class=\"card\" style=\"padding:4px 14px\">${filas}</div>${pie}\n    <div class=\"acc\">${!cerrada && !enviado ? `<button ${listo ? '' : 'disabled'} onclick=\"cerrar();paraClaude(${paso})\">Enviar a revisi\u00f3n</button>` : ''}<button class=\"sec\" onclick=\"verArchivos(${paso})\">Actualizar lista</button><button class=\"sec\" onclick=\"cerrar();ir('proyecto','${PROY.p.id}')\">Listo</button></div>\n    <details style=\"margin-top:12px\"><summary class=\"mu\" style=\"cursor:pointer\">Todos los archivos de la carpeta ${esc(r.carpeta)}</summary>${tabla(r.archivos)}</details>`);\n  }\n  const lista = tabla(r.archivos);\n  modal(`<h2>${paso}. ${esc(et.nombre || '')} \u00b7 archivos</h2><p class=\"mu\" style=\"margin-top:-6px\">Carpeta ${esc(r.carpeta)}${r.comparte.length ? ' (compartida con las etapas ' + r.comparte.join(', ') + ')' : ''}. Para modificar: descargue, edite y suba la versi\u00f3n corregida; la anterior queda como historial.</p>\n  ${lista}<h3>Subir versi\u00f3n nueva o corregida</h3>${zonaSubida('va' + paso, { proyectoId: PROY.p.id, paso: paso })}\n  <div class=\"acc\"><button class=\"sec\" onclick=\"SUBIDOS['va${paso}']=[];verArchivos(${paso})\">Actualizar lista</button><button onclick=\"SUBIDOS['va${paso}']=[];cerrar();ir('proyecto','${PROY.p.id}')\">Listo</button></div>`);\n}\nasync function paraClaude(paso) { const r = await call('paraClaude', { proyectoId: PROY.p.id, paso: paso }); toast(r.msg, 8000); ir('proyecto', PROY.p.id); }\nfunction subirEtapa(paso) {\n  if (paso === 5) return verArchivos(5);\n  modal(`<h2>Subir archivo \u00b7 ${paso}</h2><p class=\"mu\">Se guarda en la carpeta de la etapa con fecha y hora; no reemplaza las versiones anteriores.</p>${zonaSubida('se', { proyectoId: PROY.p.id, paso: paso })}<div class=\"acc\"><button onclick=\"cerrar();ir('proyecto','${PROY.p.id}')\">Listo</button></div>`);\n}\nfunction aprobarEtapa(paso) {\n  modal(`<h2>Aprobar etapa ${paso}</h2>${paso === 3 && PROY.faltan.length ? `<div class=\"aviso\">La ficha t\u00e9cnica est\u00e1 incompleta: ${esc(PROY.faltan.join(', '))}.</div>` : ''}\n  ${PC.indexOf(paso) >= 0 ? '<p class=\"mu\">Puede subir el archivo de Claude o uno hecho a mano; queda en su carpeta con su versi\u00f3n.</p>' : ''}${zonaSubida('ae', { proyectoId: PROY.p.id, paso: paso })}\n  <label>Nota (opcional)</label><input id=\"ae_n\"><div class=\"acc\"><button class=\"ok\" onclick=\"confirmarEtapa(${paso})\">Aprobar</button></div>`);\n}\nasync function confirmarEtapa(paso) { const r = await call('aprobarEtapa', { proyectoId: PROY.p.id, paso: paso, nota: $('#ae_n').value, archivos: SUBIDOS.ae || [] }); cerrar(); toast(r.msg); ir('proyecto', PROY.p.id); }\nfunction asignar(paso, tipo) {\n  const D = PROY.dibujantes, def = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);\n  modal(`<h2>Asignar \u00b7 ${paso}. ${paso === 2 ? 'Trazado' : 'Dibujo completo'}</h2>\n  <div class=\"fila\"><div><label>Dibujante</label><select id=\"as_d\">${D.map(d => `<option value=\"${esc(d.email)}\">${esc(d.nombre)}</option>`).join('')}</select></div>\n  <div><label>Tipo</label><select id=\"as_t\"><option value=\"NUEVO\">Nuevo</option><option value=\"MODIFICACION\" ${tipo === 'MODIFICACION' ? 'selected' : ''}>Modificaci\u00f3n (solo l\u00e1minas nuevas suman)</option></select></div>\n  <div><label>Fecha de entrega al cliente</label><input id=\"as_e\" type=\"date\" value=\"${esc(PROY.p.entrega || '')}\"></div></div>\n  <label>Qu\u00e9 debe entregar</label><textarea id=\"as_q\" placeholder=\"Ej.: Planta de cimentaci\u00f3n, plantas de losas N+3.06 y N+6.12, cortes y detalles de columnas\"></textarea>\n  <label>Observaciones (opcional)</label><textarea id=\"as_o\"></textarea><p class=\"mu\">Le llega un correo con todo y le dejamos listo el WhatsApp. Se le comparten (solo ver) las carpetas base del proyecto.</p>\n  <div class=\"acc\"><button onclick=\"confirmarAsignar(${paso})\">Asignar y avisar</button></div>`);\n}\nfunction enviarPredim() {\n  const D = PROY.dibujantes, def = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10); SUBIDOS.pd = [];\n  const av = [];\n  if (!(PROY.docs || {}).arq || !PROY.docs.arq.length) av.push('faltan los planos arquitect\u00f3nicos del contratante');\n  modal(`<h2>1 \u00b7 Predimensionamiento \u2192 dibujante</h2>${av.length ? `<div class=\"aviso\">No se puede enviar todav\u00eda: ${esc(av.join('; '))}.</div>` : ''}\n  <label>Predimensionamiento (PDF o imagen)</label>${zonaSubida('pd', { proyectoId: PROY.p.id, paso: 1 })}\n  <label>Indicaciones para la dibujante <button type=\"button\" class=\"chico sec\" style=\"margin-left:8px\" onclick=\"notaVoz('pd', { proyectoId: PROY.p.id, paso: 1 })\">\ud83c\udf99 Grabar nota de voz</button></label><textarea id=\"pd_i\" rows=\"5\" placeholder=\"Ej.: Trazar ejes A-G / 1-6, columnas 45x45 seg\u00fan el PDF, vigas 30x55; niveles N+3.06, N+6.12\u2026\"></textarea>\n  <div class=\"fila\"><div><label>Dibujante</label><select id=\"pd_d\">${D.map(d => `<option value=\"${esc(d.email)}\">${esc(d.nombre)}</option>`).join('')}</select></div>\n  <div><label>Fecha de entrega al cliente</label><input id=\"pd_e\" type=\"date\" value=\"${esc(PROY.p.entrega || '')}\"></div></div>\n  <p class=\"mu\">Al enviar: se aprueba el predimensionamiento, se le asigna el trazado y le llega un correo con los archivos adjuntos y sus indicaciones (y el WhatsApp listo).</p>\n  <div class=\"acc\"><button onclick=\"confirmarPredim()\">Enviar</button></div>`);\n}\nasync function confirmarPredim() {\n  const r = await call('enviarPredim', { proyectoId: PROY.p.id, archivos: SUBIDOS.pd || [], indicaciones: $('#pd_i').value, dibujante: $('#pd_d').value, fecha: $('#pd_e').value, entrega: $('#pd_e').value });\n  PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); avisoWa(r);\n}\nasync function confirmarAsignar(paso) {\n  const r = await call('asignar', { proyectoId: PROY.p.id, paso: paso, dibujante: $('#as_d').value, tipo: $('#as_t').value, fecha: $('#as_e').value, entrega: $('#as_e').value, que: $('#as_q').value, obs: $('#as_o').value });\n  PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); avisoWa(r);\n}\n\n// Ficha t\u00e9cnica + espectro\nfunction tabFicha() {\n  const F = PROY.ficha, grupos = [];\n  PROY.fichaDef.forEach(f => { if (grupos.indexOf(f[0]) < 0) grupos.push(f[0]); });\n  let MF = {}; try { MF = JSON.parse(F.modeloFicha || '{}'); } catch (e) { }\n  const deM = k => (MF.claves || []).indexOf(k) >= 0;\n  let h = `<div class=\"card\"><div style=\"display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap\"><div><b>Datos del modelo ETABS</b><div class=\"mu\">${MF.archivo ? 'Tomados de <a target=\"_blank\" href=\"' + esc(MF.url || '#') + '\">' + esc(MF.archivo) + '</a> el ' + esc(MF.fecha) + ' \u00b7 ' + (MF.claves || []).length + ' campos (marcados ETABS). Se actualizan solos cada vez que sube un .e2k en el paso 3.' : 'La ficha se llena sola al subir el .e2k en el paso 3 (Modelo ETABS). Lo que el modelo no trae (uso, ubicaci\u00f3n, cimentaci\u00f3n) se escribe a mano.'}</div>${(MF.notas || []).map(n => '<div class=\"mu\" style=\"color:var(--na)\">\u26a0 ' + esc(n) + '</div>').join('')}</div><button class=\"sec\" onclick=\"fichaDelModelo()\">\u27f3 Llenar desde el modelo</button></div></div>`;\n  h += PROY.faltan.length ? `<div class=\"aviso\">Faltan ${PROY.faltan.length} dato(s) obligatorios. La ficha es para el modelo estructural: sin ficha completa no se aprueba el paso 3 (modelo ETABS).</div>` : '<div class=\"aviso\" style=\"background:var(--okb);border-color:#BFE3CC\">Ficha t\u00e9cnica completa.</div>';\n  h += grupos.map(g => `<div class=\"card\"><h3 style=\"margin-top:0\">${esc(g)}</h3><div class=\"fila\">${PROY.fichaDef.filter(f => f[0] === g).map(f => `<div><label>${esc(f[2])}${f[3] ? ' *' : ''}${deM(f[1]) ? ' <span class=\"b b-az\">ETABS</span>' : ''}</label><input data-k=\"${f[1]}\" value=\"${esc(F[f[1]] || '')}\" placeholder=\"${esc(f[4])}\" oninput=\"if(['Z','Fa','Fd','Fs','eta','r','I','R','phiP','phiE'].indexOf(this.dataset.k)>=0)dibujarEspectro()\"></div>`).join('')}</div></div>`).join('');\n  h += `<div class=\"card\"><h3 style=\"margin-top:0\">Espectro de dise\u00f1o</h3><div id=\"esp\"></div>\n  <label>Espectro propio del sitio (opcional): pegue desde Excel dos columnas T (s) y Sa (g), o cargue un CSV/TXT</label><textarea id=\"esp_sitio\" oninput=\"dibujarEspectro()\" placeholder=\"0.00\t0.95&#10;0.10\t1.10&#10;\u2026\">${esc(F.espectroSitio || '')}</textarea>\n  <input type=\"file\" accept=\".csv,.txt\" onchange=\"leerEspectro(this)\" style=\"margin-top:6px\"><label>Espectro que rige</label><select data-k=\"rige\"><option value=\"NEC\" ${F.rige !== 'SITIO' ? 'selected' : ''}>NEC-SE-DS</option><option value=\"SITIO\" ${F.rige === 'SITIO' ? 'selected' : ''}>Espectro del sitio</option></select></div>\n  <div class=\"acc\"><button onclick=\"guardarFicha()\">Guardar ficha t\u00e9cnica</button></div>`;\n  return h;\n}\nasync function fichaDelModelo() { const r = await call('fichaModelo', { proyectoId: PROY.p.id }); PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); toast(r.n + ' datos tomados de ' + r.archivo + (r.faltan.length ? '. Faltan a mano: ' + r.faltan.join(', ') : '. Ficha completa.'), 9000); }\nfunction leerEspectro(inp) { const f = inp.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { $('#esp_sitio').value = r.result; dibujarEspectro(); }; r.readAsText(f); }\nfunction valFicha() { const o = {}; document.querySelectorAll('[data-k]').forEach(i => o[i.dataset.k] = i.value); o.espectroSitio = ($('#esp_sitio') || {}).value || ''; return o; }\nasync function guardarFicha() { const r = await call('guardarFicha', { proyectoId: PROY.p.id, valores: valFicha() }); PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); toast(r.faltan.length ? 'Guardado. Faltan: ' + r.faltan.join(', ') : 'Ficha t\u00e9cnica completa y guardada.'); }\nconst num = v => { const x = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(x) ? x : NaN; };\nfunction puntosSitio(txt) {\n  return String(txt || '').split(/\\r?\\n/).map(l => l.trim()).filter(Boolean).map(l => { const sep = l.indexOf(';') >= 0 ? ';' : l.indexOf('\\t') >= 0 ? '\\t' : l.indexOf(',') >= 0 && l.split(',').length === 2 ? ',' : /\\s+/;\n    const p = typeof sep === 'string' ? l.split(sep) : l.split(sep); return [num(p[0]), num(p[1])]; }).filter(p => isFinite(p[0]) && isFinite(p[1])).sort((a, b) => a[0] - b[0]);\n}\nfunction dibujarEspectro() {\n  const el = $('#esp'); if (!el) return;\n  const v = valFicha(), Z = num(v.Z), Fa = num(v.Fa), Fd = num(v.Fd), Fs = num(v.Fs), eta = num(v.eta), r = num(v.r), I = num(v.I) || 1, R = num(v.R), pP = num(v.phiP) || 1, pE = num(v.phiE) || 1;\n  const ok = [Z, Fa, Fd, Fs, eta, r].every(isFinite), site = puntosSitio(v.espectroSitio);\n  if (!ok && !site.length) { el.innerHTML = '<p class=\"mu\">Complete Z, Fa, Fd, Fs, \u03b7 y r para ver el espectro NEC-SE-DS.</p>'; return; }\n  const Tc = ok ? 0.55 * Fs * Fd / Fa : 0, Tmax = 4, nec = [], ine = [];\n  if (ok) for (let T = 0; T <= Tmax + 1e-9; T += 0.02) { const Sa = T <= Tc ? eta * Z * Fa : eta * Z * Fa * Math.pow(Tc / T, r); nec.push([T, Sa]); if (isFinite(R)) ine.push([T, Sa * I / (R * pP * pE)]); }\n  const ymax = Math.max(0.2, ...nec.map(p => p[1]), ...site.map(p => p[1])) * 1.1;\n  const W = 640, H = 260, x0 = 46, y0 = 14, w = W - x0 - 14, h = H - y0 - 34, X = t => x0 + t / Tmax * w, Y = s => y0 + h - s / ymax * h;\n  const pl = (P, c, dash) => P.length ? `<polyline fill=\"none\" stroke=\"${c}\" stroke-width=\"2\" ${dash ? 'stroke-dasharray=\"6 4\"' : ''} points=\"${P.filter(p => p[0] <= Tmax).map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join(' ')}\"/>` : '';\n  let ax = ''; for (let t = 0; t <= Tmax; t += 0.5) ax += `<line x1=\"${X(t)}\" x2=\"${X(t)}\" y1=\"${y0}\" y2=\"${y0 + h}\" stroke=\"#EEF0F2\"/><text x=\"${X(t)}\" y=\"${y0 + h + 14}\" font-size=\"10\" text-anchor=\"middle\" fill=\"#6E7679\">${t}</text>`;\n  const st = ymax > 2 ? 0.5 : ymax > 1 ? 0.25 : 0.1; for (let s = 0; s <= ymax; s += st) ax += `<line x1=\"${x0}\" x2=\"${x0 + w}\" y1=\"${Y(s)}\" y2=\"${Y(s)}\" stroke=\"#EEF0F2\"/><text x=\"${x0 - 6}\" y=\"${Y(s) + 3}\" font-size=\"10\" text-anchor=\"end\" fill=\"#6E7679\">${s.toFixed(2)}</text>`;\n  el.innerHTML = `<svg viewBox=\"0 0 ${W} ${H}\" style=\"width:100%;max-width:${W}px\">${ax}<line x1=\"${x0}\" x2=\"${x0}\" y1=\"${y0}\" y2=\"${y0 + h}\" stroke=\"#98A0A3\"/><line x1=\"${x0}\" x2=\"${x0 + w}\" y1=\"${y0 + h}\" y2=\"${y0 + h}\" stroke=\"#98A0A3\"/>\n  ${pl(nec, '#3D434A')}${pl(ine, '#3D434A', 1)}${pl(site, '#C9874F')}<text x=\"${x0 + w / 2}\" y=\"${H - 4}\" font-size=\"11\" text-anchor=\"middle\" fill=\"#1D2B36\">Per\u00edodo T (s)</text>\n  <text x=\"12\" y=\"${y0 + h / 2}\" font-size=\"11\" fill=\"#1D2B36\" transform=\"rotate(-90 12 ${y0 + h / 2})\" text-anchor=\"middle\">Sa (g)</text></svg>\n  <div class=\"mu\">${ok ? `<b style=\"color:#3D434A\">\u2501</b> NEC el\u00e1stico: Sa m\u00e1x = ${(eta * Z * Fa).toFixed(3)} g, Tc = ${Tc.toFixed(3)} s \u00b7 ` : ''}${ine.length ? `<b style=\"color:#3D434A\">\u254d</b> inel\u00e1stico de dise\u00f1o (\u00d7 I / R\u00b7\u03c6P\u00b7\u03c6E = ${(I / (R * pP * pE)).toFixed(3)}) \u00b7 ` : ''}${site.length ? `<b style=\"color:#C9874F\">\u2501</b> sitio (${site.length} puntos)` : ''}</div>`;\n}\n\n// Encargos, entregas y revisi\u00f3n\nfunction tabEncargos() {\n  const E = PROY.encargos, X = PROY.entregas;\n  return `<div class=\"acc\" style=\"margin-top:0\"><button class=\"chico\" onclick=\"asignar(2)\">Asignar trazado</button><button class=\"chico\" onclick=\"asignar(4)\">Asignar dibujo completo</button></div>\n  <div class=\"card\"><h3 style=\"margin-top:0\">Encargos</h3>${E.length ? `<table><tr><th>Etapa</th><th>Dibujante</th><th>Fecha</th><th>Estado</th></tr>${E.map(e => `<tr><td>${e.paso}. ${esc(e.etapa)}${e.tipo === 'MODIFICACION' ? ' <span class=\"b b-na\">Mod.' + (e.rev ? ' Rev ' + esc(e.rev) : '') + '</span>' : ''}<br><span class=\"mu\">${esc(e.que)}</span></td><td>${esc(e.dibujanteNombre)}</td><td>${dmy(e.fecha)}</td><td>${badge(e.estado)} ${badge(e.alerta)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin encargos.</p>'}</div>\n  <div class=\"card\"><h3 style=\"margin-top:0\">Entregas</h3>${X.length ? X.map(x => `<div style=\"border-bottom:1px solid #EEF0F2;padding:8px 0\"><b>${x.paso}. ${esc(x.etapa)}</b> \u00b7 ronda ${x.ronda} \u00b7 ${esc(x.dibujanteNombre)} \u00b7 ${dmy(x.fecha)} ${badge(x.estado)}\n    <div class=\"mu\">${x.laminas} l\u00e1m. \u00d7 ${usd(x.valor)} = ${usd(x.total)}${x.estado === 'APROBADA' ? ' \u00b7 aprobado ' + usd(x.totalAprobado) : ''}</div><div>${x.archivos.map(a => `<a target=\"_blank\" href=\"${esc(a.url)}\">${esc(a.nombre)}</a>`).join(' \u00b7 ')}</div>\n    ${x.revision.filter(r => r.res === 'NO').length ? '<ul style=\"margin:6px 0\">' + x.revision.filter(r => r.res === 'NO').map(r => `<li>${esc(r.item)}${r.lamina ? ' (l\u00e1m. ' + esc(r.lamina) + ')' : ''}: ${esc(r.obs)}</li>`).join('') + '</ul>' : ''}\n    ${x.estado === 'ENTREGADA' ? `<button class=\"chico\" onclick='abrirRevision(${JSON.stringify(PROY.p.id)},${JSON.stringify(x.id)})'>Revisar</button>` : ''}</div>`).join('') : '<p class=\"mu\">Sin entregas.</p>'}</div>`;\n}\nasync function abrirRevision(pid, entId) {\n  if (!PROY || PROY.p.id !== pid) PROY = await call('proyecto', { id: pid });\n  const x = PROY.entregas.filter(z => z.id === entId)[0]; if (!x) return toast('Entrega no encontrada');\n  const def = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);\n  modal(`<h2>Revisi\u00f3n estructural \u00b7 ${esc(PROY.p.nombre)}</h2><div class=\"mu\">${x.paso}. ${esc(x.etapa)} \u00b7 ${esc(x.dibujanteNombre)} \u00b7 ronda ${x.ronda} \u00b7 ${dmy(x.fecha)}</div>\n  <p>${x.archivos.map(a => `<a target=\"_blank\" href=\"${esc(a.url)}\">${esc(a.nombre)}</a>`).join('<br>')}</p>${x.nota ? '<p class=\"mu\">Nota: ' + esc(x.nota) + '</p>' : ''}${x.checklist ? '<p class=\"mu\">Lista de la dibujante: \u2713 ' + esc(x.checklist) + '</p>' : ''}\n  <table class=\"chk\">${PROY.checklist.map((c, i) => `<tr><td style=\"width:42%\">${esc(c)}</td><td class=\"r\"><label><input type=\"radio\" name=\"ck${i}\" value=\"SI\" onchange=\"revUI()\">S\u00ed</label><label><input type=\"radio\" name=\"ck${i}\" value=\"NO\" onchange=\"revUI()\">No</label><label><input type=\"radio\" name=\"ck${i}\" value=\"NA\" onchange=\"revUI()\">N/A</label></td>\n  <td><input id=\"ckl${i}\" placeholder=\"L\u00e1mina\" style=\"width:80px;display:none\"></td><td><input id=\"cko${i}\" placeholder=\"Qu\u00e9 corregir\" style=\"display:none\"></td></tr>`).join('')}</table>\n  <div class=\"acc\"><button class=\"chico sec\" onclick=\"document.querySelectorAll('.chk input[value=SI]').forEach(r=>r.checked=true);revUI()\">Marcar todo S\u00ed</button></div>\n  <div id=\"rv_ok\"><h3>Confirmar l\u00e1minas (pasan a \"por pagar\")</h3><div class=\"fila\"><div><label>L\u00e1minas</label><input id=\"rv_l\" type=\"number\" value=\"${x.laminas}\"></div><div><label>Valor por l\u00e1mina</label><input id=\"rv_v\" type=\"number\" step=\"0.01\" value=\"${x.valor}\"></div></div></div>\n  <div id=\"rv_no\" style=\"display:none\"><label>Nueva fecha para las correcciones</label><input id=\"rv_f\" type=\"date\" value=\"${def}\"></div>\n  <label>Nota para la dibujante (opcional)</label><input id=\"rv_n\"><div class=\"acc\"><button id=\"rv_b\" class=\"ok\" onclick=\"enviarRevision('${x.id}')\">Aprobar</button></div>`);\n}\nfunction revUI() {\n  let no = 0; PROY.checklist.forEach((c, i) => { const r = document.querySelector(`input[name=ck${i}]:checked`), es = r && r.value === 'NO'; if (es) no++; $('#ckl' + i).style.display = es ? 'block' : 'none'; $('#cko' + i).style.display = es ? 'block' : 'none'; });\n  $('#rv_ok').style.display = no ? 'none' : 'block'; $('#rv_no').style.display = no ? 'block' : 'none';\n  const b = $('#rv_b'); b.textContent = no ? 'Devolver con ' + no + ' observaci\u00f3n(es)' : 'Aprobar'; b.className = no ? 'ro' : 'ok';\n}\nasync function enviarRevision(id) {\n  const items = PROY.checklist.map((c, i) => { const r = document.querySelector(`input[name=ck${i}]:checked`); return r ? { item: c, res: r.value, lamina: $('#ckl' + i).value, obs: $('#cko' + i).value } : null; }).filter(Boolean);\n  const r = await call('revisar', { entregaId: id, items: items, laminas: $('#rv_l').value, valor: $('#rv_v').value, nuevaFecha: $('#rv_f').value, nota: $('#rv_n').value });\n  PROY = await call('proyecto', { id: PROY.p.id }); VISTA = 'proyecto'; pintarProyecto(); avisoWa(r);\n}\n\n// Cambios de arquitectura\nfunction tabCambios() {\n  const C = PROY.cambios;\n  return `<div class=\"card\"><h3 style=\"margin-top:0\">Registrar cambio de arquitectura</h3><p class=\"mu\">Sube la nueva versi\u00f3n a 01_Arquitectura, reabre solo las etapas afectadas y no genera cobros ni pagos extra. P\u00eddame en el chat la comparaci\u00f3n del DXF nuevo con el anterior.</p>\n  ${zonaSubida('ca', { proyectoId: PROY.p.id, paso: 0 })}<label>Qu\u00e9 cambi\u00f3</label><textarea id=\"ca_d\"></textarea>\n  <div class=\"fila\"><div><label>Pedido por</label><input id=\"ca_p\" placeholder=\"Cliente / arquitecto\"></div><div><label>Impacto</label><select id=\"ca_i\" onchange=\"$('#ca_m').style.display=this.value==='MENOR'?'block':'none'\"><option value=\"\">Elegir\u2026</option>\n  <option value=\"MENOR\">Menor: tabiques, acabados (actualizar l\u00e1minas)</option><option value=\"MODERADO\">Moderado: vanos, voladizos, aberturas (modelo local y planos)</option><option value=\"MAYOR\">Mayor: ejes, alturas, pisos, uso (volver al paso 1)</option></select></div></div>\n  <div id=\"ca_m\" style=\"display:none\"><div class=\"fila\"><div><label>Dibujante para la modificaci\u00f3n</label><select id=\"ca_dib\">${PROY.dibujantes.map(d => `<option value=\"${esc(d.email)}\">${esc(d.nombre)}</option>`).join('')}</select></div><div><label>Fecha de entrega</label><input id=\"ca_f\" type=\"date\"></div></div></div>\n  <div class=\"acc\"><button onclick=\"registrarCambio()\">Registrar cambio</button></div></div>\n  <div class=\"card\"><h3 style=\"margin-top:0\">Historial de revisiones</h3>${C.length ? `<table><tr><th>Rev</th><th>Fecha</th><th>Descripci\u00f3n</th><th>Impacto</th><th>Reabiertas</th><th class=\"n\">L\u00e1m. rehechas</th></tr>${C.map(c => `<tr><td><b>${esc(c.Rev)}</b></td><td>${dmy(c.Fecha)}</td><td>${esc(c['Descripci\u00f3n'])}<br><span class=\"mu\">${esc(c['Pedido por'])} ${esc(c.Archivo)}</span></td><td>${esc(c.Impacto)}</td><td>${esc(c['Pasos reabiertos'])}</td><td class=\"n\">${esc(c['L\u00e1minas rehechas'])}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin cambios registrados.</p>'}</div>`;\n}\nasync function registrarCambio() {\n  const r = await call('registrarCambio', { proyectoId: PROY.p.id, descripcion: $('#ca_d').value, pedidoPor: $('#ca_p').value, impacto: $('#ca_i').value, archivos: SUBIDOS.ca || [],\n    dibujante: $('#ca_i').value === 'MENOR' ? $('#ca_dib').value : '', fecha: $('#ca_f') ? $('#ca_f').value : '', laminas: $('#ca_l') ? $('#ca_l').value : '' });\n  SUBIDOS.ca = []; PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); avisoWa(r);\n}\n\n// Cuentas del proyecto\nfunction tabCuentasP() {\n  const p = PROY.p;\n  return `<div class=\"kpis\"><div class=\"kpi\"><div>Valor</div><b>${usd(p.valor)}</b></div><div class=\"kpi\"><div>Cobrado</div><b style=\"color:var(--ok)\">${usd(p.cobrado)}</b></div>\n  <div class=\"kpi\"><div>Por cobrar hoy</div><b style=\"color:var(--na)\">${usd(p.porPagarHoy)}</b></div><div class=\"kpi\"><div>A la entrega</div><b style=\"color:var(--az)\">${usd(p.aLaEntrega)}</b></div>\n  <div class=\"kpi\"><div>Costo de dibujo aprobado</div><b>${usd(p.costoDibujo)}</b></div><div class=\"kpi\"><div>Por pagar a dibujantes</div><b style=\"color:var(--na)\">${usd(p.porPagar)}</b></div><div class=\"kpi\"><div>Margen</div><b>${usd(p.margen)}</b></div></div>\n  <div class=\"acc\"><button onclick=\"formCobro('${p.id}')\">Registrar cobro del cliente</button><button class=\"sec\" onclick=\"formPago('${p.id}')\">Registrar pago a dibujante</button></div>\n  <div class=\"grid\" style=\"margin-top:12px\"><div class=\"card\"><h3 style=\"margin-top:0\">Cobros</h3>${movTabla(PROY.cobros)}${p.abonos > 0 ? `<p class=\"mu\">M\u00e1s ${usd(p.abonos)} de abonos a cuenta del cliente aplicados a este proyecto.</p>` : ''}</div><div class=\"card\"><h3 style=\"margin-top:0\">Pagos a dibujantes</h3>${movTabla(PROY.pagos, 1)}</div></div>`;\n}\nfunction movTabla(L, dib) { return L.length ? `<table>${L.map(m => `<tr><td>${dmy(m.Fecha)}</td><td>${dib ? esc(m.Dibujante) + '<br>' : ''}<span class=\"mu\">${esc(m.Detalle)}</span></td><td class=\"n\">${usd(m.Monto)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin registros.</p>'; }\nfunction formCobro(pid, cli) {\n  const cn = cli ? ((window.CUENTAS ? CUENTAS.clientes : []).filter(c => c.clave === cli)[0] || {}).nombre || cli : '';\n  modal(`<h2>${pid ? 'Registrar cobro' : 'Abono a cuenta \u00b7 ' + esc(cn)}</h2>${pid ? '' : '<p class=\"mu\">No va a un proyecto: se aplica solo a los proyectos del cliente con saldo, del m\u00e1s antiguo al m\u00e1s nuevo.</p>'}<div class=\"fila\"><div><label>Monto (USD)</label><input id=\"co_m\" type=\"number\" step=\"0.01\"></div><div><label>Fecha</label><input id=\"co_f\" type=\"date\" value=\"${hoy()}\"></div></div>\n  <label>Detalle</label><input id=\"co_d\" placeholder=\"Ej.: Anticipo 50 % \u00b7 transferencia\"><label>Comprobante (opcional)</label>${zonaSubida('co', pid ? { proyectoId: pid, paso: 99 } : { abono: 'cliente', cliente: cli, paso: 99 })}<div class=\"acc\"><button onclick=\"guardarCobro('${pid || ''}','${esc(cli || '')}')\">Registrar</button></div>`);\n}\nasync function guardarCobro(pid, cli) {\n  const r = await call('registrarCobro', { proyectoId: pid, cliente: cli, monto: $('#co_m').value, fecha: $('#co_f').value, detalle: $('#co_d').value, archivos: SUBIDOS.co || [] }); SUBIDOS.co = [];\n  modal(`<h2>Cobro registrado</h2><p>${esc(r.msg)}</p>${r.porPagar.length ? `<h3>Por pagar a dibujantes en este proyecto</h3><table>${r.porPagar.map(x => `<tr><td>${esc(x.nombre)}</td><td class=\"n\">${usd(x.monto)}</td><td class=\"der\"><button class=\"chico\" onclick=\"formPago('${pid}','${esc(x.email)}',${x.monto})\">Registrar pago</button></td></tr>`).join('')}</table>` : '<p class=\"mu\">No hay nada por pagar a dibujantes en este proyecto.</p>'}\n  <div class=\"acc\"><button class=\"sec\" onclick=\"cerrar();VISTA==='proyecto'&&'${pid}'?ir('proyecto','${pid}'):ir('cuentas')\">Cerrar</button></div>`);\n}\nfunction formPago(pid, email, monto) {\n  const D = (PROY && PROY.dibujantes) || (window.CUENTAS ? CUENTAS.dibujantes : []), P = window.CUENTAS ? CUENTAS.proyectos : [PROY.p];\n  modal(`<h2>Registrar pago a dibujante</h2><p class=\"mu\">La transferencia la hace usted por fuera; aqu\u00ed solo se registra y se le avisa.</p>\n  <div class=\"fila\"><div><label>Dibujante</label><select id=\"pa_d\">${D.map(d => `<option value=\"${esc(d.email)}\" ${d.email === email ? 'selected' : ''}>${esc(d.nombre)}</option>`).join('')}</select></div>\n  <div><label>Aplicar a</label><select id=\"pa_p\"><option value=\"\" ${pid ? '' : 'selected'}>Abono a su cuenta (sin proyecto)</option>${P.map(p => `<option value=\"${esc(p.id)}\" ${p.id === pid ? 'selected' : ''}>${esc(p.nombre)}</option>`).join('')}</select></div>\n  <div><label>Monto (USD)</label><input id=\"pa_m\" type=\"number\" step=\"0.01\" value=\"${monto || ''}\"></div><div><label>Fecha</label><input id=\"pa_f\" type=\"date\" value=\"${hoy()}\"></div><div><label>L\u00e1minas</label><input id=\"pa_l\"></div></div>\n  <label>Detalle</label><input id=\"pa_x\" placeholder=\"Ej.: Transferencia Banco Guayaquil\"><label>Comprobante (opcional)</label>${zonaSubida('pa', pid ? { proyectoId: pid, paso: 99 } : { abono: 'dibujante', paso: 99 })}\n  <div class=\"acc\"><button onclick=\"guardarPago()\">Registrar pago</button></div>`);\n}\nasync function guardarPago() {\n  const pid = $('#pa_p').value, r = await call('registrarPago', { proyectoId: pid, dibujante: $('#pa_d').value, monto: $('#pa_m').value, fecha: $('#pa_f').value, laminas: $('#pa_l').value, detalle: $('#pa_x').value, archivos: SUBIDOS.pa || [] });\n  SUBIDOS.pa = []; cerrar(); toast(r.msg); VISTA === 'proyecto' && pid ? ir('proyecto', pid) : ir('cuentas');\n}\nfunction tabDatos() {\n  const p = PROY.p;\n  return `<div class=\"card\"><label>Cliente</label><select id=\"dp_c\">${PROY.clientes.map(c => `<option value=\"${esc(c.Clave)}\" ${c.Clave === p.cliente ? 'selected' : ''}>${esc(c.Contratante)}</option>`).join('')}</select>\n  <div class=\"fila\"><div><label>Proyecto</label><input id=\"dp_n\" value=\"${esc(p.nombre)}\"></div><div><label>Descripci\u00f3n</label><input id=\"dp_d\" value=\"${esc(p.desc)}\"></div><div><label>Servicio</label><input id=\"dp_s\" value=\"${esc(p.servicio)}\"></div></div>\n  <div class=\"fila\"><div><label>Valor del contrato (USD)</label><input id=\"dp_v\" type=\"number\" step=\"0.01\" value=\"${p.valor || ''}\"></div><div><label>Anticipo %</label><input id=\"dp_a\" type=\"number\" value=\"${p.anticipo}\"></div>\n  <div><label>Fecha de entrega al cliente</label><input id=\"dp_f\" type=\"date\" value=\"${esc(p.entrega || '')}\"></div><div><label>Entregado al cliente</label><select id=\"dp_e\"><option value=\"NO\">No</option><option value=\"SI\" ${p.entregado ? 'selected' : ''}>S\u00ed</option></select></div></div>\n  <label>Notas</label><textarea id=\"dp_x\">${esc(PROY.notas)}</textarea><div class=\"acc\"><button onclick=\"guardarDatos()\">Guardar</button><button class=\"sec\" onclick=\"prepCarpetas()\">Revisar carpetas</button></div>\n  <p class=\"mu\">\"Entregado\" se marca solo al aprobar la memoria (paso 10); con eso el saldo pasa a \"por pagar hoy\" en el estado de cuenta.</p></div>` + zonaPeligro();\n}\nasync function guardarDatos() { await call('guardarProyecto', { ID: PROY.p.id, Cliente: $('#dp_c').value, Proyecto: $('#dp_n').value, 'Descripci\u00f3n': $('#dp_d').value, Servicio: $('#dp_s').value, 'Valor contrato': $('#dp_v').value, 'Anticipo %': $('#dp_a').value, Entregado: $('#dp_e').value, 'Fecha entrega': $('#dp_f').value, Notas: $('#dp_x').value }); toast('Guardado'); ir('proyecto', PROY.p.id); }\nfunction zonaPeligro() {\n  return `<div class=\"card\" style=\"border-color:#E3C9C6\"><h3 style=\"margin-top:0\">Archivar o eliminar</h3>\n  <p class=\"mu\"><b>Archivar</b> (recomendado): el proyecto sale del inicio, de los totales y del resumen diario, pero se conserva todo (cuentas, archivos, historial). Se restaura cuando quiera.</p>\n  <p class=\"mu\"><b>Eliminar</b>: borra el proyecto del portal. Solo se permite si no tiene cobros, pagos ni entregas registradas.</p>\n  <div class=\"acc\"><button class=\"sec\" onclick=\"archivar('${PROY.p.id}',false)\">Archivar</button><button style=\"background:var(--ro)\" onclick=\"eliminarModal()\">Eliminar\u2026</button></div></div>`;\n}\nasync function archivar(id, restaurar) { const r = await call('archivarProyecto', { id: id, restaurar: restaurar }); toast(r.msg, 6000); ir(restaurar ? 'proyecto' : 'inicio', restaurar ? id : undefined); }\nfunction eliminarModal() {\n  modal(`<h2>Eliminar proyecto</h2><p>Esto borra <b>${esc(PROY.p.nombre)}</b> del portal: etapas, ficha t\u00e9cnica, encargos y cambios. No se puede deshacer.</p>\n  <label><input type=\"checkbox\" id=\"el_c\" style=\"width:auto\"> Enviar tambi\u00e9n la carpeta de Drive a la papelera (se recupera hasta 30 d\u00edas)</label>\n  <label>Para confirmar, escriba el nombre del proyecto</label><input id=\"el_n\" placeholder=\"${esc(PROY.p.nombre)}\">\n  <div class=\"acc\"><button class=\"sec\" onclick=\"cerrar()\">Cancelar</button><button style=\"background:var(--ro)\" onclick=\"eliminarOk()\">Eliminar definitivamente</button></div>`);\n}\nasync function eliminarOk() { const r = await call('eliminarProyecto', { id: PROY.p.id, confirmar: $('#el_n').value, carpeta: $('#el_c').checked }); cerrar(); toast(r.msg, 8000); PROY = null; ir('inicio'); }\nasync function prepCarpetas() { const r = await call('prepararCarpetas', { id: PROY.p.id }); toast(r.msg, 8000); }\n\n// \u2500\u2500 CUENTAS (JUAN) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarCuentas(C) {\n  window.CUENTAS = C; PROY = null;\n  let h = `<h2 style=\"margin-top:4px\">Clientes</h2><div class=\"card\"><table><tr><th>Cliente</th><th class=\"n\">Contratado</th><th class=\"n\">Cobrado</th><th class=\"n\">Saldo</th><th></th></tr>${C.clientes.map(c => `<tr><td><b>${esc(c.nombre)}</b><br><span class=\"mu\">${esc(c.contacto)} ${esc(c.correo)}</span></td><td class=\"n\">${usd(c.valor)}</td><td class=\"n\">${usd(c.cobrado)}</td><td class=\"n\"><b>${usd(c.porCobrar)}</b></td>\n  <td class=\"der\"><button class=\"chico\" onclick=\"verEstado('cliente','${esc(c.clave)}')\">Estado de cuenta</button> <button class=\"chico sec\" onclick=\"formCobroG('${esc(c.clave)}')\">Abono</button>${c.aFavor > 0 ? '<br><span class=\"mu\">A favor: ' + usd(c.aFavor) + '</span>' : ''}</td></tr>`).join('')}</table>\n  <div class=\"acc\"><button class=\"chico sec\" onclick=\"formCobroG()\">Registrar cobro</button></div></div>\n  <h2>Dibujantes</h2><div class=\"card\"><table><tr><th>Dibujante</th><th class=\"n\">Aprobado</th><th class=\"n\">Pagado</th><th class=\"n\">Por pagar</th><th class=\"n\">Por confirmar</th><th></th></tr>${C.dibujantes.map(d => `<tr><td><b>${esc(d.nombre)}</b></td><td class=\"n\">${usd(d.aprobado)}</td><td class=\"n\">${usd(d.pagado)}</td><td class=\"n\"><b style=\"color:var(--na)\">${usd(d.porPagar)}</b></td><td class=\"n mu\">${usd(d.porConfirmar)}</td>\n  <td class=\"der\"><button class=\"chico\" onclick=\"verEstado('dibujante','${esc(d.email)}')\">Estado</button> <button class=\"chico sec\" onclick=\"formPago('','${esc(d.email)}')\">Pago</button></td></tr>`).join('')}</table></div>\n  <h2>\u00daltimos movimientos</h2><div class=\"card\">${C.movimientos.length ? `<table>${C.movimientos.map(m => `<tr><td>${dmy(m.Fecha)}</td><td>${m.Tipo === 'COBRO' ? '<span class=\"b b-ok\">Cobro</span>' : '<span class=\"b b-na\">Pago</span>'}</td><td>${m['Proyecto ID'] ? esc((C.proyectos.filter(p => p.id === m['Proyecto ID'])[0] || {}).nombre || '') : '<i>Abono a cuenta</i>'}<br><span class=\"mu\">${esc(m.Dibujante || m.Cliente)} \u00b7 ${esc(m.Detalle)}</span></td><td class=\"n\">${usd(m.Monto)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin movimientos.</p>'}</div>`;\n  marco(h);\n}\nconst opP = c => `<option value=\"\">Abono a cuenta (sin proyecto)</option>` + CUENTAS.proyectos.filter(p => p.cliente === c).map(p => `<option value=\"${esc(p.id)}\">${esc(p.nombre)}</option>`).join('');\nfunction formCobroG(cli) {\n  cli = cli || (CUENTAS.clientes[0] || {}).clave;\n  modal(`<h2>Registrar cobro</h2><label>Cliente</label><select id=\"cg_c\" onchange=\"$('#cg_p').innerHTML=opP(this.value)\">${CUENTAS.clientes.map(c => `<option value=\"${esc(c.clave)}\" ${c.clave === cli ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select>\n  <label>Aplicar a</label><select id=\"cg_p\">${opP(cli)}</select><p class=\"mu\">Los abonos a cuenta se aplican solos a los proyectos con saldo, del m\u00e1s antiguo al m\u00e1s nuevo.</p><div class=\"acc\"><button onclick=\"formCobro($('#cg_p').value,$('#cg_c').value)\">Continuar</button></div>`);\n}\nasync function verEstado(tipo, clave) {\n  const r = await call('estadoCuenta', { tipo: tipo, clave: clave });\n  modal(`<h2>Estado de cuenta</h2><div class=\"ecw\" id=\"ec_w\"><iframe id=\"ec_if\" style=\"width:820px;height:1100px\"></iframe></div>\n  <div class=\"acc\">${ROL === 'ADMIN' ? `<button onclick=\"enviarEstado('${tipo}','${esc(clave)}')\">Enviar por correo${r.para ? ' a ' + esc(r.para) : ''}</button>` : ''}<button class=\"sec\" onclick=\"descargarEstado('${tipo}','${esc(clave)}')\">Descargar PDF</button></div>`);\n  const f = $('#ec_if'), w = $('#ec_w');\n  const ajustar = () => { let h = 1100; try { h = f.contentDocument.documentElement.scrollHeight || h; } catch (e) { } f.style.height = h + 'px';\n    const s = Math.min(1, w.clientWidth / 820); f.style.transform = 'scale(' + s + ')'; w.style.height = Math.ceil(h * s) + 'px'; };\n  f.onload = () => { ajustar(); setTimeout(ajustar, 300); }; f.srcdoc = r.html; window.addEventListener('resize', ajustar);\n}\nasync function enviarEstado(tipo, clave) {\n  const r = await call('enviarEstado', { tipo: tipo, clave: clave });\n  modal(`<h2>Enviado</h2><p>${esc(r.msg)}</p>${r.pdf ? `<p><a target=\"_blank\" href=\"${esc(r.pdf)}\">Ver el PDF en Drive</a></p>` : ''}${r.wa ? '<p>Env\u00edelo tambi\u00e9n por WhatsApp (un toque):</p>' + waBtn(r.wa) : ''} <button class=\"sec\" onclick=\"cerrar()\">Cerrar</button>`);\n}\nasync function descargarEstado(tipo, clave) {\n  const r = await call('descargarEstado', { tipo: tipo, clave: clave });\n  const bin = atob(r.b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);\n  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([u8], { type: 'application/pdf' })); a.download = r.nombre; a.target = '_blank'; document.body.appendChild(a); a.click(); a.remove();\n}\n\n// \u2500\u2500 AJUSTES \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarAjustes(A) {\n  const fila = (t, campos, o, accion) => `<tr>${campos.map(c => `<td><input data-c=\"${c}\" value=\"${esc(o[c] == null ? '' : String(o[c]).replace(/^'/, ''))}\"></td>`).join('')}<td><button class=\"chico\" onclick=\"guardarAj(this,'${accion}')\">Guardar</button></td></tr>`;\n  const U = ['Correo', 'Nombre', 'Iniciales', 'Rol', 'WhatsApp', 'Zona horaria', 'Valor l\u00e1mina', 'Activo'], Cc = ['Clave', 'Contratante', 'Contacto', 'Correo', 'WhatsApp', 'Carpeta ID', 'Activo'];\n  SUBIDOS.pl = [];\n  marco(`<p class=\"mu\">Portal versi\u00f3n ${esc(A.version || '')} \u00b7 Correos disponibles hoy: ${A.cuota}. \u00b7 C\u00f3digo: <a target=\"_blank\" href=\"https://github.com/JuanVanegas95/cev-portal/blob/main/codigo/Codigo.gs\">GitHub</a></p>\n  <h2>Plantilla de dibujo CEV</h2><div class=\"card\">${A.plantilla ? `<p>Actual: <a target=\"_blank\" href=\"${esc(A.plantilla.descarga)}\">${esc(A.plantilla.nombre)}</a></p>` : '<p class=\"mu\">Todav\u00eda no hay plantilla. Suba su .dwt o .dwg con r\u00f3tulo y capas EST-; las dibujantes la ver\u00e1n en cada encargo y en el correo.</p>'}\n  ${zonaSubida('pl', { plantilla: 1, paso: 0 })}<div class=\"acc\"><button onclick=\"guardarPlantilla()\">Guardar como plantilla</button></div></div>\n  <h2>Usuarios</h2><div class=\"card\" style=\"overflow:auto\"><table><tr>${U.map(c => `<th>${c}</th>`).join('')}<th></th></tr>${A.usuarios.map(o => fila('u', U, o, 'guardarUsuario')).join('')}${fila('u', U, { Rol: 'DIBUJANTE', 'Zona horaria': 'America/Guayaquil', 'Valor l\u00e1mina': 35, Activo: 'SI' }, 'guardarUsuario')}</table>\n  <p class=\"mu\">Rol: ADMIN o DIBUJANTE. Zona horaria: America/Guayaquil, Europe/Rome\u2026 Activo: SI o NO. La \u00faltima fila sirve para agregar.</p></div>\n  <h2>Clientes</h2><div class=\"card\" style=\"overflow:auto\"><table><tr>${Cc.map(c => `<th>${c}</th>`).join('')}<th></th></tr>${A.clientes.map(o => fila('c', Cc, o, 'guardarCliente')).join('')}${fila('c', Cc, { Activo: 'SI' }, 'guardarCliente')}</table><p class=\"mu\">Carpeta ID vac\u00eda: se crea en Contratantes con el nombre del cliente.</p></div>\n  <h2>Configuraci\u00f3n</h2><div class=\"card\">${A.config.map(o => `<div class=\"fila\" style=\"align-items:end\"><div><label>${esc(o.Clave)}</label>${/Datos de pago|Despu\u00e9s/.test(o.Clave) ? `<textarea data-c=\"Valor\">${esc(o.Valor)}</textarea>` : `<input data-c=\"Valor\" value=\"${esc(o.Valor)}\">`}<input type=\"hidden\" data-c=\"Clave\" value=\"${esc(o.Clave)}\"><div class=\"mu\">${esc(o.Nota)}</div></div><div><button class=\"chico\" onclick=\"guardarAj(this,'guardarConfig')\">Guardar</button></div></div>`).join('')}</div>`);\n}\nasync function guardarPlantilla() { const r = await call('guardarPlantilla', { archivos: SUBIDOS.pl || [] }); SUBIDOS.pl = []; toast(r.msg, 6000); ir('ajustes'); }\nasync function guardarAj(btn, accion) { const box = btn.closest('tr') || btn.closest('.fila'), o = {}; box.querySelectorAll('[data-c]').forEach(i => o[i.dataset.c] = i.value); const r = await call(accion, o); toast(r.msg); ir('ajustes'); }\n\n// \u2500\u2500 DIBUJANTE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarDibujante() {\n  const D = DATA, c = D.cuenta, ab = D.encargos.filter(e => ['ASIGNADO', 'CORRECCIONES'].indexOf(e.estado) >= 0), otros = D.encargos.filter(e => ab.indexOf(e) < 0);\n  const tarjeta = e => `<div class=\"card\" style=\"cursor:pointer\" onclick=\"ir('encargo','${e.id}')\"><div class=\"mu\">${esc(e.cliente)}</div><b style=\"font-size:15px\">${esc(e.proyecto)}</b>\n    <div>${e.paso}. ${esc(e.etapa)} ${e.tipo === 'MODIFICACION' ? '<span class=\"b b-na\">Modificaci\u00f3n</span>' : ''} ${badge(e.estado)} ${badge(e.alerta)}</div>\n    ${e.meta && ['ASIGNADO', 'CORRECCIONES'].indexOf(e.estado) >= 0 ? `<div style=\"margin-top:6px\">${metaTxt(e.meta)}</div>` : ''}\n    <div class=\"mu\" style=\"margin-top:6px\">${e.tipo === 'MODIFICACION' ? 'Entrega' : 'Entrega del proyecto'}: <b>${dmy(e.fecha)}</b>${e.dias != null && ['ASIGNADO', 'CORRECCIONES'].indexOf(e.estado) >= 0 ? ' \u00b7 ' + (e.dias < 0 ? Math.abs(e.dias) + ' d\u00edas de atraso' : e.dias + ' d\u00edas') : ''}</div></div>`;\n  marco(`<h1>Hola, ${esc(D.yo.nombre)}</h1><h2>Encargos abiertos</h2>${ab.length ? '<div class=\"grid\">' + ab.map(tarjeta).join('') + '</div>' : '<p class=\"mu\">No tiene encargos abiertos.</p>'}\n  <h2>Mi estado de cuenta</h2><div class=\"kpis\"><div class=\"kpi\"><div>Aprobado</div><b>${usd(c.aprobado)}</b></div><div class=\"kpi\"><div>Pagado</div><b style=\"color:var(--ok)\">${usd(c.pagado)}</b></div>\n  <div class=\"kpi\"><div>Por pagar</div><b style=\"color:var(--na)\">${usd(c.porPagar)}</b></div><div class=\"kpi\"><div>Por confirmar</div><b class=\"mu\">${usd(c.porConfirmar)}</b></div></div>\n  <div class=\"acc\" style=\"margin-top:0\"><button class=\"sec\" onclick=\"verEstado('dibujante','')\">Ver y descargar estado de cuenta</button></div>\n  ${otros.length ? '<h2>Anteriores</h2><div class=\"grid\">' + otros.map(tarjeta).join('') + '</div>' : ''}`);\n}\nfunction pintarEncargo(r) {\n  const e = r.e, abierto = ['ASIGNADO', 'CORRECCIONES'].indexOf(e.estado) >= 0, ult = r.entregas[0];\n  const obs = ult && ult.estado === 'CON OBSERVACIONES' ? ult.revision.filter(x => x.res === 'NO') : [];\n  SUBIDOS.en = [];\n  marco(`<div class=\"mu\"><a onclick=\"ir('inicio')\" style=\"cursor:pointer\">\u2190 Volver</a> \u00b7 ${esc(e.cliente)}</div><h1 style=\"margin:6px 0\">${esc(e.proyecto)}</h1>\n  <div>${e.paso}. ${esc(e.etapa)} ${e.tipo === 'MODIFICACION' ? '<span class=\"b b-na\">Modificaci\u00f3n' + (e.rev ? ' \u00b7 Rev. ' + esc(e.rev) : '') + '</span>' : ''} ${badge(e.estado)} ${badge(e.alerta)}</div>\n  <div class=\"card\" style=\"margin-top:12px\"><table><tr><td class=\"mu\" style=\"width:150px\">Qu\u00e9 entregar</td><td>${esc(e.que).replace(/\\n/g, '<br>')}</td></tr>${e.meta ? `<tr><td class=\"mu\">Meta de su etapa</td><td><b>${dmy(e.meta)}</b> ${metaTxt(e.meta)}</td></tr>` : ''}<tr><td class=\"mu\">${e.tipo === 'MODIFICACION' ? 'Fecha de entrega' : 'Entrega del proyecto completo al cliente'}</td><td><b>${esc(r.limite)}</b></td></tr>\n  ${r.plantilla ? `<tr><td class=\"mu\">Plantilla CEV</td><td><a target=\"_blank\" href=\"${esc(r.plantilla.descarga)}\">\u2b07 ${esc(r.plantilla.nombre)}</a></td></tr>` : ''}\n  ${e.obs ? `<tr><td class=\"mu\">Observaciones</td><td>${esc(e.obs)}</td></tr>` : ''}\n  ${(r.adjuntos || []).length ? `<tr><td class=\"mu\">Predimensionamiento</td><td>${r.adjuntos.map(a => `<a target=\"_blank\" href=\"${esc(a.url)}\">${/^Nota de voz/i.test(a.nombre) ? '\ud83c\udf99 ' : '\ud83d\udcce '}${esc(a.nombre)}</a>`).join('<br>')}</td></tr>` : ''}\n  <tr><td class=\"mu\">Archivos base</td><td>${Object.keys(r.carpetas).map(k => `<a target=\"_blank\" href=\"${esc(r.carpetas[k])}\">${esc(k)}</a>`).join(' \u00b7 ') || '\u2014'}</td></tr></table></div>\n  ${obs.length ? `<div class=\"card\" style=\"border-color:#F2C1BB\"><h3 style=\"margin-top:0;color:var(--ro)\">Correcciones pedidas (ronda ${ult.ronda})</h3><ol>${obs.map(x => `<li><b>${esc(x.item)}</b>${x.lamina ? ' \u00b7 l\u00e1mina ' + esc(x.lamina) : ''}: ${esc(x.obs)}</li>`).join('')}</ol>${ult.nota ? '<p>' + esc(ult.nota) + '</p>' : ''}</div>` : ''}\n  ${abierto && r.qr ? `<div class=\"card\"><h3 style=\"margin-top:0\">QR para el r\u00f3tulo \u00b7 Rev. ${r.qr.rev}</h3>${bloqueQR('qe', r.qr.url, 'CEV \u00b7 Rev. ' + r.qr.rev, 'QR_' + r.qr.proyecto + '_Rev' + r.qr.rev + '.png')}</div>` : ''}\n  ${abierto ? `<div class=\"card\"><h3 style=\"margin-top:0\">Subir entrega</h3><p class=\"mu\">Suba el <b>DWG</b> y tambi\u00e9n el <b>DXF</b> (Guardar como \u2192 DXF AutoCAD 2018), dibujados desde la plantilla de capas EST-. Puede subir PDF de apoyo.</p>\n  ${zonaSubida('en', { encargoId: e.id })}<div class=\"fila\"><div><label>N\u00famero de l\u00e1minas${e.tipo === 'MODIFICACION' ? ' nuevas (las modificadas no suman)' : ''}</label><input id=\"en_l\" type=\"number\" value=\"${e.tipo === 'MODIFICACION' ? 0 : (e.laminas || '')}\"></div>\n  <div><label>Valor por l\u00e1mina (USD)</label><input id=\"en_v\" type=\"number\" step=\"0.01\" value=\"${r.valorDef}\"></div><div><label>Total</label><input id=\"en_t\" disabled></div></div>\n  ${(r.checklist || []).length ? `<h3>Antes de enviar, confirme</h3><div id=\"en_ck\">${r.checklist.map((t, i) => `<label style=\"display:flex;gap:8px;align-items:flex-start;font-weight:normal;margin:6px 0\"><input type=\"checkbox\" data-i=\"${i}\" style=\"width:auto;margin-top:3px\"> <span>${esc(t)}</span></label>`).join('')}</div>` : ''}\n  <label>Nota para Juan (opcional)</label><input id=\"en_n\"><div class=\"acc\"><button onclick=\"entregar('${e.id}')\">Enviar entrega</button></div></div>` : ''}\n  <div class=\"card\"><h3 style=\"margin-top:0\">Mis entregas</h3>${r.entregas.length ? r.entregas.map(x => `<div style=\"padding:6px 0;border-bottom:1px solid #EEF0F2\">Ronda ${x.ronda} \u00b7 ${dmy(x.fecha)} ${badge(x.estado)} <span class=\"mu\">${x.laminas} l\u00e1m. \u00d7 ${usd(x.valor)}${x.estado === 'APROBADA' ? ' \u00b7 aprobado ' + usd(x.totalAprobado) : ''}</span><div>${x.archivos.map(a => `<a target=\"_blank\" href=\"${esc(a.url)}\">${esc(a.nombre)}</a>`).join(' \u00b7 ')}</div></div>`).join('') : '<p class=\"mu\">A\u00fan no hay entregas.</p>'}</div>`);\n  const tot = () => { if ($('#en_t')) $('#en_t').value = usd((Number($('#en_l').value) || 0) * (Number($('#en_v').value) || 0)); };\n  if ($('#en_l')) { $('#en_l').oninput = tot; $('#en_v').oninput = tot; tot(); }\n}\nasync function entregar(id) {\n  const A = SUBIDOS.en || [];\n  if (!A.some(a => /\\.dwg$/i.test(a.nombre)) || !A.some(a => /\\.dxf$/i.test(a.nombre))) return toast('Falta subir el DWG y el DXF.', 6000);\n  const ck = [...document.querySelectorAll('#en_ck input')].map(x => x.checked);\n  if (ck.some(x => !x)) return toast('Marque todos los puntos de la lista antes de enviar.', 6000);\n  const r = await call('entregar', { encargoId: id, archivos: A, laminas: $('#en_l').value, valor: $('#en_v').value, nota: $('#en_n').value, check: ck });\n  SUBIDOS.en = []; toast(r.msg, 6000); ir('inicio');\n}\n\n// \u2500\u2500 SUBIDA DE ARCHIVOS (por trozos, archivos grandes) \u2500\u2500\nconst SUBIDOS = {};\nfunction zonaSubida(k, ctx) {\n  SUBIDOS[k] = SUBIDOS[k] || [];\n  return `<div class=\"drop\"><input type=\"file\" ${ctx.ext ? 'accept=\"' + ctx.ext.map(e => '.' + e).join(',') + '\"' : 'multiple'} onchange='subirArchivos(this,${JSON.stringify(k)},${JSON.stringify(ctx)})' style=\"border:0\"><div id=\"up_${k}\" class=\"prog\">${SUBIDOS[k].map(a => '\u2713 ' + esc(a.nombre)).join('<br>')}</div></div>`;\n}\nconst b64 = blob => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1]); r.onerror = no; r.readAsDataURL(blob); });\nasync function subirArchivos(inp, k, ctx) {\n  const files = [].slice.call(inp.files); inp.disabled = true;\n  if (ctx.ext) { const malos = files.filter(f => !new RegExp('\\\\.(' + ctx.ext.join('|') + ')$', 'i').test(f.name)); if (malos.length) { toast('Este espacio solo acepta .' + ctx.ext.join(' o .') + ': ' + malos.map(f => f.name).join(', '), 7000); inp.disabled = false; inp.value = ''; return; } }\n  await subirLista(files, k, ctx);\n  inp.disabled = false; inp.value = '';\n  if (ctx.req) verArchivos(ctx.paso);\n}\nasync function subirLista(files, k, ctx) {\n  const box = $('#up_' + k);\n  for (const f of files) {\n    const linea = document.createElement('div'); box.appendChild(linea);\n    try {\n      linea.textContent = f.name + ': preparando\u2026';\n      const ini = await call('iniciarSubida', Object.assign({ nombre: f.name, mime: f.type || 'application/octet-stream', tam: f.size }, ctx), true);\n      let pos = 0, fin = null;\n      if (f.size === 0) throw new Error('archivo vac\u00edo');\n      while (pos < f.size) {\n        const parte = f.slice(pos, Math.min(pos + ini.trozo, f.size));\n        const r = await call('subirTrozo', { sid: ini.sid, b64: await b64(parte), inicio: pos, tam: f.size }, true);\n        pos += parte.size; linea.textContent = f.name + ': ' + Math.round(pos / f.size * 100) + '%';\n        if (r.listo) fin = r;\n      }\n      if (!fin) throw new Error('Drive no confirm\u00f3 el archivo');\n      SUBIDOS[k].push({ id: fin.id, nombre: f.name, url: fin.url }); linea.innerHTML = '\u2713 ' + esc(f.name) + (fin.ficha ? ' \u00b7 <b>ficha t\u00e9cnica: ' + fin.ficha + ' datos tomados del modelo</b>' : fin.fichaError ? ' \u00b7 <span style=\"color:var(--ro)\">ficha: ' + esc(fin.fichaError) + '</span>' : '');\n    } catch (e) { linea.innerHTML = '<span style=\"color:var(--ro)\">\u2717 ' + esc(f.name) + ': ' + esc(e.message || e) + '</span>'; }\n  }\n}\n\n// \u2500\u2500 NOTA DE VOZ \u2500\u2500\n// En la app CEV (GitHub Pages) graba la p\u00e1gina principal, que s\u00ed tiene permiso de micr\u00f3fono, y devuelve el audio por postMessage.\n// Fuera de la app: intenta grabar aqu\u00ed; si el navegador no lo permite, abre la grabadora/selector de audio del tel\u00e9fono.\nlet VOZ = null;\nconst nombreVoz = mime => 'Nota de voz ' + new Date().toTimeString().slice(0, 5).replace(':', 'h') + (/mp4|aac|m4a/.test(mime) ? '.m4a' : /ogg/.test(mime) ? '.ogg' : '.webm');\nfunction notaVoz(k, ctx) {\n  VOZ = { k: k, ctx: ctx };\n  if (window.top !== window) { let ok = false; const t = setTimeout(() => { if (!ok) grabarAqui(); }, 700);\n    VOZ.ping = () => { ok = true; clearTimeout(t); }; window.top.postMessage({ cev: 'grabar' }, '*'); }\n  else grabarAqui();\n}\nwindow.addEventListener('message', async ev => {\n  const m = ev.data || {}; if (!m.cev || !VOZ) return;\n  if (m.cev === 'listo') { VOZ.ping && VOZ.ping(); return; }\n  if (m.cev === 'audio') { const bin = atob(m.b64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);\n    await subirLista([new File([u], nombreVoz(m.mime), { type: m.mime })], VOZ.k, VOZ.ctx); }\n});\nasync function grabarAqui() {\n  try {\n    const st = await navigator.mediaDevices.getUserMedia({ audio: true }), rec = new MediaRecorder(st), partes = [];\n    rec.ondataavailable = e => partes.push(e.data);\n    rec.onstop = async () => { st.getTracks().forEach(t => t.stop()); cerrar(); const mime = rec.mimeType || 'audio/webm';\n      await subirLista([new File(partes, nombreVoz(mime), { type: mime })], VOZ.k, VOZ.ctx); };\n    rec.start(); const t0 = Date.now(); VOZ.rec = rec;\n    modal2(`<h2>\ud83c\udf99 Grabando\u2026</h2><p id=\"voz_t\" style=\"font-size:22px\">0:00</p><div class=\"acc\"><button onclick=\"VOZ.rec.stop()\">Detener y adjuntar</button></div>`);\n    VOZ.int = setInterval(() => { const s = Math.round((Date.now() - t0) / 1000), el = $('#voz_t'); if (el) el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); else clearInterval(VOZ.int); }, 500);\n  } catch (e) {\n    const i = document.createElement('input'); i.type = 'file'; i.accept = 'audio/*'; i.setAttribute('capture', '');\n    i.onchange = () => subirLista([].slice.call(i.files), VOZ.k, VOZ.ctx); i.click();\n  }\n}\nfunction modal2(h) { const d = document.createElement('div'); d.id = 'voz_m'; d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:99';\n  d.innerHTML = '<div class=\"card\" style=\"min-width:260px;text-align:center\">' + h + '</div>'; document.body.appendChild(d);\n  const old = window.cerrar; window.cerrar = function () { const x = $('#voz_m'); if (x) { x.remove(); window.cerrar = old; } else old(); }; }\n\narrancar();\n</script></body></html>\n";
