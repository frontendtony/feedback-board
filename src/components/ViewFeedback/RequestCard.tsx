import format from 'date-fns/format';
import * as React from 'react';
import { RequestReturnType } from 'src/data/useRequest';
import AngleUp from 'src/icons/AngleUp';
import CommentBubble from 'src/icons/CommentBubble';

export default function RequestCard({ request }: { request: RequestReturnType }) {
  return (
    <div
      key={request.id}
      className="rounded p-6 bg-white md:grid grid-cols-3 gap-10"
      style={{ gridTemplateColumns: 'auto 1fr auto' }}
    >
      <div className="hidden md:block">
        <Upvotes count={request.upvotes_count?.[0].count} direction="vertical" />
      </div>
      <div>
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
        <p className="mt-2 text-light text-small">{request.description}</p>
        <div className="request-label mt-3">{request.category}</div>
      </div>

      <div className="flex items-center justify-between mt-4 md:hidden">
        <Upvotes count={request.upvotes_count?.[0].count} />
        <CommentCount count={request.comments.length} />
      </div>
      <div className="hidden md:block ml-auto self-center">
        <CommentCount count={request.comments.length} />
      </div>
    </div>
  );
}

export function RoadmapRequestCard({ request }: { request: RequestReturnType }) {
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
        <Upvotes count={request.upvotes_count?.[0].count} />
        <CommentCount count={request.comments.length} />
      </div>
    </div>
  );
}

function Upvotes(props: { count: number; direction?: 'vertical' | 'horizontal' }) {
  return (
    <button
      className={`rounded bg-alternate-light flex items-center min-w-[4.1ch] ${
        props.direction === 'vertical'
          ? 'flex-col space-y-1 py-2 px-2'
          : 'flex-row space-x-[.625rem] px-4 py-[0.375rem]'
      }`}
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
