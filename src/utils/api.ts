import supabase from './supabase';

export async function upvoteRequest(requestId: string) {
  // check for existing upvote by the same user
  const { data } = await supabase
    .from('upvotes')
    .select('*')
    .filter('user_id', 'eq', supabase.auth.session()?.user?.id)
    .filter('request_id', 'eq', requestId);
  if (data?.length) throw new Error('You can only upvote a request once');

  const { error } = await supabase.from('upvotes').insert([
    {
      user_id: supabase.auth.session()?.user?.id,
      request_id: requestId,
    },
  ]);
  if (error) throw new Error('Could not upvote request');
}
