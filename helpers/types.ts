import { BaseUserMeta, User } from "@liveblocks/client";
import { Gradient, Pattern } from "fabric/fabric-impl";
import { ReactNode, MutableRefObject, Dispatch, SetStateAction } from "react";

export type ActiveElement = {
  name: string;
  value: string;
  icon: string;
} | null;

export type Attributes = {
  width: string;
  height: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fill: string;
  stroke: string;
};

export enum CursorMode {
  Chat,
  Hidden,
  Reaction,
  ReactionSelector,
}

export type CursorState =
  | { mode: CursorMode.Chat; message: string; previousMessage: string | null }
  | { mode: CursorMode.Hidden }
  | { mode: CursorMode.ReactionSelector }
  | { mode: CursorMode.Reaction; reaction: string; isPressed: boolean };

export type CursorChatProps = {
  cursor: { x: number; y: number };
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
  updateMyPresence: (
    presence: Partial<{
      cursor: { x: number; y: number };
      cursorColor: string;
      message: string;
    }>,
  ) => void;
};

export type CanvasMouseDown = {
  options: fabric.IEvent;
  canvas: fabric.Canvas;
  selectedShapeRef: any;
  isDrawing: MutableRefObject<boolean>;
  shapeRef: MutableRefObject<fabric.Object | null>;
};

export type CanvasMouseMove = {
  options: fabric.IEvent;
  canvas: fabric.Canvas;
  isDrawing: MutableRefObject<boolean>;
  selectedShapeRef: any;
  shapeRef: any;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasMouseUp = {
  canvas: fabric.Canvas;
  isDrawing: MutableRefObject<boolean>;
  shapeRef: any;
  activeObjectRef: MutableRefObject<fabric.Object | null>;
  selectedShapeRef: any;
  syncShapeInStorage: (shape: fabric.Object) => void;
  setActiveElement: any;
};

export type CanvasObjectModified = {
  options: fabric.IEvent;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasObjectScaling = {
  options: fabric.IEvent;
  setElementAttributes: Dispatch<SetStateAction<Attributes>>;
};

export type CanvasPathCreated = {
  options: (fabric.IEvent & { path: CustomFabricObject<fabric.Path> }) | any;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasSelectionCreated = {
  options: fabric.IEvent;
  isEditingRef: MutableRefObject<boolean>;
  setElementAttributes: Dispatch<SetStateAction<Attributes>>;
};

export type CustomFabricObject<T extends fabric.Object> = fabric.Object & {
  objectId?: string;
};

export type ElementDirection = {
  canvas: fabric.Canvas;
  direction: string;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type ImageUpload = {
  file: File;
  canvas: MutableRefObject<fabric.Canvas>;
  shapeRef: MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type LiveCursorProps = {
  others: readonly User<Presence, BaseUserMeta>[];
};

export type ModifyShape = {
  canvas: fabric.Canvas;
  property: string;
  value: any;
  activeObjectRef: MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type NavbarProps = {
  activeElement: ActiveElement;
  imageInputRef: MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
};

export type Presence = any;

export type RenderCanvas = {
  fabricRef: MutableRefObject<fabric.Canvas | null>;
  canvasObjects: any;
  activeObjectRef: any;
};

export type RightSidebarProps = {
  attributes: Attributes;
  setAttributes: Dispatch<SetStateAction<Attributes>>;
  fabric: MutableRefObject<fabric.Canvas | null>;
  activeObject: MutableRefObject<fabric.Object | null>;
  isEditing: MutableRefObject<boolean>;
  syncShapeInStorage: (obj: any) => void;
};

export type ShapesMenuProps = {
  item: {
    name: string;
    icon: string;
    value: Array<ActiveElement>;
  };
  activeElement: any;
  handleActiveElement: any;
  handleImageUpload: any;
  imageInputRef: any;
};

export type Reaction = {
  value: string;
  timestamp: number;
  point: { x: number; y: number };
};

export type ReactionEvent = {
  x: number;
  y: number;
  value: string;
};

export type ShapeData = {
  type: string;
  width: number;
  height: number;
  fill: string | Pattern | Gradient;
  left: number;
  top: number;
  objectId: string | undefined;
};
