import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";
import {
  CustomFabricObject,
  ElementDirection,
  ImageUpload,
  ModifyShape,
} from "@/helpers/types";

// Function to create a rectangle shape
const createRectangle = (pointer: PointerEvent) =>
  new fabric.Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#d9d9d9",
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Rect>);

// Function to create a triangle shape
const createTriangle = (pointer: PointerEvent) =>
  new fabric.Triangle({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#d9d9d9",
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Triangle>);

// Function to create a circle shape
const createCircle = (pointer: PointerEvent) =>
  new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 100,
    fill: "#d9d9d9",
    objectId: uuidv4(),
  } as any);

// Function to create a line shape
const createLine = (pointer: PointerEvent) =>
  new fabric.Line([pointer.x, pointer.y, pointer.x + 100, pointer.y + 100], {
    stroke: "#d9d9d9",
    strokeWidth: 2,
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Line>);

// Function to create a text shape
const createText = (pointer: PointerEvent, text: string) =>
  new fabric.IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#d9d9d9",
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    objectId: uuidv4(),
  } as fabric.ITextOptions);

// Function to create a shape based on type
export const createSpecificShape = (
  shapeType: string,
  pointer: PointerEvent,
) => {
  switch (shapeType) {
    case "rectangle":
      return createRectangle(pointer);
    case "triangle":
      return createTriangle(pointer);
    case "circle":
      return createCircle(pointer);
    case "line":
      return createLine(pointer);
    case "text":
      return createText(pointer, "Tap to Type");
    default:
      return null;
  }
};

// Function to handle image upload
export const handleImageUpload = ({
  file,
  canvas,
  shapeRef,
  syncShapeInStorage,
}: ImageUpload) => {
  const reader = new FileReader();

  reader.onload = () => {
    fabric.Image.fromURL(reader.result as string, (img) => {
      img.scaleToWidth(200);
      img.scaleToHeight(200);
      canvas.current.add(img);
      // @ts-ignore
      img.objectId = uuidv4();
      shapeRef.current = img;
      syncShapeInStorage(img);
      canvas.current.requestRenderAll();
    });
  };

  reader.readAsDataURL(file);
};

// Function to create a shape or enable freeform drawing mode
export const createShape = (
  canvas: fabric.Canvas,
  pointer: PointerEvent,
  shapeType: string,
) => {
  if (shapeType === "freeform") {
    canvas.isDrawingMode = true;
    return null;
  }
  return createSpecificShape(shapeType, pointer);
};

// Function to modify shape properties
export const modifyShape = ({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
}: ModifyShape) => {
  const selectedElement = canvas.getActiveObject();

  if (!selectedElement || selectedElement.type === "activeSelection") return;

  // Set the property value
  if (property === "width") {
    selectedElement.set("scaleX", 1);
    selectedElement.set("width", value);
  } else if (property === "height") {
    selectedElement.set("scaleY", 1);
    selectedElement.set("height", value);
  } else {
    if (selectedElement[property as keyof object] === value) return;
    selectedElement.set(property as keyof object, value);
  }

  activeObjectRef.current = selectedElement;
  syncShapeInStorage(selectedElement);
};

// Function to bring element to front or back
export const bringElement = ({
  canvas,
  direction,
  syncShapeInStorage,
}: ElementDirection) => {
  if (!canvas) return;

  const selectedElement = canvas.getActiveObject();
  if (!selectedElement || selectedElement.type === "activeSelection") return;

  if (direction === "front") canvas.bringToFront(selectedElement);
  else if (direction === "back") canvas.sendToBack(selectedElement);

  syncShapeInStorage(selectedElement);
};
