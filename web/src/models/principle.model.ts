export type Principle = { title: string; body: string; aside: string };

export const PRINCIPLES: Principle[] = [
  {
    title: "La arquitectura es una decisión, no un accidente.",
    body: "Dominios, límites y contratos van antes que la implementación.",
    aside: "Primero el plano. Luego la sonrisa.",
  },
  {
    title: "Lo simple le gana a lo ingenioso.",
    body: "El mejor código es el que la siguiente persona entiende.",
    aside: "Si necesitas un diagrama para entender un if: tilín.",
  },
  {
    title: "Lo correcto se demuestra, no se asume.",
    body: "Los tests y el CI son el contrato que el sistema tiene que cumplir.",
    aside: "“En mi máquina sí funciona” no es un test.",
  },
  {
    title: "Los fundamentos duran más que los frameworks.",
    body: "Las herramientas cambian cada año; estructuras de datos, diseño y trade-offs no.",
    aside: "Escribí un compilador. Los frameworks nuevos me dan risa.",
  },
  {
    title: "Las herramientas amplifican el criterio, no lo reemplazan.",
    body: "Uso IA para ir más rápido dentro de un diseño que entiendo. Cada línea que entrego la puedo explicar.",
    aside: "La IA escribe. Yo decido. Tilín.",
  },
];
