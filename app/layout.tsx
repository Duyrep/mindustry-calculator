import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full dark text-foreground">
    <head>
      <meta charSet="UTF-8" />
      <meta name="description" content=""/>
      <meta name="keywords" content="mindustry calculator, mindustry ratios" />
      <meta name="author" content="Duyrep" />
      <meta name="viewport" content="initial-scale=0.8" />
      <title>Mindustry Calculator</title>
    </head>
    <body className="w-full overflow-hidden h-full">
      {children}
    </body>
    </html>
  );
}
