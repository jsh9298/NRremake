import { type NextRequest } from "next/server";
import { updateSession } from "@/shared";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청 경로와 일치:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * 필요에 따라 이 패턴을 수정하여 더 많은 경로를 포함할 수 있습니다.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/main/*",
    "/main/start/*",
  ],
};
