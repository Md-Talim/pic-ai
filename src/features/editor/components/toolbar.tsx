import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/features/editor/types";
import { isTextType } from "@/features/editor/utils";
import { cn } from "@/lib/utils";
import { BorderWidthIcon, TransparencyGridIcon } from "@radix-ui/react-icons";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

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

  const selectedObjectType = editor?.selectedObjects[0].type;
  const isText = isTextType(selectedObjectType);

  return (
    <div className="z-[49] flex h-14 w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center">
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
      </div>
      {!isText && (
        <div className="flex h-full items-center justify-center">
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
      )}
      {!isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Border Style" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeActiveTool("stroke-width")}
              className={cn(activeTool === "stroke-width" && "bg-neutral-100")}
            >
              <BorderWidthIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex h-full items-center justify-center">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.bringForward()}
          >
            <ArrowUpIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Send Backwards" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.sendBackwards()}
          >
            <ArrowDownIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("opacity")}
            className={cn(activeTool === "opacity" && "bg-neutral-100")}
          >
            <TransparencyGridIcon className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
