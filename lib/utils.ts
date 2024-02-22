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
  rect: { icon: "/rectangle.svg", name: "Rectangle" },
  circle: { icon: "/circle.svg", name: "Circle" },
  triangle: { icon: "/triangle.svg", name: "Triangle" },
  line: { icon: "/line.svg", name: "Line" },
  "i-text": { icon: "/text.svg", name: "Text" },
  image: { icon: "/image.svg", name: "Image" },
  freeform: { icon: "/freeform.svg", name: "Free Drawing" },
};

export const getShapeInfo = (shapeType: string): ShapeInfo => {
  return (
    shapeInfoMap[shapeType] || {
      icon: "/rectangle.svg",
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
