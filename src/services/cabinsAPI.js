import supabase from "./supabase"

export async function getCabins(){

const { data, error } = await supabase.from('cabins').select('*')
  if(error){
    throw new Error("An error has occurred")
  }
  return data
}

