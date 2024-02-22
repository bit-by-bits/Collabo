"use client";

import { LiveMap } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import Loader from "@/components/shared/Loader";

const Room = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomProvider
      id="collabo"
      initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
      initialStorage={{ canvasObjects: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
