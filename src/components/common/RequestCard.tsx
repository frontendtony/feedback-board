import { format } from 'date-fns';
import * as React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { RequestReturnType as RoadmapRequestReturnType } from 'src/data/useAcceptedRequests';
import { RequestReturnType } from 'src/data/useSuggestions';
import { upvoteRequest } from 'src/utils/api';
import { mutate } from 'swr';
import AngleUp from '../../icons/AngleUp';
import CommentBubble from '../../icons/CommentBubble';

export default React.forwardRef<HTMLDivElement, { request: RequestReturnType }>(
  function RequestCard({ request }, ref) {
    async function upvote() {
      try {
        await upvoteRequest(request.id);
        toast.success('Request upvoted successfully');
        mutate('requests');
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    return (
      <div
        key={request.id}
        ref={ref}
        className="rounded p-6 bg-white md:grid grid-cols-3 gap-10"
        style={{ gridTemplateColumns: 'auto 1fr auto' }}
      >
        <div className="hidden md:block">
          <Upvotes upvote={upvote} count={request.upvotes_count?.[0].count} direction="vertical" />
        </div>
        <Link to={`/${request.id}`}>
          <div className="flex items-center">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${request.user_id}.svg`}
              height={36}
              width={36}
              className="rounded-full overflow-hidden"
              aria-hidden //
            />
            <div className="ml-2">
              <p className="text-small font-bold">{request.user.name}</p>
              {request.created_at && (
                <p className="text-small text-light">
                  {format(new Date(request.created_at), 'dd LLL, yyyy')}
                </p>
              )}
            </div>
          </div>
          <p className="font-bold mt-2">{request.title}</p>
          <p className="mt-1 text-light text-sm">{request.description}</p>
          <div className="request-label mt-3">{request.category}</div>
        </Link>

        <div className="flex items-center justify-between mt-4 md:hidden">
          <Upvotes upvote={upvote} count={request.upvotes_count?.[0].count} />
          <Link to={`/${request.id}#comments`}>
            <CommentCount count={request.comments_count?.[0].count ?? 0} />
          </Link>
        </div>
        <div className="hidden md:block ml-auto self-center">
          <Link to={`/${request.id}#comments`}>
            <CommentCount count={request.comments_count?.[0].count ?? 0} />
          </Link>
        </div>
      </div>
    );
  }
);

export function RoadmapRequestCard({ request }: { request: RoadmapRequestReturnType }) {
  async function upvote() {
    try {
      await upvoteRequest(request.id);
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
      <Link to={`/${request.id}`}>
        <p className="font-bold">{request.title}</p>
        <p className="mt-2 text-light text-small">{request.description}</p>
        <div className="request-label mt-3">{request.category}</div>
      </Link>

      <div className="flex items-center justify-between mt-4">
        <Upvotes upvote={upvote} count={request.upvotes_count?.[0].count} />
        <Link to={`/${request.id}#comments`}>
          <CommentCount count={request.comments_count?.[0].count ?? 0} />
        </Link>
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
    <div className="flex items-center space-x-2">
      <CommentBubble className="text-[#CDD2EE]" />
      <span className="font-bold text-small">
        {props.count} <span className="sr-only">comments</span>
      </span>
    </div>
  );
}
