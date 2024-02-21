import ParentCursor from "./ParentCursor";
import { LiveCursorProps } from "@/helpers/types";
import { colors } from "@/helpers/constants";

const LiveCursors = ({ others }: LiveCursorProps) => {
  return others.map(({ connectionId, presence }) =>
    presence?.cursor ? (
      <ParentCursor
        key={connectionId}
        color={colors[Number(connectionId) % colors.length]}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message}
      />
    ) : null,
  );
};

export default LiveCursors;
