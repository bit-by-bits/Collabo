import "./globals.css";
import { Inter } from "next/font/google";
import Room from "./Room";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Collabo",
  description: "A collaborative design tool using fabric.js and Liveblocks",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className} bg-primary-grey-200 text-white`}>
      <Room>
        {/* <TooltipProvider> */}
        {children}
        {/* </TooltipProvider> */}
      </Room>
    </body>
  </html>
);

export default RootLayout;
