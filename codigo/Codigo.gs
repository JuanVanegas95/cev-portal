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
  ETA: ['P_Etapas', ['Proyecto ID', 'Paso', 'Etapa', 'Estado', 'Actualizado', 'Por', 'Archivos', 'Nota']],
  FIC: ['P_Ficha', ['Proyecto ID', 'Clave', 'Valor', 'Actualizado']],
  ENC: ['P_Encargos', ['ID', 'Proyecto ID', 'Paso', 'Tipo', 'Dibujante', 'Qué entregar', 'Láminas estimadas', 'Fecha límite', 'Estado', 'Ronda',
    'Asignado', 'Observaciones Juan', 'Recordatorio enviado', 'Atraso enviado', 'Rev arquitectura', 'Adjuntos']],
  ENT: ['P_Entregas', ['ID', 'Encargo ID', 'Proyecto ID', 'Paso', 'Ronda', 'Fecha', 'Dibujante', 'Archivos', 'Láminas', 'Valor lámina', 'Total declarado',
    'Estado', 'Láminas aprobadas', 'Valor aprobado', 'Total aprobado', 'Revisado', 'Nota']],
  REV: ['P_Revisiones', ['Entrega ID', 'Ítem', 'Resultado', 'Lámina', 'Observación', 'Fecha']],
  MOV: ['P_Movimientos', ['ID', 'Fecha', 'Tipo', 'Proyecto ID', 'Cliente', 'Dibujante', 'Monto', 'Láminas', 'Detalle', 'Comprobante', 'Registrado']],
  CAM: ['P_Cambios', ['Proyecto ID', 'Rev', 'Fecha', 'Pedido por', 'Descripción', 'Impacto', 'Pasos reabiertos', 'Archivo', 'Láminas rehechas', 'Valor cobro']],
  PRF: ['P_Proformas', ['ID', 'Número', 'Fecha', 'Cliente', 'Atención', 'Proyecto', 'Proyecto ID', 'Estado', 'Ítems', 'Subtotal', 'Descuento', 'IVA %', 'Total',
    'Anticipo %', 'Forma de pago', 'Plazo', 'Exclusiones', 'Condiciones', 'Validez días', 'Archivo', 'Enviada', 'Respuesta', 'Nota']],
  CFG: ['P_Config', ['Clave', 'Valor', 'Nota']],
  LOG: ['P_Log', ['Fecha', 'Usuario', 'Acción', 'Detalle']]
};

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
function doGet() {
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
  } catch (err) { return { ok: false, msg: String(err && err.message || err) }; }
}

const ACCIONES = {
  inicio: { fn: (u) => u.rol === 'ADMIN' ? inicioAdmin_() : inicioDibujante_(u) },
  proyecto: { admin: 1, fn: (u, d) => detalleProyecto_(d.id) },
  encargo: { fn: (u, d) => detalleEncargo_(u, d.id) },
  guardarProyecto: { admin: 1, w: 1, fn: (u, d) => guardarProyecto_(d) },
  prepararCarpetas: { admin: 1, w: 1, fn: (u, d) => ({ msg: prepararCarpetas_(d.id).join(' · ') || 'Carpetas al día.' }) },
  guardarFicha: { admin: 1, w: 1, fn: (u, d) => guardarFicha_(u, d) },
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
  ajustes: { admin: 1, fn: () => ({ usuarios: filas_(T.USU), clientes: filas_(T.CLI), config: filas_(T.CFG), cuota: MailApp.getRemainingDailyQuota() }) },
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
  const f = ymd_(e['Fecha límite']), dr = f ? dias_(hoy_(), f) : null;
  return { id: e.ID, proyectoId: e['Proyecto ID'], proyecto: p.Proyecto || '', cliente: cliente_(p.Cliente).Contratante, paso: Number(e.Paso), etapa: etapaNombre_(e.Paso),
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
    cuota: MailApp.getRemainingDailyQuota(), etapas: ETAPAS, prueba: prueba_() };
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
  return { p: resumenProyecto_(p), notas: p.Notas || '', etapas: etapas_(id), ficha: fv, fichaDef: FICHA, faltan: fichaFaltan_(id), encargos: enc, entregas: ent,
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
    total: Number(e['Total declarado']) || 0, estado: e.Estado, totalAprobado: Number(e['Total aprobado']) || 0, nota: e.Nota || '',
    revision: buscar_(T.REV, 'Entrega ID', e.ID).map(r => ({ item: r['Ítem'], res: r.Resultado, lamina: r['Lámina'], obs: r['Observación'] })) };
}
function detalleEncargo_(u, id) {
  const e = uno_(T.ENC, 'ID', id); if (!e) throw new Error('Encargo no encontrado.');
  if (u.rol !== 'ADMIN' && norm_(e.Dibujante) !== u.email) throw new Error('Este encargo no es suyo.');
  const v = encargoVista_(e), p = proyecto_(e['Proyecto ID']);
  const base = p['Carpeta ID'] ? carpetasDe_(p['Carpeta ID']) : {};
  const links = {}; ['01_Arquitectura', '02_Predimensionamiento', '04_Modelo_ETABS', CARPETA_PASO[v.paso]].forEach(n => { if (base[n]) links[n] = base[n].getUrl(); });
  let adj = []; try { adj = JSON.parse(e.Adjuntos || '[]'); } catch (x) { }
  return { e: v, adjuntos: adj, entregas: filas_(T.ENT).filter(x => x['Encargo ID'] === id).map(x => entregaVista_(x)).reverse(), carpetas: links,
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
    if (F[k]) { if (String(F[k].v) !== v) editar_(T.FIC, F[k].fila, { Valor: v, Actualizado: ahora_() }); }
    else if (v) agregar_(T.FIC, { 'Proyecto ID': pid, Clave: k, Valor: v, Actualizado: ahora_() });
  });
  return { faltan: fichaFaltan_(pid) };
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
    ${d.tipo === 'MODIFICACION' ? fila_('Fecha de entrega', '<b>' + esc_(lim) + '</b>') : fila_('Entrega del proyecto completo al cliente', '<b>' + dmy_(d.fecha) + '</b>')}${fila_('Formato', 'DWG + DXF (Guardar como → DXF AutoCAD 2018), dibujado desde la plantilla de capas EST-')}
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
  const sid = id_(); CacheService.getScriptCache().put('U_' + sid, JSON.stringify({ url: url, u: u.email }), 21600);
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
  if (c === 200 || c === 201) { const j = JSON.parse(r.getContentText()); return { listo: true, id: j.id, nombre: j.name, url: j.webViewLink || ('https://drive.google.com/file/d/' + j.id + '/view') }; }
  throw new Error('Falló la subida (' + c + ').');
}

function entregar_(u, d) {
  const e = uno_(T.ENC, 'ID', d.encargoId); if (!e) throw new Error('Encargo no encontrado.');
  if (norm_(e.Dibujante) !== u.email && u.rol !== 'ADMIN') throw new Error('Este encargo no es suyo.');
  if (['ASIGNADO', 'CORRECCIONES'].indexOf(e.Estado) < 0) throw new Error('Este encargo no está abierto.');
  const A = (d.archivos || []).filter(a => a && a.id);
  if (!A.length) throw new Error('Suba los archivos de la entrega.');
  if (!A.some(a => /\.dwg$/i.test(a.nombre)) || !A.some(a => /\.dxf$/i.test(a.nombre))) throw new Error('La entrega necesita el DWG y también el DXF (Guardar como → DXF AutoCAD 2018).');
  const lam = Math.max(0, Math.round(Number(d.laminas) || 0)), val = r2(d.valor);
  if (e.Tipo !== 'MODIFICACION' && !(lam > 0)) throw new Error('Indique el número de láminas.');
  if (lam > 0 && !(val > 0)) throw new Error('Indique el valor por lámina.');
  const id = id_(), ronda = Number(e.Ronda) || 1, paso = Number(e.Paso), p = proyecto_(e['Proyecto ID']);
  agregar_(T.ENT, { ID: id, 'Encargo ID': e.ID, 'Proyecto ID': p.ID, Paso: paso, Ronda: ronda, Fecha: ahora_(), Dibujante: u.email, Archivos: JSON.stringify(A),
    'Láminas': lam, 'Valor lámina': val, 'Total declarado': r2(lam * val), Estado: 'ENTREGADA', Nota: d.nota || '' });
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
    const dr = dias_(hoy_(), f), p = uno_(T.PRO, 'ID', e['Proyecto ID']) || {}, lim = limiteTexto_(f, dib.tz);
    if (dr === 3 && String(e['Recordatorio enviado']) !== f) {
      enviar_({ to: dib.email, subject: `Recordatorio: ${p.Proyecto} se entrega al cliente en 3 días`,
        html: caja_(`<p>Hola ${esc_(dib.nombre)}:</p><p>Le recuerdo que el proyecto <b>${esc_(p.Proyecto)}</b> se entrega completo al cliente el <b>${dmy_(f)}</b>. Su etapa <b>${esc_(etapaNombre_(e.Paso))}</b> aún está pendiente.</p><p><a href="${urlApp_()}">Abrir el portal</a></p>`) });
      editar_(T.ENC, e._fila, { 'Recordatorio enviado': "'" + f });
    }
    if (dr < 0 && String(e['Atraso enviado']) !== f) {
      enviar_({ to: dib.email, subject: `Atrasado: ${p.Proyecto} – ${etapaNombre_(e.Paso)}`,
        html: caja_(`<p>Hola ${esc_(dib.nombre)}:</p><p>La entrega del proyecto completo <b>${esc_(p.Proyecto)}</b> al cliente era el <b>${dmy_(f)}</b> y su etapa <b>${esc_(etapaNombre_(e.Paso))}</b> aún no tiene entrega.</p><p>Por favor súbala o escríbale a Juan con la nueva fecha posible.</p><p><a href="${urlApp_()}">Abrir el portal</a></p>`) });
      editar_(T.ENC, e._fila, { 'Atraso enviado': "'" + f });
    }
  });
  try { limpiarSesiones_(); } catch (x) { }
}
/** Todos los días a la hora de P_Config (10:00): resumen solo para Juan, y solo si hay algo. */
function resumenDiario() {
  const D = inicioAdmin_(), sec = [];
  const lista = (t, L) => { if (L.length) sec.push(`<h3 style="color:#3D434A;margin:16px 0 6px">${t}</h3><ul style="margin:0;padding-left:18px">${L.join('')}</ul>`); };
  lista('Atrasados', D.encargos.filter(e => e.alerta === 'Atrasado').map(e => `<li>${esc_(e.proyecto)} · ${esc_(e.etapa)} · ${esc_(e.dibujanteNombre)} · venció ${dmy_(e.fecha)}</li>`));
  lista('Vencen esta semana', D.encargos.filter(e => e.alerta === 'Esta semana').map(e => `<li>${esc_(e.proyecto)} · ${esc_(e.etapa)} · ${esc_(e.dibujanteNombre)} · ${dmy_(e.fecha)} (${e.dias} días)</li>`));
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

const PAGE = "<!DOCTYPE html><html lang=\"es\"><head><base target=\"_top\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<style>\n:root{--az:#3D434A;--az2:#2B3036;--tx:#22272C;--mu:#6B7279;--li:#D9DCDF;--bg:#F4F5F6;--ok:#2E7D4F;--okb:#E6F2EA;--na:#A65E2E;--nab:#F6EBE2;--ro:#A33A32;--rob:#F7E7E5;--azb:#ECEEF0}\n*{box-sizing:border-box}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:var(--tx);background:var(--bg);font-size:14px}\na{color:var(--az)}h1{font-size:20px;margin:0}h2{font-size:16px;margin:22px 0 10px}h3{font-size:14px;margin:16px 0 8px}\n.top{background:var(--az2);color:#fff;padding:12px 16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;position:sticky;top:0;z-index:5}\n.top b{font-size:16px}.logo{display:inline-flex;align-items:center;justify-content:center;min-width:46px;height:34px;padding:0 6px;border-radius:7px;background:#fff;color:#2B3036;font-weight:900;font-size:16px;letter-spacing:-1px}.top nav{display:flex;gap:4px;flex-wrap:wrap;margin-left:auto}.top nav a{color:#fff;text-decoration:none;padding:6px 10px;border-radius:6px;cursor:pointer}\n.top nav a.on,.top nav a:hover{background:rgba(255,255,255,.18)}\nmain{max-width:1080px;margin:0 auto;padding:16px}\n.card{background:#fff;border:1px solid var(--li);border-radius:10px;padding:14px 16px;margin-bottom:12px}\n.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:12px}\n.kpi{background:#fff;border:1px solid var(--li);border-radius:10px;padding:12px}.kpi div{color:var(--mu);font-size:12px}.kpi b{font-size:22px;display:block;margin-top:4px}\n.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px}\ntable{width:100%;border-collapse:collapse}th{text-align:left;font-size:12px;color:var(--mu);font-weight:600;border-bottom:1px solid var(--li);padding:6px}\ntd{border-bottom:1px solid #EEF0F2;padding:7px 6px;vertical-align:top}.n{text-align:right;white-space:nowrap}\n.b{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:bold;white-space:nowrap}\n.b-ok{background:var(--okb);color:var(--ok)}.b-na{background:var(--nab);color:var(--na)}.b-az{background:var(--azb);color:var(--az)}.b-ro{background:var(--rob);color:var(--ro)}.b-gr{background:#EEF0F2;color:var(--mu)}\nbutton,.btn{background:var(--az);color:#fff;border:0;border-radius:8px;padding:9px 14px;font-size:14px;font-weight:bold;cursor:pointer;text-decoration:none;display:inline-block}\nbutton.sec,.btn.sec{background:#fff;color:var(--az);border:1px solid var(--az)}button.ok{background:var(--ok)}button.ro{background:var(--ro)}button.chico{padding:5px 10px;font-size:12px}\nbutton:disabled{opacity:.5;cursor:default}.wa{background:#1FA855}\ninput,select,textarea{width:100%;padding:8px 10px;border:1px solid var(--li);border-radius:8px;font:inherit;background:#fff}textarea{min-height:70px}\nlabel{display:block;font-size:12px;color:var(--mu);margin:10px 0 4px}.fila{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}\n.mu{color:var(--mu);font-size:12px}.der{text-align:right}.acc{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}\n.tabs{display:flex;gap:4px;flex-wrap:wrap;border-bottom:2px solid var(--li);margin:12px 0}.tabs a{padding:8px 12px;cursor:pointer;text-decoration:none;color:var(--mu);font-weight:bold}\n.tabs a.on{color:var(--az);border-bottom:3px solid var(--az);margin-bottom:-2px}\n.barra{height:8px;background:#E6E9EC;border-radius:4px;overflow:hidden}.barra i{display:block;height:100%;background:var(--az)}\n.et{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid #EEF0F2}\n.num{width:30px;height:30px;border-radius:50%;background:#EEF0F2;display:flex;align-items:center;justify-content:center;font-weight:bold;color:var(--mu)}\n.num.ok{background:var(--ok);color:#fff}.num.cur{background:var(--az);color:#fff}\n#modal{position:fixed;inset:0;background:rgba(20,30,40,.45);display:none;align-items:flex-start;justify-content:center;z-index:20;overflow:auto;padding:24px 10px}\n#modal .box{background:#fff;border-radius:12px;max-width:760px;width:100%;padding:18px 20px;position:relative}#modal .x{position:absolute;right:12px;top:8px;background:none;color:var(--mu);font-size:22px}\n#toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#1D2B36;color:#fff;padding:10px 16px;border-radius:8px;display:none;z-index:40;max-width:90%}\n#busy{position:fixed;inset:0;background:rgba(255,255,255,.55);display:none;z-index:30;align-items:center;justify-content:center;font-weight:bold;color:var(--az)}\n.aviso{background:#F1F2F3;border:1px solid #D9DCDF;border-radius:8px;padding:8px 12px;margin-bottom:12px}\n.chk td{vertical-align:middle}.chk .r label{display:inline-flex;align-items:center;gap:4px;margin:0 8px 0 0;color:var(--tx);font-size:13px}.chk .r input{width:auto}\n.drop{border:2px dashed var(--li);border-radius:10px;padding:14px;text-align:center;color:var(--mu)}.prog{font-size:12px;color:var(--mu)}\n.login{max-width:380px;margin:60px auto}\nhtml,body{max-width:100%;overflow-x:hidden}\n.card{overflow-x:auto;-webkit-overflow-scrolling:touch}#modal .box{overflow-x:auto}\ntd button,td .btn{white-space:nowrap}\n.ecw{width:100%;overflow:hidden;border:1px solid var(--li);border-radius:8px;background:#fff}.ecw iframe{border:0;transform-origin:0 0;display:block}\n@media(max-width:640px){.et{grid-template-columns:30px 1fr}.et>div:last-child{grid-column:2}\n .top{padding:8px 10px;gap:8px;flex-wrap:nowrap}.top>b{display:none}.top nav{flex-wrap:nowrap;gap:2px}.top nav a{padding:6px 8px;font-size:13px}.top .b{display:none}\n main{padding:10px}.kpis{grid-template-columns:1fr 1fr;gap:8px}.kpi{padding:10px}.kpi b{font-size:18px}\n table{font-size:12px}th{font-size:11px;padding:5px 4px}td{padding:6px 4px}.card{padding:12px}\n .grid{grid-template-columns:1fr}h2{font-size:15px}#modal{padding:10px 6px}#modal .box{padding:14px 12px}\n .tabs{flex-wrap:nowrap;overflow-x:auto}.tabs a{white-space:nowrap;padding:8px 10px}}\n</style></head><body>\n<div id=\"app\"></div><div id=\"modal\"><div class=\"box\"><button class=\"x\" onclick=\"cerrar()\">\u00d7</button><div id=\"mbody\"></div></div></div><div id=\"toast\"></div><div id=\"busy\">Trabajando\u2026</div>\n<script>\nconst BOOT = __BOOT__;\nlet TOKEN = BOOT.token || (function () { try { return localStorage.getItem('pce_token') || ''; } catch (e) { return ''; } })();\nlet ROL = '', VISTA = 'inicio', DATA = {}, PROY = null, TAB = 'etapas', ABIERTO = '';\nfunction abrirContratante(i) { const g = []; DATA.proyectos.forEach(p => { if (g.indexOf(p.contratante) < 0) g.push(p.contratante); }); ABIERTO = ABIERTO === g[i] ? '' : g[i]; pintarAdmin(); setTimeout(() => { const t = document.querySelectorAll('h2')[1]; if (ABIERTO && t) t.scrollIntoView({ behavior: 'smooth' }); }, 50); }\nconst $ = s => document.querySelector(s);\nconst esc = s => String(s == null ? '' : s).replace(/[&<>\"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;' }[c]));\nconst usd = v => '$' + (Math.round((Number(v) || 0) * 100) / 100).toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, 'X').replace('.', ',').replace(/X/g, '.');\nconst dmy = s => { const m = /^(\\d{4})-(\\d{2})-(\\d{2})(.*)$/.exec(String(s || '')); return m ? m[3] + '/' + m[2] + '/' + m[1] + m[4] : esc(s); };\nconst hoy = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };\nfunction guardarToken(t) { TOKEN = t || ''; try { t ? localStorage.setItem('pce_token', t) : localStorage.removeItem('pce_token'); } catch (e) { } arriba({ cev: 'sesion', token: TOKEN }); }\n// App CEV (GitHub Pages): la p\u00e1gina principal guarda la sesi\u00f3n y hace el \"Continuar con Google\" (su dominio s\u00ed est\u00e1 autorizado).\nlet EN_APP = false;\nconst arriba = m => { try { if (window.top !== window) window.top.postMessage(m, '*'); } catch (e) { } };\nfunction pedirSesion() { return new Promise(ok => { if (window.top === window) return ok(''); const t = setTimeout(() => ok(''), 700);\n  const f = ev => { const m = ev.data || {}; if (m.cev === 'sesionGuardada') { EN_APP = true; clearTimeout(t); window.removeEventListener('message', f); ok(m.token || ''); } };\n  window.addEventListener('message', f); arriba({ cev: 'pideSesion' }); }); }\nwindow.addEventListener('message', async ev => {\n  const m = ev.data || {}; if (m.cev === 'usarCodigo') return login(true); if (m.cev !== 'credencial') return;\n  busy(true); try { const x = await raw('loginGoogle', m.t); if (!x.ok) throw new Error(x.msg); guardarToken(x.token); arrancar(); }\n  catch (e) { toast(e.message || e, 8000); arriba({ cev: 'loginError', msg: String(e.message || e) }); } finally { busy(false); }\n});\nfunction toast(m, ms) { const t = $('#toast'); t.textContent = m; t.style.display = 'block'; clearTimeout(toast._t); toast._t = setTimeout(() => t.style.display = 'none', ms || 4500); }\nfunction busy(on, txt) { $('#busy').textContent = txt || 'Trabajando\u2026'; $('#busy').style.display = on ? 'flex' : 'none'; }\nfunction modal(html) { $('#mbody').innerHTML = html; $('#modal').style.display = 'flex'; $('#modal').scrollTop = 0; }\nfunction cerrar() { $('#modal').style.display = 'none'; }\nfunction raw(fn) { const args = [].slice.call(arguments, 1); return new Promise((ok, no) => { google.script.run.withSuccessHandler(ok).withFailureHandler(e => no(e))[fn].apply(null, args); }); }\nasync function call(accion, datos, silencio) {\n  if (!silencio) busy(true);\n  try {\n    const r = await raw('api', { token: TOKEN, accion: accion, datos: datos || {} });\n    if (r && r.auth === false) { guardarToken(''); login(); throw new Error(r.msg); }\n    if (!r || !r.ok) throw new Error(r && r.msg || 'Error');\n    return r;\n  } catch (e) { toast(e.message || String(e), 7000); throw e; } finally { if (!silencio) busy(false); }\n}\nfunction badge(e) {\n  e = String(e || ''); const m = { APROBADO: 'ok', APROBADA: 'ok', Pagado: 'ok', 'A tiempo': 'ok', 'EN CURSO': 'az', ASIGNADO: 'az', 'POR REVISAR': 'na', ENTREGADO: 'na', ENTREGADA: 'na',\n    'CON OBSERVACIONES': 'ro', CORRECCIONES: 'ro', Atrasado: 'ro', 'PARA CLAUDE': 'az', REABIERTO: 'na', 'Esta semana': 'na', 'Anticipo pendiente': 'na', Pendiente: 'na', 'En ejecuci\u00f3n': 'az' };\n  return '<span class=\"b b-' + (m[e] || 'gr') + '\">' + esc(e.charAt(0) + e.slice(1).toLowerCase()) + '</span>';\n}\nfunction waBtn(url, txt) { return url ? '<a class=\"btn wa\" target=\"_blank\" rel=\"noopener\" href=\"' + esc(url) + '\">' + (txt || 'Enviar por WhatsApp') + '</a>' : ''; }\nfunction avisoWa(r) { if (r && r.wa) modal('<h2>\u2713 Correo enviado</h2><p>' + esc(r.msg || '') + '</p><p><b>Ahora el WhatsApp:</b> toque el bot\u00f3n, se abre WhatsApp con el mensaje ya escrito (indicaciones, fecha y enlaces a los archivos) y solo presiona enviar.</p>' + waBtn(r.wa) + ' <button class=\"sec\" onclick=\"cerrar()\">Cerrar</button>'); else toast(r.msg || 'Listo'); }\n\n// \u2500\u2500 LOGIN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction login(conCodigo) {\n  ROL = '';\n  if (EN_APP && !conCodigo) { $('#app').innerHTML = '<div style=\"position:fixed;inset:0;background:#2B3036\"></div>'; arriba({ cev: 'login' }); return; } $('#app').innerHTML = `<div class=\"login card\"><div style=\"display:flex;align-items:center;gap:10px\"><span class=\"logo\" style=\"background:#2B3036;color:#fff\">CEV</span><h1>${esc(BOOT.app)}</h1></div><p class=\"mu\">Ingrese con su cuenta de Gmail autorizada.</p>\n  <div id=\"gbtn\"></div><label>Correo</label><input id=\"lmail\" type=\"email\" placeholder=\"usted@gmail.com\" autocomplete=\"email\">\n  <div id=\"lcod\" style=\"display:none\"><label>C\u00f3digo que le lleg\u00f3 al correo</label><input id=\"lcode\" inputmode=\"numeric\" maxlength=\"6\"></div>\n  <div class=\"acc\"><button id=\"lbtn\" onclick=\"loginPaso()\">Enviar c\u00f3digo</button></div><p class=\"mu\" id=\"lmsg\"></p></div>`;\n  if (false) {\n    const s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true;\n    s.onload = () => { try { google.accounts.id.initialize({ client_id: BOOT.clientId, callback: async r => { busy(true); try { const x = await raw('loginGoogle', r.credential); if (!x.ok) throw new Error(x.msg); guardarToken(x.token); arrancar(); } catch (e) { toast(e.message || e); } finally { busy(false); } } });\n      google.accounts.id.renderButton($('#gbtn'), { theme: 'outline', size: 'large', text: 'signin_with', locale: 'es' }); } catch (e) { } };\n    document.head.appendChild(s);\n  }\n}\nasync function loginPaso() {\n  const mail = $('#lmail').value.trim();\n  if ($('#lcod').style.display === 'none') {\n    busy(true); try { const r = await raw('pedirCodigo', mail); if (!r.ok) throw new Error(r.msg); $('#lcod').style.display = 'block'; $('#lbtn').textContent = 'Entrar'; $('#lmsg').textContent = 'Le enviamos un c\u00f3digo de 6 d\u00edgitos (vence en 10 minutos).'; }\n    catch (e) { toast(e.message || e); } finally { busy(false); }\n  } else {\n    busy(true); try { const r = await raw('verificarCodigo', mail, $('#lcode').value.trim()); if (!r.ok) throw new Error(r.msg); guardarToken(r.token); arrancar(); }\n    catch (e) { toast(e.message || e); } finally { busy(false); }\n  }\n}\nasync function salir() { try { await raw('salir', TOKEN); } catch (e) { } guardarToken(''); login(); }\n\n// \u2500\u2500 ARRANQUE Y MARCO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nlet PEDIDA = false;\nasync function arrancar() {\n  if (!PEDIDA) { PEDIDA = true; const t = await pedirSesion(); if (!TOKEN && t) { TOKEN = t; try { localStorage.setItem('pce_token', t); } catch (e) { } } }\n  if (!TOKEN) return login();\n  try { DATA = await call('inicio'); } catch (e) { return; }\n  ROL = DATA.yo ? 'DIBUJANTE' : 'ADMIN';\n  VISTA = 'inicio'; pintar();\n}\nfunction marco(cont) {\n  const nav = ROL === 'ADMIN' ? [['inicio', 'Inicio'], ['cuentas', 'Cuentas'], ['ajustes', 'Ajustes']] : [['inicio', 'Mis encargos']];\n  $('#app').innerHTML = `<div class=\"top\"><span class=\"logo\">CEV</span><b>${esc(BOOT.app)}</b>${BOOT.prueba || DATA.prueba ? '<span class=\"b b-na\">MODO PRUEBA</span>' : ''}<nav>${nav.map(n => `<a class=\"${VISTA === n[0] ? 'on' : ''}\" onclick=\"ir('${n[0]}')\">${n[1]}</a>`).join('')}<a onclick=\"salir()\">Salir</a></nav></div><main>${cont}</main>`;\n  window.scrollTo(0, 0);\n}\nasync function ir(v, arg) {\n  VISTA = v;\n  if (v === 'inicio') { DATA = await call('inicio'); return pintar(); }\n  if (v === 'proyecto') { PROY = await call('proyecto', { id: arg }); return pintarProyecto(); }\n  if (v === 'encargo') { const r = await call('encargo', { id: arg }); return pintarEncargo(r); }\n  if (v === 'cuentas') { const r = await call('cuentas'); return pintarCuentas(r); }\n  if (v === 'ajustes') { const r = await call('ajustes'); return pintarAjustes(r); }\n}\nfunction pintar() { ROL === 'ADMIN' ? pintarAdmin() : pintarDibujante(); }\n\n// \u2500\u2500 INICIO JUAN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarAdmin() {\n  const D = DATA, k = D.kpi;\n  let h = (D.licencia ? `<div class=\"aviso\">${esc(D.licencia)}</div>` : '') + (D.cuota < 20 ? `<div class=\"aviso\">Quedan ${D.cuota} correos disponibles hoy.</div>` : '');\n  h += `<div class=\"kpis\"><div class=\"kpi\"><div>Por revisar</div><b>${k.porRevisar}</b></div><div class=\"kpi\"><div>Atrasados</div><b style=\"color:var(--ro)\">${k.atrasos}</b></div>\n  <div class=\"kpi\"><div>Listo para Claude</div><b>${k.claude}</b></div></div>`;\n  if (D.porRevisar.length) h += `<div class=\"card\"><h3 style=\"margin-top:0\">Entregas por revisar</h3><table>${D.porRevisar.map(x => `<tr><td><b>${esc(x.proyecto)}</b><br><span class=\"mu\">${x.paso}. ${esc(x.etapa)} \u00b7 ${esc(x.dibujanteNombre)} \u00b7 ronda ${x.ronda} \u00b7 ${dmy(x.fecha)}</span></td><td class=\"n\">${x.laminas} l\u00e1m.</td><td class=\"der\"><button class=\"chico\" onclick='abrirRevision(${JSON.stringify(x.proyectoId)},${JSON.stringify(x.id)})'>Revisar</button></td></tr>`).join('')}</table></div>`;\n  if (D.claude.length) h += `<div class=\"card\"><h3 style=\"margin-top:0\">Listo para Claude</h3><p class=\"mu\">P\u00eddamelo en el chat del proyecto Consultor Estructural.</p>${D.claude.map(x => `<div>\u2022 <b>${esc(x.proyecto)}</b> \u00b7 ${x.paso}. ${esc(x.etapa)}</div>`).join('')}</div>`;\n  const enc = D.encargos.slice().sort((a, b) => (a.dias == null ? 999 : a.dias) - (b.dias == null ? 999 : b.dias));\n  h += `<div class=\"card\"><h3 style=\"margin-top:0\">Encargos en curso</h3>${enc.length ? `<table><tr><th>Proyecto</th><th>Etapa</th><th>Dibujante</th><th>Fecha</th><th></th></tr>${enc.map(e => `<tr><td><a onclick=\"ir('proyecto','${e.proyectoId}')\" style=\"cursor:pointer\"><b>${esc(e.proyecto)}</b></a>${e.tipo === 'MODIFICACION' ? ' <span class=\"b b-na\">Modificaci\u00f3n</span>' : ''}</td><td>${e.paso}. ${esc(e.etapa)}${e.ronda > 1 ? ' <span class=\"mu\">(corr. ' + (e.ronda - 1) + ')</span>' : ''}</td><td>${esc(e.dibujanteNombre)}</td><td>${dmy(e.fecha)}<br><span class=\"mu\">${e.dias == null ? '' : e.dias < 0 ? Math.abs(e.dias) + ' d\u00edas de atraso' : e.dias + ' d\u00edas'}</span></td><td>${badge(e.alerta)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin encargos abiertos.</p>'}</div>`;\n  const grupos = []; D.proyectos.forEach(p => { if (grupos.indexOf(p.contratante) < 0) grupos.push(p.contratante); });\n  h += `<div style=\"display:flex;align-items:center;justify-content:space-between\"><h2>Contratantes</h2><button onclick=\"nuevoProyecto()\">+ Nuevo proyecto</button></div>\n  <div class=\"grid\" style=\"grid-template-columns:repeat(auto-fit,minmax(220px,1fr))\">${grupos.map((g, i) => { const L = D.proyectos.filter(p => p.contratante === g), on = ABIERTO === g;\n    const cur = L.filter(p => p.paso <= 10 && !(p.estado === 'APROBADO')).length;\n    return `<div class=\"card\" style=\"cursor:pointer;margin:0;${on ? 'border:2px solid var(--az);' : ''}\" onclick=\"abrirContratante(${i})\"><b style=\"font-size:15px\">${esc(g)}</b>\n      <div class=\"mu\" style=\"margin-top:4px\">${L.length} proyecto(s) \u00b7 ${L.filter(p => p.paso <= 10).length} en curso</div>\n</div>`; }).join('')}</div>`;\n  if (ABIERTO) { const L = D.proyectos.filter(p => p.contratante === ABIERTO);\n    h += `<h2>${esc(ABIERTO)} <span class=\"mu\">\u00b7 ${L.length} proyecto(s)</span> <button class=\"chico sec\" onclick=\"ABIERTO='';pintarAdmin()\">Cerrar</button></h2><div class=\"grid\">${L.map(p => `<div class=\"card\" style=\"cursor:pointer\" onclick=\"ir('proyecto','${p.id}')\">\n    <b style=\"font-size:15px\">${esc(p.nombre)}</b><div style=\"margin:8px 0 4px\" class=\"barra\"><i style=\"width:${p.avance}%\"></i></div>\n    <div class=\"mu\">${p.paso <= 10 ? 'Paso ' + p.paso + ': ' + esc(p.etapa) + ' \u00b7 ' : ''}${badge(p.paso <= 10 ? p.estado : 'APROBADO')}</div>\n${p.entrega ? `<div class=\"mu\" style=\"margin-top:6px\">Entrega al cliente: <b>${dmy(p.entrega)}</b></div>` : ''}</div>`).join('')}</div>`; }\n  else h += '<p class=\"mu\">Elija un contratante para ver sus proyectos.</p>';\n  if ((D.archivados || []).length) h += `<details style=\"margin-top:14px\"><summary class=\"mu\" style=\"cursor:pointer\">Archivados (${D.archivados.length})</summary><div class=\"card\">${D.archivados.map(p => `<div style=\"display:flex;justify-content:space-between;align-items:center;padding:4px 0\"><span><b>${esc(p.nombre)}</b> <span class=\"mu\">\u00b7 ${esc(p.contratante)}</span></span><span><button class=\"chico sec\" onclick=\"ir('proyecto','${p.id}')\">Ver</button> <button class=\"chico\" onclick=\"archivar('${p.id}',true)\">Restaurar</button></span></div>`).join('')}</div></details>`;\n  marco(h);\n}\nfunction nuevoProyecto() {\n  modal(`<h2>Nuevo proyecto</h2><label>Cliente</label><select id=\"np_c\">${DATA.clientes.map(c => `<option value=\"${esc(c.Clave)}\">${esc(c.Contratante)}</option>`).join('')}</select>\n  <label>Nombre del proyecto</label><input id=\"np_n\"><label>Descripci\u00f3n (opcional)</label><input id=\"np_d\" placeholder=\"Ej.: Residencia Aires de Bat\u00e1n\">\n  <div class=\"fila\"><div><label>Servicio</label><input id=\"np_s\" value=\"Dise\u00f1o estructural\"></div><div><label>Valor del contrato (USD)</label><input id=\"np_v\" type=\"number\" step=\"0.01\"></div><div><label>Anticipo %</label><input id=\"np_a\" type=\"number\" value=\"50\"></div></div>\n  <p class=\"mu\">Se crea la carpeta del proyecto con sus 9 subcarpetas dentro de la carpeta del cliente.</p><div class=\"acc\"><button onclick=\"crearProyecto()\">Crear</button></div>`);\n}\nasync function crearProyecto() {\n  const r = await call('guardarProyecto', { Cliente: $('#np_c').value, Proyecto: $('#np_n').value, 'Descripci\u00f3n': $('#np_d').value, Servicio: $('#np_s').value, 'Valor contrato': $('#np_v').value, 'Anticipo %': $('#np_a').value });\n  cerrar(); ir('proyecto', r.id);\n}\n\n// \u2500\u2500 PROYECTO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarProyecto() {\n  const P = PROY, p = P.p;\n  const tabs = [['etapas', 'Etapas'], ['ficha', 'Ficha t\u00e9cnica' + (P.faltan.length ? ' (' + P.faltan.length + ')' : '')], ['encargos', 'Encargos y entregas'], ['cambios', 'Cambios'], ['cuentas', 'Cuentas'], ['datos', 'Datos']];\n  let h = `<div class=\"mu\"><a onclick=\"ir('inicio')\" style=\"cursor:pointer\">\u2190 Inicio</a> \u00b7 ${esc(p.contratante)}</div><h1 style=\"margin:6px 0\">${esc(p.nombre)}</h1>\n  <div class=\"mu\">${esc(p.desc)} ${p.carpeta ? '\u00b7 <a target=\"_blank\" href=\"' + p.carpeta + '\">Carpeta en Drive</a>' : ''}</div>\n  <div class=\"tabs\">${tabs.map(t => `<a class=\"${TAB === t[0] ? 'on' : ''}\" onclick=\"TAB='${t[0]}';pintarProyecto()\">${t[1]}</a>`).join('')}</div>`;\n  h += ({ etapas: tabEtapas, ficha: tabFicha, encargos: tabEncargos, cambios: tabCambios, cuentas: tabCuentasP, datos: tabDatos })[TAB]();\n  marco(h);\n  if (TAB === 'ficha') dibujarEspectro();\n}\nconst PJ = [1, 3, 5, 7, 8, 9, 10], PC = [3, 5, 8, 9, 10], PD = [2, 4];\nconst SOLO_CLAUDE = [5, 8, 9, 10], BOTON_CLAUDE = { 5: 'Revisi\u00f3n con Claude' }, FUENTE_CLAUDE = { 5: 'Planos + modelo \u00b7 NEC-15 \u00b7 ASCE 7-22 \u00b7 ACI 318-25', 8: 'Directo de los planos terminados', 9: 'Desde la planilla de acero y hormig\u00f3n', 10: 'Desde toda la informaci\u00f3n del proyecto' };\nfunction tabEtapas() {\n  const E = PROY.etapas, act = (E.filter(e => e.estado !== 'APROBADO')[0] || {}).paso;\n  const abierto = paso => PROY.encargos.filter(e => e.paso === paso && ['ASIGNADO', 'CORRECCIONES', 'ENTREGADO'].indexOf(e.estado) >= 0)[0];\n  const sinAvance = !E.some(e => e.estado === 'APROBADO' && e.nota !== 'Hecho antes del portal') && E.some(e => e.estado !== 'APROBADO');\n  const salto = sinAvance ? `<div class=\"card\" style=\"padding:10px 14px\"><span class=\"mu\">\u00bfProyecto que ya ven\u00eda avanzado?</span> Empezar desde la etapa <select id=\"sa_p\" style=\"width:auto;display:inline-block\">${E.filter(e => e.paso >= 2).map(e => `<option value=\"${e.paso}\" ${e.paso === 5 ? 'selected' : ''}>${e.paso}. ${esc(e.nombre)}</option>`).join('')}</select> <button class=\"chico sec\" onclick=\"saltarA()\">Aplicar</button></div>` : '';\n  return tarjetaDocs() + salto + '<div class=\"card\">' + E.map(e => {\n    let acc = '';\n    if (PJ.indexOf(e.paso) >= 0 && e.estado !== 'APROBADO') acc = SOLO_CLAUDE.indexOf(e.paso) >= 0\n      ? `<span class=\"mu\" style=\"font-size:12px;margin-right:6px\">${FUENTE_CLAUDE[e.paso]}</span>${e.estado !== 'PARA CLAUDE' ? `<button class=\"chico sec\" onclick=\"paraClaude(${e.paso})\">${BOTON_CLAUDE[e.paso] || 'Generar con Claude'}</button> ` : ''}<button class=\"chico ok\" onclick=\"aprobarEtapa(${e.paso})\">Aprobar</button>`\n      : `<button class=\"chico sec\" onclick=\"subirEtapa(${e.paso})\">Subir archivo</button> ${PC.indexOf(e.paso) >= 0 && e.estado !== 'PARA CLAUDE' ? `<button class=\"chico sec\" onclick=\"paraClaude(${e.paso})\">Listo para Claude</button> ` : ''}<button class=\"chico ok\" onclick=\"aprobarEtapa(${e.paso})\">Aprobar</button>`;\n    if (e.paso === 1 && e.estado !== 'APROBADO') acc = `<button class=\"chico\" onclick=\"enviarPredim()\">Enviar a dibujante</button> <button class=\"chico ok\" onclick=\"aprobarEtapa(1)\">Aprobar sin enviar</button>`;\n    if (PD.indexOf(e.paso) >= 0 && e.estado !== 'APROBADO') { const a = abierto(e.paso); acc = a ? `<span class=\"mu\">${esc(a.dibujanteNombre)} \u00b7 ${dmy(a.fecha)}</span>` : `<button class=\"chico\" onclick=\"asignar(${e.paso})\">Asignar</button>`; }\n    if (e.paso === 5 && e.estado === 'POR REVISAR') { const x = PROY.entregas.filter(z => z.estado === 'ENTREGADA' && z.paso === 4)[0]; if (x) acc = `<button class=\"chico sec\" onclick=\"paraClaude(5)\">Revisi\u00f3n con Claude</button> <button class=\"chico\" onclick='abrirRevision(${JSON.stringify(PROY.p.id)},${JSON.stringify(x.id)})'>Revisar entrega</button>`; }\n    if (e.paso === 2 && e.estado === 'ENTREGADO') { const x = PROY.entregas.filter(z => z.estado === 'ENTREGADA' && z.paso === 2)[0]; if (x) acc = `<button class=\"chico\" onclick='abrirRevision(${JSON.stringify(PROY.p.id)},${JSON.stringify(x.id)})'>Revisar trazado</button>`; }\n    return `<div class=\"et\"><div class=\"num ${e.estado === 'APROBADO' ? 'ok' : e.paso === act ? 'cur' : ''}\">${e.estado === 'APROBADO' ? '\u2713' : e.paso}</div>\n    <div><b>${esc(e.nombre)}</b> <span class=\"mu\">\u00b7 ${esc(e.resp)}</span><br>${badge(e.estado)} <span class=\"mu\">${esc(e.fecha)} ${esc(e.por)}${e.nota ? ' \u00b7 ' + esc(e.nota) : ''}${e.archivos ? ' \u00b7 ' + esc(e.archivos) : ''}</span></div><div><button class=\"chico sec\" onclick=\"verArchivos(${e.paso})\">\ud83d\udcc1 Archivos</button> ${acc}</div></div>`;\n  }).join('') + '</div>';\n}\nfunction tarjetaDocs() {\n  const D = PROY.docs || { arq: [], suelo: [] };\n  const fila = (t, lista, paso) => `<div class=\"et\"><div class=\"num ${lista.length ? 'ok' : 'cur'}\">${lista.length ? '\u2713' : '!'}</div>\n    <div><b>${t}</b><br>${lista.length ? lista.map(f => `<a href=\"${esc(f.url)}\" target=\"_blank\">${esc(f.nombre)}</a> <span class=\"mu\">${esc(f.fecha)}</span>`).join('<br>') : '<span class=\"mu\">Falta subir</span>'}</div>\n    <div><button class=\"chico sec\" onclick=\"subirDocs(${paso})\">Subir</button></div></div>`;\n  return `<div class=\"card\"><h3 style=\"margin-top:0\">0 \u00b7 Documentaci\u00f3n del contratante</h3><p class=\"mu\" style=\"margin-top:-6px\">Lo primero: sin planos no se aprueba el predimensionamiento y sin estudio de suelos no se aprueba el modelo ETABS.</p>`\n    + fila('Planos arquitect\u00f3nicos', D.arq, 0) + fila('Estudio de suelos', D.suelo, -1) + '</div>';\n}\nfunction subirDocs(paso) {\n  modal(`<h2>Subir \u00b7 ${paso === 0 ? 'Planos arquitect\u00f3nicos' : 'Estudio de suelos'}</h2><p class=\"mu\">Puede subir varios archivos (DWG, PDF, Excel). Se guardan con fecha y hora; no se reemplazan las versiones anteriores.</p>${zonaSubida('dc' + (paso + 1), { proyectoId: PROY.p.id, paso: paso })}<div class=\"acc\"><button onclick=\"cerrar();ir('proyecto','${PROY.p.id}')\">Listo</button></div>`);\n}\nasync function saltarA() { const p = Number($('#sa_p').value); if (!confirm('Las etapas 1 a ' + (p - 1) + ' quedan como hechas antes del portal. \u00bfSeguir?')) return; const r = await call('saltarA', { proyectoId: PROY.p.id, paso: p }); toast(r.msg, 8000); ir('proyecto', PROY.p.id); }\nasync function verArchivos(paso) {\n  const r = await call('archivosEtapa', { proyectoId: PROY.p.id, paso: paso }), et = PROY.etapas.filter(e => e.paso === paso)[0] || {};\n  const kb = n => n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';\n  const ext = n => (String(n).match(/\\.([a-z0-9]+)$/i) || [, ''])[1].toUpperCase();\n  const btns = f => `<a class=\"chico sec\" style=\"display:inline-block;padding:5px 10px;border-radius:6px;border:1px solid #ccc;text-decoration:none;color:inherit\" href=\"${esc(f.url)}\" target=\"_blank\">Ver</a> <a class=\"chico\" style=\"display:inline-block;padding:5px 10px;border-radius:6px;background:#3D434A;color:#fff;text-decoration:none\" href=\"${esc(f.descarga)}\" target=\"_blank\">Descargar</a>`;\n  const tabla = L => L.length ? `<table>${L.map((f, i) => `<tr><td><b>${esc(f.nombre)}</b> ${i === 0 ? '<span class=\"b b-ok\">M\u00e1s reciente</span>' : ''}<br><span class=\"mu\">${esc(ext(f.nombre))} \u00b7 ${kb(f.tam)} \u00b7 ${esc(f.fecha)}</span></td><td class=\"der\" style=\"white-space:nowrap\">${btns(f)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Todav\u00eda no hay archivos en esta etapa.</p>';\n  if (r.req) {\n    const listo = r.req.every(q => !q.ob || q.archivos.length), enviado = et.estado === 'PARA CLAUDE', cerrada = et.estado === 'APROBADO';\n    const filas = r.req.map(q => { const f = q.archivos[0], k = 'rq' + paso + q.k, tipo = q.k === 'informe' ? '<span class=\"b b-az\">Claude</span>' : q.ob ? '<span class=\"b b-ro\">Obligatorio</span>' : q.rec ? '<span class=\"b b-az\">Recomendado</span>' : '<span class=\"b b-gr\">Opcional</span>';\n      SUBIDOS[k] = [];\n      return `<div class=\"et\" style=\"grid-template-columns:34px 1fr\"><div class=\"num ${f ? 'ok' : q.ob ? 'cur' : ''}\">${f ? '\u2713' : '!'}</div><div>\n        <b>${esc(q.t)}</b> <span class=\"mu\">\u00b7 .${q.ext.join(' / .')}</span> ${tipo}<br>\n        ${f ? `<span class=\"mu\">${esc(f.nombre)} \u00b7 ${kb(f.tam)} \u00b7 ${esc(f.fecha)}${q.archivos.length > 1 ? ' \u00b7 ' + (q.archivos.length - 1) + ' versi\u00f3n(es) anterior(es)' : ''}</span> ${btns(f)}` : `<span class=\"mu\">${q.ob ? 'Falta subir' : 'Sin archivo'}</span>`}\n        <div style=\"margin-top:6px\">${cerrada ? '' : zonaSubida(k, { proyectoId: PROY.p.id, paso: paso, req: q.k, ext: q.ext })}</div></div></div>`; }).join('');\n    const pie = cerrada ? '<p class=\"mu\">Etapa aprobada.</p>' : enviado ? '<div class=\"aviso\">\u2713 Enviado a revisi\u00f3n: p\u00eddeme la revisi\u00f3n en el chat del proyecto Consultor Estructural.</div>'\n      : `<p class=\"mu\">${listo ? 'Ya est\u00e1n los archivos obligatorios.' : 'Suba los archivos obligatorios para enviar a revisi\u00f3n.'}</p>`;\n    return modal(`<h2>${paso}. ${esc(et.nombre || '')} \u00b7 archivos para la revisi\u00f3n</h2><p class=\"mu\" style=\"margin-top:-6px\">Cada espacio acepta solo su formato y guarda el archivo en su carpeta. Para corregir: suba la versi\u00f3n nueva en el mismo espacio; la anterior queda como historial.</p>\n    <div class=\"card\" style=\"padding:4px 14px\">${filas}</div>${pie}\n    <div class=\"acc\">${!cerrada && !enviado ? `<button ${listo ? '' : 'disabled'} onclick=\"cerrar();paraClaude(${paso})\">Enviar a revisi\u00f3n</button>` : ''}<button class=\"sec\" onclick=\"verArchivos(${paso})\">Actualizar lista</button><button class=\"sec\" onclick=\"cerrar();ir('proyecto','${PROY.p.id}')\">Listo</button></div>\n    <details style=\"margin-top:12px\"><summary class=\"mu\" style=\"cursor:pointer\">Todos los archivos de la carpeta ${esc(r.carpeta)}</summary>${tabla(r.archivos)}</details>`);\n  }\n  const lista = tabla(r.archivos);\n  modal(`<h2>${paso}. ${esc(et.nombre || '')} \u00b7 archivos</h2><p class=\"mu\" style=\"margin-top:-6px\">Carpeta ${esc(r.carpeta)}${r.comparte.length ? ' (compartida con las etapas ' + r.comparte.join(', ') + ')' : ''}. Para modificar: descargue, edite y suba la versi\u00f3n corregida; la anterior queda como historial.</p>\n  ${lista}<h3>Subir versi\u00f3n nueva o corregida</h3>${zonaSubida('va' + paso, { proyectoId: PROY.p.id, paso: paso })}\n  <div class=\"acc\"><button class=\"sec\" onclick=\"SUBIDOS['va${paso}']=[];verArchivos(${paso})\">Actualizar lista</button><button onclick=\"SUBIDOS['va${paso}']=[];cerrar();ir('proyecto','${PROY.p.id}')\">Listo</button></div>`);\n}\nasync function paraClaude(paso) { const r = await call('paraClaude', { proyectoId: PROY.p.id, paso: paso }); toast(r.msg, 8000); ir('proyecto', PROY.p.id); }\nfunction subirEtapa(paso) {\n  if (paso === 5) return verArchivos(5);\n  modal(`<h2>Subir archivo \u00b7 ${paso}</h2><p class=\"mu\">Se guarda en la carpeta de la etapa con fecha y hora; no reemplaza las versiones anteriores.</p>${zonaSubida('se', { proyectoId: PROY.p.id, paso: paso })}<div class=\"acc\"><button onclick=\"cerrar();ir('proyecto','${PROY.p.id}')\">Listo</button></div>`);\n}\nfunction aprobarEtapa(paso) {\n  modal(`<h2>Aprobar etapa ${paso}</h2>${paso === 3 && PROY.faltan.length ? `<div class=\"aviso\">La ficha t\u00e9cnica est\u00e1 incompleta: ${esc(PROY.faltan.join(', '))}.</div>` : ''}\n  ${PC.indexOf(paso) >= 0 ? '<p class=\"mu\">Puede subir el archivo de Claude o uno hecho a mano; queda en su carpeta con su versi\u00f3n.</p>' : ''}${zonaSubida('ae', { proyectoId: PROY.p.id, paso: paso })}\n  <label>Nota (opcional)</label><input id=\"ae_n\"><div class=\"acc\"><button class=\"ok\" onclick=\"confirmarEtapa(${paso})\">Aprobar</button></div>`);\n}\nasync function confirmarEtapa(paso) { const r = await call('aprobarEtapa', { proyectoId: PROY.p.id, paso: paso, nota: $('#ae_n').value, archivos: SUBIDOS.ae || [] }); cerrar(); toast(r.msg); ir('proyecto', PROY.p.id); }\nfunction asignar(paso, tipo) {\n  const D = PROY.dibujantes, def = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);\n  modal(`<h2>Asignar \u00b7 ${paso}. ${paso === 2 ? 'Trazado' : 'Dibujo completo'}</h2>\n  <div class=\"fila\"><div><label>Dibujante</label><select id=\"as_d\">${D.map(d => `<option value=\"${esc(d.email)}\">${esc(d.nombre)}</option>`).join('')}</select></div>\n  <div><label>Tipo</label><select id=\"as_t\"><option value=\"NUEVO\">Nuevo</option><option value=\"MODIFICACION\" ${tipo === 'MODIFICACION' ? 'selected' : ''}>Modificaci\u00f3n (solo l\u00e1minas nuevas suman)</option></select></div>\n  <div><label>Fecha de entrega al cliente</label><input id=\"as_e\" type=\"date\" value=\"${esc(PROY.p.entrega || '')}\"></div></div>\n  <label>Qu\u00e9 debe entregar</label><textarea id=\"as_q\" placeholder=\"Ej.: Planta de cimentaci\u00f3n, plantas de losas N+3.06 y N+6.12, cortes y detalles de columnas\"></textarea>\n  <label>Observaciones (opcional)</label><textarea id=\"as_o\"></textarea><p class=\"mu\">Le llega un correo con todo y le dejamos listo el WhatsApp. Se le comparten (solo ver) las carpetas base del proyecto.</p>\n  <div class=\"acc\"><button onclick=\"confirmarAsignar(${paso})\">Asignar y avisar</button></div>`);\n}\nfunction enviarPredim() {\n  const D = PROY.dibujantes, def = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10); SUBIDOS.pd = [];\n  const av = [];\n  if (!(PROY.docs || {}).arq || !PROY.docs.arq.length) av.push('faltan los planos arquitect\u00f3nicos del contratante');\n  modal(`<h2>1 \u00b7 Predimensionamiento \u2192 dibujante</h2>${av.length ? `<div class=\"aviso\">No se puede enviar todav\u00eda: ${esc(av.join('; '))}.</div>` : ''}\n  <label>Predimensionamiento (PDF o imagen)</label>${zonaSubida('pd', { proyectoId: PROY.p.id, paso: 1 })}\n  <label>Indicaciones para la dibujante <button type=\"button\" class=\"chico sec\" style=\"margin-left:8px\" onclick=\"notaVoz('pd', { proyectoId: PROY.p.id, paso: 1 })\">\ud83c\udf99 Grabar nota de voz</button></label><textarea id=\"pd_i\" rows=\"5\" placeholder=\"Ej.: Trazar ejes A-G / 1-6, columnas 45x45 seg\u00fan el PDF, vigas 30x55; niveles N+3.06, N+6.12\u2026\"></textarea>\n  <div class=\"fila\"><div><label>Dibujante</label><select id=\"pd_d\">${D.map(d => `<option value=\"${esc(d.email)}\">${esc(d.nombre)}</option>`).join('')}</select></div>\n  <div><label>Fecha de entrega al cliente</label><input id=\"pd_e\" type=\"date\" value=\"${esc(PROY.p.entrega || '')}\"></div></div>\n  <p class=\"mu\">Al enviar: se aprueba el predimensionamiento, se le asigna el trazado y le llega un correo con los archivos adjuntos y sus indicaciones (y el WhatsApp listo).</p>\n  <div class=\"acc\"><button onclick=\"confirmarPredim()\">Enviar</button></div>`);\n}\nasync function confirmarPredim() {\n  const r = await call('enviarPredim', { proyectoId: PROY.p.id, archivos: SUBIDOS.pd || [], indicaciones: $('#pd_i').value, dibujante: $('#pd_d').value, fecha: $('#pd_e').value, entrega: $('#pd_e').value });\n  PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); avisoWa(r);\n}\nasync function confirmarAsignar(paso) {\n  const r = await call('asignar', { proyectoId: PROY.p.id, paso: paso, dibujante: $('#as_d').value, tipo: $('#as_t').value, fecha: $('#as_e').value, entrega: $('#as_e').value, que: $('#as_q').value, obs: $('#as_o').value });\n  PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); avisoWa(r);\n}\n\n// Ficha t\u00e9cnica + espectro\nfunction tabFicha() {\n  const F = PROY.ficha, grupos = [];\n  PROY.fichaDef.forEach(f => { if (grupos.indexOf(f[0]) < 0) grupos.push(f[0]); });\n  let h = PROY.faltan.length ? `<div class=\"aviso\">Faltan ${PROY.faltan.length} dato(s) obligatorios. La ficha es para el modelo estructural: sin ficha completa no se aprueba el paso 3 (modelo ETABS).</div>` : '<div class=\"aviso\" style=\"background:var(--okb);border-color:#BFE3CC\">Ficha t\u00e9cnica completa.</div>';\n  h += grupos.map(g => `<div class=\"card\"><h3 style=\"margin-top:0\">${esc(g)}</h3><div class=\"fila\">${PROY.fichaDef.filter(f => f[0] === g).map(f => `<div><label>${esc(f[2])}${f[3] ? ' *' : ''}</label><input data-k=\"${f[1]}\" value=\"${esc(F[f[1]] || '')}\" placeholder=\"${esc(f[4])}\" oninput=\"if(['Z','Fa','Fd','Fs','eta','r','I','R','phiP','phiE'].indexOf(this.dataset.k)>=0)dibujarEspectro()\"></div>`).join('')}</div></div>`).join('');\n  h += `<div class=\"card\"><h3 style=\"margin-top:0\">Espectro de dise\u00f1o</h3><div id=\"esp\"></div>\n  <label>Espectro propio del sitio (opcional): pegue desde Excel dos columnas T (s) y Sa (g), o cargue un CSV/TXT</label><textarea id=\"esp_sitio\" oninput=\"dibujarEspectro()\" placeholder=\"0.00\t0.95&#10;0.10\t1.10&#10;\u2026\">${esc(F.espectroSitio || '')}</textarea>\n  <input type=\"file\" accept=\".csv,.txt\" onchange=\"leerEspectro(this)\" style=\"margin-top:6px\"><label>Espectro que rige</label><select data-k=\"rige\"><option value=\"NEC\" ${F.rige !== 'SITIO' ? 'selected' : ''}>NEC-SE-DS</option><option value=\"SITIO\" ${F.rige === 'SITIO' ? 'selected' : ''}>Espectro del sitio</option></select></div>\n  <div class=\"acc\"><button onclick=\"guardarFicha()\">Guardar ficha t\u00e9cnica</button></div>`;\n  return h;\n}\nfunction leerEspectro(inp) { const f = inp.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { $('#esp_sitio').value = r.result; dibujarEspectro(); }; r.readAsText(f); }\nfunction valFicha() { const o = {}; document.querySelectorAll('[data-k]').forEach(i => o[i.dataset.k] = i.value); o.espectroSitio = ($('#esp_sitio') || {}).value || ''; return o; }\nasync function guardarFicha() { const r = await call('guardarFicha', { proyectoId: PROY.p.id, valores: valFicha() }); PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); toast(r.faltan.length ? 'Guardado. Faltan: ' + r.faltan.join(', ') : 'Ficha t\u00e9cnica completa y guardada.'); }\nconst num = v => { const x = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(x) ? x : NaN; };\nfunction puntosSitio(txt) {\n  return String(txt || '').split(/\\r?\\n/).map(l => l.trim()).filter(Boolean).map(l => { const sep = l.indexOf(';') >= 0 ? ';' : l.indexOf('\\t') >= 0 ? '\\t' : l.indexOf(',') >= 0 && l.split(',').length === 2 ? ',' : /\\s+/;\n    const p = typeof sep === 'string' ? l.split(sep) : l.split(sep); return [num(p[0]), num(p[1])]; }).filter(p => isFinite(p[0]) && isFinite(p[1])).sort((a, b) => a[0] - b[0]);\n}\nfunction dibujarEspectro() {\n  const el = $('#esp'); if (!el) return;\n  const v = valFicha(), Z = num(v.Z), Fa = num(v.Fa), Fd = num(v.Fd), Fs = num(v.Fs), eta = num(v.eta), r = num(v.r), I = num(v.I) || 1, R = num(v.R), pP = num(v.phiP) || 1, pE = num(v.phiE) || 1;\n  const ok = [Z, Fa, Fd, Fs, eta, r].every(isFinite), site = puntosSitio(v.espectroSitio);\n  if (!ok && !site.length) { el.innerHTML = '<p class=\"mu\">Complete Z, Fa, Fd, Fs, \u03b7 y r para ver el espectro NEC-SE-DS.</p>'; return; }\n  const Tc = ok ? 0.55 * Fs * Fd / Fa : 0, Tmax = 4, nec = [], ine = [];\n  if (ok) for (let T = 0; T <= Tmax + 1e-9; T += 0.02) { const Sa = T <= Tc ? eta * Z * Fa : eta * Z * Fa * Math.pow(Tc / T, r); nec.push([T, Sa]); if (isFinite(R)) ine.push([T, Sa * I / (R * pP * pE)]); }\n  const ymax = Math.max(0.2, ...nec.map(p => p[1]), ...site.map(p => p[1])) * 1.1;\n  const W = 640, H = 260, x0 = 46, y0 = 14, w = W - x0 - 14, h = H - y0 - 34, X = t => x0 + t / Tmax * w, Y = s => y0 + h - s / ymax * h;\n  const pl = (P, c, dash) => P.length ? `<polyline fill=\"none\" stroke=\"${c}\" stroke-width=\"2\" ${dash ? 'stroke-dasharray=\"6 4\"' : ''} points=\"${P.filter(p => p[0] <= Tmax).map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join(' ')}\"/>` : '';\n  let ax = ''; for (let t = 0; t <= Tmax; t += 0.5) ax += `<line x1=\"${X(t)}\" x2=\"${X(t)}\" y1=\"${y0}\" y2=\"${y0 + h}\" stroke=\"#EEF0F2\"/><text x=\"${X(t)}\" y=\"${y0 + h + 14}\" font-size=\"10\" text-anchor=\"middle\" fill=\"#6E7679\">${t}</text>`;\n  const st = ymax > 2 ? 0.5 : ymax > 1 ? 0.25 : 0.1; for (let s = 0; s <= ymax; s += st) ax += `<line x1=\"${x0}\" x2=\"${x0 + w}\" y1=\"${Y(s)}\" y2=\"${Y(s)}\" stroke=\"#EEF0F2\"/><text x=\"${x0 - 6}\" y=\"${Y(s) + 3}\" font-size=\"10\" text-anchor=\"end\" fill=\"#6E7679\">${s.toFixed(2)}</text>`;\n  el.innerHTML = `<svg viewBox=\"0 0 ${W} ${H}\" style=\"width:100%;max-width:${W}px\">${ax}<line x1=\"${x0}\" x2=\"${x0}\" y1=\"${y0}\" y2=\"${y0 + h}\" stroke=\"#98A0A3\"/><line x1=\"${x0}\" x2=\"${x0 + w}\" y1=\"${y0 + h}\" y2=\"${y0 + h}\" stroke=\"#98A0A3\"/>\n  ${pl(nec, '#3D434A')}${pl(ine, '#3D434A', 1)}${pl(site, '#C9874F')}<text x=\"${x0 + w / 2}\" y=\"${H - 4}\" font-size=\"11\" text-anchor=\"middle\" fill=\"#1D2B36\">Per\u00edodo T (s)</text>\n  <text x=\"12\" y=\"${y0 + h / 2}\" font-size=\"11\" fill=\"#1D2B36\" transform=\"rotate(-90 12 ${y0 + h / 2})\" text-anchor=\"middle\">Sa (g)</text></svg>\n  <div class=\"mu\">${ok ? `<b style=\"color:#3D434A\">\u2501</b> NEC el\u00e1stico: Sa m\u00e1x = ${(eta * Z * Fa).toFixed(3)} g, Tc = ${Tc.toFixed(3)} s \u00b7 ` : ''}${ine.length ? `<b style=\"color:#3D434A\">\u254d</b> inel\u00e1stico de dise\u00f1o (\u00d7 I / R\u00b7\u03c6P\u00b7\u03c6E = ${(I / (R * pP * pE)).toFixed(3)}) \u00b7 ` : ''}${site.length ? `<b style=\"color:#C9874F\">\u2501</b> sitio (${site.length} puntos)` : ''}</div>`;\n}\n\n// Encargos, entregas y revisi\u00f3n\nfunction tabEncargos() {\n  const E = PROY.encargos, X = PROY.entregas;\n  return `<div class=\"acc\" style=\"margin-top:0\"><button class=\"chico\" onclick=\"asignar(2)\">Asignar trazado</button><button class=\"chico\" onclick=\"asignar(4)\">Asignar dibujo completo</button></div>\n  <div class=\"card\"><h3 style=\"margin-top:0\">Encargos</h3>${E.length ? `<table><tr><th>Etapa</th><th>Dibujante</th><th>Fecha</th><th>Estado</th></tr>${E.map(e => `<tr><td>${e.paso}. ${esc(e.etapa)}${e.tipo === 'MODIFICACION' ? ' <span class=\"b b-na\">Mod.' + (e.rev ? ' Rev ' + esc(e.rev) : '') + '</span>' : ''}<br><span class=\"mu\">${esc(e.que)}</span></td><td>${esc(e.dibujanteNombre)}</td><td>${dmy(e.fecha)}</td><td>${badge(e.estado)} ${badge(e.alerta)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin encargos.</p>'}</div>\n  <div class=\"card\"><h3 style=\"margin-top:0\">Entregas</h3>${X.length ? X.map(x => `<div style=\"border-bottom:1px solid #EEF0F2;padding:8px 0\"><b>${x.paso}. ${esc(x.etapa)}</b> \u00b7 ronda ${x.ronda} \u00b7 ${esc(x.dibujanteNombre)} \u00b7 ${dmy(x.fecha)} ${badge(x.estado)}\n    <div class=\"mu\">${x.laminas} l\u00e1m. \u00d7 ${usd(x.valor)} = ${usd(x.total)}${x.estado === 'APROBADA' ? ' \u00b7 aprobado ' + usd(x.totalAprobado) : ''}</div><div>${x.archivos.map(a => `<a target=\"_blank\" href=\"${esc(a.url)}\">${esc(a.nombre)}</a>`).join(' \u00b7 ')}</div>\n    ${x.revision.filter(r => r.res === 'NO').length ? '<ul style=\"margin:6px 0\">' + x.revision.filter(r => r.res === 'NO').map(r => `<li>${esc(r.item)}${r.lamina ? ' (l\u00e1m. ' + esc(r.lamina) + ')' : ''}: ${esc(r.obs)}</li>`).join('') + '</ul>' : ''}\n    ${x.estado === 'ENTREGADA' ? `<button class=\"chico\" onclick='abrirRevision(${JSON.stringify(PROY.p.id)},${JSON.stringify(x.id)})'>Revisar</button>` : ''}</div>`).join('') : '<p class=\"mu\">Sin entregas.</p>'}</div>`;\n}\nasync function abrirRevision(pid, entId) {\n  if (!PROY || PROY.p.id !== pid) PROY = await call('proyecto', { id: pid });\n  const x = PROY.entregas.filter(z => z.id === entId)[0]; if (!x) return toast('Entrega no encontrada');\n  const def = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);\n  modal(`<h2>Revisi\u00f3n estructural \u00b7 ${esc(PROY.p.nombre)}</h2><div class=\"mu\">${x.paso}. ${esc(x.etapa)} \u00b7 ${esc(x.dibujanteNombre)} \u00b7 ronda ${x.ronda} \u00b7 ${dmy(x.fecha)}</div>\n  <p>${x.archivos.map(a => `<a target=\"_blank\" href=\"${esc(a.url)}\">${esc(a.nombre)}</a>`).join('<br>')}</p>${x.nota ? '<p class=\"mu\">Nota: ' + esc(x.nota) + '</p>' : ''}\n  <table class=\"chk\">${PROY.checklist.map((c, i) => `<tr><td style=\"width:42%\">${esc(c)}</td><td class=\"r\"><label><input type=\"radio\" name=\"ck${i}\" value=\"SI\" onchange=\"revUI()\">S\u00ed</label><label><input type=\"radio\" name=\"ck${i}\" value=\"NO\" onchange=\"revUI()\">No</label><label><input type=\"radio\" name=\"ck${i}\" value=\"NA\" onchange=\"revUI()\">N/A</label></td>\n  <td><input id=\"ckl${i}\" placeholder=\"L\u00e1mina\" style=\"width:80px;display:none\"></td><td><input id=\"cko${i}\" placeholder=\"Qu\u00e9 corregir\" style=\"display:none\"></td></tr>`).join('')}</table>\n  <div class=\"acc\"><button class=\"chico sec\" onclick=\"document.querySelectorAll('.chk input[value=SI]').forEach(r=>r.checked=true);revUI()\">Marcar todo S\u00ed</button></div>\n  <div id=\"rv_ok\"><h3>Confirmar l\u00e1minas (pasan a \"por pagar\")</h3><div class=\"fila\"><div><label>L\u00e1minas</label><input id=\"rv_l\" type=\"number\" value=\"${x.laminas}\"></div><div><label>Valor por l\u00e1mina</label><input id=\"rv_v\" type=\"number\" step=\"0.01\" value=\"${x.valor}\"></div></div></div>\n  <div id=\"rv_no\" style=\"display:none\"><label>Nueva fecha para las correcciones</label><input id=\"rv_f\" type=\"date\" value=\"${def}\"></div>\n  <label>Nota para la dibujante (opcional)</label><input id=\"rv_n\"><div class=\"acc\"><button id=\"rv_b\" class=\"ok\" onclick=\"enviarRevision('${x.id}')\">Aprobar</button></div>`);\n}\nfunction revUI() {\n  let no = 0; PROY.checklist.forEach((c, i) => { const r = document.querySelector(`input[name=ck${i}]:checked`), es = r && r.value === 'NO'; if (es) no++; $('#ckl' + i).style.display = es ? 'block' : 'none'; $('#cko' + i).style.display = es ? 'block' : 'none'; });\n  $('#rv_ok').style.display = no ? 'none' : 'block'; $('#rv_no').style.display = no ? 'block' : 'none';\n  const b = $('#rv_b'); b.textContent = no ? 'Devolver con ' + no + ' observaci\u00f3n(es)' : 'Aprobar'; b.className = no ? 'ro' : 'ok';\n}\nasync function enviarRevision(id) {\n  const items = PROY.checklist.map((c, i) => { const r = document.querySelector(`input[name=ck${i}]:checked`); return r ? { item: c, res: r.value, lamina: $('#ckl' + i).value, obs: $('#cko' + i).value } : null; }).filter(Boolean);\n  const r = await call('revisar', { entregaId: id, items: items, laminas: $('#rv_l').value, valor: $('#rv_v').value, nuevaFecha: $('#rv_f').value, nota: $('#rv_n').value });\n  PROY = await call('proyecto', { id: PROY.p.id }); VISTA = 'proyecto'; pintarProyecto(); avisoWa(r);\n}\n\n// Cambios de arquitectura\nfunction tabCambios() {\n  const C = PROY.cambios;\n  return `<div class=\"card\"><h3 style=\"margin-top:0\">Registrar cambio de arquitectura</h3><p class=\"mu\">Sube la nueva versi\u00f3n a 01_Arquitectura, reabre solo las etapas afectadas y no genera cobros ni pagos extra. P\u00eddame en el chat la comparaci\u00f3n del DXF nuevo con el anterior.</p>\n  ${zonaSubida('ca', { proyectoId: PROY.p.id, paso: 0 })}<label>Qu\u00e9 cambi\u00f3</label><textarea id=\"ca_d\"></textarea>\n  <div class=\"fila\"><div><label>Pedido por</label><input id=\"ca_p\" placeholder=\"Cliente / arquitecto\"></div><div><label>Impacto</label><select id=\"ca_i\" onchange=\"$('#ca_m').style.display=this.value==='MENOR'?'block':'none'\"><option value=\"\">Elegir\u2026</option>\n  <option value=\"MENOR\">Menor: tabiques, acabados (actualizar l\u00e1minas)</option><option value=\"MODERADO\">Moderado: vanos, voladizos, aberturas (modelo local y planos)</option><option value=\"MAYOR\">Mayor: ejes, alturas, pisos, uso (volver al paso 1)</option></select></div></div>\n  <div id=\"ca_m\" style=\"display:none\"><div class=\"fila\"><div><label>Dibujante para la modificaci\u00f3n</label><select id=\"ca_dib\">${PROY.dibujantes.map(d => `<option value=\"${esc(d.email)}\">${esc(d.nombre)}</option>`).join('')}</select></div><div><label>Fecha de entrega</label><input id=\"ca_f\" type=\"date\"></div></div></div>\n  <div class=\"acc\"><button onclick=\"registrarCambio()\">Registrar cambio</button></div></div>\n  <div class=\"card\"><h3 style=\"margin-top:0\">Historial de revisiones</h3>${C.length ? `<table><tr><th>Rev</th><th>Fecha</th><th>Descripci\u00f3n</th><th>Impacto</th><th>Reabiertas</th><th class=\"n\">L\u00e1m. rehechas</th></tr>${C.map(c => `<tr><td><b>${esc(c.Rev)}</b></td><td>${dmy(c.Fecha)}</td><td>${esc(c['Descripci\u00f3n'])}<br><span class=\"mu\">${esc(c['Pedido por'])} ${esc(c.Archivo)}</span></td><td>${esc(c.Impacto)}</td><td>${esc(c['Pasos reabiertos'])}</td><td class=\"n\">${esc(c['L\u00e1minas rehechas'])}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin cambios registrados.</p>'}</div>`;\n}\nasync function registrarCambio() {\n  const r = await call('registrarCambio', { proyectoId: PROY.p.id, descripcion: $('#ca_d').value, pedidoPor: $('#ca_p').value, impacto: $('#ca_i').value, archivos: SUBIDOS.ca || [],\n    dibujante: $('#ca_i').value === 'MENOR' ? $('#ca_dib').value : '', fecha: $('#ca_f') ? $('#ca_f').value : '', laminas: $('#ca_l') ? $('#ca_l').value : '' });\n  SUBIDOS.ca = []; PROY = await call('proyecto', { id: PROY.p.id }); pintarProyecto(); avisoWa(r);\n}\n\n// Cuentas del proyecto\nfunction tabCuentasP() {\n  const p = PROY.p;\n  return `<div class=\"kpis\"><div class=\"kpi\"><div>Valor</div><b>${usd(p.valor)}</b></div><div class=\"kpi\"><div>Cobrado</div><b style=\"color:var(--ok)\">${usd(p.cobrado)}</b></div>\n  <div class=\"kpi\"><div>Por cobrar hoy</div><b style=\"color:var(--na)\">${usd(p.porPagarHoy)}</b></div><div class=\"kpi\"><div>A la entrega</div><b style=\"color:var(--az)\">${usd(p.aLaEntrega)}</b></div>\n  <div class=\"kpi\"><div>Costo de dibujo aprobado</div><b>${usd(p.costoDibujo)}</b></div><div class=\"kpi\"><div>Por pagar a dibujantes</div><b style=\"color:var(--na)\">${usd(p.porPagar)}</b></div><div class=\"kpi\"><div>Margen</div><b>${usd(p.margen)}</b></div></div>\n  <div class=\"acc\"><button onclick=\"formCobro('${p.id}')\">Registrar cobro del cliente</button><button class=\"sec\" onclick=\"formPago('${p.id}')\">Registrar pago a dibujante</button></div>\n  <div class=\"grid\" style=\"margin-top:12px\"><div class=\"card\"><h3 style=\"margin-top:0\">Cobros</h3>${movTabla(PROY.cobros)}${p.abonos > 0 ? `<p class=\"mu\">M\u00e1s ${usd(p.abonos)} de abonos a cuenta del cliente aplicados a este proyecto.</p>` : ''}</div><div class=\"card\"><h3 style=\"margin-top:0\">Pagos a dibujantes</h3>${movTabla(PROY.pagos, 1)}</div></div>`;\n}\nfunction movTabla(L, dib) { return L.length ? `<table>${L.map(m => `<tr><td>${dmy(m.Fecha)}</td><td>${dib ? esc(m.Dibujante) + '<br>' : ''}<span class=\"mu\">${esc(m.Detalle)}</span></td><td class=\"n\">${usd(m.Monto)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin registros.</p>'; }\nfunction formCobro(pid, cli) {\n  const cn = cli ? ((window.CUENTAS ? CUENTAS.clientes : []).filter(c => c.clave === cli)[0] || {}).nombre || cli : '';\n  modal(`<h2>${pid ? 'Registrar cobro' : 'Abono a cuenta \u00b7 ' + esc(cn)}</h2>${pid ? '' : '<p class=\"mu\">No va a un proyecto: se aplica solo a los proyectos del cliente con saldo, del m\u00e1s antiguo al m\u00e1s nuevo.</p>'}<div class=\"fila\"><div><label>Monto (USD)</label><input id=\"co_m\" type=\"number\" step=\"0.01\"></div><div><label>Fecha</label><input id=\"co_f\" type=\"date\" value=\"${hoy()}\"></div></div>\n  <label>Detalle</label><input id=\"co_d\" placeholder=\"Ej.: Anticipo 50 % \u00b7 transferencia\"><label>Comprobante (opcional)</label>${zonaSubida('co', pid ? { proyectoId: pid, paso: 99 } : { abono: 'cliente', cliente: cli, paso: 99 })}<div class=\"acc\"><button onclick=\"guardarCobro('${pid || ''}','${esc(cli || '')}')\">Registrar</button></div>`);\n}\nasync function guardarCobro(pid, cli) {\n  const r = await call('registrarCobro', { proyectoId: pid, cliente: cli, monto: $('#co_m').value, fecha: $('#co_f').value, detalle: $('#co_d').value, archivos: SUBIDOS.co || [] }); SUBIDOS.co = [];\n  modal(`<h2>Cobro registrado</h2><p>${esc(r.msg)}</p>${r.porPagar.length ? `<h3>Por pagar a dibujantes en este proyecto</h3><table>${r.porPagar.map(x => `<tr><td>${esc(x.nombre)}</td><td class=\"n\">${usd(x.monto)}</td><td class=\"der\"><button class=\"chico\" onclick=\"formPago('${pid}','${esc(x.email)}',${x.monto})\">Registrar pago</button></td></tr>`).join('')}</table>` : '<p class=\"mu\">No hay nada por pagar a dibujantes en este proyecto.</p>'}\n  <div class=\"acc\"><button class=\"sec\" onclick=\"cerrar();VISTA==='proyecto'&&'${pid}'?ir('proyecto','${pid}'):ir('cuentas')\">Cerrar</button></div>`);\n}\nfunction formPago(pid, email, monto) {\n  const D = (PROY && PROY.dibujantes) || (window.CUENTAS ? CUENTAS.dibujantes : []), P = window.CUENTAS ? CUENTAS.proyectos : [PROY.p];\n  modal(`<h2>Registrar pago a dibujante</h2><p class=\"mu\">La transferencia la hace usted por fuera; aqu\u00ed solo se registra y se le avisa.</p>\n  <div class=\"fila\"><div><label>Dibujante</label><select id=\"pa_d\">${D.map(d => `<option value=\"${esc(d.email)}\" ${d.email === email ? 'selected' : ''}>${esc(d.nombre)}</option>`).join('')}</select></div>\n  <div><label>Aplicar a</label><select id=\"pa_p\"><option value=\"\" ${pid ? '' : 'selected'}>Abono a su cuenta (sin proyecto)</option>${P.map(p => `<option value=\"${esc(p.id)}\" ${p.id === pid ? 'selected' : ''}>${esc(p.nombre)}</option>`).join('')}</select></div>\n  <div><label>Monto (USD)</label><input id=\"pa_m\" type=\"number\" step=\"0.01\" value=\"${monto || ''}\"></div><div><label>Fecha</label><input id=\"pa_f\" type=\"date\" value=\"${hoy()}\"></div><div><label>L\u00e1minas</label><input id=\"pa_l\"></div></div>\n  <label>Detalle</label><input id=\"pa_x\" placeholder=\"Ej.: Transferencia Banco Guayaquil\"><label>Comprobante (opcional)</label>${zonaSubida('pa', pid ? { proyectoId: pid, paso: 99 } : { abono: 'dibujante', paso: 99 })}\n  <div class=\"acc\"><button onclick=\"guardarPago()\">Registrar pago</button></div>`);\n}\nasync function guardarPago() {\n  const pid = $('#pa_p').value, r = await call('registrarPago', { proyectoId: pid, dibujante: $('#pa_d').value, monto: $('#pa_m').value, fecha: $('#pa_f').value, laminas: $('#pa_l').value, detalle: $('#pa_x').value, archivos: SUBIDOS.pa || [] });\n  SUBIDOS.pa = []; cerrar(); toast(r.msg); VISTA === 'proyecto' && pid ? ir('proyecto', pid) : ir('cuentas');\n}\nfunction tabDatos() {\n  const p = PROY.p;\n  return `<div class=\"card\"><label>Cliente</label><select id=\"dp_c\">${PROY.clientes.map(c => `<option value=\"${esc(c.Clave)}\" ${c.Clave === p.cliente ? 'selected' : ''}>${esc(c.Contratante)}</option>`).join('')}</select>\n  <div class=\"fila\"><div><label>Proyecto</label><input id=\"dp_n\" value=\"${esc(p.nombre)}\"></div><div><label>Descripci\u00f3n</label><input id=\"dp_d\" value=\"${esc(p.desc)}\"></div><div><label>Servicio</label><input id=\"dp_s\" value=\"${esc(p.servicio)}\"></div></div>\n  <div class=\"fila\"><div><label>Valor del contrato (USD)</label><input id=\"dp_v\" type=\"number\" step=\"0.01\" value=\"${p.valor || ''}\"></div><div><label>Anticipo %</label><input id=\"dp_a\" type=\"number\" value=\"${p.anticipo}\"></div>\n  <div><label>Fecha de entrega al cliente</label><input id=\"dp_f\" type=\"date\" value=\"${esc(p.entrega || '')}\"></div><div><label>Entregado al cliente</label><select id=\"dp_e\"><option value=\"NO\">No</option><option value=\"SI\" ${p.entregado ? 'selected' : ''}>S\u00ed</option></select></div></div>\n  <label>Notas</label><textarea id=\"dp_x\">${esc(PROY.notas)}</textarea><div class=\"acc\"><button onclick=\"guardarDatos()\">Guardar</button><button class=\"sec\" onclick=\"prepCarpetas()\">Revisar carpetas</button></div>\n  <p class=\"mu\">\"Entregado\" se marca solo al aprobar la memoria (paso 10); con eso el saldo pasa a \"por pagar hoy\" en el estado de cuenta.</p></div>` + zonaPeligro();\n}\nasync function guardarDatos() { await call('guardarProyecto', { ID: PROY.p.id, Cliente: $('#dp_c').value, Proyecto: $('#dp_n').value, 'Descripci\u00f3n': $('#dp_d').value, Servicio: $('#dp_s').value, 'Valor contrato': $('#dp_v').value, 'Anticipo %': $('#dp_a').value, Entregado: $('#dp_e').value, 'Fecha entrega': $('#dp_f').value, Notas: $('#dp_x').value }); toast('Guardado'); ir('proyecto', PROY.p.id); }\nfunction zonaPeligro() {\n  return `<div class=\"card\" style=\"border-color:#E3C9C6\"><h3 style=\"margin-top:0\">Archivar o eliminar</h3>\n  <p class=\"mu\"><b>Archivar</b> (recomendado): el proyecto sale del inicio, de los totales y del resumen diario, pero se conserva todo (cuentas, archivos, historial). Se restaura cuando quiera.</p>\n  <p class=\"mu\"><b>Eliminar</b>: borra el proyecto del portal. Solo se permite si no tiene cobros, pagos ni entregas registradas.</p>\n  <div class=\"acc\"><button class=\"sec\" onclick=\"archivar('${PROY.p.id}',false)\">Archivar</button><button style=\"background:var(--ro)\" onclick=\"eliminarModal()\">Eliminar\u2026</button></div></div>`;\n}\nasync function archivar(id, restaurar) { const r = await call('archivarProyecto', { id: id, restaurar: restaurar }); toast(r.msg, 6000); ir(restaurar ? 'proyecto' : 'inicio', restaurar ? id : undefined); }\nfunction eliminarModal() {\n  modal(`<h2>Eliminar proyecto</h2><p>Esto borra <b>${esc(PROY.p.nombre)}</b> del portal: etapas, ficha t\u00e9cnica, encargos y cambios. No se puede deshacer.</p>\n  <label><input type=\"checkbox\" id=\"el_c\" style=\"width:auto\"> Enviar tambi\u00e9n la carpeta de Drive a la papelera (se recupera hasta 30 d\u00edas)</label>\n  <label>Para confirmar, escriba el nombre del proyecto</label><input id=\"el_n\" placeholder=\"${esc(PROY.p.nombre)}\">\n  <div class=\"acc\"><button class=\"sec\" onclick=\"cerrar()\">Cancelar</button><button style=\"background:var(--ro)\" onclick=\"eliminarOk()\">Eliminar definitivamente</button></div>`);\n}\nasync function eliminarOk() { const r = await call('eliminarProyecto', { id: PROY.p.id, confirmar: $('#el_n').value, carpeta: $('#el_c').checked }); cerrar(); toast(r.msg, 8000); PROY = null; ir('inicio'); }\nasync function prepCarpetas() { const r = await call('prepararCarpetas', { id: PROY.p.id }); toast(r.msg, 8000); }\n\n// \u2500\u2500 CUENTAS (JUAN) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarCuentas(C) {\n  window.CUENTAS = C; PROY = null;\n  let h = `<h2 style=\"margin-top:4px\">Clientes</h2><div class=\"card\"><table><tr><th>Cliente</th><th class=\"n\">Contratado</th><th class=\"n\">Cobrado</th><th class=\"n\">Saldo</th><th></th></tr>${C.clientes.map(c => `<tr><td><b>${esc(c.nombre)}</b><br><span class=\"mu\">${esc(c.contacto)} ${esc(c.correo)}</span></td><td class=\"n\">${usd(c.valor)}</td><td class=\"n\">${usd(c.cobrado)}</td><td class=\"n\"><b>${usd(c.porCobrar)}</b></td>\n  <td class=\"der\"><button class=\"chico\" onclick=\"verEstado('cliente','${esc(c.clave)}')\">Estado de cuenta</button> <button class=\"chico sec\" onclick=\"formCobroG('${esc(c.clave)}')\">Abono</button>${c.aFavor > 0 ? '<br><span class=\"mu\">A favor: ' + usd(c.aFavor) + '</span>' : ''}</td></tr>`).join('')}</table>\n  <div class=\"acc\"><button class=\"chico sec\" onclick=\"formCobroG()\">Registrar cobro</button></div></div>\n  <h2>Dibujantes</h2><div class=\"card\"><table><tr><th>Dibujante</th><th class=\"n\">Aprobado</th><th class=\"n\">Pagado</th><th class=\"n\">Por pagar</th><th class=\"n\">Por confirmar</th><th></th></tr>${C.dibujantes.map(d => `<tr><td><b>${esc(d.nombre)}</b></td><td class=\"n\">${usd(d.aprobado)}</td><td class=\"n\">${usd(d.pagado)}</td><td class=\"n\"><b style=\"color:var(--na)\">${usd(d.porPagar)}</b></td><td class=\"n mu\">${usd(d.porConfirmar)}</td>\n  <td class=\"der\"><button class=\"chico\" onclick=\"verEstado('dibujante','${esc(d.email)}')\">Estado</button> <button class=\"chico sec\" onclick=\"formPago('','${esc(d.email)}')\">Pago</button></td></tr>`).join('')}</table></div>\n  <h2>\u00daltimos movimientos</h2><div class=\"card\">${C.movimientos.length ? `<table>${C.movimientos.map(m => `<tr><td>${dmy(m.Fecha)}</td><td>${m.Tipo === 'COBRO' ? '<span class=\"b b-ok\">Cobro</span>' : '<span class=\"b b-na\">Pago</span>'}</td><td>${m['Proyecto ID'] ? esc((C.proyectos.filter(p => p.id === m['Proyecto ID'])[0] || {}).nombre || '') : '<i>Abono a cuenta</i>'}<br><span class=\"mu\">${esc(m.Dibujante || m.Cliente)} \u00b7 ${esc(m.Detalle)}</span></td><td class=\"n\">${usd(m.Monto)}</td></tr>`).join('')}</table>` : '<p class=\"mu\">Sin movimientos.</p>'}</div>`;\n  marco(h);\n}\nconst opP = c => `<option value=\"\">Abono a cuenta (sin proyecto)</option>` + CUENTAS.proyectos.filter(p => p.cliente === c).map(p => `<option value=\"${esc(p.id)}\">${esc(p.nombre)}</option>`).join('');\nfunction formCobroG(cli) {\n  cli = cli || (CUENTAS.clientes[0] || {}).clave;\n  modal(`<h2>Registrar cobro</h2><label>Cliente</label><select id=\"cg_c\" onchange=\"$('#cg_p').innerHTML=opP(this.value)\">${CUENTAS.clientes.map(c => `<option value=\"${esc(c.clave)}\" ${c.clave === cli ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select>\n  <label>Aplicar a</label><select id=\"cg_p\">${opP(cli)}</select><p class=\"mu\">Los abonos a cuenta se aplican solos a los proyectos con saldo, del m\u00e1s antiguo al m\u00e1s nuevo.</p><div class=\"acc\"><button onclick=\"formCobro($('#cg_p').value,$('#cg_c').value)\">Continuar</button></div>`);\n}\nasync function verEstado(tipo, clave) {\n  const r = await call('estadoCuenta', { tipo: tipo, clave: clave });\n  modal(`<h2>Estado de cuenta</h2><div class=\"ecw\" id=\"ec_w\"><iframe id=\"ec_if\" style=\"width:820px;height:1100px\"></iframe></div>\n  <div class=\"acc\">${ROL === 'ADMIN' ? `<button onclick=\"enviarEstado('${tipo}','${esc(clave)}')\">Enviar por correo${r.para ? ' a ' + esc(r.para) : ''}</button>` : ''}<button class=\"sec\" onclick=\"descargarEstado('${tipo}','${esc(clave)}')\">Descargar PDF</button></div>`);\n  const f = $('#ec_if'), w = $('#ec_w');\n  const ajustar = () => { let h = 1100; try { h = f.contentDocument.documentElement.scrollHeight || h; } catch (e) { } f.style.height = h + 'px';\n    const s = Math.min(1, w.clientWidth / 820); f.style.transform = 'scale(' + s + ')'; w.style.height = Math.ceil(h * s) + 'px'; };\n  f.onload = () => { ajustar(); setTimeout(ajustar, 300); }; f.srcdoc = r.html; window.addEventListener('resize', ajustar);\n}\nasync function enviarEstado(tipo, clave) {\n  const r = await call('enviarEstado', { tipo: tipo, clave: clave });\n  modal(`<h2>Enviado</h2><p>${esc(r.msg)}</p>${r.pdf ? `<p><a target=\"_blank\" href=\"${esc(r.pdf)}\">Ver el PDF en Drive</a></p>` : ''}${r.wa ? '<p>Env\u00edelo tambi\u00e9n por WhatsApp (un toque):</p>' + waBtn(r.wa) : ''} <button class=\"sec\" onclick=\"cerrar()\">Cerrar</button>`);\n}\nasync function descargarEstado(tipo, clave) {\n  const r = await call('descargarEstado', { tipo: tipo, clave: clave });\n  const bin = atob(r.b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);\n  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([u8], { type: 'application/pdf' })); a.download = r.nombre; a.target = '_blank'; document.body.appendChild(a); a.click(); a.remove();\n}\n\n// \u2500\u2500 AJUSTES \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarAjustes(A) {\n  const fila = (t, campos, o, accion) => `<tr>${campos.map(c => `<td><input data-c=\"${c}\" value=\"${esc(o[c] == null ? '' : String(o[c]).replace(/^'/, ''))}\"></td>`).join('')}<td><button class=\"chico\" onclick=\"guardarAj(this,'${accion}')\">Guardar</button></td></tr>`;\n  const U = ['Correo', 'Nombre', 'Iniciales', 'Rol', 'WhatsApp', 'Zona horaria', 'Valor l\u00e1mina', 'Activo'], Cc = ['Clave', 'Contratante', 'Contacto', 'Correo', 'WhatsApp', 'Carpeta ID', 'Activo'];\n  marco(`<p class=\"mu\">Correos disponibles hoy: ${A.cuota}.</p>\n  <h2>Usuarios</h2><div class=\"card\" style=\"overflow:auto\"><table><tr>${U.map(c => `<th>${c}</th>`).join('')}<th></th></tr>${A.usuarios.map(o => fila('u', U, o, 'guardarUsuario')).join('')}${fila('u', U, { Rol: 'DIBUJANTE', 'Zona horaria': 'America/Guayaquil', 'Valor l\u00e1mina': 35, Activo: 'SI' }, 'guardarUsuario')}</table>\n  <p class=\"mu\">Rol: ADMIN o DIBUJANTE. Zona horaria: America/Guayaquil, Europe/Rome\u2026 Activo: SI o NO. La \u00faltima fila sirve para agregar.</p></div>\n  <h2>Clientes</h2><div class=\"card\" style=\"overflow:auto\"><table><tr>${Cc.map(c => `<th>${c}</th>`).join('')}<th></th></tr>${A.clientes.map(o => fila('c', Cc, o, 'guardarCliente')).join('')}${fila('c', Cc, { Activo: 'SI' }, 'guardarCliente')}</table><p class=\"mu\">Carpeta ID vac\u00eda: se crea en Contratantes con el nombre del cliente.</p></div>\n  <h2>Configuraci\u00f3n</h2><div class=\"card\">${A.config.map(o => `<div class=\"fila\" style=\"align-items:end\"><div><label>${esc(o.Clave)}</label>${/Datos de pago|Despu\u00e9s/.test(o.Clave) ? `<textarea data-c=\"Valor\">${esc(o.Valor)}</textarea>` : `<input data-c=\"Valor\" value=\"${esc(o.Valor)}\">`}<input type=\"hidden\" data-c=\"Clave\" value=\"${esc(o.Clave)}\"><div class=\"mu\">${esc(o.Nota)}</div></div><div><button class=\"chico\" onclick=\"guardarAj(this,'guardarConfig')\">Guardar</button></div></div>`).join('')}</div>`);\n}\nasync function guardarAj(btn, accion) { const box = btn.closest('tr') || btn.closest('.fila'), o = {}; box.querySelectorAll('[data-c]').forEach(i => o[i.dataset.c] = i.value); const r = await call(accion, o); toast(r.msg); ir('ajustes'); }\n\n// \u2500\u2500 DIBUJANTE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nfunction pintarDibujante() {\n  const D = DATA, c = D.cuenta, ab = D.encargos.filter(e => ['ASIGNADO', 'CORRECCIONES'].indexOf(e.estado) >= 0), otros = D.encargos.filter(e => ab.indexOf(e) < 0);\n  const tarjeta = e => `<div class=\"card\" style=\"cursor:pointer\" onclick=\"ir('encargo','${e.id}')\"><div class=\"mu\">${esc(e.cliente)}</div><b style=\"font-size:15px\">${esc(e.proyecto)}</b>\n    <div>${e.paso}. ${esc(e.etapa)} ${e.tipo === 'MODIFICACION' ? '<span class=\"b b-na\">Modificaci\u00f3n</span>' : ''} ${badge(e.estado)} ${badge(e.alerta)}</div>\n    <div class=\"mu\" style=\"margin-top:6px\">${e.tipo === 'MODIFICACION' ? 'Entrega' : 'Entrega del proyecto'}: <b>${dmy(e.fecha)}</b>${e.dias != null && ['ASIGNADO', 'CORRECCIONES'].indexOf(e.estado) >= 0 ? ' \u00b7 ' + (e.dias < 0 ? Math.abs(e.dias) + ' d\u00edas de atraso' : e.dias + ' d\u00edas') : ''}</div></div>`;\n  marco(`<h1>Hola, ${esc(D.yo.nombre)}</h1><h2>Encargos abiertos</h2>${ab.length ? '<div class=\"grid\">' + ab.map(tarjeta).join('') + '</div>' : '<p class=\"mu\">No tiene encargos abiertos.</p>'}\n  <h2>Mi estado de cuenta</h2><div class=\"kpis\"><div class=\"kpi\"><div>Aprobado</div><b>${usd(c.aprobado)}</b></div><div class=\"kpi\"><div>Pagado</div><b style=\"color:var(--ok)\">${usd(c.pagado)}</b></div>\n  <div class=\"kpi\"><div>Por pagar</div><b style=\"color:var(--na)\">${usd(c.porPagar)}</b></div><div class=\"kpi\"><div>Por confirmar</div><b class=\"mu\">${usd(c.porConfirmar)}</b></div></div>\n  <div class=\"acc\" style=\"margin-top:0\"><button class=\"sec\" onclick=\"verEstado('dibujante','')\">Ver y descargar estado de cuenta</button></div>\n  ${otros.length ? '<h2>Anteriores</h2><div class=\"grid\">' + otros.map(tarjeta).join('') + '</div>' : ''}`);\n}\nfunction pintarEncargo(r) {\n  const e = r.e, abierto = ['ASIGNADO', 'CORRECCIONES'].indexOf(e.estado) >= 0, ult = r.entregas[0];\n  const obs = ult && ult.estado === 'CON OBSERVACIONES' ? ult.revision.filter(x => x.res === 'NO') : [];\n  SUBIDOS.en = [];\n  marco(`<div class=\"mu\"><a onclick=\"ir('inicio')\" style=\"cursor:pointer\">\u2190 Volver</a> \u00b7 ${esc(e.cliente)}</div><h1 style=\"margin:6px 0\">${esc(e.proyecto)}</h1>\n  <div>${e.paso}. ${esc(e.etapa)} ${e.tipo === 'MODIFICACION' ? '<span class=\"b b-na\">Modificaci\u00f3n' + (e.rev ? ' \u00b7 Rev. ' + esc(e.rev) : '') + '</span>' : ''} ${badge(e.estado)} ${badge(e.alerta)}</div>\n  <div class=\"card\" style=\"margin-top:12px\"><table><tr><td class=\"mu\" style=\"width:150px\">Qu\u00e9 entregar</td><td>${esc(e.que).replace(/\\n/g, '<br>')}</td></tr><tr><td class=\"mu\">${e.tipo === 'MODIFICACION' ? 'Fecha de entrega' : 'Entrega del proyecto completo'}</td><td><b>${esc(r.limite)}</b></td></tr>\n  ${e.obs ? `<tr><td class=\"mu\">Observaciones</td><td>${esc(e.obs)}</td></tr>` : ''}\n  ${(r.adjuntos || []).length ? `<tr><td class=\"mu\">Predimensionamiento</td><td>${r.adjuntos.map(a => `<a target=\"_blank\" href=\"${esc(a.url)}\">${/^Nota de voz/i.test(a.nombre) ? '\ud83c\udf99 ' : '\ud83d\udcce '}${esc(a.nombre)}</a>`).join('<br>')}</td></tr>` : ''}\n  <tr><td class=\"mu\">Archivos base</td><td>${Object.keys(r.carpetas).map(k => `<a target=\"_blank\" href=\"${esc(r.carpetas[k])}\">${esc(k)}</a>`).join(' \u00b7 ') || '\u2014'}</td></tr></table></div>\n  ${obs.length ? `<div class=\"card\" style=\"border-color:#F2C1BB\"><h3 style=\"margin-top:0;color:var(--ro)\">Correcciones pedidas (ronda ${ult.ronda})</h3><ol>${obs.map(x => `<li><b>${esc(x.item)}</b>${x.lamina ? ' \u00b7 l\u00e1mina ' + esc(x.lamina) : ''}: ${esc(x.obs)}</li>`).join('')}</ol>${ult.nota ? '<p>' + esc(ult.nota) + '</p>' : ''}</div>` : ''}\n  ${abierto ? `<div class=\"card\"><h3 style=\"margin-top:0\">Subir entrega</h3><p class=\"mu\">Suba el <b>DWG</b> y tambi\u00e9n el <b>DXF</b> (Guardar como \u2192 DXF AutoCAD 2018), dibujados desde la plantilla de capas EST-. Puede subir PDF de apoyo.</p>\n  ${zonaSubida('en', { encargoId: e.id })}<div class=\"fila\"><div><label>N\u00famero de l\u00e1minas${e.tipo === 'MODIFICACION' ? ' nuevas (las modificadas no suman)' : ''}</label><input id=\"en_l\" type=\"number\" value=\"${e.tipo === 'MODIFICACION' ? 0 : (e.laminas || '')}\"></div>\n  <div><label>Valor por l\u00e1mina (USD)</label><input id=\"en_v\" type=\"number\" step=\"0.01\" value=\"${r.valorDef}\"></div><div><label>Total</label><input id=\"en_t\" disabled></div></div>\n  <label>Nota para Juan (opcional)</label><input id=\"en_n\"><div class=\"acc\"><button onclick=\"entregar('${e.id}')\">Enviar entrega</button></div></div>` : ''}\n  <div class=\"card\"><h3 style=\"margin-top:0\">Mis entregas</h3>${r.entregas.length ? r.entregas.map(x => `<div style=\"padding:6px 0;border-bottom:1px solid #EEF0F2\">Ronda ${x.ronda} \u00b7 ${dmy(x.fecha)} ${badge(x.estado)} <span class=\"mu\">${x.laminas} l\u00e1m. \u00d7 ${usd(x.valor)}${x.estado === 'APROBADA' ? ' \u00b7 aprobado ' + usd(x.totalAprobado) : ''}</span><div>${x.archivos.map(a => `<a target=\"_blank\" href=\"${esc(a.url)}\">${esc(a.nombre)}</a>`).join(' \u00b7 ')}</div></div>`).join('') : '<p class=\"mu\">A\u00fan no hay entregas.</p>'}</div>`);\n  const tot = () => { if ($('#en_t')) $('#en_t').value = usd((Number($('#en_l').value) || 0) * (Number($('#en_v').value) || 0)); };\n  if ($('#en_l')) { $('#en_l').oninput = tot; $('#en_v').oninput = tot; tot(); }\n}\nasync function entregar(id) {\n  const A = SUBIDOS.en || [];\n  if (!A.some(a => /\\.dwg$/i.test(a.nombre)) || !A.some(a => /\\.dxf$/i.test(a.nombre))) return toast('Falta subir el DWG y el DXF.', 6000);\n  const r = await call('entregar', { encargoId: id, archivos: A, laminas: $('#en_l').value, valor: $('#en_v').value, nota: $('#en_n').value });\n  SUBIDOS.en = []; toast(r.msg, 6000); ir('inicio');\n}\n\n// \u2500\u2500 SUBIDA DE ARCHIVOS (por trozos, archivos grandes) \u2500\u2500\nconst SUBIDOS = {};\nfunction zonaSubida(k, ctx) {\n  SUBIDOS[k] = SUBIDOS[k] || [];\n  return `<div class=\"drop\"><input type=\"file\" ${ctx.ext ? 'accept=\"' + ctx.ext.map(e => '.' + e).join(',') + '\"' : 'multiple'} onchange='subirArchivos(this,${JSON.stringify(k)},${JSON.stringify(ctx)})' style=\"border:0\"><div id=\"up_${k}\" class=\"prog\">${SUBIDOS[k].map(a => '\u2713 ' + esc(a.nombre)).join('<br>')}</div></div>`;\n}\nconst b64 = blob => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1]); r.onerror = no; r.readAsDataURL(blob); });\nasync function subirArchivos(inp, k, ctx) {\n  const files = [].slice.call(inp.files); inp.disabled = true;\n  if (ctx.ext) { const malos = files.filter(f => !new RegExp('\\\\.(' + ctx.ext.join('|') + ')$', 'i').test(f.name)); if (malos.length) { toast('Este espacio solo acepta .' + ctx.ext.join(' o .') + ': ' + malos.map(f => f.name).join(', '), 7000); inp.disabled = false; inp.value = ''; return; } }\n  await subirLista(files, k, ctx);\n  inp.disabled = false; inp.value = '';\n  if (ctx.req) verArchivos(ctx.paso);\n}\nasync function subirLista(files, k, ctx) {\n  const box = $('#up_' + k);\n  for (const f of files) {\n    const linea = document.createElement('div'); box.appendChild(linea);\n    try {\n      linea.textContent = f.name + ': preparando\u2026';\n      const ini = await call('iniciarSubida', Object.assign({ nombre: f.name, mime: f.type || 'application/octet-stream', tam: f.size }, ctx), true);\n      let pos = 0, fin = null;\n      if (f.size === 0) throw new Error('archivo vac\u00edo');\n      while (pos < f.size) {\n        const parte = f.slice(pos, Math.min(pos + ini.trozo, f.size));\n        const r = await call('subirTrozo', { sid: ini.sid, b64: await b64(parte), inicio: pos, tam: f.size }, true);\n        pos += parte.size; linea.textContent = f.name + ': ' + Math.round(pos / f.size * 100) + '%';\n        if (r.listo) fin = r;\n      }\n      if (!fin) throw new Error('Drive no confirm\u00f3 el archivo');\n      SUBIDOS[k].push({ id: fin.id, nombre: f.name, url: fin.url }); linea.innerHTML = '\u2713 ' + esc(f.name);\n    } catch (e) { linea.innerHTML = '<span style=\"color:var(--ro)\">\u2717 ' + esc(f.name) + ': ' + esc(e.message || e) + '</span>'; }\n  }\n}\n\n// \u2500\u2500 NOTA DE VOZ \u2500\u2500\n// En la app CEV (GitHub Pages) graba la p\u00e1gina principal, que s\u00ed tiene permiso de micr\u00f3fono, y devuelve el audio por postMessage.\n// Fuera de la app: intenta grabar aqu\u00ed; si el navegador no lo permite, abre la grabadora/selector de audio del tel\u00e9fono.\nlet VOZ = null;\nconst nombreVoz = mime => 'Nota de voz ' + new Date().toTimeString().slice(0, 5).replace(':', 'h') + (/mp4|aac|m4a/.test(mime) ? '.m4a' : /ogg/.test(mime) ? '.ogg' : '.webm');\nfunction notaVoz(k, ctx) {\n  VOZ = { k: k, ctx: ctx };\n  if (window.top !== window) { let ok = false; const t = setTimeout(() => { if (!ok) grabarAqui(); }, 700);\n    VOZ.ping = () => { ok = true; clearTimeout(t); }; window.top.postMessage({ cev: 'grabar' }, '*'); }\n  else grabarAqui();\n}\nwindow.addEventListener('message', async ev => {\n  const m = ev.data || {}; if (!m.cev || !VOZ) return;\n  if (m.cev === 'listo') { VOZ.ping && VOZ.ping(); return; }\n  if (m.cev === 'audio') { const bin = atob(m.b64), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);\n    await subirLista([new File([u], nombreVoz(m.mime), { type: m.mime })], VOZ.k, VOZ.ctx); }\n});\nasync function grabarAqui() {\n  try {\n    const st = await navigator.mediaDevices.getUserMedia({ audio: true }), rec = new MediaRecorder(st), partes = [];\n    rec.ondataavailable = e => partes.push(e.data);\n    rec.onstop = async () => { st.getTracks().forEach(t => t.stop()); cerrar(); const mime = rec.mimeType || 'audio/webm';\n      await subirLista([new File(partes, nombreVoz(mime), { type: mime })], VOZ.k, VOZ.ctx); };\n    rec.start(); const t0 = Date.now(); VOZ.rec = rec;\n    modal2(`<h2>\ud83c\udf99 Grabando\u2026</h2><p id=\"voz_t\" style=\"font-size:22px\">0:00</p><div class=\"acc\"><button onclick=\"VOZ.rec.stop()\">Detener y adjuntar</button></div>`);\n    VOZ.int = setInterval(() => { const s = Math.round((Date.now() - t0) / 1000), el = $('#voz_t'); if (el) el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); else clearInterval(VOZ.int); }, 500);\n  } catch (e) {\n    const i = document.createElement('input'); i.type = 'file'; i.accept = 'audio/*'; i.setAttribute('capture', '');\n    i.onchange = () => subirLista([].slice.call(i.files), VOZ.k, VOZ.ctx); i.click();\n  }\n}\nfunction modal2(h) { const d = document.createElement('div'); d.id = 'voz_m'; d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:99';\n  d.innerHTML = '<div class=\"card\" style=\"min-width:260px;text-align:center\">' + h + '</div>'; document.body.appendChild(d);\n  const old = window.cerrar; window.cerrar = function () { const x = $('#voz_m'); if (x) { x.remove(); window.cerrar = old; } else old(); }; }\n\narrancar();\n</script></body></html>\n";
