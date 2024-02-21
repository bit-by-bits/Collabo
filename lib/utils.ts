import jsPDF from "jspdf";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

const adjectives = [
  "Happy",
  "Creative",
  "Energetic",
  "Lively",
  "Dynamic",
  "Radiant",
  "Joyful",
  "Vibrant",
  "Cheerful",
  "Sunny",
  "Sparkling",
  "Bright",
  "Shining",
];

const animals = [
  "Dolphin",
  "Tiger",
  "Elephant",
  "Penguin",
  "Kangaroo",
  "Panther",
  "Lion",
  "Cheetah",
  "Giraffe",
  "Hippopotamus",
  "Monkey",
  "Panda",
  "Crocodile",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomName(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective} ${randomAnimal}`;
}

interface ShapeInfo {
  icon: string;
  name: string;
}

const shapeInfoMap: Record<string, ShapeInfo> = {
  rect: { icon: "/assets/rectangle.svg", name: "Rectangle" },
  circle: { icon: "/assets/circle.svg", name: "Circle" },
  triangle: { icon: "/assets/triangle.svg", name: "Triangle" },
  line: { icon: "/assets/line.svg", name: "Line" },
  "i-text": { icon: "/assets/text.svg", name: "Text" },
  image: { icon: "/assets/image.svg", name: "Image" },
  freeform: { icon: "/assets/freeform.svg", name: "Free Drawing" },
};

export const getShapeInfo = (shapeType: string): ShapeInfo => {
  return (
    shapeInfoMap[shapeType] || {
      icon: "/assets/rectangle.svg",
      name: shapeType,
    }
  );
};

export const exportToPdf = () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  const data = canvas.toDataURL("image/png");

  doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
  doc.save("canvas.pdf");
};
