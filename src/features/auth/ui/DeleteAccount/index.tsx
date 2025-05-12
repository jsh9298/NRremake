
import { getMsg, deleteAccount } from '@/src/features/auth/model'

export default function DeleteForm() {
    return (
        <form>
            <label htmlFor="password">Input Password for Delete account:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={deleteAccount} >Delete</button>
             {
                getMsg && <p>{getMsg()}</p>
            }
        </form>
    )
}