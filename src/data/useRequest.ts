import useSWR from 'swr';
import supabase from '../utils/supabase';

export interface RequestReturnType extends App.Request {
  comments: Array<
    App.Comment & { user: App.Profile } & { replies: Array<App.Reply & { user: App.Profile }> }
  >;
  upvotes_count: [{ count: number }];
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
      `*, comments(*, user:user_id(*), replies(*, user:user_id(*))), upvotes_count:upvotes(count)`
    )
    .eq('id', requestId);

  if (error) throw new Error(error.message);
  return data?.[0];
}
