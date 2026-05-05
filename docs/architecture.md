# Soul-Buddy-FE 폴더 구조 분석 (거시 → 미시)

> Feature-Sliced Design (FSD) 기반 Next.js 16 App Router 프로젝트.
> 의존성 방향: `app` → `views` → `widgets` → `features` → `entities` → `shared`
> (위쪽 레이어만 아래쪽을 import. 같은 레이어끼리 cross-import 금지.)

---

## 0. 거시 구조 (루트)

```
Soul-Buddy-FE/
├─ app/         Next.js App Router 진입점 (라우팅·레이아웃·전역 스타일)
├─ views/       페이지 단위 컴포넌트 (Next.js 'pages'와 충돌 회피용 명칭)
├─ widgets/     여러 features/entities를 합성한 큰 UI 블록
├─ features/    사용자 액션 단위 (폼·버튼·상호작용)
├─ entities/    도메인 모델 + 모델 전용 UI
├─ shared/      어디서든 쓰는 primitive UI·유틸·설정
├─ auth.ts      NextAuth v5 핸들러 re-export
├─ proxy.ts     라우트 가드 (Next.js 16: 옛 middleware.ts)
├─ next.config.ts
└─ package.json
```

**왜 이런 구조인가**
- FSD 5계층은 의존성 흐름을 단방향으로 강제해, 한 레이어 변경이 다른 레이어로 새지 않게 한다.
- `views/` 명칭은 Next.js Pages Router의 `pages/`와 충돌을 피하기 위함.
- `widgets/` 추가로 "한 화면에 여러 위젯 합성" 패턴(메인·채팅·센터)을 자연스럽게 표현.

---

## 1. `app/` — Next.js App Router

**역할**: URL ↔ 화면 매핑, 전역 레이아웃·스타일·SessionProvider, NextAuth API 라우트.

```
app/
├─ layout.tsx              루트 레이아웃 (mobile container max-w-[430px], Pretendard 폰트)
├─ providers.tsx           SessionProvider (NextAuth 클라이언트 컨텍스트)
├─ page.tsx                "/" → <MainView />
├─ globals.css             Tailwind v4 @theme 토큰 (색·라운드·그림자) + 기본 reset
├─ (auth)/
│  └─ login/page.tsx       "/login" → <LoginPage />  (괄호 = 라우트 그룹, URL 영향 X)
├─ onboarding/
│  ├─ terms/page.tsx       "/onboarding/terms" → <TermsView />
│  └─ profile/page.tsx     "/onboarding/profile" → <ProfileView />
├─ chat/
│  ├─ new/buddy/page.tsx   "/chat/new/buddy" → <BuddyView />
│  ├─ new/emotion/page.tsx "/chat/new/emotion" → <EmotionView />
│  └─ [id]/page.tsx        "/chat/:id" → <ChatView conversationId={id} />
├─ history/page.tsx        "/history" → <HistoryView />
├─ centers/page.tsx        "/centers" → <CentersView />
└─ api/auth/[...nextauth]/route.ts   NextAuth API 핸들러 (handlers.GET / handlers.POST)
```

**원칙**
- 페이지 컴포넌트는 단순 위임만 한다 (`<XView />` 한 줄). 비즈니스 로직 X.
- 라우트 그룹(`(auth)`)은 URL에 포함되지 않으므로 `/login`은 `/login`으로 그대로.
- 동적 라우트(`[id]`)의 `params`는 Next.js 16 기준 `Promise<{ id }>` — 반드시 `await`.

---

## 2. `proxy.ts` — 라우트 가드

Next.js 16에서 `middleware.ts` → `proxy.ts`로 파일 컨벤션 변경.

**원래 로직** (현재는 OAuth `redirect_uri` 정리 전까지 임시 비활성):
1. 미인증 사용자 → `/login`으로 리다이렉트
2. 인증됐지만 프로필 미완료 (cookie `profileCompleted ≠ "true"`) → `/onboarding/terms`
3. 인증·프로필 완료된 사용자가 `/login` 진입 시 → `/`로 돌려보냄
4. `matcher`로 `api`, `_next`, 정적 파일은 제외

**현재 상태**: `NextResponse.next()`만 반환. 모든 경로 자유 접근.

---

## 3. `views/` — 페이지 단위 컴포넌트

**역할**: 한 라우트 = 한 View. widgets/features/shared를 합성해 "화면"을 완성.

```
views/
├─ login/ui/LoginPage.tsx         로그인 (ZEROONE 헤드라인 + Google 버튼)
├─ onboarding/
│  ├─ terms/ui/TermsView.tsx      약관 동의 (3개 카드 + 체크박스)
│  └─ profile/ui/ProfileView.tsx  이름·나이·성별·사용 목적
├─ main/ui/MainView.tsx           홈 (인사·최근·바로가기·새 대화 CTA)
├─ chat-setup/
│  ├─ buddy/ui/BuddyView.tsx      버디 선택 (다크 테마)
│  └─ emotion/ui/EmotionView.tsx  감정 선택
├─ chat/ui/ChatView.tsx           채팅 (헤더·메시지·입력)
├─ history/ui/HistoryView.tsx     기록보기 (감정 변화 표시)
└─ centers/ui/CentersView.tsx     상담 센터 (긴급 + 근처)
```

각 View 폴더는 `index.ts`로 `{ XView }`만 re-export.

**View가 직접 하는 일**
- `Screen` 래퍼로 헤더·푸터·스크롤 영역 잡기
- Zustand store 구독 (`useChatSetupStore` 등)
- `useRouter()`로 다음 단계 이동
- mock fixture import해서 widgets에 props로 내려줌

---

## 4. `widgets/` — 합성 UI 블록

**역할**: 여러 features/entities를 묶어 "한 섹션"을 만든다. View보다 작고 entity보다 크다.

```
widgets/
├─ main-greeting/             아바타 + 인사 + 프로필 아이콘
├─ recent-conversations/      "최근 이야기" + ConversationCard 리스트
├─ main-shortcuts/            대화 기록·상담 센터 2x1 그리드
├─ new-chat-cta/              다크 카드 + "새 대화 열기" 버튼
├─ buddy-picker/              포코·루미 카드 + 설명 박스
├─ emotion-grid/              3x3 EmotionCell 그리드
├─ chat-window/
│  ├─ ChatHeader.tsx          ← + 아바타 + 이름 + 끝내기
│  ├─ MessageThread.tsx       MessageBubble 스택 + 자동 스크롤
│  └─ Composer.tsx            입력 + 전송 버튼
├─ history-list/              detailed variant ConversationCard 리스트
├─ emergency-bar/             빨간 카드 + 109/1388/1577
└─ center-list/               CenterCard 리스트
```

**위젯의 책임 경계**
- 자기 섹션의 레이아웃·반응형은 위젯이 책임
- 데이터는 props로만 받는다 (View가 fixture에서 꺼내 내려줌)
- 라우팅은 `useRouter()`로 직접 호출 가능 (예: `RecentConversationsSection`이 카드 클릭 시 `/chat/:id`로 이동)

---

## 5. `features/` — 사용자 액션 단위

**역할**: "이 버튼을 누르면 무슨 일이 일어나는가" 단위. 자체 store + UI를 가진다.

```
features/
├─ auth/
│  └─ google-login/
│     └─ ui/GoogleLoginButton.tsx     signIn("google") 호출 + 로딩
├─ onboarding/
│  ├─ agree-terms/
│  │  ├─ model/items.ts               TERMS_ITEMS (3개 카드 데이터)
│  │  ├─ model/store.ts               useTermsStore (isAgreed)
│  │  └─ ui/{TermsCard, AgreeCheckbox, ConfirmButton}.tsx
│  └─ profile-form/
│     ├─ model/store.ts               useProfileFormStore (이름·나이·성별·목적 + persist)
│     └─ ui/{GenderToggle, UsagePurposeList}.tsx
├─ chat/
│  ├─ select-buddy/
│  │  └─ model/store.ts               useChatSetupStore (buddyId·emotionId persist)
│  └─ send-message/
│     ├─ lib/mockBuddyReply.ts        700ms 후 랜덤 응답
│     └─ model/store.ts               useChatSessionStore (messages·send·clear)
└─ center/
   ├─ emergency-call/
   │  └─ ui/EmergencyCallButton.tsx   <a href="tel:..." pill 버튼
   └─ find-nearby/
      └─ lib/sortByDistance.ts        거리 오름차순 정렬
```

**features의 슬라이스 내부 구조**
- `model/`: store, 데이터 정의, 비즈니스 규칙
- `ui/`: store에 묶인 표현 컴포넌트
- `lib/`: 순수 함수 (mock reply, 정렬 등)
- `index.ts`: 외부에 노출할 것만 re-export

**왜 `select-emotion` 폴더가 따로 없나**
- 버디 선택과 감정 선택은 동일한 `useChatSetupStore`(buddyId + emotionId)를 공유.
- 별도 store/feature로 쪼개면 두 화면 간 상태 공유 코드가 늘어 오히려 복잡. 단일 setup store가 합리적.

---

## 6. `entities/` — 도메인 모델

**역할**: "이 앱에서 다루는 것들"의 타입·데이터·기본 UI.
features끼리 공유 가능하도록 가장 안정적인 계층에 둔다.

```
entities/
├─ user/
│  ├─ model/types.ts        Gender, UsagePurpose, UserProfile, UserProfileDraft
│  └─ model/data.ts         USAGE_PURPOSE_OPTIONS (4개)
├─ buddy/
│  ├─ model/types.ts        BuddyId('poco'|'lumi'), BuddyType, Buddy
│  ├─ model/data.ts         BUDDIES (포코·루미 두 명) + findBuddy()
│  └─ ui/BuddyCard.tsx      light/dark tone, selected 상태
├─ emotion/
│  ├─ model/types.ts        EmotionId (9개), Emotion
│  ├─ model/data.ts         EMOTIONS + findEmotion()
│  └─ ui/EmotionCell.tsx    정사각 셀 + selected 시 체크 오버레이
├─ conversation/
│  ├─ model/types.ts        Conversation (title, dateLabel, dotColor, emotionFrom/To)
│  └─ ui/ConversationCard.tsx   compact / detailed 두 variant
├─ message/
│  ├─ model/types.ts        Message (role: 'buddy'|'user', text, createdAt)
│  └─ ui/MessageBubble.tsx  좌측(아바타+베이지) / 우측(코랄)
├─ center/
│  ├─ model/types.ts        CounselCenter, EmergencyHotline
│  └─ ui/CenterCard.tsx     핀 + 이름·주소·태그·시간 + 전화 버튼
└─ session/
   ├─ model/types.ts        세션 관련 타입 (NextAuth session 보강)
   └─ index.ts
```

**원칙**
- entities끼리는 import 금지 (Conversation이 BuddyId를 type-only로 참조하는 정도는 OK)
- entity UI는 "표현" 위주 — 라우팅·전역 상태 호출 X. props만 받아 그린다.
- mock 데이터(`BUDDIES`, `EMOTIONS`)도 entity에 둔다 (도메인 정의의 일부)

---

## 7. `shared/` — 어디서든 쓰는 것

**역할**: 다른 레이어를 절대 import하지 않는 가장 안정적인 베이스.

```
shared/
├─ config/
│  └─ auth.ts                NextAuth 설정 (providers·callbacks·pages)
├─ ui/                        디자인 시스템 primitive 10종
│  ├─ Button/Button.tsx       variants: primary/secondary/dark/ghost/danger
│  ├─ IconButton/             plain/primary/surface/danger/dark
│  ├─ TextField/              label + 우측 카운터 (n / max)
│  ├─ Card/                   surface(default/muted/primary/danger/dark) + padding
│  ├─ Checkbox/               코랄 채움 + Check 아이콘
│  ├─ Tag/                    neutral/primary/muted/dark
│  ├─ Avatar/                 sm/md/lg/xl 원형 + bg
│  ├─ BackButton/             ChevronLeft + history.back / fallbackHref
│  ├─ AppHeader/              9:41 status bar mock + leading/trailing slot
│  └─ Screen/                 화면 래퍼 (header/footer/tone/padding)
├─ lib/
│  ├─ cn.ts                   clsx + tailwind-merge → cn()
│  └─ store/createStore.ts    zustand persist 래퍼
├─ assets/
│  ├─ helloIcon.png           포코/루미 placeholder (TODO: 디자이너 일러스트 교체)
│  └─ icon/                   PWA 아이콘
└─ api/
   └─ mock/
      ├─ fixtures.ts           모든 mock 데이터 (사용자·대화·센터·메시지)
      └─ profileStorage.ts     localStorage + profileCompleted 쿠키 세팅
```

**원칙**
- `shared/`는 어떤 다른 레이어도 import 금지 (역방향 의존 차단)
- UI 컴포넌트는 모두 토큰 기반 (`var(--color-primary)` 등). 하드코딩 색상 X
- Mock storage는 `entities/*/api`로 옮기지 않고 `shared/api/mock/`에 둠 — 백엔드 붙으면 한 곳만 바꿔 끼우면 됨

---

## 8. 레이어별 의존성 한 눈에

```
app/
 └─ views/
     ├─ widgets/
     │   ├─ entities/   ◄─┐
     │   └─ features/ ────┘ (features도 entities 사용 가능)
     │       └─ entities/
     └─ features/  (View가 features를 직접 쓸 수도 있음)
         └─ entities/

모든 레이어 → shared/  (공통 베이스)
```

**금지**
- `entities/buddy` ↔ `entities/emotion` 같은 entity 간 import
- `features/onboarding/*` ↔ `features/chat/*` 같은 feature 간 cross-import (필요하면 entity로 추출)
- `shared/` ↔ 다른 레이어 (역방향)

---

## 9. 데이터 흐름 예시: "새 대화 시작"

```
1. /chat/new/buddy 진입
   app/chat/new/buddy/page.tsx
     → views/chat-setup/buddy/BuddyView
         → useChatSetupStore (features/chat/select-buddy)
         → widgets/buddy-picker/BuddyPicker
             → entities/buddy/BuddyCard (BUDDIES 데이터)

2. 버디 선택 후 다음 → /chat/new/emotion
     → views/chat-setup/emotion/EmotionView
         → useChatSetupStore (같은 store에서 emotionId 추가)
         → widgets/emotion-grid/EmotionGrid
             → entities/emotion/EmotionCell (EMOTIONS 데이터)

3. 채팅 시작 → /chat/chat-{timestamp}
     → views/chat/ChatView
         → useChatSetupStore.buddyId → findBuddy() → buddy 객체
         → useChatSessionStore (features/chat/send-message)
         → widgets/chat-window/{ChatHeader, MessageThread, Composer}
             → entities/message/MessageBubble
```

각 단계에서 **한 방향**으로만 의존이 흐른다.

---

## 10. 주요 mock 데이터 위치

| 종류 | 파일 | 용도 |
|------|------|------|
| 사용자 이름 | `shared/api/mock/fixtures.ts` `MOCK_USER_NAME` | 메인 인사 |
| 긴급 번호 | 같은 파일 `EMERGENCY_HOTLINES` | 109/1388/1577 |
| 최근 대화 | `MOCK_RECENT_CONVERSATIONS` | 메인 화면 (2건) |
| 기록 대화 | `MOCK_HISTORY_CONVERSATIONS` | /history (4건) |
| 상담 센터 | `MOCK_CENTERS` | /centers (3건) |
| 채팅 메시지 | `MOCK_DEMO_MESSAGES` | /chat/conv-* 직접 진입 시 시드 |
| 버디 응답 | `MOCK_BUDDY_REPLIES` | 700ms 후 랜덤 응답 (4종) |
| 버디 정의 | `entities/buddy/model/data.ts` `BUDDIES` | 포코·루미 |
| 감정 정의 | `entities/emotion/model/data.ts` `EMOTIONS` | 9개 |
| 사용 목적 | `entities/user/model/data.ts` `USAGE_PURPOSE_OPTIONS` | 온보딩 4개 |

백엔드 연동 시 swap 지점:
1. `shared/api/mock/fixtures.ts` → 실제 fetch
2. `shared/api/mock/profileStorage.ts` → 서버 상태 + JWT callback
3. `proxy.ts` 인증 가드 복원

---

## 11. 한눈 요약

| 레이어 | 한 마디로 | 변경 빈도 |
|-------|---------|----------|
| `app/` | URL ↔ View 매핑 | 라우트 추가 시 |
| `views/` | 한 화면 = 한 컴포넌트 | 화면 디자인 변경 시 |
| `widgets/` | 한 화면을 구성하는 큰 블록 | 섹션 재구성 시 |
| `features/` | 한 사용자 액션 + 상태 | 기능 추가/수정 시 |
| `entities/` | 도메인 모델 정의 | 매우 드물게 |
| `shared/` | 디자인 토큰·primitive | 매우 드물게 |
