"use server";
import { createClientAdmin } from "@/shared";
import { saveToObject } from "../convert";

export async function downloadData() {
  const supabase = await createClientAdmin();
  const { data, error } = await supabase.storage
    .from("save")
    .download(`test/game_state.yaml`);
  if (data) {
    const yamlString = await data.text();
    console.log("convert \nStart \n" + saveToObject(yamlString) + "\nEND\n");
  }

  if (error) {
    console.log(error);
  }
}
export async function createUserFile() {
  const supabase = await createClientAdmin();
  const { data, error } = await supabase.storage
    .from("save")
    .copy("origin/game_state.yaml", `test/game_state.yaml`);
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }
}

export async function deleteUserFile() {
  const supabase = await createClientAdmin();
  const { data, error } = await supabase.storage
    .from("save")
    .remove(["test/game_state.yaml"]);
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }
}

export async function updateUserFile() {
  const supabase = await createClientAdmin();
  const { data, error } = await supabase.storage
    .from("save")
    .update("test/game_state.yaml", "sdsdsd");
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }
}

export async function replaceUserFile(from: string, to: string) {
  const supabase = await createClientAdmin();
  const { data: fromData } = await supabase.storage.from("save").download(from);
  if (fromData) {
    await supabase.storage.from("save").update(to, fromData);
  }
}
