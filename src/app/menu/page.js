'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Noto_Serif_JP } from "next/font/google";
import MenuCard from "@/components/MenuCard";
import { MENU_DATA } from "@/data/menu"; // ローカルデータ

const notoSerifJp = Noto_Serif_JP({ subsets: ["latin"], weight: ["700"] });
const categories = ["焼き串", "一品料理", "ドリンク", "デザート", "その他", "期間限定"];
const WOOD_TAB_PNG = "/images/wood-for-tab.png";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 600px以下ならモバイル扱い（お好みで調整可）
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      // Firestore取得
      const querySnapshot = await getDocs(collection(db, "menu"));
      const firestoreItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        source: 'firestore',
      }));
      // ローカルデータにも source: 'local' を付与
      const localItems = MENU_DATA.map(item => ({
        ...item,
        source: 'local',
      }));
      // nameが被らないようローカル優先で合体
      const merged = [
        ...localItems.filter(local => !firestoreItems.some(f => f.name === local.name)),
        ...firestoreItems,
      ];
      setMenuItems(merged);
    };
    fetchMenuItems();
  }, []);

  return (
    <div className="space-y-10 px-1 py-8 max-w-7xl mx-auto">
      <h1 className={`${notoSerifJp.className} text-3xl md:text-4xl font-bold text-center text-primary mb-4`}>お品書き</h1>
      <Tabs defaultValue="焼き串" className="w-full">
        <TabsList className="flex justify-center flex-wrap gap-2 bg-transparent border-none p-0 mb-5">
          {categories.map(cat => (
            <TabsTrigger
              key={cat}
              value={cat}
              className={`
                group w-24 sm:w-32 md:w-36 lg:w-40 h-11 sm:h-12 md:h-14 border-none rounded-none 
                bg-transparent flex items-center justify-center text-base font-bold
                transition-all duration-200 relative overflow-visible z-0 shadow-none
                data-[state=active]:scale-110
              `}
              style={{
                backgroundImage: `url('${WOOD_TAB_PNG}')`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'white',
                textShadow: '0 2px 10px #442, 0 1px 2px #000',
                boxShadow: '0 4px 12px rgba(80,40,0,0.06)',
                border: 'none',
                filter: 'drop-shadow(0 2px 8px #0008)',
              }}
            >
              <span
                className={`relative z-10 ${notoSerifJp.className} drop-shadow 
                  data-[state=active]:text-yellow-100 group-data-[state=active]:text-red-600`}
              >
                {cat}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map(cat => (
          <TabsContent key={cat} value={cat}>
 <div
  className="
    grid
    grid-cols-3
    gap-1
    sm:gap-2
    sm:grid-cols-4
    md:grid-cols-4
    lg:grid-cols-5
    xl:grid-cols-5
    w-full
    sm:h-base
    place-items-center
  "
>
  {menuItems.filter(item => item.category === cat).length > 0 ? (
    menuItems.filter(item => item.category === cat).map(item => (
      <MenuCard key={item.id || item.name} item={item} hideDescription={isMobile} />
    ))
  ) : (
    <div className="col-span-full text-center text-gray-300 py-12">
      このカテゴリにメニューはありません。
    </div>
  )}
</div>

</TabsContent>


        ))}
      </Tabs>
    </div>
  );
}
