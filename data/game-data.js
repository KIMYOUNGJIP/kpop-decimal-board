window.EDUGAME_DATA = {
  meta: {
    id: "kpop-decimal-board",
    title: "K-POP 콘서트 준비 대작전: 소수의 곱셈",
    subtitle: "5학년 4단원 소수의 곱셈 총정리 보드게임",
    genre: "board",
    subject: "수학(5학년 4단원 소수의 곱셈)",
    grade: "5~6학년",
    titleBg: "images/title_stage.webp",
    boardBg: "images/board_bg.webp"
  },
  player: {
    name: "무대 감독",
    startCoins: 50
  },
  items: [
    {
      id: "item_lightstick",
      name: "반짝이 응원봉",
      price: 40,
      icon: "🪄",
      desc: "퀴즈 정답을 맞힐 때마다 +20점 보너스 점수를 받습니다!"
    },
    {
      id: "item_ribbon",
      name: "무지개 리본 세트",
      price: 50,
      icon: "🎀",
      desc: "구역을 완료할 때마다 +15코인을 추가로 받습니다!"
    },
    {
      id: "item_mic",
      name: "골드 무대 마이크",
      price: 60,
      icon: "🎤",
      desc: "퀴즈마다 [오답 1개 지우기] 힌트 버튼을 사용할 수 있습니다!"
    },
    {
      id: "item_vip",
      name: "콘서트 VIP 패스",
      price: 90,
      icon: "🎫",
      desc: "잠긴 구역도 순서와 상관없이 바로 입장할 수 있습니다!"
    }
  ],
  stations: [
    {
      id: "st_1",
      npcPortrait: "images/npc_1.webp",
      sceneBg: "images/scene_1.webp",
      boardPin: { x: 20, y: 24 },
      order: 1,
      boardStep: 1,
      title: "1구역: 대기실 & 입장 동선",
      npcName: "오아 & 리사",
      npcEmoji: "🥤",
      dialogues: [
        "안녕! 오늘 K-POP 콘서트 준비를 맡은 무대 감독이지?",
        "대기실 음료와 리본, 구름 소품에 필요한 양을 정확히 계산해야 해!"
      ],
      conceptCard: {
        title: "소수 × 자연수 계산하기",
        points: [
          "자연수의 곱셈처럼 먼저 계산한 뒤, 소수점 아래 자릿수만큼 찍어요.",
          "예: 0.3 × 4 = 1.2 / 0.25 × 6 = 1.50 → 끝의 0은 생략해 1.5로 써요."
        ]
      },
      minigame: {
        type: "matching",
        title: "대기실 준비물 계산 짝맞추기",
        instruction: "멤버별 준비 상황과 알맞은 계산 결과를 연결하세요.",
        payload: {
          pairs: [
            { left: "오아 음료 0.3 L × 4병", right: "1.2 L" },
            { left: "리사 동선 1.2 m × 3번", right: "3.6 m" },
            { left: "지수 리본 0.25 m × 6개", right: "1.5 m" },
            { left: "아윤 솜 1.35 kg × 8개", right: "10.8 kg" }
          ]
        }
      },
      quizzes: [
        {
          question: "아윤은 구름 무대 소품 1개를 만드는 데 솜 1.35 kg을 씁니다. 같은 소품 8개를 만들려면 솜은 모두 몇 kg 필요할까요?",
          choices: ["1.08 kg", "10.8 kg", "10.4 kg", "108 kg"],
          answer: 1,
          explanation: "1.35 × 8 = 10.80이므로 끝자리 0을 생략해 10.8 kg입니다. 소수점 위치를 두 자리 왼쪽으로 옮겨야 해요!"
        },
        {
          question: "보라는 깃발 1개를 만드는 데 천 0.48 m를 씁니다. 깃발 12개를 만들 때 필요한 천의 길이는 모두 몇 m인가요?",
          choices: ["5.76 m", "57.6 m", "4.86 m", "6.24 m"],
          answer: 0,
          explanation: "0.48 × 12 = 5.76 m입니다. (0.48 × 10) + (0.48 × 2) = 4.8 + 0.96 = 5.76으로 나누어 구할 수도 있어요."
        }
      ],
      rewardCoins: 40,
      codexUnlock: {
        id: "codex_1",
        title: "소수 × 자연수 마스터",
        summary: "끝자리 0은 생략 가능하며, 분배(×10 + ×2)로도 쉽게 계산할 수 있습니다."
      }
    },
    {
      id: "st_2",
      npcPortrait: "images/npc_2.webp",
      sceneBg: "images/scene_2.webp",
      boardPin: { x: 18, y: 74 },
      order: 2,
      boardStep: 2,
      title: "2구역: 현수막 & 하트 소품실",
      npcName: "로제 & 라다",
      npcEmoji: "💖",
      dialogues: [
        "소품 크기를 늘리거나 줄여서 새로 만들어야 해!",
        "1보다 작은 소수를 곱할 때와 1보다 큰 소수를 곱할 때의 차이를 기억해 보자."
      ],
      conceptCard: {
        title: "곱하는 수의 크기에 따른 결과 비교",
        points: [
          "1보다 작은 소수(0.6, 0.35 등)를 곱하면 원래 수보다 작아져요.",
          "1보다 큰 소수(1.25 등)를 곱하면 원래 수보다 커져요."
        ]
      },
      minigame: {
        type: "classify",
        title: "원래 값보다 커질까? 작아질까?",
        instruction: "곱셈의 결과가 원래 수보다 작아지는지 커지는지 분류하세요.",
        payload: {
          buckets: ["원래 수보다 작아짐", "원래 수보다 커짐"],
          items: [
            { text: "8 × 0.6 (리사의 새 현수막)", bucket: 0 },
            { text: "20 × 1.25 (로제의 하트 소품)", bucket: 1 },
            { text: "40 × 0.35 (라다의 반짝이 가루)", bucket: 0 },
            { text: "12 × 1.08 (메르시의 새 무대)", bucket: 1 }
          ]
        }
      },
      quizzes: [
        {
          question: "리사는 길이 8 m 현수막의 0.6배 길이로 새 현수막을 만듭니다. 새 현수막의 길이와 짧아지는 이유로 알맞은 것은?",
          choices: [
            "4.8 m — 0.6은 1보다 작기 때문에 원래보다 짧아짐",
            "4.8 m — 0.6은 0보다 크기 때문에 원래보다 짧아짐",
            "13.3 m — 소수를 곱하면 항상 길어짐",
            "0.48 m — 8에서 소수점을 두 칸 옮김"
          ],
          answer: 0,
          explanation: "8 × 0.6 = 4.8 m입니다. 0보다 크고 1보다 작은 소수(0.6)를 곱하면 원래 길이(8 m)보다 짧아집니다."
        },
        {
          question: "로제는 높이 20 cm 하트 소품의 1.25배 높이로 새 소품을 만듭니다. 새 소품의 높이는 몇 cm인가요?",
          choices: ["2.5 cm", "22.5 cm", "25 cm", "250 cm"],
          answer: 2,
          explanation: "20 × 1.25 = 25 cm입니다. 1.25는 1보다 크므로 원래 높이 20 cm보다 높아집니다."
        },
        {
          question: "라다는 반짝이 가루 40 g 중 전체 양의 0.35배만큼을 별 소품에 쓰려고 합니다. 별 소품에 쓸 가루는 몇 g인가요?",
          choices: ["1.4 g", "14 g", "35 g", "140 g"],
          answer: 1,
          explanation: "40 × 0.35 = 14 g입니다. 40의 0.35배이므로 40보다 작은 14 g이 됩니다."
        }
      ],
      rewardCoins: 45,
      codexUnlock: {
        id: "codex_2",
        title: "배율과 크기 비교 마스터",
        summary: "1보다 작은 소수를 곱하면 작아지고, 1보다 큰 소수를 곱하면 커집니다."
      }
    },
    {
      id: "st_3",
      npcPortrait: "images/npc_3.webp",
      sceneBg: "images/scene_3.webp",
      boardPin: { x: 47, y: 71 },
      order: 3,
      boardStep: 3,
      title: "3구역: 무대 & 포토존 제작실",
      npcName: "제니 & 히메키",
      npcEmoji: "📸",
      dialogues: [
        "이제 포토존 천 넓이와 커튼 길이를 재볼 차례야.",
        "소수 × 소수는 두 수의 소수점 아래 자릿수를 모두 더해 찍는 거 알지?"
      ],
      conceptCard: {
        title: "소수 × 소수와 직사각형 넓이",
        points: [
          "소수 × 소수: 곱하는 두 수의 소수점 아래 자릿수를 합친 만큼 결과에 소수점을 찍어요.",
          "직사각형 넓이 = 가로 × 세로 (단위: m²)"
        ]
      },
      minigame: {
        type: "fill_blank",
        title: "무대 & 포토존 핵심 공식 채우기",
        instruction: "알맞은 숫자나 단어를 골라 빈칸을 완성하세요.",
        payload: {
          sentence: "가로 1.2 m, 세로 0.4 m인 포토존 넓이는 [___] m²이고, 12 × 1.08은 [___]입니다.",
          blanks: ["0.48", "12.96"],
          distractors: ["4.8", "1.296", "0.048"]
        }
      },
      quizzes: [
        {
          question: "제니가 가로 1.2 m, 세로 0.4 m인 직사각형 포토존 천을 준비했습니다. 천의 넓이는 몇 m²인가요?",
          choices: ["4.8 m²", "0.48 m²", "0.048 m²", "1.6 m²"],
          answer: 1,
          explanation: "직사각형 넓이는 가로 × 세로이므로 1.2 × 0.4 = 0.48 m²입니다. 소수 한 자리 × 소수 한 자리 = 소수 두 자리!"
        },
        {
          question: "로제는 점토 0.25 kg의 0.6배만큼을 로봇 소품에 썼습니다. 사용한 점토는 몇 kg인가요?",
          choices: ["1.5 kg", "0.15 kg", "0.015 kg", "0.31 kg"],
          answer: 1,
          explanation: "0.25 × 0.6 = 0.150이므로 0.15 kg입니다. (소수 두 자리 + 소수 한 자리 = 소수 세 자리)"
        },
        {
          question: "히메키의 원래 커튼 길이는 2.45 m이고, 새 커튼은 원래 길이의 1.6배입니다. 새 커튼은 몇 m인가요?",
          choices: ["3.92 m", "39.2 m", "0.392 m", "4.05 m"],
          answer: 0,
          explanation: "2.45 × 1.6 = 3.920이므로 3.92 m입니다. 1.6배이므로 원래보다 길어졌는지 꼭 확인하세요!"
        }
      ],
      rewardCoins: 45,
      codexUnlock: {
        id: "codex_3",
        title: "소수 × 소수 마스터",
        summary: "두 소수의 소수점 아래 자릿수를 합한 만큼 결과의 소수점 위치를 정합니다."
      }
    },
    {
      id: "st_4",
      npcPortrait: "images/npc_4.webp",
      sceneBg: "images/scene_4.webp",
      boardPin: { x: 52, y: 23 },
      order: 4,
      boardStep: 4,
      title: "4구역: 소수점 오류 점검실",
      npcName: "아이찡 & 시리",
      npcEmoji: "🔍",
      dialogues: [
        "큰일 났어! 스태프들이 계산한 값 중에 소수점이 잘못된 게 섞여 있대.",
        "우리가 직접 O/X로 잘못된 주장을 가려내자!"
      ],
      conceptCard: {
        title: "소수점 위치 & 10배·100배 자리값",
        points: [
          "0.08 × 0.7 = 0.056 (56의 1/1000). 원래 수 0.08보다 작아야 해요.",
          "10배 하면 각 숫자가 왼쪽으로 한 자리씩 이동해요. (0.36 × 10 = 3.6, × 10 = 36)",
          "가로와 세로를 모두 0.8배 하면 넓이는 0.8 × 0.8 = 0.64배가 돼요!"
        ]
      },
      minigame: {
        type: "ox_quiz",
        title: "스태프 계산 오류 O/X 판별전",
        instruction: "스태프의 주장이 맞으면 O, 틀리면 X를 누르세요.",
        payload: {
          questions: [
            { q: "0.08 × 0.7의 계산 결과는 0.56이다.", isO: false, exp: "0.056이 맞아요!" },
            { q: "0.36 g짜리 스티커 10장은 3.6 g, 100장은 36 g이다.", isO: true, exp: "10배마다 한 자리씩 왼쪽으로 이동해요." },
            { q: "3.6 × 0.4 = 14.4이다.", isO: false, exp: "0.4배 하면 3.6보다 작아져 1.44가 됩니다." },
            { q: "가로와 세로를 모두 0.8배 하면 넓이는 원래 넓이의 0.64배가 된다.", isO: true, exp: "0.8 × 0.8 = 0.64배입니다." }
          ]
        }
      },
      quizzes: [
        {
          question: "아이찡은 0.08 m 높이의 0.7배인 작은 별을 만듭니다. 올바른 높이와 그 이유는 무엇인가요?",
          choices: [
            "0.56 m — 8×7=56이므로 소수점 아래 두 자리",
            "0.056 m — 8의 1/100과 7의 1/10의 곱이므로 56의 1/1000",
            "0.056 m — 0.7이 1보다 크기 때문",
            "5.6 m — 소수점을 오른쪽으로 한 칸 이동"
          ],
          answer: 1,
          explanation: "0.08 × 0.7 = 0.056 m입니다. 0.56 m는 원래 높이 0.08 m보다 크므로 0.7배 결과로 맞을 수 없어요!"
        },
        {
          question: "스티커 1장의 무게가 0.36 g일 때, 10장이 든 봉투 1개와 10봉투(총 100장)의 스티커 무게는 각각 몇 g인가요?",
          choices: [
            "한 봉투 3.6 g, 전체 36 g",
            "한 봉투 0.036 g, 전체 3.6 g",
            "한 봉투 36 g, 전체 360 g",
            "한 봉투 3.6 g, 전체 360 g"
          ],
          answer: 0,
          explanation: "10배 할 때마다 자리값표에서 각 숫자가 왼쪽으로 한 자리씩 이동해 0.36 → 3.6 g → 36 g이 됩니다."
        },
        {
          question: "가로 3 m, 세로 2 m인 매트의 가로와 세로를 각각 0.8배로 줄이면 새 매트의 넓이는 몇 m²인가요?",
          choices: ["4.8 m²", "3.84 m²", "2.4 m²", "3.2 m²"],
          answer: 1,
          explanation: "새 가로는 3×0.8=2.4 m, 새 세로는 2×0.8=1.6 m이므로 넓이는 2.4 × 1.6 = 3.84 m²입니다. 원래 넓이(6 m²)의 0.8배(4.8 m²)와 달라요!"
        }
      ],
      rewardCoins: 50,
      codexUnlock: {
        id: "codex_4",
        title: "소수점 오류 탐정",
        summary: "결과가 원래 수보다 커야 할지 작아야 할지 어림하면 소수점 실수를 바로 찾을 수 있습니다."
      }
    },
    {
      id: "st_5",
      npcPortrait: "images/npc_5.webp",
      sceneBg: "images/scene_5.webp",
      boardPin: { x: 80, y: 25 },
      order: 5,
      boardStep: 5,
      title: "5구역: 백스테이지 도전 미션",
      npcName: "제니 & 리사",
      npcEmoji: "🔥",
      dialogues: [
        "이제부터는 도전 문항 구역이야! 준비된 음료와 리본이 충분한지 계산해 보자.",
        "두 곱을 더하거나 전체 길이와 비교하면 어렵지 않아!"
      ],
      conceptCard: {
        title: "도전! 필요한 총량과 최대 개수 구하기",
        points: [
          "필요한 총량 = (첫 번째 묶음의 곱) + (두 번째 묶음의 곱)",
          "최대 개수: 10 m 이하가 되는 경계(9개일 때와 10개일 때)를 직접 비교해요!"
        ]
      },
      minigame: {
        type: "balance",
        title: "10 m 리본으로 큰 깃발 몇 개까지?",
        instruction: "작은 깃발 6개(0.45×6 = 2.7 m)를 만든 뒤 남은 리본으로 큰 깃발(개당 0.75 m)을 최대 몇 개 만들 수 있을까요?",
        payload: {
          prompt: "전체 리본 10 m 이하가 되도록 큰 깃발 개수를 고르세요.",
          leftLabel: "2.7 m + 0.75 m × ( ? ) ≤ 10 m",
          options: [
            { label: "8개 (전체 8.7 m)", correct: false },
            { label: "최대 9개 (전체 9.45 m, 10개면 10.2 m로 초과)", correct: true },
            { label: "10개 (전체 10.2 m)", correct: false }
          ]
        }
      },
      quizzes: [
        {
          question: "제니가 음료 6.4 L를 준비했습니다. 작은 컵 24개에 0.18 L씩, 큰 컵 8개에 0.25 L씩 채우면 음료는 충분할까요?",
          choices: [
            "충분하고 0.08 L가 남는다.",
            "충분하고 0.8 L가 남는다.",
            "0.08 L가 부족하다.",
            "딱 맞아서 남는 것이 없다."
          ],
          answer: 0,
          explanation: "작은 컵: 0.18×24=4.32 L, 큰 컵: 0.25×8=2 L로 모두 6.32 L가 필요합니다. 6.4 − 6.32 = 0.08 L가 남으므로 충분해요!"
        },
        {
          question: "리사는 10 m 리본으로 0.45 m짜리 작은 깃발 6개를 만들고, 남은 리본으로 0.75 m짜리 큰 깃발을 만들려고 합니다. 큰 깃발은 최대 몇 개까지 만들 수 있나요?",
          choices: ["8개", "9개", "10개", "11개"],
          answer: 1,
          explanation: "작은 깃발에 2.7 m를 쓰고, 큰 깃발 9개면 2.7 + 0.75×9 = 9.45 m(가능), 10개면 10.2 m(초과)이므로 최대 9개입니다."
        }
      ],
      rewardCoins: 60,
      codexUnlock: {
        id: "codex_5",
        title: "도전! 경계 비교 전략",
        summary: "소수 나눗셈 없이도 곱셈으로 가능한 개수와 그다음 개수를 비교해 최댓값을 구할 수 있습니다."
      }
    },
    {
      id: "st_6",
      npcPortrait: "images/npc_6.webp",
      sceneBg: "images/scene_6.webp",
      boardPin: { x: 82, y: 72 },
      order: 6,
      boardStep: 6,
      title: "6구역: 파이널 앵콜 무대",
      npcName: "지수 & 전 멤버",
      npcEmoji: "🌟",
      dialogues: [
        "드디어 마지막 관문이야! 포스터와 그림 출력 설정만 확인하면 콘서트 시작!",
        "숫자 카드 2, 3, 6으로 만들 수 있는 가장 넓은 포스터를 찾아보자!"
      ],
      conceptCard: {
        title: "이어지는 배율과 최댓값 찾기",
        points: [
          "이어지는 배율: 0.5 × 2 = 1(원래 길이 복원), 0.8 × 1.2 = 0.96(원래보다 작아짐).",
          "가장 넓은 포스터: 세로가 같으면 가로가 긴 쪽만 비교해 최댓값을 찾아요!"
        ]
      },
      minigame: {
        type: "timeline",
        title: "포스터 넓이 작은 것부터 순서대로 정렬하기",
        instruction: "숫자 카드 2, 3, 6으로 만든 6가지 포스터 넓이를 작은 것부터 큰 순서로 정렬하세요.",
        payload: {
          items: [
            "3.6 m × 0.2 m = 0.72 m²",
            "2.6 m × 0.3 m = 0.78 m²",
            "6.3 m × 0.2 m = 1.26 m²",
            "2.3 m × 0.6 m = 1.38 m²",
            "6.2 m × 0.3 m = 1.86 m²",
            "3.2 m × 0.6 m = 1.92 m²"
          ]
        }
      },
      quizzes: [
        {
          question: "2.4 m 그림을 A방법(0.5배 후 2배)과 B방법(0.8배 후 1.2배)으로 출력했습니다. 원래 길이 2.4 m로 돌아오는 방법은?",
          choices: [
            "A방법(2.4 m)만 원래 길이로 돌아온다.",
            "B방법(2.304 m)만 원래 길이로 돌아온다.",
            "A, B방법 모두 2.4 m로 돌아온다.",
            "둘 다 원래 길이보다 짧아진다."
          ],
          answer: 0,
          explanation: "A는 2.4×0.5×2 = 2.4 m (배율 곱 0.5×2=1), B는 2.4×0.8×1.2 = 2.304 m (배율 곱 0.8×1.2=0.96)이므로 A만 복원됩니다."
        },
        {
          question: "숫자 카드 2, 3, 6을 한 번씩 사용해 가로 □.□ m, 세로 0.□ m인 포스터를 만들 때 가장 넓은 넓이는 몇 m²인가요?",
          choices: ["1.26 m²", "1.38 m²", "1.86 m²", "1.92 m²"],
          answer: 3,
          explanation: "세로별 최댓값 후보인 6.3×0.2=1.26, 6.2×0.3=1.86, 3.2×0.6=1.92를 비교하면 가로 3.2 m, 세로 0.6 m일 때 1.92 m²가 가장 넓습니다."
        }
      ],
      rewardCoins: 80,
      codexUnlock: {
        id: "codex_6",
        title: "콘서트 그랜드 마스터",
        summary: "소수의 곱셈 20문항의 모든 핵심 개념과 도전 전략을 완벽하게 정복했습니다!"
      }
    }
  ]
};
