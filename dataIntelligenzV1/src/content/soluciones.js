import {
  faRobot,
  faDiagramProject,
  faFileInvoice,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

export const solucionesIA = [
  {
    id: "agentes-erp",
    icon: faRobot,
    title: "Agentes de IA sobre tu ERP",
    short: "Pregunta en lenguaje natural y obtén respuestas con datos reales del ERP.",
    problem: "La información existe, pero obtenerla requiere exportar reportes y armar hojas de cálculo.",
    solution: "Un asistente conectado al ERP responde preguntas de ventas, cobranza, inventario y finanzas, y ejecuta tareas con los permisos que definas.",
    impact: "Respuestas en segundos en lugar de horas de consulta.",
  },
  {
    id: "flujos-automaticos",
    icon: faDiagramProject,
    title: "Automatización de back-office",
    short: "Flujos que capturan, validan y mueven información entre sistemas sin intervención manual.",
    problem: "El equipo dedica horas a copiar datos entre correos, portales, Excel y el ERP.",
    solution: "Flujos automáticos para cobranza, conciliación bancaria, compras y facturación, con aprobaciones donde hacen falta.",
    impact: "Menos captura, menos errores y procesos que corren solos.",
  },
  {
    id: "documentos",
    icon: faFileInvoice,
    title: "Lectura inteligente de documentos",
    short: "Facturas, órdenes y comprobantes leídos y validados automáticamente.",
    problem: "Revisar facturas de proveedores contra órdenes de compra es lento y propenso a errores.",
    solution: "La IA extrae los datos del XML o PDF, los valida contra el ERP y deja el documento listo para autorizar.",
    impact: "Recepción documental ágil y con trazabilidad completa.",
  },
  {
    id: "alertas",
    icon: faBell,
    title: "Alertas financieras predictivas",
    short: "Anticipa faltantes de liquidez, cartera vencida y desviaciones antes de que ocurran.",
    problem: "Los problemas de flujo o de cartera se detectan cuando ya es tarde para actuar.",
    solution: "Modelos que proyectan cobros, pagos y saldos, y avisan al responsable cuando algo se sale del rango esperado.",
    impact: "Decisiones preventivas en lugar de correctivas.",
  },
];
