# SoulBuddy - Frontend

> 당신만의 AI 소울메이트, SoulBuddy 프론트엔드 저장소입니다.

## 📌 Convention

### 1. Commit Convention

- `타입 : 작업 내용` 형태로 작성
  - `feat :` 새로운 기능 추가(ex : `feat : kakao 로그인 연동`)
  - `fix :` 버그 수정 (ex : `fix : 스와이프 애니메이션 끊김 현상 해결`)
  - `refactor :` 코드 리팩토링 (기능 변경 없음)
  - `chore :` 패키지 매니저 설정, 빌드 업무 등

### 2. Branch Naming

- `타입 / 이슈번호 - 작업요약` 형태로 작성
  - ex : `feat/#12-swipe-card`, `fix/#45-login-error`

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: [Pretendard](https://github.com/orioncactus/pretendard)

## 🚀 Getting Started

프로젝트를 로컬 환경에서 실행하는 방법입니다.

### Prerequisites

- Node.js (v18.17 이상 권장)
- npm, yarn, pnpm 또는 bun

## 📁 Folder Structure - FSD 아키텍처

```text
my-next-app/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # 최상위 레이아웃
│   ├── page.tsx          # 메인 페이지
│   └── globals.css       # 전역 스타일 및 Tailwind 설정
├── pages/                # 페이지 컴포넌트
├── widgets/              # 위젯 컴포넌트
├── shared/           # 재사용 가능한 UI 컴포넌트
├── public/               # 이미지, 아이콘 등 정적 에셋
├── features/             # 기능별 코드
└── entities/             # 엔티티 컴포넌트
```

## 📜 Scripts

- `dev`: 개발용 로컬 서버 실행 (`next dev`)
- `build`: 프로덕션 배포용 빌드 생성 (`next build`)
- `start`: 프로덕션 빌드 서버 실행 (`next start`)
- `lint`: ESLint 규칙 점검 (`next lint`)
