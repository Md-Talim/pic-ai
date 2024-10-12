import ToolSidebarClose from "@/features/editor/components/tool-sidebar-close";
import ToolSidebarHeader from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { useGetImages } from "@/features/images/api/use-get-images";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const ImageSidebar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const { isLoading, isError, data } = useGetImages();

  console.log(data);

  const handleClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-80 flex-col border-r bg-white",
        activeTool === "images" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas."
      />
      <div className="border-b p-4">
        <UploadButton
          appearance={{
            button: "w-full text-sm font-medium",
            allowedContent: "hidden",
          }}
          content={{ button: "Upload Image" }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
        />
      </div>
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
        </div>
      )}
      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <AlertTriangleIcon className="size-4 text-muted-foreground" />
          <p>Failed to fetch images.</p>
        </div>
      )}
      <div className="overflow-y-scroll p-4">
        <div className="grid grid-cols-2 gap-4">
          {data &&
            data.map((image) => (
              <button
                key={image.id}
                onClick={() => editor?.addImage(image.urls.regular)}
                className="group relative h-[100px] w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
              >
                <Image
                  fill
                  src={image.urls.small}
                  alt={image.alt_description || "Image from unsplash"}
                  className="object-cover"
                />
                <Link
                  href={image.links.html}
                  target="_blank"
                  className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-xs text-white opacity-0 hover:underline group-hover:opacity-100"
                >
                  {image.user.name}
                </Link>
              </button>
            ))}
        </div>
      </div>
      <ToolSidebarClose onClose={handleClose} />
    </aside>
  );
};

export default ImageSidebar;
