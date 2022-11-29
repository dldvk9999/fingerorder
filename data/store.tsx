const store = [
    {
        id: 1,
        name: "진짜 맛있는 집",
        table: 19,
        date: "2022.10.25",
        locate: "서울시 어쩌구 저쩌구",
        category: ["FRIED", "SNACK", "RICE", "BEVERAGE", "DRINK"],
        menu: {
            FRIED: [
                {
                    name: "새우 튀김",
                    price: 15000,
                    desc: "독도 새우로 만든 새우 튀김! 값만큼 맛도 만점!",
                    image: "새우튀김.jpg",
                    soldout: false,
                },
                {
                    name: "오징어 튀김",
                    price: 10000,
                    desc: "엄청난 양으로 4명이서 먹어도 충분한 튀김!",
                    image: "오징어튀김.jpg",
                    soldout: false,
                },
            ],
            SNACK: [
                {
                    name: "오레오",
                    price: 2000,
                    desc: "다른데가 너무 비싸 제가 직접 싸게 만들었습니다.",
                    image: "오레오.png",
                    soldout: true,
                },
            ],
            RICE: [
                {
                    name: "공기밥",
                    price: 1000,
                    desc: "일반 공기밥",
                    image: "공기밥.jpg",
                    soldout: false,
                },
            ],
            BEVERAGE: [
                {
                    name: "하리보",
                    price: 2000,
                    desc: "이것도 다른데가 너무 비싸 제가 직접 싸게 만들었습니다.",
                    image: "하리보.jpg",
                    soldout: false,
                },
                {
                    name: "하리보2",
                    price: 2000,
                    desc: "하리보 버전 2 입니다. 가격은 똑같습니다.",
                    image: "하리보2.jpg",
                    soldout: true,
                },
            ],
            DRINK: [
                {
                    name: "물",
                    price: 0,
                    desc: "물은 무료이지만 셀프입니다.",
                    image: "물.jpg",
                    soldout: false,
                },
            ],
        },
    },
    {
        id: 2,
        name: "진짜 맛있는 집",
        table: 11,
        date: "2022.10.26",
        locate: "경기도 어쩌구 저쩌구",
        category: ["치킨", "피자"],
        menu: {
            치킨: [
                {
                    name: "황금 올리브 치킨",
                    price: 20000,
                    desc: "겉은 바삭 육즙 가득한 부드러운 속살이 환상적인 건강한 치킨, 비비큐의 시그니처 메뉴 후라이드의 대명사 황금올리브치킨",
                    image: "황금_올리브_치킨.png",
                    soldout: false,
                },
                {
                    name: "자메이카 소떡만나치킨",
                    price: 24000,
                    desc: "BBQ 자메이카 저크소스와 신선육, 소떡소떡을 조합하여 풍미를 올린 전국민이 최애하는 바베큐치킨",
                    image: "자메이카_소떡만나치킨.png",
                    soldout: true,
                },
            ],
            피자: [
                {
                    name: "돈마호크",
                    price: 35900,
                    desc: "돈마호크 180g과 리코타 치즈의 환상 케미",
                    image: "돈마호크.png",
                    soldout: false,
                },
                {
                    name: "케이준 더블쉬림프",
                    price: 35900,
                    desc: "통새우 30마리를 가득 채운 리얼 프리미엄!",
                    image: "케이준_더블쉬림프.png",
                    soldout: false,
                },
                {
                    name: "립스테이크",
                    price: 35900,
                    desc: "180g 갈비맛 스테이크가 통째로!",
                    image: "립스테이크.png",
                    soldout: false,
                },
            ],
        },
    },
    {
        id: 3,
        name: "진짜 맛있는 집",
        table: 35,
        date: "2022.11.1",
        locate: "인천시 어쩌구 저쩌구",
        category: ["탕류", "찌개류", "전골류", "공기밥", "음료"],
        menu: {
            탕류: [
                {
                    name: "꽃게탕",
                    price: 20000,
                    desc: "백종원 꽃게탕",
                    image: "꽃게탕.jpg",
                    soldout: false,
                },
                {
                    name: "매운탕",
                    price: 10000,
                    desc: "우럭, 광어 머리가 들어간 얼큰한 매운탕!",
                    image: "매운탕.jpg",
                    soldout: false,
                },
            ],
            찌개류: [
                {
                    name: "부대찌개",
                    price: 12000,
                    desc: "백종원 부대찌개",
                    image: "부대찌개.jpg",
                    soldout: true,
                },
            ],
            전골류: [
                {
                    name: "곱창전골",
                    price: 15000,
                    desc: "백종원 곱창전골",
                    image: "곱창전골.jpg",
                    soldout: false,
                },
            ],
            공기밥: [
                {
                    name: "공기밥",
                    price: 1000,
                    desc: "일반 공기밥",
                    image: "공기밥.jpg",
                    soldout: false,
                },
            ],
            음료: [
                {
                    name: "물",
                    price: 0,
                    desc: "물은 무료이지만 셀프입니다.",
                    image: "물.jpg",
                    soldout: true,
                },
            ],
        },
    },
    {
        id: 4,
        name: "진짜 맛있는 집",
        table: 22,
        date: "2022.11.3",
        locate: "제주도 공항 근처",
        category: ["메인요리", "서브요리", "음료"],
        menu: {
            메인요리: [],
            서브요리: [],
            음료: [],
        },
    },
    {
        id: 5,
        name: "진짜 맛있는 집",
        table: 14,
        date: "2022.11.11",
        locate: "독도",
        category: ["CHICKEN", "PIZZA"],
        menu: {
            CHICKEN: [],
            PIZZA: [],
        },
    },
    {
        id: 6,
        name: "진짜 맛있는 집",
        table: 55,
        date: "2022.11.19",
        locate: "연평도 가운데",
        category: ["FISH", "PASTA", "RICE"],
        menu: {
            FISH: [],
            PASTA: [],
            RICE: [],
        },
    },
    {
        id: 7,
        name: "진짜 맛있는 집",
        table: 30,
        date: "2022.11.22",
        locate: "여긴 어디로 할까",
        category: ["what", "to", "sell"],
        menu: {
            what: [],
            to: [],
            sell: [],
        },
    },
];

export default store;
