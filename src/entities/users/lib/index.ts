import { createClientServer } from "@/shared"; // 서버 클라이언트,클라이언트 클라이언트 임포트
import { User } from "@/entities/users/config";
export const getUserServer = async (): Promise<User | null> => {
  const supabase = await createClientServer(); // 요청별 서버 클라이언트 생성
  console.log(await supabase.auth.getUser());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // User 타입으로 캐스팅하거나 필요한 데이터만 반환
  return user as User | null;
};
