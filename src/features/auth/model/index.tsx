'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClientServer } from '@/src/shared'
let msg = '';
export async function login(formData: FormData) {
    const supabase = await createClientServer();

    // 편의를 위한 타입 캐스팅
    // 실제로는 입력값을 검증해야 한다.
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        msg = error.message;
    }

    revalidatePath('/main', 'layout');
    redirect('/main');
}

export async function signup(formData: FormData) {
    const supabase = await createClientServer();

    // 편의를 위한 타입 캐스팅
    // 실제로는 입력값을 검증해야 한다.
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            shouldConfirmEmail: false,
            data: {
                name: formData.get('name') as String
            }
        }
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        msg = error.message;
    }
    revalidatePath('/main', 'layout');
    redirect('/main');
}

export async function logout() {
    const supabase = await createClientServer();

    const { error } = await supabase.auth.signOut({ scope: 'local' });

    if (error) {
        msg = error.message;
    }
    revalidatePath('/', 'layout');
    redirect('/');
}

// export async function deleteAccount() {
// 서버 측 API 라우트나 Edge Function 호출
//   await fetch('/api/auth/delete-account', { method: 'POST' });
// }


export async function getMsg() {
    return msg;
}