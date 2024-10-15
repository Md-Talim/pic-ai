import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/features/editor/components/color-picker";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import {
  ActiveTool,
  Editor,
  STROKE_COLOR,
  STROKE_WIDTH,
} from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const DrawSidebar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const defaultStrokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const defaultStrokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const handleClose = () => {
    editor?.disableDrawMode();
    onChangeActiveTool("select");
  };

  const handleChangeStorkeColor = (newColor: string) => {
    editor?.updateStrokeColor(newColor);
  };

  const handleChangeStrokeWidth = (newWidth: number) => {
    editor?.updateStrokeWidth(newWidth);
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "draw" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Draw Mode"
        description="Modify the drawing brush."
      />
      <div className="space-y-4 border-b p-4">
        <Label className="text-sm">Brush Width</Label>
        <Slider
          value={[defaultStrokeWidth]}
          onValueChange={(values) => handleChangeStrokeWidth(values[0])}
        />
      </div>
      <div className="space-y-6 p-4">
        <ColorPicker
          color={defaultStrokeColor}
          onChangeColor={handleChangeStorkeColor}
        />
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default DrawSidebar;
