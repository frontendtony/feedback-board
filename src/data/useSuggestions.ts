import useSWR from 'swr';
import supabase from '../utils/supabase';

export interface RequestReturnType extends App.Request {
  comments_count?: [{ count: number }];
  upvotes_count: [{ count: number }];
  user: {
    id: string;
    name: string;
    username: string;
  };
}

export default function useSuggestions() {
  const { data, error, mutate } = useSWR('requests', fetchRequests);

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
    .select(`*, comments_count:comments(count), upvotes_count:upvotes(count), user:user_id(*)`)
    .eq('status', 'suggestion');
  if (error) throw new Error(error.message);
  return data;
}
