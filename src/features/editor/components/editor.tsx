"use client";

import FillColorSidebar from "@/features/editor/components/fill-color-sidebar";
import Footer from "@/features/editor/components/footer";
import Navbar from "@/features/editor/components/navbar";
import ShapeSidebar from "@/features/editor/components/shape-sidebar";
import Sidebar from "@/features/editor/components/sidebar";
import Toolbar from "@/features/editor/components/toolbar";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { ActiveTool } from "@/features/editor/types";
import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const handleChangeActiveToolbar = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      if (tool === "draw") {
        // TODO: Enable draw mode
      }
      if (activeTool === "draw") {
        // TODO: Disable draw mode
      }

      setActiveTool(tool);
    },
    [activeTool],
  );

  const { init, editor } = useEditor();
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex h-full flex-col">
      <Navbar
        activeTool={activeTool}
        onChangeActiveTool={handleChangeActiveToolbar}
      />
      <div className="absolute top-16 flex h-[calc(100%-64px)] w-full">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveToolbar}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveToolbar}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveToolbar}
        />
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={handleChangeActiveToolbar}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div
            className="h-[calc(100%-120px)] flex-1 bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Editor;
