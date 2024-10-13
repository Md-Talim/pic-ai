import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  ActiveTool,
  Editor,
  FONT_SIZE,
  FONT_WEIGHT,
  TextAlign,
} from "@/features/editor/types";
import { isTextType } from "@/features/editor/utils";
import { cn } from "@/lib/utils";
import { BorderWidthIcon, TransparencyGridIcon } from "@radix-ui/react-icons";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  BoldIcon,
  ItalicIcon,
  PaletteIcon,
  StrikethroughIcon,
  TrashIcon,
  UnderlineIcon,
} from "lucide-react";
import { useState } from "react";
import FontSizeInput from "./font-size-input";

interface Props {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: Props) => {
  const initialFillColor = editor?.getActiveFillColor();
  const initialBorderColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFont();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialStrikethroughState = editor?.getStrikethroughState();
  const initialUnderlineState = editor?.getUnderlineState();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    borderColor: initialBorderColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontSize: initialFontSize,
    fontStyle: initialFontStyle,
    isStrikethrough: initialStrikethroughState,
    isUnderline: initialUnderlineState,
    textAlign: initialTextAlign,
  });

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-14 w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    );
  }

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0].type;
  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }

    const newFontWeight = properties.fontWeight > 400 ? 400 : 800;
    editor.updateFontWeight(newFontWeight);
    setProperties((current) => ({
      ...current,
      fontWeight: newFontWeight,
    }));
  };

  const toggleItalic = () => {
    if (!selectedObject) {
      return;
    }

    const isItalic = properties.fontStyle === "italic";
    const newFontStyle = isItalic ? "normal" : "italic";
    editor.updateFontStyle(newFontStyle);
    setProperties((current) => ({
      ...current,
      fontStyle: newFontStyle,
    }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) {
      return;
    }

    const newUnderlineState = !properties.isUnderline;
    editor.updateFontUnderline(newUnderlineState);
    setProperties((current) => ({
      ...current,
      isUnderline: newUnderlineState,
    }));
  };

  const toggleStrikethrough = () => {
    if (!selectedObject) {
      return;
    }

    const newStrikethroghState = !properties.isStrikethrough;
    editor.updateFontStrikethrough(newStrikethroghState);
    setProperties((current) => ({
      ...current,
      isStrikethrough: newStrikethroghState,
    }));
  };

  const handleChangeTextAlign = (alignValue: TextAlign) => {
    if (!selectedObject) {
      return;
    }

    editor.updateTextAlign(alignValue);
    setProperties((current) => ({
      ...current,
      textAlign: alignValue,
    }));
  };

  const handleFontSizeChange = (newFontSize: number) => {
    if (!selectedObject) {
      return;
    }

    editor?.updateFontSize(newFontSize);
    setProperties((current) => ({
      ...current,
      fontSize: newFontSize,
    }));
  };

  return (
    <div className="z-[49] flex h-14 w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      {isText && (
        <div className="flex h-full items-center justify-center">
          <FontSizeInput
            fontSize={properties.fontSize}
            onChangeFontSize={handleFontSizeChange}
          />
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Font Family" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeActiveTool("font")}
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-neutral-100",
              )}
            >
              <span className="w-28 truncate">{properties.fontFamily}</span>
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Font Weight" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleBold()}
              className={cn(properties.fontWeight > 400 && "bg-neutral-100")}
            >
              <BoldIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Font Style" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleItalic}
              className={cn(
                properties.fontStyle === "italic" && "bg-neutral-100",
              )}
            >
              <ItalicIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleUnderline}
              className={cn(properties.isUnderline && "bg-neutral-100")}
            >
              <UnderlineIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Strike Through" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleStrikethrough}
              className={cn(properties.isStrikethrough && "bg-neutral-100")}
            >
              <StrikethroughIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align Left" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleChangeTextAlign("left")}
              className={cn(
                properties.textAlign === "left" && "bg-neutral-100",
              )}
            >
              <AlignLeftIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align Center" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleChangeTextAlign("center")}
              className={cn(
                properties.textAlign === "center" && "bg-neutral-100",
              )}
            >
              <AlignCenterIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align Right" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleChangeTextAlign("right")}
              className={cn(
                properties.textAlign === "right" && "bg-neutral-100",
              )}
            >
              <AlignRightIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!isImage && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Color" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeActiveTool("fill")}
              className={cn(activeTool === "fill" && "bg-neutral-100")}
            >
              <div
                className="size-4 rounded-sm border"
                style={{ backgroundColor: properties.fillColor }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Border Color" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeActiveTool("stroke-color")}
              className={cn(activeTool === "stroke-color" && "bg-neutral-100")}
            >
              <div
                className="size-4 rounded-sm border"
                style={{ borderColor: properties.borderColor }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Border Style" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeActiveTool("stroke-width")}
              className={cn(activeTool === "stroke-width" && "bg-neutral-100")}
            >
              <BorderWidthIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex h-full items-center justify-center">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.bringForward()}
          >
            <ArrowUpIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Send Backwards" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.sendBackwards()}
          >
            <ArrowDownIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("opacity")}
            className={cn(activeTool === "opacity" && "bg-neutral-100")}
          >
            <TransparencyGridIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.delete()}
            className="hover:bg-red-500 hover:text-white"
          >
            <TrashIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      {isImage && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Filters" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeActiveTool("filter")}
              className={cn(activeTool === "filter" && "bg-neutral-100")}
            >
              <PaletteIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
