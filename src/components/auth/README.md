# components/auth

사용자의 로그인/인증과 관련된 UI 컴포넌트를 정의하는 폴더입니다.

## 현재 포함된 컴포넌트

- `Login.tsx`: OAuth2 기반 로그인 화면을 구성하는 컴포넌트

## 향후 추가될 수 있는 컴포넌트 예시

- `OAuthButton.tsx`: 카카오/구글 등 외부 인증 버튼 UI
- `AuthError.tsx`: 인증 실패 시 메시지를 출력하는 공통 컴포넌트
- `LoginModal.tsx`: 로그인 전용 모달 컴포넌트 (필요 시)

## 사용 가이드

- 이 폴더의 컴포넌트는 `app/(auth)/login/page.tsx`에서 import 되어 사용됩니다.
- 상태 관리(Zustand 등)는 `features/auth/` 폴더에서 담당하고, 이곳은 UI에 집중합니다.
