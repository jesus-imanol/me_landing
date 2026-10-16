import type { Localized } from "./locale.model";

export type Principle = { title: string; body: string; aside: string };

export const PRINCIPLES: Localized<Principle[]> = {
  es: [
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
  ],
  en: [
    {
      title: "Architecture is a decision, not an accident.",
      body: "Domains, boundaries and contracts come before implementation.",
      aside: "Blueprint first. Smile later.",
    },
    {
      title: "Simple beats clever.",
      body: "The best code is the code the next person understands.",
      aside: "If you need a diagram to read an if: tilín.",
    },
    {
      title: "Correctness is proven, not assumed.",
      body: "Tests and CI are the contract the system has to honor.",
      aside: "“Works on my machine” is not a test.",
    },
    {
      title: "Fundamentals outlast frameworks.",
      body: "Tools change every year; data structures, design and trade-offs don't.",
      aside: "I wrote a compiler. New frameworks make me laugh.",
    },
    {
      title: "Tools amplify judgment — they don't replace it.",
      body: "I use AI to move faster inside a design I understand. Every line I ship is a line I can explain.",
      aside: "AI writes. I decide. Tilín.",
    },
  ],
};
