import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderComponent from "@/components/Header";
import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Yourplace",
  description:
    "Yourplace is a social media platform for sharing your life with your friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {/* This would add the theme to the site with dark and light theme, but its only works with the component librarys component! */}
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <HeaderComponent />
          {children}
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
