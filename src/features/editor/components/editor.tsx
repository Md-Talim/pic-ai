"use client";

import { useEditor } from "@/features/editor/hooks/use-editor";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";

const Editor = () => {
  const { init } = useEditor();
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 h-full bg-blue-50" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Editor;
