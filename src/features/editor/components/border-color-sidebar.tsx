import ColorPicker from "@/features/editor/components/color-picker";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor, STROKE_COLOR } from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const BorderColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) => {
  const defaultStrokeValue = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const handleClose = () => {
    onChangeActiveTool("select");
  };

  const handleChangeStrokeColor = (newColor: string) => {
    editor?.updateStrokeColor(newColor);
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "stroke-color" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Border Color"
        description="Change border color of the element."
      />
      <div className="space-y-6 p-4">
        <ColorPicker
          color={defaultStrokeValue}
          onChangeColor={handleChangeStrokeColor}
        />
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default BorderColorSidebar;
