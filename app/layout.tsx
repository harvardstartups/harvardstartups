import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "startups @ harvard",
  description: "a community of students excited about startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlexSerif.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
