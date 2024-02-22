export const icon = (text: string) => `/${text}.svg`;

export const colors = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export const shapeElements = [
  {
    icon: icon("rectangle"),
    name: "Rectangle",
    value: "rectangle",
  },
  {
    icon: icon("circle"),
    name: "Circle",
    value: "circle",
  },
  {
    icon: icon("triangle"),
    name: "Triangle",
    value: "triangle",
  },
  {
    icon: icon("line"),
    name: "Line",
    value: "line",
  },
  {
    icon: icon("image"),
    name: "Image",
    value: "image",
  },
  {
    icon: icon("freeform"),
    name: "Free Drawing",
    value: "freeform",
  },
];

export const defaultNavElement = {
  icon: icon("select"),
  name: "Select",
  value: "select",
};

export const navElements = [
  defaultNavElement,
  {
    icon: icon("rectangle"),
    name: "Rectangle",
    value: shapeElements,
  },
  {
    icon: icon("text"),
    name: "Text",
    value: "text",
  },
  {
    icon: icon("delete"),
    name: "Delete",
    value: "delete",
  },
  {
    icon: icon("reset"),
    name: "Reset",
    value: "reset",
  },
  {
    icon: icon("comments"),
    name: "Comments",
    value: "comments",
  },
];

export const directionOptions = [
  { label: "Bring to Front", value: "front", icon: icon("front") },
  { label: "Send to Back", value: "back", icon: icon("back") },
];

export const fontFamilyOptions = [
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Brush Script MT", label: "Brush Script MT" },
];

export const fontSizeOptions = Array.from({ length: 14 }, (_, index) => ({
  value: (index + 1) * 2 + 8 + "",
  label: (index + 1) * 2 + 8 + "",
}));

export const fontWeightOptions = [
  { value: "400", label: "Normal" },
  { value: "500", label: "Semibold" },
  { value: "600", label: "Bold" },
];

export const alignmentOptions = [
  { value: "left", label: "Align Left", icon: icon("align-left") },
  {
    value: "horizontalCenter",
    label: "Align Horizontal Center",
    icon: icon("align-horizontal-center"),
  },
  { value: "right", label: "Align Right", icon: icon("align-right") },
  { value: "top", label: "Align Top", icon: icon("align-top") },
  {
    value: "verticalCenter",
    label: "Align Vertical Center",
    icon: icon("align-vertical-center"),
  },
  { value: "bottom", label: "Align Bottom", icon: icon("align-bottom") },
];

export const shortcuts = [
  { key: "1", name: "Chat", shortcut: "/" },
  { key: "2", name: "Undo", shortcut: "Ctrl (⌘) + Z" },
  { key: "3", name: "Redo", shortcut: "Ctrl (⌘) + Y" },
  { key: "4", name: "Reactions", shortcut: "E" },
];
