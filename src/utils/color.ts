import { TYPE_COLORS, TYPE_COLOR_DEFAULT } from "../constants/colors";

export function getElementColor(element: string): string {
  return TYPE_COLORS[element] ?? TYPE_COLOR_DEFAULT;
}
