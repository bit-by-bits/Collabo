import "./globals.css";
import { Inter } from "next/font/google";
import Room from "./Room";

export const metadata = {
  title: "Collabo",
  description: "A collaborative design tool using fabric.js and Liveblocks",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600", "700"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className} bg-primary-grey-200`}>
      <Room>
        {/* <TooltipProvider> */}
        {children}
        {/* </TooltipProvider> */}
      </Room>
    </body>
  </html>
);

export default RootLayout;
