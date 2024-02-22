import "./globals.css";
import Room from "./Room";
import { Inter, Work_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";

const wsans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Collabo",
  description: "A collaborative design tool using fabric.js and Liveblocks",
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
