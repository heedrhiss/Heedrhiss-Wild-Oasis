import supabase, { supabaseUrl } from '../services/supabase'

export async function signup({fullName, email, password, phone, avatar}){
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {data: { fullName, phone, avatar}}
  })
  if(error) throw new Error(error.message)
  return data
}

export async function login({email, password}){
    
let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if(error) throw new Error(error.message)
  return data
}

export async function getUser(){
  const {data: session} = await supabase.auth.getSession()
  if (!session) return null

  const{data, error} = await supabase.auth.getUser()
  if(error) throw new Error(error.message)
  
  return data?.user
}

export async function logout(){
  const {error} = await supabase.auth.signOut()
  if(error) throw new Error(error.message)
}

export async function updateUser({password, fullName, avatar}){
let updateData;
if (password) updateData = {password}
if(fullName) updateData = {data: {fullName}}
const {data, error} = await supabase.auth.updateUser(updateData)
if(error) throw new Error(error.message)
if(!avatar) return data

const fileName = `avatar-${Math.random()}`
const {error: storageError} = await supabase
.storage
.from('avatars')
.upload(fileName, avatar)
if(storageError){
  throw new Error('Unable to upload Avatar image.')
}
const {data:updateUser, error: userError} = await supabase.auth.updateUser({data: {
  avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
}})
if(userError) throw new Error(userError.message)

return updateUser
}