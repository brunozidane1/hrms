import type { Metadata } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  weight: ['200', '300', '400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

const fredoka = Fredoka({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Enterprise System - HRMS, CRM, DMS",
  description: "Comprehensive enterprise management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${fredoka.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
