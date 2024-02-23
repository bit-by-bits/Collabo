import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { CustomFabricObject } from "@/helpers/types";

// Handle copying selected objects to clipboard
export const handleCopy = (canvas: fabric.Canvas): fabric.Object[] => {
  const activeObjects = canvas.getActiveObjects();
  if (activeObjects.length > 0) {
    const serializedObjects = activeObjects.map((obj) => obj.toObject());
    localStorage.setItem("clipboard", JSON.stringify(serializedObjects));
  }
  return activeObjects;
};

// Handle pasting objects from clipboard onto canvas
export const handlePaste = (
  canvas: fabric.Canvas,
  syncShapeInStorage: (shape: fabric.Object) => void,
) => {
  const clipboardData = localStorage.getItem("clipboard");
  if (!clipboardData) return;

  try {
    const parsedObjects = JSON.parse(clipboardData);
    parsedObjects.forEach((objData: fabric.Object) => {
      fabric.util.enlivenObjects(
        [objData],
        (enlivenedObjects: fabric.Object[]) => {
          enlivenedObjects.forEach((enlivenedObj) => {
            enlivenedObj.set({
              left: (enlivenedObj.left || 0) + 20,
              top: (enlivenedObj.top || 0) + 20,
              objectId: uuidv4(),
              fill: "#aabbcc",
            } as CustomFabricObject<any>);
            canvas.add(enlivenedObj);
            syncShapeInStorage(enlivenedObj);
          });
          canvas.renderAll();
        },
        "fabric",
      );
    });
  } catch (error) {
    console.error("Error parsing clipboard data:", error);
  }
};

// Handle deleting selected objects from canvas
export const handleDelete = (
  canvas: fabric.Canvas,
  deleteShapeFromStorage: (id: string) => void,
) => {
  const activeObjects = canvas.getActiveObjects();
  activeObjects.forEach((obj: CustomFabricObject<any>) => {
    if (obj.objectId) {
      canvas.remove(obj);
      deleteShapeFromStorage(obj.objectId);
    }
  });
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

// Handle key down events (copy, paste, delete, undo, redo)
export const handleKeyDown = ({
  e,
  canvas,
  undo,
  redo,
  syncShapeInStorage,
  deleteShapeFromStorage,
}: {
  e: KeyboardEvent;
  canvas: fabric.Canvas;
  undo: () => void;
  redo: () => void;
  syncShapeInStorage: (shape: fabric.Object) => void;
  deleteShapeFromStorage: (id: string) => void;
}) => {
  switch (e.key) {
    case "c": // Ctrl + C (Copy)
      if (e.ctrlKey || e.metaKey) handleCopy(canvas);
      break;
    case "v": // Ctrl + V (Paste)
      if (e.ctrlKey || e.metaKey) handlePaste(canvas, syncShapeInStorage);
      break;
    case "x": // Ctrl + X (Cut)
      if (e.ctrlKey || e.metaKey) {
        handleCopy(canvas);
        handleDelete(canvas, deleteShapeFromStorage);
      }
      break;
    case "z": // Ctrl + Z (Undo)
      if (e.ctrlKey || e.metaKey) undo();
      break;
    case "y": // Ctrl + Y (Redo)
      if (e.ctrlKey || e.metaKey) redo();
      break;
    case "/": // Prevent search by '/'
      e.preventDefault();
      break;
    case "Delete": // Delete
      handleDelete(canvas, deleteShapeFromStorage);
      break;
    case "Escape": // Escape
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      break;
    default:
      break;
  }
};
