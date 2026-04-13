// next-auth v5는 루트 auth.ts에서 핸들러를 export하는 것을 권장합니다.
// 실제 설정은 shared/config/auth.ts에서 관리합니다.
export { handlers, signIn, signOut, auth } from "@/shared/config/auth";
