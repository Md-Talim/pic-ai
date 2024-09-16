import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import {
  ActiveTool,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: Props) => {
  const defaultStrokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const defaultStrokeDashArray =
    editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const handleClose = () => {
    onChangeActiveTool("select");
  };

  const handleChangeStrokeColor = (newWidth: number) => {
    editor?.updateStrokeWidth(newWidth);
  };

  const handleChangeStrokeDashArray = (newDashArray: number[]) => {
    editor?.updateStrokeDashArray(newDashArray);
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "stroke-width" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Stroke Options"
        description="Modify the stroke of your element."
      />
      <div className="space-y-4 border-b p-4">
        <Label className="text-sm">Stroke Width</Label>
        <Slider
          value={[defaultStrokeWidth]}
          onValueChange={(values) => handleChangeStrokeColor(values[0])}
        />
      </div>
      <div className="space-y-4 border-b p-4">
        <Label className="text-sm">Stroke Type</Label>
        <Button
          size="lg"
          variant="secondary"
          className={cn(
            "h-16 w-full justify-start px-4 py-2 text-left",
            defaultStrokeDashArray.length === 0 && "border-2 border-blue-600",
          )}
          onClick={() => handleChangeStrokeDashArray([])}
        >
          <div className="w-full rounded-full border-4 border-black" />
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className={cn(
            "h-16 w-full justify-start px-4 py-2 text-left",
            defaultStrokeDashArray.length !== 0 && "border-2 border-blue-600",
          )}
          onClick={() => handleChangeStrokeDashArray([5, 5])}
        >
          <div className="w-full rounded-full border-4 border-dashed border-black" />
        </Button>
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
