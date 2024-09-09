"use client";

import Footer from "@/features/editor/components/footer";
import Navbar from "@/features/editor/components/navbar";
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
    [activeTool]
  );

  const { init } = useEditor();
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
    <div className="h-full flex flex-col">
      <Navbar
        activeTool={activeTool}
        onChangeActiveTool={handleChangeActiveToolbar}
      />
      <div className="absolute flex w-full h-[calc(100%-64px)] top-16">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveToolbar}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />
          <div
            className="flex-1 h-[calc(100%-120px)] bg-muted"
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
