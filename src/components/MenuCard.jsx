import { useState } from "react";
import Image from "next/image";
import { Noto_Serif_JP } from "next/font/google";

const notoSerifJp = Noto_Serif_JP({ subsets: ["latin"], weight: ["700"] });
const MENU_BG = "https://img.pikbest.com/back_our/bg/20201013/bg/fa464b605b8f1_417669.jpg!w700wp";

export default function MenuCard({ item, hideDescription = false }) {
  const [showFull, setShowFull] = useState(false);

  const imageSrc = item.imageUrl || item.image;

  // 「もっと見る」判定（2行＝約42文字で調整）
  const CLAMP_LEN = 42;
  const needsMore = !hideDescription && item.description && item.description.length > CLAMP_LEN;

  return (
    <div
      className="relative rounded-xl shadow-lg bg-cover bg-center text-white flex flex-col justify-between
        sm:aspect-[7/9] min-w-0 w-full max-w-xs min-h-[130px] transition-all duration-300 hover:scale-105"
      style={{
        backgroundImage: `url('${MENU_BG}')`,
        minHeight: "130px",
        maxHeight: "240px",
      }}
    >
      <div className="absolute inset-0 bg-black/20 rounded-xl" />
      <div className="relative z-10 flex flex-col h-full p-3 items-center text-center">
        {/* 画像 */}
        {imageSrc && (
          <div className="w-full flex justify-center mb-2">
            <Image
              src={imageSrc}
              alt={item.name}
              width={120}
              height={80}
              className="rounded-lg shadow-lg object-cover aspect-video"
              style={{ maxHeight: 70, minHeight: 40, background: "#fff7" }}
              unoptimized
            />
          </div>
        )}
        {/* 名前 */}
        <h3 className={`${notoSerifJp.className} text-xs sm:text-sm md:text-base font-bold mb-1 text-shadow-md`}>
          {item.name}
        </h3>
        {/* 説明文・もっと見る */}
        {!hideDescription && (
          <div className="flex-grow relative">
            <p className={`text-xs sm:text-xs text-white/90 ${!showFull ? "line-clamp-2" : ""}`}>
              {item.description}
            </p>
            {needsMore && !showFull && (
              <button
                className="absolute right-0 bottom-0 text-xs text-yellow-400 underline bg-black/60 px-1"
                onClick={() => setShowFull(true)}
              >
                ...もっと見る
              </button>
            )}
            {needsMore && showFull && (
              <button
                className="text-xs text-blue-300 underline mt-1"
                onClick={() => setShowFull(false)}
              >
                閉じる
              </button>
            )}
          </div>
        )}
        {/* 価格（常に最下部） */}
        <p className={`${notoSerifJp.className} text-sm sm:text-base font-bold mt-1 text-yellow-200 drop-shadow`}>
          ¥{item.price}
        </p>
      </div>
    </div>
  );
}
