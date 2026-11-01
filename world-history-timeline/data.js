/* 2022 개정 교육과정 중학교 역사①(세계사) 기준 시간순 사건 */
window.WORLD_HISTORY = {
  units: [
    {
      id: 1,
      title: "역사 학습의 기초",
      range: "도입",
      color: "#6B7C6E",
      summary: "역사가 무엇인지, 왜 배우는지, 어떻게 탐구하는지부터 시작합니다."
    },
    {
      id: 2,
      title: "문명의 발생과 고대 세계의 형성",
      range: "선사 ~ 고대",
      color: "#C27A3A",
      summary: "강 유역에서 문명이 싹트고, 그리스·로마·중국·인도의 고대 세계가 형성됩니다."
    },
    {
      id: 3,
      title: "세계 종교의 확산과 지역 문화의 발전",
      range: "고대 후기 ~ 중세",
      color: "#2F6B5A",
      summary: "불교·크리스트교·이슬람이 퍼지고, 동아시아·유럽·서아시아 지역 문화가 자라납니다."
    },
    {
      id: 4,
      title: "지역 세계의 교류와 변화",
      range: "중세 후기 ~ 근세",
      color: "#3D6E8C",
      summary: "실크로드와 인도양 교역, 몽골 제국, 신항로 개척으로 세계가 더 가깝게 이어집니다."
    },
    {
      id: 5,
      title: "제국주의와 국민 국가 건설 운동",
      range: "근대",
      color: "#8B4A4A",
      summary: "시민 혁명과 산업화로 국민 국가가 생기고, 제국주의에 맞선 아시아의 대응이 이어집니다."
    },
    {
      id: 6,
      title: "세계 대전과 사회 변동",
      range: "20세기 전반",
      color: "#5A4A6E",
      summary: "두 차례 세계 대전, 대공황, 전체주의, 그리고 인권과 평화를 되찾으려는 노력이 전개됩니다."
    },
    {
      id: 7,
      title: "현대 세계의 전개와 변화",
      range: "1945 ~ 오늘",
      color: "#1F5C6B",
      summary: "냉전 이후의 질서, 민주화와 인권, 세계화의 성과와 과제를 살펴봅니다."
    }
  ],

  /* year: 음수는 기원전. endYear가 있으면 기간 막대 */
  events: [
    {
      id: "prehistory",
      unit: 2,
      year: -100000,
      endYear: -3500,
      title: "선사 문화",
      label: "선사",
      summary: "구석기·신석기 시대. 사람들은 도구를 만들고 정착 생활을 시작했어요.",
      keywords: ["구석기", "신석기", "농경과 목축"]
    },
    {
      id: "civilizations",
      unit: 2,
      year: -3500,
      endYear: -500,
      title: "4대 문명 발생",
      label: "문명",
      summary: "메소포타미아, 이집트, 인더스, 황하 유역에서 도시와 문자가 나타났습니다.",
      keywords: ["메소포타미아", "이집트", "인더스", "황하"]
    },
    {
      id: "greece-persia",
      unit: 2,
      year: -500,
      endYear: -323,
      title: "그리스와 페르시아",
      label: "그리스",
      summary: "폴리스와 민주주의의 실험, 페르시아 제국, 알렉산드로스와 헬레니즘 문화.",
      keywords: ["폴리스", "페르시아", "헬레니즘"]
    },
    {
      id: "rome",
      unit: 2,
      year: -509,
      endYear: 476,
      title: "로마의 성장과 변화",
      label: "로마",
      summary: "공화정에서 제정으로. 지중해를 아우른 로마와 크리스트교의 확산.",
      keywords: ["공화정", "제정", "크리스트교"]
    },
    {
      id: "china-india-ancient",
      unit: 2,
      year: -770,
      endYear: 220,
      title: "중국·인도의 고대 세계",
      label: "진·한",
      summary: "춘추·전국과 제자백가, 진·한의 통일, 마우리아·쿠샨과 불교의 성립·전파.",
      keywords: ["제자백가", "진·한", "불교", "실크로드"]
    },
    {
      id: "sui-tang",
      unit: 3,
      year: 581,
      endYear: 907,
      title: "수·당과 동아시아 문화",
      label: "수·당",
      summary: "위진 남북조를 거쳐 수·당이 동아시아 국제 질서의 중심이 되었습니다.",
      keywords: ["위진 남북조", "수·당", "동아시아 문화"]
    },
    {
      id: "gupta-sasan-islam",
      unit: 3,
      year: 320,
      endYear: 750,
      title: "굽타·사산·이슬람 세계",
      label: "이슬람",
      summary: "인도 굽타 왕조, 사산 왕조 페르시아, 그리고 이슬람의 등장과 확산.",
      keywords: ["굽타", "사산 페르시아", "이슬람"]
    },
    {
      id: "medieval-europe",
      unit: 3,
      year: 800,
      endYear: 1300,
      title: "유럽 중세와 십자군",
      label: "중세",
      summary: "봉건 질서, 교황권, 도시의 성장. 십자군 전쟁과 지중해 무역권의 변화.",
      keywords: ["봉건제", "교황권", "십자군", "중세 도시"]
    },
    {
      id: "song-mongol",
      unit: 4,
      year: 960,
      endYear: 1368,
      title: "송과 몽골 제국",
      label: "몽골",
      summary: "송의 경제·문화 발달과 몽골 제국이 이끈 유라시아·인도양 교역의 확대.",
      keywords: ["송", "몽골 제국", "유라시아 교역"]
    },
    {
      id: "ming-qing-edo-mughal",
      unit: 4,
      year: 1368,
      endYear: 1800,
      title: "명·청, 에도, 무굴",
      label: "명·청",
      summary: "동아시아와 인도의 정치·사회 변화. 명·청, 에도 막부, 무굴 제국을 비교해 봅니다.",
      keywords: ["명·청", "에도 막부", "무굴 제국"]
    },
    {
      id: "ottoman-age-of-exploration",
      unit: 4,
      year: 1453,
      endYear: 1648,
      title: "오스만과 유럽의 변화",
      label: "신항로",
      summary: "오스만 제국의 성장, 신항로 개척, 교역 확대, 종교 개혁으로 유럽 사회가 바뀝니다.",
      keywords: ["오스만", "신항로 개척", "종교 개혁"]
    },
    {
      id: "revolutions",
      unit: 5,
      year: 1776,
      endYear: 1825,
      title: "시민 혁명과 국민 국가",
      label: "혁명",
      summary: "미국 혁명, 프랑스 혁명, 라틴 아메리카 독립. 국민 국가의 형성과 그 한계.",
      keywords: ["미국 혁명", "프랑스 혁명", "국민 국가"]
    },
    {
      id: "industrial-imperialism",
      unit: 5,
      year: 1760,
      endYear: 1914,
      title: "산업화와 제국주의",
      label: "제국주의",
      summary: "산업 혁명으로 생산력이 커지고, 열강의 제국주의가 세계와 생태환경에 큰 영향을 줍니다.",
      keywords: ["산업 혁명", "제국주의", "식민지"]
    },
    {
      id: "asia-nation",
      unit: 5,
      year: 1850,
      endYear: 1920,
      title: "아시아의 국민 국가 건설",
      label: "아시아",
      summary: "제국주의에 맞선 아시아의 반제국주의·국민 국가 건설 운동과 그 성과·한계.",
      keywords: ["반제국주의", "국민 국가 건설"]
    },
    {
      id: "ww1",
      unit: 6,
      year: 1914,
      endYear: 1918,
      title: "제1차 세계 대전",
      label: "1차 대전",
      summary: "전 세계가 휘말린 총력전. 전후 질서가 크게 흔들립니다.",
      keywords: ["총력전", "베르사유 체제"]
    },
    {
      id: "interwar",
      unit: 6,
      year: 1917,
      endYear: 1939,
      title: "혁명·대공황·전체주의",
      label: "대공황",
      summary: "러시아 혁명, 대공황, 파시즘·나치즘 등 전체주의의 대두.",
      keywords: ["러시아 혁명", "대공황", "전체주의"]
    },
    {
      id: "ww2",
      unit: 6,
      year: 1939,
      endYear: 1945,
      title: "제2차 세계 대전",
      label: "2차 대전",
      summary: "세계적 전쟁과 함께 홀로코스트, 난징 대학살, 일본군 '위안부' 등 전쟁 범죄가 일어납니다.",
      keywords: ["홀로코스트", "난징 대학살", "국제기구"]
    },
    {
      id: "national-movements",
      unit: 6,
      year: 1919,
      endYear: 1960,
      title: "아시아·아프리카 민족 운동",
      label: "민족 운동",
      summary: "식민 지배에 맞선 아시아·아프리카 민족 운동과 독립의 물결.",
      keywords: ["민족 운동", "탈식민"]
    },
    {
      id: "cold-war",
      unit: 7,
      year: 1945,
      endYear: 1991,
      title: "냉전과 제3 세계",
      label: "냉전",
      summary: "미국·소련 중심의 냉전, 제3 세계의 등장, 사회주의 진영 붕괴와 유럽 연합.",
      keywords: ["냉전", "제3 세계", "유럽 연합"]
    },
    {
      id: "rights",
      unit: 7,
      year: 1960,
      endYear: 2000,
      title: "민주화와 인권의 신장",
      label: "인권",
      summary: "민권 운동, 여성 운동, 노동자 권리, 평화와 환경 보호를 위한 노력.",
      keywords: ["민권", "여성 운동", "환경"]
    },
    {
      id: "globalization",
      unit: 7,
      year: 1990,
      endYear: 2026,
      title: "세계화의 시대",
      label: "세계화",
      summary: "교류가 더 빨라진 오늘날. 세계화의 성과와 함께 해결할 과제도 남아 있습니다.",
      keywords: ["세계화", "상호 의존", "과제"]
    }
  ]
};
