import type { Metadata } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next"

const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
  variable: "--font-merriWeather",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "DocSimplify",
  description: "DocSimplify is a platform that allows you to simplify your technical documentation with expert assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={`${openSans.className} ${merriWeather.variable}  antialiased`}
        >
          <Analytics />
          <ToastContainer />
          <NextTopLoader showSpinner={false} />
          <ClerkLoading>
            <div className="flex justify-center bg-[#212121] text-white items-center h-screen w-full">
              Loading...
            </div>
          </ClerkLoading>
          <ClerkLoaded>{children}</ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
