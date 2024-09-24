import { Slider } from "@/components/ui/slider";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const OpacitySidebar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const initialOpacity = editor?.getActiveOpacity() || 1;
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects],
  );

  const [opacity, setOpacity] = useState(initialOpacity);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  const handleClose = () => {
    onChangeActiveTool("select");
  };

  const handleChangeOpacity = (newOpacity: number) => {
    editor?.updateOpacity(newOpacity);
    setOpacity(newOpacity);
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "opacity" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Change the Transparency of the object."
      />
      <div className="space-y-4 border-b p-4">
        <Slider
          value={[opacity]}
          onValueChange={(values) => handleChangeOpacity(values[0])}
          min={0}
          max={1}
          step={0.01}
        />
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default OpacitySidebar;
