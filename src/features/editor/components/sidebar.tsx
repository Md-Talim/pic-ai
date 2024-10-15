import SidebarItem from "@/features/editor/components/sidebar-item";
import { ActiveTool } from "@/features/editor/types";
import {
  ImageIcon,
  LayoutTemplateIcon,
  PencilIcon,
  SettingsIcon,
  ShapesIcon,
  SparklesIcon,
  TypeIcon,
} from "lucide-react";

interface Props {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Sidebar = ({ activeTool, onChangeActiveTool }: Props) => {
  return (
    <aside className="flex w-24 flex-col overflow-y-auto border-r bg-white">
      <ul className="flex flex-col">
        <SidebarItem
          icon={LayoutTemplateIcon}
          label="Design"
          isActive={activeTool === "tempates"}
          onClick={() => onChangeActiveTool("tempates")}
        />
        <SidebarItem
          icon={ImageIcon}
          label="Image"
          isActive={activeTool === "images"}
          onClick={() => onChangeActiveTool("images")}
        />
        <SidebarItem
          icon={TypeIcon}
          label="Text"
          isActive={activeTool === "text"}
          onClick={() => onChangeActiveTool("text")}
        />
        <SidebarItem
          icon={ShapesIcon}
          label="Shapes"
          isActive={activeTool === "shapes"}
          onClick={() => onChangeActiveTool("shapes")}
        />
        <SidebarItem
          icon={PencilIcon}
          label="Draw"
          isActive={activeTool === "draw"}
          onClick={() => onChangeActiveTool("draw")}
        />
        <SidebarItem
          icon={SparklesIcon}
          label="AI"
          isActive={activeTool === "ai"}
          onClick={() => onChangeActiveTool("ai")}
        />
        <SidebarItem
          icon={SettingsIcon}
          label="Settings"
          isActive={activeTool === "settings"}
          onClick={() => onChangeActiveTool("settings")}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
