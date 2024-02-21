import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY!,
  // authEndpoint: "/api/auth",
  // throttle: 100,
});

type Presence = {
  // cursor: { x: number, y: number } | null,
  // ...
};

type Storage = {
  // author: LiveObject<{ firstName: string, lastName: string }>,
  // ...
};

type UserMeta = {
  // id?: string,
  // info?: Json,
};

type RoomEvent = {
  // type: "NOTIFICATION",
  // ...
};

export type ThreadMetadata = {
  zIndex: number;
  // resolved: boolean;
  // quote: string;
  // time: number;
};

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
    useObject,
    useMap,
    useList,
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
      // const usersData = await __fetchUsersFromDB__(userIds);
      //
      // return usersData.map((userData) => ({
      //   name: userData.name,
      //   avatar: userData.avatar.src,
      // }));

      return [];
    },
    async resolveMentionSuggestions({ text, roomId }) {
      // const userIds = await __fetchAllUserIdsFromDB__(roomId);
      //
      // if (!text) {
      //   return userIds;
      // }
      //
      // return userIds.filter((userId) =>
      //   userId.toLowerCase().includes(text.toLowerCase())
      // );

      return [];
    },
  },
);
