# 焼き鳥居酒屋サイト - Gemini CLI 文脈

## プロジェクト概要
- 場所：新潟市西区の焼き鳥専門居酒屋の公式WEBサイト（焼き鳥専門串達）
- 技術：Next.js（App Router）、TypeScript、TailwindCSS、shadcn/ui
- 目的：メニューSEO、予約導線、アクセス案内、Googleマップ埋め込み

## ページ構成
- Home：店舗概要・おすすめ串紹介・予約リンク・OGP/構造化データ
- Menu：串カテゴリ一覧、個別リンク
- Menu/[slug]：串詳細ページ。JSON-LD MenuItem、タイトル/description生成
- Reservation：アクセス・地図・電話リンク・営業時間
- About：店舗のストーリー・スタッフ紹介等

## UX & SEOルール
- 各ページに `metadata`（title, description, openGraph）
- 各画像は `alt` 属性必須
- JSON-LD: LocalBusiness, MenuItem, GeoCoordinates を各ページに反映
- Tailwind＋shadcn/ui でUIを構築
- サイトマップ、robots.txt は next-sitemap にて生成
- 画像は next/image を利用、遅延読み込み + WebP生成

## 開発規約
- ESLint + Prettier でコード整形
- Named export を基本とし、一貫性を重視
- ファイル名は kebab-case、ディレクトリ構成は pages/appごとに分割

## CI連携想定
- `npm run dev` → 開発確認
- `npm run build && npm run dev` → 完全生成後チェック
- GitHub PR に /stats や /memory を活用し自動レビュー
- next-sitemap 実行を postbuild スクリプトに追加
