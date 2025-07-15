'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import { Noto_Serif_JP } from "next/font/google";
import { getAuth, signOut } from "firebase/auth";
import { MENU_DATA } from "@/data/menu"; // ローカルデータもインポート

const notoSerifJp = Noto_Serif_JP({ subsets: ["latin"], weight: ["700"] });
const categories = ["焼き串", "一品料理", "ドリンク", "デザート", "その他", "期間限定"];

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [menuItems, setMenuItems] = useState(MENU_DATA);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: categories[0], imageUrl: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [imageInputType, setImageInputType] = useState("url"); // "url" or "file"
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("すべて");

  // Firestoreとローカルをマージ（name重複時はFirestore優先）
  const fetchMenuItems = async () => {
    if (!user) return;
    const querySnapshot = await getDocs(collection(db, "menu"));
    const firestoreItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const merged = [
      ...MENU_DATA.filter(local => !firestoreItems.some(f => f.name === local.name)),
      ...firestoreItems,
    ];
    setMenuItems(merged);
  };

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  useEffect(() => {
    fetchMenuItems();
    // eslint-disable-next-line
  }, [user]);

  // 入力値の変更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // 画像ファイル選択時
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `menu-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setNewItem((prev) => ({ ...prev, imageUrl: url }));
      toast.success('画像がアップロードされました');
    } catch {
      toast.error('画像アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  };

  // 新規追加
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price) {
      toast.error('メニュー名と価格は必須です');
      return;
    }
    await addDoc(collection(db, "menu"), { ...newItem, price: Number(newItem.price) });
    toast.success('メニュー項目が追加されました。');
    fetchMenuItems();
    setNewItem({ name: '', description: '', price: '', category: categories[0], imageUrl: '' });
    setImageInputType("url");
  };

  // 編集
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };
  const handleEditFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `menu-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setEditingItem((prev) => ({ ...prev, imageUrl: url }));
      toast.success('画像がアップロードされました');
    } catch {
      toast.error('画像アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  };
  const handleUpdateItem = async () => {
    const itemDoc = doc(db, "menu", editingItem.id);
    await updateDoc(itemDoc, { ...editingItem, price: Number(editingItem.price) });
    toast.success('メニュー項目が更新されました。');
    fetchMenuItems();
    setEditingItem(null);
    setImageInputType("url");
  };

  // 削除
  const handleDeleteItem = async (id) => {
    const itemDoc = doc(db, "menu", id);
    await deleteDoc(itemDoc);
    toast.success('メニュー項目が削除されました。');
    fetchMenuItems();
  };

  // ログアウト
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    window.location.href = '/login';
  };

  if (loading || !user) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const displayedMenuItems =
    filterCategory === "すべて"
      ? menuItems
      : menuItems.filter((item) => item.category === filterCategory);


  return (
    <div className="space-y-12">
      <Toaster theme="dark" />
      <div className="flex justify-between items-center">
        <h1 className={`${notoSerifJp.className} text-4xl md:text-5xl font-bold text-center text-primary`}>管理画面</h1>
        <Button variant="destructive" onClick={handleLogout} className="text-lg px-6">
          ログアウト
        </Button>
      </div>
      <Card className="border-2 border-primary/30 bg-black/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className={`${notoSerifJp.className} text-3xl text-primary`}>
            {editingItem ? 'メニュー編集' : '新規メニュー追加'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="name" value={editingItem ? editingItem.name : newItem.name} onChange={editingItem ? handleEditInputChange : handleInputChange} placeholder="串名" className="bg-black/70 border-primary/50" />
            <Select onValueChange={v =>
                editingItem
                  ? setEditingItem({ ...editingItem, category: v })
                  : setNewItem({ ...newItem, category: v })
              }
              value={editingItem ? editingItem.category : newItem.category}>
              <SelectTrigger className="bg-black/70 border-primary/50">
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
            <Textarea name="description" value={editingItem ? editingItem.description : newItem.description} onChange={editingItem ? handleEditInputChange : handleInputChange} placeholder="説明" className="md:col-span-2 bg-black/70 border-primary/50" />
            <Input name="price" type="number" value={editingItem ? editingItem.price : newItem.price} onChange={editingItem ? handleEditInputChange : handleInputChange} placeholder="価格" className="bg-black/70 border-primary/50" />
            {/* 画像URL or ファイル選択 */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <div className="flex gap-4 items-center">
                <label>
                  <input
                    type="radio"
                    name="imageInputType"
                    value="url"
                    checked={imageInputType === "url"}
                    onChange={() => setImageInputType("url")}
                  />
                  <span className="ml-1">画像URL</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="imageInputType"
                    value="file"
                    checked={imageInputType === "file"}
                    onChange={() => setImageInputType("file")}
                  />
                  <span className="ml-1">ファイルアップロード</span>
                </label>
                {uploading && <span className="text-xs text-yellow-300 ml-3">アップロード中...</span>}
              </div>
              {imageInputType === "url" ? (
                <Input
                  name="imageUrl"
                  value={editingItem ? editingItem.imageUrl : newItem.imageUrl}
                  onChange={editingItem ? handleEditInputChange : handleInputChange}
                  placeholder="画像URL"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={editingItem ? handleEditFileSelect : handleFileSelect}
                  className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            {editingItem ? (
              <>
                <Button onClick={() => setEditingItem(null)} variant="outline" size="lg">キャンセル</Button>
                <Button onClick={handleUpdateItem} size="lg" className="bg-primary hover:bg-primary/90">更新</Button>
              </>
            ) : (
              <Button onClick={handleAddItem} size="lg" className="bg-primary hover:bg-primary/90">追加</Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/30 bg-black/50 backdrop-blur-sm">
  <CardHeader>
    <CardTitle className={`${notoSerifJp.className} text-3xl text-primary`}>メニュー一覧</CardTitle>
    {/* カテゴリフィルタ */}
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        className={`px-4 py-1 rounded-full border text-sm transition
          ${filterCategory === "すべて"
            ? "bg-primary text-white border-primary"
            : "bg-black text-gray-300 border-gray-500 hover:bg-primary/20"
          }`}
        onClick={() => setFilterCategory("すべて")}
      >
        すべて
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-1 rounded-full border text-sm transition
            ${filterCategory === cat
              ? "bg-primary text-white border-primary"
              : "bg-black text-gray-300 border-gray-500 hover:bg-primary/20"
            }`}
          onClick={() => setFilterCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayedMenuItems.length === 0 ? (
        <div className="col-span-full text-center text-gray-400 py-10">
          このカテゴリにはメニューがありません。
        </div>
      ) : (
        displayedMenuItems.map((item) => {
          const isFirestore = !!item.id;
          return (
            <Card key={item.id || item.name} className="bg-black/70 border-primary/50 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center">
                {(item.imageUrl || item.image) && (
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="mb-2 rounded-md max-h-28 object-contain bg-white/10"
                  />
                )}
                <p className="text-white/80">{item.description}</p>
                <p className="font-bold text-lg mt-2">¥{item.price}</p>
              </CardContent>
              <div className="flex gap-2 p-4 mt-auto">
                {isFirestore ? (
                  <>
                    <Button onClick={() => setEditingItem(item)} className="w-1/2 min-w-[90px]">
                      編集
                    </Button>
                    <Button onClick={() => handleDeleteItem(item.id)} variant="destructive" className="w-1/2 min-w-[90px]">
                      削除
                    </Button>
                  </>
                ) : (
                  <Button disabled className="w-full opacity-40 cursor-not-allowed">
                    ローカル項目
                  </Button>
                )}
              </div>
            </Card>
          );
        })
      )}
    </div>
  </CardContent>
</Card>

    </div>
  );
}
