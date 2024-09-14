import { colors } from "@/features/editor/types";
import { rgbaObjectToString } from "@/features/editor/utils";
import { ChromePicker, CirclePicker } from "react-color";

interface Props {
  color: string;
  onChangeColor: (newColor: string) => void;
}

const ColorPicker = ({ color, onChangeColor }: Props) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={color}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChangeColor(formattedValue);
        }}
        className="rounded-lg border"
      />
      <CirclePicker
        color={color}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChangeColor(formattedValue);
        }}
      />
    </div>
  );
};

export default ColorPicker;
