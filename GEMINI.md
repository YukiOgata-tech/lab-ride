# Yakitori 居酒屋サイト - 全体設計

## 技術スタック
- Next.js (App Router) + JavaScript
- TailwindCSS + shadcn/ui + sonner

## カラースキーム@GEMINI.md
- メインカラー：赤（情熱・食欲を演出）
- アクセントや背景：黒（高級感・引き締め）
- ボタン・ヘッダー・リンクなど主要UIは赤、背景やテキストは黒ベース

## メニュー管理機能
- 管理画面で「串名、説明、価格、画像、カテゴリ」を追加・編集・削除
- データは初期はローカルのオブジェクト（配列・JSONファイルなど）使用
- API RoutesでCRUD実装（JavaScript）

## UI要件
- package.json/`components/ui` にある shadcn/ui は全て活用
- 通知は sonner コンポーネントで成功・失敗時に表示
- レスポンシブ対応（モバイル・デスクトップ両方OK）
- デザインに赤と黒のカラーパレットを反映

## SEO・運用
- 各ページに metadata／OGP／JSON-LD をテンプレートとして設定
- `.env.example` / `README.md` / Vercel設定ファイルも自動生成
- Vercelデプロイを想定し、`vercel.app` サブドメイン対応

## 将来対応
- 将来的に Supabase(Postgres)などのDBへ容易に切り替えできる構造
- 認証機能（簡易）も管理画面だけに追加可能

