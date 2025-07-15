'use client';

import { Noto_Serif_JP } from "next/font/google";
import { motion } from "framer-motion";
import { FaInstagram, FaLine } from "react-icons/fa";
// もしくは import { FaInstagram } from "react-icons/fa6"; import { SiLine } from "react-icons/si";

const notoSerifJp = Noto_Serif_JP({ subsets: ["latin"], weight: "700" });

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-black via-zinc-900 to-red-950 border-t-4 border-red-800 py-12 md:py-20 mt-16 shadow-inner">
      {/* 背景網目 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grill" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="40" height="40" fill="none" />
              <line x1="0" y1="0" x2="0" y2="40" stroke="#f87171" strokeWidth="2" />
              <line x1="0" y1="0" x2="40" y2="0" stroke="#f87171" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grill)" />
        </svg>
      </div>
      <div className="container mx-auto text-center text-white relative z-10">
        <motion.p
          initial={{ scale: 0.7, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.12 }}
          className={`${notoSerifJp.className} text-3xl md:text-5xl font-extrabold text-red-500 mb-8 tracking-widest drop-shadow-[0_8px_18px_gold]`}
        >
          焼き鳥専門 串達
        </motion.p>
        <div className="flex flex-col items-center gap-2">
          <motion.p
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35, type: "spring" }}
            className="text-xl md:text-2xl font-bold"
          >
            新潟県新潟市西区坂井東1-6-18
          </motion.p>
          <motion.p
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.45, type: "spring" }}
            className="text-xl md:text-2xl font-bold"
          >
            電話: <span className="font-mono">025-211-4320</span>
          </motion.p>
        </div>
        {/* SNSリンク追加部分 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.58, type: "spring" }}
          className="flex justify-center items-center gap-6 mt-8"
        >
          <a
            href="https://www.instagram.com/yakitori_kushitatsu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-150"
            aria-label="Instagram"
          >
            <FaInstagram size={36} className="text-pink-400 hover:text-pink-300" />
          </a>
          <a
            href="https://lin.ee/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-150"
            aria-label="LINE"
          >
            <FaLine size={36} className="text-green-400 hover:text-green-300" />
          </a>
        </motion.div>
        {/* SNSリンクここまで */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, type: "spring", stiffness: 90 }}
          className="flex justify-center my-10 origin-left"
        >
          <span className="block w-36 h-2 rounded-full bg-gradient-to-r from-red-700 via-yellow-400 to-red-700 shadow-xl animate-pulse"></span>
        </motion.div>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, type: "spring" }}
          className="mt-8 text-lg text-gray-300"
        >
          &copy; 2025 焼き鳥専門 串達. All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
}
