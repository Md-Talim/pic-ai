import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Logo from "@/features/editor/components/logo";
import { ActiveTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  CloudIcon,
  DownloadIcon,
  FileIcon,
  MousePointerClickIcon,
  RedoIcon,
  UndoIcon,
} from "lucide-react";

interface Props {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({ activeTool, onChangeActiveTool }: Props) => {
  return (
    <nav className="flex gap-x-8 items-center p-4 h-16 w-full lg:pl-8 border-b">
      <Logo />

      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              File
              <ChevronDownIcon className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center gap-x-2">
              <FileIcon className="size-6" />
              <div>
                <p>Open</p>
                <p className="text-muted-foreground">Open a JSON file</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-2" />

        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-muted")}
          >
            <MousePointerClickIcon className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <UndoIcon className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <RedoIcon className="size-4" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />

        <div className="flex items-center gap-x-2 text-muted-foreground">
          <CloudIcon className="size-5" />
          <p className="text-sm">Saved</p>
        </div>

        <div className="ml-auto">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                Export
                <DownloadIcon className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem className="flex items-center gap-x-2">
                <FileIcon className="size-6" />
                <div>
                  <p>JSON</p>
                  <p className="text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <FileIcon className="size-6" />
                <div>
                  <p>JPG</p>
                  <p className="text-muted-foreground">Best for printing</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <FileIcon className="size-6" />
                <div>
                  <p>PNG</p>
                  <p className="text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <FileIcon className="size-6" />
                <div>
                  <p>SVG</p>
                  <p className="text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
