import { fabric } from "fabric";
import material from "material-colors";

export const colors = [
  "transparent",
  material.amber["500"],
  material.blue["500"],
  material.blueGrey["500"],
  material.brown["500"],
  material.cyan["500"],
  material.deepOrange["500"],
  material.deepPurple["500"],
  material.green["500"],
  material.indigo["500"],
  material.lightBlue["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.orange["500"],
  material.pink["500"],
  material.purple["500"],
  material.red["500"],
  material.teal["500"],
  material.yellow["500"],
];

export type ActiveTool =
  | "ai"
  | "draw"
  | "fill"
  | "filter"
  | "font"
  | "images"
  | "opacity"
  | "remove-bg"
  | "select"
  | "settings"
  | "shapes"
  | "stroke-color"
  | "stroke-width"
  | "tempates"
  | "text";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;

export const CIRCLE_OPTIONS = {
  radius: 225,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
};

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
};

export type Editor = {
  updateFillColor: (color: string) => void;
  updateStrokeColor: (color: string) => void;
  updateStrokeWidth: (width: number) => void;
  addCircle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addDiamond: () => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
};

export interface EditorHookParams {
  clearSelectionCallback?: () => void;
}
