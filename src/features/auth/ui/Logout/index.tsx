
import { logout } from '@/src/features/auth/model'

export default function LogOutButton() {
    return (
        <div>
            <button onClick={logout}>Log out</button>
        </div>
    )
}