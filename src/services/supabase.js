import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jfhjouvkiqoadaeeehpd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaGpvdXZraXFvYWRhZWVlaHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MzU5MDQsImV4cCI6MjAwOTExMTkwNH0.JtFOIVy4anob9hDMO3XjHj6aOrqCMUdLx_kSiBfnagM";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
