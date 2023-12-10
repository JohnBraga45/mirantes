import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fppugrgsiwjvpgjqjkvp.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwcHVncmdzaXdqdnBnanFqa3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxMTMzNTIsImV4cCI6MjAxNzY4OTM1Mn0.MOijUrNFF1V4AwZ8LtmBn63MfTyy3BbOI8Js9SmHX-0";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
