import supabase from 'src/utils/supabase';

export default function useUser() {
  return supabase.auth.session()?.user;
}
