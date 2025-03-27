import type { Metadata } from "next";
import FrontLayout from "./components/FrontLayout";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "ZARA Challenge",
  description: "Frontend challenge for Napptilus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FrontLayout>{children}</FrontLayout>
      </body>
    </html>
  );
}
