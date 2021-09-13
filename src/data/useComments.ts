import useSWR from 'swr';
import supabase from '../utils/supabase';

export interface CommentsReturnType extends App.Comment {
  user: App.Profile;
  replies: Array<App.Reply & { user: App.Profile }>;
}

export default function useComments(requestId: string) {
  const { data, error, mutate } = useSWR([requestId, 'comments'], fetchRequests);

  return {
    data,
    error,
    loading: !data && !error,
    revalidate: () => mutate(),
  };
}

async function fetchRequests(requestId: string) {
  const { data, error } = await supabase
    .from<CommentsReturnType>('comments')
    .select(`*, user:user_id(*), replies(*, user:user_id(*))`)
    .eq('request_id', requestId);

  if (error) throw new Error(error.message);
  return data;
}
