// app/layout.tsx
import type { Metadata } from "next";
import I18nProvider from "./components/I18nProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import SoundIntro from "./components/SoundIntro";
import "./globals.css";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://codarise.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "CODARISE | Web and App Development",
    template: "%s | CODARISE",
  },
  description:
    "CODARISE builds responsive websites, mobile apps, UI/UX experiences, and custom software for modern digital products.",
  applicationName: "CODARISE",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CODARISE | Web and App Development",
    description:
      "Responsive websites, mobile apps, UI/UX experiences, and custom software for modern digital products.",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider>
          <ThemeProvider>
            <SoundIntro />
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
