"use client";

import BorderColorSidebar from "@/features/editor/components/border-color-sidebar";
import FillColorSidebar from "@/features/editor/components/fill-color-sidebar";
import FiltersSidebar from "@/features/editor/components/filters-sidebar";
import FontSidebar from "@/features/editor/components/font-sidebar";
import Footer from "@/features/editor/components/footer";
import ImageSidebar from "@/features/editor/components/image-sidebar";
import Navbar from "@/features/editor/components/navbar";
import OpacitySidebar from "@/features/editor/components/opacity-sidebar";
import ShapeSidebar from "@/features/editor/components/shape-sidebar";
import Sidebar from "@/features/editor/components/sidebar";
import StrokeWidthSidebar from "@/features/editor/components/stroke-width-sidebar";
import TextSidebar from "@/features/editor/components/text-sidebar";
import Toolbar from "@/features/editor/components/toolbar";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { ActiveTool } from "@/features/editor/types";
import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const handleChangeActiveTool = useCallback(
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

  const handleClearSelection = useCallback(() => {
    const selectionDependentTools = [
      "fill",
      "font",
      "filter",
      "opacity",
      "remove-bg",
      "stroke-color",
      "stroke-width",
    ];

    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: handleClearSelection,
  });
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
        onChangeActiveTool={handleChangeActiveTool}
      />
      <div className="absolute top-16 flex h-[calc(100%-64px)] w-full">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <BorderColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <FiltersSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={handleChangeActiveTool}
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
