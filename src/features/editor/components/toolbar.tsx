import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const fillColor = editor?.getActiveFillColor();
  const borderColor = editor?.getActiveStrokeColor();

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-14 w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    );
  }

  return (
    <div className="z-[49] flex h-14 w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <div className="flex items-center justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("fill")}
            className={cn(activeTool === "fill" && "bg-neutral-100")}
          >
            <div
              className="size-4 rounded-sm border"
              style={{
                backgroundColor:
                  typeof fillColor === "string" ? fillColor : "black",
              }}
            />
          </Button>
        </Hint>
        <Hint label="Border Color" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("stroke-color")}
            className={cn(activeTool === "stroke-color" && "bg-neutral-100")}
          >
            <div
              className="size-4 rounded-sm border"
              style={{ borderColor: borderColor }}
            />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
