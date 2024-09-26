import { Button } from "@/components/ui/button";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const TextSidebar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const handleClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "text" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to the canvas." />
      <div className="space-y-4 border-b p-4">
        <Button
          className="h-16 w-full"
          variant="secondary"
          size="lg"
          onClick={() =>
            editor?.addText("Heading", {
              fontSize: 80,
              fontWeight: 800,
            })
          }
        >
          <span className="text-3xl font-bold">Add a heading</span>
        </Button>
        <Button
          className="h-16 w-full"
          variant="secondary"
          size="lg"
          onClick={() =>
            editor?.addText("Subheading", {
              fontSize: 40,
              fontWeight: 600,
            })
          }
        >
          <span className="text-xl font-semibold">Add a Subheading</span>
        </Button>
        <Button
          className="h-16 w-full"
          variant="secondary"
          size="lg"
          onClick={() => editor?.addText("Paragraph")}
        >
          <span className="text-lg">Add a Paragraph</span>
        </Button>
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default TextSidebar;
