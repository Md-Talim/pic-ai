import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, isActive, onClick }: Props) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "flex aspect-video h-full w-full flex-col rounded-none p-3 py-4",
        isActive && "bg-muted text-primary",
      )}
    >
      <Icon className="size-5 shrink-0 stroke-2" />
      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
};

export default SidebarItem;
