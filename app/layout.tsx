import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AK Hardware | Har Kaam, Ek Hi Naam",
    template: "%s | AK Hardware",
  },
  description:
    "AK Hardware is your trusted partner for power tools, hand tools, plumbing, electrical, fasteners, sanitaryware, and construction hardware.",
  keywords: [
    "AK Hardware",
    "hardware store",
    "power tools",
    "plumbing supplies",
    "electrical supplies",
    "building materials",
    "sanitaryware",
  ],
  authors: [{ name: "AK Hardware Team" }],
  metadataBase: new URL("https://akhardware.example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akhardware.example.com",
    title: "AK Hardware | Har Kaam, Ek Hi Naam",
    description:
      "Your trusted source for tools, hardware, plumbing, electrical, and building supplies.",
    siteName: "AK Hardware",
  },
  icons: {
    icon: "/assets/brand/favicon.png",
    shortcut: "/assets/brand/favicon.png",
    apple: "/assets/brand/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#012157",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} font-sans`}>
      <body className="min-h-screen flex flex-col bg-surface-bg text-text-primary antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
