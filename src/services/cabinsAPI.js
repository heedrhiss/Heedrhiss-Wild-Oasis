import supabase, { supabaseUrl } from "./supabase"

export async function getCabins(){

const { data, error } = await supabase.from('cabins').select('*')
  if(error){
    throw new Error("Error occurred while fetching cabin.")
  }
  return data
}

export async function createCabin(newCabin, id){

const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/','')
const imagePath =  hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`

let query = supabase.from('cabins')

if(!id) query=  query.insert([{...newCabin, image: imagePath}])
if(id) query = query.update({...newCabin, image: imagePath})
.eq('id', id)


const { data, error } = await query.select().single();

if(error){
  throw new Error('Unable to create new Cabin.')
}
if(hasImagePath) return data;

const { storageError } = await supabase
  .storage
  .from('cabinImages')
  .upload(imageName, newCabin.image)
  if(storageError){
    await supabase.from('cabins').delete().eq('id', newCabin.id)
    throw new Error('Unable to upload Cabin image.')
  }
return data
}

export async function deleteCabin(id){
  
const {data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id)
if(error){
  throw new Error("Error occurred while deleting cabin.")
}
return data

}