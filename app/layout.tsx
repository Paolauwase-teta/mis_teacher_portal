import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  weight: ["400", "500"],
});
export const metadata: Metadata = {
  title: "RCA Hackathon Management System",
  description: "Admin Portal for RCA Hackathon Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${afacad.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
