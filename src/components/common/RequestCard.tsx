import * as React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { RequestReturnType } from 'src/data/useRequests';
import supabase from 'src/utils/supabase';
import { mutate } from 'swr';
import AngleUp from '../../icons/AngleUp';
import CommentBubble from '../../icons/CommentBubble';

export default function RequestCard({ request }: { request: RequestReturnType }) {
  async function upvote() {
    try {
      const { data } = await supabase
        .from('upvotes')
        .select('*')
        .filter('user_id', 'eq', supabase.auth.session()?.user?.id)
        .filter('request_id', 'eq', request.id);
      if (data?.length) throw new Error('You can only upvote a request once');
      const { error } = await supabase.from('upvotes').insert([
        {
          user_id: supabase.auth.session()?.user?.id,
          request_id: request.id,
        },
      ]);
      if (error) throw new Error('Could not upvote request');
      toast.success('Request upvoted successfully');
      mutate('requests');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div
      key={request.id}
      className="rounded p-6 bg-white md:grid grid-cols-3 gap-10"
      style={{ gridTemplateColumns: 'auto 1fr auto' }}
    >
      <div className="hidden md:block">
        <Upvotes upvote={upvote} count={request.upvotes_count?.[0].count} direction="vertical" />
      </div>
      <Link to={`/${request.id}`}>
        <p className="font-bold">{request.title}</p>
        <p className="mt-2 text-light text-small">{request.description}</p>
        <div className="request-label mt-3">{request.category}</div>
      </Link>

      <div className="flex items-center justify-between mt-4 md:hidden">
        <Upvotes upvote={upvote} count={request.upvotes_count?.[0].count} />
        <CommentCount count={request.comments_count?.[0].count ?? 0} />
      </div>
      <div className="hidden md:block ml-auto self-center">
        <CommentCount count={request.comments_count?.[0].count ?? 0} />
      </div>
    </div>
  );
}

export function RoadmapRequestCard({ request }: { request: RequestReturnType }) {
  async function upvote() {
    try {
      const { data } = await supabase
        .from('upvotes')
        .select('*')
        .filter('user_id', 'eq', supabase.auth.session()?.user?.id)
        .filter('request_id', 'eq', request.id);
      if (data?.length) throw new Error('You can only upvote a request once');
      const { error } = await supabase.from('upvotes').insert([
        {
          user_id: supabase.auth.session()?.user?.id,
          request_id: request.id,
        },
      ]);
      if (error) throw new Error('Could not upvote request');
      toast.success('Request upvoted successfully');
      mutate('requests');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div
      key={request.id}
      className={`rounded p-6 bg-white border-t-[6px] ${
        request.status === 'planned'
          ? 'border-status-planned'
          : request.status === 'in-progress'
          ? 'border-status-in-progress'
          : 'border-status-live'
      }`}
    >
      <div>
        <p className="font-bold">{request.title}</p>
        <p className="mt-2 text-light text-small">{request.description}</p>
        <div className="request-label mt-3">{request.category}</div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Upvotes upvote={upvote} count={request.upvotes_count?.[0].count} />
        <CommentCount count={request.comments_count?.[0].count ?? 0} />
      </div>
    </div>
  );
}

function Upvotes(props: {
  count: number;
  upvote(): Promise<void>;
  direction?: 'vertical' | 'horizontal';
}) {
  return (
    <button
      className={`rounded bg-alternate-light flex items-center min-w-[4.1ch] ${
        props.direction === 'vertical'
          ? 'flex-col space-y-1 py-2 px-2'
          : 'flex-row space-x-[.625rem] px-4 py-[0.375rem]'
      }`}
      onClick={props.upvote}
    >
      <AngleUp className="text-[.5rem] text-alternate" />
      <span className="font-bold text-small">
        {props.count} <span className="sr-only">upvotes</span>
      </span>
    </button>
  );
}

function CommentCount(props: { count: number }) {
  return (
    <button className="flex items-center space-x-2">
      <CommentBubble className="text-[#CDD2EE]" />
      <span className="font-bold text-small">
        {props.count} <span className="sr-only">comments</span>
      </span>
    </button>
  );
}
