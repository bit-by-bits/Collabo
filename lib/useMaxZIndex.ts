import { useMemo } from "react";
import { useThreads } from "@/liveblocks.config";

export const useMaxZIndex = () => {
  const { threads } = useThreads();

  const maxZIndex = useMemo(() => {
    return threads.reduce((max, thread) => {
      return Math.max(max, thread.metadata.zIndex || 0);
    }, 0);
  }, [threads]);

  return maxZIndex;
};
