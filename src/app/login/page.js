'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      setError("ログインに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black">
      <form onSubmit={handleLogin} className="bg-black/70 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-4">管理者ログイン</h2>
        <div>
          <label className="block text-white mb-2">メールアドレス</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:border-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div>
          <label className="block text-white mb-2">パスワード</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:border-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-400 text-center">{error}</div>}
        <Button type="submit" className="w-full text-xl py-3 mt-4" disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}
        </Button>
      </form>
    </div>
  );
}
