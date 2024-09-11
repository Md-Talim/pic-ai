import ShapeTool from "@/features/editor/components/shape-tool";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import {
  CircleIcon,
  DiamondIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const ShapeSidebar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const handleClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r h-full w-80 flex flex-col z-40",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas."
      />
      <div className="grid grid-cols-3 gap-4 p-4">
        <ShapeTool icon={CircleIcon} onClick={() => editor?.addCircle()} />
        <ShapeTool icon={SquareIcon} onClick={() => editor?.addRectangle()} />
        <ShapeTool icon={TriangleIcon} onClick={() => editor?.addTriangle()} />
        <ShapeTool icon={DiamondIcon} onClick={() => editor?.addDiamond()} />
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default ShapeSidebar;
