import { fabric } from "fabric";

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

const FILL_COLOR = "rgba(0,0,0,1)";
const STROKE_COLOR = "rgba(0,0,0,1)";
const STROKE_WIDTH = 2;

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
};

export type Editor = {
  addCircle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addDiamond: () => void;
};
