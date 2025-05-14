// app/api/delete-user/route.ts
// 회원 탈퇴 처리 서버 API 엔드포인트

import { NextResponse } from "next/server";
import { createClientAdmin, createClientServer } from "@/shared";

export async function POST(request: Request) {
  const { password } = await request.json(); // 클라이언트로부터 비밀번호 받기

  // 1. 현재 인증된 사용자 정보 가져오기 (서버용 기본 클라이언트 사용)
  const supabase = await createClientServer();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    // 인증되지 않았거나 사용자 정보를 가져올 수 없는 경우
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  const userId = user.id;
  const userEmail = user.email; // 비밀번호 인증에 필요

  if (!userEmail) {
    // 이메일 기반 사용자가 아닌 경우 (예: 전화번호 인증 등) 비밀번호 인증 방식 재고 필요
    return NextResponse.json(
      { error: "이메일 기반 사용자가 아닙니다." },
      { status: 400 }
    );
  }

  // 2. 입력받은 비밀번호로 사용자 인증 다시 시도 (비밀번호 검증 목적)
  // 이 과정은 서버 측에서 안전하게 비밀번호가 맞는지 확인하는 방법입니다.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: password,
  });

  if (signInError) {
    // 비밀번호 불일치 또는 기타 로그인 오류 시
    console.error(`UID ${userId} 비밀번호 인증 실패:`, signInError.message);
    // 구체적인 오류 메시지 노출은 보안에 취약할 수 있으므로 일반적인 메시지 사용
    return NextResponse.json(
      { error: "인증 정보가 올바르지 않습니다. 비밀번호를 확인해주세요." },
      { status: 401 }
    );
  }

  // 3. 비밀번호 인증 성공 시, Admin 클라이언트를 사용하여 사용자 삭제
  const supabaseAdmin = await createClientAdmin(); // Admin 클라이언트 생성 (service_role 키 사용)

  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    userId
  ); // 사용자 ID로 삭제

  if (deleteError) {
    console.error(`UID ${userId} 사용자 삭제 오류:`, deleteError);
    return NextResponse.json(
      { error: "회원 탈퇴 처리 중 시스템 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  // 4. 사용자 삭제 성공 시
  // Supabase Auth에서 사용자 삭제 성공 시 자동으로 세션이 무효화됩니다.
  // 필요하다면 여기서 해당 사용자와 관련된 데이터베이스 기록이나 스토리지 파일 삭제 로직을 추가할 수 있습니다.
  // 예: await supabaseAdmin.from('profiles').delete().eq('id', userId);

  return NextResponse.json({
    message: "회원 탈퇴가 성공적으로 처리되었습니다.",
  });
}
