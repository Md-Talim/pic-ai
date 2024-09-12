import { ChevronsLeftIcon } from "lucide-react";

interface Props {
  onClose: () => void;
}

const ToolSidebarClose = ({ onClose }: Props) => {
  return (
    <button
      onClick={onClose}
      className="group absolute -right-7 top-1/2 flex h-16 -translate-y-1/2 transform items-center justify-center rounded-r-xl border-y border-r bg-white px-1 pr-2"
    >
      <ChevronsLeftIcon className="group-hover:opactiy-75 size-4 text-black transition" />
    </button>
  );
};

export default ToolSidebarClose;
