"use client"; 
// Next.js App Router 環境でクライアントサイド実行を明示する宣言

import { useRouter } from "next/router"; // ページ遷移やクエリパラメータ取得に利用
import { useEffect, useState } from "react"; // React の状態管理と副作用フック
import Image from "next/image"; // 画像最適化付きの Next.js 専用 Image コンポーネント
import Link from "next/link"; // ページ遷移用コンポーネント
import { FoodItem, foods } from "../../data/foods"; // 料理データと型定義をインポート

// ジャンルごとの料理一覧ページを表示するコンポーネント
export default function GenrePage() {
  const router = useRouter(); // ルーターを取得
  const { genre } = router.query; // URL のクエリパラメータ genre を取得
  const [list, setList] = useState<FoodItem[]>([]); // ジャンルに対応する料理リストの状態

  // genre が変わったときに料理リストを更新
  useEffect(() => {
    if (!genre) return; // genre が未定義なら処理を終了
    const key = genre.toString(); // string に変換
    if (foods[key]) setList(foods[key]); // 対応するジャンルがあればリストを更新
  }, [genre]);

  // genre がまだ読み込まれていないときの表示
  if (!genre) return <p>ジャンルを読み込み中...</p>;
  // データが存在しない場合のエラーメッセージ
  if (list.length === 0) return <p>{genre} の料理は登録されていません。</p>;

  return (
    <div className="bg-[#fffff7]">
      {/* ヘッダー部分 */}
      <div className="bg-[#f2efe9] p-4 border-b border-[#3F0F0F] sticky top-0 z-50">
        <div className="flex">
          {/* トップページに戻るボタン */}
          <Link href={`/`}>
            <div className="cursor-pointer">
              <Image src={"/back.png"} alt={"戻る"} width={30} height={30} className="rounded-full border border-[#3F0F0F] mt-1" />
            </div>
          </Link>
          {/* サイトタイトル */}
          <h1 className="pl-20 pb-2 text-2xl font-bold text-[#f2571a]">今日の献立ナビ</h1>
        </div>

        {/* ジャンル名表示 */}
        <h1 className="text-xl mt-4 mx-6 py-1 mb-2 border border-[#3F0F0F] rounded-full bg-white text-center font-bold text-[#3F0F0F]">
          {genre}
        </h1>

        {/* 件数表示 */}
        <p className="text-lg text-[#3F0F0F] font-bold">
          全 {list.length} 件
        </p>
      </div>

      {/* メイン部分 */}
      <div className="p-6">
        {/* 料理カードをグリッド形式で表示 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((f) => (
            <div key={f.name} className="bg-[#fffffa] border border-[#3F0F0F] shadow-xl rounded-2xl shadow p-4 flex flex-col">
              {/* 料理の画像 */}
              <div className="relative w-full h-32 mb-2">
                <Image src={f.image} alt={f.name} fill className="rounded-lg object-cover" />
              </div>

              {/* 料理名 */}
              <h2 className="font-bold text-lg mb-1 text-center text-[#3F0F0F]">{f.name}</h2>
              {/* 材料一覧 */}
              <p className="text-sm text-gray-600 mb-2">材料: {f.ingredients.join(", ")}</p>

              {/* 詳細ページへのリンク */}
              <Link
                href={`/recipe/${encodeURIComponent(f.name)}`}
                className="mt-auto px-4 py-2 rounded bg-[#f88153] text-white text-sm text-center hover:bg-blue-600"
              >
                詳細を見る
              </Link>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
