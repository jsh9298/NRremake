
import { getUserServer } from "@/src/entities";
import { redirect } from "next/navigation";

export default async function mainEdit() {
    const user = await getUserServer();
    if (!user) {
        redirect('/'
        );
    }
}