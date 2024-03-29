"use client";

import { useMemo } from "react";
import UserAvatar from "./UserAvatar";
import { generateRandomName } from "@/lib/utils";
import { useOthers, useSelf } from "@/liveblocks.config";

const ActiveUsers = () => {
  const others = useOthers();
  const currentUser = useSelf();
  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2;

    return (
      <div className="flex items-center justify-center gap-1">
        {currentUser && (
          <UserAvatar
            name="You"
            otherStyles="border-[3px] border-primary-green"
          />
        )}

        {others.slice(0, 2).map(({ connectionId }) => (
          <UserAvatar
            key={connectionId}
            name={generateRandomName()}
            otherStyles="-ml-3"
          />
        ))}

        {hasMoreUsers && (
          <div className="z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black">
            +{others.length - 2}
          </div>
        )}
      </div>
    );
  }, [others, currentUser]);

  return memoizedUsers;
};

export default ActiveUsers;
