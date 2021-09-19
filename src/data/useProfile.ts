import supabase from 'src/utils/supabase';
import useSWR from 'swr';

export default function useProfile() {
  const { data, error, mutate } = useSWR('profile', fetchRequest);

  return {
    data,
    error,
    loading: !data && !error,
    revalidate: () => mutate(),
  };
}

async function fetchRequest() {
  const { data, error } = await supabase
    .from<App.Profile>('profiles')
    .select('*')
    .eq('id', `${supabase.auth.session()?.user?.id}`);

  if (error) throw new Error(error.message);
  return data?.[0];
}
