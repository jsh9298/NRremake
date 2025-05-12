import { createClientServer } from "@/src/shared";

export async function downloadData(userID:string) {
    const supabase = await createClientServer();
    const {data} = supabase.storage.from('save').download(`${userID}/game_state.yaml`);
    if(data){
        return data;
    }
}
export async function uploadData(userID:string,Udata){
    const supabase = await createClientServer();
    const {data,error} = supabase.storage.from('save').upload(`${userID}/game_state.yaml`,Udata,{cacheControl:'3600',upsert:false})
    if(data){

    }
    if(error){

    }
}
export async function deleteData(userID:string){
      const supabase = await createClientServer();
    const { data, error } = await supabase
  .storage
  .from('avatars')
  .remove([`${userID}/game_state.yaml`])
}