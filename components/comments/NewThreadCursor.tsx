import { useEffect, useState } from "react";
import * as Portal from "@radix-ui/react-portal";

const DEFAULT = { x: -10000, y: -10000 };

const NewThreadCursor = ({ display }: { display: boolean }) => {
  const [coords, setCoords] = useState(DEFAULT);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const canvas = document.getElementById("canvas");

      if (canvas) {
        const canvasRect = canvas.getBoundingClientRect();

        if (
          e.clientX < canvasRect.left ||
          e.clientX > canvasRect.right ||
          e.clientY < canvasRect.top ||
          e.clientY > canvasRect.bottom
        ) {
          setCoords(DEFAULT);
          return;
        }
      }

      setCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("hide-cursor", display);
  }, [display]);

  return display ? (
    <Portal.Root>
      <div
        className="pointer-events-none fixed left-0 top-0 h-9 w-9 cursor-grab select-none rounded-bl-full rounded-br-full rounded-tl-md rounded-tr-full bg-white shadow-2xl"
        style={{
          transform: `translate(${coords.x}px, ${coords.y}px)`,
        }}
      />
    </Portal.Root>
  ) : null;
};

export default NewThreadCursor;
