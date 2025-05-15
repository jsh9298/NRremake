
import { getUserServer } from "@/entities";
import { Background } from "@/features/gui/ui/bg";
import { redirect } from "next/navigation";

export default async function mainStart() {
    const user = await getUserServer();
    if (!user) {
        redirect('/'
        );
    }
    return(
        <div>
            <Background/>
        </div>
    )
}