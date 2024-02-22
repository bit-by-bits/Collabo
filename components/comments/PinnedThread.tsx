import Image from "next/image";
import { useMemo, useState } from "react";
import { ThreadData } from "@liveblocks/client";
import { Thread } from "@liveblocks/react-comments";
import { ThreadMetadata } from "@/liveblocks.config";

type Props = {
  thread: ThreadData<ThreadMetadata>;
  onFocus: (threadId: string) => void;
};

const PinnedThread = ({ thread, onFocus, ...props }: Props) => {
  const startMinimized = useMemo(
    () => Number(new Date()) - Number(new Date(thread.createdAt)) > 100,
    [thread],
  );

  const [minimized, setMinimized] = useState(startMinimized);

  const toggleMinimized = (e: any) => {
    onFocus(thread.id);

    if (
      e.target &&
      e.target.classList.contains("lb-icon") &&
      e.target.classList.contains("lb-button-icon")
    ) {
      return;
    }

    setMinimized(!minimized);
  };

  const memoizedContent = useMemo(() => {
    return (
      <div
        className="absolute flex cursor-pointer gap-4"
        {...props}
        onClick={toggleMinimized}
      >
        <div
          className="relative flex h-9 w-9 select-none items-center justify-center rounded-bl-full rounded-br-full rounded-tl-md rounded-tr-full bg-white shadow"
          data-draggable={true}
        >
          <Image
            src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
            alt="Dummy Name"
            width={28}
            height={28}
            draggable={false}
            className="rounded-full"
          />
        </div>
        {!minimized && (
          <div className="flex min-w-60 flex-col overflow-hidden rounded-lg bg-white text-sm shadow">
            <Thread
              thread={thread}
              indentCommentContent={false}
              onKeyUp={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        )}
      </div>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, minimized, thread]);

  return <>{memoizedContent}</>;
};

export default PinnedThread;
