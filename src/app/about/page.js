'use client';

import { Noto_Serif_JP } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const notoSerifJp = Noto_Serif_JP({ subsets: ["latin"], weight: ["700"] });

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className={`${notoSerifJp.className} text-4xl md:text-5xl font-bold text-primary`}>当店について</h1>
        <p className="text-lg mt-4 text-muted-foreground">串達の想いとこだわり</p>
      </section>

      <section>
        <Card className="bg-black/50 border-primary/30">
          <CardContent className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className={`${notoSerifJp.className} text-3xl text-primary`}>ご挨拶</h2>
              <p className="text-lg leading-relaxed text-white/90">
                「焼き鳥専門 串達」のページへようこそ。
                <br />
                私たちは、札幌の名店「串鳥」の魂を受け継ぎ、新潟の地で最高の焼き鳥を提供することに情熱を注いでいます。一本一本の串に心を込め、炭火でじっくりと焼き上げることで、素材の持つ本来の旨味を最大限に引き出します。
                <br />
                友人や家族、大切な方との語らいの場として、また、一日の疲れを癒す一杯の場として、皆様の心に残るひとときを演出できれば幸いです。皆様のご来店を心よりお待ちしております。
              </p>
              <p className={`${notoSerifJp.className} text-xl text-right text-primary mt-4`}>店主敬白</p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image src="/images/inside-store.jpg" alt="店舗内装" layout="fill" objectFit="cover" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className={`${notoSerifJp.className} text-3xl text-primary text-center mb-8`}>会社概要</h2>
        <Card className="bg-black/50 border-primary/30">
          <CardContent className="p-8 md:p-12 text-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6">
              <div className="md:col-span-1 font-bold text-primary">店名</div>
              <div className="md:col-span-2 text-white/90">焼き鳥専門 串達</div>

              <div className="md:col-span-1 font-bold text-primary">所在地</div>
              <div className="md:col-span-2 text-white/90">〒950-2041 新潟県新潟市西区坂井東1-6-18</div>

              <div className="md:col-span-1 font-bold text-primary">電話番号</div>
              <div className="md:col-span-2 text-white/90">025-211-4320</div>

              <div className="md:col-span-1 font-bold text-primary">営業時間</div>
              <div className="md:col-span-2 text-white/90">
                火～日: 16:00～翌0:00 (L.O. 23:00)<br />
                ランチ(火～金): 11:30～14:30 (L.O. 14:00)
              </div>

              <div className="md:col-span-1 font-bold text-primary">定休日</div>
              <div className="md:col-span-2 text-white/90">月曜日</div>

              <div className="md:col-span-1 font-bold text-primary">駐車場</div>
              <div className="md:col-span-2 text-white/90">50台（共有駐車場）</div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}