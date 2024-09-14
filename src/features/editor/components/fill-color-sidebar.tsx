import ColorPicker from "@/features/editor/components/color-picker";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor, FILL_COLOR } from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const FillColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) => {
  const defaultColorValue = editor?.fillColor || FILL_COLOR;

  const handleClose = () => {
    onChangeActiveTool("select");
  };

  const handleChangeColor = (newColor: string) => {
    editor?.updateFillColor(newColor);
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "fill" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Change fill color of the element."
      />
      <div className="space-y-6 p-4">
        <ColorPicker
          color={defaultColorValue}
          onChangeColor={handleChangeColor}
        />
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default FillColorSidebar;
