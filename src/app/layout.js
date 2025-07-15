import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "焼き鳥専門 串達 - 新潟市西区の本格焼き鳥居酒屋",
  description: "新潟市西区に佇む、こだわりの焼き鳥専門居酒屋「串達」。備長炭で焼き上げる本格焼き鳥と、心温まるおもてなしでお待ちしております。",
  openGraph: {
    title: "焼き鳥専門 串達",
    description: "備長炭で焼き上げる絶品焼き鳥を、新潟市西区でご堪能ください。",
    url: "https://yakitori-site.vercel.app",
    siteName: "焼き鳥専門 串達",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJp.className} bg-black text-white antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}