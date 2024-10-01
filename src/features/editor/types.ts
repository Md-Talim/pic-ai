import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import material from "material-colors";

export const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

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
export const STROKE_DASH_ARRAY = [];
export const FONT_SIZE = 32;
export const FONT_FAMILY = "Inter";
export const FONT_WEIGHT = 400;

export const TEXT_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

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
  strokeDashArray: number[];
  selectedObjects: fabric.Object[];
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setStrokeDashArray: (values: number[]) => void;
};

export type Editor = {
  bringForward: () => void;
  sendBackwards: () => void;
  updateFillColor: (color: string) => void;
  updateStrokeColor: (color: string) => void;
  updateStrokeWidth: (width: number) => void;
  updateStrokeDashArray: (value: number[]) => void;
  updateOpacity: (newOpacity: number) => void;
  updateFontFamily: (newFontFamily: string) => void;
  updateFontWeight: (newFontWeight: number) => voidl;
  addText: (value: string, options?: ITextboxOptions) => void;
  addCircle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addDiamond: () => void;
  getActiveFont: () => string;
  getActiveFontWeight: () => number;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveOpacity: () => number;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
};

export interface EditorHookParams {
  clearSelectionCallback?: () => void;
}
