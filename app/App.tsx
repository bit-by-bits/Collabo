"use client";

import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useMutation, useRedo, useStorage, useUndo } from "@/liveblocks.config";
import {
  handleCanvaseMouseMove,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleCanvasObjectMoving,
  handleCanvasObjectScaling,
  handleCanvasSelectionCreated,
  handleCanvasZoom,
  handlePathCreated,
  handleResize,
  initializeFabric,
  renderCanvas,
} from "@/lib/canvas";
import { handleDelete, handleKeyDown } from "@/lib/key-events";
import Navbar from "@/components/navbar/Navbar";
import Leftbar from "@/components/sidebar/Leftbar";
import Rightbar from "@/components/sidebar/Rightbar";
import Live from "@/components/Live";
import { ActiveElement, Attributes } from "@/helpers/types";
import { handleImageUpload } from "@/lib/shapes";
import { defaultNavElement } from "@/helpers/constants";

const Home = () => {
  const undo = useUndo();
  const redo = useRedo();

  const canvasObjects = useStorage((root) => root?.canvasObjects);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);

  const isDrawingRef = useRef(false);
  const isEditingRef = useRef(false);

  const activeObjectRef = useRef<fabric.Object | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  console.log(
    `shape: ${shapeRef.current}, selected: ${selectedShapeRef.current}, isDrawing: ${isDrawingRef.current}, isEditing: ${isEditingRef.current}, activeObject: ${activeObjectRef.current}, imageInput: ${imageInputRef.current}`
  );

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });

  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });

  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(shapeId);
  }, []);

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get("canvasObjects");
    if (!canvasObjects || canvasObjects.size === 0) return true;

    const entries = Array.from(canvasObjects.entries());
    for (const [key, value] of entries) canvasObjects.delete(key);

    return canvasObjects.size === 0;
  }, []);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;
    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.set(objectId, shapeData);
  }, []);

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);

    switch (elem?.value) {
      case "reset":
        deleteAllShapes();
        fabricRef.current?.clear();
        setActiveElement(defaultNavElement);
        break;

      case "delete":
        handleDelete(fabricRef.current as any, deleteShapeFromStorage);
        setActiveElement(defaultNavElement);
        break;

      case "image":
        imageInputRef.current?.click();
        isDrawingRef.current = false;

        if (fabricRef.current) fabricRef.current.isDrawingMode = false;
        break;

      case "comments":
        break;

      default:
        selectedShapeRef.current = elem?.value as string;
        break;
    }
  };

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing: isDrawingRef,
        shapeRef,
      });
    });

    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing: isDrawingRef,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      });
    });

    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing: isDrawingRef,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        syncShapeInStorage,
        setActiveElement,
      });
    });

    canvas.on("path:created", (options) => {
      handlePathCreated({ options, syncShapeInStorage });
    });

    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({ options, syncShapeInStorage });
    });

    canvas?.on("object:moving", (options) => {
      handleCanvasObjectMoving({ options });
    });

    canvas.on("selection:created", (options) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      });
    });

    canvas.on("object:scaling", (options) => {
      handleCanvasObjectScaling({ options, setElementAttributes });
    });

    canvas.on("mouse:wheel", (options) => {
      handleCanvasZoom({ options, canvas });
    });

    window.addEventListener("resize", () => {
      handleResize({ canvas: fabricRef.current });
    });

    window.addEventListener("keydown", (e) =>
      handleKeyDown({
        e,
        canvas: fabricRef.current!,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      })
    );

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", () => {
        handleResize({ canvas: null });
      });

      window.removeEventListener("keydown", (e) =>
        handleKeyDown({
          e,
          canvas: fabricRef.current!,
          undo,
          redo,
          syncShapeInStorage,
          deleteShapeFromStorage,
        })
      );
    };
  }, [canvasRef]);

  useEffect(() => {
    renderCanvas({ fabricRef, canvasObjects, activeObjectRef });
  }, [canvasObjects]);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar
        imageInputRef={imageInputRef}
        activeElement={activeElement}
        handleImageUpload={(e: any) => {
          e.stopPropagation();
          handleImageUpload({
            file: e.target.files[0],
            canvas: fabricRef as any,
            shapeRef,
            syncShapeInStorage,
          });
        }}
        handleActiveElement={handleActiveElement}
      />

      <section className="flex h-full flex-row">
        <Leftbar shapes={Array.from(canvasObjects)} />
        <Live canvas={canvasRef} undo={undo} redo={redo} />
        <Rightbar
          attributes={elementAttributes}
          setAttributes={setElementAttributes}
          fabric={fabricRef}
          isEditing={isEditingRef}
          activeObject={activeObjectRef}
          syncShapeInStorage={syncShapeInStorage}
        />
      </section>
    </main>
  );
};

export default Home;
