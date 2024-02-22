import React, { useMemo, useRef } from "react";
import Text from "../settings/Text";
import Color from "../settings/Color";
import Export from "../settings/Export";
import Dimensions from "../settings/Dimensions";
import { RightSidebarProps } from "@/helpers/types";
import { modifyShape } from "@/lib/shapes";

const Rightbar = ({
  attributes,
  setAttributes,
  fabric,
  activeObject,
  isEditing,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const strokeInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (property: string, value: string) => {
    if (!isEditing.current) isEditing.current = true;

    setAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabric.current as fabric.Canvas,
      property,
      value,
      activeObjectRef: activeObject,
      syncShapeInStorage,
    });
  };

  const memoizedContent = useMemo(() => {
    return (
      <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky right-0 h-full max-sm:hidden select-none">
        <h3 className=" px-5 pt-4 text-xs uppercase">Design</h3>
        <span className="text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4">
          Make changes to canvas as you like
        </span>

        <Dimensions
          width={attributes.width}
          height={attributes.height}
          isEditingRef={isEditing}
          handleInputChange={handleInputChange}
        />

        <Text
          fontFamily={attributes.fontFamily}
          fontSize={attributes.fontSize}
          fontWeight={attributes.fontWeight}
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={colorInputRef}
          attribute={attributes.fill}
          placeholder="color"
          attributeType="fill"
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={strokeInputRef}
          attribute={attributes.stroke}
          placeholder="stroke"
          attributeType="stroke"
          handleInputChange={handleInputChange}
        />

        <Export />
      </section>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes, fabric, activeObject, isEditing, syncShapeInStorage]);

  return memoizedContent;
};

export default Rightbar;
