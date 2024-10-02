import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";

interface Props {
  fontSize: number;
  onChangeFontSize: (fontSize: number) => void;
}

const FontSizeInput = ({ fontSize, onChangeFontSize }: Props) => {
  const increment = () => onChangeFontSize(fontSize + 1);
  const decrement = () => onChangeFontSize(fontSize - 1);

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);

    onChangeFontSize(newValue);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={decrement}
        className="rounded-r-none border-r-0 p-2"
      >
        <MinusIcon className="size-4" />
      </Button>
      <Input
        value={fontSize}
        onChange={handleFontSizeChange}
        className="w-14 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={increment}
        className="rounded-l-none border-l-0 p-2"
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  );
};

export default FontSizeInput;
