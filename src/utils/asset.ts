export function elementIcon(name: string): string {
  return new URL(`../assets/element/${name}_type_element.png`, import.meta.url).href;
}
