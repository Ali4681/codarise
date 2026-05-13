// app/layout.tsx
import I18nProvider from "./components/I18nProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import SoundIntro from "./components/SoundIntro";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SoundIntro />
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
