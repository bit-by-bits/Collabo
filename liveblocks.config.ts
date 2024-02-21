import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Create Liveblocks client
const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY!,
});

// Define types
type Presence = {};
type Storage = {};
type UserMeta = {};
type RoomEvent = {};

// Define thread metadata type
export type ThreadMetadata = {
  zIndex: number;
};

// Create room context and export related hooks
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client,
  {
    async resolveUsers({ userIds }) {
      return [];
    },
    async resolveMentionSuggestions({ text, roomId }) {
      return [];
    },
  },
);
