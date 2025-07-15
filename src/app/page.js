'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Noto_Serif_JP } from "next/font/google";

const notoSerifJp = Noto_Serif_JP({ subsets: ["latin"], weight: ["700"] });

export default function HomePage() {
  return (
    <div className="space-y-20 md:space-y-32">
      <section 
        className="relative text-center py-20 md:py-32 bg-cover bg-center rounded-lg overflow-hidden border-4 border-primary/50"
        style={{ backgroundImage: "url('/images/many-kushi.webp')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10">
          <h1 className={`${notoSerifJp.className} text-4xl md:text-6xl font-bold text-white mb-4 px-4`}>炭火の香り、職人の技。</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">新潟市西区に佇む隠れ家居酒屋「串達」で、最高の焼き鳥体験を。</p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
            <Link href="/menu">今宵のお品書き</Link>
          </Button>
        </div>
      </section>

      <section>
        <Card className="relative bg-black/80 border-2 border-primary/30 backdrop-blur-sm">
          <Image
            src="/images/master-of-kushi.jpg"
            alt="串達"
            width={1200}
            height={600}
            className="absolute inset-0 rounded-lg w-full h-full object-cover -z-2 opacity-30"/>
          <CardHeader>
            <CardTitle className={`${notoSerifJp.className} text-3xl md:text-4xl text-primary text-center`}>串達のこだわり</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-8 text-center text-white/90 p-8 md:p-12">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">備長炭</h3>
              <p className="text-base">高温で一気に焼き上げることで、旨味を閉じ込め、外はカリッと中はジューシーに仕上げます。</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">厳選鶏</h3>
              <p className="text-base">毎朝仕入れる新鮮な鶏肉のみを使用。部位ごとに最適な火入れで提供します。</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">秘伝のタレ</h3>
              <p className="text-base">創業以来継ぎ足してきた秘伝のタレ。甘辛い味わいが、鶏の旨味を引き立てます。</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className={`${notoSerifJp.className} text-3xl md:text-4xl font-bold text-primary mb-8`}>店舗のご案内</h2>
        <div className="space-y-4 text-lg text-white/90 max-w-2xl mx-auto">
            <p><span className="font-bold text-primary">営業時間:</span> 火～日 16:00～24:00 / ランチ （休止中）</p>
            <p><span className="font-bold text-primary">住所:</span> 新潟県新潟市西区坂井東1-6-18</p>
            <p><span className="font-bold text-primary">定休日:</span> 月曜日</p>
        </div>
        <div className="mt-8 rounded-lg overflow-hidden border-4 border-primary/50 max-w-4xl mx-auto">
  <iframe
    src="https://www.google.com/maps?q=37.87991,138.984203&z=18&output=embed"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>



      </section>

      <section className="text-center bg-primary/10 rounded-lg py-12 md:py-16 border-2 border-primary/30">
        <h2 className={`${notoSerifJp.className} text-3xl md:text-4xl font-bold text-primary mb-4`}>ご予約・お問い合わせ</h2>
        <p className="text-lg text-white/90 mb-8">お電話または、各種グルメサイトからご予約いただけます。お持ち帰りもご利用いただけます。</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
          <a href="tel:025-211-4320">電話で予約する : 025-211-4320</a>
        </Button>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
          <a href="https://www.hotpepper.jp/strJ001275567/" target="_blank" rel="noopener noreferrer">ホットペッパーで見る</a>
        </Button>
        </div>
      </section>
    </div>
  );
}