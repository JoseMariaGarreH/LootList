import { Metadata } from "next";
import { montserrat } from "./font";
import "./globals.css";
import SessionWrapper from "@/components/menu/SessionWrapper";
import PageLoader from "@/components/ui/PageLoader";

export const metadata : Metadata = {
  title: "LootList",
  description: "Aplicación web para presentación de proyecto de fin de grado",
  icons: {
    icon: "/assets/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiase bg-[#457b9d]`}>
        <SessionWrapper>
          <PageLoader>
              {children}
          </PageLoader>
        </SessionWrapper>
      </body>
    </html>
  );
}
