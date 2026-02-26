import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartPopup from "@/components/cart/CartPopup";
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FirstCry Clone",
  description: "FirstCry website clone with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
            <CartPopup />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}