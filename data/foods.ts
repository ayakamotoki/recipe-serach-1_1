// data/foods.ts
// レシピデータを管理するファイル

export type FoodItem = {
  name: string;         // 料理名
  recipe: string[];     // 作り方（複数ステップ）
  ingredients: string[];// 材料一覧
  image: string;        // 画像URL
};

// 各ジャンルごとの料理データ
export const foods: Record<string, FoodItem[]> = {
  肉: [
    { name: "ハンバーグ", recipe: ["挽き肉と玉ねぎをこねて焼き", "ソースをかけます。"], ingredients: ["牛肉", "玉ねぎ", "パン粉"], image:"/next.svg" },
    { name: "ステーキ", recipe: ["肉を焼いて", "塩胡椒で味付けします。"], ingredients: ["牛肉", "塩", "胡椒"], image:"/next.svg" },
    { name: "焼肉", recipe: ["肉を焼いてタレをつけて食べます。"], ingredients: ["牛肉", "タレ"], image:"/next.svg" },
    { name: "鶏のから揚げ", recipe: ["衣をつけて油で揚げます。"], ingredients: ["鶏肉", "小麦粉", "醤油"], image:"/next.svg" },
    { name: "豚バラ大根", recipe: ["豚肉と大根を煮込みます。"], ingredients: ["豚肉", "大根", "醤油"], image:"/next.svg" },
    { name: "生姜焼き", recipe: ["豚肉を生姜ダレで炒めます。"], ingredients: ["豚肉", "生姜", "醤油"], image:"/next.svg" },
  ],
  魚: [
    { name: "ムニエル", recipe: ["魚に小麦粉をつけてバターで焼きます。"], ingredients: ["白身魚", "小麦粉", "バター"], image:"/next.svg" },
    { name: "アジフライ", recipe: ["アジに衣をつけて揚げます。"], ingredients: ["アジ", "パン粉", "油"], image:"/next.svg" },
    { name: "サバの味噌煮", recipe: ["サバを味噌で煮込みます。"], ingredients: ["サバ", "味噌", "酒"], image:"/next.svg" },
    { name: "鮭のバターホイル焼き", recipe: ["鮭をホイルに包んでバターで蒸し焼きにします。"], ingredients: ["鮭", "バター", "玉ねぎ"], image:"/next.svg" },
    { name: "ぶりの照り焼き", recipe: ["ぶりを醤油ダレで焼きます。"], ingredients: ["ぶり", "醤油", "みりん"], image:"/next.svg" },
    { name: "カレイの煮つけ", recipe: ["カレイを醤油ダレで煮ます。"], ingredients: ["カレイ", "醤油", "酒"], image:"/next.svg" },
  ],
  麺: [
    { name: "ラーメン", recipe: ["スープを作り、麺を茹でて具材をのせます。"], ingredients: ["中華麺", "鶏ガラ", "ネギ"], image:"/next.svg" },
    { name: "うどん", recipe: ["だしをとり、うどんを茹でて薬味を添えます。"], ingredients: ["うどん", "だし", "ネギ"], image:"/next.svg" },
    { name: "そば", recipe: ["そばを茹でて冷やし、つゆにつけて食べます。"], ingredients: ["そば", "つゆ", "わさび"], image:"/next.svg" },
    { name: "パスタ", recipe: ["パスタを茹でてソースを絡めます。"], ingredients: ["パスタ", "トマト", "オリーブオイル"], image:"/next.svg" },
    { name: "焼きそば", recipe: ["麺を炒めてソースで味付けします。"], ingredients: ["中華麺", "豚肉", "キャベツ"], image:"/next.svg" },
  ],
  すべて: [
    // ここに全ジャンルをまとめて追加（省略）
    { name: "ハンバーグ", recipe: ["挽き肉と玉ねぎをこねて焼き、ソースをかけます。"], ingredients: ["牛肉", "玉ねぎ", "パン粉"], image:"/next.svg" },
    { name: "ステーキ", recipe: ["肉を焼いて塩胡椒で味付けします。"], ingredients: ["牛肉", "塩", "胡椒"], image:"/next.svg" },
    { name: "焼肉", recipe: ["肉を焼いてタレをつけて食べます。"], ingredients: ["牛肉", "タレ"], image:"/next.svg" },
    { name: "鶏のから揚げ", recipe: ["衣をつけて油で揚げます。"], ingredients: ["鶏肉", "小麦粉", "醤油"], image:"/next.svg" },
    { name: "豚バラ大根", recipe: ["豚肉と大根を煮込みます。"], ingredients: ["豚肉", "大根", "醤油"], image:"/next.svg" },
    { name: "生姜焼き", recipe: ["豚肉を生姜ダレで炒めます。"], ingredients: ["豚肉", "生姜", "醤油"], image:"/next.svg" },

    { name: "ムニエル", recipe: ["魚に小麦粉をつけてバターで焼きます。"], ingredients: ["白身魚", "小麦粉", "バター"], image:"/next.svg" },
    { name: "アジフライ", recipe: ["アジに衣をつけて揚げます。"], ingredients: ["アジ", "パン粉", "油"], image:"/next.svg" },
    { name: "サバの味噌煮", recipe: ["サバを味噌で煮込みます。"], ingredients: ["サバ", "味噌", "酒"], image:"/next.svg" },
    { name: "鮭のバターホイル焼き", recipe: ["鮭をホイルに包んでバターで蒸し焼きにします。"], ingredients: ["鮭", "バター", "玉ねぎ"], image:"/next.svg" },
    { name: "ぶりの照り焼き", recipe: ["ぶりを醤油ダレで焼きます。"], ingredients: ["ぶり", "醤油", "みりん"], image:"/next.svg" },
    { name: "カレイの煮つけ", recipe: ["カレイを醤油ダレで煮ます。"], ingredients: ["カレイ", "醤油", "酒"], image:"/next.svg" },

    { name: "ラーメン", recipe: ["スープを作り、麺を茹でて具材をのせます。"], ingredients: ["中華麺", "鶏ガラ", "ネギ"], image:"/next.svg" },
    { name: "うどん", recipe: ["だしをとり、うどんを茹でて薬味を添えます。"], ingredients: ["うどん", "だし", "ネギ"], image:"/next.svg" },
    { name: "そば", recipe: ["そばを茹でて冷やし、つゆにつけて食べます。"], ingredients: ["そば", "つゆ", "わさび"], image:"/next.svg" },
    { name: "パスタ", recipe: ["パスタを茹でてソースを絡めます。"], ingredients: ["パスタ", "トマト", "オリーブオイル"], image:"/next.svg" },
    { name: "焼きそば", recipe: ["麺を炒めてソースで味付けします。"], ingredients: ["中華麺", "豚肉", "キャベツ"], image:"/next.svg" },
   
  ]
};
