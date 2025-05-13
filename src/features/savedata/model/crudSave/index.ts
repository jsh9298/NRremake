import { createClientServer } from "@/src/shared";

export async function downloadData(userID: string) {
  const supabase = await createClientServer();
  const { data } = await supabase.storage
    .from("save")
    .download(`${userID}/game_state.yaml`);
  if (data) {
    console.log(data);
    // return data;
  }
}
export async function createUserFile(userID: string) {
  const supabase = await createClientServer();
  const { data } = await supabase.storage
    .from("save")
    .copy("origin/game_state.yaml", `${userID}/game_state_[${userID}].yaml`);
  if (data) {
    console.log(data);
    // return data;
  }
}
