import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full bg-background text-foreground dark">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mindustry Calculator</title>
    </head>
    <body className="w-full h-full overflow-hidden">
      {children}
      <SpeedInsights />
    </body>
    </html>
  );
}
