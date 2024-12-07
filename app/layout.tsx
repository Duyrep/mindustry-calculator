import "./globals.css";

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
    <body className="w-full h-full p-2">
      {children}
    </body>
    </html>
  );
}
