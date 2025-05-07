// User 타입 정의 예시 (entities/user/types/index.ts)

export type User = {
    id: string;
    email: string | undefined;
    user_metadata: { name: string };
    // role: string | undefined;
    // created_at: string;
    // updated_at: string;
};


// Context에서 사용될 사용자 상태 타입 (User 객체 또는 null)
export type UserState = User | null;