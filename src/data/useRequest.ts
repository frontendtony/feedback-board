import useSWR from 'swr';
import supabase from '../utils/supabase';

export interface RequestReturnType extends App.Request {
  comments: Array<
    App.Comment & { user: App.Profile } & { replies: Array<App.Reply & { user: App.Profile }> }
  >;
  upvotes_count: [{ count: number }];
  user: {
    id: string;
    name: string;
    username: string;
  };
}

export default function useRequest(requestId: string) {
  const { data, error, mutate } = useSWR(requestId, fetchRequest);

  return {
    data,
    error,
    loading: !data && !error,
    revalidate: () => mutate(),
  };
}

async function fetchRequest(requestId: string) {
  const { data, error } = await supabase
    .from<RequestReturnType>('requests')
    .select(
      `*, user:user_id(*), comments(*, user:user_id(*), replies(*, user:user_id(*))), upvotes_count:upvotes(count)`
    )
    .eq('id', requestId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
