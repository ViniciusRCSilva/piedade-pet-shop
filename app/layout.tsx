import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_components/cart/context/cartContext";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Navbar from "./_components/navbar";

const baloo = Baloo_2({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Piedade Pet Shop",
  description: "Sua melhor loja de rações e acessórios!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${baloo.className} antialiased`}
      >
        <ClerkProvider localization={ptBR}>
          <CartProvider>
            <Navbar />
            {children}
            <Toaster />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
