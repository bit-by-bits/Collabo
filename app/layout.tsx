import "./globals.css";
import Room from "./Room";
import { Inter, Work_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";

const wsans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Collabo | Live Designing For All",
  description:
    "Collabo is a powerful real-time collaborative design tool that enables seamless teamwork on interface design projects. With features like cursor visibility, live comments, chat, and comprehensive design tools, Collabo offers a seamless collaborative design experience. Built with Next.js, Liveblocks, Fabric.js, Tailwind CSS, and React.",
  keywords: [
    "Collabo",
    "real-time collaboration",
    "design tool",
    "interface design",
    "collaborative design tool",
    "Figma alternative",
    "real-time chat",
    "live comments",
    "design collaboration",
    "Next.js",
    "Liveblocks",
    "Fabric.js",
    "Tailwind CSS",
    "React",
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${wsans.className} bg-primary-grey-200 text-white`}>
      <Room>
        <TooltipProvider>{children}</TooltipProvider>
      </Room>
    </body>
  </html>
);

export default RootLayout;
