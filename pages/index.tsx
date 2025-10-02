"use client"; 
// Next.js App Router でクライアントサイドコンポーネントとして実行する指定

import Image from "next/image"; // 画像最適化付きのコンポーネント
import Link from "next/link";   // ページ遷移用コンポーネント
import { useState, useMemo, useEffect } from "react"; // Reactフック
import { useRouter } from "next/router"; // ページ遷移やクエリ取得に使用
import { FoodItem, foods } from "../data/foods"; // データ（料理のジャンル・食材・レシピ情報）をインポート

export default function Page() {
  // 選択中のジャンルを保持
  const [genre, setGenre] = useState<string>("");

  // 選択中の食材リストを保持
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // 抽選で選ばれた料理を保持（今は未使用に近い）
  const [result, setResult] = useState<FoodItem | null>(null);

  // ページ遷移用
  const router = useRouter();

  // 現在のジャンルに含まれる「利用可能な材料一覧」を計算
  const availableIngredients = useMemo(() => {
    if (!genre) return []; // ジャンル未選択なら空
    const ingSet = new Set<string>();
    foods[genre]?.forEach((food) =>
      food.ingredients.forEach((ing) => ingSet.add(ing))
    );
    return Array.from(ingSet); // 重複なしで返す
  }, [genre]);

  // 材料をクリックしたときに選択/解除を切り替える
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient) // すでに入っていれば外す
        : [...prev, ingredient] // 入ってなければ追加
    );
  };

  // 「献立を決める」ボタン押下で /result ページに遷移
  const handleClick = () => {
    if (!genre) return; // ジャンル未選択なら何もしない
    const query: any = { genre };
    if (selectedIngredients.length > 0)
      query.ingredients = selectedIngredients.join(",");
    // 選択したジャンル・材料をクエリパラメータにして遷移
    router.push({ pathname: "/result", query });
  };

  // ランダムに 5 件の料理を取得しておすすめ表示用に保持
  const [randomFive, setRandomFive] = useState<FoodItem[]>([]);
  useEffect(() => {
    // 「すべて」ジャンルがあればそこから、それがなければ全ジャンルを結合
    const all = foods["すべて"].length
      ? foods["すべて"]
      : [...foods["肉"], ...foods["魚"], ...foods["麺"]];
    // シャッフルして先頭 5 件を取り出す
    const shuffled = [...all].sort(() => 0.5 - Math.random());
    setRandomFive(shuffled.slice(0, 5));
  }, []);

  return (
    <div className="bg-[#fffff7]">
      <div className="p-6 text-center ">
        {/* タイトル部分 */}
        <h1 className="pt-38 text-3xl font-bold mb-2 text-[#f2571a]">今日の献立ナビ</h1>
        <h1 className="text-sm text-[#f88153]">食べたいジャンル、使いたい食材から</h1>
        <h1 className="text-sm mb-4 text-[#f88153]">ランダムで今日の献立を決めよう！</h1>

        {/* ▼ ジャンル選択ボタン群 ▼ */}
        <h2 className="text-lg font-bold text-[#3F0F0F] mb-2 pt-8 pb-2">ジャンルを選ぶ</h2>
        <div className="flex gap-4 justify-center mb-6">
          {Object.keys(foods)
            .filter((g) => g !== "すべて") // 「すべて」は除外
            .map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGenre(g); // ジャンル切替
                  setSelectedIngredients([]); // 材料リセット
                  setResult(null); // 結果リセット
                }}
                className={`px-4 py-2 rounded-xl border-2 border-neutral-600 cursor-pointer ${
                  genre === g
                    ? "bg-[#f88159] font-bold text-white" // 選択中スタイル
                    : "text-[#3F0F0F] bg-[#fffff7]" // 通常スタイル
                }`}
              >
                {g}
              </button>
            ))}
        </div>

        {/* ▼ 材料選択（ジャンルが選ばれているときのみ表示） ▼ */}
        {genre && (
          <div>
            <h3 className="text-lg font-bold text-[#3F0F0F] mt-4 mb-2">材料を選ぶ</h3>
            <div className="mb-2 text-[#3F0F0F]">材料にこだわりがなければ未選択</div>
            <div className="flex flex-wrap gap-2 justify-center mb-6 m-4 mx-8">
              {availableIngredients.map((ing) => (
                <label
                  key={ing}
                  className={`border px-3 py-1 rounded cursor-pointer ${
                    selectedIngredients.includes(ing)
                      ? "bg-[#f88159]" // 選択中スタイル
                      : "text-[#3F0F0F] bg-white" // 未選択スタイル
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ing)}
                    onChange={() => toggleIngredient(ing)}
                    className="mr-2"
                  />
                  {ing}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ▼ 抽選ボタン ▼ */}
        <button
          onClick={handleClick}
          className="bg-green-500 text-white px-6 py-2 rounded mb-4 cursor-pointer"
        >
          献立を決める
        </button>


        {/* ▼ ジャンルページへのリンク（一覧ページへ飛ぶ） ▼ */}
        <div className="mt-3">
          <h2 className="text-lg font-bold mb-3 text-[#3F0F0F]">一覧</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.keys(foods).map((g) => (
              <Link
                key={g}
                href={`/genre/${encodeURIComponent(g)}`} // 例: /genre/肉
                className="w-40 bg-[#f88153] text-white font-medium text-center py-3 px-4 rounded-lg hover:bg-blue-600"
              >
                {g} の一覧
              </Link>
            ))}
          </div>
        </div>

        {/* ▼ ランダムおすすめ5件 ▼ */}
        <div className="bg-[#f2efe9] p-4 mt-8">
          <div className="flex pb-2 text-xl font-bold mb-4 px-2 text-[#f2571a]">
            <Image
              src={"/recommend.png"}
              alt={"recommend"}
              width={30}
              height={30}
              className="rounded-full border border-[#3F0F0F] shadow-md"
            /><h2 className="ml-4">本日のおすすめ</h2></div>
          <div className="flex space-x-4 overflow-x-auto pb-4 px-2">
            {randomFive.map((f) => (
              <div
                key={f.name}
                className="flex-none bg-white shadow-lg rounded-lg border border-[#3F0F0F] p-4 flex flex-col justify-between"
              >
                {/* 料理画像 */}
                <div className="mb-6 w-48 h-25 relative">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    className="rounded-lg shadow-md mask-center object-cover"
                  />
                </div>
                {/* 料理名 */}
                <h1 className="text-2xl text-[#3F0F0F] font-bold text-center">
                  {f.name}
                </h1>
                {/* 詳細ページリンク */}
                <div className="mt-4 text-center">
                  <Link
                    href={`/recipe/${encodeURIComponent(f.name)}`}
                    className="inline-block px-4 py-2 rounded-full bg-[#f88153] text-white text-sm font-medium hover:bg-blue-600"
                  >
                    詳細レシピを見る
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
