import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  onClick: () => void;
  icon: LucideIcon;
  iconStyles?: string;
}

const ShapeTool = ({ onClick, icon: Icon, iconStyles }: Props) => {
  return (
    <button onClick={onClick} className="aspect-square rounded-md border p-5">
      <Icon className={cn("h-full w-full", iconStyles)} />
    </button>
  );
};

export default ShapeTool;
