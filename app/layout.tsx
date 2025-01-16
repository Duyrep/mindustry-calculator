import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark text-foreground">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content=""/>
      <meta name="keywords" content="mindustry calculator, mindustry ratios" />
      <meta name="author" content="Duyrep" />
      <title>Mindustry Calculator</title>
    </head>
    <body className="overflow-hidden h-full">
      {children}
    </body>
    </html>
  );
}
