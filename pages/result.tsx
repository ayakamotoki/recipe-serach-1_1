"use client";

/*
  ResultPage コンポーネント
  - /result?genre=肉&ingredients=玉ねぎ,牛肉 のようなクエリを受け取り、
    指定ジャンル内で（必要なら材料で絞り込み）ランダムに1件を選んで表示します。
  - クライアントサイドで動作するコンポーネントとして動作します（"use client"）。
*/

import Image from "next/image"; // Next.js の最適化された画像コンポーネント
import Link from "next/link";   // ページ遷移用コンポーネント（<a> の代替）
import { useRouter } from "next/router"; // クエリ取得やプッシュに使用（pages/router 用）
import { useEffect, useState } from "react"; // React フック
import { FoodItem, foods } from "../data/foods"; // データと型を外部ファイルからインポート

export default function ResultPage() {
  // Next.js のルーターからクエリを取得
  const router = useRouter();
  const { genre, ingredients } = router.query;

  // 抽選結果を保持する state（見つからなければ null）
  const [result, setResult] = useState<FoodItem | null>(null);

  /* ----------------------------
     副作用: クエリ（genre / ingredients）が変わったときに処理を実行
     - foods[genre as string] が undefined だとエラーになるため || [] のフォールバックを使う
     - ingredients があればカンマ区切りで分割して AND 検索（全ての材料を含むもの）
     - 絞り込み後、リストが空なら「該当なし」をセット
     - リストがあればランダムに1件選んでセット
     ---------------------------- */
  useEffect(() => {
    if (!genre) return; // ジャンル未指定なら処理を行わない

    // 指定ジャンルのリストを取得。存在しない場合は空配列を代入して null エラー回避。
    let list = foods[genre as string] || [];

    // クエリ ingredients があればフィルタ処理（AND 検索）
    if (ingredients) {
      const selectedIngredients = (ingredients as string).split(",");
      list = list.filter((food) =>
        selectedIngredients.every((ing) => food.ingredients.includes(ing))
      );
    }

    // 該当する料理がなければ「該当なし」を result にセットして終了
    if (list.length === 0) {
      setResult({
        name: "該当なし",
        // このプロジェクト内では recipe を文字列配列にしている箇所もあるため
        // 空ケースでは配列を入れておく（表示側での扱いに注意）。
        recipe: ["選んだ材料に合う料理が見つかりませんでした。"],
        ingredients: [],
        image: "",
      });
      return;
    }

    // ランダムに1件選択してセット
    const randomIndex = Math.floor(Math.random() * list.length);
    setResult(list[randomIndex]);
  }, [genre, ingredients]);

  // genre がまだ取得できていない（初回レンダリング等）場合の読み込み表示
  if (!genre) return <p>読み込み中...</p>;

  /* ----------------------------
     レンダリング
     - ヘッダー、選ばれた結果（画像・名前・レシピ）、
       詳細レシピへのリンクを表示します。
     - 画像が無い場合は /favicon.ico をフォールバックで表示。
     ---------------------------- */
  return (
    <div className="bg-[#fffff7] min-h-screen">
      {/* ヘッダー */}
      <div className="bg-[#f2efe9] p-4 border-b border-[#3F0F0F]">
        <div className="flex pb-2 pt-4 gap-14">
          {/* トップへ戻るリンク（クリックで / に遷移） */}
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

          {/* サイトタイトル */}
          <div>
            <h1 className="text-2xl font-bold text-[#f2571a]">今日の献立ナビ</h1>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#f2571a]">ランダムの結果</h1>

<div className="flex justify-center">
        {/* result が存在する場合のみ表示 */}
        {result && (
          <div
            key={result.name}
            className="flex-non bg-white shadow-lg rounded-4xl border border-[#3F0F0F] p-4 w-full md:w-130"
          >
            <div>
              {/* 画像部分
                  - result.image が空文字列の場合は /ノーイメージ.png を代替表示
                  - Next.js Image の fill を使って親要素にフィットさせる
              */}
              <div className="mb-6 w-full h-35 md:h-50 relative">
                <Image
                  src={result.image || "/ノーイメージ.png"}
                  alt={`${result.name}の画像`}
                  fill
                  className="rounded-lg shadow-md "
                />
              </div>

              {/* 料理名 */}
              <h1 className="text-2xl text-[#3F0F0F] font-bold relative font-sm text-center">
                {result.name}
              </h1>


            </div>

            {/* 詳細レシピページへ遷移するリンク */}
            <div className="relative mt-4 text-center">
              <Link
                href={`/recipe/${encodeURIComponent(result.name)}`}
                className="inline-block px-4 py-2 rounded-full bg-[#f88153] text-white text-sm font-medium hover:bg-blue-600"
              >
                詳細レシピを見る
              </Link>
            </div>
          </div>
        )}
</div>
      </div>
    </div>
  );
}
