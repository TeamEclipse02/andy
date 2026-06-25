import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajokwbvxdesbpoxlzguv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqb2t3YnZ4ZGVzYnBveGx6Z3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDMzMzUsImV4cCI6MjA5NzExOTMzNX0.rG_TnKYDuypyQP8FITmzKXLw35Iw9EtU1JjvTOSDvdk'

export const supabase = createClient(supabaseUrl, supabaseKey)
