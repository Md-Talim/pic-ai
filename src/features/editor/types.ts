import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import material from "material-colors";

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];

export const fonts = [
  "Arial Black",
  "Arial",
  "Bookman",
  "Brush Script MT",
  "Comic Sans MS",
  "Courier New",
  "Garamond",
  "Geneva",
  "Georgia",
  "Helvetica",
  "Impact",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Palatino",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
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
  autoZoom: () => void;
  canRedo: () => boolean;
  canUndo: () => boolean;
  canvas: fabric.Canvas;
  copy: () => void;
  fillColor: string;
  fontFamily: string;
  paste: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  selectedObjects: fabric.Object[];
  setFillColor: (color: string) => void;
  setFontFamily: (fontFamily: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeDashArray: (values: number[]) => void;
  setStrokeWidth: (width: number) => void;
  strokeColor: string;
  strokeDashArray: number[];
  strokeWidth: number;
  undo: () => void;
};

export type FontStyles = "normal" | "italic";
export type TextAlign = "left" | "center" | "right";

export type Editor = {
  addCircle: () => void;
  addDiamond: () => void;
  addImage: (imageURL: string) => void;
  addRectangle: () => void;
  addText: (text: string, options?: ITextboxOptions) => void;
  addTriangle: () => void;
  autoZoom: () => void;
  bringForward: () => void;
  canRedo: () => boolean;
  canUndo: () => boolean;
  canvas: fabric.Canvas;
  delete: () => void;
  disableDrawMode: () => void;
  enableDrawMode: () => void;
  getActiveFillColor: () => string;
  getActiveFont: () => string;
  getActiveFontSize: () => number;
  getActiveFontStyle: () => FontStyles;
  getActiveFontWeight: () => number;
  getActiveOpacity: () => number;
  getActiveStrokeColor: () => string;
  getActiveStrokeDashArray: () => number[];
  getActiveStrokeWidth: () => number;
  getActiveTextAlign: () => TextAlign;
  getStrikethroughState: () => boolean;
  getUnderlineState: () => boolean;
  getWorkspace: () => fabric.Object | undefined;
  handleCopy: () => void;
  handlePaste: () => void;
  handleRedo: () => void;
  handleUndo: () => void;
  loadFromJSON: (json: string) => void;
  saveAsJPG: () => void;
  saveAsJSON: () => void;
  saveAsPNG: () => void;
  saveAsSVG: () => void;
  selectedObjects: fabric.Object[];
  sendBackwards: () => void;
  updateBackgroundColor: (color: string) => void;
  updateFillColor: (newFillColor: string) => void;
  updateFontFamily: (newFontFamily: string) => void;
  updateFontSize: (newFontSize: number) => void;
  updateFontStrikethrough: (strikethroughState: boolean) => void;
  updateFontStyle: (newFontStyle: FontStyles) => void;
  updateFontUnderline: (underlineState: boolean) => void;
  updateFontWeight: (newFontWeight: number) => void;
  updateImageFilter: (newFilter: string) => void;
  updateOpacity: (newOpacity: number) => void;
  updateStrokeColor: (newStorkeColor: string) => void;
  updateStrokeDashArray: (newDashArray: number[]) => void;
  updateStrokeWidth: (newStrokeWidth: number) => void;
  updateTextAlign: (alignValue: TextAlign) => void;
  updateWorkspaceSize: (size: { width: number; height: number }) => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

export interface EditorHookParams {
  clearSelectionCallback?: () => void;
}

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension",
];
