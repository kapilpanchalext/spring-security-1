import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Security App",
  description: "Security App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar/>
        </header>
        {children}
      </body>
    </html>
  );
}
