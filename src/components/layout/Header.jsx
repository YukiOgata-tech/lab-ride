'use client';

import Link from "next/link";
import { useState } from "react";
import { Noto_Serif_JP } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const notoSerifJp = Noto_Serif_JP({ subsets: ["latin"], weight: "900" });
const MOBILE_MENU_BG = "/images/visual-store.jpg";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "ホーム" },
    { href: "/about", label: "当店について" },
    { href: "/menu", label: "お品書き" },
    { href: "/admin", label: "管理者用" },
  ];

  return (
    <header className="relative bg-gradient-to-b from-black via-zinc-900 to-black border-b-4 border-red-800 shadow-[0_6px_24px_0_rgba(130,10,10,0.7)] z-50 w-full overflow-x-hidden">
      {/* --- PC表示 --- */}
      <div className="hidden md:flex items-center min-h-[120px] px-8 py-4 w-full max-w-screen-xl mx-auto">
        {/* 店名：左詰め */}
        <img
    src="/images/kushitatsu-logo.png" 
    alt="店舗ロゴ"
    className="w-12 h-12 object-contain rounded-xl bg-white/70 mr-2"
  />
        <div className="flex-shrink-0">
          <span className={`${notoSerifJp.className} text-4xl font-extrabold text-red-500 select-none drop-shadow-lg`}>
            焼き鳥専門 串達
          </span>
        </div>
        {/* メニュー：右詰め */}
        <nav className="flex-1 flex flex-row items-center justify-end space-x-2">
          {navItems.map(({ href, label }) => (
            <Button asChild variant="ghost"
              className="text-lg lg:text-xl text-white px-2 py-3 rounded-xl 
                hover:bg-gradient-to-tr hover:from-red-700 hover:to-black 
                hover:text-yellow-300 font-bold shadow-lg 
                transition-all duration-300"
              key={href}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </nav>
      </div>

      {/* --- モバイルメニュー --- */}
      <div className="flex md:hidden justify-between items-center px-4 py-7">
        <motion.div
          initial={{ scale: 0.7, rotateX: 40, opacity: 0.2 }}
          animate={{ scale: 1, rotateX: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 12 }}
          className="mx-auto"
        >
          <Link
            href="/"
            className={`${notoSerifJp.className} 
              relative 
              text-4xl xs:text-5xl font-extrabold 
              text-red-500 drop-shadow-[0_8px_16px_rgba(255,0,50,0.5)]
              tracking-widest select-none
              before:content-[''] before:absolute before:-inset-2 before:-z-10 before:rounded-2xl 
              before:bg-gradient-to-br before:from-red-800/80 before:to-yellow-100/10
              before:blur-[8px] before:opacity-50
              transition-all duration-500 hover:scale-100 hover:drop-shadow-[0_12px_40px_rgba(255,0,0,0.6)]`}
          >
            <motion.span
              initial={{ scale: 0.8, y: 80, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 60, delay: 0.12 }}
              className="inline-block [text-shadow:0_8px_32px_gold,0_2px_8px_red,0_1px_0px_white] animate-pulse"
            >
              焼き鳥専門 串達
            </motion.span>
          </Link>
        </motion.div>
        {!isOpen && (
          <div className="z-50 ml-auto">
            <button onClick={() => setIsOpen(true)} className="text-red-600">
              <Menu size={38} />
            </button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ scale: 0.92, opacity: 0, filter: "blur(16px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.92, opacity: 0, filter: "blur(16px)" }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-10 md:hidden"
            style={{
              backgroundImage: `url(${MOBILE_MENU_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <button
              className="fixed top-6 right-6 z-[10000] bg-black/70 rounded-full p-3 hover:bg-red-700/80 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <X size={38} className="text-red-500 drop-shadow" />
            </button>
            <div className="relative z-10 w-full flex flex-col items-center">
              {navItems.map(({ href, label }, idx) => (
                <motion.div
                  key={label}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + idx * 0.09, type: "spring", stiffness: 60 }}
                  className="w-full flex justify-center"
                >
                  <Button asChild variant="ghost"
                    className="text-3xl text-white px-10 py-6 rounded-2xl 
                      font-extrabold bg-black/60 hover:bg-red-800/80 
                      hover:text-yellow-300 w-4/5 mb-2 shadow-xl 
                      transition-all duration-300 transform-gpu hover:scale-110 hover:shadow-[0_0_40px_red]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
