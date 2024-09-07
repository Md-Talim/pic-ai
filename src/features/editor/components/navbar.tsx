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
import {
  ChevronDown,
  Cloud,
  Download,
  File,
  MousePointerClick,
  Redo,
  Undo,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex gap-x-8 items-center p-4 h-16 w-full lg:pl-8 border-b">
      <Logo />

      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center gap-x-2">
              <File className="size-6" />
              <div>
                <p>Open</p>
                <p className="text-muted-foreground">Open a JSON file</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-2" />

        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <Undo className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon">
            <Redo className="size-4" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />

        <div className="flex items-center gap-x-2 text-muted-foreground">
          <Cloud className="size-5" />
          <p className="text-sm">Saved</p>
        </div>

        <div className="ml-auto">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                Export
                <Download className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem className="flex items-center gap-x-2">
                <File className="size-6" />
                <div>
                  <p>JSON</p>
                  <p className="text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <File className="size-6" />
                <div>
                  <p>JPG</p>
                  <p className="text-muted-foreground">Best for printing</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <File className="size-6" />
                <div>
                  <p>PNG</p>
                  <p className="text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <File className="size-6" />
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
