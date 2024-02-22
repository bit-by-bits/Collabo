"use client";

import { LiveMap } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import Loader from "@/components/Loader";

const Room = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider
      id="collabo"
      initialStorage={{ canvasObjects: new LiveMap() }}
      initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
