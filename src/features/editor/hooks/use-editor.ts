import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  EditorHookParams,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
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
    updateFillColor: (newColor: string) => {
      setFillColor(newColor);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: newColor });
      });

      canvas.renderAll();
    },
    updateStrokeColor: (newColor: string) => {
      setStrokeColor(newColor);

      canvas.getActiveObjects().forEach((object) => {
        // Text types don't have stroke
        if (isTextType(object.type)) {
          object.set({ fill: newColor });
          return;
        }

        object.set({ stroke: newColor });
      });

      canvas.renderAll();
    },
    updateStrokeWidth: (newWidth: number) => {
      setStrokeWidth(newWidth);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: newWidth });
      });

      canvas.renderAll();
    },
    updateStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });

      canvas.renderAll();
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
    addRectangle: () => {
      const rectangleShape = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
      });

      addToCanvas(rectangleShape);
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
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fillColor;
      }

      const value = selectedObject.get("fill") || fillColor;

      // right now, gradients & patterns are not supported
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }

      const value = selectedObject.get("stroke") || strokeColor;

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
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeDashArray;
      }

      const value = selectedObject.get("strokeDashArray") || strokeDashArray;

      return value;
    },
    canvas,
    selectedObjects,
  };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookParams) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

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
