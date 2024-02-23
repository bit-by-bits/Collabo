import { navElements } from "@/helpers/constants";
import { ActiveElement, NavbarProps } from "@/helpers/types";
import Image from "next/image";
import { memo } from "react";
import { Button } from "../ui/button";
import ActiveUsers from "../users/ActiveUsers";
import { NewThread } from "../comments/NewThread";
import Shapesbar from "./Shapesbar";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

const Navbar = ({
  activeElement,
  imageInputRef,
  handleImageUpload,
  handleActiveElement,
}: NavbarProps) => {
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  const handleItemClick = (item: ActiveElement) => {
    if (!Array.isArray(item?.value)) {
      handleActiveElement(item);
    }
  };

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
      <Image src="/logo.png" alt="Collabo" width={90} height={30} />

      <ul className="flex flex-row">
        {navElements.map((item: ActiveElement | any) => {
          const ICON = (
            <Button className="relative w-5 h-5 object-contain">
              <Image
                fill
                src={item.icon}
                alt={item.name}
                className={`${isActive(item.value) && "invert"}`}
              />
            </Button>
          );

          return (
            <Tooltip key={item.name}>
              <TooltipTrigger>
                <li
                  onClick={() => handleItemClick(item)}
                  className={`group px-2.5 py-5 flex justify-center items-center
              ${isActive(item.value) ? "bg-primary-green" : "hover:bg-primary-grey-200"}
            `}
                >
                  {item?.name === "Rectangle" ? (
                    <Shapesbar
                      item={item}
                      activeElement={activeElement}
                      imageInputRef={imageInputRef}
                      handleActiveElement={handleActiveElement}
                      handleImageUpload={handleImageUpload}
                    />
                  ) : item?.name === "Comments" ? (
                    <NewThread>{ICON}</NewThread>
                  ) : (
                    ICON
                  )}
                </li>
              </TooltipTrigger>
              <TooltipContent className="border-none bg-primary-black px-2.5 py-1.5 text-xs">
                {item.name === "Rectangle" ? "Shapes" : item.name}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </ul>

      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement,
);
