import { TYPE_COLORS, TYPE_COLOR_DEFAULT } from "../constants/colors";

export function getElementColor(element: string): string {
  return TYPE_COLORS[element] ?? TYPE_COLOR_DEFAULT;
}

export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
