import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPicker from "@/features/editor/components/color-picker";
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

const SettingsSidebar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const workspace = editor?.getWorkspace();

  const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
  const initialBackground = useMemo(
    () => `${workspace?.fill ?? "#ffffff"}`,
    [workspace],
  );

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialBackground, initialHeight, initialWidth]);

  const handleBackgroundUpdate = (color: string) => {
    setBackground(color);
    editor?.updateBackgroundColor(color);
  };

  const handleSizeUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setWidth(width);
    setHeight(height);

    editor?.updateWorkspaceSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  const handleClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "settings" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Change your workspace settings."
      />
      <form className="space-y-4 p-4" onSubmit={handleSizeUpdate}>
        <div className="space-y-2">
          <Label>Width</Label>
          <Input
            type="number"
            placeholder="width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Height</Label>
          <Input
            type="number"
            placeholder="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Resize
        </Button>
      </form>
      <div className="p-4">
        <ColorPicker
          color={background}
          onChangeColor={handleBackgroundUpdate}
        />
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default SettingsSidebar;
