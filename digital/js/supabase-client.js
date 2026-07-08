import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://awtmcgglsuonneazdhcd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dG1jZ2dsc3Vvbm5lYXpkaGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MTM4MjYsImV4cCI6MjA5OTA4OTgyNn0.5X8YFhd699SjxDibYL47sjvAAkdZO0kLMeeB2bFqkHg'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
window.supabase = supabase;
