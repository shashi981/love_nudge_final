import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { EventProvider } from './context/EventContext';

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relationship Journal",
  description: "Track your relationship's special moments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <EventProvider>
          {children}
        </EventProvider>
      </body>
    </html>
  );
}
