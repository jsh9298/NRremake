
import { getUserServer } from "@/entities";
import { redirect } from "next/navigation";

export default async function mainEdit() {
    const user = await getUserServer();
    if (!user) {
        redirect('/'
        );
    }
}