
import { getUserServer } from "@/entities";
import LogOutButton from "@/features/auth/ui/Logout";
import { redirect } from "next/navigation";
export default async function mainPage() {
    const user = await getUserServer();
    if (!user) {
        redirect('/'
        );
    }
    return (
        <div className="">
            fisrtPage
            <p>{user.email},{user.user_metadata.name}</p>
            <LogOutButton />
        </div>
    );
}
