import { ChevronsLeftIcon } from "lucide-react";

interface Props {
  onClose: () => void;
}

const ToolSidebarClose = ({ onClose }: Props) => {
  return (
    <button
      onClick={onClose}
      className="absolute -right-7 h-16 bg-white top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r border-y group"
    >
      <ChevronsLeftIcon className="size-4 text-black group-hover:opactiy-75 transition" />
    </button>
  );
};

export default ToolSidebarClose;
