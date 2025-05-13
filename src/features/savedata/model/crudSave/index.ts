"use server";
import { createClientServer } from "@/shared";

// export async function downloadData(userID: string) {
//   const supabase = await createClientServer();
//   const { data } = await supabase.storage
//     .from("save")
//     .download(`${userID}/game_state.yaml`);
//   if (data) {
//     console.log(data);
//     // return data;
//   }
// }
// export async function createUserFile(userID: string) {
//   const supabase = await createClientServer();
//   const { data } = await supabase.storage
//     .from("save")
//     .copy("origin/game_state.yaml", `${userID}/game_state_[${userID}].yaml`);
//   if (data) {
//     console.log(data);
//     // return data;
//   }
// }

export async function downloadData() {
  const supabase = await createClientServer();
  const { data, error } = await supabase.storage
    .from("save")
    .download(`test/game_state_[test].yaml`);
  if (data) {
    console.log(data);
    // return data;
  }
  if (error) {
    console.log(error);
  }
}
export async function createUserFile() {
  const supabase = await createClientServer();
  const { data, error } = await supabase.storage
    .from("save")
    .copy("origin/game_state.yaml", `test/game_state_[test].yaml`);
  if (data) {
    console.log(data);
    // return data;
  }
  if (error) {
    console.log(error);
  }
}

export async function checkbuket() {
  const supabase = await createClientServer();
  const { data, error } = await supabase.storage.getBucket("save");
  if (data) {
    console.log(data);
    // return data;
  }
  if (error) {
    console.log(error);
  }
}
