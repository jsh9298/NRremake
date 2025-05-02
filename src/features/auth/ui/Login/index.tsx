
import { login, msg } from '@/src/features/auth/model'

export default function LoginForm() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={login}>Log in</button>
            {
                msg && <p>{msg}</p>
            }
        </form>
    )
}