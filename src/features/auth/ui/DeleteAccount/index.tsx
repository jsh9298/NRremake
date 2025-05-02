
import { deleteAccount, msg } from '@/src/features/auth/model'

export default function DeleteForm() {
    return (
        <form>
            <label htmlFor="password">Input Password for Delete account:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={deleteAccount}>Sign out</button>
            {
                msg && <p>{msg}</p>
            }
        </form>
    )
}