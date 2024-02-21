function SVG({ color }: { color: string }) {
  return (
    <svg
      width="24"
      fill="none"
      height="36"
      stroke="white"
      viewBox="0 0 24 36"
      className="relative"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      />
    </svg>
  );
}

export default SVG;
