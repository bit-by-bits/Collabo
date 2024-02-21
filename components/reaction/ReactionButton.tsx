import React from "react";

type Props = {
  setReaction: (reaction: string) => void;
};

const reactions = ["👍", "🔥", "😍", "👀", "😱", "🙁"];

const ReactionSelector = ({ setReaction }: Props) => (
  <div
    className="absolute bottom-20 left-0 right-0 mx-auto flex justify-center gap-2"
    onPointerMove={(e) => e.stopPropagation()}
  >
    {reactions.map((reaction, index) => (
      <ReactionButton key={index} reaction={reaction} onSelect={setReaction} />
    ))}
  </div>
);

type ReactionButtonProps = {
  reaction: string;
  onSelect: (reaction: string) => void;
};

const ReactionButton = ({ reaction, onSelect }: ReactionButtonProps) => (
  <button
    className="p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
    onPointerDown={() => onSelect(reaction)}
  >
    {reaction}
  </button>
);

export default ReactionSelector;
