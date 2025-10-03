// pages/recipe/[name].tsx

import { useRouter } from "next/router"; // ルーティング用フック
import Link from "next/link";           // ページ遷移用コンポーネント
import Image from "next/image";         // 画像最適化付きのImageコンポーネント
import { foods } from "../../data/foods";   // 料理データをまとめたモジュールをインポート

// コンポーネント本体
export default function RecipeDetail() {
  const router = useRouter();       // useRouterを呼び出す
  const { name } = router.query;    // URLパラメータから "name" を取得

  // 全ジャンルの料理データを1つの配列にまとめる
  const allFoods = Object.values(foods).flat();

  // name と一致するレシピを探す
  const recipe = allFoods.find((item) => item.name === name);

  // レシピが存在しない場合の画面
  if (!recipe) {
    return (
      <div>
        <main className="min-h-screen relative">
          <div className="text-center p-6">
            <p className="p-6 text-center">レシピが見つかりませんでした。</p>

            {/* ホームに戻るリンク */}
            <div className="mx-auto mt-6 shadow-lg rounded-full p-4 bg-sky-100 text-neutral-600 underline font-medium text-xl sm:w-1/3">
              <Link href="/" className=" text-xl font-medium">
                ← ホームに戻る
              </Link>
            </div>
          </div>

          <footer className="absolute inset-x-0 bottom-0"></footer>
        </main>
      </div>
    );
  }

  // レシピが見つかった場合の画面
  return (
    <div className="min-h-screen relative bg-[#fffff7]">
      {/* ヘッダー部分 */}
      <div className="bg-[#f2efe9] p-4 border-b border-[#3F0F0F]">
        <div className="flex pb-2 pt-4 gap-14">
          {/* 戻るボタン */}
          <Link href={`/`}>
            <div className="cursor-pointer">
              <Image
                src={"/back.png"}
                alt={"戻る"}
                width={30}
                height={30}
                className="rounded-full border border-[#3F0F0F]"
              />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-[#f2571a]">今日の献立ナビ</h1>
        </div>
      </div>

      {/* レシピ詳細部分 */}
      <div className="text-center">
        <div className="mb-6">
          {/* 料理の画像 */}
          <Image
            src={recipe.image}
            alt={`${recipe.name}の画像`}
            width={375}
            height={400}
            className="mx-auto rounded-lg shadow-md"
          />

          <div className="mx-auto p-6 md:w-180">
            {/* 料理名 */}
            <h1 className="text-3xl font-bold mb-4 text-[#3F0F0F]">
              {recipe.name}
            </h1>

            {/* 材料リスト */}
            <p className="mb-4 pb-4 pr-4 text-2xl font-bold border-b border-[#3F0F0F] text-left text-[#f2571a]">
              材料
              <div className="text-right text-[#3F0F0F]">
                <ul className="text-[#3F0F0F] text-lg">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </p>

            {/* 作り方リスト */}
            <p className="mb-4 text-2xl font-bold text-left text-[#f2571a]">
              作り方
            </p>
            <ol className="text-[#3F0F0F] text-lg px-2 font-bold text-left list-decimal list-inside">
              {recipe.recipe.map((item, index) => (
                <li key={index} className="py-3">
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>


    </div>
  );
}
