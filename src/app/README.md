# src/app

Next.js App Router 기반의 페이지/레이아웃 구조를 정의하는 폴더입니다.

## 기본 구조

```markdown
src/
└── app/
├── layout.tsx # 전체 앱의 공통 레이아웃
├── page.tsx # 홈 페이지 (/)
├── schedule/ # 일정 기능 관련 페이지
│ ├── page.tsx # /schedule
│ └── [id]/page.tsx # /schedule/[id]
├── mypage/page.tsx # /mypage
└── group/page.tsx # /group
```

---

## 페이지 분기 전략

### `/` (홈)

- 로그인 여부에 따라 조건부 렌더링
  - 로그인 O -> `<Dashboard />`
  - 로그인 X -> `<Landing />`

### `/schedule`

- 주간 일정 리스트 및 드래그 기반 편집 화면 등

### `/schedule/[id]`

- 특정 일정의 상세 뷰 (혹은 일정 생성/수정 화면)

### `/group`

- 그룹 찾기, 초대, 가입 등

### `/mypage`

- 사용자 설정, 로그아웃, 테마 전환 등

---

## 라우팅 기준

- **동적 라우트**는 `[param]` 디렉토리로 구성해야 하며, `page.tsx`가 반드시 포함되어야 함
- **레이아웃**은 `layout.tsx`, **에러 처리**는 `error.tsx`, **로딩 스켈레톤**은 `loading.tsx`로 정의

---

## 🛠️ 개발 규칙

- 컴포넌트는 `components/`에서 관리하고, 이 폴더에는 오직 라우팅 파일만 존재해야 합니다.
- 필요 시 레이아웃을 중첩 구조로 정의할 수 있습니다.  
  예: `app/(auth)/login/page.tsx`, `app/(main)/dashboard/page.tsx`
