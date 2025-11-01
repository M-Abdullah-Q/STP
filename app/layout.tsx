import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Preloader from "@/components/preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Serenity Therapy - Professional Mental Health Services",
  description:
    "Professional therapy services in a safe, supportive environment. Find your path to inner peace with Dr. Serena Blake.",
  keywords:
    "therapy, mental health, counseling, anxiety, depression, couples therapy, family therapy",
  authors: [{ name: "Dr. Serena Blake" }],
  openGraph: {
    title: "Serenity Therapy - Professional Mental Health Services",
    description:
      "Professional therapy services in a safe, supportive environment. Find your path to inner peace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="serenity-theme">
          <Preloader>{children}</Preloader>
        </ThemeProvider>
      </body>
    </html>
  );
}
