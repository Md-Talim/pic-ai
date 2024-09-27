import { Button } from "@/components/ui/button";
import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor, fonts } from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const FontSidebar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const activeFont = editor?.getActiveFont();

  const handleClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "font" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Font Family"
        description="Update the font family."
      />
      <div className="space-y-2 overflow-y-scroll border-b p-4">
        {fonts.map((font) => (
          <Button
            key={font}
            variant="secondary"
            size="lg"
            className={cn(
              "h-12 w-full justify-start text-left",
              activeFont === font && "border border-blue-600",
            )}
            style={{ fontFamily: font }}
            onClick={() => editor?.updateFontFamily(font)}
          >
            {font}
          </Button>
        ))}
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default FontSidebar;
