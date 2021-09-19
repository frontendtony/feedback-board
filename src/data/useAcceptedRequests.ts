import useSWR from 'swr';
import supabase from '../utils/supabase';

export interface RequestReturnType extends App.Request {
  comments_count: [{ count: number }];
  upvotes_count: [{ count: number }];
}

export default function useAcceptedRequests() {
  const { data, error, mutate } = useSWR('accepted-requests', fetchRequests);

  return {
    data,
    error,
    groupedData: {
      planned: data?.filter(({ status }) => status === 'planned') ?? [],
      'in-progress': data?.filter(({ status }) => status === 'in-progress') ?? [],
      live: data?.filter(({ status }) => status === 'live') ?? [],
    },
    loading: !data && !error,
    mutate,
    revalidate: () => mutate(),
  };
}

async function fetchRequests() {
  const { data, error } = await supabase
    .from<RequestReturnType>('requests')
    .select(`*, comments_count:comments(count), upvotes_count:upvotes(count)`)
    .neq('status', 'suggestion');
  if (error) throw new Error(error.message);
  return data;
}
