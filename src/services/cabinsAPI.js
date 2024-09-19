import supabase, { supabaseUrl } from "./supabase"

export async function getCabins(){

const { data, error } = await supabase.from('cabins').select('*')
  if(error){
    throw new Error("Error occurred while fetching cabin.")
  }
  return data
}

export async function createCabin(newCabin){
  // https://wwaxeaycsqvbzzmodmpx.supabase.co/storage/v1/object/public/cabinImages/cabin-002.jpg
const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/','')
const imagePath = `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`
const { data, error } = await supabase
.from('cabins')
.insert([{...newCabin, image: imagePath}])
if(error){
  throw new Error('Unable to add new Cabin.')
}
console.log(newCabin)
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