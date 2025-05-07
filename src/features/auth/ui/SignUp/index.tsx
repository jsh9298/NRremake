
import { signup, getMsg } from '@/src/features/auth/model'

export default function SignupForm() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <label htmlFor="name">Nickname:</label>
            <input id="name" name="name" type="text" required />
            <button formAction={signup}>Sign up</button>
            {
                getMsg && <p>{getMsg()}</p>
            }
        </form>
    )
}