import { RGBColor } from "react-color";

export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}

export function rgbaObjectToString(rgba: RGBColor | "transparent") {
  if (rgba === "transparent") {
    return `rgba(0,0,0,0)`;
  }

  const alpha = rgba.a === undefined ? 1 : rgba.a;
  const { r, g, b } = rgba;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
