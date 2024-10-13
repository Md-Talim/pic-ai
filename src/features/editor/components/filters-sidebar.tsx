import { Button } from "@/components/ui/button";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor, filters } from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const FiltersSidebar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const handleClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "filter" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Image Filters"
        description="Apply a filter to your image."
      />
      <div className="space-y-2 overflow-y-scroll border-b p-4">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant="secondary"
            size="lg"
            className="h-12 w-full justify-start text-left"
            onClick={() => editor?.updateImageFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default FiltersSidebar;
