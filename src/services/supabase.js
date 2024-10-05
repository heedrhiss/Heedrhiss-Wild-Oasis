import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://wwaxeaycsqvbzzmodmpx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3YXhlYXljc3F2Ynp6bW9kbXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMzczMTEsImV4cCI6MjA0MTkxMzMxMX0.-fThd4U6PiUbB6qBrpxUxCwlh6utbZcGitxF73NeTZA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;