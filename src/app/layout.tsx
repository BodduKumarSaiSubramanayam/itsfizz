import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Itzfizz | Scroll-Driven Hero",
  description: "A premium scroll-driven hero section animation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Outfit:wght@900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-[#D9FB3F] selection:text-stone-900 overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
