import useSWR from 'swr';
import supabase from '../utils/supabase';

export interface RequestReturnType extends App.Request {
  comments: App.Comment[];
  upvotes: string[];
}

export default function useRequests() {
  const { data, error, mutate } = useSWR(['requests'], fetchRequests);

  return {
    data,
    error,
    loading: !data && !error,
    revalidate: () => mutate(),
  };
}

async function fetchRequests() {
  const { data, error } = await supabase
    .from<RequestReturnType>('requests')
    .select(`*, comments (*), upvotes (user_id)`);
  if (error) throw new Error(error.message);
  // const { data: comments_count } = await supabase.from('comments').select('*', { count: 'exact' })
  return data;
}
