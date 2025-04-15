import { Metadata } from "next";
import { montserrat } from "../components/ui/font";
import "./globals.css";

export const metadata : Metadata = {
  title: "Aplicación web",
  description: "Aplicación web para presentación de proyecto de fin de grado",
  icons: {
    icon: "/logo.svg",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
