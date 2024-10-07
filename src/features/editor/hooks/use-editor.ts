import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  EditorHookParams,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  FontStyles,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TextAlign,
  TRIANGLE_OPTIONS,
} from "@/features/editor/types";
import { isTextType } from "@/features/editor/utils";
import { fabric } from "fabric";
import { useCallback, useMemo, useState } from "react";
import { useAutoResize } from "./use-auto-resize";
import { useCanvasEvents } from "./use-canvas-events";

const buildEditor = ({
  canvas,
  fillColor,
  strokeColor,
  strokeWidth,
  strokeDashArray,
  selectedObjects,
  fontFamily,
  setFontFamily,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  setStrokeDashArray,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const workspaceCenter = workspace?.getCenterPoint();

    // @ts-expect-error type not defined
    canvas._centerObject(object, workspaceCenter);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    canvas,
    selectedObjects,
    delete: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        object.bringForward();
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        object.sendBackwards();
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    addCircle: () => {
      const circleShape = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
      });

      addToCanvas(circleShape);
    },
    addDiamond: () => {
      const WIDTH = DIAMOND_OPTIONS.width;
      const HEIGHT = DIAMOND_OPTIONS.height;

      const diamondShape = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
        },
      );

      addToCanvas(diamondShape);
    },
    addRectangle: () => {
      const rectangleShape = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
      });

      addToCanvas(rectangleShape);
    },
    addText: (text: string, options?: fabric.ITextOptions) => {
      const textObject = new fabric.Textbox(text, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });

      addToCanvas(textObject);
    },
    addTriangle: () => {
      const triangleShape = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
      });

      addToCanvas(triangleShape);
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fillColor;
      }

      const value = selectedObject.get("fill") || fillColor;

      // right now, gradients & patterns are not supported
      return value as string;
    },
    getActiveFont: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fontFamily;
      }

      // @ts-expect-error, Faulty TS library, fontFamily exists.
      const activeFont = selectedObject.get("fontFamily") || fontFamily;

      return activeFont;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return FONT_SIZE;
      }

      // @ts-expect-error, Faulty TS library, fontSize exists
      const fontSize = selectedObject.get("fontSize") || FONT_SIZE;

      return fontSize;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return "normal";
      }

      // @ts-expect-error, Faulty TS library, fontStyle exists.
      const fontStyle = selectedObject.get("fontStyle") || "normal";

      return fontStyle;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return FONT_WEIGHT;
      }

      // @ts-expect-error, Faulty TS library, fontWeight exists.
      const fontWeight = selectedObject.get("fontWeight") || FONT_WEIGHT;

      return fontWeight;
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return "left";
      }

      // @ts-expect-error, Faulty TS library, textAlign exists.
      const alignValue = selectedObject.get("textAlign") || "left";

      return alignValue;
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 1;
      }

      const opacity = selectedObject.get("opacity") || 1;

      return opacity;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }

      const value = selectedObject.get("stroke") || strokeColor;

      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeDashArray;
      }

      const value = selectedObject.get("strokeDashArray") || strokeDashArray;

      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeWidth;
      }

      const value = selectedObject.get("strokeWidth") || strokeWidth;

      return value;
    },
    getStrikethroughState: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return false;
      }

      // @ts-expect-error, faulty TS library: linethrough exists.
      const hasLinethrough = selectedObject.get("linethrough");

      return !!hasLinethrough;
    },
    getUnderlineState: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return false;
      }

      // @ts-expect-error, faulty TS library: underline exists.
      const hasUnderline = selectedObject.get("underline");

      return !!hasUnderline;
    },
    updateFillColor: (newFillColor: string) => {
      setFillColor(newFillColor);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: newFillColor });
      });

      canvas.renderAll();
    },
    updateFontFamily: (newFontFamily: string) => {
      setFontFamily(newFontFamily);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-expect-error, Faulty TS library, fontFamily exists
          object.set({ fontFamily: newFontFamily });
        }
      });

      canvas.renderAll();
    },
    updateFontSize: (newFontSize: number) => {
      canvas.getActiveObjects().forEach((object) => {
        // @ts-expect-error, Faulty TS library, fontSize exists
        object.set({ fontSize: newFontSize });
      });

      canvas.renderAll();
    },
    updateFontStrikethrough: (strikethroughState: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        // @ts-expect-error, Faulty TS library, linethrough exists
        object.set({ linethrough: strikethroughState });
      });

      canvas.renderAll();
    },
    updateFontStyle: (newFontStyle: FontStyles) => {
      canvas.getActiveObjects().forEach((object) => {
        // @ts-expect-error, Faulty TS library, fontStyle exists
        object.set({ fontStyle: newFontStyle });
      });

      canvas.renderAll();
    },
    updateFontUnderline: (underlineState: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        // @ts-expect-error, Faulty TS library, underline exists
        object.set({ underline: underlineState });
      });

      canvas.renderAll();
    },
    updateFontWeight: (newFontWeight: number) => {
      canvas.getActiveObjects().forEach((object) => {
        // @ts-expect-error, Faulty TS library, fontWeight exists
        object.set({ fontWeight: newFontWeight });
      });

      canvas.renderAll();
    },
    updateTextAlign: (alignValue: TextAlign) => {
      canvas.getActiveObjects().forEach((object) => {
        // @ts-expect-error, Faulty TS library, textAlign exists
        object.set({ textAlign: alignValue });
      });

      canvas.renderAll();
    },
    updateOpacity: (newOpacity: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: newOpacity });
      });

      canvas.renderAll();
    },
    updateStrokeColor: (newStorkeColor: string) => {
      setStrokeColor(newStorkeColor);

      canvas.getActiveObjects().forEach((object) => {
        // Text types don't have stroke
        if (isTextType(object.type)) {
          object.set({ fill: newStorkeColor });
          return;
        }

        object.set({ stroke: newStorkeColor });
      });

      canvas.renderAll();
    },
    updateStrokeDashArray: (newDashArray: number[]) => {
      setStrokeDashArray(newDashArray);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: newDashArray });
      });

      canvas.renderAll();
    },
    updateStrokeWidth: (newStrokeWidth: number) => {
      setStrokeWidth(newStrokeWidth);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: newStrokeWidth });
      });

      canvas.renderAll();
    },
  };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookParams) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeDashArray,
        fontFamily,
        setFontFamily,
        selectedObjects,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        setStrokeDashArray,
      });
    }

    return undefined;
  }, [
    canvas,
    fillColor,
    fontFamily,
    selectedObjects,
    strokeColor,
    strokeDashArray,
    strokeWidth,
  ]);

  useAutoResize({ canvas, container });
  useCanvasEvents({ canvas, setSelectedObjects, clearSelectionCallback });

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#ffffff",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 800,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0, 0, 0, 0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    [],
  );

  return { init, editor };
};
