import type { Metadata } from "next";
import Providers from "./Provider";
import SessionWraper from "../components/SessionWraper";
import "./globals.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Hyperloop Competition",
  description:
    "Welcome to the Global Hyperloop Competition - a cutting-edge challenge that brings together innovators, engineers, and visionaries from around the world to revolutionize transportation. Join us in pushing the boundaries of high-speed, sustainable travel. #HyperloopInnovation",
  icons:{
    icon:'/favicon.jpg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWraper>
          <Providers>{children}</Providers>
        </SessionWraper>
      </body>
    </html>
  );
}
