import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import AmbientBackdrop from "@/components/layout/ambient-backdrop";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { NavigationProgressProvider } from "@/components/layout/navigation-progress";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Hamro Futsal",
  description:
    "Book premium futsal in Bhaktapur. Simple, fast, and built for players.",
};

function NavbarFallback() {
  return (
    <div className="container pt-3 md:pt-4">
      <div className="h-[72px] rounded-[24px] border border-white/10 bg-[rgba(10,14,19,0.72)] shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:h-[80px] md:rounded-[28px]" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F14] text-white antialiased">
        <NavigationProgressProvider>
          <AmbientBackdrop />
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">
              <Providers>
                <Suspense fallback={<NavbarFallback />}>
                  <Navbar />
                </Suspense>
                {children}
              </Providers>
            </div>
            <Footer />
          </div>
        </NavigationProgressProvider>
      </body>
    </html>
  );
}
