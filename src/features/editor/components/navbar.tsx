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
import UserButton from "@/features/editor/components/user-button";
import { ActiveTool, Editor } from "@/features/editor/types";
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
import { useFilePicker } from "use-file-picker";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: { plainFiles: File[] }) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadFromJSON(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="flex h-16 w-full items-center gap-x-8 border-b p-4 lg:pl-8">
      <Logo />

      <div className="flex h-full w-full items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              File
              <ChevronDownIcon className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={openFilePicker}
            >
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
          <Button
            disabled={!editor?.canUndo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.handleUndo()}
          >
            <UndoIcon className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canRedo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.handleRedo()}
          >
            <RedoIcon className="size-4" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />

        <div className="flex items-center gap-x-2 text-muted-foreground">
          <CloudIcon className="size-5" />
          <p className="text-sm">Saved</p>
        </div>

        <div className="ml-auto flex items-center justify-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                Export
                <DownloadIcon className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={editor?.saveAsJSON}
              >
                <FileIcon className="size-6" />
                <div>
                  <p>JSON</p>
                  <p className="text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={editor?.saveAsJPG}
              >
                <FileIcon className="size-6" />
                <div>
                  <p>JPG</p>
                  <p className="text-muted-foreground">Best for printing</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={editor?.saveAsPNG}
              >
                <FileIcon className="size-6" />
                <div>
                  <p>PNG</p>
                  <p className="text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={editor?.saveAsSVG}
              >
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
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
