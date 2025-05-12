import { createClient } from '@supabase/supabase-js';

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseServiceRoleKey || !supabaseUrl) {
    // 환경 변수 누락 시 오류 발생 또는 적절한 처리
    console.error("SUPABASE_SERVICE_ROLE_KEY 또는 NEXT_PUBLIC_SUPABASE_URL 환경 변수가 설정되지 않았습니다.");
     // 프로덕션 환경에서는 throw Error를 사용하여 명확히 알립니다.
    // throw new Error("Supabase admin client environment variables are missing.");
}

export const createAdminClient = () => {
  // service_role 키로 초기화된 클라이언트는 RLS를 우회하는 관리자 권한을 가집니다.
  // 서버 측에서만 사용되므로 브라우저 스토리지 관련 설정을 비활성화합니다.
  return createAdminClient(supabaseUrl!, supabaseServiceRoleKey!, {
     auth: {
        storage: {
            getItem: (key) => null, setItem: (key, value) => {}, removeItem: (key) => {}
        },
        autoRefreshToken: false,
        detectSessionInUrl: false
     }
  });
};
