"use client";

import { useRef } from "react";
import Live from "@/components/Live";
import { useRedo, useUndo } from "@/liveblocks.config";
import Navbar from "@/components/Navbar";

export default function App() {
  const undo = useUndo();
  const redo = useRedo();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <Live canvas={canvasRef} undo={undo} redo={redo} />
      </section>
    </main>
  );
}
