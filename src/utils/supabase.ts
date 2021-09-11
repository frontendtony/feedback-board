import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://cohylndywsyzfqqvqmic.supabase.co',
  `${import.meta.env.VITE_SUPABASE_KEY}`
);

export default supabase;
