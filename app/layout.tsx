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
  metadataBase: new URL("https://www.startupsatharvard.com"),
  title: "Startups at Harvard",
  description:
    "A community of Harvard students who enjoy building products that people love. We meet weekly to discuss startups, host guest speakers, and run an annual Startup Trek.",
  openGraph: {
    title: "Startups at Harvard",
    description:
      "A community of Harvard students who enjoy building products that people love.",
    url: "https://www.startupsatharvard.com",
    siteName: "Startups at Harvard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Startups at Harvard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startups at Harvard",
    description:
      "A community of Harvard students who enjoy building products that people love.",
    images: ["/og-image.jpg"],
  },
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
